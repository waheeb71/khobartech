import Link from "next/link";
import type { Locale } from "@/lib/catalog";
import { copy, localeHref } from "@/lib/i18n";
import { getSetting } from "@/lib/db";
import { Logo } from "@/components/Logo";
import { MapPin, Mail, Phone, ShieldCheck, FileCheck, Award, ArrowUpLeft, ArrowUpRight } from "lucide-react";

type ContactSettings = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  crNumber?: string;
  vatNumber?: string;
  addressAr?: string;
  addressEn?: string;
};

export async function SiteFooter({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const t = copy[locale];
  const year = new Date().getFullYear();
  const Arrow = isAr ? ArrowUpLeft : ArrowUpRight;

  const contact = await getSetting<ContactSettings>("company.contact", {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@khobartech.com",
    phone: "+966 13 800 0000",
    whatsapp: "+966 50 000 0000",
    crNumber: "2051248900",
    vatNumber: "310123456700003",
    addressAr: "طريق الملك فيصل، الخبر، المنطقة الشرقية، المملكة العربية السعودية",
    addressEn: "King Faisal Road, Al Khobar, Eastern Province, Kingdom of Saudi Arabia",
  });

  const email = contact.email || "info@khobartech.com";
  const phone = contact.phone || "+966 13 800 0000";
  const whatsapp = contact.whatsapp || "+966 50 000 0000";
  const whatsappNum = whatsapp.replace(/\D/g, "");
  const cr = contact.crNumber || "2051248900";
  const vat = contact.vatNumber || "310123456700003";

  return (
    <footer
      style={{
        background: "#060c18",
        borderTop: "1px solid rgba(0,212,232,0.12)",
      }}
      className="relative text-[#8ba0be]"
    >
      {/* Top Credentials & Compliance Ribbon */}
      <div className="border-b border-white/5 bg-[#081020] py-6">
        <div className="shell flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-4 w-4 text-cyan" />
              <span>{isAr ? "ضوابط الأمن السيبراني (NCA ECC)" : "NCA Cybersecurity (ECC)"}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FileCheck className="h-4 w-4 text-cyan" />
              <span>{isAr ? "معتمد الفوترة الإلكترونية (ZATCA)" : "ZATCA E-Invoicing Phase 2"}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="h-4 w-4 text-cyan" />
              <span>{isAr ? "مسجل لدى هيئة الاتصالات (CST)" : "CST Registered IT Services"}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="h-4 w-4 text-cyan" />
              <span>{isAr ? "معيار الجودة ISO/IEC 27001" : "ISO/IEC 27001 Certified"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-cyan/20 bg-cyan/5 px-3 py-1 font-semibold text-cyan">
            <span>🇸🇦</span>
            <span>{isAr ? "مواءمة رؤية السعودية 2030" : "Aligned with Saudi Vision 2030"}</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand & Corporate ID Column */}
          <div>
            <Logo locale={locale} className="text-white" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#8ba0be]">
              {t.footer}
            </p>

            {/* Official Registration Details */}
            <div className="mt-6 space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#5a6b7f]">{isAr ? "السجل التجاري (C.R.):" : "Commercial Reg (C.R.):"}</span>
                <span className="font-mono font-semibold text-white">{cr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5a6b7f]">{isAr ? "الرقم الضريبي (VAT):" : "Tax Number (VAT):"}</span>
                <span className="font-mono font-semibold text-white">{vat}</span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-white/5 text-[#8ba0be]">
                <MapPin className="h-4 w-4 shrink-0 text-cyan mt-0.5" />
                <span className="leading-snug">{isAr ? contact.addressAr : contact.addressEn}</span>
              </div>
            </div>

            {/* Contact quick links */}
            <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-cyan hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{email}</span>
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 text-white hover:text-cyan"
              >
                <Phone className="h-3.5 w-3.5" />
                <span dir="ltr">{phone}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {isAr ? "الخدمات المؤسسية" : "Enterprise Services"}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href={localeHref(locale, "/services/enterprise-systems")} className="transition hover:text-cyan">
                  {isAr ? "أنظمة تخطيط الموارد (ERP)" : "Enterprise ERP Solutions"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/services/cloud-infrastructure")} className="transition hover:text-cyan">
                  {isAr ? "البنية السحابية ومراكز البيانات" : "Cloud & Data Centers"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/services/ai-automation")} className="transition hover:text-cyan">
                  {isAr ? "الذكاء الاصطناعي وأتمتة الأعمال" : "AI & Process Automation"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/services/cybersecurity")} className="transition hover:text-cyan">
                  {isAr ? "الأمن السيبراني وحماية البيانات" : "Cybersecurity & Governance"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/services/custom-software")} className="transition hover:text-cyan">
                  {isAr ? "تطوير البرمجيات والمنصات" : "Custom Software Engineering"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/services/technical-consulting")} className="transition hover:text-cyan">
                  {isAr ? "الاستشارات التقنية والتحول الرقمي" : "Technology Strategy & Advisory"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Strategic Solutions & Sectors */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {isAr ? "الحلول والقطاعات" : "Solutions & Sectors"}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href={localeHref(locale, "/solutions")} className="transition hover:text-cyan">
                  {isAr ? "حلول النفط والطاقة والصناعة" : "Energy & Heavy Industries"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/solutions")} className="transition hover:text-cyan">
                  {isAr ? "القطاع الحكومي والبلديات الذكية" : "Government & Municipalities"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/solutions")} className="transition hover:text-cyan">
                  {isAr ? "اللوجستيات وسلاسل الإمداد" : "Logistics & Supply Chains"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/solutions")} className="transition hover:text-cyan">
                  {isAr ? "الرعاية الصحية والمستشفيات" : "Healthcare Information Systems"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/products")} className="transition hover:text-cyan">
                  {isAr ? "الفوترة الإلكترونية (ZATCA)" : "E-Invoicing Phase 2 Gateway"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & RFP */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {isAr ? "الشركة والعروض" : "Company & RFPs"}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href={localeHref(locale, "/about")} className="transition hover:text-cyan">
                  {isAr ? "عن تكنولوجيا الخبر" : "About Khobar Tech"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/contact")} className="transition hover:text-cyan">
                  {isAr ? "طلب عرض سعر ومناقصة (RFP)" : "Submit an RFP / Proposal"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/blog")} className="transition hover:text-cyan">
                  {isAr ? "المدونة والرؤى التقنية" : "Insights & Research"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/privacy")} className="transition hover:text-cyan">
                  {isAr ? "سياسة الخصوصية وأمن البيانات" : "Privacy & Data Protection"}
                </Link>
              </li>
              <li>
                <Link href={localeHref(locale, "/terms")} className="transition hover:text-cyan">
                  {isAr ? "الشروط والضوابط القانونية" : "Terms of Service"}
                </Link>
              </li>
            </ul>

            {/* Direct Consultation Button */}
            <div className="mt-6">
              <Link
                href={localeHref(locale, "/contact")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-2.5 text-xs font-bold text-cyan transition hover:bg-cyan hover:text-[#0b1628]"
              >
                <span>{isAr ? "احجز جلسة استشارية" : "Book Enterprise Consultation"}</span>
                <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-[#5a6b7f] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} تكنولوجيا الخبر للاستشارات والحلول التقنية (Khobar Tech).{" "}
            {isAr ? "جميع الحقوق محفوظة في المملكة العربية السعودية." : "All rights reserved in the Kingdom of Saudi Arabia."}
          </p>
          <div className="flex items-center gap-4">
            <span>{isAr ? "الخبر • الرياض • الدمام" : "Khobar • Riyadh • Dammam"}</span>
            <span>•</span>
            <span className="text-white/60">
              {isAr ? "حلول رقمية بمعايير عالمية" : "Enterprise Grade Digital Solutions"}
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${whatsappNum}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label={isAr ? "تواصل مع مستشار عبر واتساب" : "Chat with a consultant on WhatsApp"}
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
