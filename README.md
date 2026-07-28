# KKU Fair-Rent 🏠

แพลตฟอร์มตลาดกลางด้านที่พักอาศัยสำหรับนักศึกษามหาวิทยาลัยขอนแก่น — **LINE Official Account prototype** สร้างด้วย Next.js + Tailwind, deploy บน Vercel

แก้ปัญหาความไม่สมมาตรของข้อมูล (Information Asymmetry) และภาวะตัดสินใจไม่ถูกของเด็กปี 1 ที่ไม่มีรุ่นพี่คอยแนะนำ

## 4 นโยบายในโปรโตไทป์

| นโยบาย | หน้าจอ | รายละเอียด |
|--------|--------|-----------|
| 1. Smart Match Quiz (Tinder for Dorms) | `/quiz` → `/result` | แบบทดสอบ 6 ข้อ → จับคู่หอ 3 อันดับ พร้อม Match Score + Total Cost |
| 2. Data-Driven Deposit Loan | `/loan` | ระบบคัดกรองยืมเงินมัดจำฉุกเฉิน เชื่อมกองทุน มข. (Zero Bad Debt) |
| 3. Smart Billing + Eco-Points | `/billing` | บิลค่าน้ำไฟโปร่งใส โชว์อัตราหน่วย + สะสมแต้มประหยัดพลังงาน |
| 4. KKU Fair-Rent Verified Badge | `/verified` | ตราสัญลักษณ์มาตรฐานตลาด (Market Signaling) |

หน้าจอเสริม: `/knowledge` (คลังความรู้ & สิทธิผู้เช่า), `/support` (สอบถามพี่หอ), `/complaint` (ร้องเรียน)

Rich Menu 6 ปุ่มอยู่ที่หน้าแรก `/` จำลองหน้าจอ LINE OA

## รันในเครื่อง

```bash
npm install
npm run dev
# เปิด http://localhost:3000
```

## Deploy บน Vercel

1. push โค้ดขึ้น GitHub
2. ที่ [vercel.com](https://vercel.com) → **Add New → Project** → import repo นี้
3. Framework จะถูก detect เป็น **Next.js** อัตโนมัติ กด **Deploy** ได้เลย
4. (ทางเลือก) ตั้งค่า Environment Variables ตาม `.env.example` เพื่อเชื่อม LINE จริง

หรือใช้ CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## เชื่อมต่อ LINE Official Account จริง

โปรโตไทป์รันได้ทันทีแบบ **mock mode** (ไม่ต้องมี credential) — webhook จะ log ข้อความแทนการยิงเข้า LINE

เมื่อพร้อมต่อ LINE จริง:

1. สร้าง **Messaging API channel** ที่ [LINE Developers Console](https://developers.line.biz/console/)
2. คัดลอก **Channel access token** และ **Channel secret** ไปใส่ใน Vercel Environment Variables:
   - `LINE_CHANNEL_ACCESS_TOKEN`
   - `LINE_CHANNEL_SECRET`
   - `NEXT_PUBLIC_BASE_URL` = โดเมน production ของคุณ
3. ตั้ง **Webhook URL** ในคอนโซล LINE เป็น:
   ```
   https://<your-app>.vercel.app/api/line/webhook
   ```
   แล้วกด **Verify** (endpoint ตอบ GET เพื่อ health check ได้ด้วย)
4. เปิด **Use webhook** และปิด auto-reply
5. ตั้งค่า **Rich Menu** ในคอนโซล LINE / OA Manager ให้ปุ่มลิงก์ไปยัง LIFF URL หรือ path เช่น `/quiz`, `/billing` ฯลฯ

### พฤติกรรม webhook
- **follow**: ส่งข้อความต้อนรับ + เมนู Flex 6 ปุ่ม
- **message (text)**: route ข้อความไปหน้าจอที่เกี่ยวข้อง (เช่นพิมพ์ "หาหอ" → ปุ่มเปิด Smart Quiz)
- **postback**: ตอบเมนูหลัก

## โครงสร้าง

```
src/
  app/
    page.tsx              # Rich Menu (หน้า OA)
    quiz/ result/         # นโยบาย 1
    loan/                 # นโยบาย 2
    billing/              # นโยบาย 3
    verified/             # นโยบาย 4
    knowledge/ support/ complaint/
    api/line/webhook/     # LINE Messaging API endpoint
  components/PhoneShell.tsx
  lib/
    dorms.ts match.ts     # ข้อมูลหอ + เครื่องมือจับคู่ (scoring)
    billing.ts            # บิล + Eco-Points
    faculties.ts          # รายชื่อคณะ มข.
    line.ts               # LINE helper (mock + live)
    types.ts
```

> หมายเหตุ: ข้อมูลหอพักเป็น mock data สำหรับโปรโตไทป์ — production ควรต่อฐานข้อมูลจริง + ระบบยืนยันห้องว่าง real-time
