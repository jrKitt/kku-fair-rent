"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function PhoneShell({
  children,
  title,
  subtitle,
  back,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  back?: string;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-kku-dark to-kku flex items-center justify-center p-0 sm:p-6">
      <div className="relative w-full max-w-[430px] bg-gray-50 min-h-screen sm:min-h-[860px] sm:rounded-[2.2rem] sm:shadow-2xl overflow-hidden flex flex-col sm:border-[10px] sm:border-black">
        {/* status bar / OA header */}
        <header className="bg-kku text-white shrink-0">
          <div className="flex items-center gap-2 px-4 h-14">
            {back ? (
              <button
                onClick={() => router.push(back)}
                className="text-white/90 hover:text-white text-2xl -ml-1 w-8 h-8 flex items-center justify-center rounded-full active:bg-white/10"
                aria-label="ย้อนกลับ"
              >
                ‹
              </button>
            ) : (
              <div className="w-9 h-9 rounded-full bg-white overflow-hidden flex items-center justify-center">
                <Image src="/logo.jpg" alt="KKU Fair-Rent Logo" width={36} height={36} className="object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold leading-tight truncate">
                {title ?? "KKU Fair-Rent"}
              </p>
              <p className="text-[11px] text-white/70 leading-tight truncate">
                {subtitle ?? "LINE Official Account · มหาวิทยาลัยขอนแก่น"}
              </p>
            </div>
            <Link
              href="/"
              className="text-[11px] bg-white/15 px-2 py-1 rounded-full hover:bg-white/25 shrink-0"
            >
              หน้าหลัก
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default PhoneShell;
