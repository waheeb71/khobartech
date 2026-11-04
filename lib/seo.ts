import type { Metadata } from "next";
import type { Locale } from "@/lib/catalog";

export const siteName = "تكنولوجيا الخبر | Khobar Tech";
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
    alternateName: locale === "ar" ? "تكنولوجيا الخبر" : "Khobar Tech",
    url: siteUrl,
    description: locale === "ar" ? "شركة تقنية سعودية متخصصة في الحلول البرمجية المؤسسية والأنظمة السحابية والذكاء الاصطناعي والأمن السيبراني." : "A premier Saudi technology company specializing in enterprise software, cloud systems, AI solutions, and cybersecurity.",
    logo: absoluteUrl("/logo-dark.png"),
    sameAs: [],
  };
}

export function serviceJsonLd(name: string, description: string, locale: Locale, path: string) {
  return { "@context": "https://schema.org", "@type": "Service", name, description, url: absoluteUrl(`/${locale}${path}`), provider: { "@type": "Organization", name: siteName } };
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(`/${locale}${item.path}`) })) };
}
