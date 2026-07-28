import Link from "next/link";
import Image from "next/image";
import { Target, ChevronRight, ShieldCheck, Lightbulb } from "lucide-react";
import PhoneShell from "@/components/PhoneShell";
import RichMenu from "@/components/RichMenu";

export default function Home() {
  return (
    <PhoneShell title="KKU Fair-Rent" subtitle="LINE Official Account">
      {/* OA cover */}
      <div className="bg-gradient-to-br from-kku to-kku-dark text-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg">
            <Image
              src="/logo.jpg"
              alt="KKU Fair-Rent"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-xl leading-tight">KKU Fair-Rent</div>
            <div className="text-white/90 text-sm mt-0.5">
              ตลาดกลางหอพักนักศึกษา มข.
            </div>
          </div>
        </div>
        <p className="text-white/90 text-sm mt-4 leading-relaxed">
          หาหอที่ใช่ • บิลโปร่งใส • ยืมมัดจำฉุกเฉิน • หอ Verified เท่านั้น
        </p>
        <Link
          href="/quiz"
          className="mt-5 inline-flex items-center gap-2 bg-white text-kku font-semibold text-[15px] px-5 py-3 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <Target className="w-5 h-5" />
          เริ่มหาหอที่ใช่เลย
        </Link>
      </div>

      {/* Rich menu */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">
            เมนูหลัก
          </h2>
          <span className="text-xs text-gray-400">6 บริการ</span>
        </div>
        <RichMenu />

        <Link
          href="/verified"
          className="mt-5 flex items-center gap-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 active:scale-[0.99] transition-transform shadow-sm"
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

        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="text-[13px] text-amber-900 leading-relaxed">
              <span className="font-semibold">สำหรับเด็กปี 1</span> ที่ยังไม่มีรุ่นพี่แนะนำ — เริ่มจาก Smart Quiz เพื่อกันโดนหอไม่ตรงปกและค่าไฟแฝง
            </div>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
