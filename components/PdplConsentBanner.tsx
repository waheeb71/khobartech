"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, X, Check } from "lucide-react";

interface PdplConsentBannerProps {
  locale: string;
}

export function PdplConsentBanner({ locale }: PdplConsentBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const isAr = locale === "ar";

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("khobartech_pdpl_consent");
    if (!saved) {
      // Delay showing banner slightly for smooth entrance
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "khobartech_pdpl_consent",
      JSON.stringify({ status: "accepted", timestamp: new Date().toISOString(), level: "all" })
    );
    setShow(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(
      "khobartech_pdpl_consent",
      JSON.stringify({ status: "essential", timestamp: new Date().toISOString(), level: "essential" })
    );
    setShow(false);
  };

  if (!mounted || !show) return null;

  return (
    <div
      role="region"
      aria-label={isAr ? "إشعار الخصوصية وملفات تعريف الارتباط" : "Privacy and Cookie Notice"}
      className="fixed bottom-4 inset-x-4 md:inset-x-auto md:start-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#0b1628]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 rounded-2xl p-5 text-slate-200">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Cookie className="w-4 h-4 text-cyan-400" />
                {isAr
                  ? "حماية البيانات الشخصية والخصوصية (PDPL)"
                  : "Personal Data Protection & Privacy (PDPL)"}
              </h3>
              <button
                onClick={handleEssentialOnly}
                aria-label={isAr ? "إغلاق" : "Close"}
                className="text-slate-400 hover:text-white transition p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isAr ? (
                <>
                  نلتزم في <strong>خبر تك</strong> بأحكام{" "}
                  <span className="text-cyan-300 font-semibold">
                    نظام حماية البيانات الشخصية السعودي (PDPL)
                  </span>
                  . نستخدم ملفات تعريف الارتباط والتقنيات السحابية المعتمدة لتحسين تجربتك الرقمية وتأمين بياناتك داخل المملكة.{" "}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium"
                  >
                    سياسة الخصوصية
                  </Link>
                </>
              ) : (
                <>
                  At <strong>Khobar Tech</strong>, we comply with the{" "}
                  <span className="text-cyan-300 font-semibold">
                    Saudi Personal Data Protection Law (PDPL)
                  </span>
                  . We utilize secure cookies to ensure optimal browsing performance and national sovereign data security.{" "}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </>
              )}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0b1628] font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <Check className="w-3.5 h-3.5" />
                {isAr ? "قبول الكل" : "Accept All"}
              </button>
              <button
                onClick={handleEssentialOnly}
                className="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium border border-slate-700 transition"
              >
                {isAr ? "الضرورية فقط" : "Essential Only"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

