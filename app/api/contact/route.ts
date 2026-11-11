import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactInquiries } from "@/drizzle/schema";
import { readLocalStore, writeLocalStore, StoredInquiry } from "@/lib/local-store";

const schema = z.object({
  fullName: z.string().trim().min(2).max(191),
  company: z.string().trim().max(191).optional().or(z.literal("")),
  email: z.string().trim().email().max(191),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(191),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  description: z.string().trim().min(10).max(5000),
  locale: z.enum(["ar", "en"]).default("ar"),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    if (body.website) return NextResponse.json({ ok: true });

    if (!db) {
      const store = readLocalStore();
      const newId = store.inquiries.length > 0 ? Math.max(...store.inquiries.map((i) => i.id)) + 1 : 1;
      const inquiry: StoredInquiry = {
        id: newId,
        fullName: body.fullName,
        company: body.company || null,
        email: body.email,
        phone: body.phone || null,
        service: body.service,
        budget: body.budget || null,
        description: body.description,
        status: "new",
        locale: body.locale,
        createdAt: new Date().toISOString(),
      };
      store.inquiries.unshift(inquiry);
      writeLocalStore(store);
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    await db.insert(contactInquiries).values({
      fullName: body.fullName,
      company: body.company || null,
      email: body.email,
      phone: body.phone || null,
      service: body.service,
      budget: body.budget || null,
      description: body.description,
      locale: body.locale,
      status: "new",
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json({ error: "Invalid inquiry." }, { status: 400 });
  }
}
