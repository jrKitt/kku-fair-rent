"use client";

import Link from "next/link";
import {
  Target,
  FileText,
  HandCoins,
  BookOpen,
  MessageCircle,
  AlertTriangle,
  LucideIcon
} from "lucide-react";

interface MenuItem {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  span?: boolean; // full width big button
  tone: "primary" | "line" | "neutral";
}

const ITEMS: MenuItem[] = [
  {
    href: "/quiz",
    icon: Target,
    title: "ค้นหาหอพักที่ใช่",
    subtitle: "Smart Quiz • ตอบ 5–6 ข้อ แล้วจับคู่หอที่แมตช์ที่สุด",
    span: true,
    tone: "primary",
  },
  {
    href: "/billing",
    icon: FileText,
    title: "บิลค่าหอ & Eco-Points",
    subtitle: "ดูบิลกลาง ตรวจค่าน้ำไฟ สะสมแต้มประหยัดพลังงาน",
    span: true,
    tone: "line",
  },
  {
    href: "/loan",
    icon: HandCoins,
    title: "ขอทุนมัดจำฉุกเฉิน",
    subtitle: "คัดกรองสิทธิ์ยืมเงินมัดจำแรกเข้า",
    tone: "neutral",
  },
  {
    href: "/knowledge",
    icon: BookOpen,
    title: "คลังความรู้ & สิทธิผู้เช่า",
    subtitle: "สัญญามาตรฐาน • คำนวณค่าน้ำไฟ • FAQ",
    tone: "neutral",
  },
  {
    href: "/support",
    icon: MessageCircle,
    title: "สอบถามพี่หอ",
    subtitle: "Q&A / Peer Support",
    tone: "neutral",
  },
  {
    href: "/complaint",
    icon: AlertTriangle,
    title: "ร้องเรียน / แจ้งไม่ตรงปก",
    subtitle: "แจ้งเบาะแสหอเอาเปรียบ / ค่าไฟเกินจริง",
    tone: "neutral",
  },
];

const toneClasses: Record<MenuItem["tone"], { bg: string; text: string; icon: string }> = {
  primary: {
    bg: "bg-gradient-to-br from-kku to-kku-dark",
    text: "text-white",
    icon: "text-white"
  },
  line: {
    bg: "bg-gradient-to-br from-line to-line-dark",
    text: "text-white",
    icon: "text-white"
  },
  neutral: {
    bg: "bg-white border border-gray-200",
    text: "text-gray-900",
    icon: "text-gray-600"
  },
};

export default function RichMenu() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ITEMS.map((it) => {
        const Icon = it.icon;
        const styles = toneClasses[it.tone];

        return (
          <Link
            key={it.href}
            href={it.href}
            className={`${styles.bg} ${
              it.span ? "col-span-2" : ""
            } rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform hover:shadow-md`}
          >
            <div className={`${styles.icon} mb-2.5`}>
              <Icon className="w-7 h-7" strokeWidth={2} />
            </div>
            <div className={`font-semibold text-[15px] ${styles.text}`}>
              {it.title}
            </div>
            <div
              className={`text-xs mt-1.5 leading-relaxed ${
                it.tone === "neutral" ? "text-gray-600" : "text-white/90"
              }`}
            >
              {it.subtitle}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
