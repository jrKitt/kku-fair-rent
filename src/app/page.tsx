import Link from "next/link";
import PhoneShell from "@/components/PhoneShell";
import RichMenu from "@/components/RichMenu";

export default function Home() {
  return (
    <PhoneShell title="KKU Fair-Rent" subtitle="LINE Official Account">
      {/* OA cover */}
      <div className="bg-gradient-to-br from-kku to-kku-dark text-white p-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center text-3xl">
            🏠
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">KKU Fair-Rent</div>
            <div className="text-white/80 text-xs">
              ตลาดกลางหอพักนักศึกษา มหาวิทยาลัยขอนแก่น
            </div>
          </div>
        </div>
        <p className="text-white/85 text-[13px] mt-3 leading-relaxed">
          หาหอที่ใช่ • บิลโปร่งใส • ยืมมัดจำฉุกเฉิน • หอ Verified เท่านั้น
        </p>
        <Link
          href="/quiz"
          className="mt-4 inline-flex items-center gap-2 bg-white text-kku font-bold text-sm px-4 py-2.5 rounded-full"
        >
          🎯 เริ่มหาหอที่ใช่เลย
        </Link>
      </div>

      {/* Rich menu */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 tracking-wide">
            เมนูหลัก (Rich Menu)
          </span>
          <span className="text-[10px] text-gray-300">ปุ่ม 6 เมนู</span>
        </div>
        <RichMenu />

        <Link
          href="/verified"
          className="mt-4 flex items-center gap-3 rounded-xl bg-line/10 border border-line/30 p-3 active:scale-[0.99] transition-transform"
        >
          <span className="text-2xl">🛡️</span>
          <div className="flex-1">
            <div className="text-sm font-bold text-line-dark">หอพัก KKU Fair-Rent Verified</div>
            <div className="text-[11px] text-gray-500">สัญญาเป็นธรรม · บิลโปร่งใส · ผ่านเกณฑ์ความปลอดภัย</div>
          </div>
          <span className="text-line">›</span>
        </Link>

        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
          <div className="text-xs text-amber-800 leading-relaxed">
            💡 <b>สำหรับเด็กปี 1</b> ที่ยังไม่มีรุ่นพี่แนะนำ — เริ่มจาก Smart
            Quiz เพื่อกันโดนหอไม่ตรงปกและค่าไฟแฝง
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
