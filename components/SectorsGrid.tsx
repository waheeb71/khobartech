import type { Locale } from "@/lib/catalog";
import { Factory, Landmark, Truck, HeartPulse, ShoppingBag, Landmark as Bank, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { localeHref } from "@/lib/i18n";

interface SectorsGridProps {
  locale: Locale;
}

const SECTORS = [
  {
    icon: Factory,
    titleAr: "الطاقة والنفط والصناعات الثقيلة",
    titleEn: "Energy, Oil & Heavy Industries",
    descAr: "أنظمة إدارة الأصول التشغيلية، إنترنت الأشياء الصناعي (IIoT)، وحلول الربط السلس مع سلاسل إمداد كبرى الشركات مثل أرامكو وسابك.",
    descEn: "Operational asset management, Industrial IoT, and integration architectures for energy and petrochemical supply chains.",
    metricsAr: "ربط أكثر من 50+ مصنع ومرفق",
    metricsEn: "50+ plants & facilities connected",
  },
  {
    icon: Landmark,
    titleAr: "القطاع الحكومي والبلديات الذكية",
    titleEn: "Government & Smart Municipalities",
    descAr: "أتمتة الخدمات البلدية، بوابات المواطنين، وتكامل منصات النفاذ الوطني ومشاريع المدن الذكية المنسجمة مع المعايير السيبرانية.",
    descEn: "Municipal workflow automation, citizen digital portals, and integration with national unified access platforms.",
    metricsAr: "امتثال بنسبة 100% لمعايير NCA",
    metricsEn: "100% NCA compliance rate",
  },
  {
    icon: Truck,
    titleAr: "اللوجستيات وسلاسل الإمداد",
    titleEn: "Logistics & Supply Chain Hubs",
    descAr: "تتبع الشحنات بالزمن الحقيقي، إدارة المستودعات الرقمية (WMS)، وأتمتة إجراءات الموانئ والمستودعات بالمنطقة الشرقية والمملكة.",
    descEn: "Real-time fleet tracking, digital warehouse management (WMS), and automated customs/port clearance solutions.",
    metricsAr: "تقليل زمن دورة التوزيع بنسبة 40%",
    metricsEn: "40% faster dispatch cycles",
  },
  {
    icon: HeartPulse,
    titleAr: "الرعاية الصحية والمستشفيات",
    titleEn: "Healthcare & Life Sciences",
    descAr: "أنظمة إدارة المعلومات الطبية (HIS)، بوابات المرضى، وربط منصة نفيس (NPHIES) والملف الصحي الموحد مع أعلى معايير الخصوصية.",
    descEn: "Hospital Information Systems (HIS), patient portals, and full NPHIES integration adhering to PDPL privacy standards.",
    metricsAr: "تكامل معتمد مع منصة نفيس",
    metricsEn: "Full NPHIES certified workflows",
  },
  {
    icon: ShoppingBag,
    titleAr: "التجارة الرقمية وسلاسل التجزئة",
    titleEn: "Omnichannel Retail & E-Commerce",
    descAr: "منصات تجارة متعددة القنوات، نقاط بيع سحابية متقدمة (POS)، وتكامل مباشر مع الفوترة الإلكترونية للمرحلة الثانية من زاتكا.",
    descEn: "Omnichannel commerce engines, smart cloud POS, and native ZATCA Phase 2 automated fiscal clearance.",
    metricsAr: "معالجة أكثر من 3M+ معاملة سنوياً",
    metricsEn: "3M+ transactions processed/yr",
  },
  {
    icon: Bank,
    titleAr: "القطاع المالي والتقنية المالية (FinTech)",
    titleEn: "Financial Services & FinTech",
    descAr: "بوابات دفع آمنة، حلول التحقق والمطابقة المحاسبية، وتطبيق معايير البنك المركزي السعودي (SAMA) في إدارة المخاطر.",
    descEn: "Secure payment middleware, automated reconciliation, and SAMA-aligned cybersecurity risk framework implementations.",
    metricsAr: "أمان بنكي ومعاملات مشفرة",
    metricsEn: "Bank-grade encrypted transactions",
  },
];

export function SectorsGrid({ locale }: SectorsGridProps) {
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="section relative bg-[#0b1628] py-20">
      <div className="shell">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end reveal">
          <div className="max-w-2xl">
            <p className="eyebrow">{isAr ? "القطاعات الاستراتيجية" : "Strategic Sectors"}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {isAr ? "حلول مصممة لمتطلبات أدق القطاعات في المملكة" : "Engineered for Saudi Arabia's Vital Industries"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#8ba0be] sm:text-base">
              {isAr
                ? "ندمج الخبرة الهندسية بالمعرفة العميقة بمتطلبات السوق السعودي والتشريعات المحلية لتقديم حلول تنتج فارقاً حقيقياً في الإنتاجية والربحية."
                : "We blend deep software engineering with Saudi market domain expertise to deliver tangible enterprise outcomes."}
            </p>
          </div>
          <Link
            href={localeHref(locale, "/contact")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline"
          >
            <span>{isAr ? "استشر خبيراً في قطاعك" : "Consult with an industry specialist"}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        {/* Sectors Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.titleAr}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/8 bg-[#0e1c36] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-[#122344] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
              >
                <div>
                  <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan group-hover:text-[#0b1628]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white transition-colors group-hover:text-cyan">
                    {isAr ? sector.titleAr : sector.titleEn}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#8ba0be] sm:text-sm">
                    {isAr ? sector.descAr : sector.descEn}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between text-xs font-medium text-cyan/90">
                    <span>{isAr ? sector.metricsAr : sector.metricsEn}</span>
                    <ArrowIcon className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
