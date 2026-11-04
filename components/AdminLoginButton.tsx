import Link from "next/link";
import { LogIn } from "lucide-react";

export function AdminLoginButton() {
  return (
    <Link
      href="/api/auth/login"
      prefetch={false}
      className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-center text-sm font-semibold"
    >
      <LogIn size={18} />
      <span>الدخول إلى لوحة التحكم</span>
    </Link>
  );
}
