<template>
    <div class="bj_bottom_right">
        <p class="bj_bottom_tit">
            <img src="../../../library/assets/tubiao/gonggao.png" alt="">
            市场公告
        </p>
        <ul class="list">
            <li v-for="(item,index) in marketinfo" :key="index">
                <span class="block"></span>
                <a :title="item.title" :href="item.link">
                    {{ item.title }}
                </a>
                <span class="fr">{{ item.pubDate }}</span>
            </li>
        </ul>
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
            marketinfo: [],
            linkinfo: []

        }
    },
    // 监听属性 类似于data概念
    computed: {

    },
    // 监控data中的数据变化
    watch: {

    }
}
</script>

<style scoped lang="scss">
.bj_bottom_right {
    width: 100%;
    box-sizing: border-box;
    height: 287px;
    background: #ffffff;
    border: 2px solid #d4d4d4;
    position: relative;
    overflow: hidden;
}
.bj_bottom_tit {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
    padding: 0px 6px;
    color: #2f2f2f;
    // background-image: backgroundImage no-repeat;
    background: #e8e8e8;
    border-bottom: 2px solid #d4d4d4;
    // background: url(../../../../assets/index/god_ico.png) no-repeat;
    position: relative;
    padding: 0 0 0 45px;
    img{
        width: 28px;
        height: 28px;
        position: absolute;
        top: 15px;
        left: 10px;
    }
}
.bj_bottom_right ul {
    font-size: 12px;
    padding: 20px 6px;
    color: #000;
    height: 180px;
    color: #000;
    overflow: hidden;
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
}
.bj_bottom_right ul li {
    position: relative;
    padding: 0 0 0 25px;
    a{
        color: #545454;
        font-size: 18px;
        display: inline-block;
        width: 270px;
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
.time{
    position: absolute;
    bottom: 15px;
    left: 170px;
    a{
        font-size: 15px;
        color: #62ade7;
    }
}
.bj_bottom_info {
    padding-left: 10px;
    width: 48%;
    float: left;
    color: #000;
    font-size: 12px;
    overflow: hidden;
}

</style>
