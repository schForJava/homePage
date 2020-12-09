<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">到期违约债券台账</span>
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-row class="topCentent" style="margin-top: 30px">
          <el-col :span="6">
            <label class="search-label">项目编号：</label>
            <el-input
              placeholder="请输入"
              v-model="input.productNum"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="6">
            <label class="search-label">标的债券全称：</label>
            <el-input
              placeholder="请输入"
              v-model="input.underbondFullname"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="6">
            <label class="search-label">标的债券简称：</label>
            <el-input
              placeholder="请输入"
              v-model="input.underbondShortname"
              clearable
            ></el-input>
          </el-col>
        </el-row>
        <!--输入框 -->
        <el-row class="topCentent" style="margin-top: 30px">
          <el-col :span="6">
            <label class="search-label">债券代码：</label>
            <el-input
              placeholder="请输入"
              v-model="input.bondNum"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="6">
            <label class="search-label">违约类型：</label>
            <el-select v-model="input.violateDefult" placeholder="请选择" clearable >
              <el-option
                v-for="(item, index) in violateDefultOptions"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <label class="search-label">转让方性质：</label>
            <el-select v-model="input.tranferorNature" placeholder="请选择" clearable >
              <el-option
                v-for="(item, index) in tranferorNatureOptions"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--输入框3 -->
        <el-row class="topCentent" style="margin-top: 30px">
          <el-col :span="6">
            <label class="search-label">中标受让方性质：</label>
            <el-select v-model="input.successBidderNature" placeholder="请选择" clearable >
              <el-option
                v-for="(item, index) in successBidderNatureOptions"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <label class="search-label">动态报价日/成交日：</label>
            <el-date-picker
              class="dateinterval"
              value-format="yyyy-MM-dd"
              v-model="input.dynamicQuoteDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <label class="search-label">结算日：</label>
            <el-date-picker
              class="dateinterval"
              value-format="yyyy-MM-dd"
              v-model="input.settlementDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <label class="search-label">结算方式：</label>
            <el-select v-model="input.settlementType" placeholder="请选择" clearable >
              <el-option
                v-for="(item, index) in settlementTypeOptions"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 下半部分 -->
        <el-row class="bottomContent">
          <el-col :span="20"></el-col>
          <el-col :span="4" class="btns">
            <el-button type="primary" @click="bookSearch">查询</el-button>
            <el-button plain @click="reset">重置</el-button>
          </el-col>
        </el-row>
        <el-row class="bottomContent">
          <el-col :span="8" class="btns">
            <el-button type="primary" @click="Import">台账导入</el-button>
            <el-button type="primary" @click="derive">台账导出</el-button>
            <el-button type="primary" @click="editData('tableForm', isSaveBtn)">
              <span v-if="isSaveBtn">保存</span>
              <span v-else>编辑</span>
            </el-button>
            <el-button v-if="isSaveBtn" type="primary" @click="cancelEdit"
              >取消编辑</el-button
            >
            <!-- <el-button type="primary" @click="qx">取消</el-button> -->
            <el-button type="primary" @click="bookDelete">删除</el-button>
          </el-col>
        </el-row>

        <!--tab部分 -->
        <div class="tables">
          <el-form
            :model="tableForm"
            ref="tableForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-table
              :data="tableForm.tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              border
              ref="table"
            >
              <el-table-column
                type="selection"
                width="55"
                fixed
                :selectable="selectEnable"
              ></el-table-column>
              <el-table-column
                label="序号"
                prop="rowId"
                align="center"
                width="70px"
                fixed
              ></el-table-column>
              <el-table-column
                prop="productNum"
                width="300"
                align="center"
                label="项目编号"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.productNum"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.productNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="underbondFullname"
                width="350"
                align="center"
                label="标的债券全称"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.underbondFullname"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.underbondFullname }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="underbondShortname "
                width="300"
                align="center"
                label="标的债券简称"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.underbondShortname"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.underbondShortname }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bondNum"
                width="150"
                align="center"
                label="债券代码"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.bondNum"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.bondNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="violateDefult"
                width="150"
                align="center"
                label="违约类型"
              >
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.isEdit"
                    v-model="scope.row.violateDefult"
                    placeholder="请选择"
                    clearable
                    @change="selectChange"
                  >
                    <el-option
                      v-for="(item, index) in violateDefultOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                  <span v-else>{{ scope.row.violateDefult }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="transferBondPrice"
                width="300"
                align="center"
                label="转让券面总额（万元）"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.transferBondPrice'"
                    :rules="tableFormRules.transferBondPrice"
                  >
                    <el-input
                      v-if="scope.row.isEdit"
                      v-model="scope.row.transferBondPrice"
                      placeholder="请输入内容"
                    ></el-input>

                    <span v-else>{{ scope.row.transferBondPrice }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="transferMinPrice"
                width="150"
                align="center"
                label="转让底价（万元）"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.transferMinPrice'"
                    :rules="tableFormRules.transferMinPrice"
                  >
                    <el-input
                      v-if="scope.row.isEdit"
                      v-model="scope.row.transferMinPrice"
                      placeholder="请输入内容"
                    ></el-input>

                    <span v-else>{{ scope.row.transferMinPrice }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="deposit"
                width="150"
                align="center"
                label="保证金（万元）"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.deposit'"
                    :rules="tableFormRules.deposit"
                  >
                    <el-input
                      v-if="scope.row.isEdit"
                      v-model="scope.row.deposit"
                      placeholder="请输入内容"
                    ></el-input>

                    <span v-else>{{ scope.row.deposit }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="tranferor"
                width="300"
                align="center"
                label="转让方"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.tranferor"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.tranferor }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="tranferorNature"
                width="300"
                align="center"
                label="转让方性质"
              >
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.isEdit"
                    v-model="scope.row.tranferorNature"
                    placeholder="请选择"
                    clearable
                    @change="selectChange"
                  >
                    <el-option
                      v-for="(item, index) in tranferorNatureOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                  <span v-else>{{ scope.row.tranferorNature }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="intendedTransferee"
                width="300"
                align="center"
                label="意向受让方"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.intendedTransferee"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.intendedTransferee }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="successfulBidder"
                width="300"
                align="center"
                label="中标受让方"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.isEdit"
                    v-model="scope.row.successfulBidder"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ scope.row.successfulBidder }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="successBidderNature"
                width="300"
                align="center"
                label="中标受让方性质"
              >
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.isEdit"
                    v-model="scope.row.successBidderNature"
                    placeholder="请选择"
                    clearable
                    @change="selectChange"
                  >
                    <el-option
                      v-for="(item, index) in successBidderNatureOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                  <span v-else>{{ scope.row.successBidderNature }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="publicityStartDateStr"
                width="150"
                align="center"
                label="公示起始日"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-if="scope.row.isEdit"
                    v-model="scope.row.publicityStartDateStr"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                  <span v-else>{{ scope.row.publicityStartDateStr }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="publicityEndDateStr"
                width="150"
                align="center"
                label="公示截止日"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-if="scope.row.isEdit"
                    v-model="scope.row.publicityEndDateStr"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                  <span v-else>{{ scope.row.publicityEndDateStr }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="dynamicQuoteDateStr"
                width="150"
                align="center"
                label="动态报价日/成交日"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-if="scope.row.isEdit"
                    v-model="scope.row.dynamicQuoteDateStr"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                  <span v-else>{{ scope.row.dynamicQuoteDateStr }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionAmount"
                width="150"
                align="center"
                label="成交金额（万元）"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.transactionAmount'"
                    :rules="tableFormRules.transactionAmount"
                  >
                    <el-input
                      v-if="scope.row.isEdit"
                      v-model="scope.row.transactionAmount"
                      placeholder="请输入内容"
                    ></el-input>

                    <span v-else>{{ scope.row.transactionAmount }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="settlementDateStr"
                width="150"
                align="center"
                label="结算日"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-if="scope.row.isEdit"
                    v-model="scope.row.settlementDateStr"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                  <span v-else>{{ scope.row.settlementDateStr }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="settlementType"
                width="150"
                align="center"
                label="结算方式"
              >
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.isEdit"
                    v-model="scope.row.settlementType"
                    placeholder="请选择"
                    clearable
                    @change="selectChange"
                  >
                    <el-option
                      v-for="(item, index) in settlementTypeOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                  <span v-else>{{ scope.row.settlementType }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="settlementPrice"
                width="300"
                align="center"
                label="结算价格（元/百元面值）"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.settlementPrice'"
                    :rules="tableFormRules.settlementPrice"
                  >
                    <el-input
                      v-if="scope.row.isEdit"
                      v-model="scope.row.settlementPrice"
                      placeholder="请输入内容"
                    ></el-input>

                    <span v-else>{{ scope.row.settlementPrice }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
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
        <!-- 台账导入 -->
        <el-dialog
          title="台账导入"
          class="import"
          :visible.sync="dialogVisible"
          width="25%"
        >
          <div class="dialog-body">
            <span>*附件上传 ：</span>
            <el-upload
              ref="upload"
              :limit="1"
              accept=".xlsx"
              class="upload-demo"
              :action="updateExclAll"
              :on-change="handleChange"
              :file-list="fileList"
              :on-progress="upLoading"
              :on-error="upError"
              :on-success="upSuccess"
            >
              <el-button class="el-icon-upload2"
                >&nbsp;&nbsp;上传文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                支持扩展名：.xls .xlsx ...
              </div>
            </el-upload>
          </div>

          <span slot="footer" class="dialog-footer">
            <span class="download" @click="deriveMb"
              >点击下载:到期违约台账导入模板.xlsx</span
            >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="derive">确 定</el-button> -->
          </span>
        </el-dialog>
        <!-- 导入失败数据 -->
        <el-dialog title="导入失败数据" :visible.sync="errorData" width="30%">
          <div class="dialog-body">
            <el-row>
              <div>
                <ul>
                  <li v-for="(item, index) in fileRes" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="errorData = false">关 闭</el-button>
          </span>
        </el-dialog>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getDefaultDueBookSelectPageDefault,
  getDefaultDueBookDeleteDefault,
  getDefaultDueBookSelectCode,
  getDefaultDueBookUpdateDefault,
  getDefaultDueBookCheckBook,
} from "../../library/api/api.public";

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
      isSelect: true,
      // 上传文件
      fileList: [],
      fileRes: [],
      //弹出层
      loading: false,
      menuRoleVisible: false,
      dialogVisible: false,
      bookEditVisible: false,
      errorData: false,
      //tab 切换
      activeName: "first",
      updateExclAll: this.$api.IP + "/defaultDueBook/updateExclAll",
      //搜索条件
      input: {
        productNum: "",
        underbondFullname: "",
        underbondShortname: "",
        bondNum: "",
        violateDefult: "",
        tranferorNature: "",
        successBidderNature: "",
        dynamicQuoteDate: [],
        settlementDate: [],
        settlementType: "",
      },
      violateDefultOptions: [],
      tranferorNatureOptions: [],
      successBidderNatureOptions: [],
      settlementTypeOptions: [],
      tableForm: {
        tableData: [
          {
            bondNum: 0,
          },
        ],
      },
      tableFormRules: {
        transferBondPrice: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
        transferMinPrice: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
        deposit: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
        transactionAmount: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /^\d{1,16}$|^(\d{1,16}\.{1}\d{1,4})$/g,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
        settlementPrice: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /^\d{1,16}$|^(\d{1,16}\.{1}\d{1,4})$/g,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
      },
      // 分页配置
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      fileResShow: false,
      // 记录当前编辑的是第几行
      currentEditNum: -1,
      // 记录当前多选按钮选中的数据
      // 是否为保存按钮
      isSaveBtn: false,
      selectedData: [],

      // 提示类型
      tipType: {
        warn: "warning",
        success: "success",
        error: "error",
      },
      // 提示信息
      tipInfo: {
        editTip: "请选中一行数据进行编辑！",
        deleteTip: "请选中数据进行删除！",
        editSucTip: "编辑成功",
        editErrTip: "编辑失败",
        idErrTip: "项目编号不能重复",

        delSucTip: "删除成功",
        delErrTip: "删除失败",
      },

      // 表格选中行数组
      multipleSelection: [],
      // 编辑时向后台传递的数组
      editForm: {},
    };
  },

  // 获取初始数据
  created() {},
  mounted() {
    this.getData();
    this.getSelect();
  },

  // 定义方法
  methods: {
    //初始化表格数据
    getData() {
      let dynamicQuoteDateStart = "";
      let dynamicQuoteDateEnd = "";
      let settlementDateStart = "";
      let settlementDateEnd = "";
      if (
        this.input.dynamicQuoteDate == "" ||
        this.input.dynamicQuoteDate == null
      ) {
        dynamicQuoteDateStart = "";
        dynamicQuoteDateEnd = "";
      } else {
        dynamicQuoteDateStart = this.input.dynamicQuoteDate[0];
        dynamicQuoteDateEnd = this.input.dynamicQuoteDate[1];
      }
      if (
        this.input.settlementDate == "" ||
        this.input.settlementDate == null
      ) {
        settlementDateStart = "";
        settlementDateEnd = "";
      } else {
        settlementDateStart = this.input.settlementDate[0];
        settlementDateEnd = this.input.settlementDate[1];
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        productNum: this.input.productNum,
        underbondFullname: this.input.underbondFullname,
        underbondShortname: this.input.underbondShortname,
        bondNum: this.input.bondNum,
        violateDefult: this.input.violateDefult,
        tranferorNature: this.input.tranferorNature,
        successBidderNature: this.input.successBidderNature,
        settlementType: this.input.settlementType,
        dynamicQuoteDateStart: dynamicQuoteDateStart,
        dynamicQuoteDateEnd: dynamicQuoteDateEnd,
        settlementDateStart: settlementDateStart,
        settlementDateEnd: settlementDateEnd,
      };

      getDefaultDueBookSelectPageDefault(params).then((res) => {
        this.tableForm.tableData = res.list;
        this.totalCount = res.total;
      });
    },

    //初始化下拉数据
    getSelect() {
      let params = {};
      getDefaultDueBookSelectCode(params).then((res) => {
        this.violateDefultOptions = res.data.wylx;
        this.tranferorNatureOptions = res.data.rfxz;
        this.successBidderNatureOptions = res.data.zbsrfxz;
        this.settlementTypeOptions = res.data.jsfs;
      });
    },

    //台账更新 倒计时
    bookCount() {
      var url = this.$api.IP + "/wkbCbsStadBook/selectTime";
      var slef = this;
      selectTime().then((res) => {
        slef.listuser = res.data;
        //200表示成功
        slef.updateTime = slef.listuser.ext2;
        slef.miao = slef.listuser.logItem3;
        slef.time = setInterval(slef.showTime, 1000);
      });
    },

    showTime() {
      this.miao -= 1;
      if (this.miao <= 0) {
        clearInterval(this.time);
        this.bookCount();
      } else {
        this.formatSeconds(this.miao);
      }
    },
    formatSeconds(value) {
      var theTime = parseInt(value); // 秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }
      var result = "" + parseInt(theTime) + "秒";
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
      }
      if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
      }
      this.keepTime = result;
    },
    //编辑后下拉联动
    mafmii1Change(rowId, selectId) {
      let pid = rowId;
      let params = { pid };
      let options = [];
      if (selectId == "nafmii1") {
        this.tableForm.tableData[this.currentEditNum].nafmii2 = "";
        this.tableForm.tableData[this.currentEditNum].nafmii1Code = "";
        getSelectCodeTwo(params).then((res) => {
          this.input.nafmii2Options = res.two;
        });
      } else if (selectId == "gjIndustry1") {
        this.tableForm.tableData[this.currentEditNum].gjIndustry2 = "";
        this.tableForm.tableData[this.currentEditNum].gjIndustry1Code = "";
        getSelectCodeTwo(params).then((res) => {
          this.input.gjIndustry2Options = res.two;
        });
      } else if (selectId == "nafmii2") {
        this.tableForm.tableData[this.currentEditNum].nafmii2Code = "";
      } else if (selectId == "gjIndustry2") {
        this.tableForm.tableData[this.currentEditNum].gjIndustry2Code = "";
      }
    },

    /**
     * 搜索表格数据
     */
    bookSearch() {
      this.pageNum = 1;
      this.getData();
      this.isSaveBtn = false;
    },
    //导出功能
    derive() {
      let dynamicQuoteDateStart = "";
      let dynamicQuoteDateEnd = "";
      let settlementDateStart = "";
      let settlementDateEnd = "";
      if (
        this.input.dynamicQuoteDate == "" ||
        this.input.dynamicQuoteDate == null
      ) {
        dynamicQuoteDateStart = "";
        dynamicQuoteDateEnd = "";
      } else {
        dynamicQuoteDateStart = this.input.dynamicQuoteDate[0];
        dynamicQuoteDateEnd = this.input.dynamicQuoteDate[1];
      }
      if (
        this.input.settlementDate == "" ||
        this.input.settlementDate == null
      ) {
        settlementDateStart = "";
        settlementDateEnd = "";
      } else {
        settlementDateStart = this.input.settlementDate[0];
        settlementDateEnd = this.input.settlementDate[1];
      }
      let list =
        "?productNum=" +
        this.input.productNum +
        "&&underbondFullname=" +
        this.input.underbondFullname +
        "&&underbondShortname=" +
        this.input.underbondShortname +
        "&&bondNum=" +
        this.input.bondNum +
        "&&violateDefult=" +
        this.input.violateDefult +
        "&&tranferorNature=" +
        this.input.tranferorNature +
        "&&successBidderNature=" +
        this.input.successBidderNature +
        "&&dynamicQuoteDateStart=" +
        dynamicQuoteDateStart +
        "&&dynamicQuoteDateEnd=" +
        dynamicQuoteDateEnd +
        "&&settlementDateStart=" +
        settlementDateStart +
        "&&settlementDateEnd=" +
        settlementDateEnd;

      window.location.href = this.$api.IP + "/defaultDueBook/downExcel" + list;
    },
    deriveMb() {
      window.location.href = this.$api.IP + "/defaultDueBook/downMoudel";
    },
    /**
     * 对比数据是否发生变化
     */
    contrastData(info, key) {
      if (info === this.selectedData[0][key]) {
        delete this.editForm[key];
      } else {
        this.editForm[key] = info;
      }
    },

    /**
       * 选中某一行数据
       @params val 当前选中的数据
       */
    handleSelectionChange(val) {
      // 记录当前选中的信息
      this.selectedData = JSON.parse(JSON.stringify(val));
      // 记录当前选中的是那一行
      this.currentEditNum = this.tableForm.tableData.indexOf(val[0]);
    },

    /**
     * 是否可编辑
     */
    selectEnable(data) {
      if (this.isSaveBtn) {
        return false;
      } else {
        return true;
      }
    },
    selectChange(val) {
      this.isSelect = false;
      this.tableForm.tableData[this.currentEditNum].listedStatusCode = "";
    },
    // qx() {
    //   // 保存变编辑
    //   this.isSaveBtn = false;
    //   // input变成span
    //   this.tableForm.tableData[this.currentEditNum].isEdit = false;
    // },
    /**
     * 编辑数据
     */
    editData(formName) {
      // 保存
      if (this.isSaveBtn) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (
              this.tableForm.tableData[this.currentEditNum].productNum !=
                null &&
              this.tableForm.tableData[this.currentEditNum].productNum != ""
            ) {
              let params = {
                id: this.tableForm.tableData[this.currentEditNum].id,
                productNum: this.tableForm.tableData[this.currentEditNum]
                  .productNum,
              };
              getDefaultDueBookCheckBook(params).then((res) => {
                if (res.data == "1") {
                  //   // 调取接口
                  // this.tableForm.tableData[this.currentEditNum].listedStatus = "申购中";
                  // this.tableForm.tableData[this.currentEditNum].listedStatusCode = "";
                  const params = this.tableForm.tableData[this.currentEditNum];
                  getDefaultDueBookUpdateDefault(params).then((res) => {
                    this.tableForm.tableData[this.currentEditNum].isEdit = true;
                    this.openTipBox(
                      this.tipInfo.editSucTip,
                      this.tipType.success
                    );
                    this.getData();
                  });
                  // }
                  // 保存变编辑
                  this.isSaveBtn = false;
                  // input变成span
                  this.tableForm.tableData[this.currentEditNum].isEdit = false;
                  // 保存变编辑
                  this.isSaveBtn = false;
                  // input变成span
                  this.tableForm.tableData[this.currentEditNum].isEdit = false;
                } else {
                  this.openTipBox(this.tipInfo.idErrTip, this.tipType.warn);
                }
              });
            } else {
              this.openTipBox("项目编号不能为空", this.tipType.warn);
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        // 编辑
        if (this.selectedData.length !== 1) {
          this.openTipBox(this.tipInfo.editTip, this.tipType.warn);
        } else {
          this.tableForm.tableData[this.currentEditNum].isEdit = true;
          // 编辑变保存
          this.isSaveBtn = true;
        }
      }
    },

    /**
     * 取消编辑
     */
    cancelEdit() {
      for (var i in this.tableForm.tableData[this.currentEditNum]) {
        if (i !== "id" && i !== "isEdit") {
          if (
            this.selectedData[0][i] !==
            this.tableForm.tableData[this.currentEditNum][i]
          ) {
            this.tableForm.tableData[this.currentEditNum][
              i
            ] = this.selectedData[0][i];
          }
        }
      }
      this.clearValidate("tableForm");
      // 显示取消编辑
      this.isSaveBtn = false;
      // input变成span
      this.tableForm.tableData[this.currentEditNum].isEdit = false;
    },
    /**
     * 批量删除
     */
    bookDelete() {
      let ids = [];
      // 删除
      if (this.selectedData.length == 0) {
        this.openTipBox(this.tipInfo.deleteTip, this.tipType.warn);
      } else {
        this.selectedData.forEach((item) => {
          ids.push(item.id);
          getDefaultDueBookDeleteDefault(ids).then((res) => {
            if (res.code == "000000") {
              this.openTipBox(this.tipInfo.delSucTip, this.tipType.success);
              this.getData();
            } else {
              this.openTipBox(this.tipInfo.delErrTip, this.tipType.error);
            }
          });
        });
      }
    },

    /**
       * 选中某一行数据
       @params val 当前选中的数据
       */
    logSelectionChange(val) {
      this.logSelectArr = val;
      this.logTableDel = [];
      if (this.logSelectArr.length != 0) {
        this.logSelectArr.forEach((item) => {
          this.logTableDel.push(item.id);
        });
      }
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
    Import() {
      this.dialogVisible = true;

      this.$nextTick(() => {
        this.$refs.upload.clearFiles();
      });
    },

    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    //上传文件
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    //上传成功
    upSuccess() {
      this.fileRes = this.fileList[0].response.data;
      if (this.fileRes.length > 0) {
        this.errorData = true;
      } else {
        this.openTipBox("数据导入成功", this.tipType.success);
      }
      this.$nextTick(() => {
        this.$refs.upload.clearFiles();
      });
      this.dialogVisible = false;
      this.getData();
    },
    //上传中
    upLoading() {
      console.log("上传中");
    },
    //上传失败
    upError() {
      console.log("上传失败");
    },

    //重置搜索条件
    reset() {
      this.input = {
        productNum: "",
        underbondFullname: "",
        underbondShortname: "",
        bondNum: "",
        violateDefult: "",
        tranferorNature: "",
        successBidderNature: "",
        dynamicQuoteDate: [],
        settlementDate: [],
        settlementType: "",
      };
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum = 1;
      this.isSaveBtn = false;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.isSaveBtn = false;
      this.getData();
    },

    //tab 切换
    handleClick(tab, event) {
      this.bookLogData();
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
  /deep/.el-dialog__body {
    padding: 20px;
    justify-content: center;
    border-bottom: solid 1px #e8eaec;
    overflow: auto;
  }
  .textInfo {
    padding-left: 10px;
    margin: 15px 0;
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
    .el-button {
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
  .import {
    /deep/.el-dialog__body {
      display: flex;
      padding: 20px;
    }
    .el-button {
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .el-icon-upload2 {
      text-indent: 15px;
    }
    .el-upload__tip {
      margin-top: 15px;
    }
    .download {
      float: left;
      line-height: 34px;
      margin-left: 34px;
      font-weight: 700;
      color: blue;
      text-decoration: underline;
      cursor: pointer;
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

    .el-col {
      /deep/.el-form-item {
        width: 100% !important;
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
    justify-content: baseline;
    align-items: baseline;
    width: 300px;
    span {
      width: 100px;
      line-height: 36px;
    }
    .upload-demo {
      width: 150px;
    }
  }
  /deep/ .el-form-item__error {
    position: static;
    text-align: right;
    font-size: 11px;
  }
  /deep/ .el-form-item__content {
    margin: 0 !important;
  }
  /deep/ .el-form-item {
    margin: 0 !important;
  }
}
</style>
<style lang="scss">
.el-scrollbar .el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
</style>
