import Image from "next/image";

const assetMap: Record<string, string> = {
  "services/enterprise/enterprise-operations-1600x1000.webp": "/images/redesign/enterprise-analytics.webp",
  "services/development/software-build-1600x1000.webp": "/images/redesign/development-collaboration.webp",
  "services/saas/cloud-platform-1600x1000.webp": "/images/redesign/saas-data-center.webp",
  "services/ai/ai-workflow-1600x1000.webp": "/images/redesign/ai-neural-network.webp",
  "services/cybersecurity/security-operations-1600x1000.webp": "/images/redesign/cybersecurity-analyst.webp",
  "services/marketing/growth-strategy-1600x1000.webp": "/images/redesign/marketing-analytics.webp",
  "services/infrastructure/platform-ops-1600x1000.webp": "/images/redesign/infrastructure-servers.webp",
  "services/consulting/transformation-roadmap-1600x1000.webp": "/images/redesign/consulting-team.webp",
  "about/team-and-technology-1600x1200.webp": "/images/redesign/hero-team.webp",
};

export function AssetPlaceholder({ asset, alt, className = "" }: { asset: string; alt: string; className?: string }) {
  const src = assetMap[asset] ?? (asset.startsWith("/") ? asset : "/images/redesign/hero-team.webp");
  return <div className={`photo-frame ${className}`}>
    <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 42vw, 100vw" quality={82} className="photo-image" />
  </div>;
}
