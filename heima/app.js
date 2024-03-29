// 引入express框架
const express = require('express')
// 路径处理模块
const path = require('path')
const formidable = require('formidable')
// 向其他服务器端请求数据的模块
const request = require('request')
const { response } = require('express')
// 创建web服务器
const app = express()

// 数据库连接
// mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo', { useNewUrlParser: true })

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')))

app.get('/first', (req, res) => {
  res.send('Hello Ajax')
})

// 邮箱地址验证
app.get('/verifyEmailAdress', (req, res) => {
  // 接收客户端传递过来的邮箱地址
  const email = req.query.email
  // 判断邮箱地址注册过的情况
  if (email == 'itheima@itcast.cn') {
    // 设置http状态码并对客户端做出响应
    res.status(400).send({ message: '邮箱地址已经注册过了, 请更换其他邮箱地址' })
  } else {
    // 邮箱地址可用的情况
    // 对客户端做出响应
    res.send({ message: '恭喜, 邮箱地址可用' })
  }
})

// 输入框文字提示
app.get('/searchAutoPrompt', (req, res) => {
  // 搜索关键字
  const key = req.query.key
  // 提示文字列表
  const list = ['黑马程序员', '黑马程序员官网', '黑马程序员顺义校区', '黑马程序员学院报名系统', '传智播客', '传智博客前端与移动端开发', '传智播客大数据', '传智播客python', '传智播客java', '传智播客c++', '传智播客怎么样']
  // 搜索结果
  let result = list.filter(item => item.includes(key))
  // 将查询结果返回给客户端
  res.send(result)
})

// 获取省份
app.get('/province', (req, res) => {
  res.json([
    {
      id: '001',
      name: '黑龙江省'
    },
    {
      id: '002',
      name: '四川省'
    },
    {
      id: '003',
      name: '河北省'
    },
    {
      id: '004',
      name: '江苏省'
    }
  ])
})

// 根据省份id获取城市
app.get('/cities', (req, res) => {
  // 获取省份id
  const id = req.query.id
  // 城市信息
  const cities = {
    '001': [
      {
        id: '300',
        name: '哈尔滨市'
      },
      {
        id: '301',
        name: '齐齐哈尔市'
      },
      {
        id: '302',
        name: '牡丹江市'
      },
      {
        id: '303',
        name: '佳木斯市'
      }
    ],
    '002': [
      {
        id: '400',
        name: '成都市'
      },
      {
        id: '401',
        name: '绵阳市'
      },
      {
        id: '402',
        name: '德阳市'
      },
      {
        id: '403',
        name: '攀枝花市'
      }
    ],
    '003': [
      {
        id: '500',
        name: '石家庄市'
      },
      {
        id: '501',
        name: '唐山市'
      },
      {
        id: '502',
        name: '秦皇岛市'
      },
      {
        id: '503',
        name: '邯郸市'
      }
    ],
    '004': [
      {
        id: '600',
        name: '常州市'
      },
      {
        id: '601',
        name: '徐州市'
      },
      {
        id: '602',
        name: '南京市'
      },
      {
        id: '603',
        name: '淮安市'
      }
    ]
  }
  // 响应
  res.send(cities[id])
})

// 根据城市id获取县城
app.get('/areas', (req, res) => {
  // 获取城市id
  const id = req.query.id
  // 县城信息
  const areas = {
    300: [
      {
        id: '20',
        name: '道里区'
      },
      {
        id: '21',
        name: '南岗区'
      },
      {
        id: '22',
        name: '平房区'
      },
      {
        id: '23',
        name: '松北区'
      }
    ],
    301: [
      {
        id: '30',
        name: '龙沙区'
      },
      {
        id: '31',
        name: '铁锋区'
      },
      {
        id: '32',
        name: '富拉尔基区'
      }
    ]
  }
  // 响应
  res.send(areas[id] || [])
})

app.post('/formData', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 解析客户端传递过来的FormData对象
  form.parse(req, (err, fields, files) => {
    res.send(fields)
  })
})

// 实现文件上传的路由
app.post('/upload', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 设置客户端上传文件的存储路径
  form.uploadDir = path.join(__dirname, 'public', 'uploads')
  // 保留上传文件的后缀名字
  form.keepExtensions = true
  // 解析客户端传递过来的FormData对象
  form.parse(req, (err, fields, files) => {
    // 将客户端传递过来的文件地址响应到客户端
    res.send({
      path: files.attrName.path.split('public')[1]
    })
  })
})

app.get('/server', (req, res) => {
  request('http://localhost:3001/cross', (err, response, body) => {
    res.send(body)
  })
})
// 拦截所有请求
app.use((req, res, next) => {
  // 1.允许哪些客户端访问我
  // * 代表允许所有的客户端访问我
  // 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 比如是具体的域名信息
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  // 2.允许客户端使用哪些请求方法访问我
  res.header('Access-Control-Allow-Methods', 'get,post')
  // 允许客户端发送跨域请求时携带cookie信息
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

app.post('/login', (req, res) => {
  // 创建表单解析对象
  var form = formidable.IncomingForm()
  // 解析表单
  form.parse(req, (err, fields, file) => {
    // 接收客户端传递过来的用户名和密码
    const { username, password } = fields
    // 用户名密码比对
    if (username == 'itheima' && password == '123456') {
      // 设置session
      req.session.isLogin = true
      res.send({ message: '登录成功' })
    } else {
      res.send({ message: '登录失败, 用户名或密码错误' })
    }
  })
})

app.get('/checkLogin', (req, res) => {
  // 判断用户是否处于登录状态
  if (req.session.isLogin) {
    res.send({ message: '处于登录状态' })
  } else {
    res.send({ message: '处于未登录状态' })
  }
})

app.get('/base', (req, res) => {
  res.send({ naem: 'zhangsan', age: 30 })
})
app.post('/base', (req, res) => {
  res.status(400).send({ naem: 'zhangsan', age: 30 })
})
app.get('/user', (req, res) => {
  res.send({ naem: 'zhangsan', age: 30 })
})
app.post('/user', (req, res) => {
  res.send({ naem: 'zhangsan', age: 30 })
})

app.get('/jsonp', (req, res) => {
  const cb = req.query.cb
  const data = cb + "({name: 'zhaoliu'})"
  res.send(data)
  // res.jsonp({
  //     naem: 'lisi',
  //     age: 50
  // })
})

// 获取用户列表信息
app.get('/users', (req, res) => {
  res.send('当前是获取用户列表信息的路由')
})

// 获取某一个用户具体信息
app.get('/users/:id', (req, res) => {
  // 获取客户端传递过来的用户id
  const id = req.params.id
  res.send('当前我们是在获取id为${id}用户信息')
})

// 删除某一个用户
app.delete('/users/:id', (req, res) => {
  // 获取客户端传递过来的用户id
  const id = req.params.id
  res.send('当前我们是删除id为${id}用户信息')
})

// 修改某一个用户
app.put('/users/:id', (req, res) => {
  // 获取客户端传递过来的用户id
  const id = req.params.id
  res.send('当前我们是修改id为${id}用户信息')
})

app.get('/xml', (req, res) => {
  res.header('content-type', 'text/xml')
  res.send('<message><title>消息标题</title><content>消息内容</content></message>')
})

// 导入todo路由案例
// const todoRouter = require('./route/todo');
// 监听端口
app.listen(3000)
// 控制台提示输出
console.log('服务器启动成功')
