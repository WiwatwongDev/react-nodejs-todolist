// README.md - Updated Documentation
# 🚀 TodoList Backend API

Backend สำหรับแอปพลิเคชัน TodoList ที่สร้างด้วย Fastify

## 🎯 Features

### API ตามโจทย์
- ✅ `GET /api?data=yes` - ส่งคืน JSON Array ตามโจทย์

### TodoList CRUD API
- ✅ `GET /api/todos` - ดึงรายการงานทั้งหมด
- ✅ `POST /api/todos` - เพิ่มงานใหม่
- ✅ `PUT /api/todos/:id` - แก้ไขงาน
- ✅ `DELETE /api/todos/:id` - ลบงาน
- ✅ `GET /api/todos/:id` - ดึงงานเฉพาะ
- ✅ `GET /api/todos/stats` - สถิติงาน

## 🛠️ Installation

```bash
npm install
npm install @fastify/cors @fastify/formbody
```

## 🚀 Running

```bash
# Development
npm run dev

# Production
npm start
```

Server รันที่: http://localhost:3001

## 📋 API Documentation

### ตัวอย่างการใช้งาน

```bash
# ทดสอบ API ตามโจทย์
curl "http://localhost:3001/api?data=yes"

# เพิ่มงานใหม่
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"name":"เรียน React","date_start":"2025-06-03"}'

# ดึงรายการงาน
curl http://localhost:3001/api/todos
```

## 🧪 Testing

```bash
npm test
```