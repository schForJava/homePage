<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">服务费信息查询</span>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <!-- 标题 -->
      <!-- <el-row class="titleContent">
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
      </el-row> -->
      <!--输入框1 -->
      <el-row class="topCentent" style="margin-top: 30px">
        <el-col :span="6">
          <label class="search-label">债券代码：</label>
          <el-input
            placeholder="请输入"
            v-model="input.bondCode"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">债券全称：</label>
          <el-input
            placeholder="请输入"
            v-model="input.bondFullName"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">债券简称：</label>
          <el-input
            placeholder="请输入"
            v-model="input.bondShortName"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">发行人全称：</label>
          <el-input
            placeholder="请输入"
            v-model="input.publisherName"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <!--输入框4 -->
      <el-row class="topCentent" style="margin-top: 30px">
        <el-col :span="6">
          <label class="search-label">主承销商全称：</label>
          <el-input
            placeholder="请输入"
            v-model="input.leadManagerName"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">服务费（万元）：</label>
          <el-input
            placeholder="请输入"
            v-model="input.currentServiceFee"
            clearable
          ></el-input>
        </el-col>

        <el-col :span="6">
          <label class="search-label">缴款通知书编号：</label>
          <el-input
            placeholder="请输入"
            v-model="input.paymentNoticeNo"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">缴款截止日：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.payment"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
      </el-row>
      <!--输入框1 -->
      <el-row class="topCentent" style="margin-top: 30px">
        <el-col :span="6">
          <label class="search-label">发票代码：</label>
          <el-input
            placeholder="请输入"
            v-model="input.invoiceCode"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">发票号码：</label>
          <el-input
            placeholder="请输入"
            v-model="input.invoiceNum"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">是否开票：</label>
          <el-select v-model="input.isInvoice" placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="search-label">到账日期：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.arrivalDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <div class="btns">
          <el-button type="primary" @click="search">查询</el-button>
          <!-- <el-button type="primary" @click="dialogVisible = true"
            >导出</el-button
          > -->
          <el-button plain @click="reset">重置</el-button>
        </div>
      </el-row>
      <el-dialog
        :visible.sync="menuRoleVisible"
        append-to-body
        title="导入数据"
      >
        <menu-role
          v-if="menuRoleVisible"
          ref="menuRole"
          @renewal="updateModal"
          @cencel="cencelModal"
        ></menu-role>
      </el-dialog>
      <!--tab部分 -->
      <div class="tables">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column
            label="序号"
            prop="rowId"
            align="center"
            width="70px"
          >
            <!-- <template slot-scope="scope">{{scope.$index+1}}</template> -->
          </el-table-column>
          <el-table-column
            prop="bondCode"
            label="债券代码"
            align="center"
            width="150px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="bondFullName"
            label="债券全称"
            align="center"
            width="300px"
            header-align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="bondShortName"
            label="债券简称"
            align="center"
            width="300px"
          ></el-table-column>
          <el-table-column
            prop="bondType"
            label="债券类型"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="publisherName"
            label="发行人全称"
            width="300px"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="leadManagerName"
            label="主承销商全称"
            align="center"
            width="200px"
          ></el-table-column>

          <el-table-column
            prop="actualPublishAmount"
            label="实际发行额（亿元）"
            align="center"
            width="300px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="bondTerm"
            label="期限"
            align="center"
            width="150px"
          ></el-table-column>

          <el-table-column
            prop="currentServiceFee"
            label="服务费（万元）"
            align="center"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="paymentNoticeNo"
            label="缴款通知书编号"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="paymentEndDateStr"
            label="缴款截止日"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="arrivalDateStr"
            label="到账日期"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="isInvoice"
            label="是否开票"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="invoiceCode"
            label="发票代码"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="invoiceNum"
            label="发票号码"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="invoiceAmount"
            label="开票金额（元）"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column prop="name" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <!-- <a class="cz" @click="check(scope.row)" type="text" size="small"
                >查看</a
              > -->
              <a
                class="cz"
                @click="download(scope.row)"
                type="text"
                size="small"
                >缴款通知书下载</a
              >
            </template>
          </el-table-column>
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
        <span class="demonstration">*选择日期 :</span>
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
    </el-dialog> -->
  </div>
</template>

<script>
import { getOcsBondCalSselectAll } from "../../library/api/api.public";
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
      loading: false,
      menuRoleVisible: false,
      dialogVisible: false,
      text: "确定",
      // from数据
      input: {
        bondCode: "",
        bondFullName: "",
        bondShortName: "",
        publisherName: "",
        leadManagerName: "",
        currentServiceFee: "",
        paymentNoticeNo: "",
        isInvoice: "",
        arrivalDate: [],
        payment: [],
        invoiceCode: "",
        invoiceNum: "",
      },
      tableData: [],
      options: [
        {
          value: "0",
          label: "否",
        },
        {
          value: "1",
          label: "是",
        },
      ],
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
      defaultDate: new Date(),
    };
  },
  // 获取初始数据
  created() {
    this.convertTime();
    this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let paymentStartStr = "";
      let paymentEndStr = "";
      let arrivalDateStartStr = "";
      let arrivalDateEndStr = "";
      if (this.input.payment == "" || this.input.payment == null) {
        paymentStartStr = "";
        paymentEndStr = "";
      } else {
        paymentStartStr = this.input.payment[0];
        paymentEndStr = this.input.payment[1];
      }
      if (this.input.arrivalDate == "" || this.input.arrivalDate == null) {
        arrivalDateStartStr = "";
        arrivalDateEndStr = "";
      } else {
        arrivalDateStartStr = this.input.arrivalDate[0];
        arrivalDateEndStr = this.input.arrivalDate[1];
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        bondCode: this.input.bondCode,
        bondFullName: this.input.bondFullName,
        bondShortName: this.input.bondShortName,
        publisherName: this.input.publisherName,
        leadManagerName: this.input.leadManagerName,
        currentServiceFeeStr: this.input.currentServiceFee,
        paymentNoticeNo: this.input.paymentNoticeNo,
        isInvoice: this.input.isInvoice,
        paymentStartStr: paymentStartStr,
        paymentEndStr: paymentEndStr,
        arrivalStartStr: arrivalDateStartStr,
        arrivalEndStr: arrivalDateEndStr,
        invoiceCode: this.input.invoiceCode,
        invoiceNum: this.input.invoiceNum,
      };
      getOcsBondCalSselectAll(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
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
      this.input = {
        bondCode: "",
        bondFullName: "",
        bondShortName: "",
        publisherName: "",
        leadManagerName: "",
        currentServiceFee: "",
        paymentNoticeNo: "",
        isInvoice: "",
        arrivalDate: [],
        payment: [],
        invoiceCode: "",
      };
      this.defaultDate = new Date();
      this.convertTime();
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
    check(row) {
      window.open(
        // "http://10.10.54.128:8001/payment-notice-html?itemId=1" +
        "/payment-notice-html?itemId=1" +
          "&calcDetailIds=" +
          row.id +
          "&templateType=1"
      );
    },
    download(row) {
      window.location.href =
        // "http://10.10.54.128:8001/payment-notice?itemId=1" +
        "/payment-notice?itemId=1" +
        "&calcDetailId=" +
        row.id +
        "&templateType=" +
        row.templateType;
    },
    // //转换日期格式
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
      let endTime = y + "-" + m + "-" + d;
      // this.input.submitTime.push(endTime);
      // this.input.submitTime.push(endTime);
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
      margin-top: 9px;
      /deep/ .el-button.el-button--mini {
        border-radius: 8px;
      }
      .el-col {
        display: flex;
        .search-label {
          width: 50%;
          line-height: 36px;
          text-align: right;
          color: #515a5e;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
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
  a {
    color: blue;
  }
}
</style>
