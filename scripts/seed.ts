import { sql } from "drizzle-orm";
import { closeDatabase, db } from "@/lib/db";
import { contentItems, siteSettings } from "@/drizzle/schema";
import { blogTopics, flatServices } from "@/lib/catalog";

async function main() {
  if (!db) throw new Error("DATABASE_URL is required to seed the Najah Code CMS database.");
  for (const service of flatServices) {
    await db.insert(contentItems).values({ type: "service", category: service.group.slug, slug: service.slug, titleAr: service.title.ar, titleEn: service.title.en, excerptAr: service.description.ar, excerptEn: service.description.en, bodyAr: service.description.ar, bodyEn: service.description.en, seoTitleAr: service.title.ar, seoTitleEn: service.title.en, seoDescriptionAr: service.description.ar, seoDescriptionEn: service.description.en, status: "published", displayOrder: 0, metadata: { category: service.group.slug } }).onDuplicateKeyUpdate({ set: { updatedAt: sql`CURRENT_TIMESTAMP` } });
  }
  for (const post of blogTopics) {
    await db.insert(contentItems).values({ type: "post", category: post.categoryEn, slug: post.slug, titleAr: post.ar, titleEn: post.en, excerptAr: `دليل عملي من نجاح كود حول ${post.categoryAr} يساعد فرق الأعمال على اتخاذ قرار تقني واعٍ.`, excerptEn: `A practical Najah Code guide to ${post.categoryEn} for better technology decisions.`, bodyAr: `في هذا الدليل، نوضح كيف ترتبط ${post.categoryAr} بنتائج الأعمال، وما الأسئلة التي ينبغي لفريقك الإجابة عنها قبل اختيار الحل أو بدء التنفيذ.\n\nابدأ بتحديد المشكلة والبيانات التي تحتاجها ومقياس النجاح. بعد ذلك، صمّم مرحلة أولى قابلة للقياس، ثم طوّرها بناءً على ما تتعلمه من التشغيل الفعلي.`, bodyEn: `In this guide, we connect ${post.categoryEn} to business outcomes and outline the questions your team should answer before choosing a solution or starting delivery.\n\nStart by defining the problem, the information you need, and the measure of success. Then design a measurable first phase and improve it using what real operations teach you.`, status: "published", displayOrder: 0 }).onDuplicateKeyUpdate({ set: { status: "published", bodyAr: `في هذا الدليل، نوضح كيف ترتبط ${post.categoryAr} بنتائج الأعمال، وما الأسئلة التي ينبغي لفريقك الإجابة عنها قبل اختيار الحل أو بدء التنفيذ.\n\nابدأ بتحديد المشكلة والبيانات التي تحتاجها ومقياس النجاح. بعد ذلك، صمّم مرحلة أولى قابلة للقياس، ثم طوّرها بناءً على ما تتعلمه من التشغيل الفعلي.`, bodyEn: `In this guide, we connect ${post.categoryEn} to business outcomes and outline the questions your team should answer before choosing a solution or starting delivery.\n\nStart by defining the problem, the information you need, and the measure of success. Then design a measurable first phase and improve it using what real operations teach you.`, updatedAt: sql`CURRENT_TIMESTAMP` } });
  }
  await db.insert(siteSettings).values({ key: "home.hero", value: { ar: { eyebrow: "هندسة رقمية للأعمال الطموحة", title: "نبني التقنية التي تدفع أعمالك إلى الأمام.", body: "من الأنظمة المؤسسية إلى التطبيقات الذكية ومنتجات SaaS، نصمم ونطور حلولًا رقمية تساعد أعمالك على النمو." }, en: { eyebrow: "Digital engineering for ambitious businesses", title: "We Build Technology That Moves Your Business Forward.", body: "From enterprise systems to intelligent applications and SaaS products, we build digital solutions that help businesses grow." } } }).onDuplicateKeyUpdate({ set: { updatedAt: sql`CURRENT_TIMESTAMP` } });
  await closeDatabase();
  console.log(`Seeded ${flatServices.length} services, ${blogTopics.length} draft posts, and home settings.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
