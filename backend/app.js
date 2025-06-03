// app.js - Fixed CORS duplicate registration
'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // ลงทะเบียน CORS plugin ก่อน (แบบ manual)
  await fastify.register(require('@fastify/cors'), {
    origin: [
      'http://localhost:3000',  // Next.js dev server
      'http://127.0.0.1:3000',  // Alternative localhost
      'http://localhost:3001',  // Backend self
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })

  // เพิ่ม Content-Type parsing
  await fastify.register(require('@fastify/formbody'))

  // Logging request
  fastify.addHook('onRequest', async (request, reply) => {
    console.log(`📍 ${request.method} ${request.url}`)
  })

  // Global error handler
  fastify.setErrorHandler(function (error, request, reply) {
    console.error('❌ Error:', error)
    
    if (error.validation) {
      reply.code(400).send({
        success: false,
        message: 'ข้อมูลไม่ถูกต้อง',
        errors: error.validation
      })
      return
    }

    reply.code(500).send({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  })

  // โหลด plugins อื่นๆ (ยกเว้น cors.js)
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
    ignoreFilter: (path) => path.includes('cors.js') // ข้าม cors.js เพื่อหลีกเลี่ยงการลงทะเบียนซ้ำ
  })

  // โหลด routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  // Health check endpoint
  fastify.get('/health', async function (request, reply) {
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    }
  })
}

module.exports.options = options