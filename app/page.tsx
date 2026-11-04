import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function RootPage() { const locale = (await cookies()).get("najah_locale")?.value === "en" ? "en" : "ar"; redirect(`/${locale}`); }
