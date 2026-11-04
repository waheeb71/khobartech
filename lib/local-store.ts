import fs from "fs";
import path from "path";
import { flatServices, blogTopics } from "@/lib/catalog";

export interface StoredContentItem {
  id: number;
  type: "service" | "product" | "page" | "post" | "testimonial" | "portfolio";
  category: string | null;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string | null;
  excerptEn: string | null;
  bodyAr: string | null;
  bodyEn: string | null;
  imageKey: string | null;
  seoTitleAr: string | null;
  seoTitleEn: string | null;
  seoDescriptionAr: string | null;
  seoDescriptionEn: string | null;
  status: "draft" | "published" | "archived";
  displayOrder: number;
  metadata?: unknown;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StoredInquiry {
  id: number;
  fullName: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string;
  budget: string | null;
  description: string;
  status: string;
  locale?: string;
  createdAt: string;
}

export interface StoredSetting {
  id: number;
  key: string;
  value: unknown;
  updatedAt: string;
}

export interface StoredAuditLog {
  id: number;
  action: string;
  entityType: string;
  entityId: string | null;
  details?: unknown;
  createdAt: string;
}

interface LocalStoreData {
  items: StoredContentItem[];
  inquiries: StoredInquiry[];
  settings: StoredSetting[];
  logs: StoredAuditLog[];
}

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "cms-store.json");

function getInitialData(): LocalStoreData {
  const now = new Date().toISOString();
  let idCounter = 1;

  const items: StoredContentItem[] = [];

  for (const service of flatServices) {
    items.push({
      id: idCounter++,
      type: "service",
      category: service.group.slug,
      slug: service.slug,
      titleAr: service.title.ar,
      titleEn: service.title.en,
      excerptAr: service.description.ar,
      excerptEn: service.description.en,
      bodyAr: service.description.ar,
      bodyEn: service.description.en,
      imageKey: "",
      seoTitleAr: service.title.ar,
      seoTitleEn: service.title.en,
      seoDescriptionAr: service.description.ar,
      seoDescriptionEn: service.description.en,
      status: "published",
      displayOrder: 0,
      metadata: { category: service.group.slug },
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  }

  for (const post of blogTopics) {
    items.push({
      id: idCounter++,
      type: "post",
      category: post.categoryEn,
      slug: post.slug,
      titleAr: post.ar,
      titleEn: post.en,
      excerptAr: `دليل عملي من نجاح كود حول ${post.categoryAr}.`,
      excerptEn: `A practical Najah Code guide to ${post.categoryEn}.`,
      bodyAr: `في هذا الدليل، نوضح كيف ترتبط ${post.categoryAr} بنتائج الأعمال، وما الأسئلة التي ينبغي لفريقك الإجابة عنها قبل اختيار الحل أو بدء التنفيذ.`,
      bodyEn: `In this guide, we connect ${post.categoryEn} to business outcomes and outline the questions your team should answer.`,
      imageKey: "",
      seoTitleAr: post.ar,
      seoTitleEn: post.en,
      seoDescriptionAr: `دليل عملي حول ${post.categoryAr}`,
      seoDescriptionEn: `A practical guide to ${post.categoryEn}`,
      status: "published",
      displayOrder: 0,
      metadata: null,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  }

  const settings: StoredSetting[] = [
    {
      id: 1,
      key: "home.hero",
      value: {
        ar: {
          eyebrow: "هندسة رقمية للأعمال الطموحة",
          title: "نبني التقنية التي تدفع أعمالك إلى الأمام.",
          body: "من الأنظمة المؤسسية إلى التطبيقات الذكية ومنتجات SaaS، نصمم ونطور حلولًا رقمية تساعد أعمالك على النمو.",
        },
        en: {
          eyebrow: "Digital engineering for ambitious businesses",
          title: "We Build Technology That Moves Your Business Forward.",
          body: "From enterprise systems to intelligent applications and SaaS products, we build digital solutions that help businesses grow.",
        },
      },
      updatedAt: now,
    },
  ];

  return {
    items,
    inquiries: [],
    settings,
    logs: [
      {
        id: 1,
        action: "init",
        entityType: "system",
        entityId: "cms",
        details: "تهيئة المخزن المحلي",
        createdAt: now,
      },
    ],
  };
}

export function readLocalStore(): LocalStoreData {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(storePath)) {
      const initial = getInitialData();
      fs.writeFileSync(storePath, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const raw = fs.readFileSync(storePath, "utf8");
    return JSON.parse(raw) as LocalStoreData;
  } catch (error) {
    console.error("Failed to read local store:", error);
    return getInitialData();
  }
}

export function writeLocalStore(data: LocalStoreData) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write local store:", error);
  }
}

