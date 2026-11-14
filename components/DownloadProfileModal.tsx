"use client";

import { useState } from "react";
import { Download, FileDown, X, CheckCircle2, Building, Mail, Phone, User, Loader2 } from "lucide-react";

interface DownloadProfileModalProps {
  locale: string;
  triggerButtonText?: string;
  className?: string;
}

export function DownloadProfileModal({
  locale,
  triggerButtonText,
  className,
}: DownloadProfileModalProps) {
  const isAr = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Submit lead to database
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company: company || "غير محدد",
          email,
          phone,
          service: isAr ? "تحميل الملف التعريفي للشركة 2026" : "Company Profile 2026 Download",
          description: `طلب تحميل بروفايل الشركة 2026 من قبل: ${fullName} (${company})`,
          locale,
          inquiryType: "profile_download",
        }),
      });

      setDownloaded(true);

      // 2. Trigger PDF download or open in new tab
      const downloadLink = document.createElement("a");
      downloadLink.href = "/documents/khobartech-company-profile-2026.pdf";
      downloadLink.target = "_blank";
      downloadLink.download = "KhobarTech-Corporate-Profile-2026.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ أثناء طلب الملف.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 rounded-full border border-cyan-500/40 px-4 py-2 text-xs font-bold text-cyan-300 bg-slate-900/80 hover:bg-slate-800 hover:border-cyan-400 transition"
        }
      >
        <FileDown className="w-4 h-4 text-cyan-400" />
        <span>
          {triggerButtonText || (isAr ? "الملف التعريفي 2026 (PDF)" : "Company Profile 2026")}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#0b1628] border border-cyan-500/30 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileDown className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isAr ? "تحميل بروفايل شركة تكنولوجيا الخبر" : "Download Khobar Tech Corporate Profile"}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {downloaded ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  {isAr ? "جاري تحميل الملف التعريفي الآن!" : "Your Download Has Started!"}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  {isAr
                    ? "شكراً لاهتمامكم بشركة تكنولوجيا الخبر. إذا لم يبدأ التنزيل تلقائياً، يمكنك النقر على الرابط المباشر أدناه."
                    : "Thank you for your interest in Khobar Tech. If the file does not download automatically, click the direct link below."}
                </p>
                <div className="pt-2">
                  <a
                    href="/documents/khobartech-company-profile-2026.pdf"
                    target="_blank"
                    className="text-xs text-cyan-400 underline font-semibold hover:text-cyan-300"
                  >
                    {isAr ? "تحميل مباشر للملف (PDF)" : "Direct PDF Link"}
                  </a>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary mt-3 text-xs"
                >
                  {isAr ? "إغلاق" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
                <p className="text-slate-400 text-xs">
                  {isAr
                    ? "أدخل بياناتك لتحميل كراسة سابقة الأعمال والقدرات الهندسية لشركة تكنولوجيا الخبر لعام 2026."
                    : "Enter your contact details to download Khobar Tech's 2026 capabilities and case studies portfolio."}
                </p>

                {errorMsg && (
                  <div className="p-2 text-xs rounded-lg bg-red-950/40 border border-red-500/40 text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isAr ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-500 absolute start-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAr ? "م. خالد السالم" : "e.g. Khalid Al-Salem"}
                      className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isAr ? "الشركة أو الجهة *" : "Company / Entity *"}
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-500 absolute start-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={isAr ? "شركة الشرق الأوسط للتجارة" : "e.g. Middle East Trading"}
                      className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isAr ? "البريد الإلكتروني المؤسسي *" : "Work Email *"}
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute start-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="khalid@company.sa"
                      className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isAr ? "رقم الجوال السعودي *" : "Saudi Mobile Number *"}
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-500 absolute start-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 000 0000"
                      className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary text-xs py-2 px-3"
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>{isAr ? "تحميل البروفايل (PDF)" : "Download PDF"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

