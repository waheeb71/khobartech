"use client";

import { useState } from "react";
import { MapPin, Building2, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

interface SaudiProjectsMapProps {
  locale: string;
}

export function SaudiProjectsMap({ locale }: SaudiProjectsMapProps) {
  const isAr = locale === "ar";
  const [activeRegion, setActiveRegion] = useState<string>("eastern");

  const regions: Record<
    string,
    {
      nameAr: string;
      nameEn: string;
      citiesAr: string;
      citiesEn: string;
      projectsCount: string;
      sectorsAr: string[];
      sectorsEn: string[];
      highlightAr: string;
      highlightEn: string;
    }
  > = {
    eastern: {
      nameAr: "المنطقة الشرقية (المقر الرئيسي)",
      nameEn: "Eastern Province (Headquarters)",
      citiesAr: "الخبر، الدمام، الجبيل الصناعية، الظهران، الأحساء",
      citiesEn: "Al Khobar, Dammam, Jubail Industrial, Dhahran, Al Ahsa",
      projectsCount: "+75 مشروعاً منجزاً",
      sectorsAr: ["سلاسل الإمداد واللوجستيات", "الشركات الصناعية والبتروكيماويات", "المقاولات والهندسة"],
      sectorsEn: ["Supply Chain & Logistics", "Industrial & Petrochemicals", "Engineering & Contracting"],
      highlightAr: "المركز الهندسي والتشغيلي الرئيسي لخبر تك، دعم ميداني فوري واستجابة خلال ساعتين.",
      highlightEn: "Main engineering and operational hub with immediate 2-hour on-site response time.",
    },
    central: {
      nameAr: "منطقة الرياض (العاصمة)",
      nameEn: "Riyadh Region (Capital)",
      citiesAr: "الرياض، الدرعية، الخرج",
      citiesEn: "Riyadh, Diriyah, Al Kharj",
      projectsCount: "+50 مشروعاً استشارياً",
      sectorsAr: ["الجهات الحكومية وشبه الحكومية", "التقنية المالية (FinTech)", "شركات الاستثمار"],
      sectorsEn: ["Gov & Semi-Gov Entities", "FinTech & Digital Payments", "Investment Holdings"],
      highlightAr: "تكامل مباشر مع المبادرات الوطنية، ومواءمة كبرى مشاريع الرؤية والفوترة الإلكترونية.",
      highlightEn: "Direct integration with national Vision 2030 initiatives and governmental compliance mandates.",
    },
    western: {
      nameAr: "المنطقة الغربية",
      nameEn: "Western Region",
      citiesAr: "جدة، مكة المكرمة، المدينة المنورة، ينبع",
      citiesEn: "Jeddah, Makkah, Madinah, Yanbu",
      projectsCount: "+25 منصة سحابية",
      sectorsAr: ["التجزئة والمتاجر المتعددة الفروع", "الضيافة والسياحة", "الخدمات الطبية"],
      sectorsEn: ["Multi-branch Retail", "Hospitality & Tourism", "Healthcare Services"],
      highlightAr: "نشر أنظمة نقاط البيع السحابية (POS) وإدارة المستودعات لسلاسل التجزئة والضيافة.",
      highlightEn: "Cloud POS and omnichannel retail deployments for growing retail and hospitality brands.",
    },
    neom: {
      nameAr: "نيوم والشمال الغربي",
      nameEn: "NEOM & North West",
      citiesAr: "نيوم، تبوك، العلا",
      citiesEn: "NEOM, Tabuk, AlUla",
      projectsCount: "+10 مشاريع ذكية",
      sectorsAr: ["أنظمة الذكاء الاصطناعي", "البنى السحابية المتقدمة", "المدن الذكية والإنترنت الصناعي"],
      sectorsEn: ["Enterprise AI Models", "High-Performance Cloud", "Smart Infrastructure"],
      highlightAr: "بناء بنى سحابية عالية الأداء ونماذج ذكاء اصطناعي وأتمتة متوافقة مع أحدث المعايير.",
      highlightEn: "Next-gen sovereign cloud infrastructure and generative AI workflow automation.",
    },
  };

  const current = regions[activeRegion];

  return (
    <section className="py-20 sm:py-28 bg-[#0b1628] relative overflow-hidden border-t border-slate-800">
      <div className="shell">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow justify-center">
            {isAr ? "التغطية الجغرافية في المملكة" : "National Reach & Coverage"}
          </span>
          <h2 className="heading mt-3 text-white">
            {isAr
              ? "حضور ميداني وتقني يغطي أهم المراكز الاقتصادية بالمملكة"
              : "Field Presence Across Saudi Arabia's Major Economic Centers"}
          </h2>
          <p className="lede mx-auto mt-3">
            {isAr
              ? "من مقرنا الاستراتيجي في الخبر، ننفذ وندير حلول التحول الرقمي للشركات في كافة مناطق المملكة العربية السعودية."
              : "From our strategic headquarters in Al Khobar, we engineer and manage mission-critical platforms across the Kingdom."}
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto mb-10">
          {Object.entries(regions).map(([key, reg]) => (
            <button
              key={key}
              onClick={() => setActiveRegion(key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeRegion === key
                  ? "bg-cyan-500 text-navy shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-400"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? reg.nameAr : reg.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Region Information Dashboard */}
        <div className="bg-[#0f1f3d]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl text-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {isAr ? "المنطقة والمدن المخدومة:" : "Region & Served Cities:"}
              </span>
              <h3 className="text-lg font-bold text-white">
                {isAr ? current.nameAr : current.nameEn}
              </h3>
              <p className="text-xs text-cyan-300 mt-1 font-medium">
                {isAr ? current.citiesAr : current.citiesEn}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {isAr ? "حجم الإنجاز بالمملكة:" : "Delivered Workload:"}
              </span>
              <div className="text-2xl font-black text-cyan-400">
                {current.projectsCount}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? "أنظمة ERP، بوابات ZATCA، ومنصات سحابية" : "ERP, ZATCA gateways, and cloud platforms"}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {isAr ? "مستوى الاستجابة الميدانية:" : "On-site SLA Window:"}
              </span>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? "دعم تشغيلي 24/7" : "24/7 Enterprise Support"}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? "فريق هندسي محلي داخل المملكة" : "Resident engineering squad inside KSA"}
              </p>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">
                {isAr ? "القطاعات الرئيسية المخدومة في هذه المنطقة:" : "Key Industry Verticals:"}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {(isAr ? current.sectorsAr : current.sectorsEn).map((sector, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{sector}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs leading-relaxed text-slate-300">
              <span className="font-bold text-cyan-300 block mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {isAr ? "القيمة المضافة في هذه المنطقة:" : "Strategic Regional Advantage:"}
              </span>
              {isAr ? current.highlightAr : current.highlightEn}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

