import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/catalog";

export function Logo({
  locale,
  compact = false,
  theme = "dark",
  className = "",
}: {
  locale: Locale;
  compact?: boolean;
  theme?: "dark" | "light";
  className?: string;
}) {
  const ar = locale === "ar";
  const logoSrc = theme === "light" ? "/logo-light.png" : "/logo-dark.png";

  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex items-center gap-2.5 transition-all duration-200 hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}
      style={{ outlineColor: "#00d4e8" }}
      aria-label={ar ? "تكنولوجيا الخبر، الصفحة الرئيسية" : "Khobar Tech, home"}
    >
      {compact ? (
        <Image
          src="/logo-icon.png"
          alt="Khobar Tech"
          width={44}
          height={32}
          priority
          className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <Image
          src={logoSrc}
          alt={ar ? "تكنولوجيا الخبر - Khobar Tech" : "Khobar Tech"}
          width={220}
          height={53}
          priority
          className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}
    </Link>
  );
}
