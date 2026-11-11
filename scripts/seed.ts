import { sql } from "drizzle-orm";
import { closeDatabase, db } from "@/lib/db";
import { contentItems, siteSettings } from "@/drizzle/schema";
import { blogTopics, flatServices } from "@/lib/catalog";

async function main() {
  if (!db) throw new Error("DATABASE_URL is required to seed the Khobar Tech CMS database.");
  
  for (const service of flatServices) {
    await db
      .insert(contentItems)
      .values({
        type: "service",
        category: service.group.slug,
        slug: service.slug,
        titleAr: service.title.ar,
        titleEn: service.title.en,
        excerptAr: service.description.ar,
        excerptEn: service.description.en,
        bodyAr: service.description.ar,
        bodyEn: service.description.en,
        seoTitleAr: service.title.ar,
        seoTitleEn: service.title.en,
        seoDescriptionAr: service.description.ar,
        seoDescriptionEn: service.description.en,
        status: "published",
        displayOrder: 0,
        metadata: { category: service.group.slug },
      })
      .onConflictDoUpdate({
        target: contentItems.slug,
        set: { updatedAt: sql`NOW()` },
      });
  }

  for (const post of blogTopics) {
    await db
      .insert(contentItems)
      .values({
        type: "post",
        category: post.categoryEn,
        slug: post.slug,
        titleAr: post.ar,
        titleEn: post.en,
        excerptAr: `دليل عملي من تكنولوجيا الخبر حول ${post.categoryAr}.`,
        excerptEn: `A practical Khobar Tech guide to ${post.categoryEn}.`,
        bodyAr: `في هذا الدليل، نوضح كيف ترتبط ${post.categoryAr} بنتائج الأعمال.`,
        bodyEn: `In this guide, we connect ${post.categoryEn} to business outcomes.`,
        status: "published",
        displayOrder: 0,
      })
      .onConflictDoUpdate({
        target: contentItems.slug,
        set: { updatedAt: sql`NOW()` },
      });
  }

  await closeDatabase();
  console.log(`Seeded services and posts successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
