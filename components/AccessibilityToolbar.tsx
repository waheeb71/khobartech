"use client";

import { useEffect, useState } from "react";
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  SunMoon,
  Link2,
  Type,
  X,
} from "lucide-react";

interface AccessibilityToolbarProps {
  locale: string;
}

export function AccessibilityToolbar({ locale }: AccessibilityToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  const isAr = locale === "ar";

  useEffect(() => {
    // Apply font size
    document.documentElement.classList.remove("text-size-large", "text-size-xlarge");
    if (fontSize === "large") document.documentElement.classList.add("text-size-large");
    if (fontSize === "xlarge") document.documentElement.classList.add("text-size-xlarge");

    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add("a11y-high-contrast");
    } else {
      document.documentElement.classList.remove("a11y-high-contrast");
    }

    // Apply highlight links
    if (highlightLinks) {
      document.documentElement.classList.add("a11y-highlight-links");
    } else {
      document.documentElement.classList.remove("a11y-highlight-links");
    }

    // Apply readable font
    if (readableFont) {
      document.documentElement.classList.add("a11y-readable-font");
    } else {
      document.documentElement.classList.remove("a11y-readable-font");
    }
  }, [fontSize, highContrast, highlightLinks, readableFont]);

  const resetAll = () => {
    setFontSize("normal");
    setHighContrast(false);
    setHighlightLinks(false);
    setReadableFont(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-24 end-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isAr ? "خيارات النفاذ وسهولة الاستخدام (DGA)" : "Digital Accessibility (DGA / WCAG)"}
          className="w-12 h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-xl shadow-cyan-950/60 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Accessibility className="w-6 h-6 transition-transform group-hover:rotate-12" />
        </button>
      </div>

      {/* Accessible Control Modal/Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? "لوحة سهولة الوصول والنفاذ الرقمي" : "Accessibility Toolbar"}
          className="fixed bottom-40 end-5 w-80 max-w-[calc(100vw-2.5rem)] z-50 bg-[#0b1628]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl rounded-2xl p-5 text-slate-200 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-sm">
                {isAr ? "النفاذ الرقمي (معايير DGA)" : "Digital Accessibility (DGA)"}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              aria-label={isAr ? "إغلاق" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3.5 text-xs">
            {/* Font Resizing */}
            <div>
              <span className="text-slate-400 block mb-1.5 font-medium">
                {isAr ? "حجم الخط:" : "Text Size:"}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setFontSize("normal")}
                  className={`py-1.5 px-2 rounded-lg border font-medium transition ${
                    fontSize === "normal"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {isAr ? "طبيعي" : "Normal"}
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  className={`py-1.5 px-2 rounded-lg border font-medium flex items-center justify-center gap-1 transition ${
                    fontSize === "large"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  +15%
                </button>
                <button
                  onClick={() => setFontSize("xlarge")}
                  className={`py-1.5 px-2 rounded-lg border font-medium flex items-center justify-center gap-1 transition ${
                    fontSize === "xlarge"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  +30%
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-2 text-slate-300">
                <SunMoon className="w-4 h-4 text-cyan-400" />
                {isAr ? "تباين عالي للألوان" : "High Contrast"}
              </span>
              <button
                onClick={() => setHighContrast(!highContrast)}
                aria-pressed={highContrast}
                className={`w-11 h-6 rounded-full transition relative ${
                  highContrast ? "bg-cyan-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition transform ${
                    highContrast
                      ? isAr
                        ? "-translate-x-6"
                        : "translate-x-6"
                      : isAr
                      ? "-translate-x-1"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Highlight Links */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-2 text-slate-300">
                <Link2 className="w-4 h-4 text-cyan-400" />
                {isAr ? "إبراز الروابط" : "Highlight Links"}
              </span>
              <button
                onClick={() => setHighlightLinks(!highlightLinks)}
                aria-pressed={highlightLinks}
                className={`w-11 h-6 rounded-full transition relative ${
                  highlightLinks ? "bg-cyan-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition transform ${
                    highlightLinks
                      ? isAr
                        ? "-translate-x-6"
                        : "translate-x-6"
                      : isAr
                      ? "-translate-x-1"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Readable Font */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-2 text-slate-300">
                <Type className="w-4 h-4 text-cyan-400" />
                {isAr ? "خط القراءة الواضح" : "Dyslexia Friendly Font"}
              </span>
              <button
                onClick={() => setReadableFont(!readableFont)}
                aria-pressed={readableFont}
                className={`w-11 h-6 rounded-full transition relative ${
                  readableFont ? "bg-cyan-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition transform ${
                    readableFont
                      ? isAr
                        ? "-translate-x-6"
                        : "translate-x-6"
                      : isAr
                      ? "-translate-x-1"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={resetAll}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-1.5 transition text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                {isAr ? "إعادة ضبط الإعدادات الافتراضية" : "Reset Accessibility Settings"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

