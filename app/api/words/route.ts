import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const KEY = 'gacha-words';

export async function GET() {
  try {
    const words = await kv.get<string[]>(KEY);
    return NextResponse.json(words ?? []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const words = await req.json();
    await kv.set(KEY, words);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
