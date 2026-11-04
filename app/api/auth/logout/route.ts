import { NextRequest, NextResponse } from "next/server";
import { authCookie } from "@/lib/auth";

export function GET(request: NextRequest) {
  const secretPath = process.env.ADMIN_SECRET_PATH || "/cp-najah-9x7q2m8k";
  const response = NextResponse.redirect(new URL(`${secretPath}/login`, request.nextUrl.origin));
  response.cookies.set(authCookie.name, "", { ...authCookie.options, maxAge: 0 });
  return response;
}
