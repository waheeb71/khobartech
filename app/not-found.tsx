import Link from "next/link";
export const metadata = { robots: { index: false, follow: false }, title: "Page not found" };
export default function NotFound() { return <main className="grid min-h-screen place-items-center bg-mist p-6 text-center"><div><p className="text-sm font-bold text-royal">404</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] text-navy">الصفحة غير موجودة</h1><p className="mt-3 text-slate-600">The page you requested does not exist.</p><Link href="/ar" className="btn-primary mt-7">العودة للرئيسية</Link></div></main>; }
