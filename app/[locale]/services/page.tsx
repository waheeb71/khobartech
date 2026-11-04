import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, MoveUpLeft, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFrame } from "@/components/PhotoFrame";
import type { Locale } from "@/lib/catalog";
import { serviceGroups } from "@/lib/catalog";
import { servicePhotos } from "@/lib/media";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/services",
    title: locale === "ar" ? "خدماتنا التقنية المتكاملة | تكنولوجيا الخبر" : "Integrated Tech Services | Khobar Tech",
    description:
      locale === "ar"
        ? "استعرض خدمات تكنولوجيا الخبر في حلول تخطيط موارد المؤسسات ERP، أودو، الذكاء الاصطناعي، الأمن السيبراني، وتطوير التطبيقات السحابية."
        : "Explore Khobar Tech services in ERP systems, Odoo, AI & automation, cybersecurity, cloud platforms, and custom software.",
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];

  return (
    <>
      <JsonLd data={organizationJsonLd(l)} />

      {/* Hero Header */}
      <section className="page-hero-banner">
        <div className="page-hero-bg">
          <PhotoFrame
            src="/hero.jpg"
            alt={l === "ar" ? "أفق الرياض الذكي وحلول تكنولوجيا الخبر" : "Khobar Tech smart solutions background"}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 reveal">
          <p className="eyebrow">{l === "ar" ? "دليل الخدمات" : "Service Directory"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-6xl max-w-4xl">
            {l === "ar"
              ? "حلول تقنية متكاملة ترفع كفاءة أعمالك وتدعم نموها."
              : "Integrated Technology Solutions Driving Business Growth."}
          </h1>
          <p className="lede mt-6 max-w-3xl text-slate-300">
            {l === "ar"
              ? "نصمم ونربط ونشغل الأنظمة التقنية الأكثر أهمية لعملياتك: من أنظمة ERP المتقدمة والتطبيقات السحابية، إلى الذكاء الاصطناعي والأمن السيبراني المعزز."
              : "We design, integrate, and operate the essential systems powering your operations: from modern ERP and cloud apps to AI and enterprise cybersecurity."}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-[#080f1e] border-t border-white/10" aria-label={l === "ar" ? "مجالات الخدمات" : "Service Disciplines"}>
        <div className="shell">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
            {serviceGroups.map((group, index) => {
              const image = servicePhotos[group.slug];
              const num = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={group.slug}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1f3d] transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_10px_30px_rgba(0,212,232,0.12)]"
                >
                  <Link href={localeHref(l, `/services/${group.slug}`)} className="relative aspect-[16/10] overflow-hidden">
                    <PhotoFrame
                      src={image.src}
                      alt={image.alt[l]}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 right-3 rounded-md bg-navy/80 px-2.5 py-1 text-xs font-black text-cyan backdrop-blur-md border border-cyan/20">
                      {num}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold text-cyan">
                      {group.items.length} {l === "ar" ? "خدمات متخصصة" : "specialties"}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white transition group-hover:text-cyan">
                      <Link href={localeHref(l, `/services/${group.slug}`)}>{group.title[l]}</Link>
                    </h2>
                    <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-300">
                      {group.description[l]}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs">
                      {group.items.slice(0, 3).map(([slug, ar, en]) => (
                        <Link
                          key={slug}
                          href={localeHref(l, `/services/${group.slug}/${slug}`)}
                          className="rounded-full bg-white/[0.05] px-2.5 py-1 text-slate-300 hover:bg-cyan/15 hover:text-cyan transition"
                        >
                          {l === "ar" ? ar : en}
                        </Link>
                      ))}
                    </div>

                    <Link
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-cyan hover:text-white transition"
                      href={localeHref(l, `/services/${group.slug}`)}
                    >
                      {t.common.learn}
                      <MoveUpLeft size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "هل تبحث عن حل مخصص؟" : "Looking for a tailored solution?"}
            </p>
            <h2>{l === "ar" ? "لنحدد معاً مسار التحول التقني المناسب." : "Let’s define the right technical path."}</h2>
            <p>{l === "ar" ? "تواصل مع خبرائنا لمناقشة أهدافك واحتياجات بيئة عملك." : "Talk to our experts to assess your goals and technical needs."}</p>
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

