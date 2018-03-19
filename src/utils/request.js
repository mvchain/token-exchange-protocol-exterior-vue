import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken,setToken } from '@/utils/auth'

// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: window.urlData.url, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (setToken()) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.status !== 200) {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      });

      //  50014:Token 过期了;50015,长的
      if (res.status === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('getReferToken').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('网络错误')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response.data.message)
  }
)

export default service
