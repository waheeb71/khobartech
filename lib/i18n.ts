import type { Locale } from "@/lib/catalog";

export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const copy = {
  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات التقنية",
      solutions: "الحلول",
      products: "المنتجات",
      about: "عن الشركة",
      contact: "تواصل معنا",
      blog: "المدونة",
      start: "احجز اجتماعًا",
    },
    hero: {
      eyebrow: "تكنولوجيا الخبر للاستشارات التقنية",
      title: "حلول تقنية تناسب طريقة عمل مؤسستك",
      body: "نصمم ونطوّر ونربط الحلول التقنية للشركات والجهات في السعودية، من أنظمة تخطيط موارد المؤسسة والمنصات المخصصة إلى الذكاء الاصطناعي والأمن السيبراني والمواقع والتطبيقات، مع دعم مستمر بعد الإطلاق.",
      primary: "استكشف خدماتنا",
      secondary: "تحدث مع خبرائنا",
    },
    common: {
      learn: "اعرف المزيد",
      allServices: "عرض كل الخدمات",
      contact: "تواصل معنا",
      back: "العودة",
      view: "استعرض",
      read: "اقرأ المقال",
      close: "إغلاق",
      menu: "القائمة",
      language: "English",
      placeholder: "أصل مرئي قادم",
      available: "متاح",
      comingSoon: "قريباً",
      inDevelopment: "قيد التطوير",
    },
    sections: {
      services: "خدمات تقنية متكاملة لمؤسستك",
      servicesLead:
        "نساعدك على تطوير أنظمة مؤسستك وربطها، وتحسين خدماتك الرقمية، وتطبيق الذكاء الاصطناعي وأتمتة الإجراءات، وحماية بيئتك التقنية.",
      solutions: "حلول مبنية حول طريقة عمل المنشآت",
      solutionsLead:
        "تقنية منظمة حول ما يحتاجه فريقك وعملاؤك فعلاً.",
      products: "منتجاتنا التقنية",
      productsLead:
        "نبني منتجاتنا بعناية. ستكون تفاصيل الإطلاق هنا فور جاهزيتها.",
      why: "حلول تقنية تدعم تطوّر مؤسستك",
      whyLead:
        "على مدى أكثر من 15 عامًا، ساعدت تكنولوجيا الخبر المؤسسات على توظيف التقنية لتحسين أداء الأعمال ورفع كفاءة العمليات وتطوير خدماتها الرقمية. نجمع بين تطوير البرمجيات وأنظمة المؤسسات والأمن السيبراني والمنصات الرقمية لتقديم حلول مبنية على احتياجات كل مؤسسة.",
      insights: "رؤى تقنية لمساعدتك في اتخاذ القرار",
      insightsLead:
        "محتوى عملي حول الأنظمة والأمن السيبراني والذكاء الاصطناعي والتحول الرقمي.",
      final: "لنتجاوز تحديات عملك معًا.",
      finalLead:
        "سواء كنت تستبدل نظام ERP أو تربط أنظمة منفصلة أو تستكشف الذكاء الاصطناعي، ابدأ بمحادثة معنا.",
    },
    footer:
      "شركة تقنية متخصصة تبني أنظمة مؤسسية وحلول رقمية وتطبيقات ذكاء اصطناعي للشركات والجهات في المملكة العربية السعودية.",
    form: {
      title: "لنبدأ من فكرتك",
      lead: "شاركنا السياق، وسنعود إليك بخطوة تالية واضحة.",
      name: "الاسم الكامل",
      company: "اسم الشركة (اختياري)",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف (اختياري)",
      service: "الخدمة المطلوبة",
      budget: "الميزانية (اختياري)",
      description: "نبذة عن المشروع",
      submit: "أرسل الاستفسار",
      sending: "جارٍ الإرسال…",
      success: "وصلت رسالتك. سنعود إليك قريباً.",
      required: "يرجى إكمال الحقول المطلوبة بشكل صحيح.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      solutions: "Solutions",
      products: "Products",
      about: "About",
      contact: "Contact",
      blog: "Insights",
      start: "Book a Meeting",
    },
    hero: {
      eyebrow: "Khobar Tech — Technology Consulting",
      title: "Technology Solutions That Fit How Your Business Works",
      body: "We design, build, and integrate technology solutions for companies and institutions in Saudi Arabia — from ERP systems and custom platforms to AI, cybersecurity, websites, and applications, with ongoing support after launch.",
      primary: "Explore services",
      secondary: "Talk to our experts",
    },
    common: {
      learn: "Learn more",
      allServices: "View all services",
      contact: "Contact us",
      back: "Back",
      view: "Explore",
      read: "Read article",
      close: "Close",
      menu: "Menu",
      language: "العربية",
      placeholder: "Visual asset coming soon",
      available: "Available",
      comingSoon: "Coming soon",
      inDevelopment: "In development",
    },
    sections: {
      services: "Integrated Technology Services for Your Organization",
      servicesLead:
        "We help you develop and connect your enterprise systems, improve your digital services, apply AI and automation, and protect your technology environment.",
      solutions: "Solutions Built Around How Institutions Work",
      solutionsLead:
        "Technology organized around what your teams and customers truly need.",
      products: "Our Tech Products",
      productsLead:
        "We build our products with care. Launch details will appear here when they are ready.",
      why: "Technology Solutions That Support Your Organization's Growth",
      whyLead:
        "For over 15 years, Khobar Tech has helped organizations harness technology to improve business performance, increase operational efficiency, and develop digital services. We combine software development, enterprise systems, cybersecurity, and digital platforms.",
      insights: "Technology insights to help you decide",
      insightsLead:
        "Practical perspectives on systems, cybersecurity, AI, and digital transformation.",
      final: "Let's Overcome Your Business Challenges Together.",
      finalLead:
        "Whether you're replacing an ERP system, connecting separate systems, or exploring AI, start with a conversation.",
    },
    footer:
      "A specialized technology company building enterprise systems, digital solutions, and AI applications for businesses in Saudi Arabia.",
    form: {
      title: "Let's start with your idea",
      lead: "Share the context and we'll return with a clear next step.",
      name: "Full name",
      company: "Company name (optional)",
      email: "Email",
      phone: "Phone (optional)",
      service: "Required service",
      budget: "Budget (optional)",
      description: "Project overview",
      submit: "Send inquiry",
      sending: "Sending…",
      success: "Your message is with us. We'll be in touch soon.",
      required: "Please complete all required fields correctly.",
    },
  },
} as const;

export function localeHref(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

