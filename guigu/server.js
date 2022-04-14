// 1. 引入express
const express = require('express')

// 2.创建应用对象
const app = express()

// 3.创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
// 1.GET
app.get('/server', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应体
  response.send('HELLO AJAX')
})

// 2.post
app.all('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 响应头
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 设置响应体
  response.send('HELLO AJAX POST')
})

// 3.JSON
app.all('/json-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 响应头
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 目的：响应一个数据
  const data = {
    name: 'atiguigu'
  }
  // 对对象进行字符串转换
  let str = JSON.stringify(data)
  // 设置响应体
  response.send(str)
})

// 4.IE缓存问题
app.get('/ie', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应体
  response.send('HELLO ie - 3')
})

// 5.延时响应 6.取消请求
app.get('/delay', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  setTimeout(() => {
    // 设置响应体
    response.send('延时响应')
  }, 3000)
})

// jQuery 服务
app.all('/jquery-server', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 设置响应体
  // response.send('Hello jQuery AJAX')
  const data = { name: '尚硅谷' }
  response.send(JSON.stringify(data))
})
app.all('/jquery-server-delay', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  setTimeout(() => {
    // 设置响应体
    response.send('延时响应')
  }, 3000)
})

// axios 服务
app.all('/axios-server', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 设置响应体
  const data = { name: '尚硅谷' }
  response.send(JSON.stringify(data))
})

// fetch 服务
app.all('/fetch-server', (request, response) => {
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 设置响应体
  const data = { name: '尚硅谷' }
  response.send(JSON.stringify(data))
})

// jsonp服务
app.all('/jsonp-server', (req, res) => {
  // 这里返回的必须是js代码
  // res.send('hello jsonp-server')
  // res.send('console.log("hello jsonp-server")')
  const data = {
    name: '尚硅谷atguigu'
  }
  let str = JSON.stringify(data)
  res.end(`handle(${str})`)
})

// 2.JSONP实践
// 用户名检测是否存在
app.all('/check-username', (req, res) => {
  const data = {
    exist: 1,
    msg: '用户名已经存在'
  }
  let str = JSON.stringify(data)
  res.end(`handle(${str})`)
})

// jQuery-jsonp
app.all('/jquery-jsonp-server', (req, res) => {
  const data = {
    name: '尚硅谷',
    city: ['北京', '上海', '深圳']
  }
  let str = JSON.stringify(data)
  // 接收 callback 参数
  let cb = req.query.callback
  res.end(`${cb}(${str})`)
})

// cors-server
app.all('/cors-server', (req, res) => {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('Hello cors-server')
})

// 4.监听端口服务
app.listen(8000, () => {
  console.log('服务已经启动, 8000 端口监听中....')
})
