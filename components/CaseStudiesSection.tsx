import type { Locale } from "@/lib/catalog";
import { TrendingUp, Clock, ShieldCheck, ArrowUpLeft, ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { localeHref } from "@/lib/i18n";

interface CaseStudiesProps {
  locale: Locale;
}

const CASE_STUDIES = [
  {
    titleAr: "أتمتة سلاسل الإمداد ومستودعات شركة صناعية كبرى بالجبيل",
    titleEn: "Supply Chain & Warehouse Digitalization for Jubail Industrial Enterprise",
    clientAr: "قطاع التصنيع والبتروكيماويات",
    clientEn: "Manufacturing & Petrochemicals",
    challengeAr: "تعدد الأنظمة المنفصلة وتأخر إصدار الفواتير الضريبية اليدوية وتكدس شحنات التوريد.",
    challengeEn: "Fragmented legacy systems, manual billing delays, and warehouse dispatch bottlenecks.",
    solutionAr: "تطبيق نظام ERP متكامل مع مستودعات سحابية WMS وربط مباشر مع منصة زاتكا المرحلة الثانية.",
    solutionEn: "Full ERP deployment with cloud WMS and seamless ZATCA Phase 2 automated fiscal clearance.",
    metrics: [
      { val: "38%", labelAr: "انخفاض في تكاليف التشغيل", labelEn: "Reduction in operational overhead" },
      { val: "4x", labelAr: "تسريع إصدار أوامر الشراء", labelEn: "Faster purchase order cycles" },
      { val: "99.98%", labelAr: "دقة المخزون والفوترة", labelEn: "Inventory and billing precision" },
    ],
  },
  {
    titleAr: "بناء بنية تحتية آمنة وبوابة خدمات رقمية لمؤسسة صحية بالمنطقة الشرقية",
    titleEn: "Secure Cloud Core & Patient Digital Portal for Eastern Province Healthcare Group",
    clientAr: "قطاع الرعاية الصحية",
    clientEn: "Healthcare & Specialized Clinics",
    challengeAr: "الحاجة إلى توافق صارم مع معايير NCA لحماية بيانات المرضى والربط مع نظام نفيس الوطني.",
    challengeEn: "Critical need for NCA compliance, health data confidentiality, and national NPHIES connectivity.",
    solutionAr: "تصميم سحابة خاصة معتمدة محلياً، وتطبيق ضوابط أمن سيبراني صارمة مع نظام سجلات صحية موحد.",
    solutionEn: "Locally hosted sovereign private cloud, stringent NCA controls, and unified medical records.",
    metrics: [
      { val: "100%", labelAr: "امتثال لضوابط الهيئة الوطنية للأمن السيبراني", labelEn: "NCA regulatory compliance" },
      { val: "65%", labelAr: "تقليل زمن انتظار المراجعين", labelEn: "Drop in patient wait times" },
      { val: "0", labelAr: "حوادث أمنية منذ الإطلاق", labelEn: "Security incidents recorded" },
    ],
  },
  {
    titleAr: "منظومة ذكاء اصطناعي لتحليل سلوك العملاء لمنصة تجارة إلكترونية سريعة النمو",
    titleEn: "Predictive AI Engine for Rapidly Scaling Saudi E-Commerce Network",
    clientAr: "قطاع التجارة والخدمات اللوجستية",
    clientEn: "Omnichannel Commerce",
    challengeAr: "فقدان فرص بيع بسبب بطء التوصيات وعدم قدرة البنية التحتية على استيعاب مواسم التخفيضات الكبرى.",
    challengeEn: "Lost cart opportunities and infrastructure strain during massive seasonal shopping peaks.",
    solutionAr: "هندسة معمارية سحابية مرنة وتدريب نماذج تعلم آلي لتوقع سلوك الشراء وتحسين المخزون.",
    solutionEn: "Autoscaling cloud architecture paired with predictive ML models for dynamic inventory forecasting.",
    metrics: [
      { val: "+45%", labelAr: "ارتفاع في متوسط قيمة السلة", labelEn: "Increase in average basket value" },
      { val: "2.8M+", labelAr: "طلب تم تنفيذه خلال عطلة اليوم الوطني", labelEn: "Orders processed with zero downtime" },
      { val: "120ms", labelAr: "متوسط زمن استجابة التوصيات", labelEn: "Average recommendation latency" },
    ],
  },
];

export function CaseStudiesSection({ locale }: CaseStudiesProps) {
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="section relative border-t border-white/5 bg-[#08101e] py-20">
      <div className="shell">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-xs font-semibold text-cyan">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{isAr ? "الأثر الملموس والنتائج الواقعية" : "Measurable Business Impact"}</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {isAr ? "قصص نجاح تثبت كفاءتنا في الميدان" : "Proven Track Record Across Saudi Enterprises"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#8ba0be] sm:text-base">
            {isAr
              ? "لا نطرح حلولاً نظرية؛ بل نبني منظومات تقنية تقاس جودتها بالأرقام، خفض التكاليف، وتسريع اتخاذ القرار في بيئات العمل الحقيقية."
              : "We don't deliver theoretical models. We engineer robust platforms that translate directly into operational savings and market agility."}
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3 reveal-stagger">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.titleAr}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c1830] p-7 transition-all duration-300 hover:border-cyan/40 hover:bg-[#0f1f3e] hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                    {isAr ? study.clientAr : study.clientEn}
                  </span>
                  <FileText className="h-4 w-4 text-[#5a6b7f] transition-colors group-hover:text-cyan" />
                </div>

                <h3 className="mt-5 text-base font-bold leading-snug text-white transition-colors group-hover:text-cyan sm:text-lg">
                  {isAr ? study.titleAr : study.titleEn}
                </h3>

                <div className="mt-4 space-y-3 border-t border-white/5 pt-4 text-xs text-[#8ba0be]">
                  <div>
                    <span className="font-semibold text-white/70">{isAr ? "التحدي: " : "Challenge: "}</span>
                    {isAr ? study.challengeAr : study.challengeEn}
                  </div>
                  <div>
                    <span className="font-semibold text-cyan">{isAr ? "الحل: " : "Solution: "}</span>
                    {isAr ? study.solutionAr : study.solutionEn}
                  </div>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="mt-7 rounded-xl border border-white/5 bg-[#081020] p-4">
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/5 rtl:divide-x-reverse">
                  {study.metrics.map((m) => (
                    <div key={m.val} className="px-1">
                      <div className="text-base font-extrabold text-cyan sm:text-lg">
                        {m.val}
                      </div>
                      <div className="mt-1 text-[10px] font-medium leading-tight text-[#8ba0be]">
                        {isAr ? m.labelAr : m.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/8 bg-[#0a1528] p-6 sm:flex-row reveal">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/10 text-cyan">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {isAr ? "هل لديك مشروع أو مناقصة تتطلب كفاءة مثبتة؟" : "Planning an enterprise RFP or mission-critical overhaul?"}
              </p>
              <p className="text-xs text-[#8ba0be]">
                {isAr ? "فريقنا الهندسي جاهز لمناقشة نطاق العمل وتزويدك بدراسة جدوى فنية." : "Our architects are ready to review your specifications under full confidentiality."}
              </p>
            </div>
          </div>
          <Link
            href={localeHref(locale, "/contact")}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-xs font-bold text-[#0b1628] transition hover:bg-cyan-dark"
          >
            <span>{isAr ? "اطلب دراسة حالة تفصيلية" : "Request Detailed Case Study"}</span>
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
