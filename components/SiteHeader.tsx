"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpLeft } from "lucide-react";
import type { Locale } from "@/lib/catalog";
import { copy, localeHref } from "@/lib/i18n";
import { Logo } from "@/components/Logo";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const t = copy[locale];
  const links = [
    ["", t.nav.home],
    ["/services", t.nav.services],
    ["/solutions", t.nav.solutions],
    ["/about", t.nav.about],
    ["/blog", t.nav.blog],
    ["/contact", t.nav.contact],
  ] as const;
  const other = locale === "ar" ? "en" : "ar";
  const languageHref =
    pathname?.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`) || `/${other}`;

  const chooseLanguage = () => {
    document.cookie = `khobar_locale=${other};path=/;max-age=31536000;SameSite=Lax`;
    localStorage.setItem("khobar_locale", other);
    setOpen(false);
  };

  useEffect(() => {
    const check = () => setSolid(window.scrollY > 18);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header
      className="site-header sticky top-0 z-50 border-b"
      style={{
        borderColor: solid ? "rgba(255,255,255,0.08)" : "transparent",
        backgroundColor: solid
          ? "rgba(11,22,40,0.97)"
          : "rgba(11,22,40,0.75)",
        backdropFilter: "blur(16px)",
        boxShadow: solid ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="shell flex h-[78px] items-center justify-between gap-4 lg:h-[86px]">
        <Logo locale={locale} />
        <nav
          className="hidden items-center gap-4 text-[13px] font-semibold xl:gap-6 lg:flex"
          aria-label={
            locale === "ar" ? "التنقل الرئيسي" : "Main navigation"
          }
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={localeHref(locale, href)}
              className="whitespace-nowrap transition-colors duration-150"
              style={{ color: "#8ba0be" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#00d4e8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#8ba0be")
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            onClick={chooseLanguage}
            href={languageHref}
            className="rounded-full px-3 py-2 text-xs font-bold transition-colors duration-150 hover:text-white"
            style={{ color: "#8ba0be" }}
          >
            {t.common.language}
          </Link>
          <Link
            href={localeHref(locale, "/contact")}
            className="btn-primary !min-h-11 !px-5 !py-2.5"
          >
            {t.nav.start}
            <ArrowUpLeft size={15} />
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? t.common.close : t.common.menu}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-white lg:hidden"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="border-t lg:hidden"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(11,22,40,0.98)",
          }}
        >
          <nav
            className="shell flex flex-col py-3"
            aria-label={
              locale === "ar" ? "التنقل على الجوال" : "Mobile navigation"
            }
          >
            {links.map(([href, label]) => (
              <Link
                onClick={() => setOpen(false)}
                key={href}
                href={localeHref(locale, href)}
                className="border-b py-3.5 text-base font-semibold text-white"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-3 pt-5 pb-2">
              <Link
                onClick={chooseLanguage}
                href={languageHref}
                className="btn-secondary flex-1 text-center"
              >
                {t.common.language}
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={localeHref(locale, "/contact")}
                className="btn-primary flex-1 text-center"
              >
                {t.nav.start}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
