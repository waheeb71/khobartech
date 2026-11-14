import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/catalog";
import { serviceGroups, solutions, blogTopics } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { homeImage, servicePhotos, getBlogImage } from "@/lib/media";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";
import { getSetting, getPublishedContent } from "@/lib/db";
import { PhotoFrame } from "@/components/PhotoFrame";
import { JsonLd } from "@/components/JsonLd";
import { TechPartners } from "@/components/TechPartners";
import { SectorsGrid } from "@/components/SectorsGrid";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TrustCertifications } from "@/components/TrustCertifications";
import { ProjectCostEstimator } from "@/components/ProjectCostEstimator";
import { SaudiProjectsMap } from "@/components/SaudiProjectsMap";
import { RfpSubmissionModal } from "@/components/RfpSubmissionModal";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const ar = locale === "ar";
  return pageMetadata({
    locale,
    path: "",
    title: ar
      ? "حلول تقنية تناسب طريقة عمل مؤسستك | تكنولوجيا الخبر"
      : "Technology Solutions That Fit How Your Business Works | Khobar Tech",
    description: ar
      ? "تكنولوجيا الخبر شركة تقنية تبني أنظمة مؤسسية وتطبيقات وحلول ذكاء اصطناعي وأمن سيبراني للشركات في المملكة العربية السعودية."
      : "Khobar Tech builds enterprise systems, applications, AI solutions, and cybersecurity for businesses in Saudi Arabia.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];

  const [hero, dbServices, dbPosts, dbStats] = await Promise.all([
    getSetting("home.hero", {
      ar: {
        eyebrow: copy.ar.hero.eyebrow,
        title: copy.ar.hero.title,
        body: copy.ar.hero.body,
      },
      en: {
        eyebrow: copy.en.hero.eyebrow,
        title: copy.en.hero.title,
        body: copy.en.hero.body,
      },
    }),
    getPublishedContent("service"),
    getPublishedContent("post"),
    getSetting("home.stats", null as any),
  ]);

  const proof =
    l === "ar"
      ? ["أنظمة مؤسسية وERP", "تطبيقات وحلول رقمية", "ذكاء اصطناعي وأتمتة", "أمن سيبراني"]
      : ["Enterprise Systems & ERP", "Applications & Digital Solutions", "AI & Automation", "Cybersecurity"];

  const stats =
    dbStats && Array.isArray(dbStats) && dbStats.length > 0
      ? dbStats.map((s: any) => [s.num, l === "ar" ? s.labelAr : s.labelEn])
      : l === "ar"
      ? [
          ["+150", "مشروع منجز"],
          ["+15", "سنة خبرة"],
          ["+50", "عميل في السعودية"],
          ["24/7", "دعم مستمر"],
        ]
      : [
          ["+150", "Projects delivered"],
          ["+15", "Years of expertise"],
          ["+50", "Clients in Saudi Arabia"],
          ["24/7", "Ongoing support"],
        ];

  const process =
    l === "ar"
      ? [
          ["01", "نفهم العمل أولاً", "نبدأ بالهدف والعقبات الحالية، لا بمجرد اختيار أداة."],
          ["02", "نرسم الحل المناسب", "نحدد النطاق والبيانات والتكاملات قبل بناء الواجهة."],
          ["03", "نبني ونختبر", "نطوّر على مراحل ونراجع الاستخدام والأمان والأداء."],
          ["04", "نطلق ونتابع", "نساعد فريقك على التشغيل والتحسين بعد الإطلاق."],
        ]
      : [
          ["01", "Understand the work", "Start with the goal and current friction—not a tool choice."],
          ["02", "Shape the right solution", "Define scope, data, and integrations before the interface."],
          ["03", "Build and review", "Deliver in stages, reviewing usability, security, and performance."],
          ["04", "Launch and support", "Help your team operate and improve the solution after launch."],
        ];

  return (
    <>
      <JsonLd data={organizationJsonLd(l)} />

      {/* ============================
          HERO
      ============================*/}
      <section className="hero-section">
        {/* Background image */}
        <div className="hero-bg">
          <PhotoFrame
            src={(hero as any)?.image || (hero as any)?.[l]?.image || homeImage.src}
            alt={homeImage.alt[l]}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        {/* Glow overlay */}
        <div className="hero-bg-glow" />

        {/* Content */}
        <div className="shell hero-layout">
          <div className="hero-copy reveal">
            <p className="eyebrow">{hero[l].eyebrow}</p>
            <h1 className="hero-title">{hero[l].title}</h1>
            <p className="hero-description">{hero[l].body}</p>
            <div className="hero-actions flex-wrap">
              <Link className="btn-primary" href={localeHref(l, "/services")}>
                {t.hero.primary}
                <ArrowUpLeft size={17} />
              </Link>
              <Link className="btn-secondary" href={localeHref(l, "/contact")}>
                {t.hero.secondary}
              </Link>
              <RfpSubmissionModal locale={l} />
            </div>
            <div className="hero-proof">
              {proof.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <figure className="hero-visual reveal-scale">
            <span className="hero-visual-tag">
              {l === "ar" ? "تقنية مصممة حول عملك" : "Technology shaped around your work"}
            </span>
            <figcaption className="hero-caption">
              <div>
                <strong>
                  {l === "ar" ? "من الفكرة إلى نظام يعمل" : "From idea to working systems"}
                </strong>
                <span>
                  {l === "ar"
                    ? "هندسة رقمية مرتبطة باحتياج حقيقي"
                    : "Digital engineering grounded in real needs"}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-white"
              >
                {l === "ar" ? <ArrowUpLeft size={18} /> : <ArrowUpRight size={18} />}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Stats bar */}
        <div className="hero-stats">
          <div className="shell grid grid-cols-2 gap-6 py-7 md:grid-cols-4 reveal-stagger">
            {stats.map(([num, label]) => (
              <div key={label} className="text-center">
                <div
                  className="text-2xl font-black"
                  style={{ color: "#00d4e8" }}
                >
                  {num}
                </div>
                <div
                  className="mt-1 text-xs font-semibold"
                  style={{ color: "#8ba0be" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          TECH ECOSYSTEM & COMPLIANCE
      ============================*/}
      <TechPartners locale={l} />

      {/* ============================
          TRUST & SAUDI CERTIFICATIONS (ZATCA, NCA, ISO)
      ============================*/}
      <TrustCertifications locale={l} />

      {/* ============================
          QUOTE (MBS)
      ============================*/}
      <section
        className="quote-section section"
        style={{ background: "#080f1e" }}
        aria-label={l === "ar" ? "اقتباس ولي العهد" : "Crown Prince quote"}
      >
        <div className="shell quote-layout">
          <div className="reveal">
            <blockquote className="quote-text">
              {l === "ar"
                ? "«نحن نعيش في زمن الابتكارات العلمية والتقنيات غير المسبوقة وآفاق نمو غير محدودة»"
                : '"We are living in an era of unprecedented scientific innovations, unparalleled technologies, and limitless growth horizons."'}
            </blockquote>
            <div className="quote-author">
              <div className="quote-author-name">
                {l === "ar"
                  ? "صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز آل سعود"
                  : "His Royal Highness Prince Mohammed bin Salman bin Abdulaziz Al Saud"}
              </div>
              <div className="quote-author-title">
                {l === "ar" ? "ولي العهد رئيس مجلس الوزراء" : "Crown Prince, Prime Minister"}
              </div>
            </div>
          </div>
          <div className="quote-image reveal-scale">
            <PhotoFrame
              src="/images/redesign/consulting-team.webp"
              alt={
                l === "ar"
                  ? "صورة ولي العهد الأمير محمد بن سلمان"
                  : "Crown Prince Mohammed bin Salman"
              }
              className="h-full w-full"
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ============================
          SERVICES
      ============================*/}
      <section
        className="section"
        aria-labelledby="services-title"
        style={{ background: "#0b1628" }}
      >
        <div className="shell">
          <div className="section-heading-row reveal">
            <div className="section-heading-copy">
              <p className="eyebrow">{l === "ar" ? "الخدمات" : "Services"}</p>
              <h2 id="services-title" className="heading section-heading-title">
                {t.sections.services}
              </h2>
              <p className="section-heading-lead">{t.sections.servicesLead}</p>
            </div>
            <Link className="text-link" href={localeHref(l, "/services")}>
              {t.common.allServices}
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          <div className="service-grid reveal-stagger">
            {(dbServices && dbServices.length > 0
              ? dbServices.slice(0, 4).map((service, index) => {
                  const imageSrc =
                    service.imageKey ||
                    (service.category && servicePhotos[service.category]?.src) ||
                    servicePhotos.enterprise?.src ||
                    homeImage.src;
                  const displayNum = Math.min(dbServices.length, 4) - index;
                  return (
                    <Link
                      key={service.slug}
                      href={localeHref(l, `/services/${service.category || "enterprise-systems"}`)}
                      className="service-card group"
                    >
                      <div className="service-card-image">
                        <PhotoFrame
                          src={imageSrc}
                          alt={l === "ar" ? service.titleAr : service.titleEn}
                          className="h-full w-full"
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 100vw"
                        />
                      </div>
                      <div className="service-card-meta">
                        <span className="service-card-num">
                          {String(displayNum).padStart(2, "0")}
                        </span>
                        <h3 className="service-card-title">{l === "ar" ? service.titleAr : service.titleEn}</h3>
                        <p className="service-card-description">
                          {l === "ar" ? service.excerptAr || service.bodyAr : service.excerptEn || service.bodyEn}
                        </p>
                      </div>
                    </Link>
                  );
                })
              : serviceGroups.slice(0, 4).map((group, index) => {
                  const image = servicePhotos[group.slug];
                  const displayNum = serviceGroups.slice(0, 4).length - index;
                  return (
                    <Link
                      key={group.slug}
                      href={localeHref(l, `/services/${group.slug}`)}
                      className="service-card group"
                    >
                      <div className="service-card-image">
                        <PhotoFrame
                          src={image.src}
                          alt={image.alt[l]}
                          className="h-full w-full"
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 100vw"
                        />
                      </div>
                      <div className="service-card-meta">
                        <span className="service-card-num">
                          {String(displayNum).padStart(2, "0")}
                        </span>
                        <h3 className="service-card-title">{group.title[l]}</h3>
                        <p className="service-card-description">
                          {group.description[l]}
                        </p>
                      </div>
                    </Link>
                  );
                }))}
          </div>
        </div>
      </section>

      {/* ============================
          SOLUTIONS
      ============================*/}
      <section
        className="solution-section section"
        aria-labelledby="solutions-title"
        style={{ background: "#0f1f3d" }}
      >
        <div className="shell solution-layout">
          <div className="reveal">
            <p className="eyebrow" style={{ color: "#00d4e8" }}>
              {l === "ar" ? "حلول لأعمالك" : "Built around business"}
            </p>
            <h2 id="solutions-title" className="heading section-heading-title">
              {t.sections.solutions}
            </h2>
            <p className="section-heading-lead">{t.sections.solutionsLead}</p>
            <Link
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-8 transition hover:text-white"
              style={{ color: "#00d4e8", textDecorationColor: "#00d4e8" }}
              href={localeHref(l, "/solutions")}
            >
              {l === "ar" ? "اكتشف حلولنا" : "Explore our solutions"}
              <ArrowUpLeft size={16} />
            </Link>
          </div>
          <div className="solution-list reveal-stagger">
            {solutions.map((item, index) => (
              <article className="solution-item" key={item.en}>
                <span className="solution-item-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item[l]}</h3>
                <p>{l === "ar" ? item.detailAr : item.detailEn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          STRATEGIC SECTORS
      ============================*/}
      <SectorsGrid locale={l} />

      {/* ============================
          ENTERPRISE CASE STUDIES
      ============================*/}
      <CaseStudiesSection locale={l} />

      {/* ============================
          ABOUT / PROCESS
      ============================*/}
      <section
        className="section"
        aria-labelledby="process-title"
        style={{ background: "#080f1e" }}
      >
        <div className="shell story-layout">
          <PhotoFrame
            src="/images/redesign/consulting-team.webp"
            alt={
              l === "ar"
                ? "فريق يراجع مخططات وتقارير عمل حول طاولة اجتماع"
                : "A team reviewing work charts and reports around a meeting table"
            }
            className="story-image reveal-scale"
            sizes="(min-width: 1024px) 49vw, 100vw"
          />
          <div className="reveal">
            <p className="eyebrow">
              {l === "ar" ? "عن الشركة" : "About Khobar Tech"}
            </p>
            <h2 id="process-title" className="heading section-heading-title">
              {t.sections.why}
            </h2>
            <p className="section-heading-lead">{t.sections.whyLead}</p>
            <div className="process-list reveal-stagger">
              {process.map(([number, title, description]) => (
                <article key={number} className="process-step">
                  <span className="process-number">{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
            <ul
              className="principle-chips"
              aria-label={
                l === "ar"
                  ? "مبادئ تكنولوجيا الخبر"
                  : "Khobar Tech principles"
              }
            >
              {(l === "ar"
                ? [
                    "حلول مصممة لاحتياجك",
                    "بنية قابلة للتوسع",
                    "الأمن من البداية",
                    "دعم مستمر",
                  ]
                : [
                    "Purpose-built solutions",
                    "Scalable foundations",
                    "Security from day one",
                    "Ongoing support",
                  ]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href={localeHref(l, "/contact")}>
                {l === "ar" ? "تحدث مع خبرائنا" : "Talk to our experts"}
                <ArrowUpLeft size={16} />
              </Link>
              <Link className="btn-secondary" href={localeHref(l, "/about")}>
                {l === "ar" ? "استكشف قدراتنا" : "Explore our capabilities"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          PRODUCTS
      ============================*/}
      <section
        className="section"
        aria-labelledby="products-title"
        style={{ background: "#0b1628" }}
      >
        <div className="shell">
          <div className="product-feature reveal">
            <div className="product-feature-copy">
              <p className="eyebrow">
                {l === "ar" ? "منتجات تكنولوجيا الخبر" : "Khobar Tech products"}
              </p>
              <h2 id="products-title">{t.sections.products}</h2>
              <p>{t.sections.productsLead}</p>
              <Link
                className="text-link mt-7"
                href={localeHref(l, "/products")}
              >
                {l === "ar" ? "تعرّف على المنتجات" : "Explore products"}
                <ArrowUpLeft size={16} />
              </Link>
            </div>
            <PhotoFrame
              src="/images/redesign/saas-data-center.webp"
              alt={
                l === "ar"
                  ? "ممر مركز بيانات وخوادم يدعم منصات رقمية قابلة للنمو"
                  : "A data-centre aisle representing scalable digital platforms"
              }
              className="product-feature-image reveal-scale"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ============================
          CASE STUDIES & SUCCESS STORIES
      ============================*/}
      <CaseStudiesSection locale={l} />

      {/* ============================
          INTERACTIVE COST ESTIMATOR
      ============================*/}
      <ProjectCostEstimator locale={l} />

      {/* ============================
          SAUDI REGIONS MAP & COVERAGE
      ============================*/}
      <SaudiProjectsMap locale={l} />

      {/* ============================
          INSIGHTS
      ============================*/}
      <section
        className="section"
        aria-labelledby="insights-title"
        style={{ background: "#080f1e" }}
      >
        <div className="shell">
          <div className="section-heading-row reveal">
            <div className="section-heading-copy">
              <p className="eyebrow">
                {l === "ar" ? "رؤى تقنية" : "Technology insights"}
              </p>
              <h2 id="insights-title" className="heading section-heading-title">
                {t.sections.insights}
              </h2>
              <p className="section-heading-lead">{t.sections.insightsLead}</p>
            </div>
            <Link className="text-link" href={localeHref(l, "/blog")}>
              {l === "ar" ? "كل المقالات" : "All insights"}
              <ArrowUpLeft size={16} />
            </Link>
          </div>
          <div className="insight-grid reveal-stagger">
            {(dbPosts && dbPosts.length > 0 ? dbPosts.slice(0, 3) : blogTopics.slice(0, 3)).map((post: any) => {
              const fallbackImage = getBlogImage(post.slug);
              const imageSrc = post.imageKey || fallbackImage.src;
              const title = post.titleAr ? (l === "ar" ? post.titleAr : post.titleEn) : (l === "ar" ? post.ar : post.en);
              const category = post.category ? post.category : (l === "ar" ? post.categoryAr : post.categoryEn);
              return (
                <article key={post.slug} className="insight-card group">
                  <Link
                    href={localeHref(l, `/blog/${post.slug}`)}
                    aria-label={title}
                  >
                    <PhotoFrame
                      src={imageSrc}
                      alt={title || fallbackImage.alt[l]}
                      className="insight-image"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                  </Link>
                  <p className="insight-card-category">{category}</p>
                  <h3 className="insight-card-title">
                    <Link href={localeHref(l, `/blog/${post.slug}`)}>
                      {title}
                    </Link>
                  </h3>
                  <Link
                    className="insight-card-link"
                    href={localeHref(l, `/blog/${post.slug}`)}
                  >
                    {t.common.read}
                    <ArrowUpLeft size={14} className="inline" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          FINAL CTA
      ============================*/}
      <section className="final-cta" aria-labelledby="final-title">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "الخطوة القادمة" : "The next step"}
            </p>
            <h2 id="final-title">{t.sections.final}</h2>
            <p>{t.sections.finalLead}</p>
          </div>
          <Link className="btn-primary" href={localeHref(l, "/contact")}>
            {t.nav.start}
            <ArrowUpLeft size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}

