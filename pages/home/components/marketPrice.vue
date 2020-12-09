<template>
    <div class="bj_bottom_left">
        <div class="bj_bottom_tit">
            <p>
                <img src="../../../library/assets/tubiao/erji.png" />
                二级市场报价 |</p>
            <!-- <span>|</span> -->
            <ol>
                <li :class="{ hover:click }">非金融机构合格投资人交易系统报价</li>
                <li :class="{ hover:!click }">信用违约互换合约卖出信息</li>
            </ol>
        </div>
        <!-- <p class="bj_bottom_subtit">非金融机构合格投资人交易系统报价</p> -->
        <div v-if="show" class="bj_bottom_left_content1">
            <table>
                <thead>
                    <tr>
                        <th>债券代码</th>
                        <th>代码简称</th>
                        <th>剩余天数</th>
                        <th>买入/卖出全价（元）</th>
                        <th>买入/卖出净价（元）</th>
                        <th>买入/卖出收益率（%）</th>
                        <th>买入/卖出劵面总额（万元）</th>
                        <th>主体评级</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- <p class="bj_bottom_subtit">信用违约互换合约卖出信息</p> -->
        <div v-if="!show" class="bj_bottom_left_content2">
            <table>
                <thead>
                    <tr>
                        <th>参考实体</th>
                        <th>卖出机构</th>
                        <th>最长期限（年）</th>
                        <th>卖出机构主体评级</th>
                        <th>联系方式</th>
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
            note: {
                backgroundImage: 'url(' + require('@/assets/godico.png') + ')'
            },
            price: [],
            scrollSpeed: 2000,
            timer: null,
            timer1: null,
            system: [],
            dialogVisible: false,
            click: true,
            click1: true,
            show: true,
            table1: ''
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
    .bj_bottom_left {
        width: 100%;
        box-sizing: border-box;
        height: 340px;
        // background: #223A6A;
        float: left;
        border: 2px solid #d4d4d4;
    }
    .hover{
        background: #ffffff;
        color: #62ade7;
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
    .bj_bottom_subtit {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
        color: #bc9a5a;
    }
    .bj_bottom_left_content1 {
        width: 100%;
        height: 275px;
        overflow-x: visable;
        overflow-y: hidden;
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
    .bj_bottom_left_content2 {
        width: 100%;
        height: 275px;
        overflow-x: visable;
        overflow-y: hidden;
        white-space: nowrap;
        table{
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            tr{
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
            }
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