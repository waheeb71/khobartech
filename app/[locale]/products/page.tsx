import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, Plus, Cpu, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFrame } from "@/components/PhotoFrame";
import type { Locale } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { getPublishedContent } from "@/lib/db";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/products",
    title: locale === "ar" ? "منتجاتنا الرقمية والمنصات | تكنولوجيا الخبر" : "Digital Products & Platforms | Khobar Tech",
    description:
      locale === "ar"
        ? "استعرض منتجات ومنصات تكنولوجيا الخبر السحابية المصممة لقطاعات الأعمال في المملكة العربية السعودية."
        : "Explore Khobar Tech cloud products and SaaS platforms tailored for Saudi businesses.",
  });
}

const imageSrc = (imageKey: string | null) => {
  if (!imageKey) return null;
  if (imageKey.startsWith("/images/") || imageKey.startsWith("/manus-storage/")) return imageKey;
  return `/manus-storage/${imageKey.replace(/^\/+/, "")}`;
};

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const products = await getPublishedContent("product");

  return (
    <>
      <JsonLd data={organizationJsonLd(l)} />

      {/* Header */}
      <section className="page-hero-banner">
        <div className="page-hero-bg">
          <PhotoFrame
            src="/hero.jpg"
            alt={l === "ar" ? "خلفية منتجات تكنولوجيا الخبر" : "Khobar Tech products background"}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 reveal">
          <p className="eyebrow">{l === "ar" ? "منتجاتنا السحابية" : "Cloud Products"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-6xl max-w-4xl">
            {l === "ar"
              ? "منصات وحلول جاهزة لتسريع دورة عملك."
              : "Ready-to-deploy platforms accelerating your operations."}
          </h1>
          <p className="lede mt-6 max-w-3xl text-slate-300">
            {l === "ar"
              ? "نبني منتجاتنا البرمجية بمعايير المؤسسات الكبرى: بنية متعددة المستأجرين، أمان فائق، وتكامل سلس مع الأنظمة الحكومية والمالية في المملكة."
              : "We build enterprise-grade software products: multi-tenant architecture, robust security, and seamless integration with Saudi regulatory ecosystems."}
          </p>
        </div>
      </section>

      {/* Products list */}
      <section className="py-16 sm:py-24 bg-[#080f1e] border-t border-white/10">
        <div className="shell">
          {products.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger">
              {products.map((product) => {
                const image = imageSrc(product.imageKey);
                const title = l === "ar" ? product.titleAr : product.titleEn;
                const excerpt = l === "ar" ? product.excerptAr : product.excerptEn;
                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1f3d] transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_10px_30px_rgba(0,212,232,0.12)]"
                  >
                    <Link href={localeHref(l, `/products/${product.slug}`)} className="relative aspect-[16/10] overflow-hidden">
                      <PhotoFrame
                        src={image || "/images/redesign/saas-data-center.webp"}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d] via-transparent to-transparent opacity-80" />
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-bold text-cyan">
                        {product.category || (l === "ar" ? "منصة SaaS" : "SaaS Platform")}
                      </span>
                      <h2 className="mt-2 text-xl font-bold text-white transition group-hover:text-cyan">
                        <Link href={localeHref(l, `/products/${product.slug}`)}>{title}</Link>
                      </h2>
                      <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-300">
                        {excerpt}
                      </p>
                      <Link
                        className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-cyan hover:text-white transition"
                        href={localeHref(l, `/products/${product.slug}`)}
                      >
                        {t.common.learn}
                        <ArrowUpLeft size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2 items-center rounded-2xl border border-white/10 bg-[#0f1f3d] p-8 sm:p-14 overflow-hidden relative reveal">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan border border-cyan/20 mb-6">
                  <Cpu size={24} />
                </span>
                <span className="text-xs font-bold text-cyan uppercase tracking-wider">
                  {l === "ar" ? "قيد التجهيز والإطلاق" : "In Active Deployment"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {l === "ar"
                    ? "منصات وحلول سحابية نوعية قادمة لخدمتكم"
                    : "Next-gen platforms being readied for market launch"}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  {l === "ar"
                    ? "نطور حالياً منتجات متخصصة في إدارة المشتريات، الذكاء الاصطناعي للمستندات، وتكاملات الفوترة والامتثال السعودي، وسيتم إطلاقها قريباً."
                    : "We are currently finalizing specialized products for procurement automation, document AI, and Saudi regulatory compliance."}
                </p>
                <Link className="btn-primary mt-8" href={localeHref(l, "/contact")}>
                  {l === "ar" ? "اطلب عرضاً تجريبياً مبكراً" : "Request Early Demo"}
                  <ArrowUpLeft size={16} />
                </Link>
              </div>

              <div className="reveal-scale">
                <PhotoFrame
                  src="/images/redesign/saas-data-center.webp"
                  alt={l === "ar" ? "بنية سحابية قوية للمنتجات الرقمية" : "Cloud infrastructure for digital platforms"}
                  className="aspect-[16/11] rounded-xl border border-white/10 shadow-2xl"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "تطوير خاص" : "Custom Build"}
            </p>
            <h2>{l === "ar" ? "هل ترغب في بناء منتجك الرقمي الخاص؟" : "Looking to build your own custom platform?"}</h2>
            <p>{l === "ar" ? "نساعدك في تحويل فكرتك إلى منتج رقمي متكامل وقابل للنمو السريع." : "We help turn your business vision into a scalable, market-ready SaaS product."}</p>
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

