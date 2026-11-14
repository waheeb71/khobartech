"use client";

import { useState } from "react";
import {
  Calculator,
  Server,
  FileCheck2,
  Smartphone,
  Cpu,
  Shield,
  Clock,
  Coins,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  Layers,
  Sparkles,
} from "lucide-react";

interface ProjectCostEstimatorProps {
  locale: string;
}

function formatCurrency(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function ProjectCostEstimator({ locale }: ProjectCostEstimatorProps) {
  const isAr = locale === "ar";

  const [step, setStep] = useState(1);
  const [solutionType, setSolutionType] = useState<string>("erp");
  const [scale, setScale] = useState<string>("medium");
  const [integrations, setIntegrations] = useState<string[]>(["zatca"]);
  const [hosting, setHosting] = useState<string>("saudi-cloud");

  // Lead fields
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const solutions = [
    {
      id: "erp",
      icon: Server,
      titleAr: "أنظمة تخطيط الموارد (ERP & أودو)",
      titleEn: "Enterprise Resource Planning (ERP / Odoo)",
      basePrice: 45000,
      baseWeeks: 8,
    },
    {
      id: "zatca",
      icon: FileCheck2,
      titleAr: "بوابة الفوترة الإلكترونية (ZATCA)",
      titleEn: "ZATCA Phase 2 E-Invoicing Gateway",
      basePrice: 22000,
      baseWeeks: 3,
    },
    {
      id: "custom-app",
      icon: Smartphone,
      titleAr: "تطبيقات جوال ومنصات مخصصة",
      titleEn: "Custom Mobile & Web Platforms",
      basePrice: 38000,
      baseWeeks: 6,
    },
    {
      id: "ai-rpa",
      icon: Cpu,
      titleAr: "ذكاء اصطناعي وأتمتة (AI & RPA)",
      titleEn: "Enterprise AI & Workflow Automation",
      basePrice: 35000,
      baseWeeks: 5,
    },
    {
      id: "security",
      icon: Shield,
      titleAr: "أمن سيبراني وامتثال NCA",
      titleEn: "Cybersecurity & NCA Governance",
      basePrice: 28000,
      baseWeeks: 4,
    },
  ];

  const scaleMultipliers: Record<string, { priceMult: number; weekMult: number; labelAr: string; labelEn: string }> = {
    small: { priceMult: 1.0, weekMult: 1.0, labelAr: "منشأة ناشئة (1 - 25 مستخدم)", labelEn: "Startup (1 - 25 Users)" },
    medium: { priceMult: 1.5, weekMult: 1.3, labelAr: "منشأة متوسطة (25 - 150 مستخدم)", labelEn: "Mid-Market (25 - 150 Users)" },
    enterprise: { priceMult: 2.4, weekMult: 1.7, labelAr: "مؤسسة كبرى / جهة شبه حكومية (+150 مستخدم)", labelEn: "Enterprise & Gov (+150 Users)" },
  };

  const integrationOptions = [
    { id: "zatca", labelAr: "ربط فوري بهيئة الزكاة والجمارك (ZATCA)", labelEn: "ZATCA Fatoora Sync", cost: 8000, weeks: 1 },
    { id: "saudi-payment", labelAr: "بوابات دفع سعودية (مدى / Apple Pay)", labelEn: "Mada & Apple Pay Gateways", cost: 6000, weeks: 1 },
    { id: "legacy-migration", labelAr: "ترحيل بيانات وأنظمة سابقة", labelEn: "Legacy Data Migration", cost: 12000, weeks: 2 },
    { id: "sla-24-7", labelAr: "اتفاقية مستوى خدمة ودعم 24/7 (SLA)", labelEn: "24/7 Enterprise SLA Support", cost: 10000, weeks: 0 },
  ];

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Calculate Estimation
  const activeSolution = solutions.find((s) => s.id === solutionType) || solutions[0];
  const activeScale = scaleMultipliers[scale] || scaleMultipliers.medium;
  const integrationsCost = integrations.reduce((acc, curr) => {
    const item = integrationOptions.find((o) => o.id === curr);
    return acc + (item ? item.cost : 0);
  }, 0);
  const integrationsWeeks = integrations.reduce((acc, curr) => {
    const item = integrationOptions.find((o) => o.id === curr);
    return acc + (item ? item.weeks : 0);
  }, 0);

  const estimatedMinPrice = Math.round((activeSolution.basePrice * activeScale.priceMult + integrationsCost) * 0.95);
  const estimatedMaxPrice = Math.round((activeSolution.basePrice * activeScale.priceMult + integrationsCost) * 1.25);
  const estimatedWeeks = Math.round(activeSolution.baseWeeks * activeScale.weekMult + integrationsWeeks);

  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const summaryDescription = `[حاسبة التكلفة التقديرية]
نوع الحل: ${activeSolution.titleAr} / ${activeSolution.titleEn}
حجم المنشأة: ${activeScale.labelAr}
التكاملات الإضافية: ${integrations.join(", ")}
استضافة البيانات: ${hosting}
الميزانية التقديرية المحسوبة: ${formatCurrency(estimatedMinPrice)} - ${formatCurrency(estimatedMaxPrice)} ر.س
المدة المتوقعة: ${estimatedWeeks} أسابيع`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone,
          service: activeSolution.titleAr,
          budget: `${formatCurrency(estimatedMinPrice)} - ${formatCurrency(estimatedMaxPrice)} SAR`,
          description: summaryDescription,
          locale,
          inquiryType: "estimate",
          metadata: {
            solutionId: solutionType,
            scale,
            integrations,
            hosting,
            estimatedMinPrice,
            estimatedMaxPrice,
            estimatedWeeks,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء إرسال التقدير. يرجى المحاولة لاحقاً.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "فشل الإرسال.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#091322] border-t border-slate-800/80 relative overflow-hidden" id="estimator">
      {/* Background radial effects */}
      <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="shell max-w-5xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="eyebrow justify-center">
            {isAr ? "أداة التسعير المؤسسي الذكي" : "Smart Solution Estimator"}
          </span>
          <h2 className="heading mt-3 text-white">
            {isAr
              ? "احسب التكلفة والمدة التقديرية لمشروعك فوراً"
              : "Estimate Your Project Cost & Timeline in Real Time"}
          </h2>
          <p className="lede mx-auto mt-3">
            {isAr
              ? "أداة تفاعلية مبنية على سوابق مشاريعنا في السوق السعودي، تمنحك شفافية فورية ودقة هندسية قبل البدء."
              : "Interactive engineering tool calibrated on real Saudi projects, providing instant clarity on enterprise investment and delivery timeline."}
          </p>
        </div>

        <div className="bg-[#0b1628]/95 border border-cyan-500/30 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-200">
          {/* Step Indicators */}
          <div className="flex items-center justify-between max-w-xl mx-auto mb-10 border-b border-slate-800 pb-6 text-xs sm:text-sm font-semibold">
            <div
              className={`flex items-center gap-2 ${
                step >= 1 ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              <span className="w-7 h-7 rounded-full border flex items-center justify-center font-bold">
                1
              </span>
              <span>{isAr ? "نوع المنظومة" : "Solution Type"}</span>
            </div>
            <div className="w-12 h-px bg-slate-800" />
            <div
              className={`flex items-center gap-2 ${
                step >= 2 ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              <span className="w-7 h-7 rounded-full border flex items-center justify-center font-bold">
                2
              </span>
              <span>{isAr ? "الحجم والتكاملات" : "Scale & Integrations"}</span>
            </div>
            <div className="w-12 h-px bg-slate-800" />
            <div
              className={`flex items-center gap-2 ${
                step >= 3 ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              <span className="w-7 h-7 rounded-full border flex items-center justify-center font-bold">
                3
              </span>
              <span>{isAr ? "النتيجة والتقدير" : "Estimate & Proposal"}</span>
            </div>
          </div>

          {/* STEP 1: Solution Type */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white mb-4">
                {isAr
                  ? "اختر الحل أو المنظومة التقنية المطلوبة:"
                  : "Select the required software solution or domain:"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {solutions.map((sol) => {
                  const Icon = sol.icon;
                  const isSelected = solutionType === sol.id;
                  return (
                    <button
                      key={sol.id}
                      type="button"
                      onClick={() => setSolutionType(sol.id)}
                      className={`p-5 rounded-2xl border text-start transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "bg-cyan-500/10 border-cyan-400 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400"
                          : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-white">
                          {isAr ? sol.titleAr : sol.titleEn}
                        </h4>
                        <div className="mt-2 text-xs text-slate-400">
                          {isAr ? "يبدأ من " : "Starting around "}
                          <span className="text-cyan-300 font-bold" suppressHydrationWarning>
                            {formatCurrency(sol.basePrice)} {isAr ? "ر.س" : "SAR"}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary"
                >
                  <span>{isAr ? "التالي: تحديد الحجم والمتطلبات" : "Next: Scale & Requirements"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Scale & Integrations */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {isAr ? "حجم المنشأة وعدد المستخدمين النشطين:" : "Enterprise Scale & User Volume:"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {Object.entries(scaleMultipliers).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setScale(key)}
                      className={`p-4 rounded-xl border text-center transition ${
                        scale === key
                          ? "bg-cyan-500/10 border-cyan-400 text-white font-bold ring-1 ring-cyan-400"
                          : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40"
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                      <div className="text-sm font-semibold">{isAr ? item.labelAr : item.labelEn}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {isAr ? "التكاملات والاشتراطات الإضافية:" : "Additional Integrations & Requirements:"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {integrationOptions.map((opt) => {
                    const active = integrations.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleIntegration(opt.id)}
                        className={`p-3.5 rounded-xl border text-start flex items-center justify-between gap-3 transition ${
                          active
                            ? "bg-cyan-500/10 border-cyan-400 text-white ring-1 ring-cyan-400"
                            : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium">
                          {isAr ? opt.labelAr : opt.labelEn}
                        </span>
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 ${
                            active ? "bg-cyan-400 text-navy font-bold" : "border border-slate-700"
                          }`}
                        >
                          {active && "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary text-xs sm:text-sm"
                >
                  {isAr ? "رجوع" : "Back"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary"
                >
                  <span>{isAr ? "عرض النتيجة والتقدير المالي" : "Calculate My Estimate"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Results & Lead Form */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Computed Highlights Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                    <Coins className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold block">
                      {isAr ? "الميزانية الاستثمارية التقديرية" : "Estimated Investment Range"}
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1" suppressHydrationWarning>
                      {formatCurrency(estimatedMinPrice)} - {formatCurrency(estimatedMaxPrice)}{" "}
                      <span className="text-sm font-normal text-cyan-300">{isAr ? "ر.س" : "SAR"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold block">
                      {isAr ? "الجدول الزمني التقديري للإنجاز" : "Estimated Delivery Window"}
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {estimatedWeeks} {isAr ? "أسابيع عمل هندسية" : "Engineering Weeks"}
                    </div>
                  </div>
                </div>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center animate-in zoom-in-95 duration-200">
                  <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-white">
                    {isAr ? "تم استلام طلب التقدير بنجاح!" : "Estimate Request Received!"}
                  </h4>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
                    {isAr
                      ? "شكراً لتواصلك. قام فريق المهندسين الاستشاريين في خبر تك باستلام تقديرك الهندسي، وسيتواصل معك مستشار تقني خلال 24 ساعة لمناقشة التفاصيل وتقديم عرض فني ومالي رسمي."
                      : "Thank you. Our consulting team has received your project parameters. A technical lead will connect with you within 24 hours with an official technical and financial proposal."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitEstimate} className="space-y-4">
                  <h4 className="font-bold text-white text-base">
                    {isAr
                      ? "احصل على كراسة التقدير الرسمي وجلسة استشارية مجانية:"
                      : "Receive the Official Proposal & Free Advisory Session:"}
                  </h4>

                  {errorMsg && (
                    <div className="p-3 text-xs rounded-xl bg-red-950/40 border border-red-500/40 text-red-300">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {isAr ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isAr ? "م. فهد القحطاني" : "e.g. John Doe"}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {isAr ? "اسم الشركة أو الجهة *" : "Company / Organization *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={isAr ? "شركة الأعمال اللوجستية" : "e.g. Acme Corp"}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {isAr ? "البريد الإلكتروني المؤسسي *" : "Work Email *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="f.alqahtani@company.sa"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {isAr ? "رقم الجوال السعودي *" : "Saudi Mobile Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 50 123 4567"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary text-xs sm:text-sm"
                    >
                      {isAr ? "تعديل المعايير" : "Edit Parameters"}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                    >
                      {loading ? (
                        <span>{isAr ? "جاري الإرسال..." : "Sending..."}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{isAr ? "اعتماد التقدير وحجز استشارة" : "Submit Estimate & Book Advisory"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

