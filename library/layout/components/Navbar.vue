<template>
  <div class="navbar">
    <!-- <div class="left-menu">
            <div class="login-name">欢迎您：{{ name }}</div>
            <div class="login-time">上次登录时间：{{ oldDate }}</div>
    </div>-->
    <!-- <div class="left-menu">
            <div class="title-moudel">
                <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
            </div>
    </div>-->
    <div class="right-menu">
      <div class="header-menu-list">
        <!-- <Theme /> -->
      </div>
      <!-- <div class="header-login-out" @click="logout">
                <svg-icon icon-class="loginout" />
                <span>退出</span>
      </div>-->
      <!-- 用户 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <div class="welcomeTitle">欢迎{{ name }}!</div>
          <!-- <img
                        :src="avatar"
                        class="user-avatar"
          >-->
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/center/info">
                        <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>-->
          <router-link to="/">
            <el-dropdown-item>控制台</el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item divided>
                        <span
                            style="display:block;"
                            @click="logout"
                        >退出</span>
          </el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <div class="header-login-out" @click="logout">
        <!-- <svg-icon icon-class="loginout" /> -->
        <span>[退出]</span>
      </div>
      <div class="header-login-out">
        <span @click="login">登录</span>
        <!-- <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        设置
                    </span>
                    <el-dropdown-menu slot="dropdown" style="background: #002a5c; border: none; width: 110px;">
                        <el-dropdown-item command="a">检查更新</el-dropdown-item>
                        <el-dropdown-item command="b">设置锁屏时间</el-dropdown-item>
                        <el-dropdown-item command="c">修改密码</el-dropdown-item>
                        <el-dropdown-item command="d">锁定屏幕</el-dropdown-item>
                    </el-dropdown-menu>
        </el-dropdown>-->
      </div>
    </div>
    <!-- 检查更新弹框 -->
    <el-dialog title="确认信息" :visible.sync="dialogVisible" style="margin-top: 20vh;" width="30%">
      <div class="pop">
        <div class="left"></div>
        <div class="right">检查更新在下次打开重新打开客户端时生效，是否立即重启客户端？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          style="border-radius: 0; width: 80px;"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button
          style="margin: 20px 0 0 20px; border-radius: 0;"
          @click="dialogVisible = false"
        >取 消</el-button>
      </span>
    </el-dialog>
    <!-- 设置锁屏时间弹框 -->
    <el-dialog title="设置锁屏时间" :visible.sync="dialogVisible1" style="margin-top: 20vh;" width="30%">
      <el-input-number
        v-model="num"
        controls-position="right"
        :min="1"
        :max="10"
        @change="handleChange"
      ></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          style="border-radius: 0; width: 80px;"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button
          style="margin: 20px 0 0 20px; border-radius: 0;"
          @click="dialogVisible = false"
        >取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码弹框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible2" style="margin-top: 20vh;" width="30%">
      <div>
        原密码
        <el-input v-model="input" placeholder="请输入密码" show-password></el-input>
      </div>
      <div>
        新密码
        <el-input v-model="input1" placeholder="请输入密码" show-password></el-input>
      </div>
      <div>
        确认密码
        <el-input v-model="input2" placeholder="请输入密码" show-password></el-input>
      </div>
      <span>密码长度必须控制在6位到20位之间，且必须同时包含大小写字母和数字</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          style="border-radius: 0; width: 80px;"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button
          style="margin: 20px 0 0 20px; border-radius: 0;"
          @click="dialogVisible = false"
        >取 消</el-button>
      </span>
    </el-dialog>

    <!-- 登录弹框 -->
    <el-dialog
      title="中国银行间市场交易商协会"
      :visible.sync="dialogVisible3"
      style="margin-top: 12vh;"
      width="30%"
    >
      <p class="title">综合业务和信息服务平台</p>
      <div class="ipt">
        <el-input v-model="input3" placeholder="请输入内容">
          <template slot="prepend">法人机构账户</template>
        </el-input>
      </div>
      <div class="ipt">
        <el-input v-model="input4" placeholder="请输入内容">
          <template slot="prepend">操作员代码</template>
        </el-input>
      </div>
      <div class="ipt">
        <el-input v-model="input5" placeholder="请输入内容">
          <template slot="prepend">操作员密码</template>
        </el-input>
      </div>
      <el-button
        style="margin: 20px 0 0 20px; border-radius: 0; width: 100px;"
        @click="dialogVisible3 = false"
      >取 消</el-button>
      <el-button
        type="primary"
        style="border-radius: 0; width: 200px;"
        @click="dialogVisible3 = false"
      >登 录</el-button>
      <span slot="footer" class="dialog-footer">
        <p id="lock">
          程序已锁定，请输入密码解锁
          <span id="ceshi">网络测试</span>
        </p>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Theme from './Theme'
// import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    // Theme,
    // Breadcrumb
  },
  data() {
    return {
      name: "",
      // note: {
      //     backgroundImage: 'url(' + require('@/assets/my-set.png') + ')'
      // },
      // note1: {
      //     backgroundImage1: 'url(' + require('@/assets/login-back.png') + ')'
      // },
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      num: 1,
      input: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  created() {
    // this.name = window.localStorage.getItem('name')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      debugger;
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      console.log(`/login?redirect=${this.$route.fullPath}`);
    },
    handleCommand(command) {
      if (command == "a") {
        this.dialogVisible = true;
      } else if (command == "b") {
        this.dialogVisible1 = true;
      } else if (command == "c") {
        this.dialogVisible2 = true;
      }
    },
    handleChange(value) {},
    login() {
      // this.dialogVisible3 = true
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
// .navbar {
//     height: 45px;
//     font-size: 14px;
//     //   width:calc(100% - 238px);
//     width:100%;
//     overflow: hidden;
//     position: relative;
//     //   left: 238px;
//     background: #002a5c;;
//     .left-menu{
//         float: left;
//         line-height: 1.5;
//         margin-top: 10px;
//         padding-left: 10px;
//         .login-name{
//             color: #00a2ff;
//         }
//         .login-time{
//             color: #666;
//         }
//     }
//     .right-menu {
//         display: flex;
//         float: right;
//         align-items:center;
//         height: 60px;
//         color: #647394;
//         &:focus {
//             outline: none;
//         }
//         .header-menu-list {
//             display: inline-block;
//         }
//         .header-login-out{
//             margin-right:30px;
//             cursor:pointer;
//         }
//         .right-menu-item {
//             display: inline-block;
//             padding: 0 8px;
//             font-size: 18px;
//             color: #5a5e66;
//             margin:0px 30px;
//             &.hover-effect {
//                 cursor: pointer;
//                 transition: background 0.3s;
//                 &:hover {
//                     background: rgba(0, 0, 0, 0.025);
//                 }
//             }
//         }
//         .avatar-container {
//             margin-right: 30px;
//             .avatar-wrapper {
//                 margin-top: 5px;
//                 position: relative;
//                 .user-avatar {
//                     cursor: pointer;
//                     width: 24px;
//                     height: 24px;
//                     border-radius: 12px;
//                 }
//             }
//         }
//     }
//     .welcomeTitle {
//         display: inline-block;
//         font-size: 14px;
//         color: #ffffff;
//         transform: translateY(-40%);
//     }
//     .header-login-out{
//         color: #ffffff;
//         // background-image: backgroundImage;
//         //   background-image: '/library/assets/my-set.png';
//         padding-left: 20px;
//         background-repeat: no-repeat;
//     }
//     .title{
//         color: #ffffff;
//         font-size: 16px;
//         position: absolute;
//         top: 53px;
//         left: 115px;
//     }
//     .ipt{
//         margin-top: 8px;
//     }
//     #lock{
//         color: #ff0000;
//     }
//     #ceshi{
//         width: 62px;
//         height: 19px;
//         border: 1px solid #adadad;
//         background: #e1e1e1;
//         display: inline-block;
//         color: #333;
//         margin-left: 20px;
//     }
// }
// .el-dropdown-link {
//     cursor: pointer;
//     color: #ffffff;
//     background: #002a5c;
// }
// .el-icon-arrow-down {
//     font-size: 14px;
//     background: #002a5c;
// }
// .el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
//     background-color:  #002a5c;
//     // color: #3e85ff;
// }
// .el-dropdown-menu--medium .el-dropdown-menu__item{
//     color: rgb(255, 255, 255);
//     font-size: 12px;
// }
// .navbar /deep/ .el-dialog__wrapper .el-dialog{
//     background: #f2f2f2;
//     border-radius: 5px;
// }
// .navbar /deep/ .el-dialog__wrapper .el-dialog .el-dialog__body{
//     padding: 10px 20px;
// }
// .navbar /deep/ .el-dialog__header{
//     background-image: url("~@/assets/login-back.png");
//     background-size: 100%;
//     background-repeat: no-repeat;
//     height: 100px;
//     padding: 18px 10px 10px 10px;
// }
// .navbar /deep/ .el-dialog__title{
//     color: #fff;
//     font-size: 24px;
//     padding: 0 0 0 50px;
// }
// .navbar /deep/ .el-dialog__headerbtn{
//     margin-top: -5px;
// }
// .navbar /deep/ .el-dialog__footer{
//     background: #ffffff;
//     padding: 20px 40px 20px 0;
// }
</style>
