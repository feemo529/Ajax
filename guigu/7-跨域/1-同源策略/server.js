const express = require('express')

const app = express()

app.get('/home', (req, res) => {
  // 响应一个页面
  res.sendFile(__dirname + '/index.html')
})

app.get('/data', (req, res) => {
  res.send('用户数据')
})

app.listen(3000, () => {
  console.log('服务已经启动...')
})
