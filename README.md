# تكنولوجيا الخبر — Khobar Tech

> حلول تقنية متكاملة لتمكين الأعمال وتسريع النمو الرقمي.

موقع رسمي لشركة **تكنولوجيا الخبر** مبني بأحدث تقنيات الويب، يدعم العربية والإنجليزية مع تجربة مستخدم احترافية.

---

## 🚀 التقنيات المستخدمة

| التقنية | الوصف |
|---|---|
| [Next.js 15](https://nextjs.org/) | إطار العمل الرئيسي (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | لغة البرمجة |
| [Tailwind CSS](https://tailwindcss.com/) | التصميم والتنسيق |
| [Drizzle ORM](https://orm.drizzle.team/) | قاعدة البيانات |
| [next-intl](https://next-intl-docs.vercel.app/) | دعم اللغات (AR / EN) |

---

## 📦 الإعداد والتشغيل

### المتطلبات
- Node.js 18+
- pnpm

### خطوات التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/waheeb71/khobartech.git
cd khobartech

# تثبيت الحزم
pnpm install

# نسخ ملف البيئة
cp .env.example .env.local
# عدّل القيم في .env.local

# تشغيل بيئة التطوير
pnpm dev
```

الموقع سيعمل على: **http://localhost:3000**

---

## ⚙️ متغيرات البيئة

انسخ `.env.example` إلى `.env.local` وأضف القيم:

```env
JWT_SECRET=your_secret_here
ADMIN_PASSWORD=your_password_here
ADMIN_SECRET_PATH=your_secret_path
```

---

## 🌐 اللغات

| المسار | اللغة |
|---|---|
| `/ar` | العربية (الافتراضية) |
| `/en` | الإنجليزية |

---

## 🏗️ هيكل المشروع

```
khobartech/
├── app/                    # صفحات Next.js (App Router)
│   └── [locale]/           # صفحات متعددة اللغات
│       ├── page.tsx        # الصفحة الرئيسية
│       ├── about/          # عن الشركة
│       ├── services/       # الخدمات
│       ├── solutions/      # الحلول
│       ├── products/       # المنتجات
│       ├── blog/           # المدونة
│       └── contact/        # تواصل معنا
├── components/             # مكونات React القابلة لإعادة الاستخدام
├── lib/                    # الدوال المساعدة وقاعدة البيانات
├── data/                   # بيانات CMS المحلية
├── public/                 # الملفات الثابتة (صور، شعارات)
├── messages/               # ترجمات اللغات (AR/EN)
└── drizzle/                # مخطط قاعدة البيانات
```

---

## 🐳 Docker

```bash
docker build -t khobartech .
docker run -p 3000:3000 khobartech
```

---

## 📄 الترخيص

جميع الحقوق محفوظة © 2025 تكنولوجيا الخبر
