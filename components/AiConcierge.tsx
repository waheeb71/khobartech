"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Send,
  X,
  MessageSquare,
  Calculator,
  FileText,
  Calendar,
  PhoneCall,
  User,
} from "lucide-react";

interface AiConciergeProps {
  locale: string;
}

interface Message {
  sender: "bot" | "user";
  text: string;
  action?: {
    type: "link" | "scroll" | "whatsapp";
    target: string;
    label: string;
  };
}

export function AiConcierge({ locale }: AiConciergeProps) {
  const isAr = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage = isAr
    ? "مرحباً بك في تكنولوجيا الخبر! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم في اختيار الحل التقني الأنسب لمنشأتك؟"
    : "Welcome to Khobar Tech! I am your AI Consultant. How can I assist you today with sovereign cloud, ERP, or ZATCA integration?";

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: initialBotMessage,
    },
  ]);

  const quickQuestions = isAr
    ? [
        "كيف نربط أنظمتنا مع زاتكا (ZATCA)؟",
        "هل سحابتكم متوافقة مع ضوابط NCA؟",
        "احسب تكلفة مشروعي التقني",
        "حجز جلسة استشارية مع مهندس",
      ]
    : [
        "How do you handle ZATCA Phase 2?",
        "Are your cloud services NCA compliant?",
        "Estimate my project investment",
        "Book a technical advisory session",
      ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (userText: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const newMessages: Message[] = [...messages, { sender: "user", text: textToSend }];
    setMessages(newMessages);
    setInput("");

    // Generate smart context-aware response
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let botResponse = "";
      let botAction: Message["action"] | undefined = undefined;

      if (lower.includes("زاتكا") || lower.includes("zatca") || lower.includes("فاتورة") || lower.includes("fatoora")) {
        botResponse = isAr
          ? "نوفر بوابة ZATCA Gateway المعتمدة للربط المباشر مع منصة فاتورة (المرحلة الثانية). نقوم بتوليد التشفير والأختام الرقمية وربط نظامك المحاسبي خلال أسابيع قليلة دون تعطيل عملك."
          : "We provide our certified ZATCA Gateway for seamless Phase 2 integration with Fatoora, generating real-time cryptographic stamps and QR codes.";
        botAction = {
          type: "scroll",
          target: "estimator",
          label: isAr ? "احسب تكلفة ربط زاتكا" : "Estimate ZATCA Integration",
        };
      } else if (lower.includes("nca") || lower.includes("أمن") || lower.includes("cyber") || lower.includes("سيبراني")) {
        botResponse = isAr
          ? "نلتزم بنسبة 100% بالضوابط الأساسية للأمن السيبراني (ECC) الصادرة عن الهيئة الوطنية للأمن السيبراني، ونستضيف البيانات داخل خوادم سعودية سيادية متوافقة مع نظام حماية البيانات الشخصية (PDPL)."
          : "All our architectures strictly satisfy the National Cybersecurity Authority (NCA ECC) standards, hosted in sovereign Saudi data centers adhering to PDPL.";
      } else if (lower.includes("احسب") || lower.includes("تكلفة") || lower.includes("سعر") || lower.includes("estimate") || lower.includes("cost") || lower.includes("price")) {
        botResponse = isAr
          ? "يمكنك استخدام حاسبة التكلفة الذكية التفاعلية في الموقع لتحديد نوع المنظومة وحجم منشأتك والحصول على ميزانية وجدول زمني تقديري فوراً!"
          : "You can utilize our interactive Project Cost Estimator to configure your solution parameters and get instant budget & timeline estimates!";
        botAction = {
          type: "scroll",
          target: "estimator",
          label: isAr ? "الانتقال إلى حاسبة التكلفة" : "Go to Estimator",
        };
      } else if (lower.includes("استشارة") || lower.includes("اجتماع") || lower.includes("meet") || lower.includes("book") || lower.includes("تواصل") || lower.includes("اتصال")) {
        botResponse = isAr
          ? "يسعدنا دائماً لقاؤكم! بإمكانكم التحدث فوراً مع مستشارنا التقني عبر واتساب أو حجز جلسة استشارية فنية عن بعد."
          : "We would be delighted to meet! You can chat directly with our solutions consultant on WhatsApp or schedule a virtual advisory call.";
        botAction = {
          type: "whatsapp",
          target: "https://wa.me/966500000000?text=" + encodeURIComponent("مرحباً، أود حجز جلسة استشارية تقنية مع خبر تك"),
          label: isAr ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp",
        };
      } else if (lower.includes("توظيف") || lower.includes("تدريب") || lower.includes("career") || lower.includes("job") || lower.includes("coop")) {
        botResponse = isAr
          ? "نرحب دائماً بالكفاءات الوطنية وطلبة التدريب التعاوني (KFUPM والجامعات السعودية). يمكنك تصفح الشواغر المتاحة ورفع سيرتك الذاتية عبر بوابة التوظيف."
          : "We welcome local tech talent and university co-op students. You can explore open roles and submit your CV via our Careers portal.";
        botAction = {
          type: "link",
          target: `/${locale}/careers`,
          label: isAr ? "بوابة التوظيف والتدريب" : "Explore Careers",
        };
      } else {
        botResponse = isAr
          ? "شكراً لسؤالك. نحن في خبر تك نغطي أنظمة تخطيط الموارد ERP، بوابات الفوترة الإلكترونية زاتكا، البنى السحابية، والذكاء الاصطناعي في المملكة. هل تود حساب تكلفة تقريبية لمشروعك أم التحدث مباشرة مع مهندس مختص؟"
          : "Khobar Tech covers Enterprise ERP, ZATCA e-invoicing gateways, sovereign cloud, and AI automation. Would you like to estimate your project or speak with a specialist?";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse, action: botAction }]);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<Message["action"]>) => {
    if (action.type === "scroll") {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    } else if (action.type === "whatsapp") {
      window.open(action.target, "_blank");
    } else if (action.type === "link") {
      window.location.href = action.target;
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 end-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isAr ? "المساعد الذكي لخبر تك" : "Khobar Tech AI Concierge"}
          className="relative px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#0b1628] font-bold shadow-2xl shadow-cyan-500/30 flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 group focus:outline-none"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-navy group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-black hidden sm:inline text-navy">
            {isAr ? "مساعد خبر تك الذكي" : "AI Concierge"}
          </span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-20 end-4 sm:end-6 w-[92vw] sm:w-96 max-h-[560px] z-50 bg-[#0b1628]/95 backdrop-blur-md border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/70 flex flex-col text-slate-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-[#0f1f3d] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{isAr ? "المستشار التقني الذكي" : "AI Tech Consultant"}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isAr ? "استجابة فورية 24/7" : "24/7 Sovereign Intelligence"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-cyan-500 text-navy font-semibold rounded-br-none"
                      : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow"
                  }`}
                >
                  {m.text}
                </div>

                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action!)}
                    className="mt-2 text-[11px] font-bold px-3 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{m.action.label}</span>
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-[#08101e] border-t border-slate-800/80 flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-[#0f1f3d] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? "اكتب استفسارك هنا..." : "Type your technical inquiry..."}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy font-bold disabled:opacity-40 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

