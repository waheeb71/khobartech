"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Globe,
  Inbox,
  Layers,
  MessageSquare,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  Trash2,
  TrendingUp,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Save,
} from "lucide-react";

export type ContentType = "service" | "product" | "page" | "post" | "testimonial" | "portfolio" | "solution";

export type Item = {
  id: number;
  type: ContentType;
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

export type Inquiry = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  budget: string | null;
  description: string;
  status: string;
  locale?: string;
  notes?: string | null;
  createdAt: string;
};

export type Setting = {
  id: number;
  key: string;
  value: any;
  updatedAt: string;
};

export type AuditLog = {
  id: number;
  action: string;
  entityType: string;
  entityId: string | null;
  details?: any;
  createdAt: string;
};

export type StudioData = {
  items: Item[];
  inquiries: Inquiry[];
  settings: Setting[];
  logs: AuditLog[];
  isLiveDb?: boolean;
};

const blankItem = (): Omit<Item, "id" | "updatedAt"> => ({
  type: "service",
  category: "enterprise-systems",
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
  status: "published",
  displayOrder: 1,
});

export function ContentStudio({
  role,
  initialData,
}: {
  role: string;
  initialData?: StudioData | null;
}) {
  const [data, setData] = useState<StudioData | null>(initialData ?? null);
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "products" | "posts" | "inquiries" | "settings" | "logs">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editingItem, setEditingItem] = useState<(Omit<Item, "id" | "updatedAt"> & { id?: number }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Settings State
  const [heroArTitle, setHeroArTitle] = useState("");
  const [heroArBody, setHeroArBody] = useState("");
  const [heroEnTitle, setHeroEnTitle] = useState("");
  const [heroEnBody, setHeroEnBody] = useState("");
  const [contactPhone, setContactPhone] = useState("+966 13 800 0000");
  const [contactEmail, setContactEmail] = useState("info@khobartech.com");
  const [contactWhatsapp, setContactWhatsapp] = useState("+966 50 000 0000");
  const [contactCr, setContactCr] = useState("2051248900");
  const [contactVat, setContactVat] = useState("310123456700003");
  const [contactAddressAr, setContactAddressAr] = useState("طريق الملك فيصل، الخبر، المنطقة الشرقية، المملكة العربية السعودية");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotice({ message, type });
    setTimeout(() => setNotice(null), 4000);
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        showToast("تم تحديث البيانات من قاعدة البيانات بنجاح");
      }
    } catch {
      showToast("حدث خطأ أثناء جلب البيانات", "error");
    } finally {
      setLoading(false);
    }
  };

  // Populate settings form when data changes
  useEffect(() => {
    if (data?.settings) {
      const hero = data.settings.find((s) => s.key === "home.hero")?.value;
      if (hero) {
        setHeroArTitle(hero.ar?.title || "");
        setHeroArBody(hero.ar?.body || "");
        setHeroEnTitle(hero.en?.title || "");
        setHeroEnBody(hero.en?.body || "");
      }
      const contact = data.settings.find((s) => s.key === "company.contact")?.value;
      if (contact) {
        setContactPhone(contact.phone || "+966 13 800 0000");
        setContactEmail(contact.email || "info@khobartech.com");
        setContactWhatsapp(contact.whatsapp || "+966 50 000 0000");
        setContactCr(contact.crNumber || "2051248900");
        setContactVat(contact.vatNumber || "310123456700003");
        setContactAddressAr(contact.addressAr || "");
      }
    }
  }, [data]);

  // Save Content Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "content",
          payload: {
            ...editingItem,
            displayOrder: Number(editingItem.displayOrder) || 0,
          },
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "فشل الحفظ");

      showToast("تم حفظ العنصر بنجاح في قاعدة بيانات Neon");
      setEditingItem(null);
      await refreshData();
    } catch (err: any) {
      showToast(err.message || "حدث خطأ أثناء الحفظ", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete Content Item
  const handleDeleteItem = async (id: number, title: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في حذف: "${title}"؟`)) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_item",
          payload: { id },
        }),
      });

      if (!res.ok) throw new Error("فشل الحذف");
      showToast("تم الحذف بنجاح");
      await refreshData();
    } catch (err: any) {
      showToast(err.message || "تعذر الحذف", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "inquiry_status",
          payload: { id, status },
        }),
      });

      if (!res.ok) throw new Error("فشل التحديث");
      showToast("تم تحديث حالة الاستفسار");
      if (selectedInquiry) setSelectedInquiry({ ...selectedInquiry, status });
      await refreshData();
    } catch {
      showToast("حدث خطأ أثناء التحديث", "error");
    } finally {
      setLoading(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Hero
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "setting",
          payload: {
            key: "home.hero",
            value: {
              ar: { eyebrow: "تكنولوجيا الخبر للاستشارات التقنية", title: heroArTitle, body: heroArBody, primary: "استكشف خدماتنا", secondary: "تحدث مع خبرائنا" },
              en: { eyebrow: "Khobar Tech — Technology Consulting", title: heroEnTitle, body: heroEnBody, primary: "Explore services", secondary: "Talk to our experts" },
            },
          },
        }),
      });

      // 2. Contact
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "setting",
          payload: {
            key: "company.contact",
            value: {
              phone: contactPhone,
              email: contactEmail,
              whatsapp: contactWhatsapp,
              crNumber: contactCr,
              vatNumber: contactVat,
              addressAr: contactAddressAr,
              addressEn: "King Faisal Road, Al Khobar, Eastern Province, Saudi Arabia",
            },
          },
        }),
      });

      showToast("تم حفظ وتحديث إعدادات الموقع بنجاح في قاعدة البيانات");
      await refreshData();
    } catch {
      showToast("تعذر حفظ الإعدادات", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter items
  const servicesList = useMemo(() => data?.items.filter((i) => i.type === "service") || [], [data]);
  const productsList = useMemo(() => data?.items.filter((i) => i.type === "product") || [], [data]);
  const postsList = useMemo(() => data?.items.filter((i) => i.type === "post") || [], [data]);
  const inquiriesList = useMemo(() => data?.inquiries || [], [data]);

  const filteredItems = useMemo(() => {
    let list: Item[] = [];
    if (activeTab === "services") list = servicesList;
    else if (activeTab === "products") list = productsList;
    else if (activeTab === "posts") list = postsList;

    if (!searchQuery) return list;
    return list.filter(
      (item) =>
        item.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, servicesList, productsList, postsList, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notice && (
        <div
          className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-xl border px-5 py-3 shadow-2xl transition-all ${
            notice.type === "success"
              ? "border-emerald-500/40 bg-[#0c1c2e] text-emerald-300"
              : "border-red-500/40 bg-[#1c0c14] text-red-300"
          }`}
        >
          {notice.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <ShieldAlert className="h-5 w-5 text-red-400" />}
          <span className="text-sm font-semibold">{notice.message}</span>
        </div>
      )}

      {/* Main Tabs Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <nav className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveTab("overview"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "overview" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>نظرة عامة والمؤشرات</span>
          </button>

          <button
            onClick={() => { setActiveTab("services"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "services" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>الخدمات ({servicesList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab("products"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "products" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>المنتجات والمنصات ({productsList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab("posts"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "posts" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>المدونة والرؤى ({postsList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab("inquiries"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "inquiries" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Inbox className="h-4 w-4" />
            <span>صندوق الاستفسارات ({inquiriesList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "settings" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>إعدادات الموقع والمؤسسة</span>
          </button>

          <button
            onClick={() => { setActiveTab("logs"); setEditingItem(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "logs" ? "bg-cyan text-[#070e1c] shadow-lg shadow-cyan/20" : "bg-white/[0.04] text-[#8ba0be] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>سجل الأمان والتعديلات</span>
          </button>
        </nav>

        <button
          onClick={refreshData}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-[#8ba0be] hover:bg-white/10 hover:text-white transition disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-cyan" : ""}`} />
          <span>تحديث من السيرفر</span>
        </button>
      </div>

      {/* ====================================================================
          TAB 1: OVERVIEW & METRICS
      ==================================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8ba0be]">الخدمات المنشورة</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 text-cyan">
                  <Briefcase className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">{servicesList.length}</div>
              <p className="mt-1 text-xs text-[#8ba0be]">أنظمة ERP، السحابة، والذكاء الاصطناعي</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8ba0be]">المنتجات والمنصات</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Package className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">{productsList.length}</div>
              <p className="mt-1 text-xs text-[#8ba0be]">بوابة زاتكا، WMS، ونقاط البيع</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8ba0be]">المقالات المنشورة</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FileText className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">{postsList.length}</div>
              <p className="mt-1 text-xs text-[#8ba0be]">أبحاث ودراسات التحول الرقمي</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8ba0be]">إجمالي الاستفسارات</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Inbox className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">{inquiriesList.length}</div>
              <p className="mt-1 text-xs text-[#8ba0be]">طلبات عروض أسعار واستشارات</p>
            </div>
          </div>

          {/* Database Health Card */}
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#0c1830] to-[#081224] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>قاعدة بيانات الإنتاج: Neon Serverless PostgreSQL</span>
                    <span className="inline-flex rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      متصل ونشط
                    </span>
                  </h3>
                  <p className="mt-1 text-xs text-[#8ba0be]">
                    الموقع متصل بالكامل بقاعدة البيانات السحابية (AWS us-east-2)، وجميع الخدمات والمحتوى والرسائل تحفظ وتُجلب منها فوراً.
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setActiveTab("services"); setEditingItem(blankItem()); }}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan px-4 py-2.5 text-xs font-bold text-[#070e1c] hover:bg-cyan-dark transition shadow-lg shadow-cyan/20"
              >
                <Plus className="h-4 w-4" />
                <span>إضافة خدمة جديدة</span>
              </button>
            </div>
          </div>

          {/* Recent Inquiries Preview */}
          <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Inbox className="h-4 w-4 text-cyan" />
                <span>آخر الاستفسارات الواردة</span>
              </h3>
              <button
                onClick={() => setActiveTab("inquiries")}
                className="text-xs font-semibold text-cyan hover:underline"
              >
                عرض الكل ({inquiriesList.length}) ←
              </button>
            </div>

            {inquiriesList.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8ba0be]">
                لا توجد استفسارات جديدة بعد. أي طلب من صفحة التواصل سيظهر هنا مباشرة.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-[#8ba0be]">
                      <th className="pb-3 font-semibold">الاسم</th>
                      <th className="pb-3 font-semibold">الجهة / الشركة</th>
                      <th className="pb-3 font-semibold">الخدمة المطلوبة</th>
                      <th className="pb-3 font-semibold">التاريخ</th>
                      <th className="pb-3 font-semibold">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiriesList.slice(0, 5).map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 font-semibold text-white">{inq.fullName}</td>
                        <td className="py-3 text-[#8ba0be]">{inq.company || "—"}</td>
                        <td className="py-3 text-cyan">{inq.service}</td>
                        <td className="py-3 text-[#8ba0be]">{new Date(inq.createdAt).toLocaleDateString("ar-SA")}</td>
                        <td className="py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            inq.status === "new" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-[#8ba0be]"
                          }`}>
                            {inq.status === "new" ? "جديد" : inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2, 3, 4: SERVICES, PRODUCTS, POSTS LIST & EDITOR
      ==================================================================== */}
      {(activeTab === "services" || activeTab === "products" || activeTab === "posts") && !editingItem && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8ba0be]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالعنوان أو الرابط (slug)..."
                className="w-full rounded-xl border border-white/10 bg-[#0c1830] py-2.5 pl-4 pr-10 text-xs text-white placeholder-[#8ba0be] focus:border-cyan focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                const b = blankItem();
                if (activeTab === "services") b.type = "service";
                if (activeTab === "products") b.type = "product";
                if (activeTab === "posts") b.type = "post";
                setEditingItem(b);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan px-4 py-2.5 text-xs font-bold text-[#070e1c] hover:bg-cyan-dark transition shadow-lg shadow-cyan/20"
            >
              <Plus className="h-4 w-4" />
              <span>
                {activeTab === "services" && "إضافة خدمة جديدة"}
                {activeTab === "products" && "إضافة منتج جديد"}
                {activeTab === "posts" && "إضافة مقال جديد"}
              </span>
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c1830] p-6 transition hover:border-cyan/40 hover:bg-[#0f1f3d]"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-cyan font-mono">
                      /{item.slug}
                    </span>
                    <span className={`inline-flex rounded-full px-2 py-0.5 font-semibold text-[10px] ${
                      item.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {item.status === "published" ? "منشور" : "مسودة"}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-cyan transition-colors">
                    {item.titleAr}
                  </h4>
                  <p className="text-xs text-[#8ba0be] font-medium" dir="ltr">
                    {item.titleEn}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#8ba0be] line-clamp-2">
                    {item.excerptAr || item.bodyAr}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan hover:text-[#070e1c] transition"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id, item.titleAr)}
                      className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500 hover:text-white transition"
                      title="حذف"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] text-[#5a6b7f]">
                    الترتيب: {item.displayOrder}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          ITEM EDITOR FORM (EDIT / ADD)
      ==================================================================== */}
      {editingItem && (
        <form onSubmit={handleSaveItem} className="rounded-2xl border border-white/10 bg-[#0c1830] p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {editingItem.id ? `تعديل: ${editingItem.titleAr}` : "إضافة عنصر جديد إلى قاعدة البيانات"}
              </h3>
              <p className="text-xs text-[#8ba0be] mt-1">البيانات تحفظ فوراً في جدول content_items على PostgreSQL</p>
            </div>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="text-xs font-semibold text-[#8ba0be] hover:text-white"
            >
              إلغاء والعودة
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#8ba0be] mb-2">العنوان بالعربية *</label>
              <input
                required
                type="text"
                value={editingItem.titleAr}
                onChange={(e) => setEditingItem({ ...editingItem, titleAr: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8ba0be] mb-2">العنوان بالإنجليزية (English) *</label>
              <input
                required
                dir="ltr"
                type="text"
                value={editingItem.titleEn}
                onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8ba0be] mb-2">الرابط الفريد (Slug) *</label>
              <input
                required
                dir="ltr"
                type="text"
                value={editingItem.slug}
                onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                placeholder="erp-solutions"
                className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white font-mono focus:border-cyan focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">الحالة</label>
                <select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                >
                  <option value="published">منشور (Live)</option>
                  <option value="draft">مسودة (Draft)</option>
                  <option value="archived">مؤرشف (Archived)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">ترتيب الظهور</label>
                <input
                  type="number"
                  value={editingItem.displayOrder}
                  onChange={(e) => setEditingItem({ ...editingItem, displayOrder: Number(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8ba0be] mb-2">نبذة مختصرة (عربي)</label>
            <textarea
              rows={2}
              value={editingItem.excerptAr || ""}
              onChange={(e) => setEditingItem({ ...editingItem, excerptAr: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8ba0be] mb-2">المحتوى والتفاصيل الكاملة (عربي)</label>
            <textarea
              rows={6}
              value={editingItem.bodyAr || ""}
              onChange={(e) => setEditingItem({ ...editingItem, bodyAr: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-[#8ba0be] hover:bg-white/10 hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-2.5 text-xs font-bold text-[#070e1c] hover:bg-cyan-dark transition shadow-lg shadow-cyan/20 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? "جارٍ الحفظ..." : "حفظ في قاعدة البيانات"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ====================================================================
          TAB 5: INQUIRIES & RFPS INBOX
      ==================================================================== */}
      {activeTab === "inquiries" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">صندوق طلبات الاستشارات والمناقصات (RFPs)</h3>
                <p className="text-xs text-[#8ba0be] mt-1">يتم تخزين كافة نماذج الاتصال وعروض الأسعار في جدول contact_inquiries مباشرة</p>
              </div>
              <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
                {inquiriesList.length} استفسار
              </span>
            </div>

            {inquiriesList.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#8ba0be]">لا توجد استفسارات حالياً.</div>
            ) : (
              <div className="space-y-3">
                {inquiriesList.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#081224] p-5 cursor-pointer hover:border-cyan/40 hover:bg-[#0c1c38] transition"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-sm">{inq.fullName}</span>
                        {inq.company && (
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-[#8ba0be]">
                            {inq.company}
                          </span>
                        )}
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          inq.status === "new" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-[#8ba0be]"
                        }`}>
                          {inq.status === "new" ? "جديد" : inq.status}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-[#8ba0be] line-clamp-1 max-w-2xl">
                        {inq.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-[#5a6b7f]">
                        <span className="flex items-center gap-1 text-cyan">
                          <Briefcase className="h-3 w-3" />
                          {inq.service}
                        </span>
                        {inq.budget && <span>الميزانية: {inq.budget}</span>}
                        <span>{new Date(inq.createdAt).toLocaleString("ar-SA")}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                          title="محادثة واتساب مباشرة"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={`mailto:${inq.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg bg-white/5 p-2 text-white hover:bg-cyan hover:text-[#070e1c] transition"
                        title="إرسال بريد"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inquiry Detail Modal */}
          {selectedInquiry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0c1830] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedInquiry.fullName}</h3>
                    <p className="text-xs text-[#8ba0be]">{selectedInquiry.company || "بدون جهة محددة"}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-xs font-semibold text-[#8ba0be] hover:text-white"
                  >
                    إغلاق (✕)
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl bg-[#081224] p-3.5">
                    <span className="text-[#8ba0be] block mb-1">البريد الإلكتروني:</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-cyan font-semibold hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div className="rounded-xl bg-[#081224] p-3.5">
                    <span className="text-[#8ba0be] block mb-1">الهاتف / واتساب:</span>
                    <span className="text-white font-mono">{selectedInquiry.phone || "غير محدد"}</span>
                  </div>
                  <div className="rounded-xl bg-[#081224] p-3.5">
                    <span className="text-[#8ba0be] block mb-1">الخدمة المطلوبة:</span>
                    <span className="text-white font-semibold">{selectedInquiry.service}</span>
                  </div>
                  <div className="rounded-xl bg-[#081224] p-3.5">
                    <span className="text-[#8ba0be] block mb-1">الميزانية المقترحة:</span>
                    <span className="text-white font-semibold">{selectedInquiry.budget || "غير محددة"}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#081224] p-4 text-xs">
                  <span className="text-[#8ba0be] block font-bold mb-2">تفاصيل الطلب والمشروع:</span>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedInquiry.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8ba0be]">تغيير الحالة:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleUpdateInquiryStatus(selectedInquiry.id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-[#081224] px-3 py-1.5 text-xs text-white"
                    >
                      <option value="new">جديد (New)</option>
                      <option value="in_progress">قيد المتابعة</option>
                      <option value="contacted">تم التواصل والرد</option>
                      <option value="closed">مغلق ومكتمل</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedInquiry.phone && (
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>فتح واتساب</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          TAB 6: SITE & COMPANY SETTINGS
      ==================================================================== */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="rounded-2xl border border-white/10 bg-[#0c1830] p-8 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white">إعدادات الموقع والهوية الرسمية</h3>
            <p className="text-xs text-[#8ba0be] mt-1">تعديل نصوص الصفحة الرئيسية ومعلومات الاتصال الرسمية والسجل التجاري المخزنة بقاعدة البيانات</p>
          </div>

          {/* Section: Hero Banner */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <h4 className="text-sm font-bold text-cyan">قسم الترحيب الرئيسي (Hero Section)</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">العنوان الرئيسي (عربي)</label>
                <input
                  type="text"
                  value={heroArTitle}
                  onChange={(e) => setHeroArTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">العنوان الرئيسي (English)</label>
                <input
                  dir="ltr"
                  type="text"
                  value={heroEnTitle}
                  onChange={(e) => setHeroEnTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#8ba0be] mb-2">الوصف التعريفي (عربي)</label>
              <textarea
                rows={3}
                value={heroArBody}
                onChange={(e) => setHeroArBody(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
              />
            </div>
          </div>

          {/* Section: Official Corporate Details */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <h4 className="text-sm font-bold text-cyan">البيانات الرسمية والاتصال المعتمد</h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">السجل التجاري (C.R.)</label>
                <input
                  type="text"
                  value={contactCr}
                  onChange={(e) => setContactCr(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white font-mono focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">الرقم الضريبي (VAT)</label>
                <input
                  type="text"
                  value={contactVat}
                  onChange={(e) => setContactVat(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white font-mono focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">البريد الإلكتروني المعتمد</label>
                <input
                  dir="ltr"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">رقم الهاتف المباشر</label>
                <input
                  dir="ltr"
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">رقم واتساب الأعمال</label>
                <input
                  dir="ltr"
                  type="text"
                  value={contactWhatsapp}
                  onChange={(e) => setContactWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8ba0be] mb-2">العنوان / المقر الرئيسي</label>
                <input
                  type="text"
                  value={contactAddressAr}
                  onChange={(e) => setContactAddressAr(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#081224] p-3 text-xs text-white focus:border-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-white/10 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3 text-xs font-bold text-[#070e1c] hover:bg-cyan-dark transition shadow-lg shadow-cyan/20 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? "جارٍ الحفظ..." : "حفظ كل الإعدادات في قاعدة البيانات"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ====================================================================
          TAB 7: AUDIT LOGS
      ==================================================================== */}
      {activeTab === "logs" && (
        <div className="rounded-2xl border border-white/10 bg-[#0c1830] p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan" />
              <span>سجل النشاطات والتعديلات الأمنية (Audit Logs)</span>
            </h3>
            <span className="text-xs text-[#8ba0be]">جدول audit_logs في PostgreSQL</span>
          </div>

          {(!data?.logs || data.logs.length === 0) ? (
            <div className="py-12 text-center text-xs text-[#8ba0be]">لا توجد تعديلات مسجلة بعد.</div>
          ) : (
            <div className="space-y-2">
              {data.logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-xl bg-[#081224] p-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan font-semibold">[{log.action.toUpperCase()}]</span>
                    <span className="text-white font-medium">{log.entityType}: {log.entityId || "—"}</span>
                  </div>
                  <span className="text-[#8ba0be]">{new Date(log.createdAt).toLocaleString("ar-SA")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
