import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, Check, MoveUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { PhotoFrame } from "@/components/PhotoFrame";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/lib/catalog";
import { getService, flatServices } from "@/lib/catalog";
import { getPublishedContentBySlug } from "@/lib/db";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

const plain = (value: string | null) => (value || "").replace(/<[^>]*>/g, "").trim();
const imageSrc = (key: string) =>
  key.startsWith("/images/") || key.startsWith("/manus-storage/")
    ? key
    : `/manus-storage/${key.replace(/^\/+/, "")}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) return {};
  const service = getService(category, slug);
  if (!service) return {};
  const content = await getPublishedContentBySlug(slug);
  const title =
    locale === "ar"
      ? content?.seoTitleAr || content?.titleAr || service.title.ar
      : content?.seoTitleEn || content?.titleEn || service.title.en;
  const description =
    locale === "ar"
      ? content?.seoDescriptionAr || content?.excerptAr || service.description.ar
      : content?.seoDescriptionEn || content?.excerptEn || service.description.en;
  return pageMetadata({
    locale,
    path: `/services/${category}/${slug}`,
    title: `${title} | تكنلوجيا الخبير`,
    description,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const service = getService(category, slug);
  if (!service) notFound();
  const content = await getPublishedContentBySlug(slug);
  const t = copy[l];
  const title = l === "ar" ? content?.titleAr || service.title.ar : content?.titleEn || service.title.en;
  const description =
    l === "ar" ? content?.excerptAr || service.description.ar : content?.excerptEn || service.description.en;
  const body = plain(l === "ar" ? content?.bodyAr || null : content?.bodyEn || null);
  const related = flatServices
    .filter((item) => item.group.slug === service.group.slug && item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(title, description, l, `/services/${category}/${slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: t.nav.home, path: "" },
          { name: t.nav.services, path: "/services" },
          { name: service.group.title[l], path: `/services/${category}` },
          { name: title, path: `/services/${category}/${slug}` },
        ])}
      />

      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 bg-[#0b1628]">
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="reveal">
            <Link
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-white transition mb-6"
              href={localeHref(l, `/services/${category}`)}
            >
              {l === "ar" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {service.group.title[l]}
            </Link>
            <p className="eyebrow">{l === "ar" ? "خدمة متخصصة" : "Specialist Service"}</p>
            <h1 className="heading mt-4 text-4xl sm:text-6xl">{title}</h1>
            <p className="lede mt-6 max-w-2xl text-slate-300">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="btn-primary" href={localeHref(l, "/contact")}>
                {l === "ar" ? "طلب تنفيذ هذه الخدمة" : "Request This Service"}
                <ArrowUpLeft size={17} />
              </Link>
            </div>
          </div>
          <div className="relative reveal-scale">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan/20 to-blue/20 rounded-3xl blur-xl" />
            {content?.imageKey ? (
              <PhotoFrame
                src={imageSrc(content.imageKey)}
                alt={title}
                className="relative aspect-[16/11] rounded-2xl border border-white/10 shadow-2xl"
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            ) : (
              <AssetPlaceholder
                asset={service.group.asset}
                alt={service.group.title[l]}
                className="relative aspect-[16/11] rounded-2xl border border-white/10 shadow-2xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Content body if exists */}
      {body && (
        <section className="py-12 bg-[#080f1e] border-t border-white/10">
          <div className="shell max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-8 sm:p-12 text-slate-200 leading-relaxed text-base sm:text-lg whitespace-pre-wrap reveal">
              {body}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities & Impact */}
      <section className="py-16 sm:py-20 bg-[#0f1f3d] border-t border-white/10">
        <div className="shell grid gap-8 lg:grid-cols-2 reveal-stagger">
          <div className="rounded-2xl border border-white/10 bg-[#0b1628]/80 p-8 backdrop-blur-md">
            <span className="text-xs font-bold text-cyan uppercase tracking-wider">
              {l === "ar" ? "نطاق التنفيذ" : "Scope of Delivery"}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              {l === "ar" ? "ما نقوم بتنفيذه وربطه" : "What We Implement & Integrate"}
            </h2>
            <ul className="mt-6 space-y-4">
              {service.group.capabilities[l].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan mt-0.5">
                    <Check size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1628]/80 p-8 backdrop-blur-md">
            <span className="text-xs font-bold text-cyan uppercase tracking-wider">
              {l === "ar" ? "العائد والأثر" : "Business Impact"}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              {l === "ar" ? "المخرجات المتوقعة لمؤسستك" : "Expected Deliverables for Your Team"}
            </h2>
            <ul className="mt-6 space-y-4">
              {service.group.benefits[l].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan mt-0.5">
                    <Check size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 bg-[#080f1e] border-t border-white/10">
          <div className="shell">
            <div className="reveal">
              <p className="eyebrow">{l === "ar" ? "خدمات متصلة" : "Related Services"}</p>
              <h2 className="heading mt-2 text-3xl font-bold">
                {l === "ar" ? "خدمات أخرى تعزز هذا الحل" : "Complementary Services"}
              </h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3 reveal-stagger">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={localeHref(l, `/services/${item.group.slug}/${item.slug}`)}
                  className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-6 hover:border-cyan/40 hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                >
                  <h3 className="text-lg font-bold text-white hover:text-cyan transition">
                    {item.title[l]}
                  </h3>
                  <div className="mt-6 flex items-center justify-between text-xs font-semibold text-cyan">
                    <span>{t.common.learn}</span>
                    <MoveUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "استشارة مجانية" : "Free Consultation"}
            </p>
            <h2>{l === "ar" ? "هل ترغب بمناقشة تطبيق هذه الخدمة لمؤسستك؟" : "Ready to discuss this solution for your business?"}</h2>
            <p>{l === "ar" ? "فريق تكنلوجيا الخبير متواجد للإجابة على جميع الاستفسارات وتقديم خطة مقترحة." : "Khobar Tech engineers are ready to answer your questions and draft a proposed plan."}</p>
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
