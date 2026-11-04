import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ContentStudio } from "@/components/ContentStudio";
import { getSession } from "@/lib/auth";
import { getAdminStudioData } from "@/lib/db";

export const metadata = {
  robots: { index: false, follow: false },
  title: "لوحة تحكم المحتوى | Najah Code CMS",
};

export default async function AdminPage() {
  const user = await getSession();
  const secretPath = process.env.ADMIN_SECRET_PATH || "/cp-najah-9x7q2m8k";
  if (!user || (user.role !== "owner" && user.role !== "editor")) {
    redirect(`${secretPath}/login`);
  }

  const initialData = await getAdminStudioData();

  return (
    <main className="min-h-screen bg-mist">
      <header className="border-b border-slate-200 bg-white">
        <div className="shell flex h-20 items-center justify-between">
          <Logo locale="ar" />
          <div className="text-left text-xs text-slate-500">
            <strong className="block text-sm text-navy">{user.name || user.email}</strong>
            <span className="font-semibold text-royal uppercase">{user.role}</span>
          </div>
        </div>
      </header>
      <div className="shell py-8 sm:py-12">
        <p className="eyebrow">لوحة الإدارة</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-.05em]">محتوى الموقع</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          إدارة المحتوى العربي والإنجليزي، المسودات والنشر، صور الوسائط، إعدادات SEO، والاستفسارات وسجل التغييرات.
        </p>
        <div className="mt-8">
          <ContentStudio role={user.role} initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
