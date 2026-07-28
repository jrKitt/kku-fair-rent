"use client";

import { useState } from "react";
import PhoneShell from "@/components/PhoneShell";
import { DORMS } from "@/lib/dorms";

// ปุ่ม 6: ร้องเรียน / แจ้งปัญหาไม่ตรงปก

const CATEGORIES = [
  { key: "electric", label: "คิดค่าไฟเกินจริง", icon: "⚡" },
  { key: "contract", label: "สัญญาไม่เป็นธรรม / หมกเม็ด", icon: "📄" },
  { key: "notmatch", label: "ห้องจริงไม่ตรงปก", icon: "📸" },
  { key: "deposit", label: "ยึดเงินมัดจำไม่คืน", icon: "💸" },
  { key: "safety", label: "ความปลอดภัย / สภาพแวดล้อม", icon: "🚨" },
  { key: "other", label: "อื่นๆ", icon: "✏️" },
];

export default function ComplaintPage() {
  const [dorm, setDorm] = useState("");
  const [cat, setCat] = useState("");
  const [detail, setDetail] = useState("");
  const [anon, setAnon] = useState(true);
  const [sent, setSent] = useState(false);

  const canSend = cat !== "" && detail.trim().length > 5;

  if (sent) {
    return (
      <PhoneShell title="แจ้งเรื่องสำเร็จ" back="/">
        <div className="p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-bold text-lg text-gray-800 mb-2">รับเรื่องแล้ว</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            เลขที่เรื่อง <b className="text-kku">#KKU-{Math.floor(Math.random() * 90000 + 10000)}</b>
            <br />
            ทีมงาน KKU Fair-Rent จะตรวจสอบภายใน 3 วันทำการ
            {anon && " โดยไม่เปิดเผยตัวตนผู้แจ้ง"}
          </p>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 text-left leading-relaxed">
            หากเป็นหอในระบบที่ได้ตรา Verified และพบว่าทำผิดจริง อาจถูกระงับตรา
            และนำออกจากการโปรโมตหน้าแรก LINE OA
          </div>
          <button
            onClick={() => {
              setSent(false);
              setCat("");
              setDetail("");
              setDorm("");
            }}
            className="mt-5 text-sm text-kku font-medium"
          >
            แจ้งเรื่องใหม่
          </button>
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell title="ร้องเรียน / แจ้งไม่ตรงปก" subtitle="แจ้งเบาะแสหอเอาเปรียบ" back="/">
      <div className="p-4 space-y-5 pb-8">
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 leading-relaxed">
          🚨 ช่องทางนี้ช่วยคัดกรองหอที่เอาเปรียบออกจากระบบ ข้อมูลของคุณช่วยรุ่นน้องปีต่อไปได้
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">หอพักที่ต้องการแจ้ง</p>
          <select
            value={dorm}
            onChange={(e) => setDorm(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white text-sm outline-none focus:border-kku"
          >
            <option value="">— เลือกหอ / หรือระบุในรายละเอียด —</option>
            {DORMS.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">ประเภทปัญหา</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`text-left px-3 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  cat === c.key
                    ? "bg-kku text-white border-kku"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                <span className="mr-1">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">รายละเอียด</p>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={4}
            placeholder="เล่าเหตุการณ์ เช่น คิดค่าไฟหน่วยละ 8 บาท ทั้งที่การไฟฟ้าเก็บ 4.2 บาท…"
            className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm outline-none focus:border-kku resize-none"
          />
          <button className="mt-2 text-xs text-gray-400 border border-dashed border-gray-300 rounded-lg px-3 py-2 w-full">
            📎 แนบรูปบิล / สัญญา / ภาพห้อง (ไม่บังคับ)
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="w-4 h-4 accent-kku"
          />
          แจ้งแบบไม่เปิดเผยตัวตน (ไม่ให้หอรู้ว่าใครแจ้ง)
        </label>

        <button
          onClick={() => setSent(true)}
          disabled={!canSend}
          className="w-full py-3.5 rounded-xl bg-kku text-white font-bold text-sm disabled:opacity-40"
        >
          🚨 ส่งเรื่องร้องเรียน
        </button>
      </div>
    </PhoneShell>
  );
}
