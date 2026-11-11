"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "بيانات الدخول غير صحيحة.");
        setLoading(false);
        return;
      }

      window.location.assign(data.redirectUrl || "/");
    } catch {
      setError("حدث خطأ أثناء الاتصال بالخادم.");
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-mist p-6">
      <section className="w-full max-w-md border-t-4 border-navy bg-white p-7 shadow-line-soft sm:p-10">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-cyan">
            <ShieldCheck size={24} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan">
            تكنولوجيا الخبر · بوابة الإدارة الآمنة
          </span>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-royal">منطقة محظورة وآمنة</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-navy">تسجيل الدخول</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          هذه الصفحة مخصصة للمشرفين المعتمدين فقط. يرجى إدخال البريد الإلكتروني وكلمة المرور للمتابعة.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 border-s-4 border-red-600 bg-red-50 p-3.5 text-sm font-semibold text-red-800"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-navy">
            البريد الإلكتروني للمدير
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@khobartech.com"
                className="w-full border border-slate-300 ps-10 pe-3 py-2.5 text-sm outline-none focus:border-royal"
              />
            </div>
          </label>

          <label className="block text-sm font-semibold text-navy">
            كلمة المرور
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-slate-300 ps-10 pe-3 py-2.5 text-sm outline-none focus:border-royal"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 flex w-full items-center justify-center gap-2 py-3 text-sm font-bold"
          >
            {loading ? "جارٍ التحقق…" : "تسجيل الدخول الآمن"}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-5 text-center">
          <Link
            href="/ar"
            className="text-xs font-semibold text-slate-500 hover:text-royal hover:underline"
          >
            العودة إلى الموقع الرئيسي
          </Link>
        </div>
      </section>
    </main>
  );
}
