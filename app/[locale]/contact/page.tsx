import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFrame } from "@/components/PhotoFrame";
import type { Locale } from "@/lib/catalog";
import { getSetting } from "@/lib/db";
import { isLocale } from "@/lib/i18n";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type ContactSettings = { email?: string; phone?: string; whatsapp?: string; address?: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/contact",
    title: locale === "ar" ? "تواصل معنا | تكنولوجيا الخبر" : "Contact Us | Khobar Tech",
    description:
      locale === "ar"
        ? "تواصل مع خبراء تكنولوجيا الخبر لمناقشة مشروعك التقني وحلول الأعمال والذكاء الاصطناعي والأمن السيبراني."
        : "Contact Khobar Tech experts to discuss your technology project, enterprise systems, AI solutions, and cybersecurity.",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const settings = await getSetting<ContactSettings>("company.contact", {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@khobartech.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+966 13 800 0000",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+966 50 000 0000",
    address: l === "ar" ? "الخبر / الرياض، المملكة العربية السعودية" : "Khobar / Riyadh, Saudi Arabia",
  });

  const contacts = [
    { icon: Mail, label: l === "ar" ? "البريد الإلكتروني" : "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: Phone, label: l === "ar" ? "الهاتف المباشر" : "Direct Phone", value: settings.phone, href: `tel:${settings.phone?.replace(/\s+/g, "")}` },
    { icon: MessageCircle, label: l === "ar" ? "واتساب سريع" : "WhatsApp", value: settings.whatsapp, href: `https://wa.me/${settings.whatsapp?.replace(/\D/g, "")}` },
    { icon: MapPin, label: l === "ar" ? "الموقع" : "Location", value: settings.address, href: "#" },
  ];

  return (
    <>
      <JsonLd data={organizationJsonLd(l)} />

      {/* Header section */}
      <section className="page-hero-banner">
        <div className="page-hero-bg">
          <PhotoFrame
            src="/hero.jpg"
            alt={l === "ar" ? "خلفية التواصل مع تكنولوجيا الخبر" : "Contact Khobar Tech background"}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 reveal">
          <p className="eyebrow">{l === "ar" ? "تواصل معنا" : "Get In Touch"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-6xl max-w-3xl">
            {l === "ar" ? "مشروعك يستحق شريكاً تقنياً يفهم طموحك." : "Your Project Deserves a Partner Who Gets It."}
          </h1>
          <p className="lede mt-5 max-w-2xl text-slate-300">
            {l === "ar"
              ? "سواء كنت تخطط لنظام ERP متكامل، تطبيق سحابي، أو استشارة ذكاء اصطناعي، فريق تكنولوجيا الخبر جاهز لمساعدتك."
              : "Whether you need a full ERP implementation, cloud platform, or AI consulting, the Khobar Tech team is ready."}
          </p>
        </div>
      </section>

      {/* Form & details section */}
      <section className="py-12 sm:py-20 bg-[#080f1e] border-t border-white/10">
        <div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 items-start">
          {/* Contact Cards */}
          <div className="space-y-6 reveal">
            <div className="rounded-2xl border border-white/10 bg-[#0f1f3d]/80 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white mb-6">
                {l === "ar" ? "معلومات التواصل المباشر" : "Direct Contact Details"}
              </h2>
              <div className="space-y-5 reveal-stagger">
                {contacts.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 p-3 rounded-xl transition duration-200 hover:bg-white/[0.04] group"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan border border-cyan/20 group-hover:scale-105 transition">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-400">{label}</p>
                      <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-cyan transition" dir={href.startsWith("tel:") ? "ltr" : undefined}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400">
                <Clock size={16} className="text-cyan shrink-0" />
                <span>
                  {l === "ar"
                    ? "أوقات العمل: الأحد – الخميس (8:00 ص – 6:00 م)"
                    : "Working hours: Sun – Thu (8:00 AM – 6:00 PM)"}
                </span>
              </div>
            </div>

            <div className="reveal-scale">
              <PhotoFrame
                src="/images/redesign/development-collaboration.webp"
                alt={l === "ar" ? "فريق تكنولوجيا الخبر يراجع متطلبات المشاريع" : "Khobar Tech team discussing projects"}
                className="aspect-[16/10] rounded-2xl border border-white/10"
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-6 sm:p-10 shadow-2xl relative overflow-hidden reveal">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-bold text-cyan uppercase tracking-wider">
                {l === "ar" ? "نموذج الطلب" : "Inquiry Form"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                {l === "ar" ? "لنبدأ بمناقشة فكرتك" : "Let’s Start With Your Idea"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400 mb-8">
                {l === "ar"
                  ? "املأ النموذج التالي وسيقوم مستشارنا التقني بالرد عليك خلال أقل من 24 ساعة بخطة عمل أولية."
                  : "Fill out the form and our technical consultant will get back to you within 24 hours with next steps."}
              </p>
              <ContactForm locale={l} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

