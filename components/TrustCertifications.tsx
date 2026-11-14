import { Shield, Award, CheckCircle2, FileCheck, Landmark, Lock } from "lucide-react";

interface TrustCertificationsProps {
  locale: string;
}

export function TrustCertifications({ locale }: TrustCertificationsProps) {
  const isAr = locale === "ar";

  const certs = [
    {
      icon: Landmark,
      badgeAr: "معتمد ومطابق",
      badgeEn: "Certified Compliant",
      titleAr: "هيئة الزكاة والضريبة والجمارك (ZATCA)",
      titleEn: "ZATCA E-Invoicing Gateway",
      descAr: "حلول معتمدة للربط والتكامل التلقائي مع منصة فاتورة (المرحلة الثانية).",
      descEn: "Certified Phase 2 integration provider for real-time clearance on Fatoora.",
      tag: "ZATCA Phase 2",
    },
    {
      icon: Shield,
      badgeAr: "أمن سيبراني سيادي",
      badgeEn: "Sovereign Security",
      titleAr: "الهيئة الوطنية للأمن السيبراني (NCA)",
      titleEn: "NCA ECC & CSCC Compliance",
      descAr: "مواءمة شاملة مع الضوابط الأساسية للأمن السيبراني وضوابط الحوسبة السحابية.",
      descEn: "Full compliance with Essential Cybersecurity Controls and cloud frameworks.",
      tag: "NCA ECC Compliant",
    },
    {
      icon: Award,
      badgeAr: "معايير عالمية",
      badgeEn: "Global Benchmark",
      titleAr: "شهادة ISO/IEC 27001:2022",
      titleEn: "ISO/IEC 27001 Certified",
      descAr: "تطبيق أعلى معايير إدارة أمن وسرية المعلومات وحماية الأصول الرقمية.",
      descEn: "International standard for Information Security Management Systems (ISMS).",
      tag: "ISO 27001 ISMS",
    },
    {
      icon: FileCheck,
      badgeAr: "حوكمة وجودة",
      badgeEn: "Quality Assurance",
      titleAr: "شهادة ISO 9001:2015",
      titleEn: "ISO 9001:2015 Quality Mgmt",
      descAr: "التزام كامل بآليات ضبط الجودة وهندسة العمليات البرمجية الرشيقة.",
      descEn: "Quality Management System certification ensuring enterprise delivery excellence.",
      tag: "ISO 9001 QMS",
    },
    {
      icon: Lock,
      badgeAr: "تشريعي وإلزامي",
      badgeEn: "Data Privacy",
      titleAr: "نظام حماية البيانات الشخصية (PDPL)",
      titleEn: "Saudi PDPL Compliance",
      descAr: "التزام صارم بحفظ وتشفير البيانات داخل مراكز البيانات السحابية السعودية.",
      descEn: "Complete adherence to Saudi Data & AI Authority (SDAIA) data residency laws.",
      tag: "SDAIA / PDPL",
    },
    {
      icon: CheckCircle2,
      badgeAr: "محتوى محلي",
      badgeEn: "Local Content",
      titleAr: "دعم المحتوى المحلي ورؤية 2030",
      titleEn: "Local Content & Vision 2030",
      descAr: "كوادر وطنية متخصصة ومساهمة فعالة في تنمية المحتوى التقني بالمملكة.",
      descEn: "Dedicated Saudi engineering talent driving local technological independence.",
      tag: "Saudi Vision 2030",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#08101e] border-y border-slate-800/80 relative overflow-hidden">
      {/* Background Subtle Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00d4e8_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
      <div className="absolute -top-40 start-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="shell relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow justify-center">
            {isAr ? "الاعتمادات والتوافق التنظيمي" : "Accreditations & Compliance"}
          </span>
          <h2 className="heading mt-3 text-white">
            {isAr
              ? "معايير أمان وطنية واعتمادات جودة عالمية"
              : "National Security Standards & Global Quality Benchmarks"}
          </h2>
          <p className="lede mx-auto mt-4">
            {isAr
              ? "نلتزم بأعلى المتطلبات التنظيمية والتشريعية في المملكة العربية السعودية لضمان ثقة واستقرار أعمال شركائنا في القطاعين الحكومي والخاص."
              : "We adhere to the highest regulatory, cybersecurity, and data protection standards in Saudi Arabia, ensuring peace of mind for enterprise and government partners."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#0b1628]/90 border border-slate-800 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-[#0f1f3d] hover:shadow-xl hover:shadow-cyan-950/40"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {cert.tag}
                  </span>
                </div>

                <div className="text-xs font-semibold text-cyan-400/90 tracking-wide uppercase">
                  {isAr ? cert.badgeAr : cert.badgeEn}
                </div>
                <h3 className="font-bold text-white text-base mt-1.5 group-hover:text-cyan-300 transition-colors">
                  {isAr ? cert.titleAr : cert.titleEn}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {isAr ? cert.descAr : cert.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

