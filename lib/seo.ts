import type { Metadata } from "next";
import type { Locale } from "@/lib/catalog";

export const siteName = "تكنلوجيا الخبير | Khobar Tech";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return siteUrl ? `${siteUrl}${path.startsWith("/") ? path : `/${path}`}` : undefined;
}

export function pageMetadata({ locale, path, title, description }: { locale: Locale; path: string; title: string; description: string }): Metadata {
  const canonical = absoluteUrl(`/${locale}${path}`);
  return {
    title,
    description,
    alternates: canonical ? { canonical, languages: { ar: absoluteUrl(`/ar${path}`) || "", en: absoluteUrl(`/en${path}`) || "" } } : undefined,
    openGraph: { type: "website", siteName, title, description, url: canonical, locale: locale === "ar" ? "ar_SA" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: locale === "ar" ? "نجاح كود" : "Najah Code",
    url: siteUrl,
    description: locale === "ar" ? "شركة تقنية تبني حلولاً برمجية ومنتجات رقمية للأعمال." : "A technology company building software solutions and digital products for businesses.",
    logo: absoluteUrl("/images/brand/logo-mark-primary.svg"),
    sameAs: [],
  };
}

export function serviceJsonLd(name: string, description: string, locale: Locale, path: string) {
  return { "@context": "https://schema.org", "@type": "Service", name, description, url: absoluteUrl(`/${locale}${path}`), provider: { "@type": "Organization", name: siteName } };
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(`/${locale}${item.path}`) })) };
}
