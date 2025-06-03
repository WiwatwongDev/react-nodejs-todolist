// components/TodoItem.tsx
'use client'

import React from 'react'
import { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
  onToggleFinished: (id: number) => void
  isLoading?: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleFinished,
  isLoading = false
}) => {
  // แปลงวันที่เป็นรูปแบบที่อ่านง่าย
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // คำนวณสถานะวันที่
  const getDateStatus = (): { status: string; className: string; icon: string } => {
    const today = new Date()
    const startDate = new Date(todo.date_start)
    const diffTime = startDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (todo.finished) {
      return { status: 'เสร็จแล้ว', className: 'text-green-600', icon: '✅' }
    } else if (diffDays < 0) {
      return { status: 'เลยกำหนด', className: 'text-red-600', icon: '⚠️' }
    } else if (diffDays === 0) {
      return { status: 'วันนี้', className: 'text-orange-600', icon: '🔥' }
    } else if (diffDays <= 3) {
      return { status: `อีก ${diffDays} วัน`, className: 'text-yellow-600', icon: '⏰' }
    } else {
      return { status: `อีก ${diffDays} วัน`, className: 'text-blue-600', icon: '📅' }
    }
  }

  const dateStatus = getDateStatus()

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      todo.finished ? 'bg-green-50' : ''
    }`}>
      {/* คอลัมน์สถานะ */}
      <td className="py-3 px-4">
        <button
          onClick={() => onToggleFinished(todo.id)}
          disabled={isLoading}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            todo.finished
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={todo.finished ? 'คลิกเพื่อยกเลิกการทำเสร็จ' : 'คลิกเพื่อทำเครื่องหมายเสร็จ'}
        >
          <span>{dateStatus.icon}</span>
          <span className={dateStatus.className}>{dateStatus.status}</span>
        </button>
      </td>

      {/* คอลัมน์รหัสงาน */}
      <td className="py-3 px-4">
        <span className="text-sm font-mono text-gray-600">#{todo.id}</span>
      </td>

      {/* คอลัมน์ชื่องาน */}
      <td className="py-3 px-4">
        <div className={`font-medium ${
          todo.finished ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {todo.name}
        </div>
      </td>

      {/* คอลัมน์วันที่เริ่ม */}
      <td className="py-3 px-4">
        <span className="text-sm text-gray-600">
          {formatDate(todo.date_start)}
        </span>
      </td>

      {/* คอลัมน์จัดการ */}
      <td className="py-3 px-4">
        <div className="flex justify-center gap-2">
          {/* ปุ่มแก้ไข */}
          <button
            onClick={() => onEdit(todo)}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            title="แก้ไขงาน"
          >
            ✏️ แก้ไข
          </button>

          {/* ปุ่มลบ */}
          <button
            onClick={() => onDelete(todo.id)}
            disabled={isLoading}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            title="ลบงาน"
          >
            🗑️ ลบ
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TodoItem