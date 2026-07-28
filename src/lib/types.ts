// Core domain types for KKU Fair-Rent

export type RoomType = "single" | "double";
export type Transport = "walk" | "motorcycle" | "songthaew" | "other";
export type ContractDuration = "monthly" | "3m" | "6m" | "1y";

export interface Dorm {
  id: string;
  name: string;
  zone: string; // e.g. "กังสดาล"
  verified: boolean; // KKU Fair-Rent Verified badge
  usesSmartBilling: boolean;
  roomType: RoomType[];
  hasAir: boolean;
  rent: number; // ค่าเช่าห้อง / เดือน
  estElectric: number; // ประมาณการค่าไฟ / เดือน
  estWater: number; // ประมาณการค่าน้ำ / เดือน
  internet: number; // ค่าเน็ต/ส่วนกลาง / เดือน
  deposit: number; // ค่าแรกเข้ารวม (จอง+มัดจำ+ล่วงหน้า)
  minContract: ContractDuration;
  amenities: string[]; // e.g. ["wifi","washer","parking","lift"]
  security: string[]; // e.g. ["keycard","guard","cctv","lighting"]
  // travel minutes by faculty zone lookup, keyed by transport
  travel: Record<Transport, number>;
  vacant: number; // ห้องว่างจริง
  rating: number; // 0-5
  highlights: string[];
  cautions: string[];
  lat: number;
  lng: number;
  image: string; // emoji or color token for prototype
}

export interface QuizAnswers {
  monthlyBudget: number; // งบเบ็ดเสร็จ/เดือน
  depositBudget: string; // bucket key
  wantsDepositLoan: boolean;
  faculty: string;
  transport: Transport;
  maxTravel: number; // นาที
  roomType: RoomType;
  needAir: boolean;
  amenities: string[]; // top 3
  securityLevel: "basic" | "medium" | "high";
  concerns: string[];
  contract: ContractDuration;
}

export interface MatchResult {
  dorm: Dorm;
  score: number; // 0-100
  totalCost: number;
  overBudget: number; // >0 ถ้าเกินงบ
  overDeposit: number; // >0 ถ้าค่าแรกเข้าเกินงบ
  travelMinutes: number;
  reasons: string[];
  warnings: string[];
}
