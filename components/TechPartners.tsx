import type { Locale } from "@/lib/catalog";
import { ShieldCheck, Cloud, Award, CheckCircle2 } from "lucide-react";

interface TechPartnersProps {
  locale: Locale;
}

const PARTNERS = [
  { name: "Microsoft", roleAr: "شريك حلول سحابية معتمد", roleEn: "Certified Solutions Partner", tier: "Gold / Solutions Partner", badge: "Azure & AI" },
  { name: "Amazon Web Services", roleAr: "شريك استشاري متقدم", roleEn: "Advanced Consulting Partner", tier: "AWS Partner Network", badge: "Cloud & DevOps" },
  { name: "Oracle", roleAr: "شريك بنية تحتية وERP", roleEn: "Cloud & ERP Partner", tier: "Oracle PartnerNetwork", badge: "OCI & Systems" },
  { name: "Cisco Systems", roleAr: "شريك شبكات وأمن معتمد", roleEn: "Premier Certified Partner", tier: "Premier Partner", badge: "Enterprise Networks" },
  { name: "Google Cloud", roleAr: "شريك خدمات سحابية وبيانات", roleEn: "Cloud & Data Partner", tier: "Google Cloud Partner", badge: "Data & ML" },
  { name: "Fortinet", roleAr: "شريك حلول الأمن السيبراني", roleEn: "Cybersecurity Integrator", tier: "Security Expert", badge: "Network Security" },
  { name: "SAP", roleAr: "شريك تكامل وتطبيقات أعمال", roleEn: "Business Integration Partner", tier: "SAP Partner Ecosystem", badge: "ERP & Supply" },
  { name: "Odoo", roleAr: "شريك رسمي لحلول ERP", roleEn: "Official ERP Partner", tier: "Certified Partner", badge: "Custom ERP" },
];

const COMPLIANCE_ITEMS = [
  {
    titleAr: "الهيئة الوطنية للأمن السيبراني (NCA)",
    titleEn: "National Cybersecurity Authority (NCA)",
    descAr: "التزام كامل بضوابط الأمن السيبراني الأساسية (ECC) وضوابط الحوسبة السحابية (CCC).",
    descEn: "Full compliance with Essential Cybersecurity Controls (ECC) and Cloud Cybersecurity Controls (CCC).",
    tagAr: "امتثال معتمد",
    tagEn: "Verified Compliance",
  },
  {
    titleAr: "هيئة الاتصالات والفضاء والتقنية (CST)",
    titleEn: "Communications, Space & Tech Commission (CST)",
    descAr: "تسجيل رسمي لتقديم خدمات الحوسبة السحابية وتقنية المعلومات بالمملكة.",
    descEn: "Officially registered for cloud computing and enterprise IT services in Saudi Arabia.",
    tagAr: "مسجل رسميًا",
    tagEn: "Officially Registered",
  },
  {
    titleAr: "هيئة الزكاة والضريبة والجمارك (ZATCA)",
    titleEn: "Zakat, Tax and Customs Authority (ZATCA)",
    descAr: "أنظمة متوافقة كلياً مع متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل).",
    descEn: "Full integration with Saudi E-Invoicing Phase 2 (FATOORA Integration).",
    tagAr: "ربط إلكتروني",
    tagEn: "E-Invoicing Phase 2",
  },
  {
    titleAr: "معايير الآيزو العالمية (ISO/IEC 27001)",
    titleEn: "International Standards (ISO/IEC 27001)",
    descAr: "تطبيق أعلى معايير أمن وسرية المعلومات وإدارة الجودة (ISO 9001).",
    descEn: "Highest global security benchmarks for information security management and quality.",
    tagAr: "معيار عالمي",
    tagEn: "Global Benchmark",
  },
];

export function TechPartners({ locale }: TechPartnersProps) {
  const isAr = locale === "ar";

  return (
    <section className="section relative overflow-hidden border-t border-b border-white/5 bg-[#091224] py-20">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue/5 blur-3xl" />

      <div className="shell relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-xs font-semibold text-cyan">
            <Award className="h-3.5 w-3.5" />
            <span>{isAr ? "منظومة الشركاء والاعتمادات الرسمية" : "Technology Ecosystem & Certifications"}</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {isAr ? "شراكات عالمية واعتمادات وطنية راسخة" : "Global Tech Partnerships & National Trust"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#8ba0be] sm:text-base">
            {isAr
              ? "نعتمد على شراكات مباشرة مع عمالقة التقنية العالميين لضمان تزويد مؤسستك بأحدث البنى التحتية وأعلاها أمانًا وموثوقية في السوق السعودي."
              : "We partner with global technology pioneers to deliver enterprise-grade, secure, and future-proof digital infrastructure across Saudi Arabia."}
          </p>
        </div>

        {/* Global Tech Partners Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 reveal-stagger">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group relative flex flex-col justify-between rounded-xl border border-white/8 bg-[#0c1830]/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-[#0f1f3d] hover:shadow-[0_10px_30px_rgba(0,212,232,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                    {partner.badge}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-cyan/60 group-hover:bg-cyan animate-pulse" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-cyan">
                  {partner.name}
                </h3>
                <p className="mt-1 text-xs text-[#8ba0be]">
                  {isAr ? partner.roleAr : partner.roleEn}
                </p>
              </div>
              <div className="mt-5 border-t border-white/5 pt-3">
                <span className="text-[11px] font-medium text-white/50 group-hover:text-white/80">
                  {partner.tier}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* National Compliance & Saudi Vision 2030 Banner */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1830] via-[#0f2042] to-[#0a152a] p-8 lg:p-10 reveal">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isAr ? "الامتثال للأنظمة والتشريعات السعودية" : "Saudi Regulatory & Cybersecurity Compliance"}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                {isAr
                  ? "ملتزمون بأعلى معايير السيادة الرقمية وأمن البيانات الوطنية"
                  : "Committed to National Digital Sovereignty & Data Protection"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8ba0be] sm:text-sm">
                {isAr
                  ? "جميع حلولنا وأنظمتنا السحابية مصممة للعمل داخل مراكز البيانات المعتمدة في المملكة العربية السعودية بما يتوافق مع سياسات حوكمة ومشاركة البيانات وحماية البيانات الشخصية (PDPL)."
                  : "All our solutions and cloud architectures are engineered to reside in compliant Saudi data centers in strict adherence to Saudi Personal Data Protection Law (PDPL)."}
              </p>
            </div>
            {/* Vision 2030 Badge */}
            <div className="shrink-0 flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] p-4 backdrop-blur-md">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-cyan/10 text-cyan">
                <Cloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  {isAr ? "رؤية السعودية 2030" : "Saudi Vision 2030"}
                </p>
                <p className="text-sm font-bold text-white">
                  {isAr ? "تمكين التحول الرقمي الوطني" : "Enabling National Digitalization"}
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Items Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE_ITEMS.map((item) => (
              <div
                key={item.titleAr}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-cyan/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-4 w-4 text-cyan" />
                  <span className="rounded bg-cyan/10 px-2 py-0.5 text-[10px] font-semibold text-cyan">
                    {isAr ? item.tagAr : item.tagEn}
                  </span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-white">
                  {isAr ? item.titleAr : item.titleEn}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#8ba0be]">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
