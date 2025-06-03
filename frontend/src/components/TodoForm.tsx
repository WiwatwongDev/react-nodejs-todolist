// components/TodoForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { TodoFormData } from '@/types/todo'

interface TodoFormProps {
  initialData?: TodoFormData
  onSubmit: (data: TodoFormData) => void
  onCancel?: () => void
  isEditing?: boolean
  isLoading?: boolean
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    name: '',
    date_start: ''
  })
  const [errors, setErrors] = useState<Partial<TodoFormData>>({})

  // โหลดข้อมูลเริ่มต้นเมื่อ initialData เปลี่ยน
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: '',
        date_start: new Date().toISOString().split('T')[0] // วันที่วันนี้
      })
    }
    setErrors({})
  }, [initialData])

  // ตรวจสอบความถูกต้องของข้อมูล
  const validateForm = (): boolean => {
    const newErrors: Partial<TodoFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณาใส่ชื่องาน'
    } else if (formData.name.length > 100) {
      newErrors.name = 'ชื่องานต้องไม่เกิน 100 ตัวอักษร'
    }

    if (!formData.date_start) {
      newErrors.date_start = 'กรุณาเลือกวันที่เริ่ม'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // จัดการการส่งฟอร์ม
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    onSubmit({
      name: formData.name.trim(),
      date_start: formData.date_start
    })

    // ล้างฟอร์มหลังส่งสำเร็จ (ถ้าไม่ใช่การแก้ไข)
    if (!isEditing) {
      setFormData({
        name: '',
        date_start: new Date().toISOString().split('T')[0]
      })
    }
  }

  // จัดการการเปลี่ยนค่า input
  const handleInputChange = (field: keyof TodoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // ล้าง error เมื่อผู้ใช้เริ่มพิมพ์
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ช่องชื่องาน */}
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            ชื่องาน *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.name
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="เช่น: เรียน React, ทำโปรเจค"
            disabled={isLoading}
            maxLength={100}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">🚫 {errors.name}</p>
          )}
        </div>

        {/* ช่องวันที่เริ่ม */}
        <div className="flex-1">
          <label htmlFor="date_start" className="block text-sm font-medium text-gray-700 mb-1">
            วันที่เริ่ม *
          </label>
          <input
            type="date"
            id="date_start"
            value={formData.date_start}
            onChange={(e) => handleInputChange('date_start', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.date_start
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            disabled={isLoading}
          />
          {errors.date_start && (
            <p className="mt-1 text-sm text-red-600">🚫 {errors.date_start}</p>
          )}
        </div>
      </div>

      {/* ปุ่มควบคุม */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 md:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              กำลังบันทึก...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {isEditing ? '✏️ บันทึกการแก้ไข' : '➕ เพิ่มงานใหม่'}
            </span>
          )}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            ❌ ยกเลิก
          </button>
        )}
      </div>

      {/* คำแนะนำ */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
        💡 <strong>เคล็ดลับ:</strong> ใส่ชื่องานที่ชัดเจน และเลือกวันที่ที่ต้องการเริ่มทำงาน
      </div>
    </form>
  )
}

export default TodoForm