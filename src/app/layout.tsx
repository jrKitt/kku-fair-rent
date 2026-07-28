import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KKU Fair-Rent | ตลาดกลางหอพักนักศึกษา มข.",
  description:
    "แพลตฟอร์มตลาดกลางด้านที่พักอาศัยสำหรับนักศึกษามหาวิทยาลัยขอนแก่น — Smart Match Quiz, บิลโปร่งใส, ทุนมัดจำฉุกเฉิน และตรา Verified",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#A73B24",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={notoThai.variable}>
      <body className="font-sans text-gray-900">{children}</body>
    </html>
  );
}
