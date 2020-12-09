<template>
    <div class="calendar-box">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="日" name="first">
                <div class="bj_top_right_main bd">
                    <h1 class="f120">{{ days }}</h1>
                    <h2 class="f35">{{ month }}月&nbsp;{{ days }}日</h2>
                    <h3 class="f25">{{ year }}&nbsp;{{ week }}</h3>
                </div>
            </el-tab-pane>
            <el-tab-pane label="周" name="second">
                <div class="bj_top_right_main bd none">
                    <h1 class="f70 pt30">第{{ weeks }}周</h1>
                    <h3 class="f35 pt30">{{ year }}年</h3>
                </div>

            </el-tab-pane>
            <el-tab-pane label="月" name="third">
                <div class="bj_top_right_main bd none">
                    <h1 class="f100 pt30">{{ month }}月</h1>
                    <h3 class="f25">{{ year }}年&nbsp;&nbsp;{{ week }}</h3>
                </div>
            </el-tab-pane>
        </el-tabs> -->
        <div class="head">
            <div v-if="show" class="before">
                <span @click="login">您好{{ name }}</span>
                <span style="margin-left:30px;" @click="logout">退出</span>
            </div>
            <div v-else class="after">
                <img src="../../../library/assets/tubiao/denglu.png" alt="">
                <p>北金所统一用户（测试用户用户）</p>
                <span>退出</span>
            </div>
        </div>
        <div class="calendar">
            <div class="left">
                <h3>债券日历</h3>
                <div class="tab">
                    <span :class="{ hover:click }" @click="onItemClick(0)">日</span>
                    <span :class="{ hover:click1 }" @click="onItemClick(1)">周</span>
                    <span :class="{ hover:click2 }" @click="onItemClick(2)">月</span>
                </div>
            </div>
            <span class="line"></span>
            <div class="right">
                <div v-show="show_index==0" class="day">
                    <h1 class="f60">{{ days }}</h1>
                    <div>
                        <h2 class="f16">{{ year }}年&nbsp;{{ month }}月</h2>
                        <h3 class="f16">{{ week }}</h3>
                    </div>
                </div>
                <div v-show="show_index==1" class="week">
                    <h1 class="f47">第{{ weeks }}周</h1>
                    <h3 class="f35">{{ year }}年</h3>
                </div>
                <div v-show="show_index==2" class="month">
                    <h1 class="f40">{{ month }}月</h1>
                    <h3 class="f25">{{ year }}年&nbsp;&nbsp;{{ week }}</h3>
                </div>
            </div>
        </div>
        <!-- 登录弹框 -->
        <el-dialog :visible.sync="dialogFormVisible" class="loginline">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="手机登录" name="first">
                    <el-input v-model="phone" placeholder="请输入手机号">
                        <template slot="prepend"><img src="../../../library/assets/tubiao/yonghuming.png" alt=""></template>
                    </el-input>
                    <el-input v-model="password" placeholder="请输入密码">
                        <template slot="prepend"><img src="../../../library/assets/tubiao/mima.png" alt=""></template>
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="历史账号" name="second">
                    <el-input v-model="zhanghu" placeholder="请输入法人机构账户">
                        <template slot="prepend"><img src="../../../library/assets/tubiao/caozuo.png" alt=""></template>
                    </el-input>
                    <el-input v-model="code" placeholder="请输入操作员代码">
                        <template slot="prepend"><img src="../../../library/assets/tubiao/caozuo1.png" alt=""></template>
                    </el-input>
                    <el-input v-model="zmima" placeholder="请输入操作员密码">
                        <template slot="prepend"><img src="../../../library/assets/tubiao/caozuo2.png" alt=""></template>
                    </el-input>
                    <div class="system">
                        <p><img src="../../../library/assets/tubiao/caozuo3.png" alt=""></p>
                        <el-select v-model="system" placeholder="业务系统列表">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <span class="mima">忘记密码？</span>
            <span id="line">|</span>
            <button @click="selectLogin">登录</button>
        </el-dialog>
        <!-- 选择账户弹框 -->
        <el-dialog title="选择登陆用户" :visible.sync="dialogFormVisible1" class="select">
            <dl v-for="(items,index) in arr" :key="index">
                <dt>{{ items.sys }}：</dt>
                <dd v-for="(item,i) in items.children" :key="i"><img src="../../../library/assets/tubiao/zhanghu.png" alt=""><el-checkbox v-model="checked" :label="item.id">{{ item.name }}</el-checkbox></dd>
            </dl>
            <button class="submit" @click="submit">提交</button>
        </el-dialog>
    </div>
</template>

<script>
import { getYearWeek } from '@/utils/index'
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            activeName: 'first',
            year: '',
            month: '',
            days: '',
            week: '',
            weekd: '',
            tabPosition: 'left',
            show: true,
            show_index: 0,
            click: true,
            click1: false,
            click2: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            formLabelWidth: '120px',
            phone: '',
            password: '',
            zhanghu: '',
            code: '',
            zmima: '',
            system: '',
            options: [
                {
                    value: '1',
                    label: '簿记建档系统'
                }
            ],
            checked: [],
            arr: [
                { sys: '系统一', children: [{ id: '1', name: '账户1' }, { id: '2', name: '账户2' }] },
                { sys: '系统二', children: [{ id: '3', name: '账户3' }, { id: '4', name: '账户4' }] }
            ],
            paneName: '',
            name: ''
        }
    },
    // 监听属性 类似于data概念
    computed: {

    },
    // 监控data中的数据变化
    watch: {

    },
    created() {
        var d = new Date()
        this.year = d.getFullYear()
        const m = d.getMonth() + 1
        const dd = d.getDate()
        this.month = m >= 10 ? m : '0' + m
        this.days = dd >= 10 ? dd : '0' + dd
        const weekOrign = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        this.week = weekOrign[d.getDay()]
        this.weeks = getYearWeek(this.year, m, dd)
    },
    mounted() {
        this.name = window.localStorage.getItem('name')
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab.paneName)
            this.paneName = tab.paneName
        },
        onItemClick(index) {
            // console.log(index)
            this.show_index = index
            if (index == 0) {
                this.click = true
                this.click1 = false
                this.click2 = false
            } else if (index == 1) {
                this.click1 = true
                this.click2 = false
                this.click = false
            } else {
                this.click2 = true
                this.click1 = false
                this.click = false
            }
        },
        login() {
            this.dialogFormVisible = true
        },
        logout() {
            localStorage.clear();
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
              console.log(`/login?redirect=${this.$route.fullPath}`);
                 console.log("123");
        },
        selectLogin() {
            this.dialogFormVisible = false
            if (this.activeName == 'first') {
                this.dialogFormVisible1 = true
            } else {
                console.log(this.system)
            }
        },
        submit() {
            console.log(this.checked)
        }
    }
}
</script>

<style scoped lang="scss">
.calendar-box{
    .head{
        height: 58px;
        background: #62ade7;
        .before{
            font-size: 16px;
            color: #d5d5d5;
            line-height: 58px;
            padding: 0 0 0 20px;
            span{
                cursor: pointer;
            }
        }
        .after{
            display: flex;
            flex-direction: row;
            line-height: 58px;
            position: relative;
            padding: 0 0 0 35px;
            img{
                width: 23px;
                height: 23px;
                position: absolute;
                top: 15px;
                left: 10px;
            }
            p{
                font-size: 16px;
                color: #080f14;
                width: 180px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            span{
                font-size: 16px;
                color: #e61b24;
                cursor: pointer;
            }
        }
    }
    .calendar{
        display: flex;
        flex-direction: row;
        background: #ffffff;
        height: 133px;
        border-left: 3px solid #62ade7;
        border-right: 3px solid #62ade7;
        border-bottom: 3px solid #62ade7;
        // align-items: center;
        .line{
            width: 3px;
            height: 88px;
            background: #d4d4d4;
            margin-top: 20px;
        }
        .left{
            width: 190px;
            h3{
                font-size: 18px;
                color: #242424;
                text-align: center;
                margin-top: 22px;
            }
            .tab{
                padding: 20px 0 0 23px;
                span{
                    width: 44px;
                    height: 44px;
                    display: inline-block;
                    border: 2px solid #62ade7;
                    text-align: center;
                    line-height: 44px;
                    border-radius: 5px;
                    cursor: pointer;
                    color: #62ade7;
                }
                .hover{
                    color: #ffffff;
                    background: #62ade7;
                }
            }
        }
        .right{
            .f60{
                font-size: 60px;
            }
            .f16{
                font-size: 16px;
            }
            .day{
                padding: 30px 0 0 20px;
                h1{
                    float: left;
                }
                div{
                    float: left;
                    margin: 13px 0 0 0;
                    h3{
                        margin-top: 8px;
                    }
                }
            }
            .week{
                padding: 20px 0 0 34px;
                .f47{
                    font-size: 47px;
                }
                .f35{
                    font-size: 35px;
                    margin-left: 20px;
                }
            }
            .month{
                padding: 20px 0 0 20px;
                .f40{
                    font-size: 45px;
                    margin: 0 0 0 30px;
                }
            }
        }
    }
}
.bj_top_right_main {
    cursor: pointer;
    width: 100%;
    color: #bc9a5a;
    text-align: center;
    background: #223A6A;
}
.f120 {
    font-size: 120px;
}
.f35 {
    font-size: 35px;
}
.f25 {
    font-size: 25px;
}
.f70 {
    font-size: 70px;
}
.pt30 {
    padding-top: 30px;
}
.f100 {
    font-size: 100px;
}
.mask{
    width: 100%;
    height: 130%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 999;
    .content{
        background: #ffffff;
        opacity: 1;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
    }
}
</style>
<style  scoped lang="scss">


.calendar-box /deep/ .el-dialog {
    width: 30%;
}
.calendar-box /deep/ .el-input-group{
    margin-bottom: 15px;
    width: 70%;
    margin-left: 60px;
}
.calendar-box /deep/ .el-tabs__nav-wrap{
    border-bottom: 2px solid #dedede;
}
.calendar-box /deep/ .el-tabs__content{
    margin-top: 20px;
}
.calendar-box /deep/ .el-tabs__item{
    padding: 0;
    color: #000!important;
    border-right: none!important;
    font-size: 18px!important;
}
.calendar-box /deep/ .el-tabs__nav-scroll{
    // background: linear-gradient(#2d4470,#253556);
    background: #ffffff;
    color: #000;
}
.calendar-box /deep/ .el-tabs__item.is-active{
    background: #ffffff !important;
    color: #62ade7 !important;
    border-bottom: 0!important;
}
.calendar-box /deep/ .el-tabs__nav{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.calendar-box /deep/ .el-dialog__header{
    display: none;
}
.calendar-box /deep/ .el-dialog__body {
    padding: 0;
    .mima{
        display: block;
        font-size: 14px;
        color: #2c2c2c;
        margin-left: 70%;
        margin-bottom: 30px;
    }
    button{
        width: 288px;
        height: 32px;
        background: #62ade7;
        border: 0;
        color: #ffffff;
        font-size: 15px;
        border-radius: 5px;
        margin-left: 60px;
        margin-bottom: 36px;
    }
    .system{
        display: flex;
        flex-direction: row;
        padding: 0 0 0 60px;
        p{
            width: 60px;
            height: 36px;
            border: 1px solid #DCDFE6;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            text-align: center;
            line-height: 36px;
        }
    }
    .el-select{
        width: 65%!important;
        margin-bottom: 10px;
        .el-input__inner{
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: none!important;
        }
    }
}
.calendar-box /deep/ .el-input-group__prepend{
    background: #ffffff;
}
.calendar-box /deep/ .select .el-dialog__header{
    display: block;
    border-bottom: 2px solid #dedede;
    margin-bottom: 20px;
}

.calendar-box /deep/ .select{
    dt{
        width: 30%;
        margin: 0 0 10px 20%;
    }
    dd{
        margin: 0 0 15px 35%;
        position: relative;
        padding: 0 0 0 30px;
        img{
            position: absolute;
            top: -1px;
            left: 0;
        }
    }
    .el-dialog{
        width: 25%;
    }
    .submit{
        width: 72px;
        height: 32px;
        background: #62ade7;
        margin: 20px 0 30px 40%;
    }
}
.calendar-box /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #62ade7;
}
.calendar-box /deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #62ade7;
}
.loginline{
    // position: relative;
    #line{
        position: absolute;
        top: 10px;
        left: 200px;
        color: #e5e5e5;
    }
}
</style>
