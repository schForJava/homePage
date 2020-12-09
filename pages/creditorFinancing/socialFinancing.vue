<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">社融数据</span>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <!-- 标题 -->
      <el-row class="titleContent">
        <el-col :span="24">
          <i class="el-icon-back" @click="back" style="corsor:pointer"></i>
          <div class="grid-content bg-purple-dark" @click="back" style="corsor:pointer">返回</div>
        </el-col>
      </el-row>
      <!--输入框1 -->
      <el-row class="topCentent">
        <el-col :span="6">
          <label class="search-label">月份：</label>
          <el-date-picker
            v-model="timeValue"
            type="month"
            placeholder="选择月份"
            value-format="yyyy-MM"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="1"></el-col>

        <el-col :span="12">
          <el-button type="primary" @click="search">
            <span>查询</span>
          </el-button>
          <el-button plain @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <el-col :span="5"></el-col>
        <el-col :span="9"></el-col>
        <el-col :span="5" class="btns"></el-col>
        <el-col :span="5"></el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <el-col :span="5">
          <el-button type="primary" @click="editData">
            <span>编辑</span>
          </el-button>
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
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="rowId" width="70" align="center" label="序号"></el-table-column>
          <el-table-column prop="socialMonth" label="月份" align="center"></el-table-column>
          <el-table-column prop="socialIncremenTsize" label="社会融资规模增量(亿元)" align="center"></el-table-column>
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
        label-width="200px"
        size="mini"
      >
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item label="月份：">
              <span>{{checkForm.socialMonth}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="topCentent">
          <el-col :span="18">
            <el-form-item label="社会融资规模增量：" prop="socialIncremenTsize">
              <el-input
                placeholder="请输入"
                @keyup.native="btKeyUp"
                v-model="checkForm.socialIncremenTsize"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveData('checkForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSociallist, getUpdatesocial } from "../../library/api/api.public";
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
    let validateLength = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        var reg = /^(([^0][0-9]+|0)\.([0-9]{1,15})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,9})$)|^(([1-9]+)$)/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("输入正确的数字"));
        }
      }
    };

    return {
      loading: false,
      dialogVisible: false,
      addVisible: false,
      checkForm: {
        socialId: "",
        nasocialMonthme: "",
        socialIncremenTsize: "",
      },
      checkFormRules: {
        socialIncremenTsize: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "change",
          },
          { validator: validateLength, trigger: "change" },
        ],
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],

      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      //时间日期
      timeValue: "",

      // 提示类型
      tipType: {
        warn: "warning",
        success: "success",
      },
      // 提示信息
      tipInfo: {
        editTip: "请选中一行数据进行编辑！",
        deleteTip: "请选中数据进行删除！",
        editsuccess: "编辑成功",
      },
      // 表格选中行数组
      multipleSelection: [],
      currentEditNum: -1,
      defaultDate: new Date(),
    };
  },
  // 获取初始数据
  created() {
    this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let params = {
        socialMonth: this.timeValue,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getSociallist(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      });
    },

    /**
       * 选中某一行数据
       @params val 当前选中的数据
       */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.currentEditNum = this.tableData.indexOf(val[0]);
    },
    /**
     * 新增表格行
     */
    addData() {
      this.addVisible = true;
    },
    /**
     * 编辑表格行
     */
    editData() {
      if (this.multipleSelection.length !== 1) {
        this.openTipBox(this.tipInfo.editTip, this.tipType.warn);
      } else {
        console.log(this.tableData[this.currentEditNum]);

        this.checkForm = {
          socialId: this.tableData[this.currentEditNum].socialId,
          socialMonth: this.tableData[this.currentEditNum].socialMonth,
          socialIncremenTsize: this.tableData[this.currentEditNum]
            .socialIncremenTsize,
        };
        this.dialogVisible = true;
      }
    },

    /**保存编辑 */
    saveData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            socialId: this.checkForm.socialId,
            socialMonth: this.checkForm.socialMonth,
            socialIncremenTsize: this.checkForm.socialIncremenTsize,
          };
          getUpdatesocial(params).then((res) => {
            console.log(res);
            if (res.code == "000000") {
              this.openTipBox(this.tipInfo.editsuccess, this.tipType.success);
              this.dialogVisible = false;
              this.getData();
            }
          });
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
      this.timeValue = "";
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
    channelInputLimit(e) {
      e.target.value = e.target.value.replace(
        /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,
        ""
      );
    },
    //限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
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
          width: 100%;
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
    border-radius: 5px !important;
  }
}
</style>