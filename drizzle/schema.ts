import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", ["owner", "editor", "viewer"]);
export const statusEnum = pgEnum("content_status", ["draft", "published", "archived"]);
export const contentTypeEnum = pgEnum("content_type", [
  "service",
  "product",
  "page",
  "post",
  "testimonial",
  "portfolio",
  "solution",
]);
export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "in_progress",
  "contacted",
  "closed",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: text("open_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: text("role").notNull().default("viewer"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'service' | 'product' | 'page' | 'post' | 'solution' | 'portfolio'
  category: text("category"),
  slug: text("slug").notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  excerptAr: text("excerpt_ar"),
  excerptEn: text("excerpt_en"),
  bodyAr: text("body_ar"),
  bodyEn: text("body_en"),
  imageKey: text("image_key"),
  seoTitleAr: text("seo_title_ar"),
  seoTitleEn: text("seo_title_en"),
  seoDescriptionAr: text("seo_description_ar"),
  seoDescriptionEn: text("seo_description_en"),
  status: text("status").notNull().default("draft"), // 'draft' | 'published' | 'archived'
  displayOrder: integer("display_order").notNull().default(0),
  metadata: jsonb("metadata"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  altAr: text("alt_ar"),
  altEn: text("alt_en"),
  mimeType: text("mime_type").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdBy: integer("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service").notNull(),
  budget: text("budget"),
  description: text("description").notNull(),
  locale: text("locale").notNull().default("ar"),
  status: text("status").notNull().default("new"), // 'new' | 'in_progress' | 'contacted' | 'closed'
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  actorId: integer("actor_id"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  details: jsonb("details"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
