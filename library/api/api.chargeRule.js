import apiRequest from './api.request'

export default {
  // 计费规则录入，我发起的
  getChargeRules_mine(params) {
    return apiRequest.request('get', '/chargeRules-mine', params)
  },
  // 单据模板录入，我发起的
  getChargeRules_mine(params) {
    return apiRequest.request('get', '/template-mine', params)
  },
  // 计费规则复核/审批列表
  getChargeList(params) {
    return apiRequest.request('get', '/chargeRules', params)
  },
  // 单据模板复核列表
  getTemplates(params) {
    return apiRequest.request('get', '/templates', params)
  },
  // 单据模板查询
  queryTemplates(itemId, templateType) {
    let data = {xResponseType: 'text'};
    return apiRequest.request('get', `/template-default/${itemId}/${templateType}`, data);
  },
  // 单据模板录入
  enterTemplate(params) {
    return apiRequest.request('post', '/template', params, true)
  },
  // 获取单据模板复核详细信息
  getTemplateDetail(templateId) {
    return apiRequest.request('get', `/template/${templateId}`)
  },
  // 查看待复核单据模板html页面
  getCheckHtml(templateId) {
    let data = {xResponseType: 'text'};
    return apiRequest.request('get', `/template-html/${templateId}`, data);
  },
  // 单据模板复核
  reviewTemplate(params) {
    return apiRequest.request('put', '/template-check', params)
  },
  // 计费规则查询 簿记建档费
  getChargeRate(itemId) {
    return apiRequest.request('get', `/chargeRate/${itemId}`)
  },
  // 计费规则查询 挂牌服务费
  getListingRate(itemId) {
    return apiRequest.request('get', `/listingRate/${itemId}`)
  },
  // 查看修改明细
  getChargeRule(id) {
    return apiRequest.request('get', `/chargeRule/${id}`)
  },
  // 下载文件
  downloadFile(date) {
    let data = { apiRequest: date }
    data.xResponseType = 'blob'
    return apiRequest.request('get', '/queryweb/downExcelbyData', data);
  },
  // 计费规则录入
  addChargeRule(params) {
    return apiRequest.request('post', '/chargeRule', params, true)
  },
  // 计费规则复核
  reviewChargeRule(params) {
    return apiRequest.request('put', '/chargeRule-check', params)
  },
  // 计费规则审批
  approveChargeRUle(params) {
    return apiRequest.request('put', '/chargeRule-approve', params)
  },
  // 委债服务费
  commissionServiceFee(params) {
    return apiRequest.request('get', `/fee-pay-plans`, params)
  },
  // 主承销商列表
  getUnderwriterList() {
    return apiRequest.request('get', '/lead-underwriters')
  },
  // 查询节假日
  getHoliday(params) {
    return apiRequest.request('get', '/holiday', params)
  },
  saveHoliday(params) {
    return apiRequest.request('post', '/holiday', params)
  },
  deleteHoliday(params) {
    return apiRequest.request('delete', '/holiday', params)
  },
  // 查询已生效的主承销商折扣
  getActiveUnderwriters() {
    return apiRequest.request('get', `/active-underwriters`)
  },
  // 删除已生效的主承销商折扣
  deleteActiveUnderwriters(id) {
    return apiRequest.request('delete', `/active-underwriters/${id}`)
  },
  // 判断当前计费规则是否存在流程
  judgeHasFlow(itemId) {
    return apiRequest.request('get', `/checking-rule-exists/${itemId}`)
  },
  // 获得主承销商列表
  underwritersList(params) {
    return apiRequest.request('get', '/lead-underwriter-page', params)
  },
  // 删除主承销商
  delUnderWriter(id) {
    return apiRequest.request('delete', `/lead-underwriter/${id}`)
  },
  // 判断主承销商编码及主承销商全称的唯一性
  uniqueUnder(params) {
    return apiRequest.request('get', '/lead-underwriter-exists', params)
  },
  // 新增一个主承销商
  addUnderWriter(params) {
    return apiRequest.request('post', '/lead-underwriter', params)
  },
  // 将编辑完的主承销商信息更新
  putUnderWriter(params) {
    return apiRequest.request('put', '/lead-underwriter', params)
  }
}
