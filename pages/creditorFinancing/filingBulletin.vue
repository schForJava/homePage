<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">簿记建档微信简报</span>
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
          <el-col :span="24" style="justify-content: center">
            <label class="search-label">请选择本周起止时间 ：</label>
            <el-date-picker
              v-model="date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-value="defaultDate"
            >
            </el-date-picker>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="derive">导出</el-button>
            <el-button plain @click="reset">重置</el-button>
            <!-- <router-link to="/creditorFinancing/complete?type=1">信息完善</router-link> -->
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
import { getBookBuildingGetHtml } from "../../library/api/api.public";
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
      date: [],
    };
  },
  // 获取初始数据
  created() {
    this.getWeek();
    // this.getData();
  },
  mounted() {},
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let params = {
        curWeekStart: this.date[0],
        curWeekEnd: this.date[1],
      };
      getBookBuildingGetHtml(params).then((res) => {
        this.html = res.data;
      });
    },
    /**
     * 查询条件
     */
    search() {
      if (this.date == "" || this.date == null) {
        this.openTipBox("请选择日期导出", "warning");
      } else {
        this.pageNum = 1;
        this.getData();
      }
    },
    /**
     * 搜索条件重置
     */
    reset() {
      this.date = [];
      this.defaultDate = new Date();
    },

    //转换日期格式
    // convertTime() {
    //   this.input.submitTime = [];
    //   this.timeValue = new Date();
    //   this.endTime = new Date();
    //   var date = new Date(this.timeValue);
    //   var y = date.getFullYear();
    //   var m = date.getMonth() + 1;
    //   m = m < 10 ? "0" + m : m;
    //   var d = date.getDate();
    //   d = d < 10 ? "0" + d : d;
    //   var h = date.getHours();
    //   h = h < 10 ? "0" + h : h;
    //   var minute = date.getMinutes();
    //   minute = minute < 10 ? "0" + minute : minute;
    //   var second = date.getSeconds();
    //   second = second < 10 ? "0" + second : second;
    //   this.timeValue =
    //     y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    //   let d1 = this.getNextDate(this.endTime, -7);
    //   let startTime = d1;
    //   let endTime = y + "-" + m + "-" + d;
    //   this.date.push(startTime);
    //   this.date.push(endTime);
    // },

    getWeek() {
      var nowTemp = new Date(); //当前时间
      var oneDayLong = 24 * 60 * 60 * 1000; //一天的毫秒数
      var c_time = nowTemp.getTime(); //当前时间的毫秒时间
      var c_day = nowTemp.getDay() || 7; //当前时间的星期几
      var m_time = c_time - (c_day - 1) * oneDayLong; //当前周一的毫秒时间
      var monday = new Date(m_time); //设置周一时间对象
      var m_year = monday.getFullYear();
      var m_month =
        monday.getMonth() + 1 > 9
          ? monday.getMonth() + 1
          : "0" + (monday.getMonth() + 1);
      var m_date =
        monday.getDate() > 9 ? monday.getDate() : "0" + monday.getDate();
      var m_date1 = m_date - 1;
      // return m_year + "-" + m_month + "-" + m_date;
      console.log(c_time);
      var d = new Date(nowTemp);
      var yue =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      var re = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
      var youWant = d.getFullYear() + "-" + yue + "-" + re;
      let startTime = m_year + "-" + m_month + "-" + m_date1;
      let endTime = youWant;
      this.date.push(startTime);
      this.date.push(endTime);
    },

    /**
     * 导出功能
     */
    derive() {
      if (this.date == "" || this.date == null) {
        this.openTipBox("请选择日期导出", "warning");
      } else {
        let url =
          this.$api.IP +
          "/bookBuilding/downloadWechatBj?curWeekStart=" +
          this.date[0] +
          "&&curWeekEnd=" +
          this.date[1];
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
  .WordSection1 {
    width: 980px !important;
    margin: 30px auto;
    padding: 50px 135px;
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
