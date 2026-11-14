import { notFound } from "next/navigation";
import type { Locale } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollObserver } from "@/components/ScrollObserver";
import { PdplConsentBanner } from "@/components/PdplConsentBanner";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { AiConcierge } from "@/components/AiConcierge";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <div
      lang={typedLocale}
      dir={typedLocale === "ar" ? "rtl" : "ltr"}
      className={typedLocale === "ar" ? "font-arabic" : "font-latin"}
    >
      <a className="skip-link" href="#main-content">
        {typedLocale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
      </a>
      <ScrollObserver />
      <SiteHeader locale={typedLocale} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={typedLocale} />
      <PdplConsentBanner locale={typedLocale} />
      <AccessibilityToolbar locale={typedLocale} />
      <AiConcierge locale={typedLocale} />
    </div>
  );
}
