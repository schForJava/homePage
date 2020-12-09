<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">北金所运营工作台系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            maxlength="30"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              maxlength="20"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <!-- <el-form-item prop="verification" class="verification">
                    <span class="svg-container">
                        <svg-icon icon-class="yzm" />
                    </span>
                    <el-input
                        ref="verificationCode"
                        v-model="loginForm.verification"
                        placeholder="验证码"
                        name="verification"
                        type="text"
                        maxlength="4"
                        tabindex="3"
                        autocomplete="on"
                    />
                    <div class="right-verifi"> <img :src="loginForm.verificationImg" alt="图片验证码"></div>
        </el-form-item>-->

        <el-button
          class="btn-class"
          :loading="loading"
          type="primary"
          @click.native.prevent="handleLogin"
          >登 录</el-button
        >

        <!-- <div style="position:relative">
          <div class="tips">
            <span>Username : admin</span>
            <span>Password : any</span>
          </div>
          <div class="tips">
            <span style="margin-right:18px;">Username : editor</span>
            <span>Password : any</span>
          </div>

          <el-button
            class="thirdparty-button"
            type="primary"
            @click="showDialog=true"
          >Or connect with</el-button>
        </div>-->
      </el-form>
      <iframe
        id="iframe"
        frameborder="0"
        scrolling="yes"
        src
        style="display: none"
      ></iframe>
    </div>
    <!-- <el-dialog title="Or connect with" :visible.sync="showDialog">
            Can not be simulated on local, so please combine you own business simulation! ! !
            <br>
            <br>
            <br>
            <social-sign />
    </el-dialog>-->
  </div>
</template>

<script>
// import store from '@/store'
// import Router from '@/router'
import axios from "axios";
import api from "../../library/api/apis/api.config";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (value.length > 30) {
        callback(new Error("用户名位数不大于30位"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码位数不小于6位"));
      } else if (value.length > 20) {
        callback(new Error("密码位数不大于20位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          //验证用户密码返回结果
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((data) => {
              if (data.code != "200") {
                alert(data.msg + "");
              }
              axios.get(api.IP+'/menu/'+data.userName).then((valued)=>{
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery,
                });
                let menuList = valued.data.data.path;
                localStorage.setItem("menuList", menuList);
                sessionStorage.setItem("username", data.EXTEND_USER_ID); //将返回的用户名称信息写入sessionStorage中
                sessionStorage.setItem("name", data.userName); //将返回的用户名称信息写入sessionStorage中
                var password =
                        "91b4d142823f7d20c5f08df69122de43f35f057a988d9619f6d3138485c9a203"; //密码为固定密码
                sessionStorage.setItem("password", password); //将返回的用户名称信息写入sessionStorage中
                var scr = document.getElementById("iframe"); //创建iframe
                scr.src =
                        this.$api.firstStageIP +
                        "/webroot/decision/login/cross/domain?fine_username=" +
                        data.userName +
                        "&fine_password=" +
                        password +
                        "&validity=" +
                        -1 +
                        "&callback=callback";
                this.loading = false;
                this.addDate();

              })

              // store.dispatch('permission/generateRoutes', store.getters.roles).then(res => {
              //     Router.addRoutes(res)
              // })
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // js判断节假日自动换肤
    addDate() {
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      const dateList = date.year + "-" + date.month + "-" + date.date;
      const dataMD = date.month + "-" + date.date;
      switch (dataMD) {
        case "1-1":
          this.addClass(document.body, "custom-theme");
          break;
      }

      // 循环春节年份
      switch (dateList) {
        case "2020-1-24":
          this.addClass(document.body, "custom-theme");
          break;
        case "2021-2-11":
          this.addClass(document.body, "custom-theme");
          break;
        case "2022-1-31":
          this.addClass(document.body, "custom-theme");
          break;
        case "2023-1-21":
          this.addClass(document.body, "custom-theme");
          break;
      }
    },
    addClass(element, className) {
      if (!element || !className) {
        return;
      }
      let classString = element.className;
      const nameIndex = classString.indexOf(className);
      if (nameIndex === -1) {
        classString += "" + className;
      }
      element.className = classString;
    },
    removeClass(element, className) {
      let classString = element.className;
      const nameIndex = classString.indexOf(className);
      classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length);
      element.className = classString;
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$blues: #0056ff;
$black: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 30px;
    width: 80%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $black;
      height: 30px;
      caret-color: $black;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #454545 !important;
      }
    }
  }

  .el-form-item {
    color: #454545;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 10px;

    .el-form-item__error {
      margin-left: 30px;
      margin-top: 4px;
    }
  }

  .verification {
    .el-form-item__content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-input {
        width: calc(100% - 60px);
        height: 35px;
      }
      .el-form-item__error {
        margin-left: 30px;
        margin-top: 4px;
      }
      img {
        width: 60px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$blues: #0056ff;

.login-container {
  height: 100%;
  width: 100%;
  background-image: url("~@/assets/login/login-bg.png");
  background-repeat: no-repeat;
  background-size: cover;

  .login-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      background: #fff;
      border-radius: 10px;
      max-width: 100%;
      padding: 30px 35px 0;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      color: $dark_gray;
      vertical-align: middle;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $blues;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
    .btn-class {
      width: 100%;
      margin: 30px 0px;
      height: 40px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
}
</style>
