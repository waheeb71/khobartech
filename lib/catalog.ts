export type Locale = "ar" | "en";

export type ServiceGroup = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  capabilities: Record<Locale, string[]>;
  benefits: Record<Locale, string[]>;
  asset: string;
  items: Array<[slug: string, ar: string, en: string]>;
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "enterprise",
    title: { ar: "الحلول المؤسسية وERP", en: "Enterprise Software & ERP" },
    description: { ar: "أنظمة مترابطة تجعل الأعمال اليومية أوضح وأسرع وقابلة للقياس.", en: "Connected systems that make daily operations clearer, faster, and measurable." },
    capabilities: { ar: ["تصميم عمليات مخصصة", "تكامل البيانات", "صلاحيات وتقارير"], en: ["Custom process design", "Data integration", "Roles and reporting"] },
    benefits: { ar: ["قرار أدق", "تشغيل موحّد", "نمو منظم"], en: ["Clearer decisions", "Unified operations", "Structured growth"] },
    asset: "services/enterprise/enterprise-operations-1600x1000.webp",
    items: [["erp-systems", "أنظمة ERP", "ERP Systems"], ["accounting-systems", "أنظمة المحاسبة", "Accounting Systems"], ["hrm", "إدارة الموارد البشرية", "Human Resources Management (HRM)"], ["crm-systems", "أنظمة إدارة علاقات العملاء", "CRM Systems"], ["inventory-management", "إدارة المخزون", "Inventory Management"], ["point-of-sale", "نقاط البيع", "Point of Sale (POS)"], ["project-management", "أنظمة إدارة المشاريع", "Project Management Systems"], ["procurement-sales", "إدارة المشتريات والمبيعات", "Procurement & Sales Management"], ["asset-management", "إدارة الأصول", "Asset Management"], ["school-management", "أنظمة إدارة المدارس", "School Management Systems"]],
  },
  {
    slug: "development",
    title: { ar: "تطوير الويب والجوال", en: "Web & Mobile Development" },
    description: { ar: "منتجات رقمية سريعة وواضحة، من الفكرة إلى تجربة يستخدمها عملاؤك بثقة.", en: "Fast, clear digital products—from idea to an experience your customers trust." },
    capabilities: { ar: ["تجارب مستخدم مدروسة", "واجهات مرنة", "واجهات API آمنة"], en: ["Thoughtful UX", "Flexible interfaces", "Secure APIs"] },
    benefits: { ar: ["وصول أوسع", "وقت أسرع للسوق", "ملكية كاملة للحل"], en: ["Broader reach", "Faster time to market", "Full solution ownership"] },
    asset: "services/development/software-build-1600x1000.webp",
    items: [["web-applications", "تطوير تطبيقات الويب", "Web Application Development"], ["android-apps", "تطوير تطبيقات Android", "Android Application Development"], ["ios-apps", "تطوير تطبيقات iOS", "iOS Application Development"], ["cross-platform", "تطوير متعدد المنصات", "Cross-platform Development"], ["ecommerce-platforms", "منصات التجارة الإلكترونية", "E-commerce Platforms"], ["custom-software", "تطوير البرمجيات المخصصة", "Custom Software Development"], ["api-development", "تطوير واجهات API", "API Development"], ["backend-development", "تطوير الواجهات الخلفية", "Backend Development"], ["frontend-development", "تطوير الواجهات الأمامية", "Frontend Development"], ["ui-ux-design", "تصميم UI/UX", "UI/UX Design"]],
  },
  {
    slug: "saas-cloud",
    title: { ar: "حلول SaaS والسحابة", en: "SaaS & Cloud Solutions" },
    description: { ar: "منصات اشتراك وبنى سحابية مرنة صُممت للنمو والتشغيل الموثوق.", en: "Subscription platforms and cloud foundations designed for scalable, reliable operations." },
    capabilities: { ar: ["هندسة متعددة المستأجرين", "إدارة الاشتراكات", "تكاملات موثوقة"], en: ["Multi-tenant architecture", "Subscription management", "Reliable integrations"] },
    benefits: { ar: ["نمو متدرج", "تشغيل أخف", "تجربة متسقة"], en: ["Progressive scale", "Lean operations", "Consistent experience"] },
    asset: "services/saas/cloud-platform-1600x1000.webp",
    items: [["saas-platform-development", "تطوير منصات SaaS", "SaaS Platform Development"], ["multi-tenant-systems", "أنظمة متعددة المستأجرين", "Multi-Tenant Systems"], ["white-label-solutions", "حلول العلامة البيضاء", "White Label Solutions"], ["cloud-infrastructure", "البنية السحابية", "Cloud Infrastructure"], ["cloud-hosting-management", "إدارة الاستضافة السحابية", "Cloud Hosting Management"], ["subscription-management", "إدارة الاشتراكات", "Subscription Management"], ["cloud-databases", "حلول قواعد البيانات السحابية", "Cloud Database Solutions"], ["system-integration", "تكامل الأنظمة", "System Integration"]],
  },
  {
    slug: "ai-automation",
    title: { ar: "الذكاء الاصطناعي والأتمتة", en: "Artificial Intelligence & Automation" },
    description: { ar: "ذكاء عملي يقلل العمل المتكرر ويحوّل بياناتك إلى قرارات قابلة للتنفيذ.", en: "Practical intelligence that reduces repetitive work and turns data into actionable decisions." },
    capabilities: { ar: ["فهم المستندات", "مساعدات خاصة بالأعمال", "أتمتة مترابطة"], en: ["Document understanding", "Business-aware assistants", "Connected automation"] },
    benefits: { ar: ["إنتاجية أعلى", "استجابة أسرع", "معرفة قابلة للوصول"], en: ["Higher productivity", "Faster response", "Accessible knowledge"] },
    asset: "services/ai/ai-workflow-1600x1000.webp",
    items: [["ai-assistants", "تطوير مساعدات الذكاء الاصطناعي", "AI Assistant Development"], ["ai-agents", "وكلاء الذكاء الاصطناعي", "AI Agents"], ["business-chatbots", "شات بوت للأعمال", "Business Chatbots"], ["rag-solutions", "حلول RAG", "RAG Solutions"], ["document-intelligence", "ذكاء المستندات", "Document Intelligence"], ["ocr-automation", "أتمتة OCR", "OCR Automation"], ["workflow-automation", "أتمتة سير العمل", "Workflow Automation"], ["predictive-analytics", "التحليلات التنبؤية", "Predictive Analytics"], ["ai-integration", "تكامل الذكاء الاصطناعي", "AI Integration"]],
  },
  {
    slug: "cybersecurity",
    title: { ar: "الأمن السيبراني", en: "Cybersecurity" },
    description: { ar: "حماية واقعية للأنظمة والبيانات تبدأ بالتصميم ولا تنتهي بالمراقبة.", en: "Practical protection for systems and data—from design through ongoing monitoring." },
    capabilities: { ar: ["تقييمات موثقة", "تقوية البنية", "ضوابط تشغيلية"], en: ["Documented assessments", "Infrastructure hardening", "Operational controls"] },
    benefits: { ar: ["مخاطر أقل", "ثقة أكبر", "جاهزية محسّنة"], en: ["Lower risk", "Greater trust", "Improved readiness"] },
    asset: "services/cybersecurity/security-operations-1600x1000.webp",
    items: [["vulnerability-assessment", "تقييم الثغرات", "Vulnerability Assessment"], ["authorized-penetration-testing", "اختبار اختراق مصرح", "Authorized Penetration Testing"], ["application-security", "أمن التطبيقات", "Application Security"], ["network-security", "أمن الشبكات", "Network Security"], ["server-hardening", "تقوية الخوادم", "Server Hardening"], ["security-auditing", "التدقيق الأمني", "Security Auditing"], ["security-monitoring", "المراقبة الأمنية", "Security Monitoring"], ["siem-solutions", "حلول SIEM", "SIEM Solutions"], ["devsecops", "DevSecOps", "DevSecOps"], ["security-consulting", "الاستشارات الأمنية", "Security Consulting"]],
  },
  {
    slug: "digital-marketing",
    title: { ar: "التسويق الرقمي", en: "Digital Marketing" },
    description: { ar: "استراتيجية ومحتوى وتجارب تحويل تربط العلامة بنمو الأعمال.", en: "Strategy, content, and conversion experiences that connect brand to business growth." },
    capabilities: { ar: ["استراتيجية قابلة للقياس", "محتوى وهوية", "تحليل وتحسين"], en: ["Measurable strategy", "Content and identity", "Analysis and optimization"] },
    benefits: { ar: ["حضور أوضح", "طلبات أكثر جودة", "تعلم مستمر"], en: ["Clearer presence", "Higher-quality leads", "Continuous learning"] },
    asset: "services/marketing/growth-strategy-1600x1000.webp",
    items: [["digital-strategy", "الاستراتيجية الرقمية", "Digital Strategy"], ["seo", "تحسين محركات البحث", "Search Engine Optimization (SEO)"], ["social-media-management", "إدارة وسائل التواصل", "Social Media Management"], ["advertising-campaigns", "الحملات الإعلانية", "Advertising Campaigns"], ["brand-identity", "تصميم الهوية البصرية", "Brand Identity Design"], ["graphic-design", "التصميم الجرافيكي", "Graphic Design"], ["content-creation", "إنشاء المحتوى", "Content Creation"], ["landing-page-design", "تصميم صفحات الهبوط", "Landing Page Design"], ["digital-analytics", "التحليلات الرقمية", "Digital Analytics"]],
  },
  {
    slug: "infrastructure-devops",
    title: { ar: "البنية التقنية وDevOps", en: "IT Infrastructure & DevOps" },
    description: { ar: "أساس تشغيلي متين يجعل التطبيقات قابلة للنشر والمراقبة والتعافي.", en: "A resilient operational foundation for deployable, observable, recoverable applications." },
    capabilities: { ar: ["إدارة موثوقة", "نشر آلي", "مراقبة مستمرة"], en: ["Reliable administration", "Automated delivery", "Continuous monitoring"] },
    benefits: { ar: ["استقرار أكبر", "إصدارات أسرع", "تعافٍ أفضل"], en: ["Greater stability", "Faster releases", "Better recovery"] },
    asset: "services/infrastructure/platform-ops-1600x1000.webp",
    items: [["server-administration", "إدارة خوادم Linux وWindows", "Linux & Windows Server Administration"], ["network-infrastructure", "البنية الشبكية", "Network Infrastructure"], ["database-administration", "إدارة قواعد البيانات", "Database Administration"], ["docker-containerization", "Docker والحاويات", "Docker & Containerization"], ["cicd-automation", "أتمتة CI/CD", "CI/CD Automation"], ["cloudflare-dns", "Cloudflare وDNS", "Cloudflare & DNS"], ["backup-disaster-recovery", "النسخ الاحتياطي والتعافي", "Backup & Disaster Recovery"], ["monitoring-maintenance", "المراقبة والصيانة", "Monitoring & Maintenance"]],
  },
  {
    slug: "digital-transformation",
    title: { ar: "التحول الرقمي والاستشارات", en: "Digital Transformation & Consulting" },
    description: { ar: "خارطة تقنية تربط الأولويات التجارية بالتنفيذ المرحلي القابل للقياس.", en: "A technology roadmap connecting commercial priorities to measurable phased delivery." },
    capabilities: { ar: ["تحليل العمليات", "تصميم المعمارية", "تمكين الفرق"], en: ["Process analysis", "Architecture design", "Team enablement"] },
    benefits: { ar: ["استثمار أوضح", "انتقال محسوب", "قابلية تطور"], en: ["Clearer investment", "Managed change", "Room to evolve"] },
    asset: "services/consulting/transformation-roadmap-1600x1000.webp",
    items: [["business-process-analysis", "تحليل عمليات الأعمال", "Business Process Analysis"], ["digital-transformation-consulting", "استشارات التحول الرقمي", "Digital Transformation Consulting"], ["system-architecture", "هندسة الأنظمة", "System Architecture"], ["legacy-modernization", "تحديث الأنظمة القديمة", "Legacy System Modernization"], ["business-intelligence", "ذكاء الأعمال", "Business Intelligence"], ["data-migration", "ترحيل البيانات", "Data Migration"], ["enterprise-integration", "التكامل المؤسسي", "Enterprise Integration"], ["technical-training", "التدريب التقني", "Technical Training"]],
  },
];

export const solutions = [
  { ar: "إدارة الأعمال", en: "Business Management", detailAr: "عمليات مترابطة قابلة للرؤية.", detailEn: "Connected operations with clear visibility." },
  { ar: "الإدارة المالية", en: "Financial Management", detailAr: "بيانات دقيقة لقرار أسرع.", detailEn: "Reliable data for faster decisions." },
  { ar: "الموارد البشرية", en: "Human Resources", detailAr: "تجربة منظمة للفريق.", detailEn: "A structured employee experience." },
  { ar: "إدارة العملاء", en: "Customer Relationships", detailAr: "متابعة تحول الاهتمام إلى علاقة.", detailEn: "Follow-up that turns interest into relationships." },
  { ar: "المخزون والعمليات", en: "Inventory & Operations", detailAr: "حركة واضحة من المخزون إلى التسليم.", detailEn: "Clear movement from inventory to delivery." },
  { ar: "التجارة الرقمية", en: "Digital Commerce", detailAr: "تجارب شراء قابلة للنمو.", detailEn: "Commerce experiences built to grow." },
  { ar: "أتمتة سير العمل", en: "Workflow Automation", detailAr: "وقت أقل على التكرار.", detailEn: "Less time spent on repetition." },
  { ar: "أمن المؤسسات", en: "Enterprise Security", detailAr: "ضوابط عملية للثقة والاستمرارية.", detailEn: "Practical controls for trust and continuity." },
];

export const blogTopics = [
  { slug: "erp-guide", ar: "كيف تختار نظام ERP يناسب مراحل نمو عملك؟", en: "How to choose an ERP system that fits your growth stage", categoryAr: "ERP", categoryEn: "ERP" },
  { slug: "accounting-software", ar: "ما الذي يجب أن تقدمه برامج المحاسبة الحديثة؟", en: "What modern accounting software should deliver", categoryAr: "المحاسبة", categoryEn: "Accounting" },
  { slug: "cybersecurity-basics", ar: "أساسيات أمن التطبيقات قبل الإطلاق", en: "Application security fundamentals before launch", categoryAr: "الأمن السيبراني", categoryEn: "Cybersecurity" },
  { slug: "ai-business", ar: "الذكاء الاصطناعي العملي: من التجربة إلى قيمة الأعمال", en: "Practical AI: from experiment to business value", categoryAr: "الذكاء الاصطناعي", categoryEn: "Artificial Intelligence" },
  { slug: "software-architecture", ar: "بناء برمجيات قابلة للتوسع: قرارات معمارية مهمة", en: "Building scalable software: architecture decisions that matter", categoryAr: "تطوير البرمجيات", categoryEn: "Software Development" },
  { slug: "digital-transformation", ar: "خارطة طريق واقعية للتحول الرقمي", en: "A practical roadmap for digital transformation", categoryAr: "التحول الرقمي", categoryEn: "Digital Transformation" },
  { slug: "saas-platform", ar: "ما الذي تحتاجه منصة SaaS قبل التوسع؟", en: "What a SaaS platform needs before scaling", categoryAr: "SaaS", categoryEn: "SaaS" },
];

export const flatServices = serviceGroups.flatMap((group) =>
  group.items.map(([slug, ar, en]) => ({
    slug,
    group,
    title: { ar, en },
    description: {
      ar: `نطوّر ${ar} ضمن فهم واضح لعملياتك واحتياجات فريقك، مع قابلية للتكامل والنمو.`,
      en: `We deliver ${en} around a clear understanding of your operations, teams, integration needs, and growth.`
    },
  }))
);

export function getServiceGroup(slug: string) {
  return serviceGroups.find((group) => group.slug === slug);
}

export function getService(groupSlug: string, serviceSlug: string) {
  return flatServices.find((service) => service.group.slug === groupSlug && service.slug === serviceSlug);
}
