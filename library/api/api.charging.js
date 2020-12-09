import request from '@/utils/request'
import api from './apis/api.config'

export function getDatas(data) {
  return request({
    url: '/queryweb/query',
    method: 'post',
    type: 'json',
    data
  })
}
export function getdownQuery(data) {
  return request({
    url: '/queryweb/downExcelbyData',
    method: 'post',
    type: 'json',
    data
  })
}
export function getfinebi(data) {
  return request({
    url: '/queryweb/finebi',
    method: 'post',
    type: 'json',
    data
  })
}
export function importExcel(data) {
  return request({
    url: '/queryweb/importExcel',
    method: 'post',
    type: 'data',
    data
  })
}
export function getUpade(data) {
  return request({
    url: '/queryweb/upadate',
    method: 'post',
    type: 'json',
    data
  })
}
export function getDelete(data) {
  return request({
    url: '/queryweb/deletebyId',
    method: 'post',
    type: 'json',
    data
  })
}
export function getquerybyStacdt(data) {
  return request({
    url: '/queryweb/querybyStacdt',
    method: 'post',
    type: 'json',
    data
  })
}
export function getCode() {
  return request({
    url: '/queryweb/getCode',
    method: 'get'
  })
}
