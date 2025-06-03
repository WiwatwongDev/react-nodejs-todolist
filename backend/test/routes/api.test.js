// test/routes/api.test.js - API Tests
'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')

test('API endpoint ตามโจทย์', async (t) => {
  const app = await build(t)

  // ทดสอบ GET /api?data=yes
  const res = await app.inject({
    method: 'GET',
    url: '/api?data=yes'
  })

  assert.strictEqual(res.statusCode, 200)
  const payload = JSON.parse(res.payload)
  assert.strictEqual(Array.isArray(payload), true)
  assert.strictEqual(payload.length, 1)
  assert.strictEqual(payload[0].data, 'yes')
  assert.strictEqual(payload[0].status, 'success')
})

test('TodoList CRUD operations', async (t) => {
  const app = await build(t)

  // ทดสอบเพิ่มงานใหม่
  const createRes = await app.inject({
    method: 'POST',
    url: '/api/todos',
    payload: {
      name: 'ทดสอบงาน',
      date_start: '2025-06-03'
    }
  })

  assert.strictEqual(createRes.statusCode, 201)
  const createData = JSON.parse(createRes.payload)
  assert.strictEqual(createData.success, true)
  assert.strictEqual(createData.data.name, 'ทดสอบงาน')

  const todoId = createData.data.id

  // ทดสอบดึงรายการงาน
  const listRes = await app.inject({
    method: 'GET',
    url: '/api/todos'
  })

  assert.strictEqual(listRes.statusCode, 200)
  const listData = JSON.parse(listRes.payload)
  assert.strictEqual(listData.success, true)
  assert.strictEqual(listData.data.length, 1)

  // ทดสอบแก้ไขงาน
  const updateRes = await app.inject({
    method: 'PUT',
    url: `/api/todos/${todoId}`,
    payload: {
      name: 'งานที่แก้ไขแล้ว',
      finished: true
    }
  })

  assert.strictEqual(updateRes.statusCode, 200)
  const updateData = JSON.parse(updateRes.payload)
  assert.strictEqual(updateData.success, true)
  assert.strictEqual(updateData.data.finished, true)

  // ทดสอบลบงาน
  const deleteRes = await app.inject({
    method: 'DELETE',
    url: `/api/todos/${todoId}`
  })

  assert.strictEqual(deleteRes.statusCode, 200)
  const deleteData = JSON.parse(deleteRes.payload)
  assert.strictEqual(deleteData.success, true)
})