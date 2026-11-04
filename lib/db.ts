import { drizzle } from "drizzle-orm/mysql2";
import { and, asc, desc, eq } from "drizzle-orm";
import mysql from "mysql2/promise";
import { auditLogs, contactInquiries, contentItems, siteSettings } from "@/drizzle/schema";
import { readLocalStore } from "@/lib/local-store";

const url = process.env.DATABASE_URL || process.env.DRIZZLE_DATABASE_URL;
const pool = url ? mysql.createPool({ uri: url, connectionLimit: 5, enableKeepAlive: true }) : null;
export const db = pool ? drizzle(pool) : null;

export async function closeDatabase() {
  await pool?.end();
}

export async function getPublishedContent(type: "service" | "product" | "page" | "post") {
  if (!db) {
    const store = readLocalStore();
    return store.items
      .filter((item) => item.type === type && item.status === "published")
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return db
    .select()
    .from(contentItems)
    .where(and(eq(contentItems.type, type), eq(contentItems.status, "published")))
    .orderBy(asc(contentItems.displayOrder));
}

export async function getPublishedContentBySlug(slug: string) {
  if (!db) {
    const store = readLocalStore();
    const item = store.items.find((i) => i.slug === slug && i.status === "published");
    return item ?? null;
  }
  const [item] = await db
    .select()
    .from(contentItems)
    .where(and(eq(contentItems.slug, slug), eq(contentItems.status, "published")))
    .limit(1);
  return item ?? null;
}

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  if (!db) {
    const store = readLocalStore();
    const found = store.settings.find((s) => s.key === key);
    return (found?.value as T | undefined) ?? fallback;
  }
  const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return (setting?.value as T | undefined) ?? fallback;
}

export async function getAdminStudioData() {
  if (!db) {
    const store = readLocalStore();
    return {
      items: store.items,
      inquiries: store.inquiries,
      settings: store.settings,
      logs: store.logs,
    };
  }
  const [items, inquiries, settings, logs] = await Promise.all([
    db.select().from(contentItems).orderBy(desc(contentItems.updatedAt)).limit(50),
    db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt)).limit(50),
    db.select().from(siteSettings).orderBy(desc(siteSettings.updatedAt)),
    db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(20),
  ]);
  return JSON.parse(JSON.stringify({ items, inquiries, settings, logs }));
}
