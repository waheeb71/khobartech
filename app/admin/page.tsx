import { redirect } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ContentStudio } from "@/components/ContentStudio";
import { getSession } from "@/lib/auth";
import { getAdminStudioData } from "@/lib/db";
import { ExternalLink, Database, LogOut, Shield } from "lucide-react";

export const metadata = {
  robots: { index: false, follow: false },
  title: "لوحة التحكم وإدارة المحتوى | تكنولوجيا الخبر",
};

export default async function AdminPage() {
  const user = await getSession();
  const secretPath = process.env.ADMIN_SECRET_PATH || "/admin";
  if (!user || (user.role !== "owner" && user.role !== "editor")) {
    redirect(`${secretPath}/login`);
  }

  const initialData = await getAdminStudioData();

  return (
    <main className="min-h-screen bg-[#070e1c] text-[#e8f0fe]">
      {/* Executive Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#091224]/90 backdrop-blur-md">
        <div className="shell flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo locale="ar" className="text-white" />
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Database className="h-3.5 w-3.5" />
              <span>{initialData.isLiveDb ? "متصل بقاعدة بيانات Neon PostgreSQL" : "الوضع المحلي (JSON Store)"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/ar"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan"
            >
              <span>معاينة الموقع المباشر</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-3 border-r border-white/10 pr-4">
              <div className="text-left text-xs">
                <strong className="block text-sm text-white">{user.name || user.email}</strong>
                <span className="inline-flex items-center gap-1 font-semibold text-cyan uppercase tracking-wider text-[10px]">
                  <Shield className="h-3 w-3" />
                  {user.role === "owner" ? "مالك النظام (Owner)" : "محرر (Editor)"}
                </span>
              </div>
              <Link
                href="/api/auth/logout"
                prefetch={false}
                title="تسجيل الخروج"
                className="grid h-9 w-9 place-items-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="shell py-8 sm:py-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-8">
          <div>
            <p className="eyebrow">لوحة الإدارة المركزية · Enterprise CMS</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              إدارة المحتوى وقواعد البيانات
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8ba0be]">
              تحكم كامل في كافة خدمات ومنتجات وحلول الموقع، ومتابعة الاستفسارات الواردة، وإعدادات الهوية الوطنية والتواصل المربوطة مباشرة بـ Neon PostgreSQL.
            </p>
          </div>
        </div>

        {/* The Broad Content Studio */}
        <ContentStudio role={user.role} initialData={initialData} />
      </div>
    </main>
  );
}
