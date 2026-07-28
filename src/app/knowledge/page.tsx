"use client";

import { useState } from "react";
import PhoneShell from "@/components/PhoneShell";
import { FAIR_ELECTRIC_RATE, FAIR_WATER_RATE } from "@/lib/billing";

// ปุ่ม 4: คลังความรู้ & สิทธิผู้เช่า

const FAQS: { q: string; a: string }[] = [
  {
    q: "เจ้าของหอคิดค่าไฟหน่วยละ 7-8 บาท ผิดกฎหมายไหม?",
    a: "การไฟฟ้าคิดจริงประมาณ 4.2 บาท/หน่วย การบวกเกินมากถือว่าเอาเปรียบผู้บริโภค สามารถแจ้ง สคบ. หรือร้องเรียนผ่านเมนู 🚨 ได้",
  },
  {
    q: "มัดจำต้องได้คืนเต็มจำนวนไหม?",
    a: "ต้องได้คืนเต็มหากไม่มีความเสียหาย เจ้าของหักได้เฉพาะค่าเสียหายจริงพร้อมหลักฐาน และต้องคืนภายในเวลาที่ตกลง",
  },
  {
    q: "สัญญาบอกว่าออกก่อนกำหนดยึดมัดจำทั้งหมด ทำได้ไหม?",
    a: "สัญญาเช่าที่พักเพื่ออยู่อาศัยอยู่ภายใต้ประกาศ สคบ. ข้อสัญญาที่ไม่เป็นธรรมอาจใช้บังคับไม่ได้ ควรให้หอ Verified ที่ผ่านการตรวจสัญญาแล้ว",
  },
  {
    q: "ทำไมควรเลือกหอที่มีตรา Verified?",
    a: "หอ Verified ผ่านการตรวจสัญญาเป็นธรรม ใช้ Smart Billing โปร่งใส และผ่านเกณฑ์ความปลอดภัยพื้นฐาน ลดความเสี่ยงโดนเอาเปรียบ",
  },
];

export default function KnowledgePage() {
  return (
    <PhoneShell title="คลังความรู้ & สิทธิผู้เช่า" subtitle="สัญญามาตรฐาน · คำนวณค่าน้ำไฟ · FAQ" back="/">
      <div className="p-4 space-y-5 pb-10">
        <UtilityCalculator />

        <section>
          <h3 className="font-bold text-gray-800 mb-2 text-sm">📄 เอกสารมาตรฐาน</h3>
          <div className="space-y-2">
            <DocRow icon="📝" title="สัญญาเช่าหอพักมาตรฐาน (เป็นธรรม)" note="อ้างอิงประกาศ สคบ." />
            <DocRow icon="✅" title="เช็กลิสต์ก่อนเซ็นสัญญา 10 ข้อ" note="กันหมกเม็ดค่าปรับ" />
            <DocRow icon="📸" title="แบบฟอร์มบันทึกสภาพห้อง (วันเข้าอยู่)" note="กันโดนหักมัดจำ" />
          </div>
        </section>

        <section>
          <h3 className="font-bold text-gray-800 mb-2 text-sm">❓ คำถามที่พบบ่อย (FAQ)</h3>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>
      </div>
    </PhoneShell>
  );
}

function UtilityCalculator() {
  const [units, setUnits] = useState(140);
  const [rate, setRate] = useState(7);
  const fair = Math.round(units * FAIR_ELECTRIC_RATE);
  const charged = Math.round(units * rate);
  const overcharge = charged - fair;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="font-bold text-gray-800 text-sm mb-1">🧮 คำนวณค่าไฟตามจริง</h3>
      <p className="text-[11px] text-gray-400 mb-3">
        เทียบอัตราที่หอเก็บ กับอัตราการไฟฟ้าจริง ({FAIR_ELECTRIC_RATE} บาท/หน่วย)
      </p>

      <label className="text-xs text-gray-500">หน่วยไฟที่ใช้ (หน่วย)</label>
      <input
        type="number"
        value={units}
        onChange={(e) => setUnits(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:border-kku outline-none"
      />
      <label className="text-xs text-gray-500">อัตราที่หอเก็บ (บาท/หน่วย)</label>
      <input
        type="number"
        value={rate}
        step={0.1}
        onChange={(e) => setRate(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-kku outline-none"
      />

      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">ควรจ่ายจริง</span>
          <span className="font-medium text-line-dark">{fair.toLocaleString()} บาท</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">หอเรียกเก็บ</span>
          <span className="font-medium text-gray-800">{charged.toLocaleString()} บาท</span>
        </div>
        <div
          className={`flex justify-between font-bold ${
            overcharge > 0 ? "text-red-600" : "text-line-dark"
          }`}
        >
          <span>{overcharge > 0 ? "จ่ายเกินจริง" : "เป็นธรรม"}</span>
          <span>{overcharge > 0 ? `+${overcharge.toLocaleString()} บาท/เดือน` : "✓"}</span>
        </div>
      </div>
      {overcharge > 0 && (
        <p className="mt-2 text-[11px] text-red-500">
          ⚠️ ปีละ ~{(overcharge * 12).toLocaleString()} บาท — พิจารณาแจ้งผ่านเมนูร้องเรียน
        </p>
      )}
      <p className="mt-2 text-[10px] text-gray-400">
        น้ำประปาอ้างอิง ~{FAIR_WATER_RATE} บาท/หน่วย (แล้วแต่พื้นที่)
      </p>
    </div>
  );
}

function DocRow({ icon, title, note }: { icon: string; title: string; note: string }) {
  return (
    <button className="w-full flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 text-left active:bg-gray-50">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{title}</div>
        <div className="text-[11px] text-gray-400">{note}</div>
      </div>
      <span className="text-gray-300">›</span>
    </button>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 p-3 text-left"
      >
        <span className="text-sm font-medium text-gray-800">{q}</span>
        <span className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && <p className="px-3 pb-3 text-xs text-gray-500 leading-relaxed">{a}</p>}
    </div>
  );
}
