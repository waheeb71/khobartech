import Link from "next/link";
import type { Locale } from "@/lib/catalog";
import { copy, localeHref } from "@/lib/i18n";
import { getSetting } from "@/lib/db";
import { Logo } from "@/components/Logo";

type ContactSettings = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  social?: Record<string, string>;
};

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const year = new Date().getFullYear();
  const contact = await getSetting<ContactSettings>("company.contact", {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  });
  const email = contact.email || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const phone = contact.phone || "+966138000000";
  const whatsapp = contact.whatsapp || phone;
  const whatsappNum = whatsapp.replace(/\D/g, "");

  const cols = [
    {
      title: locale === "ar" ? "اكتشف" : "Explore",
      links: [
        ["/services", t.nav.services],
        ["/solutions", t.nav.solutions],
        ["/products", t.nav.products],
        ["/blog", t.nav.blog],
      ],
    },
    {
      title: locale === "ar" ? "الشركة" : "Company",
      links: [
        ["/about", t.nav.about],
        ["/contact", t.nav.contact],
        ["/privacy", locale === "ar" ? "الخصوصية" : "Privacy"],
        ["/terms", locale === "ar" ? "الشروط" : "Terms"],
      ],
    },
  ];

  return (
    <footer
      style={{
        background: "#080f1e",
        borderTop: "1px solid rgba(0,212,232,0.1)",
      }}
    >
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Logo locale={locale} className="text-white" />
            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: "#8ba0be" }}
            >
              {t.footer}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-semibold transition hover:text-white"
                  style={{ color: "#00d4e8" }}
                >
                  {email}
                </a>
              )}
              <a
                href={`https://wa.me/${whatsappNum}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold transition hover:text-white"
                style={{ color: "#8ba0be" }}
              >
                {phone}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm" style={{ color: "#8ba0be" }}>
                {col.links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={localeHref(locale, href)}
                      className="transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            color: "#5a6b7f",
          }}
        >
          <p>
            © {year} تكنلوجيا الخبير.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p>
            {locale === "ar"
              ? "نبني التقنية التي تدفع أعمالك إلى الأمام"
              : "Technology that moves your business forward"}
          </p>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${whatsappNum}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label={
          locale === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
