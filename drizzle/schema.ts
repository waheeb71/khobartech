import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  openId: varchar("open_id", { length: 191 }).notNull().unique(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  name: varchar("name", { length: 191 }),
  role: mysqlEnum("role", ["owner", "editor", "viewer"]).notNull().default("viewer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

const status = mysqlEnum("status", ["draft", "published", "archived"]);

export const contentItems = mysqlTable("content_items", {
  id: int("id").primaryKey().autoincrement(),
  type: mysqlEnum("type", ["service", "product", "page", "post", "testimonial", "portfolio"]).notNull(),
  category: varchar("category", { length: 100 }),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  excerptAr: text("excerpt_ar"),
  excerptEn: text("excerpt_en"),
  bodyAr: text("body_ar"),
  bodyEn: text("body_en"),
  imageKey: varchar("image_key", { length: 500 }),
  seoTitleAr: varchar("seo_title_ar", { length: 255 }),
  seoTitleEn: varchar("seo_title_en", { length: 255 }),
  seoDescriptionAr: text("seo_description_ar"),
  seoDescriptionEn: text("seo_description_en"),
  status: status.notNull().default("draft"),
  displayOrder: int("display_order").notNull().default(0),
  metadata: json("metadata"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: int("id").primaryKey().autoincrement(),
  key: varchar("key", { length: 191 }).notNull().unique(),
  value: json("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").primaryKey().autoincrement(),
  key: varchar("key", { length: 500 }).notNull().unique(),
  altAr: varchar("alt_ar", { length: 255 }),
  altEn: varchar("alt_en", { length: 255 }),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  width: int("width"),
  height: int("height"),
  createdBy: int("created_by"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactInquiries = mysqlTable("contact_inquiries", {
  id: int("id").primaryKey().autoincrement(),
  fullName: varchar("full_name", { length: 191 }).notNull(),
  company: varchar("company", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 191 }).notNull(),
  budget: varchar("budget", { length: 100 }),
  description: text("description").notNull(),
  locale: varchar("locale", { length: 5 }).notNull().default("ar"),
  status: mysqlEnum("status", ["new", "in_progress", "closed"]).notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").primaryKey().autoincrement(),
  actorId: int("actor_id"),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: varchar("entity_id", { length: 100 }),
  details: json("details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
