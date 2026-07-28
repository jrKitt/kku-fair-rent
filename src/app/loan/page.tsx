"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PhoneShell from "@/components/PhoneShell";

// นโยบายที่ 2: Data-Driven Deposit Loan
// ระบบคัดกรอง (Screening Tool) เชื่อมกองทุนเงินยืมฉุกเฉิน กองพัฒนานักศึกษา มข.

interface Form {
  passedQuiz: boolean;
  monthlyBudget: number;
  dormRent: number; // ค่าเช่า+น้ำไฟรวม (Total Cost)
  dormVerified: boolean;
  depositNeeded: number;
  cashOnHand: number;
  installments: number; // 3-6
}

export default function LoanPage() {
  const [f, setF] = useState<Form>({
    passedQuiz: true,
    monthlyBudget: 4500,
    dormRent: 4720,
    dormVerified: true,
    depositNeeded: 8000,
    cashOnHand: 4000,
    installments: 3,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const shortfall = Math.max(0, f.depositNeeded - f.cashOnHand);
  const perInstallment = Math.ceil(shortfall / f.installments);

  // เกณฑ์อนุมัติ: ราคาหอสมเหตุสมผลกับงบ (Total Cost ≤ งบ*1.1),
  // ผ่าน Smart Quiz, หอ Verified, และขาดเฉพาะสภาพคล่องมัดจำ
  const checks = useMemo(() => {
    const affordability = f.dormRent <= f.monthlyBudget * 1.1;
    return [
      {
        ok: f.passedQuiz,
        label: "ทำแบบทดสอบ Smart Quiz แล้ว",
        why: "ยืนยันว่าเลือกหออย่างมีข้อมูล",
      },
      {
        ok: affordability,
        label: "ค่าหอสมเหตุสมผลกับงบรายเดือน",
        why: `Total Cost ${f.dormRent.toLocaleString()} ต้องไม่เกินงบ+10% (${Math.round(
          f.monthlyBudget * 1.1
        ).toLocaleString()})`,
      },
      {
        ok: f.dormVerified,
        label: "หอพักได้ตรา KKU Fair-Rent Verified",
        why: "กองทุนโอนมัดจำตรงเข้าบัญชีหอ Verified เท่านั้น (กันหนี้สูญ)",
      },
      {
        ok: shortfall > 0,
        label: "ขาดสภาพคล่องเฉพาะเงินมัดจำแรกเข้า",
        why: "ยืมเฉพาะส่วนที่ขาด ไม่ใช่ยืมทั้งก้อน",
      },
    ];
  }, [f, shortfall]);

  const approved = checks.every((c) => c.ok);

  return (
    <PhoneShell title="ขอทุนมัดจำฉุกเฉิน" subtitle="Data-Driven Deposit Loan · กองทุน มข." back="/">
      <div className="p-4 space-y-4 pb-10">
        <div className="rounded-xl bg-kku/5 border border-kku/15 p-3 text-xs text-kku-dark leading-relaxed">
          🆘 ระบบนี้เป็น <b>เครื่องมือคัดกรอง</b> เชื่อมต่อ “กองทุนเงินยืมฉุกเฉิน
          กองพัฒนานักศึกษา มข.” — มหาวิทยาลัยไม่ต้องตั้งกองทุนใหม่ เงินมัดจำโอนตรงเข้าหอ Verified
          และผ่อนคืนผ่าน Smart Billing
        </div>

        {!submitted ? (
          <>
            <Field label="งบค่าหอรวม/เดือนที่ไหว (บาท)">
              <NumInput value={f.monthlyBudget} onChange={(v) => set("monthlyBudget", v)} />
            </Field>
            <Field label="Total Cost ของหอที่เลือก (บาท/เดือน)">
              <NumInput value={f.dormRent} onChange={(v) => set("dormRent", v)} />
            </Field>
            <Field label="ค่าแรกเข้าที่ต้องจ่าย (บาท)">
              <NumInput value={f.depositNeeded} onChange={(v) => set("depositNeeded", v)} />
            </Field>
            <Field label="เงินที่มีตอนนี้ (บาท)">
              <NumInput value={f.cashOnHand} onChange={(v) => set("cashOnHand", v)} />
            </Field>

            <Field label="หอที่เลือกได้ตรา Verified ไหม?">
              <div className="grid grid-cols-2 gap-2">
                <Toggle active={f.dormVerified} onClick={() => set("dormVerified", true)}>
                  ✓ Verified
                </Toggle>
                <Toggle active={!f.dormVerified} onClick={() => set("dormVerified", false)}>
                  ยังไม่ Verified
                </Toggle>
              </div>
            </Field>

            <Field label="ต้องการผ่อนกี่งวด?">
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 6].map((n) => (
                  <Toggle key={n} active={f.installments === n} onClick={() => set("installments", n)}>
                    {n} งวด
                  </Toggle>
                ))}
              </div>
            </Field>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <Row label="ยอดที่ขาด (Shortfall)" value={`${shortfall.toLocaleString()} บาท`} strong />
              <Row
                label={`ผ่อน ${f.installments} งวด (รวมใน Smart Billing)`}
                value={`${perInstallment.toLocaleString()} บาท/เดือน`}
              />
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3.5 rounded-xl bg-kku text-white font-bold text-sm"
            >
              ตรวจสอบสิทธิ์
            </button>
          </>
        ) : (
          <Result
            approved={approved}
            checks={checks}
            shortfall={shortfall}
            perInstallment={perInstallment}
            installments={f.installments}
            onReset={() => setSubmitted(false)}
          />
        )}
      </div>
    </PhoneShell>
  );
}

function Result({
  approved,
  checks,
  shortfall,
  perInstallment,
  installments,
  onReset,
}: {
  approved: boolean;
  checks: { ok: boolean; label: string; why: string }[];
  shortfall: number;
  perInstallment: number;
  installments: number;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl p-5 text-center ${
          approved ? "bg-line/10 border border-line/30" : "bg-amber-50 border border-amber-200"
        }`}
      >
        <div className="text-4xl mb-2">{approved ? "✅" : "⚠️"}</div>
        <div className={`font-bold text-lg ${approved ? "text-line-dark" : "text-amber-700"}`}>
          {approved ? "ผ่านเกณฑ์คัดกรองเบื้องต้น" : "ยังไม่ผ่านเกณฑ์บางข้อ"}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {approved
            ? "ระบบส่งคำขอต่อไปยังกองพัฒนานักศึกษา มข. เพื่ออนุมัติขั้นสุดท้าย"
            : "แก้ไขข้อที่ยังไม่ผ่านด้านล่างแล้วลองใหม่"}
        </p>
      </div>

      <div className="space-y-2">
        {checks.map((c, i) => (
          <div key={i} className="flex gap-2 bg-white border border-gray-100 rounded-xl p-3">
            <span className="text-lg">{c.ok ? "✅" : "❌"}</span>
            <div>
              <div className="text-sm font-medium text-gray-800">{c.label}</div>
              <div className="text-[11px] text-gray-400">{c.why}</div>
            </div>
          </div>
        ))}
      </div>

      {approved && (
        <div className="rounded-xl bg-kku/5 border border-kku/15 p-4">
          <p className="text-sm font-semibold text-kku-dark mb-2">แผนการผ่อนชำระ</p>
          <Row label="วงเงินที่อนุมัติ" value={`${shortfall.toLocaleString()} บาท`} strong />
          <Row label="จำนวนงวด" value={`${installments} งวด`} />
          <Row label="ผ่อน/เดือน (ใน Smart Billing)" value={`${perInstallment.toLocaleString()} บาท`} />
          <div className="mt-3 text-[11px] text-gray-500 leading-relaxed border-t border-kku/10 pt-2">
            🔒 เงินโอนตรงจากกองทุนไปบัญชีหอ Verified · ติดตามการชำระเรียลไทม์ ·
            ควบคุมความเสี่ยงหนี้สูญ 100%
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onReset} className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium">
          แก้ไขข้อมูล
        </button>
        <Link
          href="/billing"
          className="flex-1 py-3 rounded-xl bg-kku text-white text-sm font-bold text-center"
        >
          ดูบิล & การผ่อน
        </Link>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      {children}
    </div>
  );
}

function NumInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:border-kku outline-none"
    />
  );
}

function Toggle({
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
      className={`py-2.5 rounded-xl border text-sm font-medium ${
        active ? "bg-kku text-white border-kku" : "bg-white text-gray-600 border-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={strong ? "font-bold text-kku" : "text-gray-800 font-medium"}>{value}</span>
    </div>
  );
}
