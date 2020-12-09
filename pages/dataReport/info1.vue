<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1"
            >完成向清算所发送登记材料（发行成功）债券情况汇总表</span
          >
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
      <el-row class="topCentent" style="margin-top: 40px">
        <el-col :span="6">
          <label class="search-label">
            <i class="required">&nbsp;&nbsp;*&nbsp;&nbsp;</i>选择日期：
          </label>
          <el-date-picker
            v-model="input.time"
            value-format="yyyy-MM-dd"
            type="date"
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
      <div class="textInfo">
        <i class="el-icon-info"></i>
        发行额总计：{{ amtTotal }}亿元
      </div>

      <!--tab部分 -->
      <div class="tables">
        <el-table
          v-loading="loading"
          element-loading-text="正在导出"
          :data="tableData"
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
            prop="etprName"
            label="发行人/发起机构"
            align="center"
            width="300px"
          ></el-table-column>
          <el-table-column
            prop="bondShortName"
            label="债券简称"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="bookManagerName"
            label="簿记管理人"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="leadUbderwriterName"
            label="主承销商"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="coMain"
            label="联席主承销"
            align="center"
            width="300px"
          ></el-table-column>
          <el-table-column
            prop="bondType"
            label="债券品种"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="bondTerm"
            label="债券期限"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="pubCreditrate"
            label="主体评级"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="bondRate"
            label="发行利率（%)"
            align="center"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ Number(scope.row.bondRate).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="subMulty"
            label="申购倍数"
            align="center"
            width="100px"
          >
            <template slot-scope="scope">
              <span>{{ Number(scope.row.subMulty).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishDateB"
            label="发行起始日"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="factPubAmt"
            label="发行额（亿元）"
            align="center"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ Number(scope.row.factPubAmt).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="regNoticeNumber"
            label="注册通知书文号"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="consignPayEndDate"
            label="缴款日"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="memName"
            label="资产支持票据发行人"
            align="center"
            width="150px"
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
    <el-dialog title="导出" :visible.sync="dialogVisible" width="30%">
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
    </el-dialog>
  </div>
</template>

<script>
import { getDataGramQueryList } from "../../library/api/api.public";
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
      dialogVisible: false,
      // from数据
      input: {
        time: "",
      },
      tableData: [],
      amtTotal: "",
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

        delSucTip: "删除成功",
        delErrTip: "删除失败",
      },
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
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        consignPayEndDate: this.input.time,
      };
      getDataGramQueryList(params).then((res) => {
        this.tableData = res.data.yypRptBondInfos;
        this.totalCount = res.data.total;
        this.amtTotal = res.data.amtTotal;
      });
    },

    /**
     * 查询条件
     */
    search() {
      if (this.input.time == "" || this.input.time == null) {
        this.openTipBox("日期不能为空", this.tipType.error);
      } else {
        this.pageNum = 1;
        this.getData();
      }
    },
    /**
     * 搜索条件重置
     */
    reset() {
      this.input = {
        time: "",
      };
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
      this.input.time = new Date();
      var d = new Date(this.timeValue);
      var yue =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      var re = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
      var youWant = d.getFullYear() + "-" + yue + "-" + re;
      this.timeValue = youWant;
      this.input.time = youWant;
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
     * 导出功能
     */
    derive() {
      if (this.input.time == "" || this.input.time == null) {
        this.openTipBox("日期不能为空", this.tipType.error);
      } else {
        let url =
          this.$api.IP +
          "/dataGram/dgsExport?consignPayEndDate=" +
          this.input.time;
        downloadUrl(url);
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
  .required {
    color: red;
  }
}
</style>
