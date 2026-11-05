import type { Locale } from "@/lib/catalog";
import { Award } from "lucide-react";
import {
  MicrosoftLogo,
  AwsLogo,
  GoogleCloudLogo,
  OracleLogo,
  CiscoLogo,
  SapLogo,
  OdooLogo,
  FortinetLogo,
  DockerLogo,
  ZatcaLogo,
  FatooraLogo,
  NcaLogo,
  CstLogo,
  FlutterLogo,
  ReactLogo,
  PythonLogo,
  NodeLogo,
  SwiftLogo,
  KotlinLogo,
  JavaLogo,
  LaravelLogo,
} from "@/components/TechIcons";

interface TechPartnersProps {
  locale: Locale;
}

// الصف الأول: الشركاء السحابيون وأنظمة المؤسسات (يمشي لليمين)
const ROW_ONE = [
  { name: "Microsoft", Component: MicrosoftLogo },
  { name: "AWS", Component: AwsLogo },
  { name: "Google Cloud", Component: GoogleCloudLogo },
  { name: "Oracle", Component: OracleLogo },
  { name: "Cisco", Component: CiscoLogo },
  { name: "SAP", Component: SapLogo },
  { name: "Odoo", Component: OdooLogo },
  { name: "Fortinet", Component: FortinetLogo },
  { name: "Docker", Component: DockerLogo },
];

// الصف الثاني: التقنيات وأطر العمل والاعتمادات الرسمية (يمشي لليسار)
const ROW_TWO = [
  { name: "Flutter", Component: FlutterLogo },
  { name: "React", Component: ReactLogo },
  { name: "Python", Component: PythonLogo },
  { name: "Node.js", Component: NodeLogo },
  { name: "Swift", Component: SwiftLogo },
  { name: "Kotlin", Component: KotlinLogo },
  { name: "Java", Component: JavaLogo },
  { name: "Laravel", Component: LaravelLogo },
  { name: "ZATCA", Component: ZatcaLogo },
  { name: "Fatoora", Component: FatooraLogo },
  { name: "NCA", Component: NcaLogo },
  { name: "CST", Component: CstLogo },
];

export function TechPartners({ locale }: TechPartnersProps) {
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden border-t border-b border-white/5 bg-[#070e1c] py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue/5 blur-3xl" />

      {/* Header */}
      <div className="shell relative z-10 mb-14 text-center reveal">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-xs font-semibold text-cyan">
          <Award className="h-3.5 w-3.5" />
          <span>{isAr ? "شركاء التكنولوجيا ومنظومة الحلول" : "Technology Partners & Ecosystem"}</span>
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {isAr ? "شراكات تقنية عالمية موثوقة" : "Global Technology Partnerships"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#8ba0be] sm:text-base max-w-2xl mx-auto">
          {isAr
            ? "نربط أعمالك مباشرة بأحدث التقنيات السحابية والأنظمة المؤسسية من كبرى الشركات العالمية."
            : "Direct alliances with global technology leaders to power your business infrastructure."}
        </p>
      </div>

      {/* ====================================================================
          TWO-ROW ANIMATED MARQUEE (بدون بطائق - أيقونات وشعارات كبيرة ومتحركة)
      ==================================================================== */}
      <div className="relative z-10 space-y-8">
        
        {/* ROW 1: الصف الأول يمشي إلى اليمين */}
        <div dir="ltr" className="marquee-mask overflow-hidden py-2">
          <div className="marquee-track-right flex items-center gap-8 sm:gap-12">
            {/* التكرار 1 */}
            {ROW_ONE.map((item, idx) => {
              const Icon = item.Component;
              return (
                <div key={`r1-a-${idx}`} className="marquee-item shrink-0" title={item.name}>
                  <Icon className="h-11 sm:h-14 w-auto max-w-[190px]" />
                </div>
              );
            })}
            {/* التكرار 2 لتكوين حلقة مستمرة متطابقة 100% */}
            {ROW_ONE.map((item, idx) => {
              const Icon = item.Component;
              return (
                <div key={`r1-b-${idx}`} className="marquee-item shrink-0" title={item.name}>
                  <Icon className="h-11 sm:h-14 w-auto max-w-[190px]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: الصف الثاني يمشي إلى اليسار */}
        <div dir="ltr" className="marquee-mask overflow-hidden py-2">
          <div className="marquee-track-left flex items-center gap-8 sm:gap-12">
            {/* التكرار 1 */}
            {ROW_TWO.map((item, idx) => {
              const Icon = item.Component;
              return (
                <div key={`r2-a-${idx}`} className="marquee-item shrink-0" title={item.name}>
                  <Icon className="h-11 sm:h-14 w-auto max-w-[210px]" />
                </div>
              );
            })}
            {/* التكرار 2 لتكوين حلقة مستمرة متطابقة 100% */}
            {ROW_TWO.map((item, idx) => {
              const Icon = item.Component;
              return (
                <div key={`r2-b-${idx}`} className="marquee-item shrink-0" title={item.name}>
                  <Icon className="h-11 sm:h-14 w-auto max-w-[210px]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
