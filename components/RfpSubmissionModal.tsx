"use client";

import { useState } from "react";
import {
  FileText,
  UploadCloud,
  X,
  CheckCircle2,
  FileCheck,
  Send,
  Loader2,
  Building,
  Mail,
  Phone,
  User,
} from "lucide-react";

interface RfpSubmissionModalProps {
  locale: string;
  triggerButtonText?: string;
  className?: string;
}

export function RfpSubmissionModal({
  locale,
  triggerButtonText,
  className,
}: RfpSubmissionModalProps) {
  const isAr = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(isAr ? "أنظمة تخطيط موارد المؤسسات ERP" : "Enterprise ERP Systems");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  // Submit states
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrorMsg(isAr ? "حجم الملف يجب ألا يتجاوز 15 ميجابايت." : "File size must not exceed 15MB.");
      return;
    }

    setFile(selectedFile);
    setErrorMsg("");
    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", "rfp");

      const res = await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل رفع الملف.");
      }

      setUploadedFileUrl(data.url);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "فشل رفع كراسة الشروط.");
      setFile(null);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone,
          service,
          budget,
          description: description || (isAr ? "تقديم كراسة شروط ومواصفات مناقصة RFP" : "RFP Specification submission"),
          locale,
          inquiryType: "rfp",
          rfpFileUrl: uploadedFileUrl || null,
          metadata: {
            fileName: file?.name,
            fileSize: file?.size,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء تقديم المناقصة. يرجى المحاولة لاحقاً.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "فشل تقديم المناقصة.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setBudget("");
    setDescription("");
    setFile(null);
    setUploadedFileUrl("");
    setSubmitted(false);
    setErrorMsg("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 rounded-full border border-cyan-500/40 px-5 py-2.5 text-xs sm:text-sm font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 hover:border-cyan-400 transition"
        }
      >
        <FileText className="w-4 h-4 text-cyan-400" />
        <span>
          {triggerButtonText || (isAr ? "تقديم كراسة شروط ومناقصة (RFP)" : "Submit RFP / Tender")}
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-[#0b1628] border border-cyan-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-200 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isAr
                      ? "بوابة تقديم طلبات العروض والمناقصات (RFP)"
                      : "Enterprise RFP & Tender Submission"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr
                      ? "ارفع وثائق ومواصفات مشروعك ليقوم فريقنا الهندسي بدراستها وتقديم عرض رسمي."
                      : "Upload your project specifications for our engineering committee to evaluate."}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">
                  {isAr ? "تم استلام كراسة الشروط بنجاح!" : "RFP Received Successfully!"}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? "تم تسجيل كراسة الشروط وتخزين الملف بأمان على خوادمنا السحابية. سيقوم فريق المبيعات والمناقصات بمراجعة العرض والتواصل معكم عبر البريد الرسمي خلال يومي عمل."
                    : "Your RFP documents have been securely uploaded to our sovereign cloud. Our solutions architect and bid manager will review and contact you within 2 business days."}
                </p>
                <button
                  onClick={handleReset}
                  className="btn-primary mt-4 text-xs sm:text-sm"
                >
                  {isAr ? "إغلاق النافذة" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs sm:text-sm">
                {errorMsg && (
                  <div className="p-3 text-xs rounded-xl bg-red-950/40 border border-red-500/40 text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "اسم ممثل المشتريات / المسؤول *" : "Authorized Contact Person *"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute start-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isAr ? "م. سلطان العتيبي" : "e.g. Sultan Al-Otaibi"}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "الشركة أو الجهة الحكومية *" : "Enterprise / Gov Entity *"}
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute start-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={isAr ? "مجموعة البتروكيماويات للحلول" : "e.g. Petrochemical Solutions Group"}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "البريد الإلكتروني الرسمي *" : "Official Work Email *"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute start-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@company.sa"
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "رقم الهاتف / الجوال *" : "Contact Phone / Mobile *"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute start-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 13 800 0000"
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "المجال التقني للطلب *" : "Technical Domain *"}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option>{isAr ? "أنظمة تخطيط موارد المؤسسات ERP" : "Enterprise ERP Systems"}</option>
                      <option>{isAr ? "الفوترة الإلكترونية زاتكا (ZATCA Phase 2)" : "ZATCA E-Invoicing Phase 2"}</option>
                      <option>{isAr ? "البنية السحابية ومراكز البيانات" : "Cloud & Sovereign Infrastructure"}</option>
                      <option>{isAr ? "الأمن السيبراني والامتثال وضوابط NCA" : "Cybersecurity & NCA Controls"}</option>
                      <option>{isAr ? "تطوير المنصات والبرمجيات المخصصة" : "Custom Digital Engineering"}</option>
                      <option>{isAr ? "الذكاء الاصطناعي وأتمتة العمليات RPA" : "AI & Enterprise RPA"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {isAr ? "الميزانية المخصصة (اختياري)" : "Allocated Budget (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder={isAr ? "مثال: 150,000 - 300,000 ر.س" : "e.g. 150k - 300k SAR"}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {isAr ? "رفع ملف كراسة الشروط والمواصفات (RFP) *" : "Upload RFP Specification Document (PDF / DOCX / ZIP) *"}
                  </label>
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-2xl p-4 sm:p-6 text-center transition bg-slate-900/40">
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.zip"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {uploadingFile ? (
                      <div className="flex items-center justify-center gap-2 text-cyan-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{isAr ? "جاري رفع المستند إلى Cloudflare R2..." : "Uploading to Sovereign Cloud..."}</span>
                      </div>
                    ) : file ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
                        <FileCheck className="w-5 h-5" />
                        <span>{file.name}</span>
                        <span className="text-xs text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
                        <p className="text-xs sm:text-sm text-slate-300">
                          {isAr ? "اضغط لاختيار كراسة الشروط أو اسحب الملف هنا" : "Click to select RFP file or drag and drop here"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {isAr ? "الصيغ المدعومة: PDF, DOCX, ZIP (حتى 15 ميجابايت)" : "Supported: PDF, DOCX, ZIP (up to 15MB)"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {isAr ? "ملاحظات أو نطاق عمل إضافي:" : "Project Overview / Scope Notes:"}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={isAr ? "حدد الموعد النهائي لتسليم العروض أو أية متطلبات إضافية..." : "Specify submission deadlines or key project prerequisites..."}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary text-xs sm:text-sm"
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploadingFile}
                    className="btn-primary"
                  >
                    {loading ? (
                      <span>{isAr ? "جاري التسليم..." : "Submitting..."}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isAr ? "تقديم طلب المناقصة رسمياً" : "Submit Tender / RFP"}</span>
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

