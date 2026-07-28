"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, MapPin, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, CreditCard } from "lucide-react";
import PhoneShell from "@/components/PhoneShell";
import { matchDorms } from "@/lib/match";
import type { MatchResult, QuizAnswers } from "@/lib/types";

const RANK_ICONS = [
  <Trophy key="1" className="w-5 h-5 text-amber-500" />,
  <Trophy key="2" className="w-5 h-5 text-gray-400" />,
  <Trophy key="3" className="w-5 h-5 text-orange-600" />,
];

export default function ResultPage() {
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("kku_quiz");
    if (!raw) {
      setResults([]);
      return;
    }
    const a = JSON.parse(raw) as QuizAnswers;
    setAnswers(a);
    setResults(matchDorms(a, 3));
  }, []);

  if (results === null) {
    return (
      <PhoneShell title="กำลังประมวลผล" back="/quiz">
        <div className="p-10 text-center text-gray-400">กำลังจับคู่หอที่ใช่…</div>
      </PhoneShell>
    );
  }

  if (results.length === 0) {
    return (
      <PhoneShell title="ผลการจับคู่" back="/quiz">
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm mb-4">
            ยังไม่มีคำตอบแบบทดสอบ ลองทำ Smart Quiz ก่อนนะ
          </p>
          <Link href="/quiz" className="inline-block bg-kku text-white px-5 py-2.5 rounded-full text-sm font-bold">
            เริ่มทำ Smart Quiz
          </Link>
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell title="ผลการจับคู่หอที่ใช่" subtitle="3 อันดับที่ยังมีห้องว่างจริง" back="/quiz">
      <div className="p-4 space-y-4">
        <div className="rounded-xl bg-kku/5 border border-kku/15 p-3 text-xs text-kku-dark leading-relaxed flex gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            ประมวลผลจากงบ {answers?.monthlyBudget.toLocaleString()} บาท/เดือน · คณะ
            {answers?.faculty} · เดินทาง ≤ {answers?.maxTravel} นาที
          </span>
        </div>

        {results.map((r, i) => (
          <ResultCard key={r.dorm.id} r={r} rank={i} loan={!!answers?.wantsDepositLoan} />
        ))}

        <Link
          href="/quiz"
          className="block text-center text-sm text-kku font-medium py-3 border border-kku/30 rounded-xl"
        >
          ปรับคำตอบแล้วค้นหาใหม่
        </Link>
      </div>
    </PhoneShell>
  );
}

function ResultCard({ r, rank, loan }: { r: MatchResult; rank: number; loan: boolean }) {
  const d = r.dorm;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 grid place-items-center text-2xl shrink-0">
          {d.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {RANK_ICONS[rank]}
            <span className="font-bold text-gray-800 truncate">{d.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>โซน{d.zone}</span>
            {d.verified && (
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* match score bar */}
      <div className="px-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500">Match Score</span>
          <span className="font-bold text-kku">เหมาะกับคุณ {r.score}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-kku-light to-kku" style={{ width: `${r.score}%` }} />
        </div>
      </div>

      {/* cost breakdown */}
      <div className="p-4 grid grid-cols-2 gap-3 mt-2">
        <Stat
          label="Total Cost / เดือน"
          value={`${r.totalCost.toLocaleString()} ฿`}
          sub={`ห้อง ${d.rent.toLocaleString()} + ไฟ ${d.estElectric} + น้ำ ${d.estWater} + เน็ต ${d.internet}`}
          accent
        />
        <Stat
          label="ค่าแรกเข้า"
          value={`${d.deposit.toLocaleString()} ฿`}
          sub={contractLabel(d.minContract)}
        />
        <Stat label="เดินทางไปคณะ" value={`${r.travelMinutes} นาที`} sub="ตามวิธีที่เลือก" />
        <Stat label="ห้องว่าง" value={`${d.vacant} ห้อง`} sub={`⭐ ${d.rating.toFixed(1)}`} />
      </div>

      {/* highlights */}
      <div className="px-4 pb-3">
        <p className="text-xs font-semibold text-gray-500 mb-1.5">จุดเด่น</p>
        <div className="flex flex-wrap gap-1.5">
          {r.reasons.map((x, i) => (
            <span key={i} className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {x}
            </span>
          ))}
        </div>
      </div>

      {/* warnings */}
      {r.warnings.length > 0 && (
        <div className="px-4 pb-3">
          <p className="text-xs font-semibold text-gray-500 mb-1.5">ข้อควรระวัง</p>
          <div className="space-y-1.5">
            {r.warnings.map((x, i) => (
              <div key={i} className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* deposit loan CTA */}
      {r.overDeposit > 0 && loan && (
        <Link
          href="/loan"
          className="flex items-center justify-center gap-2 bg-kku/5 border-t border-kku/10 px-4 py-3 text-sm font-semibold text-kku"
        >
          <CreditCard className="w-4 h-4" />
          ค่าแรกเข้าเกินงบ {r.overDeposit.toLocaleString()} บาท — คลิกขอสิทธิ์ผ่อนมัดจำ
        </Link>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-[10px] text-gray-400">{label}</div>
      <div className={`font-bold ${accent ? "text-kku text-lg" : "text-gray-800"}`}>{value}</div>
      {sub && <div className="text-[10px] text-gray-400 leading-tight mt-0.5">{sub}</div>}
    </div>
  );
}

function contractLabel(c: string): string {
  return { monthly: "สัญญารายเดือน", "3m": "สัญญา 3 เดือน", "6m": "สัญญา 6 เดือน", "1y": "สัญญา 1 ปี" }[c] ?? c;
}
