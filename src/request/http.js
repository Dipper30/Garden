import axios from 'axios'
import qs from 'qs'
import { store } from '../store/index'

export const apiBaseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/api/v1'
// export const apiBaseURL = `http://localhost:3000/api/v1`

// export const apiBaseURL = `//${window.location.host}/api/v1`;
// export const baseURL = `//${window.location.host}/signing-up`;

export const mHttpConfig = {
  warn: 0
}

export const http = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
  withCredentials: true
})

http.defaults.headers.post['Content-Type'] = 'application/json'
// let token = localStorage.getItem('token')
// if (token) http.defaults.headers.common['token'] = token
// try {
//   let token = localStorage.getItem('token')
//   if (token) http.defaults.headers.post['token'] = token
// } catch (error) {
//   // do nothing
// }

http.interceptors.request.use(
  config => {
    const token = store.getters.getToken
    config.headers.token = token
    return config
  }
)

http.interceptors.response.use(
  response => {
    const { data } = response
    const { code, msg } = data
    switch (code) {
      case 0:
        return data
      case 10002:
        // 身份校验错误
        console.log('wrong token, please relogin')
        throw msg
      case 10004:
        console.log('用户名密码错误')
        return data
      default:
        // if (mHttpConfig.warn === 0) {
        //   ElMessage.error('网络错误：' + msg);
        // }
        // throw msg;
        return data
    }
  },
  error => error
)

/**
 * get方法
 */
export const get = (url, params) => {
  return http.get(url, { params })
}

/**
 * post方法
 */
export const post = (url, params) => {
  return http.post(url, qs.stringify(params))
}
