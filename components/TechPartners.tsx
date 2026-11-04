import type { Locale } from "@/lib/catalog";
import { Award, ShieldCheck, Code2 } from "lucide-react";
import {
  MicrosoftLogo,
  AwsLogo,
  GoogleCloudLogo,
  OracleLogo,
  CiscoLogo,
  SapLogo,
  OdooLogo,
  FortinetLogo,
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
  AngularLogo,
  VueLogo,
  PhpLogo,
  DotNetLogo,
} from "@/components/TechIcons";

interface TechPartnersProps {
  locale: Locale;
}

const GLOBAL_PARTNERS = [
  { name: "Microsoft", Logo: MicrosoftLogo, tierAr: "شريك حلول سحابية معتمد", tierEn: "Certified Solutions Partner" },
  { name: "AWS", Logo: AwsLogo, tierAr: "شريك استشاري متقدم", tierEn: "Advanced Consulting Partner" },
  { name: "Google Cloud", Logo: GoogleCloudLogo, tierAr: "شريك خدمات سحابية وبيانات", tierEn: "Google Cloud Partner" },
  { name: "Oracle", Logo: OracleLogo, tierAr: "شريك بنية تحتية وERP", tierEn: "Cloud & ERP Partner" },
  { name: "Cisco", Logo: CiscoLogo, tierAr: "شريك شبكات وأمن معتمد", tierEn: "Premier Certified Partner" },
  { name: "SAP", Logo: SapLogo, tierAr: "شريك تكامل وتطبيقات أعمال", tierEn: "SAP Partner Ecosystem" },
  { name: "Odoo", Logo: OdooLogo, tierAr: "شريك رسمي معتمد لـ ERP", tierEn: "Certified ERP Partner" },
  { name: "Fortinet", Logo: FortinetLogo, tierAr: "شريك حلول الأمن السيبراني", tierEn: "Network Security Partner" },
];

const TECH_STACK = [
  { name: "Flutter", Logo: FlutterLogo },
  { name: "React", Logo: ReactLogo },
  { name: "Python", Logo: PythonLogo },
  { name: "Node.js", Logo: NodeLogo },
  { name: "Swift", Logo: SwiftLogo },
  { name: "Kotlin", Logo: KotlinLogo },
  { name: "Java", Logo: JavaLogo },
  { name: "Laravel", Logo: LaravelLogo },
  { name: "Angular", Logo: AngularLogo },
  { name: "Vue.js", Logo: VueLogo },
  { name: "PHP", Logo: PhpLogo },
  { name: ".NET", Logo: DotNetLogo },
];

export function TechPartners({ locale }: TechPartnersProps) {
  const isAr = locale === "ar";

  return (
    <section className="section relative overflow-hidden border-t border-b border-white/5 bg-[#070e1c] py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-cyan/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-2/3 h-96 w-96 rounded-full bg-blue/5 blur-3xl" />

      <div className="shell relative z-10 space-y-20">
        
        {/* =========================================================
            1. GLOBAL TECHNOLOGY PARTNERS (الشعارات الرسمية للشركاء)
        ========================================================= */}
        <div>
          <div className="mx-auto max-w-3xl text-center reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-xs font-semibold text-cyan">
              <Award className="h-3.5 w-3.5" />
              <span>{isAr ? "شركاء التكنولوجيا والمنصات" : "Technology & Platform Partners"}</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {isAr ? "شراكات تقنية عالمية موثوقة" : "Global Technology Partnerships"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#8ba0be] sm:text-base">
              {isAr
                ? "نربط أعمالك مباشرة بأحدث التقنيات السحابية والأنظمة المؤسسية من كبرى الشركات العالمية."
                : "Direct alliances with global technology leaders to power your business infrastructure."}
            </p>
          </div>

          {/* Partner Logos Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 reveal-stagger">
            {GLOBAL_PARTNERS.map((partner) => {
              const LogoComponent = partner.Logo;
              return (
                <div
                  key={partner.name}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0c1830] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-[#102244] hover:shadow-[0_12px_30px_rgba(0,212,232,0.15)]"
                >
                  {/* Visual Logo Center */}
                  <div className="flex h-14 w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <LogoComponent className="max-h-9 w-auto max-w-[140px]" />
                  </div>
                  
                  {/* Subtle tier label */}
                  <div className="mt-3 border-t border-white/5 pt-2.5 w-full">
                    <p className="text-[11px] font-medium text-[#8ba0be] group-hover:text-cyan transition-colors">
                      {isAr ? partner.tierAr : partner.tierEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            2. TECHNOLOGIES USED (التقنيات المستخدمة - كما في الصورة 2)
        ========================================================= */}
        <div className="rounded-2xl border border-white/8 bg-[#0a152a] p-8 lg:p-10 reveal">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan">
              <Code2 className="h-4 w-4" />
              <span>{isAr ? "التقنيات وأطر العمل المستخدمة" : "Technologies & Frameworks"}</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              {isAr ? "أحدث لغات البرمجة والمنظومات التقنية" : "Modern Tech Stack & Engineering Tools"}
            </h3>
          </div>

          {/* Colorful Technology Logos Strip (matching Image 2) */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 reveal-stagger">
            {TECH_STACK.map((tech) => {
              const Logo = tech.Logo;
              return (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-200 hover:border-cyan/30 hover:bg-white/[0.06] hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center">
                    <Logo className="h-9 w-9 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="mt-2 text-xs font-semibold text-slate-300 group-hover:text-white">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            3. SAUDI AUTHORITIES & COMPLIANCE (الاعتمادات - كما في الصورة 3)
        ========================================================= */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1830] via-[#0e2142] to-[#0a152a] p-8 lg:p-10 reveal">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{isAr ? "الربط الحكومي والاعتمادات الرسمية" : "Official Compliance & Authorizations"}</span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              {isAr ? "متوافقون ومعتمدون لدى الجهات الوطنية" : "Certified & Integrated with National Authorities"}
            </h3>
          </div>

          {/* Authority Logos Grid (matching Image 3) */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
            {/* ZATCA */}
            <div className="group flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#081224] p-5 text-center transition hover:border-cyan/40 hover:bg-[#0c1c38]">
              <div className="flex h-16 items-center justify-center">
                <ZatcaLogo className="h-12 w-auto max-w-[210px]" />
              </div>
              <span className="mt-3 rounded-full bg-cyan/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan">
                {isAr ? "الفوترة الإلكترونية معتمدة" : "ZATCA Approved"}
              </span>
            </div>

            {/* Fatoora */}
            <div className="group flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#081224] p-5 text-center transition hover:border-cyan/40 hover:bg-[#0c1c38]">
              <div className="flex h-16 items-center justify-center">
                <FatooraLogo className="h-12 w-auto max-w-[180px]" />
              </div>
              <span className="mt-3 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                {isAr ? "المرحلة الثانية (الربط والتكامل)" : "Phase 2 Integration"}
              </span>
            </div>

            {/* NCA */}
            <div className="group flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#081224] p-5 text-center transition hover:border-cyan/40 hover:bg-[#0c1c38]">
              <div className="flex h-16 items-center justify-center">
                <NcaLogo className="h-12 w-auto max-w-[210px]" />
              </div>
              <span className="mt-3 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">
                {isAr ? "ضوابط ECC & CCC" : "ECC & CCC Controls"}
              </span>
            </div>

            {/* CST */}
            <div className="group flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#081224] p-5 text-center transition hover:border-cyan/40 hover:bg-[#0c1c38]">
              <div className="flex h-16 items-center justify-center">
                <CstLogo className="h-12 w-auto max-w-[210px]" />
              </div>
              <span className="mt-3 rounded-full bg-cyan/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan">
                {isAr ? "حوسبة سحابية مصنفة" : "Classified Cloud Provider"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
