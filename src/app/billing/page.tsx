"use client";

import { useState } from "react";
import PhoneShell from "@/components/PhoneShell";
import {
  CURRENT_BILL,
  USAGE_HISTORY,
  REWARDS,
  billTotal,
  electricCost,
  waterCost,
  totalEcoPoints,
  FAIR_ELECTRIC_RATE,
} from "@/lib/billing";

type Tab = "bill" | "eco";

export default function BillingPage() {
  const [tab, setTab] = useState<Tab>("bill");
  const b = CURRENT_BILL;
  const points = totalEcoPoints();
  const maxUnits = Math.max(...USAGE_HISTORY.map((m) => Math.max(m.units, m.buildingAvg)));

  return (
    <PhoneShell title="บิลค่าหอ & Eco-Points" subtitle={b.dormName} back="/">
      <div className="p-4">
        {/* tabs */}
        <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-xl p-1 mb-4">
          <TabBtn active={tab === "bill"} onClick={() => setTab("bill")}>
            🧾 บิลเดือนนี้
          </TabBtn>
          <TabBtn active={tab === "eco"} onClick={() => setTab("eco")}>
            🌱 Eco-Points
          </TabBtn>
        </div>

        {tab === "bill" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-kku text-white px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/70">บิลกลาง Smart Billing</div>
                  <div className="font-bold">{b.month}</div>
                </div>
                {b.verified && (
                  <span className="text-[11px] bg-white/20 px-2 py-1 rounded-full">
                    ✓ หอ Verified
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2.5">
                <Row label="ค่าเช่าห้อง" value={b.rent} />
                <Row
                  label="ค่าไฟฟ้า"
                  detail={`${b.electricUnits} หน่วย × ${b.electricRate} ฿/หน่วย`}
                  value={electricCost(b)}
                  transparent
                />
                <Row
                  label="ค่าน้ำ"
                  detail={`${b.waterUnits} หน่วย × ${b.waterRate} ฿/หน่วย`}
                  value={waterCost(b)}
                  transparent
                />
                <Row label="อินเทอร์เน็ต / ส่วนกลาง" value={b.internet} />
                {b.loanInstallment ? (
                  <Row
                    label="งวดผ่อนมัดจำ (2/3)"
                    detail="กองทุนยืมมัดจำฉุกเฉิน มข."
                    value={b.loanInstallment}
                    loan
                  />
                ) : null}

                <div className="border-t border-dashed border-gray-200 pt-3 mt-1 flex items-center justify-between">
                  <span className="font-bold text-gray-800">รวมทั้งสิ้น</span>
                  <span className="font-bold text-kku text-xl">
                    {billTotal(b).toLocaleString()} ฿
                  </span>
                </div>
              </div>
            </div>

            {/* transparency note */}
            <div className="rounded-xl bg-green-50 border border-green-200 p-3">
              <div className="text-xs text-green-800 leading-relaxed">
                🔍 <b>ค่าไฟโปร่งใส:</b> หอนี้คิด {b.electricRate} ฿/หน่วย เท่ากับอัตราการไฟฟ้าจริง
                (เกณฑ์เป็นธรรม ≤ {FAIR_ELECTRIC_RATE} ฿) — ไม่มีการบวกกำไรค่าไฟแฝง
              </div>
            </div>

            <button className="w-full bg-line text-white font-bold py-3 rounded-xl text-sm">
              💚 ชำระบิลผ่าน LINE Pay
            </button>
          </div>
        )}

        {tab === "eco" && (
          <div className="space-y-4">
            {/* points card */}
            <div className="bg-gradient-to-br from-line to-line-dark text-white rounded-2xl p-5">
              <div className="text-white/80 text-xs">Eco-Points สะสม</div>
              <div className="text-4xl font-bold mt-1">{points}</div>
              <div className="text-white/80 text-xs mt-1">
                🌱 คุณใช้ไฟต่ำกว่าค่าเฉลี่ยตึก 4 เดือนติด
              </div>
            </div>

            {/* usage chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  การใช้ไฟเทียบค่าเฉลี่ยตึก
                </span>
                <span className="text-[10px] text-gray-400">หน่วย/เดือน</span>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {USAGE_HISTORY.map((m) => {
                  const under = m.units < m.buildingAvg;
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center gap-0.5 h-24">
                        <div
                          className={`w-2.5 rounded-t ${under ? "bg-line" : "bg-red-400"}`}
                          style={{ height: `${(m.units / maxUnits) * 100}%` }}
                          title={`ห้องคุณ ${m.units}`}
                        />
                        <div
                          className="w-2.5 rounded-t bg-gray-200"
                          style={{ height: `${(m.buildingAvg / maxUnits) * 100}%` }}
                          title={`เฉลี่ยตึก ${m.buildingAvg}`}
                        />
                      </div>
                      <span className="text-[9px] text-gray-400">{m.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-line inline-block" /> ห้องคุณ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-gray-300 inline-block" /> เฉลี่ยตึก
                </span>
              </div>
            </div>

            {/* rewards */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                แลกแต้มกับร้านพันธมิตรรอบ มข.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {REWARDS.map((r) => {
                  const can = points >= r.cost;
                  return (
                    <div
                      key={r.name}
                      className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col"
                    >
                      <div className="text-2xl">{r.icon}</div>
                      <div className="font-semibold text-sm text-gray-800 mt-1">{r.name}</div>
                      <div className="text-[10px] text-gray-400 flex-1 leading-tight mt-0.5">
                        {r.partner}
                      </div>
                      <button
                        disabled={!can}
                        className={`mt-2 text-xs font-bold py-2 rounded-lg ${
                          can ? "bg-kku text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {r.cost} แต้ม
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneShell>
  );
}

function TabBtn({
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
      className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
        active ? "bg-white text-kku shadow-sm" : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

function Row({
  label,
  detail,
  value,
  transparent,
  loan,
}: {
  label: string;
  detail?: string;
  value: number;
  transparent?: boolean;
  loan?: boolean;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className={`text-sm ${loan ? "text-kku font-medium" : "text-gray-700"}`}>
          {label}
          {transparent && (
            <span className="ml-1 text-[10px] text-green-600 font-medium">โปร่งใส</span>
          )}
        </div>
        {detail && <div className="text-[11px] text-gray-400">{detail}</div>}
      </div>
      <span className="text-sm font-semibold text-gray-800">{value.toLocaleString()} ฿</span>
    </div>
  );
}
