import request from '@/utils/request'
import api from './apis/api.config'

export function login(data) {
    return request({
        url: api.userLogin,
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}