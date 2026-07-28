import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Gauge,
  Home,
  LayoutDashboard,
  Leaf,
  LineChart,
  ReceiptText,
  Settings,
  ShieldCheck,
  UsersRound,
  WalletCards,
  Zap,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type MobileNavItem = NavItem & {
  href: string;
};

type Stat = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: "kku" | "emerald" | "amber" | "slate";
};

const navItems: NavItem[] = [
  { label: "แดชบอร์ด", icon: LayoutDashboard, active: true },
  { label: "บิลกลาง", icon: ReceiptText },
  { label: "ผู้เช่า", icon: UsersRound },
  { label: "ระบบจัดการหอ", icon: Building2 },
  { label: "แต้มประหยัด", icon: Leaf },
  { label: "ตั้งค่า", icon: Settings },
];

const mobileNavItems: MobileNavItem[] = [
  { label: "แดชบอร์ด", icon: LayoutDashboard, href: "#admin-dashboard", active: true },
  { label: "บิล", icon: ReceiptText, href: "#admin-billing" },
  { label: "แต้ม", icon: Leaf, href: "#admin-eco" },
  { label: "แอพหลัก", icon: Home, href: "/" },
];

const stats: Stat[] = [
  {
    label: "บิลที่ออกผ่านระบบกลาง",
    value: "128",
    detail: "เดือน ก.ค. 2568",
    icon: ReceiptText,
    tone: "kku",
  },
  {
    label: "ห้องที่ต่ำกว่าเกณฑ์เฉลี่ย",
    value: "46",
    detail: "ได้รับแต้มประหยัด",
    icon: Leaf,
    tone: "emerald",
  },
  {
    label: "อัตราค่าไฟที่ประกาศ",
    value: "4.20",
    detail: "บาทต่อหน่วย",
    icon: Zap,
    tone: "amber",
  },
  {
    label: "สถานะความโปร่งใส",
    value: "ผ่านรับรอง",
    detail: "ใช้สูตรคำนวณกลาง",
    icon: ShieldCheck,
    tone: "slate",
  },
];

const bills = [
  {
    room: "A-203",
    tenant: "นักศึกษาปี 1",
    rent: "3,800",
    electricity: "142 x 4.20",
    water: "6 x 18",
    total: "6,037",
    status: "พร้อมส่ง",
  },
  {
    room: "A-308",
    tenant: "นักศึกษาปี 2",
    rent: "4,200",
    electricity: "118 x 4.20",
    water: "5 x 18",
    total: "4,786",
    status: "ประหยัดพลังงาน",
  },
  {
    room: "B-112",
    tenant: "นักศึกษาปี 1",
    rent: "3,600",
    electricity: "164 x 4.20",
    water: "7 x 18",
    total: "4,415",
    status: "ตรวจแล้ว",
  },
];

const transparencyRules = [
  "ออกบิลค่าน้ำไฟผ่านระบบกลางเท่านั้น",
  "แสดงจำนวนหน่วย อัตราต่อหน่วย และสูตรคำนวณในบิลทุกใบ",
  "ใช้เกณฑ์ Verified เพื่อป้องกันการบวกกำไรค่าน้ำค่าไฟเกินจริง",
];

const pmsFeatures = [
  { label: "ทะเบียนผู้เช่า", detail: "จัดเก็บข้อมูลห้อง สัญญา และวันครบกำหนด" },
  { label: "ออกใบแจ้งหนี้", detail: "สร้างบิลรายเดือนจากค่าเช่า หน่วยน้ำ และหน่วยไฟ" },
  { label: "รายงานอาคาร", detail: "ดูภาพรวมรายรับ ค้างชำระ และการใช้พลังงาน" },
];

const ecoRows = [
  { room: "A-308", usage: "118 หน่วย", average: "155 หน่วย", points: "+28" },
  { room: "C-417", usage: "126 หน่วย", average: "155 หน่วย", points: "+22" },
  { room: "B-204", usage: "132 หน่วย", average: "155 หน่วย", points: "+18" },
];

const toneClasses: Record<Stat["tone"], string> = {
  kku: "bg-kku-50 text-kku border-kku-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-20 text-slate-950 lg:pb-0">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image src="/logo.jpg" alt="KKU Fair-Rent" width={32} height={32} className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-950">KKU Fair-Rent</p>
              <p className="truncate text-xs text-slate-500">PMS Platform</p>
            </div>
          </div>
          <Link
            href="/billing"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-kku px-3 text-xs font-semibold text-white"
          >
            ดูบิล
          </Link>
        </div>
      </header>

      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="hidden border-slate-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:w-72 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-5 py-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                <Image src="/logo.jpg" alt="KKU Fair-Rent" width={34} height={34} className="object-contain" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950">KKU Fair-Rent</p>
                <p className="truncate text-xs text-slate-500">PMS Platform</p>
              </div>
            </div>

            <nav className="flex flex-1 flex-col gap-2 px-4">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`flex h-11 shrink-0 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                      item.active
                        ? "bg-kku text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden border-t border-slate-200 p-4 lg:block">
              <Link
                href="/"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:border-kku-200 hover:text-kku"
              >
                <Home className="h-4 w-4" />
                กลับหน้าแอพหลัก
              </Link>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <header id="admin-dashboard" className="scroll-mt-20 border-b border-slate-200 bg-white">
            <div className="flex w-full flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between lg:mx-auto lg:max-w-7xl lg:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-kku-50 px-3 py-1 text-xs font-semibold text-kku">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  หอพักได้รับการ Verify
                </div>
                <h1 className="mt-3 text-2xl font-bold tracking-normal text-slate-950 md:text-3xl">
                  Dashboard
                </h1>

              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/billing"
                  className="hidden h-11 items-center justify-center gap-2 rounded-xl bg-kku px-4 text-sm font-semibold text-white transition-colors hover:bg-kku-dark sm:inline-flex"
                >
                  <ReceiptText className="h-4 w-4" />
                  ดูตัวอย่างบิลผู้เช่า
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-kku-200 hover:text-kku lg:hidden"
                >
                  <Home className="h-4 w-4" />
                  หน้าแอพหลัก
                </Link>
              </div>
            </div>
          </header>

          <div className="grid w-full gap-4 px-4 py-4 lg:mx-auto lg:max-w-7xl lg:gap-5 lg:px-8 lg:py-5">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <article key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                        <p className="mt-2 text-2xl font-bold text-slate-950">{stat.value}</p>
                        <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
                      </div>
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${toneClasses[stat.tone]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.85fr)]">
              <article id="admin-billing" className="scroll-mt-20 rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-950">ภาพรวมบิลกลางเดือนนี้</h2>
                    <p className="mt-1 text-xs text-slate-500">แสดงสูตรค่าน้ำค่าไฟก่อนส่งบิลให้ผู้เช่าผ่าน LINE OA</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    ตรวจสูตรแล้ว
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                        <th className="px-4 py-3">ห้อง</th>
                        <th className="px-4 py-3">ผู้เช่า</th>
                        <th className="px-4 py-3">ค่าเช่า</th>
                        <th className="px-4 py-3">ไฟฟ้า</th>
                        <th className="px-4 py-3">น้ำประปา</th>
                        <th className="px-4 py-3">รวม</th>
                        <th className="px-4 py-3">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map((bill) => (
                        <tr key={bill.room} className="border-b border-slate-100 last:border-0">
                          <td className="px-4 py-3 font-semibold text-slate-950">{bill.room}</td>
                          <td className="px-4 py-3 text-slate-600">{bill.tenant}</td>
                          <td className="px-4 py-3 text-slate-700">{bill.rent} บาท</td>
                          <td className="px-4 py-3 text-slate-700">{bill.electricity}</td>
                          <td className="px-4 py-3 text-slate-700">{bill.water}</td>
                          <td className="px-4 py-3 font-semibold text-slate-950">{bill.total} บาท</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                              {bill.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kku-50 text-kku">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950">ข้อตกลงความโปร่งใส</h2>
                    <p className="text-xs text-slate-500">เงื่อนไขสำหรับหอที่ใช้ Free PMS</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {transparencyRules.map((rule) => (
                    <div key={rule} className="flex gap-3 rounded-xl bg-slate-50 p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <p className="text-sm leading-6 text-slate-700">{rule}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl bg-kku-50 p-4">
                  <p className="text-xs font-semibold text-kku">สูตรคำนวณที่แสดงในบิล</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">หน่วยที่ใช้ x อัตราต่อหน่วย = ยอดเรียกเก็บจริง</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">ผู้เช่าเห็นค่าเช่า ค่าไฟ ค่าน้ำ และค่าบริการแยกรายการก่อนชำระเงิน</p>
                </div>
              </article>
            </section>

            <section className="grid gap-5 xl:grid-cols-3">
              <article className="rounded-xl border border-slate-200 bg-white p-4 xl:col-span-2">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-950">ระบบจัดการหอฟรีสำหรับเจ้าของหอ</h2>
                    <p className="mt-1 text-xs text-slate-500">ลดต้นทุนงานบัญชีและทำให้ข้อมูลค่าใช้จ่ายโปร่งใสตั้งแต่ต้นทาง</p>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    <WalletCards className="h-3.5 w-3.5" />
                    ใช้งานฟรี
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {pmsFeatures.map((feature) => (
                    <div key={feature.label} className="rounded-xl bg-slate-50 p-4">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-kku">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-950">{feature.label}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{feature.detail}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article id="admin-eco" className="scroll-mt-20 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-950">แต้มประหยัดพลังงาน</h2>
                    <p className="mt-1 text-xs text-slate-500">แรงจูงใจให้ผู้เช่าลดการใช้พลังงาน</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Leaf className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {ecoRows.map((row) => (
                    <div key={row.room} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <div className="font-semibold text-slate-950">{row.room}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Gauge className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{row.usage} จากเกณฑ์ {row.average}</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                        </div>
                      </div>
                      <div className="font-bold text-emerald-700">{row.points}</div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <article className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <CircleDollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950">ผลลัพธ์ที่ต้องการ</h2>
                    <p className="text-xs text-slate-500">ลดค่าใช้จ่ายแฝงและเพิ่มความเชื่อมั่น</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  <p>นักศึกษาเห็นรายละเอียดค่าน้ำค่าไฟก่อนจ่ายจริง และเจ้าของหอได้ระบบจัดการบัญชีฟรีเป็นแรงจูงใจในการเปิดเผยข้อมูล</p>
                  <p>Eco-Points ทำให้การประหยัดพลังงานมีผลตอบแทนที่จับต้องได้ผ่านส่วนลดร้านพันธมิตรรอบ มข.</p>
                </div>
              </article>

              <article className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-950">เส้นทางข้อมูลต้นแบบ</h2>
                    <p className="mt-1 text-xs text-slate-500">ภาพรวมการเชื่อมระบบเจ้าของหอกับแอพหลักของนักศึกษา</p>
                  </div>
                  <LineChart className="h-5 w-5 text-slate-400" />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { icon: Building2, title: "ระบบเจ้าของหอ", desc: "กรอกหน่วยน้ำไฟและค่าเช่า" },
                    { icon: BarChart3, title: "บิลกลาง", desc: "ตรวจสูตรและอัตราต่อหน่วย" },
                    { icon: ArrowUpRight, title: "LINE OA นักศึกษา", desc: "ผู้เช่าดูบิลและสะสมแต้ม" },
                  ].map((step) => {
                    const Icon = step.icon;

                    return (
                      <div key={step.title} className="rounded-xl bg-slate-50 p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-kku">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="mt-3 text-sm font-bold text-slate-950">{step.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white lg:hidden">
        <div className="grid w-full grid-cols-4 px-2 py-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const className = `flex h-14 flex-col items-center justify-center gap-1 rounded-xl transition-colors ${
              item.active
                ? "bg-kku-50 text-kku"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`;

            return (
              <Link key={item.label} href={item.href} className={className}>
                <Icon className="h-5 w-5" />
                <span className="text-[11px] font-semibold leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
