<template>
    <div class="table-box">
        <div class="bj_bottom_tit">
            <p>
                <img src="../../../library/assets/tubiao/shishi.png" />
                <span>实时报价 |</span>
            </p>
            <!-- <span>|</span> -->
            <ol>
                <li :class="{ hover:click }">上一日</li>
                <li :class="{ hover:click1 }">当日</li>
                <li :class="{ hover:click2 }">待发行</li>
            </ol>
        </div>
        <div class="bj_bottom_left_content1">
            <table width="100%">
                <thead>
                    <tr>
                        <th>债券代码</th>
                        <th>债券简称</th>
                        <th>债券全称</th>
                        <th>债券种类</th>
                        <th>发行金额（万元）</th>
                        <th>簿记管理人</th>
                        <th>联席主承销商</th>
                        <th>债券期限</th>
                        <th>主体评级</th>
                        <th>债券评级</th>
                        <th>缴款日</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            activeName: 'second',
            lastMoney: [],
            todayMoney: [],
            nextdayMoney: [],
            timer: null,
            show_index: 0,
            click: true,
            click1: false,
            click2: false
        }
    },
    // 监听属性 类似于data概念
    computed: {

    },
    // 监控data中的数据变化
    watch: {

    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
.table-box /deep/  .el-tabs__item {
    width: 110px;
    min-width: 107px!important;
}
.table-box{
    border: 2px solid #d4d4d4;
    height: 490px;
}
.bj_bottom_tit {
    height: 60px;
    line-height: 60px;
    background: #e8e8e8;
    border-bottom: 2px solid #d4d4d4;
    padding: 0px 6px;
    p{
        font-size: 20px;
        color: #2f2f2f;
        float: left;
        font-weight: 700;
        margin-right: 10px;
        position: relative;
        padding: 0 0 0 35px;
        img{
            width: 28px;
            height: 28px;
            position: absolute;
            top: 15px;
            left: 0;
        }
    }
    ol{
        list-style: none;
        li{
            // width: 106px;
            padding: 0 20px;
            float: left;
            text-align: center;
            line-height: 60px;
            font-size: 15px;
            cursor: pointer;
        }
    }
}
.hover{
    color: #62ade7;
    background: #ffffff;
}
.bj_bottom_left_content1 {
    width: 100%;
    height: 420px;
    overflow-x: visable;
    overflow-y: scroll;
    white-space: nowrap;
    table{
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        th{
            color: #2a2a2a;
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            line-height: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            font-size: 16px;
            background: #f6f6f6;
            padding: 0 30px;
        }
    }
}
tbody{
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    td{
        background: #f6f6f6;
        font-size: 10px;
        color: #5a5a5a;
        border-bottom: 1px solid #f0f0f0;
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        padding: 0 30px;
    }
}
//@import url(); 引入公共css类
.bbsBar {
        width: 100%;
        height: 5px;
        background-color: #162544;
    }
.bj_top_left_main {
    & th,
    & td {
        color: #fff;
        // background: #223A6A;
        border: 1px solid #162544;
        height: 24px;
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 12px;
    }
}
.table-box /deep/ .el-tabs__item{
    padding: 0;
}
.table-box /deep/ .el-tabs__nav-scroll{
    background: linear-gradient(#2d4470,#253556);
}

::-webkit-scrollbar {
    width: 6px;
    height: 12px;
}
::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #62ade7;
    -webkit-border-radius: 4px;
    outline-offset: -2px;
    border: 1px solid #d8d8d8;
}
</style>
