// import promise from 'es6-promise'
// import axios from 'axios'
// import store from '@/store'
// import * as types from '@/store/mutation-types'
// import router from '@/router'
// import { errorMsgs } from '@/utils/errorCodeMsg'
// import { Spin, Message } from 'iview'

promise.polyfill()

// 设置支持跨域
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

let downloadFile = res => {
  if (!res) return
  let aTag = document.createElement('a')
  let file = new Blob([res.data])
  let fileName = res.headers['content-disposition'].split('filename=')[1]
  aTag.download = decodeURI(fileName)
  aTag.href = window.URL.createObjectURL(file)
  document.body.appendChild(aTag)
  aTag.click()
  window.URL.revokeObjectURL(file)
  document.body.removeChild(aTag)
}

export default {
  request (method, url, data, file) {
    try {
      return new Promise(function (resolve, reject) {
        let contentType = 'application/json'
        let searchParams
        let requestBody
        let methodName = method.toLowerCase()
        let isFormData = data && data.xIsFormData
        let wantedResponseType = data && data.xResponseType

        if (!wantedResponseType) {
          if (data instanceof URLSearchParams) {
            wantedResponseType = data.get('xResponseType')
            data.delete('xResponseType')
          } else if (data instanceof FormData) {
            wantedResponseType = data.get('xResponseType')
            data.delete('xResponseType')
          }
        }

        if (file) {
          contentType = 'multipart/form-data'
        }

        if (errorMsgs.downloadResponseTypes.indexOf(wantedResponseType) > -1) {
          wantedResponseType = 'blob'
        }
        if (data) {
          data.xIsFormData = undefined
          data.xResponseType = undefined
        }

        if (methodName === 'post' || methodName === 'put' || methodName === 'patch') {
          requestBody = data
        } else {
          requestBody = undefined
          searchParams = data
        }

        if (isFormData) {
          contentType = 'application/x-www-form-urlencoded'
        }

        axios.request({
          headers: {
            'Authorization': store.getters.token || '',
            'content-type': contentType,
            'X-Requested-With': 'XMLHttpRequest'
          },
          baseURL: process.env.VUE_APP_API,
          url: url,
          method: methodName,
          params: searchParams,
          data: requestBody,
          responseType: wantedResponseType || 'json',
          onUploadProgress: function (uploadEvent) {
          },
          onDownloadProgress: function (downloadEvent) {
          }
        })
          .then(res => {
            console.log("log++++++++"+res);
            let realResponseType = res.headers['Content-Type']
            if (!realResponseType) {
              realResponseType = res.headers['content-type']
            }

            Spin.hide()
            // success
            if (realResponseType.toString().indexOf(errorMsgs.downloadResponseTypes) > -1) {
              downloadFile(res)
              resolve(res)
            } else {
              // json
              resolve(res.data)
            }
          })
          .catch(err => {
            let res = err.response
            let status = res.status

            Spin.hide()
            console.log("log++++++++"+status);
            switch (status) {
              case 400: {
                let error = res.data.error
                console.log("log++++++++"+error);
                let msg = errorMsgs[error]
                if (msg) {
                  console.log("log++++++++"+msg);
                  Message.error({
                    content: msg,
                    duration: 5
                  })
                } else if (error.includes('失败')) {
                  Message.error({
                    content: error,
                    duration: 5
                  })
                } else {
                  Message.error('哇哦，服务器正忙，请稍后重试')
                }
                if (reject) {
                  reject(res.data)
                }
                break
              }
              case 401: {
                Message.error('登录过期，请重新登录')
                store.commit(types.LOGOUT) // 清除cookie
                // 只有在当前路由不是登录页面才跳转
                router.currentRoute.path !== 'login' && router.push({ path: '/login' })
                if (reject) {
                  reject(res.data)
                }
                break
              }
              case 403: {
                Message.warning('您当前无权限访问，请联系管理员')
                if (reject) {
                  reject(res.data)
                }
                break
              }
              case 404: {
                Message.error('哇哦，该资源已被移除，请联系管理员')
                if (reject) {
                  reject(res.data)
                }
                break
              }
              case 405: {
                Message.error('哇哦，浏览器出现了点小状况，请稍后再试')
                if (reject) {
                  reject(res.data)
                }
                break
              }
              case 500: {
                Message.error('哇哦，服务器太忙了，请稍后再试哦')
                if (reject) {
                  reject(res.data)
                }
                break
              }
              default: {
                Message.error('服务器内部错误，请稍后重试')
                if (reject) {
                  reject(res.data)
                }
                break
              }
            }
          })
      })
    } catch (err) {
      console.log(err)
    }
  }
}
