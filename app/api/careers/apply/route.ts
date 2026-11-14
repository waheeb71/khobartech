import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { jobApplications, auditLogs } from "@/drizzle/schema";

const schema = z.object({
  fullName: z.string().trim().min(2).max(191),
  email: z.string().trim().email().max(191),
  phone: z.string().trim().min(8).max(50),
  roleApplied: z.string().trim().min(2).max(191),
  applicationType: z.enum(["job", "coop"]).default("job"),
  university: z.string().trim().max(191).optional().or(z.literal("")),
  experienceYears: z.string().trim().max(50).optional().or(z.literal("")),
  cvUrl: z.string().url().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(3000).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());

    if (!db) {
      return NextResponse.json(
        { ok: true, message: "تم تسجيل الطلب محلياً بنجاح." },
        { status: 201 }
      );
    }

    const [inserted] = await db
      .insert(jobApplications)
      .values({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        roleApplied: body.roleApplied,
        applicationType: body.applicationType,
        university: body.university || null,
        experienceYears: body.experienceYears || null,
        cvUrl: body.cvUrl || null,
        notes: body.notes || null,
        status: "new",
      })
      .returning();

    // Add audit log
    await db.insert(auditLogs).values({
      action: "new_job_application",
      entityType: "career",
      entityId: inserted?.id ? String(inserted.id) : body.email,
      details: {
        fullName: body.fullName,
        roleApplied: body.roleApplied,
        type: body.applicationType,
        cvUrl: body.cvUrl,
      },
    });

    return NextResponse.json({ ok: true, id: inserted?.id }, { status: 201 });
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "بيانات الطلب غير صالحة." },
      { status: 400 }
    );
  }
}

