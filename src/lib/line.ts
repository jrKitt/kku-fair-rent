// LINE Messaging API helpers (server-side).
// Works in "mock mode" when credentials are absent so the prototype runs anywhere.

import crypto from "crypto";

export const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";
export const LINE_SECRET = process.env.LINE_CHANNEL_SECRET ?? "";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kku-fair-rent.vercel.app";

export const isConfigured = Boolean(LINE_TOKEN && LINE_SECRET);

// Verify the x-line-signature header per LINE docs.
export function verifySignature(body: string, signature: string | null): boolean {
  if (!LINE_SECRET || !signature) return false;
  const hash = crypto.createHmac("sha256", LINE_SECRET).update(body).digest("base64");
  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function replyMessage(replyToken: string, messages: unknown[]): Promise<void> {
  if (!isConfigured) {
    console.log("[LINE mock] reply:", JSON.stringify(messages));
    return;
  }
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINE_TOKEN}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  });
}

// A LIFF/URI action button that opens one of our web screens inside LINE.
function uriButton(label: string, path: string) {
  return { type: "action", action: { type: "uri", label, uri: `${BASE_URL}${path}` } };
}

// Main quick-reply / flex response mirroring the 6-button rich menu.
export function menuFlex() {
  return {
    type: "flex",
    altText: "KKU Fair-Rent — เมนูหลัก",
    contents: {
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#8a1538",
        paddingAll: "16px",
        contents: [
          { type: "text", text: "KKU Fair-Rent", weight: "bold", color: "#ffffff", size: "lg" },
          {
            type: "text",
            text: "ตลาดกลางหอพักนักศึกษา มข.",
            color: "#ffffffcc",
            size: "xs",
          },
        ],
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          menuRow("🎯 ค้นหาหอที่ใช่ (Smart Quiz)", "/quiz"),
          menuRow("🧾 บิลค่าหอ & Eco-Points", "/billing"),
          menuRow("🆘 ขอทุนมัดจำฉุกเฉิน", "/loan"),
          menuRow("📚 คลังความรู้ & สิทธิผู้เช่า", "/knowledge"),
          menuRow("💬 สอบถามพี่หอ", "/support"),
          menuRow("🚨 ร้องเรียน / แจ้งไม่ตรงปก", "/complaint"),
        ],
      },
    },
  };
}

function menuRow(label: string, path: string) {
  return {
    type: "button",
    style: "secondary",
    height: "sm",
    action: { type: "uri", label, uri: `${BASE_URL}${path}` },
  };
}

// Route free-text messages to the most relevant screen.
export function routeText(text: string) {
  const t = text.toLowerCase();
  if (/(หา|หอ|quiz|แมตช|match|ห้อง)/.test(t))
    return textWithButton("เริ่มหาหอที่ใช่ด้วย Smart Quiz ตอบ 5–6 ข้อ 👇", "🎯 ทำ Smart Quiz", "/quiz");
  if (/(บิล|ค่าไฟ|ค่าน้ำ|eco|แต้ม)/.test(t))
    return textWithButton("ดูบิลกลางและแต้ม Eco-Points ของคุณ 👇", "🧾 เปิดบิล", "/billing");
  if (/(ยืม|มัดจำ|ทุน|loan|กู้)/.test(t))
    return textWithButton("ตรวจสอบสิทธิ์ยืมเงินมัดจำฉุกเฉิน 👇", "🆘 ขอทุนมัดจำ", "/loan");
  if (/(ร้องเรียน|ไม่ตรงปก|โกง|เอาเปรียบ)/.test(t))
    return textWithButton("แจ้งเบาะแสหอที่เอาเปรียบได้เลย 👇", "🚨 ร้องเรียน", "/complaint");
  if (/(สิทธิ|สัญญา|faq|ความรู้)/.test(t))
    return textWithButton("คลังความรู้และสิทธิผู้เช่า 👇", "📚 เปิดคลังความรู้", "/knowledge");
  return menuFlex();
}

function textWithButton(text: string, label: string, path: string) {
  return {
    type: "flex",
    altText: text,
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          { type: "text", text, wrap: true, size: "sm" },
          {
            type: "button",
            style: "primary",
            color: "#8a1538",
            action: { type: "uri", label, uri: `${BASE_URL}${path}` },
          },
        ],
      },
    },
  };
}

export { uriButton };
