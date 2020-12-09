import router, {constantRoutes} from "./router";
import store from "./store";
import { asyncRoutes } from '@/router/routerCenter'
import {
  getToken
} from "@/utils/auth"; // get token from cookie

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

const _import = require("./router/_import_" + process.env.NODE_ENV); // 获取组件的方法
import Layout from "@/layout";
import axios from "axios";
import api from "./api/apis/api.config";
import Router from "vue-router";
import tree from "element-ui/packages/table/src/store/tree"; // Layout 是架构组件，不在后台返回，在文件里单独引入

// 假装fakeRouter是通过后台接口请求回来的数据
var getRouter; // 用来获取后台拿到的路由
let datas = []
// 每次改完fakeRouter中数据，需要手动清除localStorage中router
const fakeRouter = {
  router: [
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.0.98:8075/webroot/decision/view/report?viewlet=%25E6%25B7%25BB%25E5%258A%25A0%25E6%258A%25A5%25E8%25A1%25A8-gao.cpt&op=write',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '数据录入',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.0.98:8075/webroot/decision/view/report?viewlet=%25E8%25A1%25A5%25E5%25BD%2595%25E6%258A%25A5%25E8%25A1%25A8-gao.cpt&op=write',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '数据补录',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/c870b649186a4d2f95b55304995f8150?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6ImM4NzBiNjQ5MTg2YTRkMmY5NWI1NTMwNDk5NWY4MTUwIiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.8GDoVAWML5BdF7kE5_8JujKc2n7E6KWz9E77js3b8gM',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '产品维度发行情况统计',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/98a535e72a9c401792d4f57354008a6a?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6Ijk4YTUzNWU3MmE5YzQwMTc5MmQ0ZjU3MzU0MDA4YTZhIiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.NRta3Gz37z6zrsAbiTgyNi1KygLpH4UbHie3Rg8_Syg',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '参团信息查询',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/23d481d083c74af9823807642817bf88?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6IjIzZDQ4MWQwODNjNzRhZjk4MjM4MDc2NDI4MTdiZjg4IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.hO6b_cyhimRyotCpIjeSuRANvNTHzIAEce1nJpLdl2E',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '投单次数排名统计',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/2b15609147634678b2da981619ab2ea7?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6IjJiMTU2MDkxNDc2MzQ2NzhiMmRhOTgxNjE5YWIyZWE3IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.EJrretBIu_L2nA41hfOUimltcOGfupefnYAfP90RZO8',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '系统使用情况统计',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/2699c5a7039e4aafa27e5d1935225a07?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6IjI2OTljNWE3MDM5ZTRhYWZhMjdlNWQxOTM1MjI1YTA3IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.mK7XH3eoK11w-IWjFo1E8QcGB6XauW33_XkJcI-d5kQ',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '主承发行量统计',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/6e413a4bcfe34fe3961af75459036a24?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6IjZlNDEzYTRiY2ZlMzRmZTM5NjFhZjc1NDU5MDM2YTI0IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.whnJpz8PwPmIzHCbGbxerwgI8-nUeSgb3ZAZkxoBwFE',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '债券信息明细表',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/df94baddab1d4519afbcd5f2dadbc689?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6ImRmOTRiYWRkYWIxZDQ1MTlhZmJjZDVmMmRhZGJjNjg5IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.-YGKxWBJDFkynVECSvP75c4cbeaXbleVTbJq5eOHXe4',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '月度发行情况统计',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/f673560006894c0499297422f92a42ed?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6ImY2NzM1NjAwMDY4OTRjMDQ5OTI5NzQyMmY5MmE0MmVkIiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.ZzM-Lg8qGgFqsFdMw6ok3kiZHDNuNDaguv3Q81DvS2I',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '簿记情况统计',
    //       'icon': 'form'
    //     }
    //   }]
    // },
    // {
    //   'path': '/form',
    //   'component': 'Layout',
    //   'redirect': '/form/index',
    //   'children': [{
    //     'path': 'http://10.10.80.172:37799/webroot/decision/v5/design/report/share/f0460439845345f4b655e1e66739267e?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6ImYwNDYwNDM5ODQ1MzQ1ZjRiNjU1ZTFlNjY3MzkyNjdlIiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.hMG8HIQnHfyZIu1q1Kyn8wNAWoV5zrVbbhx_i-OteTg',
    //     'name': 'Form',
    //     'component': 'form/index',
    //     'meta': {
    //       'title': '累计发行情况统计',
    //       'icon': 'form'
    //     }
    //   }]
    // }
  ],
};
let i = false;
 router.beforeEach(async (to, from, next) => {
   i = false;
   let  menu = localStorage.getItem("menuList");

   if(menu == null){
     i = true;
   }
   if (to.meta.title) {
     document.title = to.meta.title;
   }
   if(to.path == "/ChargeQuery"){
     next()
   }else{
     const hasToken = getToken()
     if (hasToken) {
       if (to.path === '/login') {
         next({
           path: '/'
         })
       } else {

         if (!getRouter) {
           if (!getObjArr('router')) {
             getRouter = fakeRouter.router
             saveObjArr('router', getRouter)
             routerGo(to, next)
  
           } else {
             getRouter = getObjArr('router')
             routerGo(to, next)
           }
         } else {
           next()
         }
       }
     } else {
       if (whiteList.indexOf(to.path) !== -1) {
         next()
       } else {
         next(`/login?redirect=${to.path}`)
       }
     }
   }
 })
router.afterEach(async (to, from) => {
  if(from.path == '/login' && to.path != '/login'){
    window.location.reload();
  }
});



function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter); // 过滤路由
  router.addRoutes(getRouter); // 动态添加路由
  store.dispatch("permission/generateRoutes", getRouter);
  next({
    ...to,
    replace: true,
  });
}



function saveObjArr(name, data) {
  // localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data));
}

function getObjArr(name) {
  // localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route) => {
    if (route.component) {
      if (route.component === "Layout" || route.component.name === "Layout") {
        route.component = Layout;
      } else {
        route.component = _import(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });

  return accessedRouters;
}
