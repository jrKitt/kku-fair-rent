"use client";

import Link from "next/link";
import PhoneShell from "@/components/PhoneShell";
import { DORMS } from "@/lib/dorms";
import { totalCost } from "@/lib/match";

// นโยบายที่ 4: KKU Fair-Rent Verified Badge
const CRITERIA = [
  { icon: "📄", title: "สัญญาเช่าเป็นธรรม", desc: "ตรวจแล้วไม่มีหมกเม็ดค่าปรับ" },
  { icon: "🧾", title: "ใช้ Smart Billing", desc: "ออกบิลค่าน้ำไฟโปร่งใส โชว์อัตราหน่วย" },
  { icon: "🔒", title: "ความปลอดภัยพื้นฐาน", desc: "กล้องวงจรปิด คีย์การ์ด ไฟส่องสว่าง" },
];

const BENEFITS = [
  "ป้ายสติ๊กเกอร์ KKU Fair-Rent ติดหน้าอาคาร",
  "โปรโมตบนหน้าแรก LINE OA ช่วงรับน้องปี 1",
  "อัตราการเข้าพักเต็มเร็วกว่าคู่แข่งที่ไม่โปร่งใส",
];

export default function VerifiedPage() {
  const verified = DORMS.filter((d) => d.verified);
  return (
    <PhoneShell title="หอ Verified" subtitle="KKU Fair-Rent Verified Badge" back="/knowledge">
      <div className="p-4 space-y-4 pb-10">
        <div className="rounded-2xl bg-gradient-to-br from-kku to-kku-dark text-white p-5">
          <div className="text-3xl">✅</div>
          <div className="font-bold text-lg mt-1">ตรา KKU Fair-Rent Verified</div>
          <p className="text-white/85 text-xs mt-1 leading-relaxed">
            สัญลักษณ์ยกระดับมาตรฐานหอพักเอกชนรอบ มข. เลือกหอที่มีตรานี้
            อุ่นใจเรื่องสัญญา ค่าน้ำไฟ และความปลอดภัย
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-800 mb-2">เกณฑ์การได้รับตรา</p>
          <div className="space-y-2">
            {CRITERIA.map((c) => (
              <div key={c.title} className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3">
                <span className="text-xl">{c.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800">{c.title}</div>
                  <div className="text-[11px] text-gray-400">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-line/10 border border-line/25 p-3">
          <p className="text-sm font-bold text-line-dark mb-1.5">สิทธิประโยชน์ของหอที่ร่วม</p>
          <ul className="space-y-1">
            {BENEFITS.map((b) => (
              <li key={b} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-line">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-800 mb-2">
            หอที่ได้ตรา Verified ({verified.length})
          </p>
          <div className="space-y-2">
            {verified.map((d) => (
              <div key={d.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 grid place-items-center text-xl">
                  {d.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{d.name}</div>
                  <div className="text-[11px] text-gray-400">
                    โซน{d.zone} · รวม {totalCost(d).toLocaleString()} ฿/เดือน
                  </div>
                </div>
                <span className="text-line text-xs font-semibold shrink-0">✓ Verified</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/quiz"
          className="block text-center bg-kku text-white font-bold text-sm py-3 rounded-xl"
        >
          🎯 หาหอ Verified ที่ใช่สำหรับคุณ
        </Link>
      </div>
    </PhoneShell>
  );
}
