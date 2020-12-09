<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">微信简报生成</span>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <!-- 标题 -->
      <el-row class="titleContent">
        <el-col :span="24">
          <i class="el-icon-back" @click="back" style="corsor: pointer"></i>
          <div
            class="grid-content bg-purple-dark"
            @click="back"
            style="corsor: pointer"
          >
            返回
          </div>
        </el-col>
      </el-row>
      <div>
        <!--输入框1 -->
        <el-row class="topCentent" :gutter="10">
          <el-col :span="24" style="justify-content: center" class="routerLink">
            <label class="search-label">选择日期 :</label>
            <el-date-picker
              v-model="timeValue"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :default-value="defaultDate"
            ></el-date-picker>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="derive">导出</el-button>
            <el-button plain @click="reset">重置</el-button>
            <router-link to="/creditorFinancing/complete?type=1"
              >信息完善</router-link
            >
            <router-link to="/creditorFinancing/socialFinancing"
              >社融数据</router-link
            >
            <router-view />
          </el-col>
        </el-row>
        <el-row class="titleContent">
          <el-col :span="24" style="overflow: auto; display: flex !important">
            <div class="wxjb" v-html="html"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWechatBriefingGetHtml,
  getDownloadWechatBriefing,
} from "../../library/api/api.public";
import { downloadUrl } from "../../library/api/axiosExport";

import axios from "../../library/api/axiosExport.js";
// import $http
import TableOne from "../home/components/TableOne";
import messageBox from "../home/components/messageBox.vue";
import MenuRole from "../home/components/MenuRole.vue";
export default {
  components: {
    TableOne,
    messageBox,
    MenuRole,
  },
  data() {
    return {
      // from数据
      input: {
        noticeTitle: "",
      },
      timeValue: "",
      html: "",
      defaultDate: new Date(),
    };
  },
  // 获取初始数据
  created() {
    this.convertTime();
    // this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let params = {
        date: this.timeValue,
      };
      getWechatBriefingGetHtml(params).then((res) => {
        this.html = res.data;
      });
    },
    /**
     * 查询条件
     */
    search() {
      if (this.timeValue == "" || this.timeValue == null) {
        this.$message.error("请选择时间后查询");
      } else {
        this.getData();
      }
    },
    /**
     * 搜索条件重置
     */
    reset() {
      this.timeValue = "";
      this.defaultDate = new Date();
    },

    //转换日期格式
    convertTime() {
      this.timeValue = new Date();
      var d = new Date(this.timeValue);
      var yue =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      var re = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
      var youWant = d.getFullYear() + "-" + yue + "-" + re;
      this.timeValue = youWant;
    },
    /**
     * 导出功能
     */
    derive() {
      if (this.timeValue == "" || this.timeValue == null) {
        this.openTipBox("请选择日期导出", "warning");
      } else {
        let url =
          this.$api.IP +
          "/wechatBriefing/downloadWechatBriefing?date=" +
          this.timeValue;
        downloadUrl(url);
      }
    },
    openTipBox(message, type) {
      this.$message({
        showClose: true,
        message,
        type,
      });
    },
    // 点击返回
    back() {
      // 返回上一个页面
      this.$router.back(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit12 {
  margin-top: -1px;
  padding: 20px;
  font-size: 12px;

  a {
    text-decoration: underline;
    color: blue !important;
  }
  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    .el-dialog__body {
      padding: 30px 25px;
      display: flex;
      justify-content: center;
    }
  }
  .count {
    font-size: 14px;
    .count2,
    .count3 {
      margin-left: 10px;
    }
    .count1,
    .count2 {
      color: #a3a3a3;
    }
  }
  // 下拉框部分
  .container {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;

    .titleContent {
      font-size: 12px;
      display: flex !important;

      div {
        display: inline-block;
        justify-content: center;
      }
    }
    // 上半部分的内容
    .topCentent {
      display: flex;
      margin-top: 9px;
      /deep/ .el-button.el-button--mini {
        border-radius: 8px;
      }
      .el-col {
        display: flex;
        .search-label {
          line-height: 36px;
          text-align: right;
          color: #515a5e;
        }
        /deep/ .el-input__inner {
          padding-right: unset;
          height: 28px;
          font-size: 12px;
        }
        /deep/ .el-input {
          width: 200px !important;
        }
        .dateinterval {
          /deep/ .el-range-separator {
            width: 30px;
          }
        }
      }
      .btns {
        display: flex;
        // justify-content: center;
        // margin-left: 10px;
        button {
          margin-left: 8%;
          border-radius: 5px !important;
        }
      }
      .toLead {
        padding: 0;
      }
      a {
        align-items: center;
        display: flex;
        margin-left: 5px;
      }
    }
    // 下半部分
    .bottomContent {
      margin-top: 30px;
      @extend .topCentent;
    }
  }
  // tab部分
  .tables {
    margin-top: 20px;
    .cell {
      color: #65686e !important;
    }
    .tables /deep/.el-table__header-wrapper {
      height: 60px;
    }
  }
  .dialog-body {
    display: flex;
    width: 300px;
    span {
      width: 100px;
      line-height: 36px;
    }
  }
  button {
    margin: 0 10px;
    border-radius: 5px !important;
  }
  .wxjb {
    justify-content: center;
    margin-top: 40px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px 5px #ccc;
    line-height: 2.5;
    font-size: 14px;
    letter-spacing: 4px;
  }
  .wxjbp:first-child p {
    color: red !important;
  }
  .routerLink a {
    line-height: 36px;
    padding: 0 10px;
  }
}
</style>
