"use client";

import { useState, useRef, useEffect } from "react";
import PhoneShell from "@/components/PhoneShell";

// ปุ่ม 5: สอบถามพี่หอ (Q&A / Peer Support)

interface Msg {
  from: "senior" | "me";
  text: string;
}

const SUGGESTED = [
  "โซนกังสดาลกับประตู มข. ที่ไหนเงียบกว่า?",
  "หอไหนเน็ตแรงเหมาะสายเกม?",
  "งบ 4,000 พอไหมสำหรับห้องแอร์?",
  "เรื่องความปลอดภัยกลับดึกต้องดูอะไรบ้าง?",
];

// mock peer answers (rule-based) — โปรโตไทป์
function seniorReply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("เงียบ") || t.includes("กังสดาล") || t.includes("ประตู"))
    return "โซนกังสดาลจะคึกคักหน่อยเพราะร้านอาหารเยอะ ส่วนโซนประตู มข. เดินทางสะดวกและเงียบกว่านิดนึงจ้า แนะนำลองทำ Smart Quiz กรองตามคณะด้วยนะ 🎯";
  if (t.includes("เน็ต") || t.includes("เกม"))
    return "หอที่ใช้ Smart Billing จะโชว์สเปกเน็ตชัดเจน ลองดูหอ Verified อย่าง The Nest หรือ U-Center เน็ตนิ่งพอเล่นเกมได้เลยจ้า";
  if (t.includes("งบ") || t.includes("4,000") || t.includes("4000"))
    return "งบ 4,000 รวมน้ำไฟได้ห้องแอร์อยู่ แต่ต้องระวังค่าไฟแฝง เลือกหอที่โชว์อัตราหน่วยละ ~4.2 บาทนะ ลองกดดูผลแมตช์ในเมนู Smart Quiz ได้เลย";
  if (t.includes("ปลอดภัย") || t.includes("ดึก") || t.includes("เปลี่ยว"))
    return "ดู 3 อย่าง: คีย์การ์ด/ยาม 24 ชม., กล้องวงจรปิดตรงทางเข้า-ลิฟต์, และไฟส่องสว่างรอบหอ ถ้ากลับดึกบ่อยเลือกหอติดถนนใหญ่จะอุ่นใจกว่าจ้า";
  return "พี่แนะนำให้เริ่มจาก Smart Quiz เพื่อกรองหอตามงบและคณะก่อนนะ แล้วดูเฉพาะหอที่ได้ตรา Verified จะปลอดภัยกว่าเยอะ 🙌";
}

export default function SupportPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "senior",
      text: "สวัสดีจ้าน้องปี 1 🙌 พี่หออาสาตอบทุกเรื่องหอพักเลย ถามมาได้เลยว่าอยากรู้อะไร",
    },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (q: string) => {
    const question = q.trim();
    if (!question) return;
    setMsgs((m) => [...m, { from: "me", text: question }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "senior", text: seniorReply(question) }]);
    }, 500);
  };

  return (
    <PhoneShell title="สอบถามพี่หอ" subtitle="Q&A · Peer Support" back="/">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              {m.from === "senior" && (
                <div className="w-8 h-8 rounded-full bg-kku/10 grid place-items-center text-sm mr-2 shrink-0">
                  🧑‍🎓
                </div>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.from === "me"
                    ? "bg-kku text-white rounded-br-sm"
                    : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* suggested */}
        <div className="px-3 pb-1 flex gap-2 overflow-x-auto no-scrollbar">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="whitespace-nowrap text-[11px] bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full"
            >
              {s}
            </button>
          ))}
        </div>

        {/* input */}
        <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(text)}
            placeholder="พิมพ์คำถามถึงพี่หอ…"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 ring-kku/20"
          />
          <button
            onClick={() => send(text)}
            className="w-10 h-10 rounded-full bg-kku text-white grid place-items-center shrink-0"
            aria-label="ส่ง"
          >
            ➤
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
