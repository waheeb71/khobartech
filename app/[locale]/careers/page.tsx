"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  Send,
  Loader2,
  MapPin,
  Clock,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

export default function CareersPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "ar";
  const isAr = locale === "ar";

  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [applicationType, setApplicationType] = useState<"job" | "coop">("job");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [notes, setNotes] = useState("");

  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [uploadedCvUrl, setUploadedCvUrl] = useState("");
  const [uploadingCv, setUploadingCv] = useState(false);

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const jobs = [
    {
      titleAr: "مهندس حلول وبنية سحابية سيادية (Sovereign Cloud Architect)",
      titleEn: "Senior Sovereign Cloud Architect",
      departmentAr: "البنية التحتية والشبكات",
      departmentEn: "Infrastructure & Networks",
      typeAr: "دوام كامل (مقر الخبر / هجين)",
      typeEn: "Full-time (Al Khobar / Hybrid)",
      experienceAr: "+4 سنوات خبرة",
      experienceEn: "4+ Years Experience",
      descAr: "قيادة تصميم وهندسة مراكز البيانات والبيئات السحابية الهجينة وفق متطلبات الأمن السيبراني وضوابط NCA.",
      descEn: "Lead sovereign cloud architectures and enterprise hybrid data centers aligned with NCA ECC mandates.",
      appType: "job" as const,
    },
    {
      titleAr: "مطور برمجيات أول (Senior Full-Stack Engineer)",
      titleEn: "Senior Full-Stack Engineer",
      departmentAr: "هندسة البرمجيات والمنصات",
      departmentEn: "Software Engineering",
      typeAr: "دوام كامل (الخبر)",
      typeEn: "Full-time (Al Khobar)",
      experienceAr: "+3 سنوات خبرة",
      experienceEn: "3+ Years Experience",
      descAr: "هندسة واجهات برمجية ومنصات رقمية فائقة الأداء باستخدام Next.js و TypeScript وقواعد بيانات PostgreSQL السحابية.",
      descEn: "Building high-performance web platforms and APIs using Next.js, TypeScript, and serverless PostgreSQL.",
      appType: "job" as const,
    },
    {
      titleAr: "مهندس ربط وتكامل أنظمة وفوترة زاتكا (ZATCA Integration Specialist)",
      titleEn: "ZATCA & ERP Integration Specialist",
      departmentAr: "حلول تخطيط الموارد ERP",
      departmentEn: "Enterprise Solutions",
      typeAr: "دوام كامل",
      typeEn: "Full-time",
      experienceAr: "+2 سنة خبرة",
      experienceEn: "2+ Years Experience",
      descAr: "تطوير middleware لربط أنظمة الفوترة والمحاسبة والمخازن مع هيئة الزكاة والضريبة والجمارك (Fatoora Phase 2).",
      descEn: "Developing cryptographic middleware connecting enterprise ERPs with ZATCA Fatoora Phase 2 APIs.",
      appType: "job" as const,
    },
    {
      titleAr: "أخصائي حوكمة وأمن سيبراني (Cybersecurity & NCA Governance)",
      titleEn: "Cybersecurity & NCA Governance Officer",
      departmentAr: "الأمن السيبراني والمخاطر",
      departmentEn: "Cybersecurity & Risk",
      typeAr: "دوام كامل",
      typeEn: "Full-time",
      experienceAr: "+3 سنوات خبرة",
      experienceEn: "3+ Years Experience",
      descAr: "مواءمة الأنظمة مع ضوابط الهيئة الوطنية للأمن السيبراني (ECC & CCC) ومتابعة تقييم الثغرات واختبارات الاختراق.",
      descEn: "Ensure full compliance with National Cybersecurity Authority controls and oversee penetration testing.",
      appType: "job" as const,
    },
    {
      titleAr: "برنامج التدريب التعاوني الهندسي 2026 (Co-op Program)",
      titleEn: "University Co-op & Internship Program 2026",
      departmentAr: "رأس المال البشري والابتكار",
      departmentEn: "Human Capital & Innovation",
      typeAr: "تدريب تعاوني فصلي أو صيفي",
      typeEn: "Co-op / Semester Internship",
      experienceAr: "لطلبة الجامعات السعودية (KFUPM، IAU وغيرها)",
      experienceEn: "For Saudi University Students (KFUPM, IAU, etc.)",
      descAr: "فرصة تدريبية مدفوعة لطلبة علوم الحاسب وهندسة البرمجيات ونظم المعلومات للعمل على مشاريع تقنية وطنية حقيقية.",
      descEn: "Structured paid internship for computer science and software engineering students on live enterprise projects.",
      appType: "coop" as const,
    },
  ];

  const handleOpenModal = (roleTitle: string, type: "job" | "coop") => {
    setSelectedRole(roleTitle);
    setApplicationType(type);
    setIsModalOpen(true);
    setSubmitted(false);
    setErrorMsg("");
  };

  const handleCvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrorMsg(isAr ? "حجم السيرة الذاتية يجب ألا يتجاوز 15 ميجابايت." : "CV file size must not exceed 15MB.");
      return;
    }

    setFile(selectedFile);
    setErrorMsg("");
    setUploadingCv(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", "cv");

      const res = await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل رفع السيرة الذاتية.");
      }

      setUploadedCvUrl(data.url);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "فشل رفع السيرة الذاتية.");
      setFile(null);
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          roleApplied: selectedRole,
          applicationType,
          university,
          experienceYears,
          cvUrl: uploadedCvUrl || null,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل إرسال طلب التقديم.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ أثناء إرسال طلبك.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setUniversity("");
    setExperienceYears("");
    setNotes("");
    setFile(null);
    setUploadedCvUrl("");
    setSubmitted(false);
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-[#0b1628] min-h-screen text-slate-200">
      <div className="shell">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow justify-center">
            {isAr ? "رأس المال البشري والفرص الوظيفية" : "Careers & Talent"}
          </span>
          <h1 className="heading mt-4 text-4xl sm:text-5xl text-white">
            {isAr ? "انضم لفريق يصنع مستقبل التقنية في السعودية" : "Build the Future of Tech in Saudi Arabia"}
          </h1>
          <p className="lede mx-auto mt-4">
            {isAr
              ? "نؤمن في خبر تك بأن الاستثمار في العقول الهندسية الوطنية هو ركيزة نجاحنا. نوفر بيئة عمل ملهمة، تحديات تقنية حقيقية، ومساراً لتطوير مهاراتك في كبرى مشاريع الرؤية."
              : "At Khobar Tech, we believe local engineering talent is our greatest competitive advantage. We offer high-impact national projects and continuous technical mastery."}
          </p>
        </div>

        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-[#0f1f3d]/80 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">
              {isAr ? "مشاريع سيادية وتحديات كبرى" : "Mission-Critical Projects"}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isAr
                ? "العمل على بوابات ربط وطنية، سحب سيادية، ونظم ذكاء اصطناعي تخدم كبرى المنشآت بالمملكة."
                : "Deliver sovereign cloud infra, ZATCA e-invoicing pipelines, and enterprise AI models."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0f1f3d]/80 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">
              {isAr ? "شراكة وثيقة مع الجامعات" : "University Partnerships & Co-op"}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isAr
                ? "برامج تدريب تعاوني مخصصة لطلبة جامعة الملك فهد للبترول والمعادن (KFUPM) والجامعات الرائدة."
                : "Dedicated co-op and internship programs for top students from KFUPM and leading universities."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0f1f3d]/80 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">
              {isAr ? "بيئة مرنة ومزايا تنافسية" : "Agile Culture & Top Benefits"}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isAr
                ? "حزم تعويضية مجزية، بيئة عمل هجينة، وميزانية مخصصة للشهادات المهنية العالمية (AWS, CISA, PMP)."
                : "Competitive packages, hybrid flexibility, and dedicated budgets for global certifications."}
            </p>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <span>{isAr ? "الوظائف وفرص التدريب المتاحة حالياً" : "Current Open Positions"}</span>
            </h2>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
              {jobs.length} {isAr ? "شواغر نشطة" : "Active Roles"}
            </span>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-[#0f1f3d]/90 border border-slate-800 p-6 transition-all duration-200 hover:border-cyan-500/50 hover:bg-[#112447] flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {isAr ? job.departmentAr : job.departmentEn}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isAr ? job.typeAr : job.typeEn}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {isAr ? job.titleAr : job.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    {isAr ? job.descAr : job.descEn}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {isAr ? job.experienceAr : job.experienceEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {isAr ? "الخبر، المنطقة الشرقية" : "Al Khobar, KSA"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(isAr ? job.titleAr : job.titleEn, job.appType)}
                  className="btn-primary self-start sm:self-center shrink-0 text-xs sm:text-sm py-2.5 px-5"
                >
                  <span>{job.appType === "coop" ? (isAr ? "تقديم طلب تدريب" : "Apply for Co-op") : (isAr ? "التقديم على الوظيفة" : "Apply Now")}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl bg-[#0b1628] border border-cyan-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-200 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {applicationType === "coop"
                    ? isAr
                      ? "طلب الانضمام لبرنامج التدريب التعاوني"
                      : "University Co-op Application"
                    : isAr
                    ? "التقديم على الشاغر الوظيفي"
                    : "Job Application"}
                </h3>
                <p className="text-xs text-cyan-300 font-medium mt-0.5">{selectedRole}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">
                  {isAr ? "تم إرسال طلبك وسيرتك الذاتية بنجاح!" : "Application Submitted Successfully!"}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? "شكراً لاهتمامك بالانضمام إلى خبر تك. تم حفظ سيرتك الذاتية وسيتواصل معك فريق استقطاب المواهب في حال توافق مؤهلاتك مع متطلبات الشاغر."
                    : "Thank you for your application. Our talent acquisition committee will review your profile and contact you for the next screening steps."}
                </p>
                <button onClick={handleCloseModal} className="btn-primary mt-3 text-xs sm:text-sm">
                  {isAr ? "إغلاق" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="mt-5 space-y-3.5 text-xs sm:text-sm">
                {errorMsg && (
                  <div className="p-2.5 text-xs rounded-xl bg-red-950/40 border border-red-500/40 text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {isAr ? "الاسم الرباعي *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isAr ? "عبدالله محمد الدوسري" : "e.g. Abdullah Al-Dossary"}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="abdullah@domain.sa"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "رقم الجوال السعودي *" : "Saudi Mobile Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 000 0000"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "الجامعة / الكلية" : "University / College"}
                    </label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder={isAr ? "جامعة الملك فهد للبترول والمعادن KFUPM" : "e.g. KFUPM, KSU"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {applicationType === "coop"
                        ? isAr
                          ? "المعدل التراكمي / التخصص"
                          : "GPA / Major"
                        : isAr
                        ? "سنوات الخبرة العملية"
                        : "Years of Experience"}
                    </label>
                    <input
                      type="text"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      placeholder={applicationType === "coop" ? "علوم الحاسب (3.8/4.0)" : "3 سنوات"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* CV File Upload */}
                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {isAr ? "رفع ملف السيرة الذاتية (CV / Resume) *" : "Upload CV / Resume (PDF / DOCX) *"}
                  </label>
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-4 text-center transition bg-slate-900/40">
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      required={!uploadedCvUrl}
                      onChange={handleCvChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {uploadingCv ? (
                      <div className="flex items-center justify-center gap-2 text-cyan-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isAr ? "جاري رفع السيرة الذاتية لـ Cloudflare R2..." : "Uploading CV..."}</span>
                      </div>
                    ) : file ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
                        <FileCheck2 className="w-4 h-4" />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <UploadCloud className="w-6 h-6 text-cyan-400 mx-auto" />
                        <p className="text-xs text-slate-300">
                          {isAr ? "اضغط لاختيار ملف السيرة الذاتية (PDF, DOCX)" : "Select CV (PDF, DOCX up to 15MB)"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {isAr ? "نبذة مختصرة أو رابط LinkedIn:" : "Short Bio / LinkedIn URL:"}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={isAr ? "أبرز الإنجازات والتقنيات التي تتقنها..." : "Key achievements, skills, or GitHub..."}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary text-xs py-2 px-3.5"
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || uploadingCv}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    {submitting ? (
                      <span>{isAr ? "جاري الإرسال..." : "Submitting..."}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{isAr ? "إرسال طلب التقديم" : "Submit Application"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

