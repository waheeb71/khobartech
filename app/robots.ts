import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots { const sitemap = absoluteUrl("/sitemap.xml"); return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] }, sitemap }; }
