import { neon } from "@neondatabase/serverless";

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_JuoFU72jrHTs@ep-muddy-sunset-bdnjc921-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require";

async function init() {
  console.log("Connecting to Neon PostgreSQL...");
  const sql = neon(dbUrl);

  console.log("Creating tables if not exist...");

  // 1. users
  await sql.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      open_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'viewer',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 2. content_items
  await sql.query(`
    CREATE TABLE IF NOT EXISTS content_items (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      category TEXT,
      slug TEXT NOT NULL UNIQUE,
      title_ar TEXT NOT NULL,
      title_en TEXT NOT NULL,
      excerpt_ar TEXT,
      excerpt_en TEXT,
      body_ar TEXT,
      body_en TEXT,
      image_key TEXT,
      seo_title_ar TEXT,
      seo_title_en TEXT,
      seo_description_ar TEXT,
      seo_description_en TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      display_order INTEGER NOT NULL DEFAULT 0,
      metadata JSONB,
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 3. site_settings
  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id SERIAL PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 4. media_assets
  await sql.query(`
    CREATE TABLE IF NOT EXISTS media_assets (
      id SERIAL PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      alt_ar TEXT,
      alt_en TEXT,
      mime_type TEXT NOT NULL,
      width INTEGER,
      height INTEGER,
      created_by INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 5. contact_inquiries
  await sql.query(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT NOT NULL,
      budget TEXT,
      description TEXT NOT NULL,
      locale TEXT NOT NULL DEFAULT 'ar',
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 6. audit_logs
  await sql.query(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      actor_id INTEGER,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  console.log("Tables created successfully.");

  // Insert default admin user
  await sql.query(`
    INSERT INTO users (open_id, email, name, role)
    VALUES ('admin-owner-verified', 'admin@khobartech.com', 'مدير النظام (Admin)', 'owner')
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      role = 'owner',
      updated_at = NOW();
  `);

  // Insert Site Settings: Hero, Contact, Stats, Partners
  const heroSetting = {
    ar: {
      eyebrow: "تكنولوجيا الخبر للاستشارات التقنية",
      title: "حلول تقنية تناسب طريقة عمل مؤسستك",
      body: "نصمم ونطوّر ونربط الحلول التقنية للشركات والجهات في السعودية، من أنظمة تخطيط موارد المؤسسة والمنصات المخصصة إلى الذكاء الاصطناعي والأمن السيبراني والمواقع والتطبيقات، مع دعم مستمر بعد الإطلاق.",
      primary: "استكشف خدماتنا",
      secondary: "تحدث مع خبرائنا"
    },
    en: {
      eyebrow: "Khobar Tech — Technology Consulting",
      title: "Technology Solutions That Fit How Your Business Works",
      body: "We design, build, and integrate technology solutions for companies and institutions in Saudi Arabia — from ERP systems and custom platforms to AI, cybersecurity, websites, and applications, with ongoing support after launch.",
      primary: "Explore services",
      secondary: "Talk to our experts"
    }
  };

  const contactSetting = {
    email: "info@khobartech.com",
    phone: "+966 13 800 0000",
    whatsapp: "+966 50 000 0000",
    crNumber: "2051248900",
    vatNumber: "310123456700003",
    addressAr: "طريق الملك فيصل، الخبر، المنطقة الشرقية، المملكة العربية السعودية",
    addressEn: "King Faisal Road, Al Khobar, Eastern Province, Kingdom of Saudi Arabia",
    workingHoursAr: "الأحد – الخميس (8:00 ص – 6:00 م)",
    workingHoursEn: "Sun – Thu (8:00 AM – 6:00 PM)"
  };

  const statsSetting = [
    { num: "+150", labelAr: "مشروع منجز بالمملكة", labelEn: "Delivered Projects in KSA" },
    { num: "+15", labelAr: "سنة خبرة هندسية", labelEn: "Years Engineering Expertise" },
    { num: "+50", labelAr: "عميل في القطاعين العام والخاص", labelEn: "Enterprise & Gov Clients" },
    { num: "24/7", labelAr: "دعم فني وتشغيلي مستمر", labelEn: "24/7 Continuous Support" }
  ];

  await sql.query(
    `INSERT INTO site_settings (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();`,
    ["home.hero", JSON.stringify(heroSetting)]
  );

  await sql.query(
    `INSERT INTO site_settings (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();`,
    ["company.contact", JSON.stringify(contactSetting)]
  );

  await sql.query(
    `INSERT INTO site_settings (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();`,
    ["home.stats", JSON.stringify(statsSetting)]
  );

  // Seed Services
  const services = [
    {
      type: "service",
      category: "enterprise-systems",
      slug: "erp-solutions",
      titleAr: "أنظمة تخطيط موارد المؤسسات (ERP)",
      titleEn: "Enterprise Resource Planning (ERP)",
      excerptAr: "تطبيق وتخصيص أنظمة ERP وأودو وSAP لربط سلاسل الإمداد، المخازن، والمالية في منصة موحدة.",
      excerptEn: "Implementation and customization of ERP, Odoo, and SAP systems linking supply chain, inventory, and finance.",
      bodyAr: "نساعد الشركات السعودية على توحيد عملياتها المحاسبية والمخزنية وسلاسل الإمداد ضمن نظام ERP مركزي عالي الكفاءة، مع ربط إلكتروني مباشر مع المرحلة الثانية لهيئة الزكاة والضريبة والجمارك (ZATCA).",
      bodyEn: "We empower Saudi enterprises to unify accounting, inventory, and supply chain operations into a centralized, high-performance ERP system with native ZATCA Phase 2 e-invoicing compliance.",
      displayOrder: 1,
    },
    {
      type: "service",
      category: "cloud-infrastructure",
      slug: "cloud-data-centers",
      titleAr: "البنية السحابية ومراكز البيانات المحلية",
      titleEn: "Cloud Infrastructure & Sovereign Data Centers",
      excerptAr: "تصميم وإدارة بنية سحابية هجينة ومحلية داخل مراكز البيانات المعتمدة في المملكة العربية السعودية.",
      excerptEn: "Architecture and management of sovereign hybrid cloud environments within certified Saudi data centers.",
      bodyAr: "استشارات وبناء بيئات سحابية على AWS، Azure، وGoogle Cloud ومراكز البيانات السعودية المتوافقة كلياً مع نظام حماية البيانات الشخصية (PDPL) وضوابط هيئة الاتصالات والفضاء والتقنية.",
      bodyEn: "End-to-end cloud infrastructure engineering on AWS, Azure, Google Cloud, and compliant Saudi cloud zones adhering to PDPL and CST standards.",
      displayOrder: 2,
    },
    {
      type: "service",
      category: "ai-automation",
      slug: "ai-process-automation",
      titleAr: "الذكاء الاصطناعي وأتمتة العمليات (RPA)",
      titleEn: "AI & Robotic Process Automation (RPA)",
      excerptAr: "بناء نماذج ذكاء اصطناعي وأتمتة الإجراءات المتكررة لرفع الكفاءة التشغيلية بنسبة تتجاوز 40%.",
      excerptEn: "Deploying enterprise machine learning and RPA to automate workflows and elevate operational efficiency by 40%+.",
      bodyAr: "تطوير روبوتات المحادثة للمؤسسات، نماذج التنبؤ بالطلب والمخزون، وتحليل الوثائق والمستندات الذكي المدعوم بالذكاء الاصطناعي التوليدي والتعلم الآلي.",
      bodyEn: "Enterprise conversational AI, predictive demand forecasting, and intelligent document parsing powered by modern GenAI and ML pipelines.",
      displayOrder: 3,
    },
    {
      type: "service",
      category: "cybersecurity",
      slug: "cybersecurity-governance",
      titleAr: "الأمن السيبراني والامتثال وضوابط NCA",
      titleEn: "Cybersecurity, Governance & NCA Compliance",
      excerptAr: "تقييم الثغرات، اختبار الاختراق، وتطبيق ضوابط الهيئة الوطنية للأمن السيبراني (ECC & CCC).",
      excerptEn: "Vulnerability assessments, penetration testing, and implementation of NCA controls (ECC & CCC).",
      bodyAr: "خدمات أمنية شاملة تشمل إدارة مراكز العمليات الأمنية (SOC)، الاستجابة للحوادث السيبرانية، ومواءمة البنية التحتية مع متطلبات الهيئة الوطنية للأمن السيبراني لحماية الأصول الرقمية.",
      bodyEn: "Comprehensive security services including SOC management, incident response, and rigorous alignment with National Cybersecurity Authority controls.",
      displayOrder: 4,
    },
    {
      type: "service",
      category: "custom-software",
      slug: "custom-software-engineering",
      titleAr: "تطوير المنصات والبرمجيات المخصصة",
      titleEn: "Custom Software & Digital Platforms",
      excerptAr: "هندسة وتطوير بوابات رقمية وتطبيقات جوال سحابية فائقة السرعة والأمان مصممة لاحتياجاتك بدقة.",
      excerptEn: "Engineering custom web platforms and high-performance mobile apps built specifically for your business model.",
      bodyAr: "بناء تطبيقات الويب والجوال عبر أحدث أطر العمل (React, Flutter, Next.js, Node.js) مع هندسة برمجية قابلة للتوسع ومصممة لملايين المستخدمين والمعاملات اليومية.",
      bodyEn: "Modern web and mobile application engineering using React, Flutter, Next.js, and Node.js with scalable microservices capable of handling millions of interactions.",
      displayOrder: 5,
    },
    {
      type: "service",
      category: "technical-consulting",
      slug: "digital-transformation-advisory",
      titleAr: "الاستشارات التقنية واستراتيجية التحول الرقمي",
      titleEn: "Digital Transformation & Technology Advisory",
      excerptAr: "وضع خارطة طريق رقمية واضحة تضمن الاستثمار الأمثل في التكنولوجيا ومواءمة رؤية 2030.",
      excerptEn: "Strategic digital roadmaps ensuring optimal IT investment aligned with Saudi Vision 2030 goals.",
      bodyAr: "مساعدة قيادات الشركات ومجالس الإدارة في تدقيق الوضع الراهن للأنظمة، واختيار الحلول التقنية الملائمة، وإدارة مخاطر التغيير لضمان تحقيق عوائد استثمارية واضحة وملموسة.",
      bodyEn: "Guiding enterprise C-levels through tech audit, solution evaluation, and digital change management for guaranteed business ROI.",
      displayOrder: 6,
    },
  ];

  for (const s of services) {
    await sql.query(
      `INSERT INTO content_items
        (type, category, slug, title_ar, title_en, excerpt_ar, excerpt_en, body_ar, body_en, status, display_order, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'published', $10, NOW())
       ON CONFLICT (slug) DO UPDATE SET
         title_ar = EXCLUDED.title_ar,
         title_en = EXCLUDED.title_en,
         excerpt_ar = EXCLUDED.excerpt_ar,
         excerpt_en = EXCLUDED.excerpt_en,
         body_ar = EXCLUDED.body_ar,
         body_en = EXCLUDED.body_en,
         status = 'published',
         updated_at = NOW();`,
      [
        s.type,
        s.category,
        s.slug,
        s.titleAr,
        s.titleEn,
        s.excerptAr,
        s.excerptEn,
        s.bodyAr,
        s.bodyEn,
        s.displayOrder,
      ]
    );
  }

  // Seed Products
  const products = [
    {
      slug: "zatca-phase2-gateway",
      titleAr: "بوابة الربط والفوترة الإلكترونية (ZATCA Gateway)",
      titleEn: "ZATCA Phase 2 E-Invoicing Gateway",
      excerptAr: "محرك ربط فوري ومعتمد مع هيئة الزكاة والضريبة والجمارك لإصدار وتوقيع الفواتير الضريبية آلياً.",
      excerptEn: "Certified API integration gateway for real-time clearance and compliance with ZATCA Phase 2.",
      bodyAr: "منظومة سحابية متكاملة تقوم بتوليد كود التشفير والتوقيع الرقمي (Cryptographic Stamp) وQR Code والتكامل المباشر مع منصة فاتورة عبر واجهات برمجة التطبيقات (APIs) دون الحاجة لتغيير نظامك الحالي.",
      bodyEn: "Comprehensive cloud middleware generating cryptographic stamps, digital signatures, and dynamic QR codes with seamless API sync to the FATOORA portal.",
      displayOrder: 1,
    },
    {
      slug: "smart-warehouse-wms",
      titleAr: "نظام إدارة المستودعات الذكي (Khobar WMS)",
      titleEn: "Khobar Smart Warehouse System (WMS)",
      excerptAr: "أتمتة الجرد، تتبع الشحنات بالباركود وRFID، وتسريع دورات التحضير والشحن بنسبة 50%.",
      excerptEn: "Automated inventory, barcode/RFID tracking, and 50% faster dispatch cycles for logistics hubs.",
      bodyAr: "نظام مستودعات متطور مصمم خصيصاً لمستودعات المنطقة الشرقية والموانئ والمناطق اللوجستية بالمملكة، يدعم العمل بدون اتصال بالإنترنت والمزامنة اللحظية مع أنظمة ERP.",
      bodyEn: "Modern logistics software designed for Saudi distribution hubs, supporting offline operations and instant synchronization with enterprise ERPs.",
      displayOrder: 2,
    },
    {
      slug: "omnichannel-pos",
      titleAr: "منظومة نقاط البيع السحابية (Enterprise POS)",
      titleEn: "Omnichannel Cloud POS Engine",
      excerptAr: "إدارة الفروع والمبيعات والمخزون في الوقت الفعلي مع توافق كامل مع الفوترة والمدفوعات الإلكترونية.",
      excerptEn: "Real-time branch, inventory, and sales management with full payment gateway & fiscal compliance.",
      bodyAr: "منصة نقاط بيع سحابية للمتاجر وسلاسل التجزئة والمطاعم، تعمل على جميع الأجهزة اللوحية والمحمولة، وتوفر تقارير أداء لحظية للأرباح والمخزون.",
      bodyEn: "Cloud POS platform engineered for retail chains and hospitality, running across web and mobile tablets with live profit analytics.",
      displayOrder: 3,
    },
  ];

  for (const p of products) {
    await sql.query(
      `INSERT INTO content_items
        (type, category, slug, title_ar, title_en, excerpt_ar, excerpt_en, body_ar, body_en, status, display_order, published_at)
       VALUES ('product', 'platforms', $1, $2, $3, $4, $5, $6, $7, 'published', $8, NOW())
       ON CONFLICT (slug) DO UPDATE SET
         title_ar = EXCLUDED.title_ar,
         title_en = EXCLUDED.title_en,
         excerpt_ar = EXCLUDED.excerpt_ar,
         excerpt_en = EXCLUDED.excerpt_en,
         body_ar = EXCLUDED.body_ar,
         body_en = EXCLUDED.body_en,
         status = 'published',
         updated_at = NOW();`,
      [
        p.slug,
        p.titleAr,
        p.titleEn,
        p.excerptAr,
        p.excerptEn,
        p.bodyAr,
        p.bodyEn,
        p.displayOrder,
      ]
    );
  }

  // Seed Blog Posts
  const posts = [
    {
      slug: "zatca-phase-2-readiness",
      titleAr: "دليل الجاهزية للربط مع المرحلة الثانية من الفوترة الإلكترونية (زاتكا)",
      titleEn: "Comprehensive Guide to ZATCA Phase 2 E-Invoicing Readiness",
      excerptAr: "كل ما تحتاج معرفته حول الربط والتكامل الفني، التوقيع الرقمي، ومتطلبات الامتثال الضريبي.",
      excerptEn: "Essential guide to technical integration, digital signing, and regulatory compliance under ZATCA Phase 2.",
      bodyAr: "تعد المرحلة الثانية من الفوترة الإلكترونية خطوة استراتيجية في مسيرة التحول الرقمي بالمملكة. في هذا الدليل، نلخص أهم المتطلبات البرمجية للتكامل مع منصة فاتورة، وكيفية تجنب الأخطاء الشائعة في توليد كود التشفير.",
      bodyEn: "ZATCA Phase 2 represents a major milestone in Saudi Arabia's digital economic roadmap. Here is the technical breakdown of API requirements and cryptographic stamp validation.",
    },
    {
      slug: "nca-ecc-cybersecurity-guide",
      titleAr: "كيف تضمن امتثال بيئتك السحابية لضوابط الهيئة الوطنية للأمن السيبراني (NCA)",
      titleEn: "Achieving Sovereign Cloud Compliance with NCA Guidelines in KSA",
      excerptAr: "خطة عمل عملية لتطبيق ضوابط الأمن السيبراني الأساسية وحماية البيانات في المنشآت السعودية.",
      excerptEn: "Practical roadmap for implementing Essential Cybersecurity Controls (ECC) for Saudi enterprises.",
      bodyAr: "أصبح الالتزام بضوابط الهيئة الوطنية للأمن السيبراني متطلباً حاسماً للدخول في المناقصات الحكومية والتعامل مع كبرى الشركات. نستعرض هنا أهم السياسات وإجراءات الحماية الواجب اتباعها.",
      bodyEn: "Complying with NCA standards is now an absolute prerequisite for national tenders and enterprise deals. Learn how to secure your digital assets.",
    },
    {
      slug: "enterprise-erp-transformation",
      titleAr: "استبدال أنظمة ERP القديمة: كيف تقود التحول دون إيقاف العمليات اليومية؟",
      titleEn: "Modernizing Legacy ERP Systems Without Operational Disruption",
      excerptAr: "استراتيجيات ترحيل البيانات وتدريب فرق العمل وضمان الانتقال السلس لمنظومة سحابية متطورة.",
      excerptEn: "Strategies for data migration, staff enablement, and seamless transition to cloud ERP architectures.",
      bodyAr: "تحتاج الشركات النامية إلى أنظمة تتوسع معها. نوضح في هذا المقال خطوات التخطيط لمشروع استبدال الـ ERP واختيار النموذج الأمثل بين أودو وSAP والأنظمة المخصصة.",
      bodyEn: "Growing companies need systems that scale. We explain step-by-step how to plan an ERP migration while mitigating operational risk.",
    },
  ];

  for (const post of posts) {
    await sql.query(
      `INSERT INTO content_items
        (type, category, slug, title_ar, title_en, excerpt_ar, excerpt_en, body_ar, body_en, status, display_order, published_at)
       VALUES ('post', 'insights', $1, $2, $3, $4, $5, $6, $7, 'published', 1, NOW())
       ON CONFLICT (slug) DO UPDATE SET
         title_ar = EXCLUDED.title_ar,
         title_en = EXCLUDED.title_en,
         excerpt_ar = EXCLUDED.excerpt_ar,
         excerpt_en = EXCLUDED.excerpt_en,
         body_ar = EXCLUDED.body_ar,
         body_en = EXCLUDED.body_en,
         status = 'published',
         updated_at = NOW();`,
      [
        post.slug,
        post.titleAr,
        post.titleEn,
        post.excerptAr,
        post.excerptEn,
        post.bodyAr,
        post.bodyEn,
      ]
    );
  }

  console.log("Seeding completed successfully into Neon PostgreSQL!");
}

init().catch((err) => {
  console.error("Init failed:", err);
  process.exit(1);
});
