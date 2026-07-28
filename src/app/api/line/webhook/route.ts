import { NextRequest, NextResponse } from "next/server";
import { verifySignature, replyMessage, routeText, menuFlex, isConfigured } from "@/lib/line";

// LINE Messaging API webhook endpoint.
// Set this URL in the LINE Developers console:
//   https://<your-vercel-app>.vercel.app/api/line/webhook

export const runtime = "nodejs";

export async function GET() {
  // Health check / verification convenience.
  return NextResponse.json({
    ok: true,
    service: "KKU Fair-Rent LINE webhook",
    configured: isConfigured,
    hint: isConfigured
      ? "Credentials detected — live reply enabled."
      : "Running in mock mode. Set LINE_CHANNEL_ACCESS_TOKEN & LINE_CHANNEL_SECRET to go live.",
  });
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-line-signature");

  // In production with credentials, verify the signature. In mock mode, accept for testing.
  if (isConfigured && !verifySignature(raw, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let body: { events?: LineEvent[] };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const events = body.events ?? [];
  await Promise.all(
    events.map(async (ev) => {
      if (ev.type === "follow") {
        // Welcome message on new follow.
        await replyMessage(ev.replyToken, [
          {
            type: "text",
            text: "ยินดีต้อนรับสู่ KKU Fair-Rent 🏠\nหาหอที่ใช่ • บิลโปร่งใส • ยืมมัดจำฉุกเฉิน",
          },
          menuFlex(),
        ]);
        return;
      }
      if (ev.type === "message" && ev.message?.type === "text") {
        await replyMessage(ev.replyToken, [routeText(ev.message.text)]);
        return;
      }
      if (ev.type === "postback") {
        await replyMessage(ev.replyToken, [menuFlex()]);
      }
    })
  );

  return NextResponse.json({ ok: true });
}

interface LineEvent {
  type: string;
  replyToken: string;
  message?: { type: string; text: string };
  postback?: { data: string };
}
