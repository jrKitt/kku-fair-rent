"use client";

import { useState } from "react";
import { Calculator, FileText, CheckSquare, Camera, HelpCircle, ChevronDown, AlertTriangle, CheckCircle2 } from "lucide-react";
import PhoneShell from "@/components/PhoneShell";
import { FAIR_ELECTRIC_RATE, FAIR_WATER_RATE } from "@/lib/billing";

// ปุ่ม 4: คลังความรู้ & สิทธิผู้เช่า

const FAQS: { q: string; a: string }[] = [
  {
    q: "เจ้าของหอคิดค่าไฟหน่วยละ 7–8 บาท ผิดกฎหมายไหม?",
    a: "การไฟฟ้าคิดจริงประมาณ 4.2 บาท/หน่วย การบวกเกินมากถือว่าเอาเปรียบผู้บริโภค สามารถแจ้ง สคบ. โทร. 1166 หรือร้องเรียนผ่านเมนู ร้องเรียน ได้เลย",
  },
  {
    q: "เงินประกัน คืออะไร และต้องได้คืนเมื่อไหร่?",
    a: "เงินประกัน คือเงินที่ผู้เช่าวางไว้เพื่อเป็นหลักประกันความเสียหายต่อทรัพย์สินของหอพัก ตาม พ.ร.บ.หอพัก ม.11 เรียกเก็บได้ไม่เกิน 1 เดือนของค่าเช่า และต้องคืนภายใน 7 วัน หลังจากผู้เช่าย้ายออก โดยหักเฉพาะค่าเสียหายที่มีหลักฐานชัดเจนเท่านั้น (หมายเหตุ: เงินประกัน ≠ เงินมัดจำ — เงินมัดจำตาม ป.พ.พ. ม.377 เป็นคนละประเภทกัน)",
  },
  {
    q: "ค่าเช่าล่วงหน้า + เงินประกัน เรียกเก็บรวมกันได้เท่าไหร่?",
    a: "ตาม พ.ร.บ.หอพัก ม.10 ผู้ประกอบการเรียกเก็บค่าเช่าล่วงหน้าและเงินประกันรวมกันได้ไม่เกิน 3 เดือนของอัตราค่าเช่ารายเดือน หากผู้เช่าขอเลิกสัญญาก่อนครบกำหนด ผู้เช่าจะขอค่าเช่าล่วงหน้าคืนไม่ได้ แต่ยังคงมีสิทธิ์รับเงินประกันคืนตามเงื่อนไขปกติ",
  },
  {
    q: "ออกก่อนกำหนด ต้องทำอย่างไรถึงจะได้เงินประกันคืน?",
    a: "ตามประกาศ สคบ. ผู้เช่าต้องแจ้งบอกเลิกสัญญาเป็น หนังสือ ล่วงหน้าไม่น้อยกว่า 30 วัน จึงจะมีสิทธิ์รับเงินประกันคืน หากแจ้งน้อยกว่า 30 วันหรือแจ้งด้วยวาจา ผู้ประกอบการอาจมีสิทธิ์หักค่าเสียหายจากการบอกเลิกสัญญาผิดเงื่อนไขได้",
  },
  {
    q: "สัญญาบอกว่าออกก่อนกำหนดยึดเงินทั้งหมด ทำได้ไหม?",
    a: "สัญญาเช่าที่พักอาศัยอยู่ภายใต้ประกาศ สคบ. ข้อสัญญาที่ไม่เป็นธรรม เช่น การยึดเงินประกันและค่าเช่าล่วงหน้าทั้งหมดโดยไม่คำนึงถึงความเสียหายจริง อาจใช้บังคับไม่ได้ตามกฎหมาย แนะนำให้เลือกหอ KKU Verified ที่ผ่านการตรวจสัญญาแล้ว",
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
          <h3 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-kku" />
            เอกสารมาตรฐาน
          </h3>
          <div className="space-y-2">
            <DocRow icon={FileText} title="สัญญาเช่าหอพักมาตรฐาน (เป็นธรรม)" note="อ้างอิงประกาศ สคบ." />
            <DocRow icon={CheckSquare} title="เช็กลิสต์ก่อนเซ็นสัญญา 10 ข้อ" note="กันหมกเม็ดค่าปรับ" />
            <DocRow icon={Camera} title="แบบฟอร์มบันทึกสภาพห้อง (วันเข้าอยู่)" note="กันโดนหักมัดจำ" />
          </div>
        </section>

        <section>
          <h3 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-kku" />
            คำถามที่พบบ่อย (FAQ)
          </h3>
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
      <h3 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-kku" />
        คำนวณค่าไฟตามจริง
      </h3>
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
          <span className="font-medium text-emerald-700">{fair.toLocaleString()} บาท</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">หอเรียกเก็บ</span>
          <span className="font-medium text-gray-800">{charged.toLocaleString()} บาท</span>
        </div>
        <div
          className={`flex justify-between items-center font-bold ${
            overcharge > 0 ? "text-red-600" : "text-emerald-700"
          }`}
        >
          <span className="flex items-center gap-1">
            {overcharge > 0 ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {overcharge > 0 ? "จ่ายเกินจริง" : "เป็นธรรม"}
          </span>
          <span>{overcharge > 0 ? `+${overcharge.toLocaleString()} บาท/เดือน` : "✓"}</span>
        </div>
      </div>
      {overcharge > 0 && (
        <div className="mt-2 text-[11px] text-red-600 flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            ปีละ ~{(overcharge * 12).toLocaleString()} บาท — พิจารณาแจ้งผ่านเมนูร้องเรียน
          </span>
        </div>
      )}
      <p className="mt-2 text-[10px] text-gray-400">
        น้ำประปาอ้างอิง ~{FAIR_WATER_RATE} บาท/หน่วย (แล้วแต่พื้นที่)
      </p>
    </div>
  );
}

function DocRow({ icon: Icon, title, note }: { icon: React.ComponentType<{ className?: string }>; title: string; note: string }) {
  return (
    <button className="w-full flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 text-left active:bg-gray-50">
      <div className="w-9 h-9 rounded-lg bg-kku/5 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-kku" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{title}</div>
        <div className="text-[11px] text-gray-400">{note}</div>
      </div>
      <ChevronDown className="w-5 h-5 text-gray-300 -rotate-90" />
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
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-3 pb-3 text-xs text-gray-500 leading-relaxed">{a}</p>}
    </div>
  );
}
