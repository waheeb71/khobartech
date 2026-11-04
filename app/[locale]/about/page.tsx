import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpLeft, ShieldCheck, Zap, Users, Target } from "lucide-react";
import { PhotoFrame } from "@/components/PhotoFrame";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/lib/catalog";
import { copy, isLocale, localeHref } from "@/lib/i18n";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/about",
    title: locale === "ar" ? "عن تكنولوجيا الخبر | شركاؤك في التحول الرقمي" : "About Khobar Tech | Digital Transformation Partners",
    description:
      locale === "ar"
        ? "تعرف على تكنولوجيا الخبر: بيت خبرة تقني سعودي متخصص في تطوير وتكامل الأنظمة المؤسسية وحلول الذكاء الاصطناعي والأمن السيبراني."
        : "Learn about Khobar Tech: A Saudi technology powerhouse specialized in enterprise systems, AI solutions, and cybersecurity.",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];

  const values = l === "ar"
    ? [
        { icon: Target, title: "فهم العمل أولاً", desc: "نبدأ بدراسة عملياتك الحالية والتحديات والفرص الحقيقية قبل اقتراح أي أداة تقنية." },
        { icon: Zap, title: "بناء للمستقبل", desc: "قرارات معمارية وهندسية مرنة تضمن سرعة الاستجابة لمتطلبات اليوم وقابلية التوسع غداً." },
        { icon: ShieldCheck, title: "أمان وموثوقية", desc: "نضع الأمن السيبراني والامتثال للمعايير السعودية في صلب كل نظام نبنيه ونديره." },
        { icon: Users, title: "شراكة ممتدة", desc: "لا تنتهي مهمتنا عند الإطلاق؛ نرافق فريقك بالتدريب والدعم المستمر لضمان أعلى عائد استثماري." },
      ]
    : [
        { icon: Target, title: "Business-First", desc: "We analyze your operations, pain points, and genuine opportunities before choosing tech." },
        { icon: Zap, title: "Built for Tomorrow", desc: "Architectural decisions that balance present speed with long-term scalability." },
        { icon: ShieldCheck, title: "Security & Trust", desc: "Enterprise cybersecurity and Saudi regulatory compliance at the core of everything." },
        { icon: Users, title: "Long-Term Partnership", desc: "Our journey doesn't end at deployment; we provide ongoing training and dedicated support." },
      ];

  const stats = l === "ar"
    ? [
        ["+150", "مشروع ناجح تم إنجازه"],
        ["+15", "عاماً من الخبرة التقنية"],
        ["+50", "شريك وعميل في المملكة"],
        ["100%", "التزام بالمعايير والامتثال المحلي"],
      ]
    : [
        ["+150", "Successful projects delivered"],
        ["+15", "Years of technology expertise"],
        ["+50", "Enterprise clients in KSA"],
        ["100%", "Saudi compliance & local standards"],
      ];

  return (
    <>
      <JsonLd data={organizationJsonLd(l)} />

      {/* Hero Header */}
      <section className="page-hero-banner">
        <div className="page-hero-bg">
          <PhotoFrame
            src="/hero.jpg"
            alt={l === "ar" ? "خلفية عن تكنولوجيا الخبر" : "About Khobar Tech background"}
            className="absolute inset-0 h-full w-full"
            priority
            sizes="100vw"
            objectPosition="center 30%"
          />
        </div>
        <div className="hero-bg-glow" />
        <div className="shell relative z-10 reveal">
          <p className="eyebrow">{l === "ar" ? "عن تكنولوجيا الخبر" : "About Khobar Tech"}</p>
          <h1 className="heading mt-4 text-4xl sm:text-6xl max-w-4xl">
            {l === "ar"
              ? "نبتكر الحلول التقنية التي تمكّن المؤسسات وتدعم مسيرتها."
              : "Engineering technology solutions that empower enterprises to excel."}
          </h1>
          <p className="lede mt-6 max-w-3xl text-slate-300">
            {l === "ar"
              ? "تكنولوجيا الخبر هي شركة استشارات وحلول تقنية متخصصة في المملكة العربية السعودية. نجمع بين الخبرة العميقة في أنظمة ERP، الذكاء الاصطناعي، الأمن السيبراني، والتطوير البرمجي لتقديم بيئات عمل رقمية موحدة وعالية الكفاءة."
              : "Khobar Tech is a specialized technology consulting and solutions company in Saudi Arabia. We combine deep expertise in ERP, AI, cybersecurity, and software engineering to deliver unified, high-performing digital environments."}
          </p>
        </div>
      </section>

      {/* Story & Image */}
      <section className="py-16 sm:py-24 bg-[#080f1e] border-t border-white/10">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="reveal">
            <span className="text-xs font-bold text-cyan uppercase tracking-wider">
              {l === "ar" ? "رؤيتنا ورسالتنا" : "Our Vision & Mission"}
            </span>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {l === "ar"
                ? "التقنية يجب أن تُصمم حول طريقة عملك، وليس العكس."
                : "Technology should fit your business, not the other way around."}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              {l === "ar"
                ? "تعتمد المؤسسات الحديثة على منظومة معقدة من البيانات، العمليات، والتطبيقات. مهمتنا في تكنولوجيا الخبر هي فك هذا التعقيد وربط هذه المكونات في منصة سلسة ومترابطة تعزز اتخاذ القرار وتضاعف الإنتاجية."
                : "Modern enterprises rely on a complex ecosystem of data, workflows, and applications. At Khobar Tech, our mission is to simplify this complexity and unify these parts into a seamless, high-yield digital platform."}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 reveal-stagger">
              {stats.map(([num, label]) => (
                <div key={label} className="p-3">
                  <div className="text-2xl sm:text-3xl font-black text-cyan">{num}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal-scale">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan/20 to-blue/20 rounded-3xl blur-xl" />
            <PhotoFrame
              src="/images/redesign/hero-team.webp"
              alt={l === "ar" ? "فريق عمل تكنولوجيا الخبر" : "Khobar Tech engineering team"}
              className="relative aspect-[4/3] rounded-2xl border border-white/10 shadow-2xl"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section className="py-16 sm:py-24 bg-[#0f1f3d] border-t border-white/10">
        <div className="shell">
          <div className="max-w-2xl reveal">
            <p className="eyebrow">{l === "ar" ? "مبادئنا الأساسية" : "Core Principles"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {l === "ar" ? "المعايير التي توجه كل قرار نتخذه" : "The standards guiding every decision"}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
            {values.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0b1628]/80 p-6 sm:p-8 backdrop-blur-md hover:border-cyan/30 transition duration-300"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan border border-cyan/20 mb-6">
                  <Icon size={24} />
                </span>
                <span className="text-xs font-black text-cyan/60">0{idx + 1}</span>
                <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>
              {l === "ar" ? "لنبدأ العمل معاً" : "Start Collaboration"}
            </p>
            <h2>{l === "ar" ? "جاهزون لتمكين مؤسستك بأحدث الحلول التقنية." : "Ready to empower your business with modern tech."}</h2>
            <p>{l === "ar" ? "احجز جلسة استشارية أولية مع مهندسينا لمناقشة أهدافك التقنية." : "Book a discovery call with our solutions engineers to discuss your goals."}</p>
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

