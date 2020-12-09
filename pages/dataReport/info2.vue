<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">集中簿记建档季度报告文档文件（报协会）</span>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <!-- 标题 -->
      <el-row class="titleContent" style="margin-bottom: 30px">
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
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        :before-leave="tabBefore"
      >
        <el-tab-pane label="概况" name="first">
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 20px">
            <el-col :span="6">
              <label class="search-label">选择日期：</label>
              <el-date-picker
                v-model="timeValue"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="9">
              <div class="btns">
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="derive">导出</el-button>
                <el-button plain @click="reset">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <!-- 下半部分 -->
          <el-row class="titleContent">
            <el-col :span="24" style="overflow: auto; display: flex !important">
              <div class="wxjb" v-html="html"></div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="附表1" name="second">
          <h2>本季度集中簿记建档业务开展情况</h2>
          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="tab1TableData"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="bondBjType"
                label="债券类别"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="bondBjTypeCount"
                label="只数（只）"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="bondBjTypeSum"
                label="发行总额（亿元）"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="附表2" name="three">
          <h2>集中簿记建档系统发行情况({{ quarter2 }})</h2>
          <div class="textInfo">
            <i class="el-icon-info"></i>
            发行额总计：{{ tab2factMoney }}亿元
          </div>

          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="tab2TableData"
              style="width: 100%"
              border
            >
              <el-table-column
                label="序号"
                prop="id"
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="leand"
                label="主承销商"
                align="center"
                width="300px"
              ></el-table-column>
              <el-table-column
                prop="menEtrName"
                label="发行人/发起机构"
                align="center"
                width="300px"
              ></el-table-column>
              <el-table-column
                prop="consignPayEndDate"
                label="发行日期"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="bondShortName"
                label="债券简称"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="bondType"
                label="债券品种"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="factPubAmt"
                align="center"
                label="发行金额（亿元）"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="term"
                label="债券期限"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="congisnCount"
                label="承销团成员家数"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="bondRate"
                label="发行利率（%)"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="valiOrgNum"
                label="申购订单数量"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="subMulty"
                label="申购倍数"
                align="center"
                width="100px"
              ></el-table-column>
              <el-table-column
                prop="marginMulty"
                label="边际倍数"
                align="center"
                width="100px"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="tab2PageNum"
              :page-sizes="tab2PageSizes"
              :page-size="tab2PageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tab2TotalCount"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="附表3" name="four">
          <h2>债权融资计划发行情况({{ quarter3 }})</h2>
          <div class="textInfo">
            <i class="el-icon-info"></i>
            发行额总计：{{ tab3factMoney }}亿元
          </div>

          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="tab3TableData"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="id"
                label="序号"
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="bookManager"
                :show-overflow-tooltip="true"
                label="挂牌管理人全称"
                align="center"
                width="300px"
              ></el-table-column>
              <el-table-column
                prop="sellerName"
                :show-overflow-tooltip="true"
                label="融资人全称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="paymentEndDate"
                :show-overflow-tooltip="true"
                label="缴款日期"
                align="center"
                width="200px"
              ></el-table-column>
              <el-table-column
                prop="productShortName"
                :show-overflow-tooltip="true"
                label="产品简称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="originalListAmount"
                label="挂牌金额（亿元）"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="term"
                label="产品期限"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="participantNum"
                label="投资者数量"
                align="center"
                width="150px"
              ></el-table-column>
              <el-table-column
                prop="listedPrice"
                width="200px"
                label="票面利率（%）/价格（元）"
                align="center"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChangeTab3"
              @current-change="handleCurrentChangeTab3"
              :current-page="tab3PageNum"
              :page-sizes="tab3PageSizes"
              :page-size="tab3PageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tab3TotalCount"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getDataBookJbBookTypeJb,
  getDataBookJbBookDcmJb,
  getDataBoCokJbBookPpnJb,
  getDataBookJbExport,
} from "../../library/api/api.public";
import { downloadUrl } from "../../library/api/axiosExport";
import axios from "../../library/api/axiosExport.js";
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
      html: "",
      //tab 切换
      activeName: "first",
      // from数据
      input: {},
      tableData: [],
      tab1TableData: [],
      tab2TableData: [],
      tab3TableData: [],
      pageNum: 1,
      tab2PageNum: 1,
      tab3PageNum: 1,
      tab2factMoney: "",
      tab3factMoney: "",
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      tab2TotalCount: 0,
      tab3TotalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      tab2PageSizes: [5, 10, 15, 20],
      tab3PageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      tab2PageSize: 5,
      tab3PageSize: 5,
      // 定义变量存储点击数据
      currentData: {},
      isLoding: false,
      timeValue: "",
      quarter2: "",
      quarter3: "",
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
        consignPayEndDate: this.timeValue,
      };
      getDataBookJbExport(params).then((res) => {
        console.log(res);
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
      this.convertTime();
    },
    //表格分页
    handleSizeChange(val) {
      this.tab2PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.tab2PageNum = 1;
      this.tab2Data();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tab2PageNum = val;
      console.log(`当前页: ${val}`);
      this.tab2Data();
    },
    handleSizeChangeTab3(val) {
      this.tab3PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.tab3PageNum = 1;
      this.tab3Data();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeTab3(val) {
      this.tab3PageNum = val;
      console.log(`当前页: ${val}`);
      this.tab3Data();
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
        this.$message.error("请选择时间后导出");
      } else {
        let url =
          this.$api.IP +
          "/dataBookJb/bookGeneralJb?consignPayEndDate=" +
          this.timeValue;
        downloadUrl(url);
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (this.timeValue == "" || this.timeValue == null) {
      } else {
        if (tab.name == "second") {
          this.tab1Data();
        } else if (tab.name == "three") {
          this.tab2Data();
        } else if (tab.name == "four") {
          this.tab3Data();
        }
      }
    },
    tabBefore() {
      if (this.timeValue == "" || this.timeValue == null) {
        this.$message.error("请选择时间后查看报告");
        return false;
      }
    },
    tab1Data() {
      let params = { consignPayEndDate: this.timeValue };
      getDataBookJbBookTypeJb(params).then((res) => {
        console.log(res);
        this.tab1TableData = res.data;
      });
    },
    tab2Data() {
      let params = {
        pageSize: this.tab2PageSize,
        pageNum: this.tab2PageNum,
        consignPayEndDate: this.timeValue,
      };
      getDataBookJbBookDcmJb(params).then((res) => {
        console.log(res);
        this.tab2TableData = res.data.list;
        this.tab2factMoney = res.data.factMoney;
        this.tab2TotalCount = res.data.total;
        this.quarter2 = res.data.quarter;
      });
    },
    tab3Data() {
      let params = {
        pageSize: this.tab3PageSize,
        pageNum: this.tab3PageNum,
        consignPayEndDate: this.timeValue,
      };
      getDataBoCokJbBookPpnJb(params).then((res) => {
        console.log(res);
        this.tab3TableData = res.data.list.list;
        this.tab3factMoney = res.data.factMoney;
        this.quarter3 = res.data.quarter;
        this.tab3TotalCount = res.data.total;
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
      div {
        display: inline-block;
      }
    }
    // 上半部分的内容
    .topCentent {
      display: flex;
      margin-top: 40px;
      /deep/ .el-button.el-button--mini {
        border-radius: 8px;
      }
      .el-col {
        display: flex;
        .search-label {
          width: 55%;
          line-height: 36px;
          text-align: right;
          color: #515a5e;
        }
        /deep/ .el-input__inner {
          padding-right: unset;
          width: 100%;
          height: 28px;
          font-size: 12px;
        }
        .dateinterval {
          /deep/ .el-range-separator {
            width: 30px;
          }
        }
      }
      .btns {
        margin-left: auto;
        display: flex;
        // justify-content: center;
        // margin-left: 10px;
        button {
          border-radius: 5px !important;
          justify-content: center;
          margin-left: 10px;
        }
      }
      .toLead {
        padding: 0;
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
    border-radius: 5px !important;
  }
  .textInfo {
    padding-left: 10px;
    margin: 10px 0;
    line-height: 40px;
    font-size: 20px;
    background-color: #e6f7ff;
    border: 1px solid #bae7ff;
    border-radius: 3px;
    i {
      margin-right: 10px;
      color: #409eff;
    }
  }
  h2 {
    line-height: 40px;
  }
  .wxjb {
    margin: 0 auto;
    justify-content: center;
    margin-top: 40px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px 5px #ccc;
    line-height: 2.5;
    font-size: 14px;
    letter-spacing: 4px;
    min-width: 1000px;
  }
  .wxjbp:first-child p {
    color: red !important;
  }
}
</style>
