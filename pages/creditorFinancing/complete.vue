<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">信息完善</span>
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
      <el-row class="topCentent">
        <el-col :span="6">
          <label class="search-label">开始时间：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.timingTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <label class="search-label">结束时间：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.timingEndTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <label class="search-label">信息类型：</label>
          <el-select v-model="input.value" placeholder="请选择" clearable >
            <el-option
              v-for="item in input.options"
              :key="item.value"
              :label="item.name"
              :value="item.pcode"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <el-col :span="5"></el-col>
        <el-col :span="9"></el-col>
        <el-col :span="5" class="btns"></el-col>
        <el-col :span="5">
          <el-button type="primary" @click="search">
            <span>查询</span>
          </el-button>
          <el-button plain @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <el-col :span="5">
          <el-button type="primary" @click="addComplete">
            <span>新增</span>
          </el-button>
          <el-button type="primary" @click="editData">
            <span>编辑</span>
          </el-button>
          <el-button type="primary" @click="bookDelete">删除</el-button>
        </el-col>
        <el-col :span="5"></el-col>
        <el-col :span="9"></el-col>
        <el-col :span="5" class="btns"></el-col>
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
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="rowId"
            width="70"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column
            prop="reptStartTime"
            label="开始时间"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="reptEndTime"
            label="结束时间"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="infoType"
            label="信息类型"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="infoContent"
            label="信息内容"
            align="center"
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
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="checkForm"
        :model="checkForm"
        :rules="checkFormRules"
        label-width="120px"
        size="mini"
      >
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item label="开始日期：">
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="checkForm.timingTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item label="信息类型：">
              <el-select
                v-model="checkForm.value"
                :disabled="true"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in checkForm.options"
                  :key="item.value"
                  :label="item.bondAbbreviation"
                  :value="item.bondClassId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item v-if="type == 1" label="信息内容：" prop="textarea">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="checkForm.textarea"
              ></el-input>
            </el-form-item>
            <el-form-item v-else label="信息内容：" prop="textarea">
              <el-input
                placeholder="请输入内容"
                v-model="checkForm.textarea"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveData('checkForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="40%">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
        label-width="120px"
        size="mini"
      >
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item label="开始日期：" prop="timingTime">
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="addForm.timingTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item label="信息类型：" prop="value">
              <el-select
                v-model="addForm.value"
                placeholder="请选择"
                clearable
                @change="infoType"
              >
                <el-option
                  v-for="item in addForm.options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.pcode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item v-if="type == 1" label="信息内容：" prop="textarea">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="addForm.textarea"
              ></el-input>
            </el-form-item>
            <el-form-item v-else label="信息内容：" prop="textarea">
              <el-input
                placeholder="请输入内容"
                v-model="addForm.textarea"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('addForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getWkbWcMinQueryList,
  getSWkbWcMinMessageType,
  getWkbWcMinDelVx,
  getWkbWcMinAddVx,
  getWkbWcMinUpdateVx,
  getWkbWcMinGetWcMinById,
} from "../../library/api/api.public";
import axios from "../../library/api/axiosExport.js";
// import $http
// import TableOne from "../home/components/TableOne";
// import messageBox from "../home/components/messageBox.vue";
// import MenuRole from "../home/components/MenuRole.vue";
export default {
  components: {
    // TableOne,
    // messageBox,
    // MenuRole,
  },
  data() {
    var validDate = (rule, value, callback) => {
      if (value == null || value == "") {
        callback(new Error("请选择时间"));
      } else {
        callback();
      }
    };
    let validateLength = (rule, value, callback) => {
      if (this.type == "2") {
        if (!value) {
          callback();
        } else if (
          this.addForm.value == "16" ||
          this.addForm.value == "18" ||
          this.addForm.value == "13"
        ) {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("输入正确的数字"));
          }
        } else {
          var reg = /^[1-9]+[0-9]*$/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("输入正确的数字"));
          }
        }
      } else {
        if (value == null || value == "") {
          callback(new Error("内容不能为空"));
        } else {
          callback();
        }
      }
    };
    let validateLengths = (rule, value, callback) => {
      if (this.type == "2") {
        if (!value) {
          callback();
        } else if (
          this.checkForm.value == "到期违约债金额（亿）（月）" ||
          this.checkForm.value == "到期违约债金额（亿）（周）" ||
          this.checkForm.value == "新增定向投资人材料份数（周）"
        ) {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("输入正确的数字"));
          }
        } else {
          var reg = /^[1-9]+[0-9]*$/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("输入正确的数字"));
          }
        }
      } else {
        if (value == null || value == "") {
          callback(new Error("内容不能为空"));
        } else {
          callback();
        }
      }
    };
    return {
      loading: false,
      dialogVisible: false,
      addVisible: false,
      // from数据
      input: {
        timingTime: [],
        timingEndTime: [],
        textarea: "",
        options: [],
        value: "",
      },
      checkForm: {
        timingTime: [],
        textarea: "",
        options: [],
        value: "",
      },
      checkFormRules: {
        textarea: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "change",
          },
          { validator: validateLengths, trigger: "change" },
        ],
      },
      addForm: {
        timingTime: "",
        textarea: "",
        options: [],
        value: "",
      },
      addFormRules: {
        value: [
          {
            required: true,
            message: "请选择内容",
            trigger: ["change", "blur"],
          },
        ],
        textarea: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
          { validator: validateLength, trigger: ["change", "blur"] },
        ],
        timingTime: [
          {
            required: true,
            validator: validDate,
            trigger: "blur",
          },
        ],
      },
      value: "",
      options: "",
      tableData: [],

      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      // 定义变量存储点击数据
      timeValue: "",

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
        addTip: "新增成功",
        addErrTip: "新增失败",
        delSucTip: "删除成功",
        delErrTip: "删除失败",
      },
      type: "",
      // 表格选中行数组
      multipleSelection: [],
      currentEditNum: -1,
      defaultDate: new Date(),
    };
  },
  // 获取初始数据
  created() {
    if (this.$route.query.type == "" || this.$route.query.type == undefined) {
      this.type = "1";
    } else {
      this.type = this.$route.query.type;
    }
    console.log(this.type);
    this.getData();
    this.getSelect();
    this.convertTime();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let reptSsTime = "";
      let reptSeTime = "";
      let reptEsTime = "";
      let reptEeTime = "";
      if (this.input.timingTime == "" || this.input.timingTime == null) {
        reptSsTime = "";
        reptSeTime = "";
      } else {
        reptSsTime = this.input.timingTime[0];
        reptSeTime = this.input.timingTime[1];
      }
      if (this.input.timingEndTime == "" || this.input.timingEndTime == null) {
        reptEsTime = "";
        reptEeTime = "";
      } else {
        reptEsTime = this.input.timingEndTime[0];
        reptEeTime = this.input.timingEndTime[1];
      }
      let params = {
        reptSsTime: reptSsTime,
        reptSeTime: reptSeTime,
        reptEsTime: reptEsTime,
        reptEeTime: reptEeTime,
        infoType: this.input.value,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        type: this.type,
      };
      getWkbWcMinQueryList(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      });
    },
    /**
     * 初始化 Select
     */
    getSelect() {
      let params = { type: this.type };
      getSWkbWcMinMessageType(params).then((res) => {
        console.log(res);
        this.input.options = res.data;
        this.addForm.options = res.data;
      });
    },
    //限制输入特殊字符
    btKeyUp(e) {
      this.checkForm.textarea = this.checkForm.textarea.replace(/[^\.\d]/g, "");
      this.checkForm.textarea = this.checkForm.textarea.replace(".", "");
    },
    /**
       * 选中某一行数据
       @params val 当前选中的数据
       */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.currentEditNum = this.tableData.indexOf(val[0]);
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    addComplete() {
      this.addVisible = true;
      this.$nextTick(() => {
        this.resetForm("addForm");
        this.clearValidate("addForm");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 新增表格行
     */
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            reptStartTime: this.addForm.timingTime[0],
            reptEndTime: this.addForm.timingTime[1],
            infoType: this.addForm.value,
            infoContent: this.addForm.textarea,
          };
          getWkbWcMinAddVx(params).then((res) => {
            console.log(res);
            if (res.code == "000000") {
              if (res.data == "-1") {
                this.openTipBox("数据已存在", this.tipType.error);
              } else {
                this.openTipBox(this.tipInfo.addTip, this.tipType.success);
                this.getData();
              }
            } else {
              this.openTipBox(this.tipInfo.addErrTip, this.tipType.error);
            }
          });
          this.addVisible = false;
          this.resetForm("addForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    infoType() {
      console.log("11");
      this.clearValidate("addForm");
    },
    /**
     * 编辑表格行
     */
    editData() {
      if (this.multipleSelection.length !== 1) {
        this.openTipBox(this.tipInfo.editTip, this.tipType.warn);
      } else {
        console.log(this.tableData[this.currentEditNum]);
        let arr = [];
        arr.push(this.tableData[this.currentEditNum].reptStartTime);
        arr.push(this.tableData[this.currentEditNum].reptEndTime);
        console.log(this.checkForm.timingTime);
        this.checkForm = {
          id: this.tableData[this.currentEditNum].id,
          textarea: this.tableData[this.currentEditNum].infoContent,
          options: [],
          value: this.tableData[this.currentEditNum].infoType,
          timingTime: arr,
        };
        console.log(this.checkForm.value);
        this.dialogVisible = true;
      }
    },

    /**
     * 保存编辑
     */
    saveData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id: this.checkForm.id,
            infoContent: this.checkForm.textarea,
          };
          getWkbWcMinUpdateVx(params).then((res) => {
            console.log(res);
            if (res.code == "000000") {
              this.openTipBox(this.tipInfo.editSucTip, this.tipType.success);
              this.getData();
            } else {
              this.openTipBox(this.tipInfo.editErrTip, this.tipType.error);
            }
          });
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    /**
     * 批量删除
     */
    bookDelete() {
      let ids = [];
      // 删除
      if (this.multipleSelection.length == 0) {
        this.openTipBox(this.tipInfo.deleteTip, this.tipType.warn);
      } else {
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
        let params = {
          ids,
        };
        getWkbWcMinDelVx(ids).then((res) => {
          console.log(params);
          if (res.code == "000000") {
            this.openTipBox(this.tipInfo.delSucTip, this.tipType.success);
            this.getData();
          } else {
            this.openTipBox(this.tipInfo.delErrTip, this.tipType.error);
          }
        });
      }
      console.log(ids);
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
      this.input.timingTime = [];
      this.input.timingEndTime = [];
      this.input.value = "";
      this.defaultDate = new Date();
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
      var d = new Date(this.timeValue);
      var yue =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      var re = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
      var youWant = d.getFullYear() + "-" + yue + "-" + re;
      this.timeValue = youWant;
    },
    //新增后重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    /deep/.el-dialog__body {
      padding: 20px;
      justify-content: center;
      border-bottom: solid 1px #e8eaec;
      overflow: auto;
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
          margin-left: 8%;
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
  button {
    margin-left: 8%;
    border-radius: 5px !important;
  }
}
</style>
<style lang="scss" >
.el-scrollbar .el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
</style>