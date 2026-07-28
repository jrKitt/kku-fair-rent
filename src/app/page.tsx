import Link from "next/link";
import Image from "next/image";
import { Target, ChevronRight, ShieldCheck, Lightbulb, Phone } from "lucide-react";
import PhoneShell from "@/components/PhoneShell";
import RichMenu from "@/components/RichMenu";

export default function Home() {
  return (
    <PhoneShell title="KKU Fair-Rent" subtitle="LINE Official Account">
      {/* Hero */}
      <div
        className="relative text-white overflow-hidden px-6 pt-7 pb-8"
        style={{
          background: `
            linear-gradient(155deg, rgba(167,59,36,0.93) 0%, rgba(55,12,4,0.97) 100%),
            repeating-linear-gradient(0deg, rgba(255,210,190,0.055) 0px, rgba(255,210,190,0.055) 1px, transparent 1px, transparent 44px),
            repeating-linear-gradient(90deg, rgba(255,210,190,0.045) 0px, rgba(255,210,190,0.045) 1px, transparent 1px, transparent 36px)`,
          backgroundColor: "#7d2c1b",
        }}
      >
        <div
          className="absolute top-0 right-0 w-44 h-44 rounded-bl-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)" }}
        />
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg shrink-0">
            <Image src="/logo.jpg" alt="KKU Fair-Rent" width={64} height={64} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-bold text-xl leading-tight">KKU Fair-Rent</div>
            <div className="text-white/80 text-[13px] mt-0.5">ตลาดกลางหอพักนักศึกษา มข.</div>
          </div>
        </div>
        <p className="text-white/85 text-[13px] mt-4 leading-relaxed relative">
          หาหอที่ใช่ · บิลโปร่งใส · ยืมเงินประกันฉุกเฉิน · หอ Verified เท่านั้น
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1">
          <Phone className="w-3 h-3 text-white/80" />
          <span className="text-[11px] text-white/90">สคบ. <span className="font-bold tracking-wide">1166</span></span>
        </div>
        <div className="mt-5 relative">
          <Link
            href="/quiz"
            className="flex items-center justify-center gap-2.5 bg-white text-kku font-bold text-base px-6 py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.97] transition-all w-full"
          >
            <Target className="w-5 h-5" />
            เริ่มหาหอที่ใช่เลย
          </Link>
        </div>
      </div>

      {/* Main menu */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">เมนูหลัก</h2>
          <span className="text-xs text-gray-400">6 บริการ</span>
        </div>
        <RichMenu />

        <Link
          href="/verified"
          className="mt-4 flex items-center gap-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 active:scale-[0.99] transition-transform shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-emerald-900">หอพัก KKU Fair-Rent Verified</div>
            <div className="text-xs text-emerald-700 mt-0.5">สัญญาเป็นธรรม · บิลโปร่งใส · ผ่านเกณฑ์ความปลอดภัย</div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-600 shrink-0" />
        </Link>
      </div>


      <div className="px-4 pb-6 space-y-4 mt-2">
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="text-[13px] text-amber-900 leading-relaxed">
              <span className="font-semibold">สำหรับเด็กปี 1</span> ที่ยังไม่มีรุ่นพี่แนะนำ — เริ่มจาก Smart Quiz เพื่อกันโดนหอไม่ตรงปกและค่าไฟแฝง
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link href="/admin" className="text-[11px] text-gray-400 hover:text-kku underline underline-offset-2 transition-colors">
            สำหรับเจ้าของหอ: Smart Billing Dashboard →
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
