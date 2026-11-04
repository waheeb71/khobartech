import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ status: "ok", service: "najah-code", timestamp: new Date().toISOString() }); }
