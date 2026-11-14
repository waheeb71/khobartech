import Link from "next/link";
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, Award, BarChart3, Clock, ShieldCheck } from "lucide-react";

interface CaseStudiesSectionProps {
  locale: string;
}

export function CaseStudiesSection({ locale }: CaseStudiesSectionProps) {
  const isAr = locale === "ar";

  const caseStudies = [
    {
      slug: "dammam-logistics-zatca-phase-2",
      tagAr: "الخدمات اللوجستية والموانئ",
      tagEn: "Logistics & Ports",
      titleAr: "ربط 14 فرعاً لوجستياً بميناء الملك عبدالعزيز بالدمام مع ZATCA Phase 2 في 4 أسابيع",
      titleEn: "Connecting 14 Port Logistics Hubs in Dammam to ZATCA Phase 2 in 4 Weeks",
      challengeAr:
        "كانت الشركة تعاني من بطء في إصدار الفواتير الجمركية وتعدد الأنظمة المحاسبية المنفصلة، مما عرّضها لمخاطر الغرامات الضريبية وتوقف التخليص الجمركي.",
      challengeEn:
        "Client faced severe customs clearing bottlenecks and fragmented accounting systems, risking hefty non-compliance penalties.",
      solutionAr:
        "نشرنا بوابة ZATCA Gateway الخاصة بخبر تك، مع ربط إلكتروني فوري (APIs) بقواعد بيانات المستودعات، وتوليد الأختام الرقمية والتشفير اللحظي.",
      solutionEn:
        "Deployed Khobar Tech's ZATCA Gateway with automated API middleware connecting disparate databases and instant cryptographic stamping.",
      metrics: [
        { num: "0.2s", labelAr: "زمن إصدار وتوقيع الفاتورة", labelEn: "Invoice Signing Latency" },
        { num: "100%", labelAr: "مطابقة فحص زاتكا (Fatoora)", labelEn: "Fatoora Compliance Pass" },
        { num: "60%", labelAr: "تسريع وتيرة الفسح الجمركي", labelEn: "Faster Customs Clearance" },
      ],
    },
    {
      slug: "jubail-petrochemical-cloud-nca",
      tagAr: "الصناعة والبتروكيماويات",
      tagEn: "Industrial & Petrochem",
      titleAr: "ترحيل بنية سحابية هجينة لشركة صناعية كبرى بالجبيل مع الامتثال لضوابط NCA",
      titleEn: "Migrating Hybrid Cloud for Industrial Giant in Jubail with 100% NCA Alignment",
      challengeAr:
        "حاجة ملحة لاستبدال خوادم محلية قديمة تجاوزت عمرها الافتراضي، ونقل أحمال العمل السحابية إلى مراكز بيانات سعودية سيادية متوافقة مع متطلبات الهيئة الوطنية للأمن السيبراني.",
      challengeEn:
        "Urgent need to retire aging on-premise hardware and transition to sovereign Saudi cloud zones fully aligned with NCA ECC mandates.",
      solutionAr:
        "هندسة بنية سحابية هجينة متطورة على سحابة محلية مع تشفير كامل للبيانات، وجدران حماية الجيل القادم، ومراقبة أمنية على مدار الساعة (24/7 SOC).",
      solutionEn:
        "Engineered resilient sovereign hybrid cloud architecture with automated backup failover and 24/7 security operations center monitoring.",
      metrics: [
        { num: "99.99%", labelAr: "استمرارية وجاهزية الأنظمة", labelEn: "System Uptime & SLA" },
        { num: "35%", labelAr: "توفير في تكاليف البنية التحتية", labelEn: "OpEx Infrastructure Savings" },
        { num: "صفر", labelAr: "انقطاعات أو ثغرات أمنية", labelEn: "Zero Security Vulnerabilities" },
      ],
    },
    {
      slug: "khobar-smart-wms-retail-chains",
      tagAr: "التجزئة وسلاسل التوريد",
      tagEn: "Retail & Supply Chains",
      titleAr: "أتمتة مستودعات مركزية لـ 28 متجر تجزئة بالمنطقة الشرقية بنظام Khobar WMS",
      titleEn: "Automating Distribution Center for 28 Retail Branches via Khobar WMS",
      challengeAr:
        "نسبة أخطاء بشرية مرتفعة في الجرد اليدوي، وبطء في تحضير الطلبيات وتوزيعها على الفروع في الخبر والدمام والأحساء.",
      challengeEn:
        "High manual error rates in legacy inventory audits and sluggish store replenishment across Eastern Province branches.",
      solutionAr:
        "تطبيق نظام Khobar Smart WMS مع أجهزة ماسحات الباركود الذكية وتتبع لحظي لمستويات المخزون مع ربطه المباشر بنظام أودو (ERP).",
      solutionEn:
        "Implemented Khobar Smart WMS with barcode automation and real-time inventory synchronization directly linked to Odoo ERP.",
      metrics: [
        { num: "45%", labelAr: "تسريع تجهيز الطلبات والشحن", labelEn: "Faster Dispatch Cycles" },
        { num: "99.8%", labelAr: "دقة مطابقة الجرد الفعلي", labelEn: "Inventory Audit Accuracy" },
        { num: "3x", labelAr: "مضاعفة سعة معالجة الطلبات", labelEn: "Order Throughput Capacity" },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#091322] border-t border-slate-800" id="case-studies">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="eyebrow">{isAr ? "سجل الإنجاز وقصص النجاح" : "Proven Track Record"}</span>
            <h2 className="heading mt-3 text-white">
              {isAr
                ? "دراسات حالة موثقة: نتائج هندسية وعائد استثماري حقيقي"
                : "Enterprise Case Studies: Measurable Impact & Verified ROI"}
            </h2>
            <p className="lede mt-3">
              {isAr
                ? "لا نكتفي ببرمجة الأنظمة، بل نقيس نجاحنا بالأثر المالي والتشغيلي الذي نحققه لشركائنا في السوق السعودي."
                : "We do not merely write code; we measure our success by the tangible operational and financial growth delivered to our clients."}
            </p>
          </div>
          <Link
            href={`/${locale}/case-studies`}
            className="text-link inline-flex items-center gap-2 self-start md:self-end text-sm"
          >
            <span>{isAr ? "عرض جميع دراسات الحالة" : "Explore All Case Studies"}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="group rounded-3xl bg-[#0b1628] border border-slate-800 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/50 hover:bg-[#0f1f3d] hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                    {isAr ? cs.tagAr : cs.tagEn}
                  </span>
                  <BarChart3 className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-bold text-white text-base sm:text-lg leading-snug group-hover:text-cyan-300 transition-colors">
                  {isAr ? cs.titleAr : cs.titleEn}
                </h3>

                <div className="mt-4 space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-rose-400 font-semibold">{isAr ? "التحدي: " : "Challenge: "}</strong>
                    {isAr ? cs.challengeAr : cs.challengeEn}
                  </p>
                  <p>
                    <strong className="text-cyan-400 font-semibold">{isAr ? "الحل الهندسي: " : "Engineering Solution: "}</strong>
                    {isAr ? cs.solutionAr : cs.solutionEn}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  {isAr ? "المؤشرات والنتائج المحققة:" : "Verified Impact Metrics:"}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <div className="text-base sm:text-lg font-black text-cyan-400 leading-tight">
                        {m.num}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                        {isAr ? m.labelAr : m.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
