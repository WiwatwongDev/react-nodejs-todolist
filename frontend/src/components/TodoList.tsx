// components/TodoList.tsx
'use client'

import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { Todo, TodoFormData } from '@/types/todo'

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  // ฟังก์ชันเพิ่ม Todo ใหม่
  const handleAddTodo = async (formData: TodoFormData) => {
    setIsLoading(true)
    setError('')

    try {
      // สำหรับ development - ใช้ในหน่วยความจำก่อน
      const newTodo: Todo = {
        id: Date.now(), // ใช้ timestamp เป็น ID ชั่วคราว
        name: formData.name,
        date_start: formData.date_start,
        finished: false
      }

      setTodos(prev => [...prev, newTodo])
      
      // TODO: เรียก API
      // const response = await fetch('http://localhost:3001/api/todos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // const result = await response.json()
      // setTodos(prev => [...prev, result.data])
      
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเพิ่มงาน')
      console.error('Add todo error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // ฟังก์ชันแก้ไข Todo
  const handleUpdateTodo = async (id: number, formData: TodoFormData) => {
    setIsLoading(true)
    setError('')

    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id
            ? { ...todo, name: formData.name, date_start: formData.date_start }
            : todo
        )
      )
      setEditingTodo(null)

      // TODO: เรียก API
      // const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการแก้ไขงาน')
      console.error('Update todo error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // ฟังก์ชันลบ Todo
  const handleDeleteTodo = async (id: number) => {
    if (!confirm('คุณต้องการลบงานนี้หรือไม่?')) return

    setIsLoading(true)
    setError('')

    try {
      setTodos(prev => prev.filter(todo => todo.id !== id))

      // TODO: เรียก API
      // await fetch(`http://localhost:3001/api/todos/${id}`, {
      //   method: 'DELETE'
      // })
      
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการลบงาน')
      console.error('Delete todo error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // ฟังก์ชันเปลี่ยนสถานะ
  const handleToggleFinished = async (id: number) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    try {
      setTodos(prev =>
        prev.map(t =>
          t.id === id ? { ...t, finished: !t.finished } : t
        )
      )

      // TODO: เรียก API
      // await fetch(`http://localhost:3001/api/todos/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...todo, finished: !todo.finished })
      // })
      
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ')
      console.error('Toggle finished error:', err)
    }
  }

  // เริ่ม Edit Mode
  const handleStartEdit = (todo: Todo) => {
    setEditingTodo(todo)
  }

  // ยกเลิก Edit Mode
  const handleCancelEdit = () => {
    setEditingTodo(null)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold">📋 รายการงานของฉัน</h2>
        <p className="text-blue-100 mt-1">จัดการงานของคุณให้เรียบร้อย</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 m-4 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Todo Form */}
      <div className="p-6 border-b border-gray-200">
        <TodoForm
          initialData={editingTodo ? {
            name: editingTodo.name,
            date_start: editingTodo.date_start
          } : undefined}
          onSubmit={editingTodo 
            ? (data) => handleUpdateTodo(editingTodo.id, data)
            : handleAddTodo
          }
          onCancel={editingTodo ? handleCancelEdit : undefined}
          isEditing={!!editingTodo}
          isLoading={isLoading}
        />
      </div>

      {/* Todo Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">สถานะ</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">รหัสงาน</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ชื่องาน</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">วันที่เริ่ม</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl mb-2">📝</div>
                    <p>ยังไม่มีรายการงาน</p>
                    <p className="text-sm">เพิ่มงานใหม่เพื่อเริ่มต้น</p>
                  </div>
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteTodo}
                  onToggleFinished={handleToggleFinished}
                  isLoading={isLoading}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      {todos.length > 0 && (
        <div className="bg-gray-50 p-4 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>
              📊 ทั้งหมด: {todos.length} งาน
            </span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                เสร็จแล้ว: {todos.filter(t => t.finished).length}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                รอดำเนินการ: {todos.filter(t => !t.finished).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoList