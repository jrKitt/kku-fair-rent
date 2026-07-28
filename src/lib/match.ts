import { DORMS } from "./dorms";
import type { Dorm, MatchResult, QuizAnswers } from "./types";

export const DEPOSIT_BUCKETS: Record<string, number> = {
  "<3000": 3000,
  "3000-5000": 5000,
  "5001-8000": 8000,
  "8001-10000": 10000,
  ">10000": 999999,
};

export const AMENITY_LABELS: Record<string, string> = {
  wifi: "Wi-Fi",
  washer: "เครื่องซักผ้า",
  parking: "ที่จอดมอเตอร์ไซค์",
  lift: "ลิฟต์",
  aircon: "แอร์",
  fan: "พัดลม",
  gym: "ฟิตเนส",
  keycard: "คีย์การ์ด",
};

export const SECURITY_LABELS: Record<string, string> = {
  keycard: "คีย์การ์ด",
  guard: "ยาม",
  cctv: "กล้องวงจรปิด",
  lighting: "ไฟส่องสว่าง",
};

export function totalCost(d: Dorm): number {
  return d.rent + d.estElectric + d.estWater + d.internet;
}

const SECURITY_TARGET: Record<QuizAnswers["securityLevel"], number> = {
  basic: 1,
  medium: 2,
  high: 4,
};

// Weighted scoring. Each component contributes to a 0-100 score.
export function scoreDorm(d: Dorm, a: QuizAnswers): MatchResult {
  const cost = totalCost(d);
  const travelMinutes = d.travel[a.transport] ?? d.travel.other;
  const reasons: string[] = [];
  const warnings: string[] = [];

  // --- Budget (30) ---
  let budgetScore = 0;
  const overBudget = Math.max(0, cost - a.monthlyBudget);
  if (cost <= a.monthlyBudget) {
    budgetScore = 30;
    reasons.push("อยู่ในงบรวมต่อเดือน");
  } else {
    const ratio = overBudget / a.monthlyBudget;
    budgetScore = Math.max(0, 30 - ratio * 120);
    warnings.push(`Total Cost สูงกว่างบ ${overBudget.toLocaleString()} บาท/เดือน`);
  }

  // --- Deposit / cashflow (12) ---
  const depositCap = DEPOSIT_BUCKETS[a.depositBudget] ?? 8000;
  const overDeposit = Math.max(0, d.deposit - depositCap);
  let depositScore = 12;
  if (overDeposit > 0) {
    depositScore = a.wantsDepositLoan ? 8 : 3;
    if (a.wantsDepositLoan) {
      warnings.push(`ค่าแรกเข้าสูงกว่างบ ${overDeposit.toLocaleString()} บาท (ขอสิทธิ์ผ่อนมัดจำได้)`);
    } else {
      warnings.push(`ค่าแรกเข้าสูงกว่างบ ${overDeposit.toLocaleString()} บาท`);
    }
  } else {
    reasons.push("ค่าแรกเข้าอยู่ในงบ");
  }

  // --- Travel (20) ---
  let travelScore = 0;
  if (travelMinutes <= a.maxTravel) {
    travelScore = 20;
    reasons.push(`เดินทางถึงคณะ ${travelMinutes} นาที (${transportLabel(a.transport)})`);
  } else {
    const over = travelMinutes - a.maxTravel;
    travelScore = Math.max(0, 20 - over * 2);
    warnings.push(`เดินทาง ${travelMinutes} นาที เกินเวลาที่รับได้ ${over} นาที`);
  }

  // --- Room type + air (10) ---
  let roomScore = 0;
  if (d.roomType.includes(a.roomType)) {
    roomScore += 6;
  } else {
    warnings.push(`ไม่มีห้องแบบ${a.roomType === "single" ? "เดี่ยว" : "คู่"}ที่ต้องการ`);
  }
  if (!a.needAir || d.hasAir) {
    roomScore += 4;
    if (a.needAir && d.hasAir) reasons.push("มีแอร์ตามต้องการ");
  } else {
    warnings.push("ไม่มีแอร์ (คุณระบุว่าจำเป็น)");
  }

  // --- Amenities top-3 (14) ---
  let amenityScore = 0;
  const matchedAmenities = a.amenities.filter((x) => d.amenities.includes(x));
  amenityScore = a.amenities.length
    ? (matchedAmenities.length / a.amenities.length) * 14
    : 14;
  if (matchedAmenities.length) {
    reasons.push(
      "มี " + matchedAmenities.map((x) => AMENITY_LABELS[x] ?? x).join(", ")
    );
  }
  const missing = a.amenities.filter((x) => !d.amenities.includes(x));
  if (missing.length) {
    warnings.push("ไม่มี " + missing.map((x) => AMENITY_LABELS[x] ?? x).join(", "));
  }

  // --- Security (14) ---
  const target = SECURITY_TARGET[a.securityLevel];
  const securityScore = Math.min(14, (d.security.length / Math.max(target, 1)) * 14);
  if (d.security.length >= target) {
    reasons.push("ความปลอดภัยผ่านเกณฑ์ที่ต้องการ");
  } else {
    warnings.push("ระบบความปลอดภัยน้อยกว่าที่ต้องการ");
  }

  // --- Verified bonus + billing transparency ---
  let bonus = 0;
  if (d.verified) {
    bonus += 4;
    reasons.push("ได้ตรา KKU Fair-Rent Verified");
  } else {
    warnings.push("ยังไม่ได้ตรา Verified (ตรวจสอบสัญญา/ค่าไฟเอง)");
  }
  if (!d.usesSmartBilling) {
    warnings.push("ไม่ได้ใช้ Smart Billing — เสี่ยงค่าน้ำไฟแฝง");
  }

  // Contract fit (soft)
  if (!contractFits(d.minContract, a.contract)) {
    warnings.push("สัญญาขั้นต่ำนานกว่าที่คุณต้องการ");
    bonus -= 2;
  }

  const raw =
    budgetScore +
    depositScore +
    travelScore +
    roomScore +
    amenityScore +
    securityScore +
    bonus;
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  return {
    dorm: d,
    score,
    totalCost: cost,
    overBudget,
    overDeposit,
    travelMinutes,
    reasons: reasons.slice(0, 5),
    warnings: warnings.slice(0, 4),
  };
}

const CONTRACT_MONTHS: Record<string, number> = {
  monthly: 1,
  "3m": 3,
  "6m": 6,
  "1y": 12,
};

function contractFits(dormMin: string, want: string): boolean {
  return CONTRACT_MONTHS[dormMin] <= CONTRACT_MONTHS[want];
}

export function transportLabel(t: QuizAnswers["transport"]): string {
  return (
    { walk: "เดิน", motorcycle: "มอเตอร์ไซค์", songthaew: "รถสองแถว", other: "อื่นๆ" }[t] ??
    "อื่นๆ"
  );
}

export function matchDorms(a: QuizAnswers, limit = 3): MatchResult[] {
  return DORMS.filter((d) => d.vacant > 0) // ยังมีห้องว่างจริง
    .map((d) => scoreDorm(d, a))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
}
