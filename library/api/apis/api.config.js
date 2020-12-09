import {
  REQ_URL,
  IP,
  firstStageIP,
  reportIP,
  exportIP
} from './domain.config'
/**
 * 接口公共配置
 */
// 可以按模块写，也可以按系统写
const cfae = {
  userLogin: `${REQ_URL}/login`, // 登录
  IP: `${IP}`, // 服务器IP
  firstStageIP: `${firstStageIP}`,
  exportIP: `${exportIP}`,
  reportIP: `${reportIP}`,
}
const Api = {
  ...cfae
}
export default Api