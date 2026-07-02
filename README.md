# S-MAI Website

เว็บไซต์ประชาสัมพันธ์โครงการห้องเรียนพิเศษ S-MAI ของโรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา สร้างด้วย React, Vite และ Tailwind CSS

## สิ่งที่ใช้ในโปรเจกต์

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- lucide-react สำหรับไอคอน
- motion และ @google/genai มีอยู่ใน dependencies สำหรับต่อยอดฟีเจอร์เพิ่มเติม

## โครงสร้างไฟล์หลัก

- `src/App.tsx` - หน้าเว็บหลัก รวม header, slideshow, ข่าวสาร, กิจกรรม, ส่วนเกี่ยวกับ และ footer
- `src/main.tsx` - จุดเริ่มต้นของ React app
- `src/index.css` - import Tailwind CSS และตั้งค่า font
- `public/` - รูปภาพและโลโก้ที่เรียกใช้จาก path `/...`
- `assets/` - พื้นที่เก็บ asset เพิ่มเติม
- `vite.config.ts` - ตั้งค่า Vite, React plugin, Tailwind plugin และ alias `@`

## การติดตั้งและรันบนเครื่อง

ต้องมี Node.js ติดตั้งไว้ก่อน

```bash
npm install
npm run dev
```

จากนั้นเปิดเว็บที่:

```text
http://localhost:3000
```

## คำสั่งที่ใช้บ่อย

```bash
npm run dev
```

รัน development server ที่ port 3000

```bash
npm run build
```

build ไฟล์สำหรับนำไป deploy

```bash
npm run preview
```

preview ผลลัพธ์หลัง build

```bash
npm run lint
```

ตรวจ TypeScript ด้วย `tsc --noEmit`

## Environment variables

มีตัวอย่างไฟล์ `.env.example` สำหรับค่าที่เกี่ยวกับ Gemini/API Studio:

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

ถ้าไม่ได้ใช้ฟีเจอร์ Gemini ในหน้าเว็บปัจจุบัน สามารถรันหน้าเว็บพื้นฐานได้โดยไม่ต้องตั้งค่า key เหล่านี้

## การแก้ไขเนื้อหาเว็บ

- แก้ข้อความ เมนู ลิงก์ social และ section ต่าง ๆ ได้ใน `src/App.tsx`
- เปลี่ยนโลโก้หรือรูป local ได้ใน `public/`
- ปรับ font และ theme ได้ใน `src/index.css`
- เพิ่มรูป slideshow ได้โดยแก้ array `SLIDES` ใน `src/App.tsx`

## หมายเหตุ

ไฟล์ `src/App.tsx` ปัจจุบันมีข้อความภาษาไทยบางส่วนที่แสดงเป็น mojibake หรืออักขระเพี้ยน ควรตรวจ encoding และแทนที่ข้อความเหล่านั้นด้วยภาษาไทย UTF-8 ก่อนนำขึ้นใช้งานจริง
