export function SectionHeading({ eyebrow, title, lead, align = "start" }: { eyebrow: string; title: string; lead?: string; align?: "start" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}><p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p><h2 className="heading mt-5">{title}</h2>{lead && <p className="lede mt-5">{lead}</p>}</div>;
}
