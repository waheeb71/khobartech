import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, Check, MoveUpLeft, ArrowRight, ArrowLeft } from "lucide-react";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/lib/catalog";
import { getServiceGroup } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale)) return {};
  const group = getServiceGroup(category);
  if (!group) return {};
  return pageMetadata({
    locale,
    path: `/services/${category}`,
    title: `${group.title[locale]} | تكنلوجيا الخبير`,
    description: group.description[locale],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const group = getServiceGroup(category);
  if (!group) notFound();
  const t = copy[l];

  return (
    <>
      <JsonLd
        data={serviceJsonLd(group.title[l], group.description[l], l, `/services/${category}`)}
      />
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: t.nav.home, path: "" },
          { name: t.nav.services, path: "/services" },
          { name: group.title[l], path: `/services/${category}` },
        ])}
      />

      {/* Header section */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 bg-[#0b1628]">
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="reveal">
            <Link
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-white transition mb-6"
              href={localeHref(l, "/services")}
            >
              {l === "ar" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {t.nav.services}
            </Link>
            <p className="eyebrow">{l === "ar" ? "مجال تخصصي" : "Specialized Area"}</p>
            <h1 className="heading mt-4 text-4xl sm:text-6xl">{group.title[l]}</h1>
            <p className="lede mt-6 max-w-2xl text-slate-300">{group.description[l]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="btn-primary" href={localeHref(l, "/contact")}>
                {l === "ar" ? "طلب استشارة لهذه الخدمة" : "Request Consultation"}
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>
          <div className="relative reveal-scale">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan/20 to-blue/20 rounded-3xl blur-xl" />
            <AssetPlaceholder
              asset={group.asset}
              alt={group.title[l]}
              className="relative aspect-[16/11] rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Capabilities & Benefits */}
      <section className="py-14 sm:py-20 bg-[#0f1f3d] border-t border-white/10">
        <div className="shell grid gap-8 lg:grid-cols-2 reveal-stagger">
          {/* Capabilities */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1628]/80 p-8 backdrop-blur-md">
            <span className="text-xs font-bold text-cyan uppercase tracking-wider">
              {l === "ar" ? "ما نقدمه" : "Capabilities"}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              {l === "ar" ? "القدرات الفنية والتنفيذية" : "Technical & Delivery Capabilities"}
            </h2>
            <ul className="mt-6 space-y-4">
              {group.capabilities[l].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200 font-medium">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan mt-0.5">
                    <Check size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1628]/80 p-8 backdrop-blur-md">
            <span className="text-xs font-bold text-cyan uppercase tracking-wider">
              {l === "ar" ? "الأثر الإيجابي" : "Business Benefits"}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              {l === "ar" ? "القيمة المضافة لأعمالك" : "Value Added To Your Business"}
            </h2>
            <ul className="mt-6 space-y-4">
              {group.benefits[l].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200 font-medium">
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

      {/* Sub-services list */}
      <section className="py-16 sm:py-24 bg-[#080f1e] border-t border-white/10">
        <div className="shell">
          <div className="max-w-2xl mb-12 reveal">
            <p className="eyebrow">{l === "ar" ? "الخدمات الفرعية" : "Specific Services"}</p>
            <h2 className="heading mt-2 text-3xl sm:text-4xl">
              {l === "ar" ? "تطبيقات وحلول ضمن هذا النطاق" : "Services available within this discipline"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger">
            {group.items.map(([slug, ar, en], i) => (
              <Link
                href={localeHref(l, `/services/${group.slug}/${slug}`)}
                key={slug}
                className="group rounded-2xl border border-white/10 bg-[#0f1f3d] p-6 hover:border-cyan/40 hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black text-cyan/60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-cyan transition">
                    {l === "ar" ? ar : en}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {l === "ar"
                      ? `تنفيذ متخصص لخدمة ${ar} بأعلى المعايير الهندسية والأمنية.`
                      : `Specialized implementation of ${en} adhering to strict enterprise standards.`}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan">
                  <span>{t.common.learn}</span>
                  <MoveUpLeft size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "تحدث مع خبير" : "Talk to an Expert"}
            </p>
            <h2>{l === "ar" ? "هل لديك متطلبات خاصة لهذه الخدمة؟" : "Have specific needs for this service?"}</h2>
            <p>{l === "ar" ? "شاركنا التفاصيل لنقدم لك توصية هندسية وتقدير زمني واضح." : "Share your details for an architectural recommendation and timeline."}</p>
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
