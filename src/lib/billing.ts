// Mock Smart Billing data for a current tenant + Eco-Points logic.

export interface BillLine {
  label: string;
  detail: string;
  amount: number;
}

export interface MonthlyBill {
  month: string; // "ก.ค. 2568"
  dormName: string;
  verified: boolean;
  rent: number;
  // utility with transparent unit rates
  electricUnits: number;
  electricRate: number; // บาท/หน่วย (โชว์ชัดเจน)
  waterUnits: number;
  waterRate: number;
  internet: number;
  common: number;
  loanInstallment?: number; // งวดผ่อนมัดจำ (นโยบายที่ 2)
}

// อัตราค่าไฟการไฟฟ้าจริงโดยประมาณ ~4.2 บาท/หน่วย -> ใช้เป็นเกณฑ์โปร่งใส
export const FAIR_ELECTRIC_RATE = 4.2;
export const FAIR_WATER_RATE = 18;

export const CURRENT_BILL: MonthlyBill = {
  month: "ก.ค. 2568",
  dormName: "หอพัก The Nest กังสดาล",
  verified: true,
  rent: 3800,
  electricUnits: 142,
  electricRate: 4.2, // ตรงตามการไฟฟ้า — ไม่บวกเกิน
  waterUnits: 6,
  waterRate: 18,
  internet: 200,
  common: 0,
  loanInstallment: 1333, // ผ่อนมัดจำ 4,000 / 3 งวด
};

// 6 เดือนย้อนหลัง สำหรับกราฟการใช้ไฟ + Eco-Points
export interface UsageMonth {
  month: string;
  units: number; // หน่วยไฟ
  buildingAvg: number; // ค่าเฉลี่ยตึก
  ecoPoints: number;
}

export const USAGE_HISTORY: UsageMonth[] = [
  { month: "ก.พ.", units: 168, buildingAvg: 160, ecoPoints: 0 },
  { month: "มี.ค.", units: 175, buildingAvg: 165, ecoPoints: 0 },
  { month: "เม.ย.", units: 158, buildingAvg: 170, ecoPoints: 20 },
  { month: "พ.ค.", units: 150, buildingAvg: 162, ecoPoints: 25 },
  { month: "มิ.ย.", units: 148, buildingAvg: 158, ecoPoints: 20 },
  { month: "ก.ค.", units: 142, buildingAvg: 155, ecoPoints: 26 },
];

export function billTotal(b: MonthlyBill): number {
  return (
    b.rent +
    Math.round(b.electricUnits * b.electricRate) +
    Math.round(b.waterUnits * b.waterRate) +
    b.internet +
    b.common +
    (b.loanInstallment ?? 0)
  );
}

export function electricCost(b: MonthlyBill): number {
  return Math.round(b.electricUnits * b.electricRate);
}
export function waterCost(b: MonthlyBill): number {
  return Math.round(b.waterUnits * b.waterRate);
}

export function totalEcoPoints(): number {
  return USAGE_HISTORY.reduce((s, m) => s + m.ecoPoints, 0);
}

export interface Reward {
  name: string;
  cost: number;
  partner: string;
  icon: string;
}

export const REWARDS: Reward[] = [
  { name: "ส่วนลด 20 บาท", cost: 30, partner: "ร้านกาแฟ Café มอดินแดง", icon: "☕" },
  { name: "ข้าว 1 จาน", cost: 50, partner: "โรงอาหารกลาง มข.", icon: "🍚" },
  { name: "ชานม 1 แก้ว", cost: 40, partner: "ร้านชานมหลังมอ", icon: "🧋" },
  { name: "ส่วนลด 10%", cost: 25, partner: "ร้านซักรีดกังสดาล", icon: "🧺" },
];
