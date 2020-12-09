// import { Spin } from 'iview'
// import apiChargeRule from '../api/api.chargeRule'
// import apiExpense from '../api/api.expense'
// 计费规则
export const FORMULA_A = '单只债券的簿记建档费/发行服务费=该只债券发行成功金额*发行服务费费率*适用折扣。<br/>' +
  '若单只债券服务费依据上述公式计算超过20万元的，以20万元作为服务费计算上限，不足最低收费额的，按最低收费额收取。<br/>' +
  '最小单位为元，向下取整。\n'
export const FORMULA_B = '服务费=当期债权融资计划挂牌到账金额*产品期限*服务费费率<br/>' +
  '分为一次性支付和分次支付，由融资人在提交债权融资计划备案材料时进行支付方式选择。' +
  '选择一次性支付的，系统计算服务费总额，不计算分次支付服务费金额。' +
  '选择分次支付的，系统计算服务费总额及分次支付服务费金额<br/>分次支付服务费=当期债权融资计划挂牌到账金额*服务费费率，最后一年支付的服务费=服务费总额-往期分次支付服务费总额。\n'

export const COLUMNS_B = [
  {
    title: '序号',
    align: 'center',
    key: 'serialNumber'
  },
  {
    title: '含权类型（N+X）单位年',
    align: 'center',
    key: 'bondType'
  },
  {
    title: 'N适用费率',
    align: 'center',
    key: 'rateN'
  },
  {
    title: 'X适用费率',
    align: 'center',
    key: 'rateX'
  }
]

export const UNDERWRITER = [
  {
    title: '折扣',
    align: 'center',
    key: 'discount'
  },
  {
    title: '主承',
    align: 'center',
    key: 'companyName'
  }
]

// 计费对象
export const OBJECT_A = '簿记建档费/发行服务费的计费对象为发行人。'
export const OBJECT_B = '债权融资计划业务挂牌服务费的计费对象为融资人。'

// 缴款截止日
export const CLOSE_A = '簿记建档费/发行服务费的缴款截止日为缴款通知书生成后的十个工作日。'
export const CLOSE_B = '债权融资计划业务挂牌服务费的缴款截止日为缴款通知书生成后的十个工作日。'

// 主承销商折扣
export const DISCOUNT = '可选择开设债权融资计划及应收账款债权融资计划业务“主承销商”的机构，并为该机构设置折扣。当该机构作为某只债权融资计划产品的主承销商时，计费系统按照该处录入的主承销商折扣进行费用打折。'

export const DATETYPE = ['', '年', '月', '天']

export const STEPASTATUSA = ['', 'process', 'error', 'process', 'error', 'finish']
export const STEPACURRENTA = ['', 1, 1, 2, 2, 3]
export const BOND_TYPE = ['CP', 'MTN', 'SMECN', 'SMECNII', 'SCP', 'PPNCP', 'PPNMTN', 'ABN', 'PRN', 'PPNSMECN', 'PPNSMECNII', 'RB-PB', 'SDR']


export const NAFFILEDS = {
  paymentNoticeNo: '通知书编号',
  bondValueDate: '债券起息日',
  bondCode: '债券代码',
  bondFullName: '债券全称',
  publisherName: '发行人全称',
  timeLimit: '期限',
  actualPublishAmount: '实际发行额（万元）',
  preServiceFee: '优惠前服务费（元）',
  currentServiceFee: '优惠后服务费（元）',
  paymentStartDate: '缴款起始日',
  paymentEndDate: '缴款截止日',
  isOverdue: '逾期类型',
  status: '收费状态',
  finStatus: '财务状态'
}

export const CFAEFILEDS = {
  paymentNoticeNo: '通知书编号',
  listedStartdate: '挂牌时间',
  productCode: '产品代码',
  productFullName: '产品全称',
  productTimeLimit: '产品期限',
  sellerName: '融资人名称',
  underwriterName: '主承销商全称',
  listAmount: '融资额（万元）',
  suitableRate: '适用费率',
  preServiceFee: '优惠前服务费（元）',
  currentServiceFee: '优惠后服务费（元）',
  chargeType: '收取方式',
  paymentStartDate: '缴款起始日',
  paymentEndDate: '缴款截止日',
  status: '收费状态',
  finStatus: '财务状态'
}

// 重构债券期限数据
export function renderDeadlineData(data) {
  let renderData = []

  if (data) {
    data.forEach(item => {
      let obj = item
      if (!item.startValue) {
        obj.deadline = item.endValue + DATETYPE[item.endType] + '（含以下）'
      } else if (!item.endValue) {
        obj.deadline = item.startValue + DATETYPE[item.startType] + '以上'
      } else {
        obj.deadline = item.startValue + DATETYPE[item.startType] + '至' + item.endValue + DATETYPE[item.endType] + '（含）'
      }
      renderData.push(obj)
    })
  }

  return renderData
}

// 期限区间判断
export function intervalJudgment(modalData) {
  let flag = true
  // 判断长度是否为0
  if (modalData.length === 0) {
    return false
  }

  // 判断首区间
  if (
    modalData[0].startValue === undefined ||
    modalData[0].startValue === 0
  ) {
    flag = flag && true
  } else {
    flag = flag && false
  }

  // 判断区间是否连续
  flag = endStartJudge(flag, modalData)

  // 判断尾区间
  if (
    modalData[modalData.length - 1].endValue === undefined ||
    modalData[modalData.length - 1].endValue === 0
  ) {
    flag = flag && true
    delete modalData[modalData.length - 1].endValue
    delete modalData[modalData.length - 1].endType
  } else {
    flag = flag && false
  }
  return flag
}

export function endStartJudge(flag, modalData) {
  for (let i = 0; i < modalData.length - 1; i++) {
    if (
      modalData[i].endValue === modalData[i + 1].startValue &&
      modalData[i].endType === modalData[i + 1].startType
    ) {
      flag = flag && true
    } else {
      flag = flag && false
    }
  }
  let endData = modalData[modalData.length - 1]
  if (endData.startType < endData.endType) {
    flag = flag && false
  }
  return flag
}

// 费用状态
export const CalcStatus = ['未生效', '待收取', '部分到账', '已到账', '已入账', '已开票']

// 财务状态
export const FinStatus = ['入账', '挂账', '销账']

// 折扣类型
export const DiscountType = ['现场', '非现场']

// 流程类型
export const FlowType = ['特殊费率调整', '折扣类型修改', '撤销', '删除']

// 流程状态
export const ProcessStatus = ['待复核', '复核不通过', '待审批', '审批不通过', '审批通过']

// 流程状态-无审批
export const chargeProcess = ['待复核', '复核不通过', '复核通过']

// 支付方式
export const chargeType = ['一次性支付', '分次支付']

// 逾期类型
export const OVERDUE = ['未逾期', '已逾期']

export const CfaeItems = [
  {
    id: 3,
    businessPlatform: 'CFAE平台',
    businessType: '债权融资计划业务',
    productionType: '债权融资计划',
    expenseItem: '挂牌服务费'
  },
  {
    id: 4,
    businessPlatform: 'CFAE平台',
    businessType: '债权融资计划业务',
    productionType: '债权融资计划',
    expenseItem: '转让服务费'
  },
  {
    id: 5,
    businessPlatform: 'CFAE平台',
    businessType: '债权融资计划业务',
    productionType: '应收账款债权融资计划',
    expenseItem: '挂牌服务费'
  },
  {
    id: 6,
    businessPlatform: 'CFAE平台',
    businessType: '债权融资计划业务',
    productionType: '应收账款债权融资计划',
    expenseItem: '转让服务费'
  }
]

export const NafmiiItems = [
  {
    id: 1,
    businessPlatform: 'NAFMII平台',
    businessType: '非金融企业债务融资工具集中簿记建档业务',
    productionType: '非金融企业债务融资工具',
    expenseItem: '簿记建档费/发行服务费'
  },
  {
    id: 2,
    businessPlatform: 'NAFMII平台',
    businessType: '非金融机构合格投资人债券交易业务',
    productionType: '非金融企业债务融资工具',
    expenseItem: '交易服务费'
  }]

export const ExportColumns = [
  { title: '债券起息日', key: 'bondValueDate' },
  { title: '债券代码', key: 'bondCode' },
  { title: '债券全称', key: 'bondFullName' },
  { title: '发行人全称', key: 'publisherName' },
  { title: '期限', key: 'timeLimit' },
  { title: '实际发行额（亿元）', key: 'actualPublishAmount' },
  { title: '优惠前服务费（万元）', key: 'preServiceFee' },
  { title: '优惠后服务费（万元）', key: 'currentServiceFee' },
  { title: '缴款起始日', key: 'paymentStartDate' },
  { title: '缴款截止日', key: 'paymentEndDate' },
  { title: '逾期类型', key: 'isOverdue' },
  { title: '状态', key: 'status' }
]

export const NafmiiQueryExportColumns = [
  { title: '申购起始日', key: 'subBeginDate' },
  { title: '申购结束日', key: 'subEndDate' },
  { title: '债券起息日', key: 'bondValueDate' },
  { title: '债券代码', key: 'bondCode' },
  { title: '债券全称', key: 'bondFullName' },
  { title: '债券简称', key: 'bondShortName' },
  { title: '债券类型', key: 'bondType' },
  { title: '发行人全称', key: 'publisherName' },
  { title: '期限', key: 'timeLimit' },
  { title: '簿记管理人全称', key: 'bookManagerName' },
  { title: '主承销商全称', key: 'leadManagerName' },
  { title: '联席主承销商全称', key: 'joinManagerName' },
  { title: '折扣类型', key: 'discountType' },
  { title: '实际发行额（亿元）', key: 'actualPublishAmount' },
  { title: '优惠前服务费（万元）', key: 'preServiceFee' },
  { title: '优惠后服务费（万元）', key: 'currentServiceFee' },
  { title: '缴款起始日', key: 'paymentStartDate' },
  { title: '缴款截止日', key: 'paymentEndDate' },
  { title: '到账日期', key: 'arrivalDate' },
  { title: '缴款通知书编号', key: 'paymentNoticeNo' },
  { title: '收费状态', key: 'status' },
  { title: '逾期类型', key: 'isOverdue' },
  { title: '缴款负责人', key: 'dunnerName' }
]

export const ExportCfaeColumn = [
  { title: '挂牌时间', key: 'listedStartdate' },
  { title: '产品代码', key: 'productCode' },
  { title: '产品全称', key: 'productFullName' },
  { title: '产品期限', key: 'productTimeLimit' },
  { title: '融资人名称', key: 'sellerName' },
  { title: '主承销商全称', key: 'underwriterName' },
  { title: '融资额（万元）', key: 'listAmount' },
  { title: '适用费率', key: 'suitableRate' },
  { title: '收取方式', key: 'chargeType'},
  { title: '缴款通知书编号', key: 'paymentNoticeNo'},
  { title: '优惠前服务费（万元）', key: 'preServiceFee' },
  { title: '优惠后服务费（万元）', key: 'currentServiceFee' },
  { title: '缴款起始日（总）', key: 'paymentStartDate' },
  { title: '缴款截止日（总）', key: 'paymentEndDate' },
  { title: '收费状态（总）', key: 'status' },
  { title: '当期应收服务费（万元）', key: 'thisRevenueServiceFee' },
  { title: '当期缴款起始日', key: 'thisPaymentStartDate' },
  { title: '当期缴款截止日', key: 'thisPaymentEndDate' },
  { title: '当期到账日期', key: 'thisArrivalDate' },
  { title: '当期收费状态', key: 'thisStatus' },
  { title: '当期逾期类型', key: 'thisIsOverdue' },
  { title: '催缴负责人', key: 'dunnerName' }
]


// 下载文件
export function downloadFile(id) {
  Spin.show()
  apiChargeRule.downloadFile(id)
}

export function downloadInvoice(id) {
  Spin.show()
  apiExpense.getInvoicesFile(id)
}

export function downloadCertificate(params) {
  Spin.show()
  apiExpense.getCertificate(params).then((res) => {
    Spin.hide()
    download(res)
  }).catch(res => {
    Spin.hide()
  })
}

export function download(res) {
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
