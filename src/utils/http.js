import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user.js'
// 注意这里路由跳转的方法和之前的不太一样，因为没有setup
import router from '@/router'
/*
这个不能放在这里，要保证Pinia已经初始化后才使用这个方法
const userStore = useUserStore()
*/
// const httpInstance = axios.create({
//   baseURL: ,
//   timeout: 1000
// })
// httpInstance.interceptors.request.use(config => config, e => Promise.reject(e))
// httpInstance.interceptors.response.use(
//   config => config,
//   e => Promise.reject(e)
// )








const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",//接口基地址
  tiemout: 5000//接口超时时间
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  //1.获取token
  const token = userStore.userInfo.token
  //2.按要求拼接token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  //401token失效处理
  // 1.清除本地用户数据
  //2.跳转到登录页
  // console.log(e, 'e')
  if (e.response.status === 401) {
    userStore.clearInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})
export default httpInstance
