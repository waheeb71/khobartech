"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  FileText,
  ImageUp,
  Inbox,
  PenSquare,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  Sparkles,
} from "lucide-react";

type Item = {
  id: number;
  type: "service" | "product" | "page" | "post" | "testimonial" | "portfolio";
  category: string | null;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string | null;
  excerptEn: string | null;
  bodyAr: string | null;
  bodyEn: string | null;
  imageKey: string | null;
  seoTitleAr: string | null;
  seoTitleEn: string | null;
  seoDescriptionAr: string | null;
  seoDescriptionEn: string | null;
  status: "draft" | "published" | "archived";
  displayOrder: number;
  updatedAt: string;
};

type Inquiry = {
  id: number;
  fullName: string;
  email: string;
  company: string | null;
  service: string;
  description: string;
  status: string;
  createdAt: string;
};

export type StudioData = {
  items: Item[];
  inquiries: Inquiry[];
  settings: Array<{ key: string; value: unknown }>;
  logs: Array<{ id: number; action: string; entityType: string; entityId: string | null; createdAt: string }>;
};

function getItemHref(item: { type: string; category?: string | null; slug: string }) {
  if (item.type === "service") {
    const group = item.category || "enterprise";
    return `/ar/services/${group}/${item.slug}`;
  }
  if (item.type === "post") {
    return `/ar/blog/${item.slug}`;
  }
  if (item.type === "product") {
    return `/ar/products/${item.slug}`;
  }
  return `/ar/${item.slug}`;
}

const blank = (): Omit<Item, "id" | "updatedAt"> => ({
  type: "page",
  category: "",
  slug: "",
  titleAr: "",
  titleEn: "",
  excerptAr: "",
  excerptEn: "",
  bodyAr: "",
  bodyEn: "",
  imageKey: "",
  seoTitleAr: "",
  seoTitleEn: "",
  seoDescriptionAr: "",
  seoDescriptionEn: "",
  status: "draft",
  displayOrder: 0,
});

export function ContentStudio({
  role,
  initialData,
}: {
  role: string;
  initialData?: StudioData | null;
}) {
  const [tab, setTab] = useState<"content" | "inquiries" | "settings">("content");
  const [data, setData] = useState<StudioData | null>(initialData ?? null);
  const [draft, setDraft] = useState<Omit<Item, "id" | "updatedAt"> & { id?: number }>(blank());
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(!initialData);

  const refresh = async () => {
    setLoading(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/content");
      if (response.ok) {
        const json = (await response.json()) as StudioData;
        setData(json);
      } else {
        const body = await response.json().catch(() => ({}));
        setNotice(body.error || `تعذر تحميل البيانات (${response.status})`);
      }
    } catch {
      setNotice("حدث خطأ في الاتصال بالخادم. يرجى المحاولة مجددًا.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      void refresh();
    }
  }, [initialData]);

  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft((item) => ({ ...item, [key]: value }));

  const selected = useMemo(() => data?.items.find((item) => item.id === draft.id), [data, draft.id]);

  const selectItem = (item: Item) => {
    setDraft({
      ...item,
      category: item.category || "",
      excerptAr: item.excerptAr || "",
      excerptEn: item.excerptEn || "",
      bodyAr: item.bodyAr || "",
      bodyEn: item.bodyEn || "",
      imageKey: item.imageKey || "",
      seoTitleAr: item.seoTitleAr || "",
      seoTitleEn: item.seoTitleEn || "",
      seoDescriptionAr: item.seoDescriptionAr || "",
      seoDescriptionEn: item.seoDescriptionEn || "",
    });
  };

  async function save() {
    setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "content",
          payload: { ...draft, displayOrder: Number(draft.displayOrder) },
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setNotice(body.error || "تعذّر الحفظ.");
        return;
      }
      setNotice("تم حفظ المحتوى وسجل التغيير بنجاح.");
      setDraft(blank());
      await refresh();
    } catch {
      setNotice("حدث خطأ أثناء الاتصال.");
    }
  }

  async function upload(file?: File) {
    if (!file) return;
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const body = await response.json();
      if (!response.ok) {
        setNotice(body.error || "تعذّر رفع الصورة.");
        return;
      }
      set("imageKey", body.path);
      setNotice("تم رفع الصورة إلى مكتبة الوسائط.");
    } catch {
      setNotice("فشل رفع الصورة.");
    }
  }

  async function saveSetting(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const key = String(form.get("key") || "").trim();
    const raw = String(form.get("value") || "");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setting", payload: { key, value: JSON.parse(raw) } }),
      });
      setNotice(response.ok ? "تم حفظ الإعداد." : "تعذّر حفظ الإعداد.");
      if (response.ok) await refresh();
    } catch {
      setNotice("قيمة JSON غير صالحة.");
    }
  }

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-slate-200 bg-white">
        <p className="text-sm font-semibold text-slate-600">جارٍ تحميل لوحة المحتوى…</p>
        <button
          onClick={() => void refresh()}
          className="btn-secondary mt-4 flex items-center gap-2 text-xs"
        >
          <RotateCcw size={14} /> إعادة المحاولة
        </button>
      </div>
    );
  }

  const tabs = [
    { id: "content" as const, label: "المحتوى والخدمات", icon: FileText },
    { id: "inquiries" as const, label: "الاستفسارات", icon: Inbox },
    { id: "settings" as const, label: "الإعدادات العامة", icon: Settings2 },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
      <aside className="border border-slate-200 bg-white p-3">
        <p className="px-3 py-3 text-xs font-bold uppercase tracking-[.14em] text-slate-500">
          CMS Studio · {role}
        </p>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => setTab(id)}
            className={`flex w-full items-center gap-3 px-3 py-3 text-right text-sm font-semibold transition ${
              tab === id ? "bg-navy text-white" : "hover:bg-mist text-slate-700"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => window.location.assign("/api/auth/logout")}
          className="mt-6 block w-full px-3 py-3 text-right text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          تسجيل الخروج
        </button>
      </aside>

      <section className="min-w-0">
        {notice && (
          <p role="status" className="mb-4 border-s-4 border-cyan bg-cyan/10 px-4 py-3 text-sm font-semibold text-navy">
            {notice}
          </p>
        )}

        {tab === "content" && (
          <div className="grid gap-6 2xl:grid-cols-[340px_1fr]">
            <div className="border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <div>
                  <strong className="text-sm font-bold text-navy">عناصر المحتوى</strong>
                  <span className="ms-2 rounded bg-mist px-2 py-0.5 text-xs text-slate-600">
                    {data?.items.length || 0}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDraft(blank())}
                  className="flex items-center gap-1 text-xs font-bold text-royal hover:underline"
                >
                  <Plus size={14} /> عنصر جديد
                </button>
              </div>

              <div className="max-h-[720px] overflow-auto divide-y divide-slate-100">
                {data?.items.map((item) => {
                  const isSelected = selected?.id === item.id;
                  const href = getItemHref(item);
                  return (
                    <div
                      key={item.id}
                      className={`p-3 transition ${
                        isSelected ? "bg-royal/5 border-s-4 border-royal" : "hover:bg-mist"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => selectItem(item)}
                          className="flex-1 text-start"
                        >
                          <span className="text-[10px] font-bold uppercase text-royal">
                            {item.type} · {item.status}
                          </span>
                          <strong className="mt-0.5 block text-sm text-navy">{item.titleAr}</strong>
                          <span className="block truncate text-xs text-slate-500">/{item.slug}</span>
                        </button>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="معاينة الصفحة في الموقع"
                          className="mt-1 flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm hover:border-royal hover:text-royal"
                        >
                          <ExternalLink size={12} />
                          معاينة
                        </a>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => selectItem(item)}
                          className="flex items-center gap-1 font-semibold text-royal hover:underline"
                        >
                          <PenSquare size={12} />
                          {isSelected ? "جارٍ التحرير حالياً" : "تحرير في اللوحة"}
                        </button>
                        <span className="text-slate-400">#{item.id}</span>
                      </div>
                    </div>
                  );
                })}

                {!data?.items.length && (
                  <p className="p-5 text-sm text-slate-500 text-center">لا يوجد محتوى بعد. ابدأ بعنصر جديد.</p>
                )}
              </div>
            </div>

            <Editor
              key={draft.id ? `item-${draft.id}` : "new-draft"}
              draft={draft}
              set={set}
              upload={upload}
              save={save}
            />
          </div>
        )}

        {tab === "inquiries" && (
          <div className="border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-xl font-semibold">استفسارات المشاريع</h2>
              <p className="mt-1 text-sm text-slate-500">كل الرسائل المحفوظة من نموذج الموقع.</p>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full text-right text-sm">
                <thead className="bg-mist text-xs text-slate-600">
                  <tr>
                    <th className="p-4">الاسم</th>
                    <th className="p-4">الخدمة</th>
                    <th className="p-4">الرسالة</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.inquiries.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="p-4 font-semibold">
                        {item.fullName}
                        <span className="mt-1 block text-xs font-normal text-slate-500">{item.email}</span>
                      </td>
                      <td className="p-4">{item.service}</td>
                      <td className="max-w-sm p-4 text-slate-600">{item.description}</td>
                      <td className="p-4">
                        <span className="rounded bg-mist px-2 py-1 text-xs font-bold text-navy">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                  {!data?.inquiries.length && (
                    <tr>
                      <td className="p-8 text-center text-slate-500" colSpan={4}>
                        لا توجد استفسارات حتى الآن.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={saveSetting} className="border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold">إعداد عام</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                احفظ بيانات الشركة، الشبكات، القوائم أو إعدادات SEO بصيغة JSON.
              </p>
              <label className="mt-6 grid gap-2 text-sm font-semibold">
                المفتاح
                <input
                  name="key"
                  required
                  placeholder="company.contact"
                  className="border border-slate-300 px-3 py-2.5 outline-none focus:border-royal"
                />
              </label>
              <label className="mt-4 grid gap-2 text-sm font-semibold">
                قيمة JSON
                <textarea
                  name="value"
                  required
                  rows={8}
                  placeholder='{"email":"hello@khobartech.com"}'
                  className="border border-slate-300 px-3 py-2.5 font-mono text-xs outline-none focus:border-royal"
                />
              </label>
              <button className="btn-primary mt-5 flex items-center gap-2" type="submit">
                <Save size={16} />
                حفظ الإعداد
              </button>
            </form>
            <div className="border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold">سجل التغييرات</h2>
              <div className="mt-5 space-y-3">
                {data?.logs.map((log) => (
                  <div className="border-s-2 border-cyan ps-3 text-sm" key={log.id}>
                    <strong>{log.action}</strong> · {log.entityType}
                    <span className="block pt-1 text-xs text-slate-500">{log.entityId || "—"}</span>
                  </div>
                ))}
                {!data?.logs.length && (
                  <p className="text-sm text-slate-500">سيظهر هنا سجل عمليات المحتوى المهمة.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Editor({
  draft,
  set,
  upload,
  save,
}: {
  draft: Omit<Item, "id" | "updatedAt"> & { id?: number };
  set: <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) => void;
  upload: (file?: File) => Promise<void>;
  save: () => Promise<void>;
}) {
  const href = draft.id ? getItemHref(draft) : "";

  return (
    <div className="border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy">
            {draft.id ? `تحرير: ${draft.titleAr || draft.slug}` : "عنصر محتوى جديد"}
          </h2>
          {draft.id && (
            <p className="mt-1 text-xs text-slate-500">
              المعرف: <code className="font-mono text-navy font-bold">{draft.id}</code> · المسار:{" "}
              <code className="font-mono text-royal">/{draft.slug}</code>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {draft.id && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded border border-slate-300 bg-mist px-3 py-1.5 text-xs font-bold text-navy hover:bg-slate-200"
            >
              <ExternalLink size={14} />
              معاينة الصفحة في الموقع ↗
            </a>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-royal">
            <Sparkles size={14} />
            {draft.status === "published" ? "منشور" : "مسودة"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="العنوان العربي" value={draft.titleAr} onChange={(value) => set("titleAr", value)} required />
        <Field label="English title" value={draft.titleEn} onChange={(value) => set("titleEn", value)} required />
        <Field
          label="Slug (الرابط الفرعي)"
          value={draft.slug}
          onChange={(value) => set("slug", value.toLowerCase().replace(/\s+/g, "-"))}
          required
        />
        <label className="grid gap-2 text-sm font-semibold">
          النوع
          <select
            value={draft.type}
            onChange={(event) => set("type", event.target.value as Item["type"])}
            className="border border-slate-300 px-3 py-2.5"
          >
            <option value="service">Service (خدمة)</option>
            <option value="product">Product (منتج)</option>
            <option value="post">Post (مقال)</option>
            <option value="page">Page (صفحة)</option>
            <option value="portfolio">Portfolio (مشروع)</option>
            <option value="testimonial">Testimonial (شهادة)</option>
          </select>
        </label>
        <Field label="التصنيف / Category" value={draft.category || ""} onChange={(value) => set("category", value)} />
        <label className="grid gap-2 text-sm font-semibold">
          الحالة
          <select
            value={draft.status}
            onChange={(event) => set("status", event.target.value as Item["status"])}
            className="border border-slate-300 px-3 py-2.5"
          >
            <option value="published">Published (منشور)</option>
            <option value="draft">Draft (مسودة)</option>
            <option value="archived">Archived (مؤرشف)</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Area label="ملخص عربي" value={draft.excerptAr || ""} onChange={(value) => set("excerptAr", value)} />
        <Area label="English excerpt" value={draft.excerptEn || ""} onChange={(value) => set("excerptEn", value)} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Area
          label="المحتوى العربي (نص أو HTML)"
          value={draft.bodyAr || ""}
          onChange={(value) => set("bodyAr", value)}
          rows={6}
        />
        <Area
          label="English body (text or HTML)"
          value={draft.bodyEn || ""}
          onChange={(value) => set("bodyEn", value)}
          rows={6}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          صورة / وسائط
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            onChange={(event) => void upload(event.target.files?.[0])}
            className="border border-slate-300 px-3 py-2"
          />
          <span className="text-xs font-normal text-slate-500">
            ترفع الصورة إلى التخزين المحلي وتضاف إلى مكتبة الوسائط.
          </span>
        </label>
        <Field label="مسار الصورة" value={draft.imageKey || ""} onChange={(value) => set("imageKey", value)} />
      </div>

      <div className="mt-7 border-t border-slate-200 pt-5">
        <p className="text-sm font-bold text-royal">إعدادات محركات البحث (SEO)</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="SEO title AR" value={draft.seoTitleAr || ""} onChange={(value) => set("seoTitleAr", value)} />
          <Field label="SEO title EN" value={draft.seoTitleEn || ""} onChange={(value) => set("seoTitleEn", value)} />
          <Area
            label="SEO description AR"
            value={draft.seoDescriptionAr || ""}
            onChange={(value) => set("seoDescriptionAr", value)}
          />
          <Area
            label="SEO description EN"
            value={draft.seoDescriptionEn || ""}
            onChange={(value) => set("seoDescriptionEn", value)}
          />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => void save()} className="btn-primary flex items-center gap-2">
            <Save size={16} />
            حفظ التعديلات
          </button>
          <label className="text-sm font-semibold flex items-center gap-2">
            الترتيب:
            <input
              type="number"
              min="0"
              value={draft.displayOrder}
              onChange={(event) => set("displayOrder", Number(event.target.value))}
              className="w-20 border border-slate-300 px-2 py-1.5"
            />
          </label>
        </div>

        {draft.id && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-royal underline flex items-center gap-1"
          >
            <ExternalLink size={13} />
            معاينة الرابط المباشر
          </a>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-slate-300 px-3 py-2.5 outline-none focus:border-royal"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="resize-y border border-slate-300 px-3 py-2.5 outline-none focus:border-royal"
      />
    </label>
  );
}
