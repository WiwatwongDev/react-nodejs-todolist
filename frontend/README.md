# 📋 TodoList Frontend Application

> แอปพลิเคชันจัดการรายการงานที่สร้างด้วย Next.js 15, TypeScript และ Tailwind CSS

⚠️ **คำแนะนำ**: ไฟล์นี้ควรแทนที่ `frontend/README.md` เดิมที่เป็น Next.js default template

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)

---

## 🎯 **ภาพรวมโปรเจค**

TodoList Application เป็นแอปพลิเคชันจัดการรายการงานที่ครบครันและใช้งานง่าย พัฒนาด้วยเทคโนโลยีที่ทันสมัยและ Best Practices

### ✨ **ฟีเจอร์หลัก**

- 📝 **เพิ่มงานใหม่** - สร้างรายการงานพร้อมวันที่เริ่มต้น
- ✏️ **แก้ไขงาน** - แก้ไขชื่องานและวันที่ได้ตลอดเวลา
- 🗑️ **ลบงาน** - ลบงานที่ไม่ต้องการออกจากรายการ
- ✅ **เปลี่ยนสถานะ** - ทำเครื่องหมายงานเสร็จ/ยังไม่เสร็จ
- 📊 **แดชบอร์ดสถิติ** - แสดงข้อมูลสรุปแบบเรียลไทม์
- 🔄 **API Integration** - เชื่อมต่อกับ Backend API
- 📱 **Responsive Design** - ใช้งานได้ทุกอุปกรณ์

### 🎨 **UI/UX Features**

- 🌈 **Modern Design** - UI สวยงามด้วย Tailwind CSS
- ⚡ **Loading States** - แสดงสถานะการโหลดข้อมูล
- 🚨 **Error Handling** - จัดการข้อผิดพลาดอย่างเหมาะสม
- ✅ **Form Validation** - ตรวจสอบข้อมูลก่อนส่ง
- 🎭 **Interactive Elements** - ปุ่มและฟอร์มที่ตอบสนองได้ดี
- 🔍 **Smart Status** - แสดงสถานะงานตามวันที่อัตโนมัติ

---

## 🛠️ **เทคโนโลจีที่ใช้**

### **Core Technologies**
- **Next.js 15.3.3** - React Framework with App Router
- **React 19** - Latest React with Hooks
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS Framework

### **Development Tools**
- **ESLint** - Code linting และ formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler สำหรับ development

### **Architecture Patterns**
- **Component-Based Architecture** - แยกส่วน UI เป็น Components
- **Custom Hooks** - State management logic
- **Service Layer** - API communication
- **Type Safety** - Interface และ Type definitions

---

## 📂 **โครงสร้างโปรเจค**

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # หน้าหลัก
│   │   ├── layout.tsx                # Layout template
│   │   └── globals.css               # Global styles
│   ├── components/                   # React Components
│   │   ├── TodoList.tsx              # Main TodoList component
│   │   ├── TodoForm.tsx              # Add/Edit form
│   │   └── TodoItem.tsx              # Individual todo item
│   ├── services/                     # API Services
│   │   └── todoApi.ts                # API communication layer
│   └── types/                        # TypeScript Definitions
│       └── todo.ts                   # Todo interfaces
├── public/                           # Static assets
│   ├── *.svg                         # Icon files
│   └── ...
├── .env.local                        # Environment variables
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
└── next.config.ts                    # Next.js configuration
```

---

## 🚀 **การติดตั้งและรัน**

### **Prerequisites**
- Node.js 18+ 
- npm หรือ yarn
- Backend API running on port 3001

### **1. Clone และติดตั้ง**

```bash
# Clone repository (หรือ copy โฟลเดอร์ frontend)
cd frontend

# ติดตั้ง dependencies
npm install
```

### **2. ตั้งค่า Environment Variables**

```bash
# สร้างไฟล์ .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

### **3. รันแอปพลิเคชัน**

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

### **4. เปิดในเบราว์เซอร์**

```
http://localhost:3000
```

---

## 🔌 **API Integration**

### **Backend Requirements**
แอปนี้ต้องการ Backend API ที่รันอยู่ที่ port 3001 พร้อม endpoints:

```javascript
GET    /api?data=yes           // API ตามโจทย์
GET    /api/todos              // ดึงรายการงาน
POST   /api/todos              // เพิ่มงานใหม่
PUT    /api/todos/:id          // แก้ไขงาน
DELETE /api/todos/:id          // ลบงาน
GET    /api/todos/stats        // สถิติ
```

### **API Service**
ใช้ `todoApi` service สำหรับการเชื่อมต่อ:

```typescript
import todoApi from '@/services/todoApi'

// ใช้งานใน component
const todos = await todoApi.getTodos()
const newTodo = await todoApi.createTodo(formData)
```

---

## 🧪 **การทดสอบ**

### **Manual Testing**
1. เปิดแอปที่ http://localhost:3000
2. คลิกปุ่ม "🧪 ทดสอบ API" เพื่อทดสอบการเชื่อมต่อ
3. ทดสอบฟีเจอร์ต่างๆ:
   - เพิ่มงานใหม่
   - แก้ไขงาน
   - ลบงาน
   - เปลี่ยนสถานะ
   - ดูสถิติ

### **Test Scenarios**
- ✅ เพิ่มงานด้วยข้อมูลถูกต้อง
- ❌ เพิ่มงานด้วยข้อมูลไม่ครบ
- ✅ แก้ไขงานที่มีอยู่
- ✅ ลบงานพร้อม confirmation
- ✅ เปลี่ยนสถานะงาน
- 🔄 ทดสอบการโหลดข้อมูล
- ⚠️ ทดสอบ Error handling

---

## 📊 **Component Architecture**

### **TodoList.tsx** (Main Component)
- จัดการ state หลักของแอป
- เชื่อมต่อกับ API
- แสดง stats และ error handling

### **TodoForm.tsx** (Form Component)
- รับข้อมูลงานใหม่/แก้ไข
- Validation และ error messages
- Support ทั้ง Add และ Edit mode

### **TodoItem.tsx** (Item Component)
- แสดงข้อมูลงานแต่ละรายการ
- ปุ่มจัดการ (แก้ไข/ลบ/เปลี่ยนสถานะ)
- Smart status display

---

## 🎨 **Design System**

### **Colors**
```css
Primary:   Blue (#3B82F6)
Success:   Green (#10B981) 
Warning:   Yellow (#F59E0B)
Danger:    Red (#EF4444)
Secondary: Purple (#8B5CF6)
```

### **Typography**
```css
Headers:   Geist Sans (Bold)
Body:      Geist Sans (Regular)
Code:      Geist Mono
```

### **Spacing & Layout**
- Container: max-width 4xl (1024px)
- Padding: 4-6 (16-24px)
- Gap: 3-4 (12-16px)
- Border radius: md (6px)

---

## 🔧 **การปรับแต่งและขยาย**

### **เพิ่ม Feature ใหม่**
1. สร้าง component ใหม่ใน `/src/components/`
2. เพิ่ม API method ใน `/src/services/todoApi.ts`
3. อัปเดต types ใน `/src/types/todo.ts`

### **แก้ไข Styling**
- แก้ไข Tailwind classes ใน component
- เพิ่ม custom CSS ใน `globals.css`
- ปรับ Tailwind config ใน `tailwind.config.js`

### **เพิ่ม Environment**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=TodoList App
NEXT_PUBLIC_VERSION=1.0.0
```

---

## 📚 **Learn More**

### **Next.js Resources**
- [Next.js Documentation](https://nextjs.org/docs) - เรียนรู้ Next.js features และ API
- [Learn Next.js](https://nextjs.org/learn) - tutorial แบบ interactive
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

### **TypeScript Resources**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### **Tailwind CSS Resources**
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

---

## 🚀 **Deployment**

### **Vercel (แนะนำ)**
```bash
npm install -g vercel
vercel
```

### **Other Platforms**
- **Netlify**: `npm run build` → deploy `out/` folder
- **Railway**: Connect GitHub repository
- **AWS Amplify**: Connect repository

### **Environment Variables สำหรับ Production**
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

---

## 🛡️ **Best Practices**

### **Code Quality**
- ✅ ใช้ TypeScript สำหรับ type safety
- ✅ ESLint rules สำหรับ code consistency
- ✅ Component composition แทน inheritance
- ✅ Custom hooks สำหรับ reusable logic

### **Performance**
- ✅ Next.js automatic optimizations
- ✅ Component lazy loading เมื่อจำเป็น
- ✅ Image optimization with `next/image`
- ✅ Bundle analysis with `npm run build`

### **Security**
- ✅ Environment variables สำหรับ sensitive data
- ✅ Input validation และ sanitization
- ✅ Error boundary สำหรับ error handling
- ✅ HTTPS ใน production

---

## 🤝 **Contributing**

### **Development Workflow**
1. Fork repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

### **Code Style**
- ใช้ ESLint config ที่กำหนด
- ตั้งชื่อตัวแปรและฟังก์ชันให้ชัดเจน
- เขียน comment สำหรับ logic ที่ซับซ้อน
- ใช้ TypeScript types อย่างครบถ้วน

---

## 📄 **License**

โปรเจคนี้เป็น open source และสามารถนำไปใช้เพื่อการศึกษาและพัฒนาต่อได้อย่างอิสระ

---

## 👨‍💻 **Author & Support**

สร้างเพื่อการเรียนรู้ Full-Stack Development

**Tech Stack**: Next.js + TypeScript + Tailwind CSS + Fastify Backend

🌟 **ขอให้สนุกกับการ code!** 🚀