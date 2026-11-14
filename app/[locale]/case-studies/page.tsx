import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TrustCertifications } from "@/components/TrustCertifications";
import { RfpSubmissionModal } from "@/components/RfpSubmissionModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/case-studies",
    title:
      locale === "ar"
        ? "دراسات الحالة وقصص النجاح | تكنولوجيا الخبر"
        : "Enterprise Case Studies & Success Stories | Khobar Tech",
    description:
      locale === "ar"
        ? "اطلع على سابقة أعمالنا ودراسات الحالة بالأرقام والمؤشرات لمشاريع التحول الرقمي، أنظمة ERP، الفوترة الإلكترونية زاتكا، والبنى السحابية في المملكة."
        : "Explore our enterprise case studies, verified ROI metrics, and digital transformation deployments across Saudi Arabia.",
  });
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";

  return (
    <div className="pt-24 bg-[#0b1628] min-h-screen text-slate-200">
      <div className="shell py-12 text-center max-w-3xl mx-auto">
        <span className="eyebrow justify-center">{ar ? "سابقة الأعمال المؤسسية" : "Case Studies Portfolio"}</span>
        <h1 className="heading mt-4 text-4xl sm:text-5xl text-white">
          {ar ? "قصص نجاح تثبت الجدارة الهندسية بالأرقام" : "Proven Engineering Impact & Verified Metrics"}
        </h1>
        <p className="lede mx-auto mt-4">
          {ar
            ? "نشارككم كواليس كبرى التحديات التقنية التي حولناها إلى قصص نجاح مستدامة لشركائنا في مختلف مدن وموانئ المملكة العربية السعودية."
            : "Deep-dives into how we solve mission-critical technical challenges for enterprises across Saudi Arabia with tangible ROI."}
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <RfpSubmissionModal locale={locale} />
        </div>
      </div>

      <CaseStudiesSection locale={locale} />
      <TrustCertifications locale={locale} />
    </div>
  );
}

