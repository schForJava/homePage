<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">每季度承销比统计表生成</span>
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
      <!--输入框1 -->
      <el-row class="topCentent" style="margin-top: 20px">
        <el-col :span="6">
          <label class="search-label">选择日期：</label>
          <el-date-picker
            v-model="time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <div class="btns">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="derive">导出</el-button>
          <el-button plain @click="reset">重置</el-button>
          <router-link to="/bookkeepingMail">邮件配置 </router-link>
          <router-view />
        </div>
      </el-row>
      <!-- 下半部分 -->
      <!-- <el-page-header content="详情页面"></el-page-header> -->
      <!--tab部分 -->
      <div class="tables">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="编号"
          ></el-table-column>
          <el-table-column
            prop="accConfirmDate"
            align="center"
            label="发行成功日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="registrDate"
            align="center"
            label="起息日"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="bondCode"
            align="center"
            label="债券代码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="bondShortName"
            align="center"
            label="债券简称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="valueCurrency"
            align="center"
            label="发行币种"
          ></el-table-column>
          <el-table-column
            prop="bondType"
            align="center"
            label="债券品种"
          ></el-table-column>
          <el-table-column
            prop="publishModel"
            align="center"
            label="发行方式"
          ></el-table-column>
          <el-table-column
            prop="memName"
            align="center"
            label="发行人全称"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="investorCompanyCn1"
            align="center"
            label="主承一"
          ></el-table-column>
          <el-table-column
            prop="consignPercent1"
            align="center"
            label="主承一承销占比(%)"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="investorCompanyCn2"
            align="center"
            label="主承二"
          ></el-table-column>
          <el-table-column
            prop="consignPercent2"
            align="center"
            label="主承二承销占比(%)"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="prdtRating"
            align="center"
            label="债项评级"
          ></el-table-column>
          <el-table-column
            prop="prdtRatingAgenciesSname"
            align="center"
            label="债项评级机构简称"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="prdtRating2"
            align="center"
            label="债项评级2"
          ></el-table-column>
          <el-table-column
            prop="prdtRatingAgenciesSname2"
            align="center"
            label="债项评级机构简称2"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="pubCreditrate"
            align="center"
            label="发行人信用评级"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="pubCreditrateAgencyName"
            align="center"
            label="发行人信用评级机构简称"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="pubCreditrate2"
            align="center"
            label="发行人信用评级2"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="pubCreditrateAgencyName2"
            align="center"
            label="发行人信用评级机构简称2"
            width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="optionOrNot"
            align="center"
            label="是否选择权"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="optionType"
            align="center"
            label="选择权类型"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="secName"
            align="center"
            label="担保机构名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="guaranteeMode"
            align="center"
            label="担保方式"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            label="备注"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <!-- 导出弹窗 -->
    <!-- <el-dialog title="导出" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-body">
        <span class="demonstration">选择日期 :</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="timeValue"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="derive">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>
<script>
import { getEveryQuarterQueryPage } from "../../library/api/api.public";
import { axios, downloadUrl } from "../../library/api/axiosExport.js";
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
      loading: false,
      dialogVisible: false,

      time: "",
      tableData: [],
      monthTableData: [],
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      // 定义变量存储点击数据
      timeValue: "",
      yearStr: "",
      mathStr: "",
    };
  },
  // 获取初始数据
  created() {
    // this.convertTime();
    // this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let params = {
        mentEndDate: this.time,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getEveryQuarterQueryPage(params).then((res) => {
        console.log(res);
        this.tableData = res.data.queryList;
        this.totalCount = res.data.queryCount;
      });
    },

    /**
     * 查询条件
     */
    search() {
      this.pageNum = 1;
      this.getData();
    },

    /**
     * 搜索条件重置
     */
    reset() {
      this.time = "";
    },

    //表格分页
    handleSizeChange(val) {
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum = 1;
      this.getData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.getData();
    },

    //转换日期格式
    convertTime() {
      this.timeValue = new Date();
      var date = new Date(this.timeValue);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      this.timeValue = y + "-" + m + "-" + d;
      this.time = y + "-" + m + "-" + d;
    },

    /**
     * 导出功能
     */
    derive() {
      window.location.href =
        this.$api.IP + "/everyQuarter/exportList?mentEndDate=" + this.time;
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
      justify-content: center;
      display: flex;
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
      margin-top: 9px;
      /deep/ .el-button.el-button--mini {
        border-radius: 8px;
      }
      .el-col {
        display: flex;
        .search-label {
          width: 55%;
          line-height: 36px;
          text-align: left;
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
        display: flex;
        // justify-content: center;
        // margin-left: 10px;
        button {
          border-radius: 5px !important;
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
  .btns {
    padding: 0 20px;
  }
  button {
    border-radius: 5px !important;
  }
  a {
    color: blue;
    padding: 0 20px;
    line-height: 36px;
  }
  h2 {
    margin-top: 20px;
  }
}
</style>
