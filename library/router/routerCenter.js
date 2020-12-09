/*  需要动态=========判断权限的路由  */
import Layout from '@/layout'

let isSidebar = false;
export const asyncRoutes = [
    {
        path: "/keepRecord",
        component: Layout,
        children: [{
            path: "/keepRecord",
            component: () => import("~/pages/keepRecord"),
            name: "备案确认情况",
            meta: {
                title: "备案确认情况",
                icon: "yewu",
                // affix: true
            },
        },],
    },
    {
        path: "/edit15",
        component: Layout,
        meta: {
            title: "簿记建档日报",
            icon: "yewu",
            affix: true,
        },
        children: [{
            // 集中簿记建档发行简报
            path: "/edit15",
            component: () => import("~/pages/table/Edit15"),
            name: "发行简报",
            meta: {
                title: "发行简报",
                icon: "yewu",
                affix: true,
            },
        },
            {
                path: "/creditorFinancing/filingBulletin",
                component: () => import("~/pages/creditorFinancing/filingBulletin"),
                name: "微信简报",
                meta: {
                    title: "微信简报",
                    icon: "yewu",
                    affix: true,
                },
            },
            {
                path: "/dataReport/info1",
                component: () => import("~/pages/dataReport/info1"),
                name: "完成向清算所发送登记材料（发行成功）债券情况汇总表",
                meta: {
                    title: "完成向清算所发送登记材料（发行成功）债券情况汇总表",
                    icon: "yewu",
                    // affix: true
                },
            },
            {
                path: "/dataReport/info3",
                meta: {
                    title: "官网公众号（研究部）",
                    icon: "yewu",
                    // affix: true
                },
                component: () => import("~/pages/dataReport/info3"),
                children: [{
                    path: "/dataReport/info3_1",
                    component: () => import("~/pages/dataReport/info3/info3_1"),
                    name: "集中簿记建档情况简报",
                    meta: {
                        title: "集中簿记建档情况简报",
                        icon: "yewu",
                        // affix: true
                    },
                },
                    {
                        path: "/dataReport/info3_2",
                        component: () => import("~/pages/dataReport/info3/info3_2"),
                        name: "微信公众平台信息发布",
                        meta: {
                            title: "微信公众平台信息发布",
                            icon: "yewu",
                            // affix: true
                        },
                    },
                ],
            },
            {
                path: "/edit12",
                meta: {
                    title: "台账/基础数据",
                    icon: "yewu",
                    // affix: true
                },
                component: () => import("~/pages/table/Edit12"),
                children: [{
                    path: "/edit12",
                    component: () => import("~/pages/table/Edit12"),
                    name: "簿记台账",
                    meta: {
                        title: "簿记台账",
                        icon: "yewu",
                        affix: true,
                    },
                },
                    {
                        path: "/creditVoucher",
                        component: () => import("~/pages/creditVoucher"),
                        name: "CRMW台账",
                        meta: {
                            title: "CRMW台账",
                            icon: "yewu",
                            affix: true,
                        },
                        // hidden: true,
                    },
                    {
                        path: "/cancellation",
                        component: () => import("~/pages/cancellation"),
                        name: "取消或推迟原因",
                        meta: {
                            title: "取消或推迟原因",
                            icon: "yewu",
                            affix: true,
                        },
                    },
                    {
                        // 社会融资规模增量
                        path: "/edit14",
                        component: () => import("~/pages/table/Edit14"),
                        name: "社会融资规模增量",
                        meta: {
                            title: "社会融资规模增量",
                            icon: "yewu",
                            affix: true,
                        },
                    },
                ],
            },]
    },
    {
        path: "/infoRmation/infoMailing",
        component: Layout,
        meta: {
            title: "信息披露日报",
            icon: "yewu",
            affix: true,
        },
        children: [{
            path: "/infoRmation/infoMailing",
            component: () => import("~/pages/infoRmation/infoMailing"),
            name: "信息披露一键报送",
            meta: {
                title: "信息披露一键报送",
                icon: "yewu",
                affix: true,
            },
        },
            {
                path: "/infoRmation/Info1",
                meta: {
                    title: "日中",
                    icon: "yewu",
                    // affix: true
                },
                component: () => import("~/pages/infoRmation/Info1"),
                children: [{
                    path: "/infoRmation/Info1",
                    component: () => import("~/pages/infoRmation/Info1"),
                    name: "发行文件披露情况表",
                    meta: {
                        title: "发行文件披露情况表",
                        icon: "yewu",
                        affix: true,
                    },
                },
                    {
                    path: "/infoRmation/Info2",
                    component: () => import("~/pages/infoRmation/Info2"),
                    name: "公开发行债券信息表",
                    meta: {
                        title: "公开发行债券信息表",
                        icon: "yewu",
                        affix: true,
                    },
                },
                ],
            },
            {
                path: "/infoRmation/Info3",
                meta: {
                    title: "日终",
                    icon: "yewu",
                    // affix: true
                },
                component: () => import("~/pages/infoRmation/Info3"),
                children: [{
                    path: "/infoRmation/Info3",
                    component: () => import("~/pages/infoRmation/Info3"),
                    name: "集中披露带附件个数明细表",
                    meta: {
                        title: "集中披露带附件个数明细表",
                        icon: "yewu",
                        affix: true,
                    },
                },
                    {
                        path: "/infoRmation/Info4",
                        component: () => import("~/pages/infoRmation/Info4"),
                        name: "发行取消发行情况表",
                        meta: {
                            title: "发行取消发行情况表",
                            icon: "yewu",
                            affix: true,
                        },
                    },
                    {
                        path: "/infoRmation/Info5",
                        component: () => import("~/pages/infoRmation/Info5"),
                        name: "募集资金用途变更公告",
                        meta: {
                            title: "募集资金用途变更公告",
                            icon: "yewu",
                            affix: true,
                        },
                    },
                ],
            },

        ],
    },
    {
        path: "/dataReport/info1",
        component: Layout,
        meta: {
            title: "数据报送",
            icon: "yewu",
            affix: true,
        },
        children: [{
            path: "/dataReport/info1",
            component: () => import("~/pages/dataReport/info1"),
            name: "完成向清算所发送登记材料（发行成功）债券情况汇总表",
            meta: {
                title: "完成向清算所发送登记材料（发行成功）债券情况汇总表",
                icon: "yewu",
                // affix: true
            },
        },
            {
                path: "/dataReport/info2",
                component: () => import("~/pages/dataReport/info2"),
                name: "集中簿记建档季度报告文档文件（报协会）",
                meta: {
                    title: "集中簿记建档季度报告文档文件（报协会）",
                    icon: "yewu",
                    // affix: true
                },
            },
            {
                path: "/dataReport/info3",
                meta: {
                    title: "集中簿记建档情况文档文件（报研究发展部）",
                    icon: "yewu",
                    // affix: true
                },
                component: () => import("~/pages/dataReport/info3"),
                children: [{
                    path: "/dataReport/info3_1",
                    component: () => import("~/pages/dataReport/info3/info3_1"),
                    name: "集中簿记建档情况简报",
                    meta: {
                        title: "集中簿记建档情况简报",
                        icon: "yewu",
                        // affix: true
                    },
                },
                    {
                        path: "/dataReport/info3_2",
                        component: () => import("~/pages/dataReport/info3/info3_2"),
                        name: "微信公众平台信息发布",
                        meta: {
                            title: "微信公众平台信息发布",
                            icon: "yewu",
                            // affix: true
                        },
                    },
                ],
            },

            {
                path: "/dataReport/info4",
                component: () => import("~/pages/dataReport/info4"),
                name: "集中簿记建档情况表格文件（报结算服务部）",
                meta: {
                    title: "集中簿记建档情况表格文件（报结算服务部）",
                    icon: "yewu",
                    // affix: true
                },
            },
        ],
    },
]