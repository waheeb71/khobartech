"use client";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/catalog";
import { copy } from "@/lib/i18n";
import { serviceGroups } from "@/lib/catalog";

const empty = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  description: "",
  website: "",
};

export function ContactForm({ locale }: { locale: Locale }) {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = copy[locale].form;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!response.ok) throw new Error();
      setForm(empty);
      setState("success");
    } catch {
      setState("error");
    }
  }

  const set = (key: keyof typeof empty) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((value) => ({ ...value, [key]: event.target.value }));

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition duration-200 focus:border-cyan focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan/20";

  return (
    <form onSubmit={submit} className="grid gap-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {t.name}
          <input
            required
            value={form.fullName}
            onChange={set("fullName")}
            placeholder={locale === "ar" ? "محمد أحمد" : "John Doe"}
            className={inputClasses}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {t.company}
          <input
            value={form.company}
            onChange={set("company")}
            placeholder={locale === "ar" ? "اسم الشركة أو المؤسسة" : "Company name"}
            className={inputClasses}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {t.email}
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="name@company.com"
            className={inputClasses}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {t.phone}
          <input
            value={form.phone}
            onChange={set("phone")}
            placeholder="+966 50 000 0000"
            className={inputClasses}
            dir="ltr"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {t.service}
          <select
            required
            value={form.service}
            onChange={set("service")}
            className={`${inputClasses} bg-[#0b1628]`}
          >
            <option value="" className="bg-[#0b1628] text-slate-300">
              {locale === "ar" ? "اختر الخدمة المطلوبة" : "Choose a service"}
            </option>
            {serviceGroups.map((group) => (
              <option key={group.slug} value={group.slug} className="bg-[#0b1628] text-white">
                {group.title[locale]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {t.budget}
          <select
            value={form.budget}
            onChange={set("budget")}
            className={`${inputClasses} bg-[#0b1628]`}
          >
            <option value="" className="bg-[#0b1628] text-slate-300">
              {locale === "ar" ? "غير محددة حالياً" : "Not defined yet"}
            </option>
            <option value="under-5k" className="bg-[#0b1628] text-white">
              {locale === "ar" ? "أقل من 20,000 ر.س" : "Under $5,000"}
            </option>
            <option value="5k-20k" className="bg-[#0b1628] text-white">
              {locale === "ar" ? "20,000 – 75,000 ر.س" : "$5,000 – $20,000"}
            </option>
            <option value="20k-50k" className="bg-[#0b1628] text-white">
              {locale === "ar" ? "75,000 – 180,000 ر.س" : "$20,000 – $50,000"}
            </option>
            <option value="50k-plus" className="bg-[#0b1628] text-white">
              {locale === "ar" ? "+180,000 ر.س" : "$50,000+"}
            </option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-slate-200">
        {t.description}
        <textarea
          required
          minLength={20}
          rows={5}
          value={form.description}
          onChange={set("description")}
          placeholder={
            locale === "ar"
              ? "اشرح لنا نبذة عن مشروعك، أهدافك، أو التحديات التقنية التي تواجهها..."
              : "Tell us about your project, goals, or technical requirements..."
          }
          className={`${inputClasses} resize-y`}
        />
      </label>

      {/* Honeypot field */}
      <label className="sr-only" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          disabled={state === "sending"}
          className="btn-primary min-w-[160px] disabled:cursor-wait disabled:opacity-70"
          type="submit"
        >
          {state === "sending" ? t.sending : t.submit}
        </button>
        {state === "success" && (
          <p role="status" className="rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 border border-emerald-500/20">
            {t.success}
          </p>
        )}
        {state === "error" && (
          <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 border border-red-500/20">
            {t.required}
          </p>
        )}
      </div>
    </form>
  );
}
