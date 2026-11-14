import type { Metadata } from "next";
import type { Locale } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ShieldCheck, Lock, FileText, UserCheck, Database, HelpCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/privacy",
    title:
      locale === "ar"
        ? "سياسة الخصوصية ونظام حماية البيانات (PDPL) | تكنولوجيا الخبر"
        : "Privacy Policy & Saudi PDPL Compliance | Khobar Tech",
    description:
      locale === "ar"
        ? "سياسة الخصوصية والتزام شركة تكنولوجيا الخبر بنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) ولوائح الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)."
        : "Khobar Tech's privacy policy and compliance with the Saudi Personal Data Protection Law (PDPL) and SDAIA regulations.",
  });
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";

  const sections = ar
    ? [
        {
          icon: ShieldCheck,
          title: "1. الإطار النظامي والالتزام بالأنظمة السعودية (PDPL)",
          content:
            "تلتزم شركة تكنولوجيا الخبر للاستشارات التقنية (سجل تجاري: 2051248900، الخبر) بأحكام نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) ولائحته التنفيذية الصادرة عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا - SDAIA). تحدد هذه السياسة الكيفية التي نجمع بها بياناتك الشخصية ونعالجها ونحميها.",
        },
        {
          icon: Database,
          title: "2. البيانات الشخصية التي نجمعها والمسوغ النظامي",
          content:
            "نجمع البيانات التي تقدمها بمحض إرادتك عبر نماذج الموقع (مثل: الاسم، اسم المؤسسة، البريد الإلكتروني، رقم الجوال، متطلبات المشروع، كراسات الشروط RFP، والسير الذاتية). المسوغ النظامي لمعالجة هذه البيانات هو موافقتك الصريحة أو الضرورة التعاقدية لتقديم عروض الأسعار والخدمات الاستشارية والتقنية المطلوبة.",
        },
        {
          icon: Lock,
          title: "3. السيادة الرقمية والتخزين الآمن داخل المملكة",
          content:
            "تطبيقاً لمتطلبات السيادة الرقمية وضوابط الأمن السيبراني (NCA ECC)، يتم تخزين ومعالجة قواعد البيانات والملفات السحابية داخل خوادم ومراكز بيانات معتمدة محلياً بالمملكة العربية السعودية، مع تشفير كامل للبيانات أثناء النقل (TLS 1.3) وأثناء التخزين (AES-256).",
        },
        {
          icon: UserCheck,
          title: "4. حقوقك كصاحب بيانات بموجب نظام حماية البيانات الشخصية",
          content:
            "يمنحك النظام حقوقاً كاملة يمكنك ممارستها في أي وقت دون مقابل: (أ) الحق في العلم بالمسوغ النظامي للجمع، (ب) الحق في الوصول إلى بياناتك الشخصية والحصول على نسخة منها، (ج) الحق في طلب تصحيح أو تحديث بياناتك، (د) الحق في طلب إتلاف أو مسح بياناتك الشخصية عند انتهاء الغرض من جمعها، (هـ) الحق في سحب موافقتك في أي وقت.",
        },
        {
          icon: FileText,
          title: "5. عدم مشاركة البيانات أو الإفصاح التجاري",
          content:
            "نؤكد التزامنا التام بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية مع أي أطراف ثالثة لأغراض تجارية أو إعلانية. لا يتم الإفصاح عن البيانات إلا للجهات الحكومية والرقابية السعودية عند وجود إلزام نظامي صريح بموجب الأنظمة السارية بالمملكة.",
        },
        {
          icon: HelpCircle,
          title: "6. التواصل مع مسؤول حماية البيانات (DPO)",
          content:
            "إذا كانت لديك أية استفسارات حول هذه السياسة، أو لممارسة أي من حقوقك النظامية بموجب نظام حماية البيانات الشخصية، يمكنك مراسلة مسؤول حماية البيانات عبر البريد: privacy@khobartech.com أو info@khobartech.com، أو زيارة مقرنا في طريق الملك فيصل، الخبر، المنطقة الشرقية.",
        },
      ]
    : [
        {
          icon: ShieldCheck,
          title: "1. Regulatory Framework & Saudi PDPL Compliance",
          content:
            "Khobar Tech for Technology Consulting (CR: 2051248900, Al Khobar) complies strictly with the Saudi Personal Data Protection Law (PDPL) enacted by Royal Decree No. (M/19) and its executive regulations issued by the Saudi Data and AI Authority (SDAIA).",
        },
        {
          icon: Database,
          title: "2. Personal Data Collected & Lawful Basis",
          content:
            "We collect information voluntarily submitted via website forms (name, company, email, phone, project scope, RFPs, and CVs). The lawful basis is your explicit consent and pre-contractual necessity to evaluate technical inquiries and service estimates.",
        },
        {
          icon: Lock,
          title: "3. Sovereign Data Residency & Cloud Security",
          content:
            "Adhering to Saudi national data sovereignty and National Cybersecurity Authority (NCA ECC) controls, all client data and corporate documents are hosted within certified Saudi cloud infrastructure with end-to-end encryption in transit (TLS 1.3) and at rest (AES-256).",
        },
        {
          icon: UserCheck,
          title: "4. Your Legal Rights Under Saudi PDPL",
          content:
            "You hold guaranteed statutory rights: (a) Right to be informed, (b) Right of access and copy, (c) Right to rectification, (d) Right to erasure when purpose expires, and (e) Right to withdraw consent at any time without fees.",
        },
        {
          icon: FileText,
          title: "5. Non-Disclosure & Third-Party Protection",
          content:
            "We strictly do not sell, rent, or trade your personal data. Disclosures are exclusively limited to mandatory regulatory requests by authorized Saudi authorities pursuant to applicable laws.",
        },
        {
          icon: HelpCircle,
          title: "6. Contacting the Data Protection Officer (DPO)",
          content:
            "To exercise your rights or submit inquiries regarding privacy, please contact our Data Protection Officer at privacy@khobartech.com, or visit our headquarters on King Faisal Road, Al Khobar, Saudi Arabia.",
        },
      ];

  return (
    <article className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#0b1628] text-slate-200">
      <div className="shell max-w-4xl">
        <div className="text-center sm:text-start border-b border-slate-800 pb-8">
          <p className="eyebrow">{ar ? "الامتثال والتشريعات السعودية" : "Saudi Regulatory & Legal"}</p>
          <h1 className="heading mt-3 text-3xl sm:text-4xl text-white">
            {ar ? "سياسة الخصوصية وحماية البيانات الشخصية (PDPL)" : "Privacy Policy & Personal Data Protection"}
          </h1>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-2xl">
            {ar
              ? "وثيقة رسمية توضح التزام شركة تكنولوجيا الخبر بنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي (م/19) ولوائح سدايا لحماية حقوق الزوار والشركاء."
              : "Official declaration of Khobar Tech's compliance with the Saudi Personal Data Protection Law (PDPL) safeguarding client and visitor rights."}
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <section
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0f1f3d]/80 p-6 sm:p-7 transition hover:border-cyan-500/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{section.title}</h2>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 ms-12">
                  {section.content}
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
