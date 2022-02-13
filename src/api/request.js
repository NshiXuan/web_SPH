// 对于 axios 进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
// start: 进度条开始 done:进度条结束
// 引入 store
import store from '@/store'

// 1.利用 axios 对象的方法 create 创建一个 axios 实例
// 2.request 就是 axios 不过我们需要配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发起请求的时候，路径当中会出现 api
  baseURL: '/api',
  // 代表请求超时的时间 5s
  timeout: 5000
})

// 请求拦截器：在发起请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象,对象里面有一个属性很重要，header 请求头
  if (store.state.detail.uuid_token) {
    // 给请求头添加一个字段(userTempId)和后台商量好的
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带 token 带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  // 进度条开始
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调函数：服务器相应数据回来以后，响应拦截器跨域检测到，跨域做一些是事情
  // 进度条结束
  nprogress.done()
  return res.data
}, (error) => {
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'));
})

// 对外暴露
export default requests