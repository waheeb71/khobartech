import type { Locale } from "@/lib/catalog";

type LocalImage = { src: string; alt: Record<Locale, string> };

export const homeImage: LocalImage = {
  src: "/hero.jpg",
  alt: {
    ar: "أفق الرياض الذكي وشبكات التقنية الحديثة",
    en: "Riyadh smart city skyline with connected digital networks",
  },
};

export const servicePhotos: Record<string, LocalImage> = {
  enterprise: {
    src: "/images/redesign/enterprise-analytics.webp",
    alt: { ar: "فريق عمل يراجع مؤشرات مالية وتقنية على شاشة بيانات", en: "Colleagues reviewing business and technology analytics" },
  },
  development: {
    src: "/images/redesign/development-collaboration.webp",
    alt: { ar: "مطوّران يتعاونان على برمجة تطبيق باستخدام حاسوب محمول", en: "Two developers collaborating on application code at a laptop" },
  },
  "saas-cloud": {
    src: "/images/redesign/saas-data-center.webp",
    alt: { ar: "ممر مركز بيانات حديث يضم رفوفاً للخوادم", en: "A modern data-centre aisle lined with server racks" },
  },
  "ai-automation": {
    src: "/images/redesign/ai-neural-network.webp",
    alt: { ar: "تصوير رقمي لشبكة عصبية وذكاء اصطناعي", en: "A digital neural-network and artificial intelligence concept" },
  },
  cybersecurity: {
    src: "/images/redesign/cybersecurity-analyst.webp",
    alt: { ar: "مختص أمن معلومات يراقب شيفرة ومؤشرات حماية على الشاشة", en: "A security specialist monitoring code and protection signals on screen" },
  },
  "digital-marketing": {
    src: "/images/redesign/marketing-analytics.webp",
    alt: { ar: "مختصون يراجعون مؤشرات أداء الحملات على جهاز لوحي", en: "Marketers reviewing campaign performance data on a tablet" },
  },
  "infrastructure-devops": {
    src: "/images/redesign/infrastructure-servers.webp",
    alt: { ar: "تجهيزات خوادم وشبكات في بنية مركز بيانات", en: "Server and network equipment in a data-centre infrastructure" },
  },
  "digital-transformation": {
    src: "/images/redesign/consulting-team.webp",
    alt: { ar: "أعضاء فريق يحللون تقارير ومؤشرات خلال جلسة عمل", en: "Team members analysing reports and metrics in a working session" },
  },
};

export const blogImages: Record<string, LocalImage> = {
  "erp-guide": servicePhotos.enterprise,
  "accounting-software": {
    src: "/images/redesign/marketing-analytics.webp",
    alt: { ar: "تقارير ومؤشرات مالية على جهاز لوحي خلال اجتماع عمل", en: "Financial reports and metrics on a tablet during a business meeting" },
  },
  "cybersecurity-basics": servicePhotos.cybersecurity,
  "ai-business": servicePhotos["ai-automation"],
  "software-architecture": servicePhotos.development,
  "digital-transformation": servicePhotos["digital-transformation"],
};

export function getBlogImage(slug: string, fallback?: string): LocalImage {
  return blogImages[slug] ?? (fallback && blogImages[fallback]) ?? blogImages["erp-guide"];
}
