import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, asc, desc, eq } from "drizzle-orm";
import { auditLogs, contactInquiries, contentItems, jobApplications, mediaAssets, siteSettings, users } from "@/drizzle/schema";
import { readLocalStore } from "@/lib/local-store";
import { getR2PublicUrl } from "@/lib/r2";

const url = process.env.DATABASE_URL || process.env.DRIZZLE_DATABASE_URL;
const sqlClient = url ? neon(url) : null;
export const db = sqlClient ? drizzle(sqlClient) : null;

export async function closeDatabase() {
  // neon-http is stateless HTTP; no pool to terminate
}

export async function getPublishedContent(type: "service" | "product" | "page" | "post" | "solution" | "portfolio") {
  if (!db) {
    const store = readLocalStore();
    return store.items
      .filter((item) => item.type === type && item.status === "published")
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  try {
    return await db
      .select()
      .from(contentItems)
      .where(and(eq(contentItems.type, type), eq(contentItems.status, "published")))
      .orderBy(asc(contentItems.displayOrder));
  } catch (err) {
    console.error("DB getPublishedContent error, falling back to local:", err);
    const store = readLocalStore();
    return store.items
      .filter((item) => item.type === type && item.status === "published")
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
}

export async function getPublishedContentBySlug(slug: string) {
  if (!db) {
    const store = readLocalStore();
    const item = store.items.find((i) => i.slug === slug && i.status === "published");
    return item ?? null;
  }
  try {
    const [item] = await db
      .select()
      .from(contentItems)
      .where(and(eq(contentItems.slug, slug), eq(contentItems.status, "published")))
      .limit(1);
    return item ?? null;
  } catch (err) {
    console.error("DB getPublishedContentBySlug error, falling back to local:", err);
    const store = readLocalStore();
    const item = store.items.find((i) => i.slug === slug && i.status === "published");
    return item ?? null;
  }
}

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  if (!db) {
    const store = readLocalStore();
    const found = store.settings.find((s) => s.key === key);
    return (found?.value as T | undefined) ?? fallback;
  }
  try {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    return (setting?.value as T | undefined) ?? fallback;
  } catch (err) {
    console.error("DB getSetting error, falling back to local:", err);
    const store = readLocalStore();
    const found = store.settings.find((s) => s.key === key);
    return (found?.value as T | undefined) ?? fallback;
  }
}

export async function getAdminStudioData() {
  if (!db) {
    const store = readLocalStore();
    return {
      items: store.items,
      inquiries: store.inquiries,
      applications: [],
      settings: store.settings,
      logs: store.logs,
      media: [],
      isLiveDb: false,
    };
  }
  try {
    const [items, inquiries, applications, settings, logs, mediaRows] = await Promise.all([
      db.select().from(contentItems).orderBy(desc(contentItems.updatedAt)).limit(100),
      db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt)).limit(100),
      db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt)).limit(100),
      db.select().from(siteSettings).orderBy(desc(siteSettings.updatedAt)),
      db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(50),
      db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt)).limit(100),
    ]);

    const media = mediaRows.map((m) => ({
      ...m,
      url: getR2PublicUrl(m.key),
    }));

    return JSON.parse(JSON.stringify({ items, inquiries, applications, settings, logs, media, isLiveDb: true }));
  } catch (err) {
    console.error("DB getAdminStudioData error, falling back to local:", err);
    const store = readLocalStore();
    return {
      items: store.items,
      inquiries: store.inquiries,
      applications: [],
      settings: store.settings,
      logs: store.logs,
      media: [],
      isLiveDb: false,
    };
  }
}
