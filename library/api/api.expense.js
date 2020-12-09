import apiRequest from './api.request'

export default {
  // 获取NAFMII平台台账导入列表
  get_NAF_List(params) {
    return apiRequest.request('get', '/calculations', params)
  },
  // 查询费用项目列表
  getItems() {
    return apiRequest.request('get', '/expense-items')
  },
  // 根据项目分类查询列表
  getItemsByPlatform(params) {
    return apiRequest.request('get', '/platform-expense-items', params)
  },
  // 操作-查看
  getChargeHistory(params) {
    return apiRequest.request('get', '/charge-histories', params)
  },
  // 查看naf平台已生效费用条目
  get_NAF_List_effect(params) {
    return apiRequest.request('get', '/nafmii-charge-items', params)
  },
  // 查看CFAE平台已生效费用条目
  get_CFAE_List_effect(params) {
    return apiRequest.request('get', '/cfae-charge-items', params)
  },
  // 展开查看CFAE平台已生效费用条目
  get_CFAE_List_effect_expand(params) {
    return apiRequest.request('get', '/cfae-charge-items-expand', params)
  },
  // 提交到复核
  addChargeHistory(params) {
    return apiRequest.request('post', '/charge-history', params, true)
  },
  // cfae分期列表
  get_CFAE_List_pay(listingId) {
    return apiRequest.request('get', `/cfae-calculation/${listingId}`)
  },
  // 获取复核列表-naf
  get_NAF_List_review(params) {
    return apiRequest.request('get', '/checking-bond-charge-histories/nafmii', params)
  },
  // 获取复核列表-cfae
  get_CFAE_List_review(params) {
    return apiRequest.request('get', '/checking-bond-charge-histories/cfae', params)
  },
  // 查看我发起的申请列表-nafmii
  get_NAF_List_mine(params) {
    return apiRequest.request('get', '/mine-bond-charge-histories/nafmii', params)
  },
  // 查看我发起的申请列表-cfae
  get_CFAE_List_mine(params) {
    return apiRequest.request('get', '/mine-bond-charge-histories/cfae', params)
  },
  // 日志查询-naf
  get_NAF_List_log(params) {
    return apiRequest.request('get', '/charge-histories-logs/nafmii', params)
  },
  // 日志查询-cfae
  get_CFAE_List_log(params) {
    return apiRequest.request('get', '/charge-histories-logs/cfae', params)
  },
  // 费用历史详细信息
  get_Details(params) {
    return apiRequest.request('get', '/charge-histories-details', params)
  },
  // 复核-通过/不通过
  reviewPass(params) {
    return apiRequest.request('put', '/charge-history', params)
  },
  // 上传发票
  postInvoices(params) {
    return apiRequest.request('post', '/invoice', params, true)
  },
  // 发票列表
  getInvoices(params) {
    return apiRequest.request('get', '/invoices', params)
  },
  // 发票文件下载
  getInvoicesFile(invoiceId) {
    let data = {xResponseType: 'blob'}
    return apiRequest.request('get', `/invoice/${invoiceId}`, data)
  },
  // 下载凭证
  getCertificate(params) {
    params.xResponseType = 'blob'
    return apiRequest.request('get', '/service-fee-certificate', params)
  },
  // 打印
  printCertificate(params) {
    if (params instanceof URLSearchParams) {
      params.append('xResponseType', 'text')
    } else {
      params.xResponseType = 'text'
    }
    return apiRequest.request('get', `/service-fee-certificate-html`, params)
  },
  // 删除到账历史
  delChargeHistory(chargeHistoryId) {
    return apiRequest.request('delete', `/charge-history/${chargeHistoryId}`)
  },
  // 更新到帐历史
  updateChargeHistory(params) {
     return apiRequest.request('put', `/charge-history`, params)
  }
}
