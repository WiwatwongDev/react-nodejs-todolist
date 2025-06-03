// routes/api.js - Main API Routes
'use strict'

module.exports = async function (fastify, opts) {
  // In-memory storage สำหรับ TodoList
  const todos = []
  let nextId = 1

  // ===================================================================
  // API ENDPOINT ตามโจทย์: GET /api?data=yes
  // ===================================================================
  fastify.get('/api', async function (request, reply) {
    const { data } = request.query
    
    // Response ตามโจทย์ที่กำหนด: Array ที่มี Object
    return [{
      data: data || '',
      status: 'success'
    }]
  })

  // ===================================================================
  // CRUD ENDPOINTS สำหรับ TodoList (เพิ่มเติม)
  // ===================================================================

  // GET /api/todos - ดึงรายการงานทั้งหมด
  fastify.get('/api/todos', async function (request, reply) {
    try {
      // เรียงลำดับตาม id (ล่าสุดก่อน)
      const sortedTodos = todos.sort((a, b) => b.id - a.id)
      
      return {
        success: true,
        message: 'ดึงข้อมูลสำเร็จ',
        data: sortedTodos,
        total: todos.length
      }
    } catch (error) {
      reply.code(500).send({
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
        error: error.message
      })
    }
  })

  // POST /api/todos - เพิ่มงานใหม่
  fastify.post('/api/todos', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'date_start'],
        properties: {
          name: { 
            type: 'string', 
            minLength: 1, 
            maxLength: 100 
          },
          date_start: { 
            type: 'string', 
            format: 'date' 
          }
        }
      }
    }
  }, async function (request, reply) {
    try {
      const { name, date_start } = request.body

      // ตรวจสอบข้อมูลเพิ่มเติม
      if (!name || !name.trim()) {
        return reply.code(400).send({
          success: false,
          message: 'ชื่องานไม่สามารถเป็นค่าว่างได้'
        })
      }

      if (!date_start) {
        return reply.code(400).send({
          success: false,
          message: 'วันที่เริ่มต้องระบุ'
        })
      }

      // สร้างงานใหม่
      const newTodo = {
        id: nextId++,
        name: name.trim(),
        date_start: date_start,
        finished: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      todos.push(newTodo)

      reply.code(201).send({
        success: true,
        message: 'เพิ่มงานใหม่สำเร็จ',
        data: newTodo
      })
      
    } catch (error) {
      reply.code(500).send({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเพิ่มงาน',
        error: error.message
      })
    }
  })

  // PUT /api/todos/:id - แก้ไขงาน
  fastify.put('/api/todos/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { 
            type: 'string', 
            minLength: 1, 
            maxLength: 100 
          },
          date_start: { 
            type: 'string', 
            format: 'date' 
          },
          finished: { 
            type: 'boolean' 
          }
        }
      }
    }
  }, async function (request, reply) {
    try {
      const { id } = request.params
      const { name, date_start, finished } = request.body

      // หา Todo ที่ต้องการแก้ไข
      const todoIndex = todos.findIndex(t => t.id === parseInt(id))
      if (todoIndex === -1) {
        return reply.code(404).send({
          success: false,
          message: 'ไม่พบงานที่ต้องการแก้ไข'
        })
      }

      // อัพเดทข้อมูล
      const existingTodo = todos[todoIndex]
      const updatedTodo = {
        ...existingTodo,
        ...(name !== undefined && { name: name.trim() }),
        ...(date_start !== undefined && { date_start }),
        ...(finished !== undefined && { finished }),
        updated_at: new Date().toISOString()
      }

      todos[todoIndex] = updatedTodo

      return {
        success: true,
        message: 'แก้ไขงานสำเร็จ',
        data: updatedTodo
      }
      
    } catch (error) {
      reply.code(500).send({
        success: false,
        message: 'เกิดข้อผิดพลาดในการแก้ไขงาน',
        error: error.message
      })
    }
  })

  // DELETE /api/todos/:id - ลบงาน
  fastify.delete('/api/todos/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async function (request, reply) {
    try {
      const { id } = request.params

      // หา Todo ที่ต้องการลบ
      const todoIndex = todos.findIndex(t => t.id === parseInt(id))
      if (todoIndex === -1) {
        return reply.code(404).send({
          success: false,
          message: 'ไม่พบงานที่ต้องการลบ'
        })
      }

      // ลบงาน
      const deletedTodo = todos.splice(todoIndex, 1)[0]

      return {
        success: true,
        message: 'ลบงานสำเร็จ',
        data: deletedTodo
      }
      
    } catch (error) {
      reply.code(500).send({
        success: false,
        message: 'เกิดข้อผิดพลาดในการลบงาน',
        error: error.message
      })
    }
  })

  // GET /api/todos/:id - ดึงงานเฉพาะ
  fastify.get('/api/todos/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async function (request, reply) {
    try {
      const { id } = request.params

      const todo = todos.find(t => t.id === parseInt(id))
      if (!todo) {
        return reply.code(404).send({
          success: false,
          message: 'ไม่พบงานที่ต้องการ'
        })
      }

      return {
        success: true,
        message: 'ดึงข้อมูลงานสำเร็จ',
        data: todo
      }
      
    } catch (error) {
      reply.code(500).send({
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลงาน',
        error: error.message
      })
    }
  })

  // GET /api/todos/stats - สถิติงาน
  fastify.get('/api/todos/stats', async function (request, reply) {
    try {
      const total = todos.length
      const finished = todos.filter(t => t.finished).length
      const pending = total - finished

      // คำนวณงานที่เลยกำหนด
      const today = new Date()
      const overdue = todos.filter(t => {
        if (t.finished) return false
        const startDate = new Date(t.date_start)
        return startDate < today
      }).length

      return {
        success: true,
        message: 'ดึงสถิติสำเร็จ',
        data: {
          total,
          finished,
          pending,
          overdue,
          completion_rate: total > 0 ? Math.round((finished / total) * 100) : 0
        }
      }
      
    } catch (error) {
      reply.code(500).send({
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงสถิติ',
        error: error.message
      })
    }
  })
}