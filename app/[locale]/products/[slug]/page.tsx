import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, ArrowRight, ArrowLeft } from "lucide-react";
import { PhotoFrame } from "@/components/PhotoFrame";
import type { Locale } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { getPublishedContentBySlug } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

const imageSrc = (imageKey: string | null) => {
  if (!imageKey) return null;
  if (imageKey.startsWith("/images/") || imageKey.startsWith("/manus-storage/")) return imageKey;
  return `/manus-storage/${imageKey.replace(/^\/+/, "")}`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = await getPublishedContentBySlug(slug);
  if (!product || product.type !== "product") return {};
  return pageMetadata({
    locale,
    path: `/products/${slug}`,
    title: `${locale === "ar" ? product.seoTitleAr || product.titleAr : product.seoTitleEn || product.titleEn} | تكنولوجيا الخبر`,
    description:
      locale === "ar"
        ? product.seoDescriptionAr || product.excerptAr || product.titleAr
        : product.seoDescriptionEn || product.excerptEn || product.titleEn,
  });
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const product = await getPublishedContentBySlug(slug);
  if (!product || product.type !== "product") notFound();
  const t = copy[l];
  const title = l === "ar" ? product.titleAr : product.titleEn;
  const description = l === "ar" ? product.excerptAr : product.excerptEn;
  const src = imageSrc(product.imageKey) || "/images/redesign/saas-data-center.webp";

  return (
    <article className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#0b1628]">
      <div className="shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-center">
        <div className="reveal">
          <Link
            href={localeHref(l, "/products")}
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-white transition mb-6"
          >
            {l === "ar" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            {t.nav.products}
          </Link>
          <p className="eyebrow">{product.category || (l === "ar" ? "منتج رقمي" : "Digital Product")}</p>
          <h1 className="heading mt-4 text-4xl sm:text-6xl">{title}</h1>
          <p className="lede mt-6 max-w-2xl text-slate-300">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="btn-primary" href={localeHref(l, "/contact")}>
              {l === "ar" ? "اطلب تجربة المنتج" : "Request Product Demo"}
              <ArrowUpLeft size={17} />
            </Link>
          </div>
        </div>
        <div className="relative reveal-scale">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan/20 to-blue/20 rounded-3xl blur-xl" />
          <PhotoFrame
            src={src}
            alt={title}
            className="relative aspect-[16/11] rounded-2xl border border-white/10 shadow-2xl"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
          />
        </div>
      </div>
    </article>
  );
}

