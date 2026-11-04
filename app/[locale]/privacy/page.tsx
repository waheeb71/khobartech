import type { Metadata } from "next";
import type { Locale } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/privacy",
    title: locale === "ar" ? "سياسة الخصوصية | تكنلوجيا الخبير" : "Privacy Policy | Khobar Tech",
    description:
      locale === "ar"
        ? "سياسة الخصوصية وحماية البيانات في شركة تكنلوجيا الخبير."
        : "Privacy policy and data protection at Khobar Tech.",
  });
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";
  const sections = ar
    ? [
        ["الغرض", "توضح هذه الصفحة كيفية تعامل شركة تكنلوجيا الخبير مع البيانات التي يرسلها زوار الموقع، بما في ذلك نماذج الاستفسار وطلبات الاجتماع."],
        ["البيانات التي نجمعها", "نجمع فقط البيانات التي تقدمها طوعاً مثل الاسم والبريد الإلكتروني ورقم الهاتف وبيانات المشروع، لاستخدامها في الرد على استفسارك ومتابعة متطلباتك التقنية."],
        ["الحماية والاحتفاظ", "نقيّد الوصول إلى البيانات للمختصين المخولين فقط مع تطبيق أعلى معايير التشفير والأمان السيبراني، ولا نشارك أو نبيع بيانات التواصل مع أي طرف ثالث."],
        ["التحديثات والتواصل", "تُحدث هذه السياسة لمواكبة الأنظمة المحلية وحماية البيانات الشخصية في المملكة العربية السعودية، ويمكنك التواصل معنا دائماً لأي استفسار."],
      ]
    : [
        ["Purpose", "This page explains how Khobar Tech handles data submitted by site visitors, including inquiry forms and consultation bookings."],
        ["Data We Collect", "We collect only information voluntarily submitted (name, email, phone, project scope) solely to evaluate and respond to your inquiry."],
        ["Protection & Security", "Access is strictly restricted to authorized team members using industry encryption standards. We never sell or distribute your data."],
        ["Updates & Compliance", "This policy adheres to Saudi Personal Data Protection Law (PDPL) and will be updated accordingly."],
      ];

  return (
    <article className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#0b1628]">
      <div className="shell max-w-4xl">
        <div className="reveal">
          <p className="eyebrow">{ar ? "الامتثال والقانون" : "Compliance & Legal"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-5xl">{ar ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
          <p className="mt-4 text-sm text-slate-400">
            {ar ? "التزامنا بحماية بيانات عملائنا وزوارنا." : "Our commitment to client and visitor data protection."}
          </p>
        </div>

        <div className="mt-12 space-y-8 reveal-stagger">
          {sections.map(([title, text]) => (
            <section key={title} className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
              <p className="text-sm sm:text-base leading-7 text-slate-300">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
