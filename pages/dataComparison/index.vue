<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">工作台数据提取与数据比对</span>
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
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin-top: 40px"
      >
        <el-tab-pane label="披露完成债项信息" name="second">
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <label class="search-label">债券全称：</label>
              <el-input
                placeholder="请输入"
                v-model="input.bondName"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">主承销商：</label>
              <el-input
                placeholder="请输入"
                v-model="input.consignee1OrgName"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">债券类型：</label>
              <el-select v-model="input.bondType" placeholder="请选择" clearable >
                <el-option
                  v-for="(item, index) in bondTypeOptions"
                  :key="index"
                  :label="item.name1"
                  :value="item.value1"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">完成建债：</label>
              <el-select v-model="input.isFunishBond" placeholder="请选择" clearable >
                <el-option
                  v-for="(item, index) in isFunishBondOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <label class="search-label">发行起始日：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="input.publishDateb"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <label class="search-label">缴款日：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="input.consignPayEndDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <label class="search-label" style="width: 175px"
                >披露时间：</label
              >
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="input.submitTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="8">
              <label class="search-label" style="width: 175px"
                >审核时间：</label
              >
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="input.checkTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <div class="btns">
                <el-button type="primary" @click="accomplish"
                  >完成建债</el-button
                >
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="derive">导出</el-button>
                <el-button plain @click="reset">重置</el-button>
              </div>
            </el-col>
          </el-row>

          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="tableData"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
            >
              >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                prop="rowId"
                label="序号"
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="submitTimeStr"
                label="披露时间"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="bondCode"
                label="债券代码"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="bondShortName"
                label="债券简称"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="bondName"
                label="债券全称"
                align="center"
                width="300"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="bondType"
                label="债券类型"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="issueFaceValue"
                label="计划发行金额（万元）"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="issueMode"
                label="发行方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="consignee1OrgName"
                label="主承销商"
                align="center"
                width="300"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="publishDatebStr"
                label="发行起始日"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="issueDateEndStr"
                label="发行截止日"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="consignPayEndDateStr"
                label="缴款日"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="isFunishBond"
                label="完成建债"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="checkTimeStr"
                label="审核时间"
                align="center"
                width="200"
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
        </el-tab-pane>
        <el-tab-pane label="簿记准备完成债项比对" name="first">
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <label class="search-label">债券全称：</label>
              <el-input
                placeholder="请输入"
                v-model="bjInput.bondFullName"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">簿记管理人：</label>
              <el-input
                placeholder="请输入"
                v-model="bjInput.bookManager"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">比对结果：</label>
              <el-select v-model="bjInput.comPareResult" placeholder="请选择" clearable >
                <el-option
                  v-for="(item, index) in comPareResultOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <!--输入框2 -->
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <label class="search-label">发行起始日：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="bjInput.publishDateb"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <label class="search-label">缴款日：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="bjInput.consignPayEndDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <div class="btns">
                <el-button type="primary" @click="comparison"
                  >债项比对</el-button
                >
                <el-button type="primary" @click="BjSearch">查询</el-button>
                <el-button plain @click="Bjreset">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <!--tab部分 -->
          <div class="tables">
            <el-table
              class="tb"
              :data="BjtableData"
              style="width: 100%"
              ref="multipleTable"
              :row-style="addClass"
              border
            >
              <el-table-column type="selection" width="55">
                <template slot-scope="scope">
                  <el-radio
                    v-model="radio"
                    :label="scope.$index"
                    @change.native="radioChange(scope.row, scope.$index)"
                  >
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="rowId"
                label="序号"
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="bondCode"
                label="债券代码"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="bondShortName"
                label="债券简称"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="bondFullName"
                label="债券全称"
                align="center"
                width="300"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="bondType"
                label="债券类型"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="planPublishAmount"
                label="债券规模/计划发行金额（万元）"
                align="center"
                width="300"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="publishModel"
                label="发行方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="regNoticeNumber"
                label="注册通知书文号"
                align="center"
                width="300"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="repaymentModel"
                label="计息方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="bookManager"
                label="簿记管理人"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="publishDatebStr"
                label="发行起始日"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="publishDateeStr"
                label="发行截止日"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="consignPayEndDateStr"
                label="承销商缴款截止日期"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="consignPayEndTimeStr"
                label="承销商缴款截止时间"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="comPareResult"
                label="对比结果"
                align="center"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="BjhandleSizeChange"
              @current-change="BjhandleCurrentChange"
              :current-page="BjpageNum"
              :page-sizes="BjpageSizes"
              :page-size="BjpageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="BjtotalCount"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 查看弹窗 -->
    <el-dialog :title="bondFullName" width="60%" :visible.sync="checkVisible">
      <div class="content" style="width: 100%">
        <div class="tables">
          <el-table
            :data="checkTable"
            style="width: 100%"
            border
            :row-style="rowClass"
          >
            <el-table-column
              label="序号"
              prop="seqNum"
              align="center"
              width="70px"
            >
            </el-table-column>
            <el-table-column
              prop="flowNode"
              label="流程节点"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="itmeName"
              label="信息项名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="ext1"
              label="信息项内容"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="ext2"
              label="比对值"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="diffType"
              label="比对方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="ext3"
              label="比对结果"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!--tab部分 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pass('通过')">通过</el-button>
        <el-button type="primary" @click="pass('不通过')">不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataComparePageInfoQuery,
  getDataCompareFinishBond,
  getDataComparePageBookInfoQuery,
  getDataCompareSelectBondConfInfo,
  getDataCompareUpdateResult,
  getDataCompareSelectBondType,
} from "../../library/api/api.public";
import axios from "../../library/api/axiosExport.js";
// import $http
import TableOne from "../home/components/TableOne";
import messageBox from "../home/components/messageBox.vue";
import MenuRole from "../home/components/MenuRole.vue";
import ElCol from "element-ui/packages/col/src/col";
import ElRow from "element-ui/packages/row/src/row";
export default {
  components: {
    ElRow,
    ElCol,
    TableOne,
    messageBox,
    MenuRole,
  },
  data() {
    return {
      activeName: "second",
      loading: false,
      checkVisible: false,
      text: "确定",
      // from数据
      input: {
        bondName: "",
        bondType: "",
        consignee1OrgName: "",
        isFunishBond: "",
        submitTime: "",
        checkTime: "",
        publishDateb: "",
        consignPayEndDate: "",
      },
      bondTypeOptions: [],
      isFunishBondOptions: [
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
      comPareResultOptions: [
        {
          value: "通过",
          label: "通过",
        },
        {
          value: "不通过",
          label: "不通过",
        },
      ],
      bjInput: {
        bondEnglishFullName: "",
        trusteeOrg: "",
        comPareResult: "",
        publishDateb: "",
        consignPayEndDate: "",
      },
      bondFullName: "",
      tableData: [],
      BjtableData: [],
      multipleSelection: [],
      selectedData: [],
      currentEditNum: -1,
      BjmultipleSelection: [],
      radio: "",
      checkTable: [],
      entryName: "",
      projTrackNo: "",
      instNo: "",
      sourceType: "",
      pageNum: 1,
      BjpageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      BjtotalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      BjpageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      BjpageSize: 5,

      // 定义变量存储点击数据
      currentData: {},
      isLoding: false,
      timeValue: "",
      time: "",
      getIndex: "",
    };
  },
  created() {},
  // 获取初始数据
  mounted() {
    this.getData();
    this.getSelect();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */

    getData() {
      let submitTimeStrStart = "";
      let submitTimeStrEnd = "";
      let checkTimeStrStart = "";
      let checkTimeStrEnd = "";
      let publishDatebStrStart = "";
      let publishDatebStrEnd = "";
      let consignPayEndDateStrStart = "";
      let consignPayEndDateStrEnd = "";
      if (this.input.submitTime == "" || this.input.submitTime == null) {
        submitTimeStrStart = "";
        submitTimeStrEnd = "";
      } else {
        submitTimeStrStart = this.input.submitTime[0];
        submitTimeStrEnd = this.input.submitTime[1];
      }
      if (this.input.checkTime == "" || this.input.checkTime == null) {
        checkTimeStrStart = "";
        checkTimeStrEnd = "";
      } else {
        checkTimeStrStart = this.input.checkTime[0];
        checkTimeStrEnd = this.input.checkTime[1];
      }
      if (this.input.publishDateb == "" || this.input.publishDateb == null) {
        publishDatebStrStart = "";
        publishDatebStrEnd = "";
      } else {
        publishDatebStrStart = this.input.publishDateb[0];
        publishDatebStrEnd = this.input.publishDateb[1];
      }
      if (
        this.input.consignPayEndDate == "" ||
        this.input.consignPayEndDate == null
      ) {
        consignPayEndDateStrStart = "";
        consignPayEndDateStrEnd = "";
      } else {
        consignPayEndDateStrStart = this.input.consignPayEndDate[0];
        consignPayEndDateStrEnd = this.input.consignPayEndDate[1];
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        bondName: this.input.bondName,
        bondType: this.input.bondType,
        consignee1OrgName: this.input.consignee1OrgName,
        isFunishBond: this.input.isFunishBond,
        submitTimeStrStart: submitTimeStrStart,
        submitTimeStrEnd: submitTimeStrEnd,
        checkTimeStrStart: checkTimeStrStart,
        checkTimeStrEnd: checkTimeStrEnd,
        publishDatebStrStart: publishDatebStrStart,
        publishDatebStrEnd: publishDatebStrEnd,
        consignPayEndDateStrStart: consignPayEndDateStrStart,
        consignPayEndDateStrEnd: consignPayEndDateStrEnd,
      };
      getDataComparePageInfoQuery(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      });
    },
    getSelect() {
      getDataCompareSelectBondType().then((res) => {
        console.log(res);
        this.bondTypeOptions = res.data;
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
        bondName: "",
        bondType: "",
        consignee1OrgName: "",
        isFunishBond: "",
        submitTime: "",
        checkTime: "",
        publishDateb: "",
        consignPayEndDate: "",
      };
    },
    accomplish() {
      let type = true;
      this.multipleSelection.forEach((item) => {
        if (item.isFunishBond == "是") {
          type = false;
        }
      });
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.openTipBox("请选择数据", "warning");
      } else {
        if (type) {
          console.log("请求接口");
          getDataCompareFinishBond(this.multipleSelection).then((res) => {
            if (res.code == "000000") {
              this.openTipBox(res.data, "success");
            } else {
              this.openTipBox(res.data, "error");
            }
            this.getData();
          });
        } else {
          this.openTipBox("已完成建债，请勿重复操作", "warning");
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
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
    BjhandleSizeChange(val) {
      this.BjpageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.BjpageNum = 1;
      this.getBjData();
      console.log(`每页 ${val} 条`);
    },
    BjhandleCurrentChange(val) {
      this.BjpageNum = val;
      console.log(`当前页: ${val}`);
      this.getBjData();
    },
    /**
       * 打开提示框
       @params message 提示框信息
       @params type 提示类型
       */
    openTipBox(message, type) {
      this.$message({
        showClose: true,
        message,
        type,
      });
    },
    //修改单元格样式的方法
    addClass({ row, column, rowIndex, columnIndex }) {
      if (row.comPareResult == "通过") {
        return { background: "#f5fee6!important", color: "#fff!important" };
      } else if (row.comPareResult == "不通过") {
        return { background: "#fbe6e9!important", color: "#fff!important" };
      }
    },
    //对比修改单元格样式的方法
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (row.ext3 == "通过") {
        return { background: "#f5fee6!important", color: "#fff!important" };
      } else if (row.ext3 == "不通过") {
        return { background: "#fbe6e9!important", color: "#fff!important" };
      }
    },
    /**
     * 列表渲染
     */
    getBjData() {
      let publishDatebStrStart = "";
      let publishDatebStrEnd = "";
      let consignPayEndDateStrStart = "";
      let consignPayEndDateStrEnd = "";
      if (
        this.bjInput.publishDateb == "" ||
        this.bjInput.publishDateb == null
      ) {
        publishDatebStrStart = "";
        publishDatebStrEnd = "";
      } else {
        publishDatebStrStart = this.bjInput.publishDateb[0];
        publishDatebStrEnd = this.bjInput.publishDateb[1];
      }
      if (
        this.bjInput.consignPayEndDate == "" ||
        this.bjInput.consignPayEndDate == null
      ) {
        consignPayEndDateStrStart = "";
        consignPayEndDateStrEnd = "";
      } else {
        consignPayEndDateStrStart = this.bjInput.consignPayEndDate[0];
        consignPayEndDateStrEnd = this.bjInput.consignPayEndDate[1];
      }
      let params = {
        pageSize: this.BjpageSize,
        pageNum: this.BjpageNum,
        bondFullName: this.bjInput.bondFullName,
        bookManager: this.bjInput.bookManager,
        comPareResult: this.bjInput.comPareResult,
        publishDatebStrStart: publishDatebStrStart,
        publishDatebStrEnd: publishDatebStrEnd,
        consignPayEndDateStrStart: consignPayEndDateStrStart,
        consignPayEndDateStrEnd: consignPayEndDateStrEnd,
      };
      getDataComparePageBookInfoQuery(params).then((res) => {
        console.log(res);
        this.BjtableData = res.data.list;
        this.BjtotalCount = res.data.total;
      });
    },
    BjSearch() {
      this.BjpageNum = 1;
      this.getBjData();
    },
    Bjreset() {
      this.bjInput = {
        bondEnglishFullName: "",
        trusteeOrg: "",
        comPareResult: "",
        publishDateb: "",
        consignPayEndDate: "",
      };
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件,确保只能选中一项数据
    radioChange(row, index) {
      this.selectedData = [];
      this.selectedData.push(row);
      console.log(this.selectedData);
    },

    comparison() {
      if (this.selectedData.length == 0) {
        this.openTipBox("请选择数据后比对", "warning");
      } else {
        this.checkVisible = true;
        getDataCompareSelectBondConfInfo(this.selectedData[0]).then((res) => {
          this.checkTable = res.data.list;
          console.log(JSON.stringify(this.selectedData[0]));
          this.bondFullName = "债项比对-" + res.data.bondFullName;
        });
      }
    },
    /**
     * 通过不通过对比
     */
    pass(status) {
      let params = {
        bondId: this.selectedData[0].bondId,
        result: status,
      };
      getDataCompareUpdateResult(params).then((res) => {
        this.checkVisible = false;
        this.getBjData();
      });
    },
    /**
     * 导出功能
     */
    derive() {
      let submitTimeStrStart = "";
      let submitTimeStrEnd = "";
      let checkTimeStrStart = "";
      let checkTimeStrEnd = "";
      let publishDatebStrStart = "";
      let publishDatebStrEnd = "";
      let consignPayEndDateStrStart = "";
      let consignPayEndDateStrEnd = "";
      if (this.input.submitTime == "" || this.input.submitTime == null) {
        submitTimeStrStart = "";
        submitTimeStrEnd = "";
      } else {
        submitTimeStrStart = this.input.submitTime[0];
        submitTimeStrEnd = this.input.submitTime[1];
      }
      if (this.input.checkTime == "" || this.input.checkTime == null) {
        checkTimeStrStart = "";
        checkTimeStrEnd = "";
      } else {
        checkTimeStrStart = this.input.checkTime[0];
        checkTimeStrEnd = this.input.checkTime[1];
      }
      if (this.input.publishDateb == "" || this.input.publishDateb == null) {
        publishDatebStrStart = "";
        publishDatebStrEnd = "";
      } else {
        publishDatebStrStart = this.input.publishDateb[0];
        publishDatebStrEnd = this.input.publishDateb[1];
      }
      if (
        this.input.consignPayEndDate == "" ||
        this.input.consignPayEndDate == null
      ) {
        consignPayEndDateStrStart = "";
        consignPayEndDateStrEnd = "";
      } else {
        consignPayEndDateStrStart = this.input.consignPayEndDate[0];
        consignPayEndDateStrEnd = this.input.consignPayEndDate[1];
      }
      window.location.href =
        this.$api.IP +
        "/dataCompare/downExcel?bondName=" +
        this.input.bondName +
        "&bondType=" +
        this.input.bondType +
        "&consignee1OrgName=" +
        this.input.consignee1OrgName +
        "&isFunishBond=" +
        this.input.isFunishBond +
        "&submitTimeStrStart=" +
        submitTimeStrStart +
        "&submitTimeStrEnd=" +
        submitTimeStrEnd +
        "&checkTimeStrStart=" +
        checkTimeStrStart +
        "&checkTimeStrEnd=" +
        checkTimeStrEnd +
        "&publishDatebStrStart=" +
        publishDatebStrStart +
        "&publishDatebStrEnd=" +
        publishDatebStrEnd +
        "&consignPayEndDateStrStart=" +
        consignPayEndDateStrStart +
        "&consignPayEndDateStrEnd=" +
        consignPayEndDateStrEnd;
    },

    handleClick(tab, event) {
      console.log(tab);
      if (tab.name == "first") {
        this.getBjData();
      } else if (tab.name == "second") {
        this.getData();
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
      padding: 20px;
      justify-content: center;
      border-bottom: solid 1px #e8eaec;
      overflow: auto;
    }
  }
  .cz {
    color: #5882fa !important;
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
          width: 200px;
          line-height: 36px;
          text-align: center;
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
  .lookWarp .el-col {
    display: flex;
    .search-label {
      text-align: center;
      line-height: 36px;
    }
    .el-input {
      width: 300px;
    }
  }
  .rowColor {
    background: red !important;
  }

  /deep/.el-table tbody tr:hover > td {
    background-color: #fff !important;
    opacity: 0.9;
  }
  /*隐藏表头复选框*/
  /deep/.tb .el-table__header .el-table-column--selection .cell .el-checkbox {
    display: none;
  }
  /deep/.cell .el-radio__label {
    display: none;
  }
}
</style>
