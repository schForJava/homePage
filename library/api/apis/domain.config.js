const URLS = {
  development: {
    REQ_URL: "/queryweb",
    IP: "http://localhost:8080",
    firstStageIP: "http://10.10.54.199:7011", //一期iframe 请求地址
    exportIP: "http://10.10.54.199:8087", //一期导出接口
    reportIP: "http://10.10.82.252:8075" //帆软report接口
  },
  production: {
    REQ_URL: "/queryweb",
    IP: "/webroot2",
    firstStageIP: "http://10.1.57.133:80", //一期iframe 请求地址
    exportIP: "http://10.1.57.133:80", //一期导出接口
    reportIP: "http://10.1.57.133:80" //帆软report接口
  },
  test: {
    REQ_URL: "/queryweb",
    IP: "http://10.10.54.199:8080",
    firstStageIP: "http://10.10.54.199:7011", //一期iframe 请求地址
    exportIP: "http://10.10.54.199:8087", //一期导出接口
    reportIP: "http://10.10.54.199:7011" //帆软report接口
  },
};
const env =
  process.env.VUE_APP_TITLE === undefined ? "development" : process.env.VUE_APP_TITLE;
console.log(env)
export const REQ_URL = URLS[env].REQ_URL;
export const IP = URLS[env].IP;
export const firstStageIP = URLS[env].firstStageIP;
export const exportIP = URLS[env].exportIP;
export const reportIP = URLS[env].reportIP;