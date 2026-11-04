import { NextRequest, NextResponse } from "next/server";
import { authCookie, createSession, upsertPlatformUser, verifyAdminCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const { email, password } = body;

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    const adminEmail = (email || process.env.ADMIN_USERNAME || "admin@khobartech.com").trim().toLowerCase();
    const user = await upsertPlatformUser({
      openId: "admin-owner-verified",
      email: adminEmail,
      name: "مدير النظام (Admin)",
    });

    const session = await createSession(user);
    const secretPath = process.env.ADMIN_SECRET_PATH || "/cp-najah-9x7q2m8k";

    const response = NextResponse.json({ ok: true, redirectUrl: secretPath });
    response.cookies.set(authCookie.name, session, authCookie.options);
    return response;
  } catch {
    return NextResponse.json({ error: "حدث خطأ أثناء معالجة الطلب." }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const secretPath = process.env.ADMIN_SECRET_PATH || "/cp-najah-9x7q2m8k";
  return NextResponse.redirect(new URL(`${secretPath}/login`, request.nextUrl.origin));
}
