import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const errors = {
    errorHandle: false
}

// 创建一个AXIOS实例
const service = axios.create({
    baseURL: '', // url = base url + request url
    timeout: 600000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 验证请求头token
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        // post请求时设置json
  
        if (config.method == 'post') {
      
                // config.data = qs.parse(config.data)
 
            // if(config.type == 'json'){
                config.headers = { 'Content-Type': 'application/json' }
            // }else{
            //     config.headers = { 'Content-Type': 'multipart/form-data' }
            // }
          
        } 
        // 用户自己设置处理错误码方式
        if (config.errorHandle) {
            errors.errorHandle = config.errorHandle
        }
        // console.log('config===>', config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // const res = response.data
        if (errors.errorHandle == true) {
            return response.data
        } else {
            // if (res.errCode != 200) {
            //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //         MessageBox.confirm('登录过期，您可以取消停留在此页，或重新登录，确认注销', {
            //             confirmButtonText: '登录',
            //             cancelButtonText: '取消',
            //             type: 'warning'
            //         }).then(() => {
            //             store.dispatch('user/resetToken').then(() => {
            //                 location.reload()
            //             })
            //         })
            //     }
            //     return Promise.reject(new Error(res.errMsg || 'Error'))
            // } else {
                return response.data
            // }
        }
    },
    error => {
        return Promise.reject(error)
    }
)

const request = params => {
    store.dispatch('request/changeState', true)
    return new Promise((resolve, reject) => {
        service(params).then(res => {
            resolve(res)
            store.dispatch('request/changeState', false)
        }).catch((error) => {
            // 接口返回失败在重新调一次
            if (params.repeat === true) {
                service(params).then(res => {
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
                store.dispatch('request/changeState', false)
                Message({
                    message: error.errMsg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else {
                Message({
                    message: error || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                store.dispatch('request/changeState', false)
            }
            reject(error)
        })
    })
}

export default request