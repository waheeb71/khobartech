import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Calendar, Radio, Newspaper, Sparkles, ExternalLink, Award, FileText } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/media-center",
    title:
      locale === "ar"
        ? "المركز الإعلامي والفعاليات | تكنولوجيا الخبر"
        : "Media Center & Event Presence | Khobar Tech",
    description:
      locale === "ar"
        ? "أحدث الأخبار والبيانات الصحفية ومشاركات شركة تكنولوجيا الخبر في كبرى المؤتمرات التقنية في المملكة مثل LEAP و Black Hat MEA."
        : "Latest press releases, corporate news, and Khobar Tech's presence at LEAP, Black Hat MEA, and major Saudi tech summits.",
  });
}

export default async function MediaCenterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";

  const events = [
    {
      badgeAr: "مؤتمر تقني دولي",
      badgeEn: "International Summit",
      titleAr: "مشاركة وفد خبر تك في مؤتمر LEAP 2026 بالرياض",
      titleEn: "Khobar Tech Delegation at LEAP 2026 in Riyadh",
      dateAr: "فبراير 2026",
      dateEn: "February 2026",
      locationAr: "مركز الرياض الدولي للمعارض والمؤتمرات",
      locationEn: "Riyadh Exhibition & Convention Center",
      summaryAr:
        "استعراض أحدث بوابات التكامل مع زاتكا (ZATCA Phase 2) والمنظومات السحابية السيادية الذكية، وعقد لقاءات ثنائية مع قيادات التحول الرقمي بالمملكة.",
      summaryEn:
        "Showcasing sovereign cloud middleware and real-time ZATCA Phase 2 gateways, meeting with enterprise CIOs across the GCC.",
    },
    {
      badgeAr: "أمن سيبراني",
      badgeEn: "Cybersecurity",
      titleAr: "حضور جلسات مؤتمر Black Hat الشرق الأوسط وإفريقيا (MEA)",
      titleEn: "Active Presence at Black Hat MEA Cybersecurity Conference",
      dateAr: "نوفمبر 2025",
      dateEn: "November 2025",
      locationAr: "واجهة الرياض للمعارض والمؤتمرات",
      locationEn: "Riyadh Front Exhibition Center",
      summaryAr:
        "المشاركة في ورش العمل المتخصصة بضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC) واختبارات اختراق البنى السحابية والأنظمة الحساسة.",
      summaryEn:
        "Participating in specialized workshops on NCA essential cybersecurity controls and critical infrastructure defense.",
    },
    {
      badgeAr: "تقنية مالية وتجزئة",
      badgeEn: "FinTech & Retail",
      titleAr: "استعراض منظومة نقاط البيع السحابية وإدارة المستودعات في Seamless السعودية",
      titleEn: "Showcasing Cloud POS and Smart WMS at Seamless Saudi Arabia",
      dateAr: "أكتوبر 2025",
      dateEn: "October 2025",
      locationAr: "الرياض، المملكة العربية السعودية",
      locationEn: "Riyadh, Saudi Arabia",
      summaryAr:
        "إطلاق التحديث الجديد لمنظومة Khobar WMS الداعمة للمستودعات اللوجستية والموانئ وسلاسل التجزئة المتعددة الفروع.",
      summaryEn:
        "Launching the latest version of Khobar WMS engineered for distribution hubs and omnichannel retail chains.",
    },
  ];

  const pressReleases = [
    {
      dateAr: "12 يناير 2026",
      dateEn: "January 12, 2026",
      titleAr: "خبر تك تعلن اكتمال ربط أكثر من 150 منشأة بالمرحلة الثانية للفوترة الإلكترونية (زاتكا)",
      titleEn: "Khobar Tech Announces 150+ Enterprise Integrations with ZATCA Phase 2",
      excerptAr:
        "أعلنت شركة تكنولوجيا الخبر عن نجاح محركها السحابي ZATCA Gateway في معالجة ملايين الفواتير المشفرة بنسبة مطابقة وتصريح بلغت 100%.",
      excerptEn:
        "Khobar Tech's proprietary ZATCA Gateway has securely processed millions of cryptographically stamped invoices with a 100% compliance record.",
    },
    {
      dateAr: "5 نوفمبر 2025",
      dateEn: "November 5, 2025",
      titleAr: "توسيع الشراكات السحابية السيادية لتأمين بيئات العمل السحابية داخل المملكة",
      titleEn: "Expanding Sovereign Cloud Alliances to Secure Saudi Cloud Workloads",
      excerptAr:
        "اتفاقيات تقنية مع كبرى مراكز البيانات المعتمدة في المنطقة الشرقية والرياض لضمان السيادة الرقمية وتخزين البيانات محلياً وفق لوائح سدايا.",
      excerptEn:
        "Strategic infrastructure partnerships with certified Saudi data center providers ensuring full adherence to national data sovereignty laws.",
    },
    {
      dateAr: "20 أغسطس 2025",
      dateEn: "August 20, 2025",
      titleAr: "إطلاق برنامج التدريب التعاوني السنوي بالتعاون مع كليات علوم وهندسة الحاسب",
      titleEn: "Launch of the Annual University Co-op Engineering Program",
      excerptAr:
        "استقطاب نخبة من طلبة الجامعات السعودية للتدريب العملي المكثف في مجالات الحوسبة السحابية والأمن السيبراني والذكاء الاصطناعي.",
      excerptEn:
        "Welcoming student cohorts from top Saudi engineering schools for intensive training in cloud infrastructure, cybersecurity, and applied AI.",
    },
  ];

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-[#0b1628] min-h-screen text-slate-200">
      <div className="shell">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow justify-center">
            {ar ? "المركز الإعلامي والأنشطة المؤسسية" : "Media Center & Corporate News"}
          </span>
          <h1 className="heading mt-4 text-4xl sm:text-5xl text-white">
            {ar ? "أخبارنا، شراكاتنا، وحضورنا في المشهد التقني السعودي" : "Our News, Strategic Alliances & Ecosystem Presence"}
          </h1>
          <p className="lede mx-auto mt-4">
            {ar
              ? "مواكبة مستمرة لأبرز المعارض والمؤتمرات والتحالفات الاستراتيجية التي تقودها تكنولوجيا الخبر لدعم مستهدفات التحول الرقمي ورؤية المملكة 2030."
              : "Stay informed on our conference presence, strategic MoUs, and key milestones driving Saudi Arabia's digital future."}
          </p>
        </div>

        {/* Major Events & Summits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <span>{ar ? "المؤتمرات والفعاليات الوطنية الكبرى" : "Major Tech Summits & Events"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-[#0f1f3d]/80 border border-slate-800 p-6 flex flex-col justify-between transition hover:border-cyan-500/40 hover:bg-[#122449]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {ar ? evt.badgeAr : evt.badgeEn}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {ar ? evt.dateAr : evt.dateEn}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mt-2 group-hover:text-cyan-300 transition-colors">
                    {ar ? evt.titleAr : evt.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {ar ? evt.locationAr : evt.locationEn}
                  </p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {ar ? evt.summaryAr : evt.summaryEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-cyan-400" />
            <span>{ar ? "البيانات الصحفية والأخبار المؤسسية" : "Official Press Releases"}</span>
          </h2>

          <div className="space-y-4">
            {pressReleases.map((pr, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0f1f3d]/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-cyan-500/30"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-cyan-400 block">
                    {ar ? pr.dateAr : pr.dateEn}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {ar ? pr.titleAr : pr.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {ar ? pr.excerptAr : pr.excerptEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

