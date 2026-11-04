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
    path: "/terms",
    title: locale === "ar" ? "الشروط والأحكام | تكنولوجيا الخبر" : "Terms & Conditions | Khobar Tech",
    description:
      locale === "ar"
        ? "شروط وأحكام استخدام موقع شركة تكنولوجيا الخبر."
        : "Terms and conditions for using the Khobar Tech website.",
  });
}

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";
  const sections = ar
    ? [
        ["استخدام الموقع", "المحتوى المنشور في الموقع مخصص للتعريف بخدمات وحلول شركة تكنولوجيا الخبر. تفاصيل المشاريع ونطاق العمل والاتفاقيات ملزمة فقط عبر العقود الرسمية الموقعة."],
        ["الملكية الفكرية", "جميع المحتويات والعلامات التجارية والنصوص والتصميمات المنشورة ملك لشركة تكنولوجيا الخبر وشركائها، ويحظر نسخها أو استخدامها دون إذن رسمي مسبق."],
        ["الاستفسارات ونماذج الطلب", "إرسال نموذج طلب استشارة أو اجتماع يتيح لفريقنا الهندسي التواصل معك ولا يشكل التزاماً تعاقدياً بالبدء حتى اكتمال دراسة المتطلبات وتوقيع العقد."],
        ["القوانين المعمول بها", "تخضع هذه الشروط والأحكام وتفسر وفقاً للأنظمة واللوائح السارية في المملكة العربية السعودية."],
      ]
    : [
        ["Website Use", "Content published is for informational purposes about Khobar Tech services. Final scopes and agreements are formalized only through executed contracts."],
        ["Intellectual Property", "All trademarks, content, and visual designs are the proprietary assets of Khobar Tech and may not be reproduced without written permission."],
        ["Inquiries & Requests", "Submitting an inquiry initiates preliminary consultation and does not establish a contractual engagement until a formal agreement is executed."],
        ["Governing Law", "These terms are governed and construed under the applicable laws and regulations of the Kingdom of Saudi Arabia."],
      ];

  return (
    <article className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#0b1628]">
      <div className="shell max-w-4xl">
        <div className="reveal">
          <p className="eyebrow">{ar ? "قانوني" : "Legal"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-5xl">{ar ? "الشروط والأحكام" : "Terms & Conditions"}</h1>
          <p className="mt-4 text-sm text-slate-400">
            {ar ? "ضوابط وشروط استخدام منصة تكنولوجيا الخبر." : "Terms governing the use of the Khobar Tech platform."}
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

