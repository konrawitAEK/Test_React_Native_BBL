# Test React Native BBL

แอปมือถือ (React Native + TypeScript + Expo) ที่ดึงข้อมูลสินค้าจาก
[Fake Store API](https://fakestoreapi.com/products) และให้ผู้ใช้จัดการ
รายการโปรด (Favorites) แบบ global state

## ฟีเจอร์

- **หน้ารายการสินค้า (Product List)** — แสดงรายการสินค้าด้วย `FlatList`
  (รูปภาพ, ชื่อ, ราคา) พร้อม pull-to-refresh โดยดึงข้อมูลผ่าน
  service ที่เรียก `https://fakestoreapi.com/products`
- **หน้ารายละเอียดสินค้า (Product Detail)** — แตะที่สินค้าเพื่อดูรายละเอียด
  แบบเต็ม (รูปภาพ, หมวดหมู่, ราคา, คำอธิบาย)
- **Favorites (Global State)** — ใช้ React Context (`FavoritesContext`)
  เก็บรายการโปรดไว้ใช้ทั้งแอป ทำให้สถานะซิงก์กันทุกหน้าจอ/แท็บ
- **แท็บ Favorites** — แท็บล่างแยกต่างหากสำหรับแสดงสินค้าที่ถูกกดโปรด
  ทั้งหมด พร้อม badge บอกจำนวน
- **ลบออกจาก Favorites** — ทำได้ทั้งจากหน้ารายละเอียด (toggle) หรือ
  จากแท็บ Favorites โดยตรง
- **Persistence** — รายการโปรดถูกบันทึกลง `AsyncStorage` และโหลดกลับ
  มาตอนเปิดแอปใหม่ ทำให้ข้อมูลไม่หายเมื่อปิด-เปิดแอป
- **Animation** — ปุ่ม favorite มีอนิเมชัน "pop" (scale) เวลากด

## Tech Stack

- React Native (Expo, TypeScript template)
- TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- React Context API สำหรับ global state
- `@react-native-async-storage/async-storage` สำหรับ persistence

## โครงสร้างโปรเจกต์

```
Test_React_Native_BBL/
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
└── src/
    ├── context/
    │   └── FavoritesContext.tsx   # Global favorites state + AsyncStorage
    ├── navigation/
    │   └── RootNavigator.tsx      # Bottom tabs + stack navigator
    ├── screens/
    │   ├── ProductListScreen.tsx
    │   ├── ProductDetailScreen.tsx
    │   └── FavoritesScreen.tsx
    ├── services/
    │   └── productService.ts      # เรียก API ทั้งหมดรวมไว้ที่นี่
    ├── styles/
    │   ├── colors.ts              # สีที่ใช้ร่วมกันทั้งแอป
    │   └── common.ts              # style ที่ใช้ร่วมกันหลายหน้าจอ
    └── types/
        └── product.ts             # TS types ที่ใช้ร่วมกัน
```

### เกี่ยวกับ `services/`

การเรียก API ทั้งหมดถูกแยกออกมาไว้ในโฟลเดอร์ `src/services/` แทนที่จะ
เรียก `fetch` ตรงๆ ในหน้าจอ เพื่อให้ง่ายต่อการเพิ่ม endpoint ใหม่ๆ ใน
อนาคต (เช่น ถ้ามีหลายเส้น API ก็เพิ่มไฟล์ service แยกหรือเพิ่มฟังก์ชัน
ในไฟล์เดิมได้ทันที โดยไม่ต้องแก้โค้ดในหน้าจอ)

## วิธีติดตั้งและรันโปรเจกต์

1. ติดตั้ง dependencies:

   ```bash
   npm install
   ```

2. เริ่ม Expo dev server:

   ```bash
   npm start
   ```

3. รันบนอุปกรณ์/simulator:
   - กด `i` สำหรับ iOS simulator (เฉพาะ macOS)
   - กด `a` สำหรับ Android emulator
   - หรือสแกน QR code ด้วยแอป **Expo Go** บนมือถือ

   > ต้องใช้ Node.js 18+ และมี Xcode (iOS) หรือ Android Studio (Android)
   > ติดตั้งไว้ในเครื่อง หรือใช้แค่แอป Expo Go บนอุปกรณ์จริงก็เพียงพอ
   > ไม่จำเป็นต้องมี native build tools สำหรับโปรเจกต์นี้

## เหตุผลของการเลือกใช้เทคโนโลยี/แนวทางต่างๆ

- **Expo** ถูกเลือกใช้เพื่อให้ setup ง่าย แค่ `npm install` + `npm start`
  เหมาะกับงานทดสอบทางเทคนิคแบบจำกัดเวลา
- **Context API** ถูกเลือกแทน Redux/Zustand สำหรับ favorites เพราะแอปมี
  shared state ที่เรียบง่ายเพียงส่วนเดียว Context ช่วยให้โค้ดอ่านง่าย
  โดยไม่ต้องมี boilerplate เพิ่ม
- **Native Stack Navigator** (`@react-navigation/native-stack`) ใช้กับ
  flow ของ Products เพื่อประสิทธิภาพการเปลี่ยนหน้าแบบ native โดยห่อด้วย
  **Bottom Tab Navigator** สำหรับสลับระหว่าง Products และ Favorites
- **Service Layer** (`src/services/`) แยก logic การเรียก API ออกจาก
  UI component เพื่อให้ดูแลรักษาง่ายขึ้นเมื่อมี endpoint เพิ่มในอนาคต
