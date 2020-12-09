<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">数据版周报</span>
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

      <el-row class="topCentent" :gutter="10">
        <el-col :span="24" style="justify-content: center" class="routerLink">
          <label class="search-label"> 上周日期： </label>
          <el-date-picker
            v-model="preDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
            >
          </el-date-picker>
          <div style="visibility: hidden">
            <el-button type="primary" @click="search">查询</el-button>
            <!-- <el-button type="primary" @click="derive">导出</el-button>
             -->
            <el-button plain @click="reset">重置</el-button>
            <el-dropdown
              size="small"
              placement="bottom"
              trigger="click"
              @command="batchOperate"
              style="margin-left: 10px"
            >
              <el-button class="search-btn" size="mini">
                导出
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="batch_remarks"
                  >导出pdf</el-dropdown-item
                >
                <el-dropdown-item command="export_excel"
                  >导出word</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <router-link to="/creditorFinancing/complete?type=2"
              >信息完善</router-link
            >
            <router-view />
          </div>
        </el-col>
      </el-row>
      <el-row class="topCentent" :gutter="10">
        <el-col :span="24" style="justify-content: center" class="routerLink">
          <label class="search-label"> 本周日期： </label>
          <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
            >
          </el-date-picker>
          <div>
            <el-button type="primary" @click="search">查询</el-button>
            <!-- <el-button type="primary" @click="derive">导出</el-button> -->
            <el-dropdown
              size="small"
              placement="bottom"
              trigger="click"
              @command="batchOperate"
              style="margin-left: 10px"
            >
              <el-button class="search-btn" size="mini">
                导出
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="batch_remarks"
                  >导出pdf</el-dropdown-item
                >
                <el-dropdown-item command="export_excel"
                  >导出word</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain @click="reset">重置</el-button>
            <router-link to="/creditorFinancing/complete?type=2"
              >信息完善
            </router-link>
            <router-view />
          </div>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="titleContent">
        <el-col :span="24" style="overflow: auto; display: flex !important">
          <div class="wxjb" id="pdfDom" v-html="html"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getwWbCbsStadBookWebDateWeekly } from "../../library/api/api.public";
import { axios, downloadUrl } from "../../library/api/axiosExport.js";
// import $http
import TableOne from "../home/components/TableOne";
import messageBox from "../home/components/messageBox.vue";
import MenuRole from "../home/components/MenuRole.vue";
import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    TableOne,
    messageBox,
    MenuRole,
  },
  data() {
    return {
      loading: false,
      menuRoleVisible: false,
      dialogVisible: false,
      text: "确定",
      // from数据
      input: {},
      tableData: [],
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      // 定义变量存储点击数据
      currentData: {},
      isLoding: false,
      timeValue: "",
      html: "",
      preDate: [],
      date: [],
    };
  },
  // 获取初始数据
  created() {
    // this.convertTime();
    this.getProWeekList();
    // this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let params = {
        preWeekStart: this.preDate[0],
        preWeekEnd: this.preDate[1],
        curWeekStart: this.date[0],
        curWeekEnd: this.date[1],
      };
      getwWbCbsStadBookWebDateWeekly(params).then((res) => {
        console.log(res);
        this.html = res.data;
      });
    },
    /**
     * 查询条件
     */
    search() {
      if (
        this.date == "" ||
        this.date == null ||
        this.preDate == "" ||
        this.preDate == null
      ) {
        this.$message.error("请选择时间后查询");
      } else {
        let date = new Date();
        let pre = Date.parse(this.preDate[1]);
        let next = Date.parse(this.date[0]);
        if (pre > next) {
          this.$message.error("请选择正确的时间");
        } else {
          this.getData();
        }
      }
    },
    /**
     * 搜索条件重置
     */
    reset() {
      this.convertTime();
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

    getProWeekList() {
      var date = new Date();
      var currentFirstDate = new Date(date);
      var formatDate = function (date) {
        var year = date.getFullYear(); //年
        // var month = date.getMonth() + 1; //月
        // var day = date.getDate(); //日;
        var month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        return year + "-" + month + "-" + day;
      };
      var addDate = function (date, n) {
        date.setDate(date.getDate() + n);
        return date;
      };
      var setDate = function (date) {
        var week = date.getDay() - 1;
        date = addDate(date, week * -1);
        currentFirstDate = new Date(date);
        var weekList = [];
        for (var i = 0; i < 7; i++) {
          weekList[i] = formatDate(i == 0 ? date : addDate(date, 1));
        }
        return weekList;
      };

      var thisWeek = setDate(addDate(currentFirstDate, 0)); //本周
      var preWeek = setDate(addDate(currentFirstDate, -7)); //上周
      var today = formatDate(date); //今日日期
      console.log(thisWeek);
      console.log(preWeek);
      //上周一到周五
      this.preDate.push(preWeek[0]);
      this.preDate.push(preWeek[4]);
      //本周到当天
      this.date.push(thisWeek[0]);
      this.date.push(formatDate(new Date()));
      console.log(this.date);
    },
    /**
     * 导出功能
     */
    derive() {
      if (
        this.date == "" ||
        this.date == null ||
        this.preDate == "" ||
        this.preDate == null
      ) {
        this.$message.error("请选择时间后查询");
      } else {
        let date = new Date();
        let pre = Date.parse(this.preDate[1]);
        let next = Date.parse(this.date[0]);
        if (pre > next) {
          this.$message.error("请选择正确的时间");
        } else {
          let url =
            this.$api.IP +
            "/wkbCbsStadBook/downDateWeekly?preWeekStart=" +
            this.preDate[0] +
            "&&preWeekEnd=" +
            this.preDate[1] +
            "&&curWeekStart=" +
            this.date[0] +
            "&&curWeekEnd=" +
            this.date[1];
          ("&isWord=1");
          downloadUrl(url);
        }
      }
    },
    batchOperate(command) {
      switch (command) {
        case "batch_remarks":
          this.dialogRemarks();
          break;
        case "export_excel":
          this.exportExcel();
          break;
      }
    },
    // 导出本页Excel表
    exportExcel() {
      if (
        this.date == "" ||
        this.date == null ||
        this.preDate == "" ||
        this.preDate == null
      ) {
        this.$message.error("请选择时间后查询");
      } else {
        let date = new Date();
        let pre = Date.parse(this.preDate[1]);
        let next = Date.parse(this.date[0]);
        if (pre > next) {
          this.$message.error("请选择正确的时间");
        } else {
          let url =
            this.$api.IP +
            "/wkbCbsStadBook/downDateWeekly?preWeekStart=" +
            this.preDate[0] +
            "&&preWeekEnd=" +
            this.preDate[1] +
            "&&curWeekStart=" +
            this.date[0] +
            "&&curWeekEnd=" +
            this.date[1];
          ("&isWord=1");
          downloadUrl(url);
        }
      }
    },
    dialogRemarks() {
      if (
        this.date == "" ||
        this.date == null ||
        this.preDate == "" ||
        this.preDate == null
      ) {
        this.$message.error("请选择时间后查询");
      } else {
        let date = new Date();
        let pre = Date.parse(this.preDate[1]);
        let next = Date.parse(this.date[0]);
        if (pre > next) {
          this.$message.error("请选择正确的时间");
        } else {
          let url =
            this.$api.IP +
            "/wkbCbsStadBook/downDateWeeklyPDF?preWeekStart=" +
            this.preDate[0] +
            "&&preWeekEnd=" +
            this.preDate[1] +
            "&&curWeekStart=" +
            this.date[0] +
            "&&curWeekEnd=" +
            this.date[1];
          ("&isWord=1");
          downloadUrl(url);
        }
      }
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
        // align-items: center;
        // display: flex;
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
