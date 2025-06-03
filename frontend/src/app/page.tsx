// app/page.tsx - Updated Main Page
import TodoList from '@/components/TodoList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📋 TodoList Application
          </h1>
          <p className="text-gray-600 text-lg">
            จัดการรายการงานของคุณอย่างเป็นระบบ
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main TodoList Component */}
        <TodoList />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>💻 สร้างด้วย Next.js + TypeScript + Tailwind CSS</p>
          <p>🚀 พร้อมเชื่อมต่อกับ Backend API</p>
        </div>
      </div>
    </div>
  )
}