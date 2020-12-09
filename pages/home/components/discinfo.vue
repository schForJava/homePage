<template>
    <div class="bj_bottom_right">
        <div class="bj_bottom_tit">
            <p>
                <img src="../../../library/assets/tubiao/pilou.png" alt="">
                信息披露
            </p>
            <ol>
                <li :class="{ hover:click }">ABS</li>
                <li :class="{ hover:!click }">DCM</li>
            </ol>
        </div>
        <!-- <div class="bj_bottom_ul">
            <ol>
                <li :class="{ hover:click }" @click="first()">ABS</li>
                <li :class="{ hover:!click }" @click="second()">DCM</li>
            </ol>
        </div> -->
        <div>
            <ul v-if="show">
                <!-- <li>
                    <span class="fr">
                        <a id="viewmore" href="https://www.cfae.cn/xxpl/abs.html" target="_blank">查看更多>></a>
                    </span>
                </li> -->
                <li v-for="(item,index) in message" :key="index">
                    <span class="block"></span>
                    <p>{{ item.title }}</p>
                    <span class="fr">{{ item.time }}</span>
                </li>
            </ul>
            <ul v-if="!show">
                <!-- <li>
                    <span class="fr">
                        <a id="viewmore" href="https://www.cfae.cn/xxpl/dcm.html" target="_blank">查看更多>></a>
                    </span>
                </li> -->
                <li v-for="(item,index) in dcm" :key="index">
                    <span class="block"></span>
                    <p>{{ item.title }}</p>
                    <span class="fr">{{ item.time }}</span>
                </li>
            </ul>
            <!-- ABS -->
            <span v-if="show" class="time">
                <a href="https://www.cfae.cn/xxpl/abs.html" target="_blank">查看更多>></a>
            </span>
            <!-- DCM -->
            <span v-if="!show" class="time">
                <a href="https://www.cfae.cn/xxpl/dcm.html" target="_blank">查看更多>></a>
            </span>
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
            message: [
                { title: 'ABS。。。', time: '2018-05-23' },
                { title: '测试123推送', time: '2018-06-23' },
                { title: '推送网站', time: '2017-05-23' },
                { title: 'ABS重大事项', time: '2018-09-24' },
                { title: 'ABS重大事项', time: '2018-09-24' },
                { title: 'ABS重大事项', time: '2018-09-24' }
            ],
            dcm: [
                { title: '重大事项', time: '2019-05-23' },
                { title: 'wewewewewew', time: '2015-06-23' },
                { title: 'wewewew', time: '2017-05-23' },
                { title: 'ABS重大事项', time: '2018-09-24' }
            ],
            click: true,
            click1: true,
            show: true
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
    methods: {}
}
</script>

<style scoped lang="scss">
//@import url(); 引入公共css类
.bj_bottom_right{
    border: 2px solid #d4d4d4;
    height: 340px;
    background: #ffffff;
    position: relative;
    overflow: hidden;
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
        margin-right: 50px;
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
            width: 105px;
            float: left;
            text-align: center;
            line-height: 60px;
            font-size: 15px;
            cursor: pointer;
        }
    }
}
.time{
    position: absolute;
    bottom: 15px;
    left: 170px;
    a{
        font-size: 15px;
        color: #62ade7;
    }
}
// .bj_bottom_ul {
//     margin: 0 8px;
//     // width: 100%;
//     height: 30px;
//     line-height: 30px;
//     background: #223A6A;
//     border-bottom: 3px solid #607273;
//     ol{
//         list-style: none;
//         li{
//             display: list-item;
//         }
//     }
// }
.hover{
    background: #ffffff;
}
// .bj_bottom_ul ol .hover {
//     background: #1C325B;
//     color: #bc9a5a;
//     border-bottom: 3px solid #bc9a5a;
// }
.bj_bottom_ul ol li {
    float: left;
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 20px;
}
.bj_bottom_right ul {
    padding: 20px 6px;
    height: 247px;
    color: #000;
    overflow: hidden;
    li{
        position: relative;
        padding: 0 0 0 25px;
    }
    .block{
        width: 9px;
        height: 9px;
        display: inline-block;
        background: #62ade7;
        margin: 0 10px 0 10px;
        position: absolute;
        top: 10px;
        left: 0;
    }
    p{
        color: #545454;
        font-size: 18px;
        display: inline-block;
        width: 230px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 30px;
        font-weight: 500;
    }
    a:hover{
        color: #62ade7;
    }
    .fr{
        font-size: 15px;
        color: #bababa;
    }
}
</style>
