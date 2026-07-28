"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneShell from "@/components/PhoneShell";
import { FACULTIES } from "@/lib/faculties";
import { AMENITY_LABELS } from "@/lib/match";
import type { QuizAnswers, Transport, RoomType, ContractDuration } from "@/lib/types";

const TOTAL = 6;

const DEPOSIT_OPTIONS = [
  { key: "<3000", label: "น้อยกว่า 3,000" },
  { key: "3000-5000", label: "3,000 – 5,000" },
  { key: "5001-8000", label: "5,001 – 8,000" },
  { key: "8001-10000", label: "8,001 – 10,000" },
  { key: ">10000", label: "มากกว่า 10,000" },
];

const TRANSPORTS: { key: Transport; label: string; icon: string }[] = [
  { key: "walk", label: "เดิน", icon: "🚶" },
  { key: "motorcycle", label: "มอเตอร์ไซค์", icon: "🛵" },
  { key: "songthaew", label: "รถสองแถว", icon: "🚐" },
  { key: "other", label: "อื่นๆ", icon: "🚗" },
];

const AMENITY_CHOICES = ["wifi", "washer", "parking", "lift", "aircon", "gym", "keycard"];

const CONCERN_CHOICES = ["กลับดึก", "ทางเปลี่ยว", "เสียงดัง", "น้ำท่วม", "ความสะอาด"];

const CONTRACTS: { key: ContractDuration; label: string }[] = [
  { key: "monthly", label: "รายเดือน" },
  { key: "3m", label: "3 เดือน" },
  { key: "6m", label: "6 เดือน" },
  { key: "1y", label: "1 ปี" },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [a, setA] = useState<QuizAnswers>({
    monthlyBudget: 4500,
    depositBudget: "5001-8000",
    wantsDepositLoan: true,
    faculty: "",
    transport: "motorcycle",
    maxTravel: 10,
    roomType: "single",
    needAir: true,
    amenities: [],
    securityLevel: "medium",
    concerns: [],
    contract: "1y",
  });

  const set = <K extends keyof QuizAnswers>(k: K, v: QuizAnswers[K]) =>
    setA((p) => ({ ...p, [k]: v }));

  const toggleAmenity = (x: string) => {
    setA((p) => {
      const has = p.amenities.includes(x);
      if (has) return { ...p, amenities: p.amenities.filter((y) => y !== x) };
      if (p.amenities.length >= 3) return p; // top 3 only
      return { ...p, amenities: [...p.amenities, x] };
    });
  };

  const toggleConcern = (x: string) =>
    setA((p) => ({
      ...p,
      concerns: p.concerns.includes(x)
        ? p.concerns.filter((y) => y !== x)
        : [...p.concerns, x],
    }));

  const next = () => {
    if (step < TOTAL) setStep(step + 1);
    else {
      sessionStorage.setItem("kku_quiz", JSON.stringify(a));
      router.push("/result");
    }
  };
  const prev = () => (step > 1 ? setStep(step - 1) : router.push("/"));

  const canNext = step === 2 ? a.faculty !== "" : true;

  return (
    <PhoneShell title="Smart Quiz" subtitle={`ค้นหาหอที่ใช่ · ข้อ ${step}/${TOTAL}`} back="/">
      {/* progress */}
      <div className="px-4 pt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-kku transition-all"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-4 pb-28">
        {step === 1 && (
          <Section
            n={1}
            title="งบประมาณและสภาพคล่อง"
            desc="Budget & Initial Cash flow"
          >
            <Label>งบค่าเช่าเบ็ดเสร็จรวมน้ำไฟต่อเดือนที่จ่ายไหว?</Label>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                value={a.monthlyBudget}
                onChange={(e) => set("monthlyBudget", Number(e.target.value))}
                className="w-40 text-2xl font-bold text-kku border-b-2 border-kku/40 focus:border-kku outline-none py-1 bg-transparent"
              />
              <span className="text-gray-500">บาท / เดือน</span>
            </div>
            <input
              type="range"
              min={2000}
              max={9000}
              step={100}
              value={a.monthlyBudget}
              onChange={(e) => set("monthlyBudget", Number(e.target.value))}
              className="w-full mt-3 accent-kku"
            />

            <Label className="mt-5">งบค่าแรกเข้าสูงสุด (จอง + มัดจำ + ล่วงหน้า)?</Label>
            <div className="grid grid-cols-1 gap-2">
              {DEPOSIT_OPTIONS.map((o) => (
                <Choice
                  key={o.key}
                  active={a.depositBudget === o.key}
                  onClick={() => set("depositBudget", o.key)}
                >
                  {o.label} บาท
                </Choice>
              ))}
            </div>

            <Label className="mt-5">
              หากเจอหอตรงสเปกแต่ค่าแรกเข้าสูง สนใจระบบผ่อนมัดจำ/ช่วยค่าแรกเข้าไหม?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Choice active={a.wantsDepositLoan} onClick={() => set("wantsDepositLoan", true)}>
                สนใจ
              </Choice>
              <Choice active={!a.wantsDepositLoan} onClick={() => set("wantsDepositLoan", false)}>
                ไม่สนใจ
              </Choice>
            </div>
          </Section>
        )}

        {step === 2 && (
          <Section n={2} title="ทำเลและการเดินทาง" desc="Location & Mobility">
            <Label>คุณเรียนคณะอะไร?</Label>
            <select
              value={a.faculty}
              onChange={(e) => set("faculty", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white text-sm focus:border-kku outline-none"
            >
              <option value="">— เลือกคณะ —</option>
              {FACULTIES.map((f) => (
                <option key={f.id} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>

            <Label className="mt-5">เดินทางหลักด้วยวิธีไหน?</Label>
            <div className="grid grid-cols-2 gap-2">
              {TRANSPORTS.map((t) => (
                <Choice
                  key={t.key}
                  active={a.transport === t.key}
                  onClick={() => set("transport", t.key)}
                >
                  <span className="mr-1">{t.icon}</span>
                  {t.label}
                </Choice>
              ))}
            </div>

            <Label className="mt-5">
              ยอมรับเวลาเดินทางไปคณะได้สูงสุด{" "}
              <span className="text-kku font-bold">{a.maxTravel} นาที</span>
            </Label>
            <input
              type="range"
              min={5}
              max={40}
              step={1}
              value={a.maxTravel}
              onChange={(e) => set("maxTravel", Number(e.target.value))}
              className="w-full accent-kku"
            />
          </Section>
        )}

        {step === 3 && (
          <Section n={3} title="สไตล์ห้องพักและสิ่งอำนวยความสะดวก" desc="Lifestyle & Amenities">
            <Label>รูปแบบห้อง</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["single", "double"] as RoomType[]).map((r) => (
                <Choice key={r} active={a.roomType === r} onClick={() => set("roomType", r)}>
                  {r === "single" ? "ห้องเดี่ยว" : "ห้องคู่ (แชร์)"}
                </Choice>
              ))}
            </div>

            <Label className="mt-5">จำเป็นต้องมีแอร์ไหม?</Label>
            <div className="grid grid-cols-2 gap-2">
              <Choice active={a.needAir} onClick={() => set("needAir", true)}>
                ต้องมีแอร์
              </Choice>
              <Choice active={!a.needAir} onClick={() => set("needAir", false)}>
                พัดลมก็ได้
              </Choice>
            </div>

            <Label className="mt-5">
              สิ่งอำนวยความสะดวกที่ขาดไม่ได้ 3 อย่างแรก{" "}
              <span className="text-gray-400">({a.amenities.length}/3)</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_CHOICES.map((x) => (
                <Chip
                  key={x}
                  active={a.amenities.includes(x)}
                  onClick={() => toggleAmenity(x)}
                >
                  {AMENITY_LABELS[x] ?? x}
                </Chip>
              ))}
            </div>
          </Section>
        )}

        {step === 4 && (
          <Section n={4} title="ความปลอดภัยและสุขภาวะ" desc="Safety & Environment">
            <Label>ระดับความปลอดภัยที่ต้องการ</Label>
            <div className="grid grid-cols-1 gap-2">
              <Choice
                active={a.securityLevel === "basic"}
                onClick={() => set("securityLevel", "basic")}
              >
                พื้นฐาน — มีไฟส่องสว่าง/กล้องบ้าง
              </Choice>
              <Choice
                active={a.securityLevel === "medium"}
                onClick={() => set("securityLevel", "medium")}
              >
                ปานกลาง — มีกล้อง + คีย์การ์ด
              </Choice>
              <Choice
                active={a.securityLevel === "high"}
                onClick={() => set("securityLevel", "high")}
              >
                สูง — คีย์การ์ด + ยาม + กล้อง + ไฟ
              </Choice>
            </div>

            <Label className="mt-5">สิ่งที่กังวลที่สุด (เลือกได้หลายข้อ)</Label>
            <div className="flex flex-wrap gap-2">
              {CONCERN_CHOICES.map((x) => (
                <Chip key={x} active={a.concerns.includes(x)} onClick={() => toggleConcern(x)}>
                  {x}
                </Chip>
              ))}
            </div>
          </Section>
        )}

        {step === 5 && (
          <Section n={5} title="ระยะเวลาสัญญา" desc="Contract Duration">
            <Label>ต้องการสัญญาเช่าระยะเวลาเท่าใด?</Label>
            <div className="grid grid-cols-2 gap-2">
              {CONTRACTS.map((c) => (
                <Choice key={c.key} active={a.contract === c.key} onClick={() => set("contract", c.key)}>
                  {c.label}
                </Choice>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800 leading-relaxed">
              💡 สัญญาสั้น (รายเดือน) ยืดหยุ่นแต่หอส่วนใหญ่คิดค่าเช่าสูงกว่า ส่วนสัญญา 1 ปี
              มักได้ราคาดีกว่าและมีสิทธิ์ผ่อนมัดจำ
            </div>
          </Section>
        )}

        {step === 6 && (
          <Section n={6} title="ตรวจสอบคำตอบ" desc="ยืนยันก่อนประมวลผลจับคู่หอ">
            <Review label="งบรวม/เดือน" value={`${a.monthlyBudget.toLocaleString()} บาท`} />
            <Review label="งบค่าแรกเข้า" value={`${a.depositBudget} บาท`} />
            <Review label="สนใจผ่อนมัดจำ" value={a.wantsDepositLoan ? "สนใจ" : "ไม่สนใจ"} />
            <Review label="คณะ" value={a.faculty || "—"} />
            <Review
              label="การเดินทาง"
              value={`${TRANSPORTS.find((t) => t.key === a.transport)?.label} ≤ ${a.maxTravel} นาที`}
            />
            <Review label="ห้อง" value={`${a.roomType === "single" ? "เดี่ยว" : "คู่"} · ${a.needAir ? "มีแอร์" : "พัดลม"}`} />
            <Review
              label="ต้องมี"
              value={a.amenities.map((x) => AMENITY_LABELS[x] ?? x).join(", ") || "—"}
            />
            <Review label="ความปลอดภัย" value={a.securityLevel} />
            <Review label="สัญญา" value={CONTRACTS.find((c) => c.key === a.contract)?.label ?? ""} />
          </Section>
        )}
      </div>

      {/* sticky footer nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-3">
        <button
          onClick={prev}
          className="px-5 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium text-sm"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={next}
          disabled={!canNext}
          className="flex-1 py-3 rounded-xl bg-kku text-white font-bold text-sm disabled:opacity-40"
        >
          {step === TOTAL ? "🎯 ประมวลผลหาหอที่ใช่" : "ถัดไป"}
        </button>
      </div>
    </PhoneShell>
  );
}

function Section({
  n,
  title,
  desc,
  children,
}: {
  n: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-4 mb-4">
        <div className="text-xs font-semibold text-kku">ข้อที่ {n}</div>
        <h2 className="text-lg font-bold text-gray-800 leading-tight">{title}</h2>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm font-medium text-gray-700 mb-2 ${className}`}>{children}</p>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
        active
          ? "bg-kku text-white border-kku"
          : "bg-white text-gray-700 border-gray-200 hover:border-kku/40"
      }`}
    >
      {children}
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm border transition-colors ${
        active
          ? "bg-kku text-white border-kku"
          : "bg-white text-gray-600 border-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-800 font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}
