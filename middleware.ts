import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const secretPath = (process.env.ADMIN_SECRET_PATH || "/cp-khobar-9x7q2m8k").replace(/\/$/, "");

  // 1. Hide direct /admin and /admin/* URLs completely (Return 404)
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // 2. Map the obscure secret path to the internal admin routes
  if (pathname === secretPath) {
    const headers = new Headers(request.headers);
    headers.set("x-khobar-locale", "ar");
    return NextResponse.rewrite(new URL("/admin", request.url), { request: { headers } });
  }
  if (pathname === `${secretPath}/login`) {
    const headers = new Headers(request.headers);
    headers.set("x-khobar-locale", "ar");
    return NextResponse.rewrite(new URL("/admin/login", request.url), { request: { headers } });
  }

  const locale = pathname.startsWith("/en") ? "en" : "ar";
  const headers = new Headers(request.headers);
  headers.set("x-khobar-locale", locale);
  const response = NextResponse.next({ request: { headers } });
  if (pathname.startsWith("/ar") || pathname.startsWith("/en")) {
    response.cookies.set("khobar_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return response;
}

export const config = { matcher: ["/((?!api|_next|favicon.ico|icon.svg|manus-routes.json).*)"] };
