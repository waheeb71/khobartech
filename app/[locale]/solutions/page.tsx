import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, Layers, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFrame } from "@/components/PhotoFrame";
import type { Locale } from "@/lib/catalog";
import { solutions } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/solutions",
    title: locale === "ar" ? "حلول الأعمال التقنية | تكنولوجيا الخبر" : "Business Technology Solutions | Khobar Tech",
    description:
      locale === "ar"
        ? "حلول تكنولوجيا الخبر المتكاملة لإدارة العمليات، المحاسبة والمالية، الموارد البشرية، خدمة العملاء، وسلاسل الإمداد."
        : "Khobar Tech integrated solutions for operations, accounting, finance, HR, CRM, and supply chain management.",
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];

  return (
    <>
      <JsonLd data={organizationJsonLd(l)} />

      {/* Header */}
      <section className="page-hero-banner">
        <div className="page-hero-bg">
          <PhotoFrame
            src="/hero.jpg"
            alt={l === "ar" ? "خلفية حلول تكنولوجيا الخبر" : "Khobar Tech solutions background"}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="reveal">
            <p className="eyebrow">{l === "ar" ? "حلول مؤسسية" : "Enterprise Solutions"}</p>
            <h1 className="heading mt-4 text-4xl sm:text-6xl">
              {l === "ar"
                ? "حلول مصممة خصيصاً للتحديات التشغيلية المعاصرة."
                : "Solutions Engineered for Modern Operational Challenges."}
            </h1>
            <p className="lede mt-6 max-w-2xl text-slate-300">
              {l === "ar"
                ? "نحول العمليات التقليدية إلى بيئات عمل رقمية ذكية ومترابطة عبر دمج أنظمة ERP، الذكاء الاصطناعي، وأتمتة مسارات العمل لضمان دقة اتخاذ القرار."
                : "Transforming traditional workflows into intelligent, connected digital environments by combining ERP, AI, and workflow automation for sharper decisions."}
            </p>
          </div>
          <PhotoFrame
            src="/images/redesign/enterprise-analytics.webp"
            alt={l === "ar" ? "مؤشرات وحلول أعمال متطورة" : "Advanced business intelligence"}
            className="aspect-[16/11] rounded-2xl border border-white/10 shadow-2xl reveal-scale"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
          />
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 sm:py-24 bg-[#080f1e] border-t border-white/10">
        <div className="shell">
          <div className="max-w-3xl reveal">
            <span className="text-xs font-bold text-cyan uppercase tracking-wider">
              {l === "ar" ? "المنظومة التقنية" : "Solution Spectrum"}
            </span>
            <h2 className="heading mt-2 text-3xl sm:text-4xl">
              {l === "ar" ? "مجالات تترابط لتحقيق أقصى فاعلية تشغيلية" : "Connected domains driving operational excellence"}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
            {solutions.map((solution, index) => {
              const num = String(index + 1).padStart(2, "0");
              return (
                <div
                  key={solution.en}
                  className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-6 hover:border-cyan/40 hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 text-cyan border border-cyan/20">
                        <Layers size={18} />
                      </span>
                      <span className="text-lg font-black text-cyan/40">{num}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">{solution[l]}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {l === "ar" ? solution.detailAr : solution.detailEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-cyan">
                    <CheckCircle2 size={14} />
                    <span>{l === "ar" ? "حل جاهز للتخصيص والتكامل" : "Ready for custom integration"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "خطوتك التالية" : "Your Next Step"}
            </p>
            <h2>{l === "ar" ? "ما هو التحدي الذي ترغب في حله داخل مؤسستك؟" : "What challenge are you looking to solve?"}</h2>
            <p>{l === "ar" ? "مهندسونا التقنيون مستعدون لتحليل متطلباتك واقتراح الهيكل الأنسب." : "Our tech architects are ready to review your requirements and propose the ideal setup."}</p>
          </div>
          <Link className="btn-primary" href={localeHref(l, "/contact")}>
            {t.nav.start}
            <ArrowUpLeft size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}

