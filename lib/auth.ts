import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";

const encoder = new TextEncoder();
const sessionName = "webdev_app_session";
const secret = () => {
  const value =
    process.env.MANUS_JWT_SECRET ||
    process.env.JWT_SECRET ||
    "najahcode-fallback-jwt-secret-local-dev-2026-key";
  return encoder.encode(value);
};

export type SessionUser = { openId: string; email: string; name?: string; role: "owner" | "editor" | "viewer" };

export function verifyAdminCredentials(email?: string, password?: string): boolean {
  if (!email || !password) return false;
  const configuredEmail =
    process.env.ADMIN_USERNAME ||
    (process.env.ADMIN_EMAILS || "admin@khobartech.com").split(",")[0].trim();
  const configuredPassword = process.env.ADMIN_PASSWORD || "NajahCode@2026!";

  return (
    email.trim().toLowerCase() === configuredEmail.trim().toLowerCase() &&
    password === configuredPassword
  );
}

export async function createSession(user: SessionUser) {
  return new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret());
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(sessionName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.openId || !payload.email || !payload.role) return null;
    return {
      openId: String(payload.openId),
      email: String(payload.email),
      name: payload.name ? String(payload.name) : undefined,
      role: payload.role as SessionUser["role"],
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getSession();
  if (!user || (user.role !== "owner" && user.role !== "editor")) throw new Error("UNAUTHORIZED");
  return user;
}

export async function upsertPlatformUser(profile: { openId: string; email: string; name?: string }): Promise<SessionUser> {
  const allowlist = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const intendedRole: SessionUser["role"] =
    allowlist.length === 0 || allowlist.includes(profile.email.toLowerCase()) ? "owner" : "viewer";
  if (!db) return { ...profile, role: intendedRole };
  try {
    const [existing] = await db.select().from(users).where(eq(users.openId, profile.openId)).limit(1);
    if (!existing) {
      await db.insert(users).values({ openId: profile.openId, email: profile.email, name: profile.name ?? null, role: intendedRole });
      return { ...profile, role: intendedRole };
    }
    if (existing.email !== profile.email || existing.name !== profile.name || (intendedRole === "owner" && existing.role !== "owner")) {
      await db.update(users).set({ email: profile.email, name: profile.name ?? null, role: intendedRole === "owner" ? "owner" : (existing.role as SessionUser["role"]) }).where(eq(users.id, existing.id));
    }
    return { openId: profile.openId, email: profile.email, name: profile.name, role: intendedRole === "owner" ? "owner" : (existing.role as SessionUser["role"]) };
  } catch {
    return { ...profile, role: intendedRole };
  }
}

export const authCookie = {
  name: sessionName,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};
