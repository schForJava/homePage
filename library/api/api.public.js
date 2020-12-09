import request from "@/utils/request";
import api from "./apis/api.config";
export function selectTime(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/selectTime",
    method: "post",
    type: "json",
    data,
  });
}
export function getDatas(data) {
  return request({
    url: api.IP + "/queryweb/query",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo1(data) {
  return request({
    url: api.IP + "/releDoc/queryList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo2(data) {
  return request({
    url: api.IP + "/pubIssue/queryList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo3(data) {
  return request({
    url: api.IP + "/focusDis/queryList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo4(data) {
  return request({
    url: api.IP + "/dayIssue/queryHisList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo5(data) {
  return request({
    url: api.IP + "/purposeOFFunDsraised/getHisList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo5IfDownload(data) {
  return request({
    url: api.IP + "/purposeOFFunDsraised/IfDownload",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo5Select(data) {
  return request({
    url: api.IP + "/purposeOFFunDsraised/getBondClassList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoPdfList(data) {
  return request({
    url: api.IP + "/purposeOFFunDsraised/getAttachment",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo6(data) {
  return request({
    url: api.IP + "/ppnPublish/getHisList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoSelect(data) {
  return request({
    url: api.IP + "/ppnPublish/getNoticeTitle",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo7(data) {
  return request({
    url: api.IP + "/absDisclosure/getHisList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfo7Select(data) {
  return request({
    url: api.IP + "/absDisclosure/getBondClassList",
    method: "post",
    type: "json",
    data,
  });
}
export function getMailing(data) {
  return request({
    url: api.IP + "/mail/getMailList",
    method: "post",
    type: "json",
    data,
  });
}
export function getEmailConfig(data) {
  return request({
    url: api.IP + "/mail/showJobMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getUpdateMail(data) {
  return request({
    url: api.IP + "/mail/updateMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getMailShowMail(data) {
  return request({
    url: api.IP + "/mail/showMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getMailOneClickSend(data) {
  return request({
    url: api.IP + "/mail/oneClickSend",
    method: "post",
    type: "json",
    data,
  });
}
export function getMailPaperList(data) {
  return request({
    url: api.IP + "/mail/getMailPaperList",
    method: "post",
    type: "json",
    data,
  });
}
export function getMailList(data) {
  return request({
    url: api.IP + "/mail/getMailList",
    method: "post",
    type: "json",
    data,
  });
}
export function getMailFileSingle(data) {
  return request({
    url: api.IP + "/mail/getMailFileSingle",
    method: "post",
    type: "json",
    data,
  });
}

export function getWkbCbsStadBook(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/selectDownExclAll",
    method: "post",
    type: "json",
    data,
  });
}

export function getStadBookPage(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/stadBookPage",
    method: "post",
    type: "json",
    data,
  });
}
export function getStadBookDelete(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/stadBookDelete",
    method: "post",
    type: "json",
    data,
  });
}
export function getSelectCode(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/selectCode",
    method: "post",
    type: "json",
    data,
  });
}
export function getStadBookUpdate(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/stadBookUpdate",
    method: "post",
    type: "json",
    data,
  });
}
export function getSelectCodeTwo(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/selectCodeTwo",
    method: "post",
    type: "json",
    data,
  });
}
export function getSelectAllLog(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/selectAllLog",
    method: "post",
    type: "json",
    data,
  });
}
export function getWkbCbsStadBookSelectTime(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/selectTime",
    method: "post",
    type: "json",
    data,
  });
}
// VX简报接口
export function getWechatBriefingGetHtml(data) {
  return request({
    url: api.IP + "/wechatBriefing/getHtml",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookBuildingGetHtml(data) {
  return request({
    url: api.IP + "/bookBuilding/getHtml",
    method: "post",
    type: "json",
    data,
  });
}

export function getWkbWcMinQueryList(data) {
  return request({
    url: api.IP + "/wkbWcMin/queryList",
    method: "post",
    type: "json",
    data,
  });
}
export function getSWkbWcMinMessageType(data) {
  return request({
    url: api.IP + "/wkbWcMin/messageType",
    method: "post",
    type: "json",
    data,
  });
}
export function getWkbWcMinDelVx(data) {
  return request({
    url: api.IP + "/wkbWcMin/delVx",
    method: "post",
    type: "json",
    data,
  });
}
export function getWkbWcMinAddVx(data) {
  return request({
    url: api.IP + "/wkbWcMin/addVx",
    method: "post",
    type: "json",
    data,
  });
}
export function getWkbWcMinGetWcMinById(data) {
  return request({
    url: api.IP + "/wkbWcMin/getWcMinById",
    method: "post",
    type: "json",
    data,
  });
}
export function getSociallist(data) {
  return request({
    url: api.IP + "/SocialFinance/getsociallist",
    method: "post",
    type: "json",
    data,
  });
}
export function getUpdatesocial(data) {
  return request({
    url: api.IP + "/SocialFinance/updatesocial",
    method: "post",
    type: "json",
    data,
  });
}
export function getWkbWcMinUpdateVx(data) {
  return request({
    url: api.IP + "/wkbWcMin/updateVx",
    method: "post",
    type: "json",
    data,
  });
}

//备案确认情况
export function getPutRecordGetAllRecord(data) {
  return request({
    url: api.IP + "/putRecord/getAllRecord",
    method: "post",
    type: "json",
    data,
  });
}

export function getPutRecordEexport(data) {
  return request({
    url: api.IP + "/putRecord/export",
    method: "post",
    type: "json",
    data,
  });
}
export function getAuditRecordsSelectAll(data) {
  return request({
    url: api.IP + "/auditRecords/selectAll",
    method: "post",
    type: "json",
    data,
  });
}
export function getAuditRecordsAddAuditRecords(data) {
  return request({
    url: api.IP + "/auditRecords/addAuditRecords",
    method: "post",
    type: "json",
    data,
  });
}
export function getAuditRecordsUpdateAuditRecords(data) {
  return request({
    url: api.IP + "/auditRecords/updateAuditRecords",
    method: "post",
    type: "json",
    data,
  });
}
export function getAuditRecordsDeleteAuditRecords(data) {
  return request({
    url: api.IP + "/auditRecords/deleteAuditRecords",
    method: "post",
    type: "json",
    data,
  });
}
export function getAuditRecordsGetAuditNameAll(data) {
  return request({
    url: api.IP + "/auditRecords/getAuditNameAll",
    method: "post",
    type: "json",
    data,
  });
}
export function getAuditRecordsGetIssuerNameAll(data) {
  return request({
    url: api.IP + "/auditRecords/getIssuerNameAll",
    method: "post",
    type: "json",
    data,
  });
}
//数据发送
export function getDataBookJbBookTypeJb(data) {
  return request({
    url: api.IP + "/dataBookJb/bookTypeJb",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataBookJbBookDcmJb(data) {
  return request({
    url: api.IP + "/dataBookJb/bookDcmJb",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataBookJbExport(data) {
  return request({
    url: api.IP + "/dataBookJb/export",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataBoCokJbBookPpnJb(data) {
  return request({
    url: api.IP + "/dataBookJb/bookPpnJb",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataGramQueryList(data) {
  return request({
    url: api.IP + "/dataGram/queryList",
    method: "post",
    type: "json",
    data,
  });
}
export function getSettlementList(data) {
  return request({
    url: api.IP + "/Settlement/List",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookPingList(data) {
  return request({
    url: api.IP + "/BookPing/List",
    method: "post",
    type: "json",
    data,
  });
}
export function getWeChatPingWechatList1(data) {
  return request({
    url: api.IP + "/WeChatPing/WechatList1",
    method: "post",
    type: "json",
    data,
  });
}
export function getwWbCbsStadBookWebDateWeekly(data) {
  return request({
    url: api.IP + "/wkbCbsStadBook/webDateWeekly",
    method: "post",
    type: "json",
    data,
  });
}

//孔开系统数据
export function getOpenHoleQueryList(data) {
  return request({
    url: api.IP + "/openHole/queryList",
    method: "post",
    type: "json",
    data,
  });
}
export function getOpenHoleQueryName(data) {
  return request({
    url: api.IP + "/openHole/queryName",
    method: "post",
    type: "json",
    data,
  });
}

//备案新增审计接口
export function getScplIsAudtSelectAll(data) {
  return request({
    url: api.IP + "/scplIsAudt/selectAll",
    method: "post",
    type: "json",
    data,
  });
}
export function getScplIsAudtAddScplIs(data) {
  return request({
    url: api.IP + "/scplIsAudt/addScplIs",
    method: "post",
    type: "json",
    data,
  });
}
export function getScplIsAudtDeleteScplIs(data) {
  return request({
    url: api.IP + "/scplIsAudt/deleteScplIs",
    method: "post",
    type: "json",
    data,
  });
}
//到期违约债务台账
export function getDefaultDueBookSelectPageDefault(data) {
  return request({
    url: api.IP + "/defaultDueBook/selectPageDefault",
    method: "post",
    type: "json",
    data,
  });
}
export function getDefaultDueBookDeleteDefault(data) {
  return request({
    url: api.IP + "/defaultDueBook/deleteDefault",
    method: "post",
    type: "json",
    data,
  });
}
export function getDefaultDueBookUpdateDefault(data) {
  return request({
    url: api.IP + "/defaultDueBook/updateDefault",
    method: "post",
    type: "json",
    data,
  });
}
export function getDefaultDueBookSelectCode(data) {
  return request({
    url: api.IP + "/defaultDueBook/selectCode",
    method: "post",
    type: "json",
    data,
  });
}
export function getDefaultDueBookCheckBook(data) {
  return request({
    url: api.IP + "/defaultDueBook/checkBook",
    method: "post",
    type: "json",
    data,
  });
}
//信披 日终-一键导出/一键发送
export function getInfoDiscMail(data) {
  return request({
    url: api.IP + "/infoDiscMail/getMailList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscMailConfig(data) {
  return request({
    url: api.IP + "/infoDiscMail/showJobMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscMailUpdateMail(data) {
  return request({
    url: api.IP + "/infoDiscMail/updateMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscMailShowMail(data) {
  return request({
    url: api.IP + "/infoDiscMail/showMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscMailOneClickSend(data) {
  return request({
    url: api.IP + "/infoDiscMail/oneClickSend",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscMailPaperList(data) {
  return request({
    url: api.IP + "/infoDiscMail/getMailPaperList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscMailList(data) {
  return request({
    url: api.IP + "/infoDiscMail/getMailList",
    method: "post",
    type: "json",
    data,
  });
}
export function getInfoDiscSendMailList(data) {
  return request({
    url: api.IP + "/infoDiscMail/sendMailList",
    method: "post",
    type: "json",
    data,
  });
}
//取消或推迟原因
export function getCancelCancelQuery(data) {
  return request({
    url: api.IP + "/cancel/cancelQuery",
    method: "post",
    type: "json",
    data,
  });
}
export function getCancelCancelUpdate(data) {
  return request({
    url: api.IP + "/cancel/cancelUpdate",
    method: "post",
    type: "json",
    data,
  });
}
//中石油服务费信息查询
export function getOcsBondCalSselectAll(data) {
  return request({
    url: "/ChargeQuery/ocsBondCalc/selectAll",
    method: "post",
    type: "json",
    data,
  });
}
//微信版每周/每月/每季度发行数据统计表
export function getQuartQueryBondData(data) {
  return request({
    url:  api.IP+"/quart/queryBondData",
    method: "post",
    type: "json",
    data,
  });
}

//每周债券发行基本信息表（发送机构合作部）生成与发送
export function getWeekQueryList(data) {
  return request({
    url:  api.IP+"/week/queryList",
    method: "post",
    type: "json",
    data,
  });
}

//每周债券发行基本信息表（发送机构合作部）生成与发送
export function getEveryQuarterQueryPage(data) {
  return request({
    url:  api.IP+"/everyQuarter/queryPage",
    method: "post",
    type: "json",
    data,
  });
}

//N+X 新增tabs标签页接口
export function getOpenHoleQueryNxList(data) {
  return request({
    url:  api.IP+"/openHole/queryNxList",
    method: "post",
    type: "json",
    data,
  });
}

//簿记邮件发送
export function getBookkeepingMail(data) {
  return request({
    url: api.IP + "/bookkeepingMail/getMailList",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailConfig(data) {
  return request({
    url: api.IP + "/bookkeepingMail/showJobMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailUpdateMail(data) {
  return request({
    url: api.IP + "/bookkeepingMail/updateMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailShowMail(data) {
  return request({
    url: api.IP + "/bookkeepingMail/showMail",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailOneClickSend(data) {
  return request({
    url: api.IP + "/bookkeepingMail/oneClickSend",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailPaperList(data) {
  return request({
    url: api.IP + "/bookkeepingMail/getMailPaperList",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailList(data) {
  return request({
    url: api.IP + "/bookkeepingMail/getMailList",
    method: "post",
    type: "json",
    data,
  });
}
export function getBookkeepingMailSendMailList(data) {
  return request({
    url: api.IP + "/bookkeepingMail/sendMailList",
    method: "post",
    type: "json",
    data,
  });
}

//工作台数据提取与数据比对
export function getDataComparePageInfoQuery(data) {
  return request({
    url: api.IP + "/dataCompare/pageInfoQuery",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataCompareFinishBond(data) {
  return request({
    url: api.IP + "/dataCompare/finishBond",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataComparePageBookInfoQuery(data) {
  return request({
    url: api.IP + "/dataCompare/pageBookInfoQuery",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataCompareSelectBondConfInfo(data) {
  return request({
    url: api.IP + "/dataCompare/selectBondConfInfo",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataCompareUpdateResult(data) {
  return request({
    url: api.IP + "/dataCompare/updateResult",
    method: "post",
    type: "json",
    data,
  });
}
export function getDataCompareSelectBondType(data) {
  return request({
    url: api.IP + "/dataCompare/selectBondType",
    method: "post",
    type: "json",
    data,
  });
}
//信用风险缓释凭证台账
export function getCreditVoucherSelectAll(data) {
  return request({
    url: api.IP + "/creditVoucher/selectAll",
    method: "post",
    type: "json",
    data,
  });
}
export function getCreditVoucherEditCVou(data) {
  return request({
    url: api.IP + "/creditVoucher/editCVou",
    method: "post",
    type: "json",
    data,
  });
}
export function getCreditVoucherSelectByFullName(data) {
  return request({
    url: api.IP + "/creditVoucher/selectByFullName",
    method: "post",
    type: "json",
    data,
  });
}
export function getCreditVoucherDeleteList(data) {
  return request({
    url: api.IP + "/creditVoucher/deleteList",
    method: "post",
    type: "json",
    data,
  });
}
export function getCreditVoucherCheckVou(data) {
  return request({
    url: api.IP + "/creditVoucher/checkVou",
    method: "post",
    type: "json",
    data,
  });
}
export function getCreditVoucherUpdateByFullName(data) {
  return request({
    url: api.IP + "/creditVoucher/updateByFullName",
    method: "post",
    type: "json",
    data,
  });
}
export function getCreditVoucherSelectByCode(data) {
  return request({
    url: api.IP + "/creditVoucher/selectByCode",
    method: "post",
    type: "json",
    data,
  });
}

export function getSysDate(data) {
  return request({
    url: api.IP + "/absDisclosure/getSysDate",
    method: "post",
    type: "json",
    data,
  });
}
export function sendMail(data) {
  return request({
    url: api.IP + "/bookkeepingMail/sendMail",
    method: "post",
    type: "json",
    data,
  });
}
export function addCreditVoucher(data) {
  return request({
    url: api.IP + "/creditVoucher/addCVou",
    method: "post",
    type: "json",
    data,
  });
}