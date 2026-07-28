"use client";

import Link from "next/link";

interface MenuItem {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  span?: boolean; // full width big button
  tone: "primary" | "line" | "neutral";
}

const ITEMS: MenuItem[] = [
  {
    href: "/quiz",
    icon: "🎯",
    title: "ค้นหาหอพักที่ใช่",
    subtitle: "Smart Quiz • ตอบ 5–6 ข้อ แล้วจับคู่หอที่แมตช์ที่สุด",
    span: true,
    tone: "primary",
  },
  {
    href: "/billing",
    icon: "🧾",
    title: "บิลค่าหอ & Eco-Points",
    subtitle: "ดูบิลกลาง ตรวจค่าน้ำไฟ สะสมแต้มประหยัดพลังงาน",
    span: true,
    tone: "line",
  },
  {
    href: "/loan",
    icon: "🆘",
    title: "ขอทุนมัดจำฉุกเฉิน",
    subtitle: "คัดกรองสิทธิ์ยืมเงินมัดจำแรกเข้า",
    tone: "neutral",
  },
  {
    href: "/knowledge",
    icon: "📚",
    title: "คลังความรู้ & สิทธิผู้เช่า",
    subtitle: "สัญญามาตรฐาน • คำนวณค่าน้ำไฟ • FAQ",
    tone: "neutral",
  },
  {
    href: "/support",
    icon: "💬",
    title: "สอบถามพี่หอ",
    subtitle: "Q&A / Peer Support",
    tone: "neutral",
  },
  {
    href: "/complaint",
    icon: "🚨",
    title: "ร้องเรียน / แจ้งไม่ตรงปก",
    subtitle: "แจ้งเบาะแสหอเอาเปรียบ / ค่าไฟเกินจริง",
    tone: "neutral",
  },
];

const toneClasses: Record<MenuItem["tone"], string> = {
  primary: "bg-kku text-white",
  line: "bg-line text-white",
  neutral: "bg-white text-gray-800 border border-gray-200",
};

export default function RichMenu() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`${toneClasses[it.tone]} ${
            it.span ? "col-span-2" : ""
          } rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform`}
        >
          <div className="text-3xl leading-none mb-2">{it.icon}</div>
          <div className="font-bold text-[15px]">{it.title}</div>
          <div
            className={`text-xs mt-1 ${
              it.tone === "neutral" ? "text-gray-500" : "text-white/85"
            }`}
          >
            {it.subtitle}
          </div>
        </Link>
      ))}
    </div>
  );
}
