import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { mediaAssets, auditLogs } from "@/drizzle/schema";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadToR2, deleteFromR2, getR2PublicUrl, isR2Configured } from "@/lib/r2";

const allowedTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/gif",
]);

// 10 MB maximum upload size
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function GET() {
  try {
    await requireAdmin();

    if (!db) {
      return NextResponse.json({ ok: true, media: [] });
    }

    const rows = await db
      .select()
      .from(mediaAssets)
      .orderBy(desc(mediaAssets.createdAt))
      .limit(100);

    const media = rows.map((asset) => ({
      ...asset,
      url: getR2PublicUrl(asset.key),
    }));

    return NextResponse.json({ ok: true, media });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load media" },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");
    const altAr = form.get("altAr") as string | null;
    const altEn = form.get("altEn") as string | null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "يرجى اختيار ملف صورة صالح." }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف غير مدعوم. الصيغ المدعومة: PNG, JPG, WebP, AVIF, SVG, GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "حجم الملف يتجاوز الحد المسموح به (10 ميجابايت)." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || (file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1]);
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);
    const datePrefix = new Date().toISOString().slice(0, 7); // e.g. 2026-11
    const key = `media/${datePrefix}/${Date.now()}-${cleanFileName}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let finalKey = key;
    let publicUrl = "";

    if (isR2Configured()) {
      const r2Result = await uploadToR2({
        buffer,
        key,
        contentType: file.type,
      });
      finalKey = r2Result.key;
      publicUrl = r2Result.url;
    } else {
      // Fallback: save to public/uploads
      const fs = await import("fs");
      const path = await import("path");
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const localFileName = `${Date.now()}-${cleanFileName}.${ext}`;
      const localFilePath = path.join(uploadsDir, localFileName);
      fs.writeFileSync(localFilePath, buffer);
      finalKey = `/uploads/${localFileName}`;
      publicUrl = finalKey;
    }

    let insertedId: number | undefined;
    if (db) {
      const [inserted] = await db
        .insert(mediaAssets)
        .values({
          key: finalKey,
          altAr: altAr || file.name,
          altEn: altEn || file.name,
          mimeType: file.type,
        })
        .returning();
      insertedId = inserted?.id;

      // Audit log
      await db.insert(auditLogs).values({
        action: "upload_media",
        entityType: "media",
        entityId: finalKey,
        details: { fileName: file.name, size: file.size, mimeType: file.type, url: publicUrl },
      });
    }

    return NextResponse.json(
      {
        ok: true,
        id: insertedId,
        key: finalKey,
        url: publicUrl,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        uploadedBy: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل رفع الصورة إلى التخزين السحابي." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAdmin();
    const { searchParams } = new URL(request.url);
    const keyParam = searchParams.get("key");
    const idParam = searchParams.get("id");

    if (!keyParam && !idParam) {
      return NextResponse.json({ error: "Missing key or id parameter" }, { status: 400 });
    }

    let targetKey = keyParam;

    if (db) {
      if (idParam) {
        const id = parseInt(idParam, 10);
        const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
        if (asset) {
          targetKey = asset.key;
          await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
        }
      } else if (keyParam) {
        await db.delete(mediaAssets).where(eq(mediaAssets.key, keyParam));
      }

      if (targetKey) {
        await db.insert(auditLogs).values({
          action: "delete_media",
          entityType: "media",
          entityId: targetKey,
          details: { deletedBy: user.email },
        });
      }
    }

    if (targetKey && isR2Configured() && !targetKey.startsWith("/uploads/")) {
      await deleteFromR2(targetKey);
    }

    return NextResponse.json({ ok: true, deletedKey: targetKey });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete media asset" },
      { status: 500 }
    );
  }
}
