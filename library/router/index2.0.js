/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';
Vue.use(Router);
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import('~/pages/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            component: () =>
                import('~/pages/home/index'),
            name: '首页',
            meta: {
                title: '首页',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/edit3',
        component: Layout,
        children: [{
            path: "/edit3",
            component: () =>
                import('~/pages/table/Edit3'),
            name: '产品维度发行情况统计',
            meta: {
                title: '产品维度发行情况统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit4',
        component: Layout,
        children: [{
            path: "/edit4",
            component: () =>
                import('~/pages/table/Edit4'),
            name: '参团信息查询',
            meta: {
                title: '参团信息查询',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit5',
        component: Layout,
        children: [{
            path: "/edit5",
            component: () =>
                import('~/pages/table/Edit5'),
            name: '投单次数排名统计',
            meta: {
                title: '投单次数排名统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit6',
        component: Layout,
        children: [{
            path: "/edit6",
            component: () =>
                import('~/pages/table/Edit6'),
            name: '系统使用情况统计',
            meta: {
                title: '系统使用情况统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit7',
        component: Layout,
        children: [{
            path: "/edit7",
            component: () =>
                import('~/pages/table/Edit7'),
            name: '主承发行量统计',
            meta: {
                title: '主承发行量统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit8',
        component: Layout,
        children: [{
            path: "/edit8",
            component: () =>
                import('~/pages/table/Edit8'),
            name: '债券信息明细表',
            meta: {
                title: '债券信息明细表',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit9',
        component: Layout,
        children: [{
            path: "/edit9",
            component: () =>
                import('~/pages/table/Edit9'),
            name: '月度发行情况统计',
            meta: {
                title: '月度发行情况统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit10',
        component: Layout,
        children: [{
            path: "/edit10",
            component: () =>
                import('~/pages/table/Edit10'),
            name: '簿记情况统计',
            meta: {
                title: '簿记情况统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/edit11',
        component: Layout,
        children: [{
            path: "/edit11",
            component: () =>
                import('~/pages/table/Edit11'),
            name: '累计发行情况统计',
            meta: {
                title: '累计发行情况统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    // 地域发行情况统计
    {
        path: '/edit16',
        component: Layout,
        children: [{
            path: "/edit16",
            component: () =>
                import('~/pages/table/Edit16'),
            name: "地域发行情况统计",
            meta: {
                title: '地域发行情况统计',
                icon: 'yewu',
                affix: true
            }
        }]
    }, // 地域发行情况统计
    {
        path: '/edit17',
        component: Layout,
        children: [{
            path: "/edit17",
            component: () =>
                import('~/pages/table/Edit17'),
            name: "信息披露质量统计",
            meta: {
                title: '信息披露质量统计',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    // 集中簿记建档发行简报
    {
        path: '/edit15',
        component: Layout,
        children: [{
            path: "/edit15",
            component: () =>
                import('~/pages/table/Edit15'),
            name: "集中簿记建档发行简报",
            meta: {
                title: '集中簿记建档发行简报',
                icon: 'yewu',
                affix: true
            }
        }]
    },

    // 台账导入
    {
        path: '/edit12',
        component: Layout,
        children: [{
            path: "/edit12",
            component: () =>
                import('~/pages/table/Edit12'),
            name: "台账导入",
            meta: {
                title: '台账导入',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    // 债权融资计划发行规模
    {
        path: '/edit13',
        component: Layout,
        children: [{
            path: "/edit13",
            component: () =>
                import('~/pages/table/Edit13'),
            name: "债权融资计划发行规模",
            meta: {
                title: '债权融资计划发行规模',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    // 社会融资规模增量
    {
        path: '/edit14',
        component: Layout,
        children: [{
            path: "/edit14",
            component: () =>
                import('~/pages/table/Edit14'),
            name: "社会融资规模增量",
            meta: {
                title: '社会融资规模增量',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    // BI自助分析工具
    {
        path: '/edit18',
        component: Layout,
        children: [{
            path: "/edit18",
            component: () =>
                import('~/pages/table/Edit18'),
            name: "BI自助分析工具",
            meta: {
                title: 'BI自助分析工具',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/infoRmation/Info1',
        component: Layout,
        children: [{
            path: "/infoRmation/Info1",
            component: () =>
                import('~/pages/infoRmation/Info1'),
            name: "发行文件披露情况表（日中）",
            meta: {
                title: '发行文件披露情况表（日中）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/infoRmation/Info2',
        component: Layout,
        children: [{
            path: "/infoRmation/Info2",
            component: () =>
                import('~/pages/infoRmation/Info2'),
            name: "公开发行债券信息表（日中）",
            meta: {
                title: '公开发行债券信息表（日中）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/infoRmation/Info3',
        component: Layout,
        children: [{
            path: "/infoRmation/Info3",
            component: () =>
                import('~/pages/infoRmation/Info3'),
            name: "集中披露带附件个数明细表（日终）",
            meta: {
                title: '集中披露带附件个数明细表（日终）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/infoRmation/Info4',
        component: Layout,
        children: [{
            path: "/infoRmation/Info4",
            component: () =>
                import('~/pages/infoRmation/Info4'),
            name: "当日披露发行文件及申请取消发行债券基本信息列表（日终）",
            meta: {
                title: '当日披露发行文件及申请取消发行债券基本信息列表（日终）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/infoRmation/Info5',
        component: Layout,
        children: [{
            path: "/infoRmation/Info5",
            component: () =>
                import('~/pages/infoRmation/Info5'),
            name: "募集资金用途变更公告情况汇总表（日终）",
            meta: {
                title: '募集资金用途变更公告情况汇总表（日终）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/infoRmation/Info6',
        component: Layout,
        children: [{
            path: "/infoRmation/Info6",
            component: () =>
                import('~/pages/infoRmation/Info6'),
            name: "PPN信息披露情况表（日终）",
            meta: {
                title: 'PPN信息披露情况表（日终）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/infoRmation/Info7',
        component: Layout,
        children: [{
            path: "/infoRmation/Info7",
            component: () =>
                import('~/pages/infoRmation/Info7'),
            name: "ABS信息披露情况表（日终）",
            meta: {
                title: 'ABS信息披露情况表（日终）',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/creditorFinancing',
        component: Layout,
        children: [{
            path: "/creditorFinancing",
            component: () =>
                import('~/pages/creditorFinancing'),
            name: "债权融资计划-台账",
            meta: {
                title: '债权融资计划-台账',
                icon: 'yewu',
                affix: true
            }
        }]
    },
    {
        path: '/creditorFinancing/mailing',
        component: Layout,
        children: [{
            path: "/creditorFinancing/mailing",
            component: () =>
                import('~/pages/creditorFinancing/mailing'),
            name: "邮件报送",
            meta: {
                title: '邮件报送',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/creditorFinancing/WeChatBulletin',
        component: Layout,
        children: [{
            path: "/creditorFinancing/WeChatBulletin",
            component: () =>
                import('~/pages/creditorFinancing/WeChatBulletin'),
            name: "微信简报",
            meta: {
                title: '微信简报',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/creditorFinancing/complete',
        component: Layout,
        children: [{
            path: "/creditorFinancing/complete",
            component: () =>
                import('~/pages/creditorFinancing/complete'),
            name: "信息完善",
            meta: {
                title: '信息完善',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/creditorFinancing/socialFinancing',
        component: Layout,
        children: [{
            path: "/creditorFinancing/socialFinancing",
            component: () =>
                import('~/pages/creditorFinancing/socialFinancing'),
            name: "社融数据",
            meta: {
                title: '社融数据',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/creditorFinancing/filingBulletin',
        component: Layout,
        children: [{
            path: "/creditorFinancing/filingBulletin",
            component: () =>
                import('~/pages/creditorFinancing/filingBulletin'),
            name: "簿记建档微信简报",
            meta: {
                title: '簿记建档微信简报',
                icon: 'yewu',
                affix: true
            }
        }]
    }, {
        path: '/dataReport/info1',
        component: Layout,
        meta: {
            title: "数据报送",
            icon: "yewu",
            affix: true
        },
        children: [{
            path: "/dataReport/info1",
            component: () =>
                import('~/pages/dataReport/info1'),
            name: "完成向清算所发送登记材料（发行成功）债券情况汇总表",
            meta: {
                title: '完成向清算所发送登记材料（发行成功）债券情况汇总表',
                icon: 'yewu',
                // affix: true
            }
        }, {
            path: "/dataReport/info2",
            component: () =>
                import('~/pages/dataReport/info2'),
            name: "微信简报集中簿记建档季度报告文档文件（报协会）",
            meta: {
                title: '微信简报集中簿记建档季度报告文档文件（报协会）',
                icon: 'yewu',
                // affix: true
            }

        }, {
            path: "/dataReport/info3_1",
            component: () =>
                import('~/pages/dataReport/info3_1'),
            name: "集中簿记建档情况简报",
            meta: {
                title: '集中簿记建档情况简报',
                icon: 'yewu',
                // affix: true
            }
        }, {
            path: "/dataReport/info3_2",
            component: () =>
                import('~/pages/dataReport/info3_2'),
            name: "微信公众平台信息发布",
            meta: {
                title: '微信公众平台信息发布',
                icon: 'yewu',
                // affix: true
            }
        }, {
            path: "/dataReport/info4",
            component: () =>
                import('~/pages/dataReport/info4'),
            name: "集中簿记建档情况表格文件",
            meta: {
                title: '集中簿记建档情况表格文件',
                icon: 'yewu',
                // affix: true
            }
        }]
    }, {
        path: '/keepRecord',
        component: Layout,
        children: [{
            path: "/keepRecord",
            component: () =>
                import('~/pages/keepRecord'),
            name: "备案确认情况",
            meta: {
                title: '备案确认情况',
                icon: 'yewu',
                // affix: true
            }
        }]
    }, {
        path: '/collection',
        component: Layout,
        children: [{
            path: "/collection",
            component: () =>
                import('~/pages/collection'),
            name: "数据版周报",
            meta: {
                title: '孔开及N+X系统数据采集及比对',
                icon: 'yewu',
                // affix: true
            }
        }]
    }, {
        path: '/weeklyReport',
        component: Layout,
        children: [{
            path: "/weeklyReport",
            component: () =>
                import('~/pages/weeklyReport'),
            name: "数据版周报",
            meta: {
                title: '数据版周报',
                icon: 'yewu',
                // affix: true
            }
        }]
    },


];

const createRouter = () => new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
});

const router = createRouter();
router.selfaddRoutes = function (params) {
    router.matcher = new Router().matcher;
    router.addRoutes(params)
}

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router