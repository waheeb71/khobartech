import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteName, siteUrl } from "@/lib/seo";

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});
const latinFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-latin",
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: siteName, template: `%s | ${siteName}` },
  description: "تكنولوجيا الخبر للاستشارات والحلول التقنية المتكاملة: أنظمة ERP، الذكاء الاصطناعي، الأمن السيبراني، والتطبيقات السحابية.",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headerList = await headers();
  const locale =
    headerList.get("x-khobar-locale") === "en" || headerList.get("x-najah-locale") === "en"
      ? "en"
      : "ar";
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${arabicFont.variable} ${latinFont.variable} bg-[#0b1628] text-[#e8f0fe] antialiased selection:bg-cyan/30 selection:text-white`}>
        {children}
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
