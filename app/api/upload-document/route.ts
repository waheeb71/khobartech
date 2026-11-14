import { NextRequest, NextResponse } from "next/server";
import { uploadToR2, isR2Configured } from "@/lib/r2";

const allowedDocumentTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
]);

const MAX_DOC_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const category = (form.get("category") as string) || "documents"; // 'cv' | 'rfp' | 'documents'

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "يرجى اختيار ملف صالح." }, { status: 400 });
    }

    if (!allowedDocumentTypes.has(file.type) && !file.name.match(/\.(pdf|docx|doc|zip)$/i)) {
      return NextResponse.json(
        { error: "نوع الملف غير مدعوم. الأنواع المسموحة: PDF, DOCX, DOC, ZIP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_DOC_SIZE) {
      return NextResponse.json(
        { error: "حجم الملف يتجاوز الحد الأقصى المسموح به (15 ميجابايت)." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);
    const datePrefix = new Date().toISOString().slice(0, 7); // e.g. 2026-11
    const key = `${category}/${datePrefix}/${Date.now()}-${cleanFileName}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let publicUrl = "";

    if (isR2Configured()) {
      const r2Result = await uploadToR2({
        buffer,
        key,
        contentType: file.type || "application/pdf",
      });
      publicUrl = r2Result.url;
    } else {
      const fs = await import("fs");
      const path = await import("path");
      const uploadsDir = path.join(process.cwd(), "public", "uploads", category);
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const localFileName = `${Date.now()}-${cleanFileName}.${ext}`;
      const localFilePath = path.join(uploadsDir, localFileName);
      fs.writeFileSync(localFilePath, buffer);
      publicUrl = `/uploads/${category}/${localFileName}`;
    }

    return NextResponse.json(
      {
        ok: true,
        url: publicUrl,
        key,
        fileName: file.name,
        size: file.size,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل رفع الملف." },
      { status: 500 }
    );
  }
}

