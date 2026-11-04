import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, MoveUpLeft, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFrame } from "@/components/PhotoFrame";
import type { Locale } from "@/lib/catalog";
import { getBlogImage } from "@/lib/media";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { getPublishedContent } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/blog",
    title: locale === "ar" ? "المدونة والرؤى التقنية | تكنولوجيا الخبر" : "Insights & Blog | Khobar Tech",
    description:
      locale === "ar"
        ? "مقالات ورؤى تقنية متخصصة من خبراء تكنولوجيا الخبر حول أنظمة المؤسسات، الذكاء الاصطناعي، الأمن السيبراني، وأفضل ممارسات التحول الرقمي."
        : "Expert articles and technology insights from Khobar Tech on ERP systems, AI, cybersecurity, and digital transformation.",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const posts = await getPublishedContent("post");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: l === "ar" ? "مدونة تكنولوجيا الخبر" : "Khobar Tech Insights",
        }}
      />

      {/* Header */}
      <section className="page-hero-banner">
        <div className="page-hero-bg">
          <PhotoFrame
            src="/hero.jpg"
            alt={l === "ar" ? "خلفية مدونة تكنولوجيا الخبر" : "Khobar Tech blog background"}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 reveal">
          <p className="eyebrow">{l === "ar" ? "المدونة والمعرفة" : "Insights & Knowledge"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-6xl max-w-4xl">
            {l === "ar"
              ? "رؤى وأفكار تقنية تساعدك على اتخاذ القرارات الصحيحة."
              : "Practical technology thinking for informed decisions."}
          </h1>
          <p className="lede mt-6 max-w-3xl text-slate-300">
            {l === "ar"
              ? "مقالات متخصصة يكتبها مهندسونا حول أنظمة تخطيط موارد المؤسسات ERP، الأمن السيبراني، الذكاء الاصطناعي العملي، وأحدث توجهات التقنية في المملكة."
              : "Articles crafted by our engineers covering enterprise ERP, cybersecurity, pragmatic AI, and emerging Saudi tech trends."}
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16 sm:py-24 bg-[#080f1e] border-t border-white/10">
        <div className="shell">
          {posts.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger">
              {posts.map((post) => {
                const image = getBlogImage(post.slug);
                const title = l === "ar" ? post.titleAr : post.titleEn;
                const excerpt = l === "ar" ? post.excerptAr : post.excerptEn;
                return (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1f3d] transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_10px_30px_rgba(0,212,232,0.1)]"
                  >
                    <Link href={localeHref(l, `/blog/${post.slug}`)} aria-label={title} className="relative aspect-[16/9] overflow-hidden">
                      <PhotoFrame
                        src={image.src}
                        alt={image.alt[l]}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d] via-transparent to-transparent opacity-80" />
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-bold text-cyan">
                        {post.category || (l === "ar" ? "رؤى تقنية" : "Insights")}
                      </span>
                      <h2 className="mt-2.5 text-xl font-bold text-white transition group-hover:text-cyan line-clamp-2">
                        <Link href={localeHref(l, `/blog/${post.slug}`)}>{title}</Link>
                      </h2>
                      {excerpt && (
                        <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">
                          {excerpt}
                        </p>
                      )}
                      <Link
                        className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-cyan hover:text-white transition"
                        href={localeHref(l, `/blog/${post.slug}`)}
                      >
                        {t.common.read}
                        <MoveUpLeft size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-12 text-center max-w-xl mx-auto">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan/10 text-cyan mx-auto mb-4 border border-cyan/20">
                <BookOpen size={28} />
              </span>
              <h3 className="text-xl font-bold text-white">
                {l === "ar" ? "مقالات جديدة قادمة قريباً" : "New Articles Coming Soon"}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {l === "ar"
                  ? "نقوم حالياً بإعداد محتوى متخصص حول أحدث الحلول والتقنيات المؤسسية."
                  : "We are preparing specialized insights on enterprise tech solutions."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "استشارة مخصصة" : "Expert Consultation"}
            </p>
            <h2>{l === "ar" ? "حوّل المعرفة إلى نتائج ملموسة لمؤسستك." : "Turn insights into tangible business results."}</h2>
            <p>{l === "ar" ? "تواصل معنا لمناقشة كيفية تطبيق هذه الحلول على بيئة عملك." : "Get in touch to explore applying these technologies to your workflow."}</p>
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

