import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFrame } from "@/components/PhotoFrame";
import { getBlogImage } from "@/lib/media";
import type { Locale } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { getPublishedContentBySlug } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

const plain = (value: string | null) => (value || "").replace(/<[^>]*>/g, "").trim();

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPublishedContentBySlug(slug);
  if (!post || post.type !== "post") return {};
  const title = locale === "ar" ? post.seoTitleAr || post.titleAr : post.seoTitleEn || post.titleEn;
  const description = locale === "ar" ? post.seoDescriptionAr || post.excerptAr || post.titleAr : post.seoDescriptionEn || post.excerptEn || post.titleEn;
  return pageMetadata({ locale, path: `/blog/${slug}`, title: `${title} | تكنولوجيا الخبر`, description });
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const post = await getPublishedContentBySlug(slug);
  if (!post || post.type !== "post") notFound();
  const t = copy[l];
  const title = l === "ar" ? post.titleAr : post.titleEn;
  const description = l === "ar" ? post.excerptAr : post.excerptEn;
  const body = plain(l === "ar" ? post.bodyAr : post.bodyEn) || plain(description);
  const fallbackImage = getBlogImage(slug);
  const imageSrc = post.imageKey || fallbackImage.src;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          image: imageSrc,
          inLanguage: l,
          author: { "@type": "Organization", name: "تكنولوجيا الخبر" },
          publisher: { "@type": "Organization", name: "تكنولوجيا الخبر" },
        }}
      />

      <article className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#0b1628]">
        <div className="shell max-w-4xl">
          <div className="reveal">
            <Link
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-white transition mb-6"
              href={localeHref(l, "/blog")}
            >
              {l === "ar" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {t.nav.blog}
            </Link>

            <span className="block text-xs font-bold text-cyan uppercase tracking-wider">
              {post.category || (l === "ar" ? "رؤى تقنية" : "Insights")}
            </span>

            <h1 className="heading mt-4 text-3xl sm:text-5xl text-white font-bold leading-tight">
              {title}
            </h1>

            {description && (
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed border-r-2 border-cyan pr-4">
                {description}
              </p>
            )}
          </div>

          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl reveal-scale">
            <PhotoFrame
              src={imageSrc}
              alt={title || fallbackImage.alt[l]}
              className="aspect-[16/9] w-full"
              sizes="(min-width: 1024px) 75vw, 100vw"
              priority
            />
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-[#0f1f3d] p-8 sm:p-12 reveal">
            <div className="prose prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-200 whitespace-pre-wrap">
              {body}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {l === "ar" ? "هل ترغب في تطبيق هذه الرؤى؟" : "Want to implement these ideas?"}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {l === "ar" ? "تواصل مع فريقنا الهندسي لمناقشة التفاصيل." : "Reach out to our engineering team to discuss."}
                </p>
              </div>
              <Link href={localeHref(l, "/contact")} className="btn-primary">
                {t.nav.start}
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

