import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const KEY = "lawi-crm-logs";

export async function GET() {
  try {
    const data = await kv.get(KEY);
    return NextResponse.json(data || {});
  } catch (e) {
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await kv.set(KEY, body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
