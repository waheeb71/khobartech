import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { auditLogs, contactInquiries, contentItems, siteSettings } from "@/drizzle/schema";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { sanitizeRichText } from "@/lib/sanitize";
import { readLocalStore, writeLocalStore, StoredContentItem } from "@/lib/local-store";

const contentSchema = z.object({
  id: z.number().int().optional(),
  type: z.enum(["service", "product", "page", "post", "testimonial", "portfolio"]),
  category: z.string().max(100).optional().or(z.literal("")),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(191),
  titleAr: z.string().min(2).max(255),
  titleEn: z.string().min(2).max(255),
  excerptAr: z.string().max(5000).optional().or(z.literal("")),
  excerptEn: z.string().max(5000).optional().or(z.literal("")),
  bodyAr: z.string().max(20000).optional().or(z.literal("")),
  bodyEn: z.string().max(20000).optional().or(z.literal("")),
  imageKey: z.string().max(500).optional().or(z.literal("")),
  seoTitleAr: z.string().max(255).optional().or(z.literal("")),
  seoTitleEn: z.string().max(255).optional().or(z.literal("")),
  seoDescriptionAr: z.string().max(5000).optional().or(z.literal("")),
  seoDescriptionEn: z.string().max(5000).optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]),
  displayOrder: z.number().int().min(0).max(9999),
});

export async function GET() {
  try {
    await requireAdmin();
    if (!db) {
      const store = readLocalStore();
      return NextResponse.json({
        items: store.items,
        inquiries: store.inquiries,
        settings: store.settings,
        logs: store.logs,
      });
    }
    const [items, inquiries, settings, logs] = await Promise.all([
      db.select().from(contentItems).orderBy(desc(contentItems.updatedAt)).limit(50),
      db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt)).limit(50),
      db.select().from(siteSettings).orderBy(desc(siteSettings.updatedAt)),
      db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(20),
    ]);
    return NextResponse.json({ items, inquiries, settings, logs });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const actor = await requireAdmin();
    const input = (await request.json()) as { action?: string; payload?: unknown };

    if (input.action === "setting") {
      const parsed = z.object({ key: z.string().min(1).max(191) }).passthrough().parse(input.payload);
      if (!("value" in parsed)) throw new Error("Setting value is required.");
      const setting = { key: parsed.key, value: (parsed as unknown as { value: unknown }).value };

      if (!db) {
        const store = readLocalStore();
        const now = new Date().toISOString();
        const idx = store.settings.findIndex((s) => s.key === parsed.key);
        if (idx >= 0) {
          store.settings[idx] = { ...store.settings[idx], value: setting.value, updatedAt: now };
        } else {
          store.settings.unshift({ id: Date.now(), key: parsed.key, value: setting.value, updatedAt: now });
        }
        store.logs.unshift({
          id: Date.now(),
          action: "update",
          entityType: "setting",
          entityId: setting.key,
          details: { key: setting.key },
          createdAt: now,
        });
        writeLocalStore(store);
        return NextResponse.json({ ok: true });
      }

      await db.insert(siteSettings).values(setting).onDuplicateKeyUpdate({ set: { value: setting.value } });
      await db.insert(auditLogs).values({
        action: "update",
        entityType: "setting",
        entityId: setting.key,
        details: { key: setting.key },
      });
      return NextResponse.json({ ok: true });
    }

    const value = contentSchema.parse(input.payload);
    const values = {
      ...value,
      category: value.category || null,
      excerptAr: value.excerptAr || null,
      excerptEn: value.excerptEn || null,
      bodyAr: sanitizeRichText(value.bodyAr),
      bodyEn: sanitizeRichText(value.bodyEn),
      imageKey: value.imageKey || null,
      seoTitleAr: value.seoTitleAr || null,
      seoTitleEn: value.seoTitleEn || null,
      seoDescriptionAr: value.seoDescriptionAr || null,
      seoDescriptionEn: value.seoDescriptionEn || null,
      publishedAt: value.status === "published" ? new Date() : null,
    };

    if (!db) {
      const store = readLocalStore();
      const now = new Date().toISOString();
      if (value.id) {
        const idx = store.items.findIndex((i) => i.id === value.id);
        if (idx >= 0) {
          store.items[idx] = {
            ...store.items[idx],
            ...values,
            publishedAt: values.publishedAt ? values.publishedAt.toISOString() : null,
            updatedAt: now,
          } as StoredContentItem;
        }
      } else {
        const newId = store.items.length > 0 ? Math.max(...store.items.map((i) => i.id)) + 1 : 1;
        store.items.unshift({
          id: newId,
          ...values,
          publishedAt: values.publishedAt ? values.publishedAt.toISOString() : null,
          createdAt: now,
          updatedAt: now,
        } as StoredContentItem);
      }
      store.logs.unshift({
        id: Date.now(),
        action: value.id ? "update" : "create",
        entityType: value.type,
        entityId: value.slug,
        details: { actor: actor.email, status: value.status },
        createdAt: now,
      });
      writeLocalStore(store);
      return NextResponse.json({ ok: true });
    }

    if (value.id) await db.update(contentItems).set(values).where(eq(contentItems.id, value.id));
    else await db.insert(contentItems).values(values);
    await db.insert(auditLogs).values({
      action: value.id ? "update" : "create",
      entityType: value.type,
      entityId: value.slug,
      details: { actor: actor.email, status: value.status },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
