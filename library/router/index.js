/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";
import {asyncRoutes} from '@/router/routerCenter'
import axios from "axios";
import api from "../api/apis/api.config";
import da from "element-ui/src/locale/lang/da";


Vue.use(Router);
let isSidebar = false;
let datas = []

export const constantRoutes = [{
    path: "/login",
    component: () => import("~/pages/login/index"),
    hidden: true,
},
    {
        path: "/ChargeQuery",
        component: () => import("~/pages/ChargeQuery"),
        meta: {
            title: "服务费信息查询",
        },
        hidden: true,
    },
    {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [{
            path: "home",
            component: () => import("~/pages/home/index"),
            name: "首页",
            meta: {
                title: "首页",
                icon: "yewu",
                affix: true,
            },
        },],
    },

];

function arrayPas(array, str) {

    //var index = array.findIndex(item => item.id=== str)

    var index = array.indexOf(str)  // 当数组里的对象为字符串时用这个方法更简单

    return index  // -1


}


const newlist = () => {

    let menu = localStorage.getItem("menuList")

    if (menu == null) {
        datas = [];
    } else {

        datas = menu.split(",")
        asyncRoutes.forEach(item => {
            let children2 = item.children;
            item.children = [];
            children2.forEach(menu => {
                if (menu.children) {
                    let children3 = menu.children;
                    menu.children = [];
                    children3.forEach(menu2 => {
                        if (arrayPas(datas, menu2.path) == -1) {
                            menu.children.push(menu2);
                        }
                    })
                    if (menu.children.length > 0) {
                        item.children.push(menu);
                    }
                } else if (arrayPas(datas, menu.path) == -1) {
                    item.children.push(menu);
                }
            })
            if (item.children.length > 0) {
                constantRoutes.push(item);
            }

        })
    }
}

newlist();

const createRouter = () =>
    new Router({
        scrollBehavior: () => ({
            y: 0,
        }),
        routes: constantRoutes,
    });

const router = createRouter();
router.selfaddRoutes = function (params) {
    router.matcher = new Router().matcher;
    router.addRoutes(params);
};

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;