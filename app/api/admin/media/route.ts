import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { mediaAssets } from "@/drizzle/schema";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const allowed = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !allowed.has(file.type) || file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Use a PNG, JPEG, WebP, or AVIF image under 5 MB." }, { status: 400 });
    }

    const apiUrl = process.env.MANUS_API_URL;
    const apiKey = process.env.MANUS_API_KEY;

    // If Manus Cloud Storage is configured
    if (apiUrl && apiKey && db) {
      const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
      const key = `media/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const presign = await fetch(`${apiUrl}/v1/storage/presign/put?path=${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const signed = (await presign.json()) as { url?: string; error?: string };
      if (!presign.ok || !signed.url) throw new Error(signed.error || "Presign failed");
      const upload = await fetch(signed.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file.stream() as ReadableStream,
      });
      if (!upload.ok) throw new Error("Upload failed");
      await db.insert(mediaAssets).values({ key, mimeType: file.type, createdBy: undefined });
      return NextResponse.json({ ok: true, key, path: `/manus-storage/${key}`, uploadedBy: user.email }, { status: 201 });
    }

    // Local file storage fallback
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const publicPath = `/uploads/${fileName}`;
    if (db) {
      await db.insert(mediaAssets).values({ key: publicPath, mimeType: file.type, createdBy: undefined });
    }
    return NextResponse.json({ ok: true, key: publicPath, path: publicPath, uploadedBy: user.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 400 });
  }
}
