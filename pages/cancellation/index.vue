<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">取消或推迟原因</span>
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
      <el-row class="topCentent" style="margin-top: 30px">
        <label class="search-label">缴款截止日期：</label>
        <el-date-picker
          class="dateinterval"
          value-format="yyyy-MM-dd"
          v-model="input.disSureTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-value="defaultDate"
        ></el-date-picker>
        <el-col :span="3">
          <div class="btns">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button plain @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 下半部分 -->

      <!--tab部分 -->
      <div class="tables">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="序号" prop="id" align="center" width="70px">
            <!-- <template slot-scope="scope">{{scope.$index+1}}</template> -->
          </el-table-column>
          <el-table-column
            prop="bondShortName"
            label="债券简称"
            header-align="center"
            align="center"
            width="300px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="bondFullnamePublisher"
            label="债券全称"
            align="center"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="bondFullName"
            label="发行人全称"
            align="center"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="bookManagerName"
            label="簿记管理人"
            align="center"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="consignPayEndDate"
            label="缴款截止日期"
            width="300px"
            align="center"
            header-align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="bondType"
            label="债券类型"
            align="center"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="qiXian"
            label="债券期限"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="pubCreditrate"
            label="主体评级"
            header-align="center"
            align="center"
            width="300px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="planPublishAmount"
            label="发行额（亿元）"
            header-align="center"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="canlRsn"
            label="取消或推迟原因"
            align="center"
            width="200px"
          ></el-table-column>
          <el-table-column align="center" width="150px" label="操作">
            <template slot-scope="scope">
              <span class="edit" @click="handleClick(scope.row)">修改</span>
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
    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-body">
        <span class="demonstration">取消或推迟原因 :</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upDate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCancelCancelQuery,
  getCancelCancelUpdate,
} from "../../library/api/api.public";
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
        disSureTime: [],
      },
      tableData: [],
      bondId: "",
      value: "",
      options: [
        {
          value: "利率区间内没有募满",
          label: "利率区间内没有募满",
        },
        {
          value: "发行人对利率不满意",
          label: "发行人对利率不满意",
        },
        {
          value: "回拨自动终止",
          label: "回拨自动终止",
        },
        {
          value: "市场波动较大",
          label: "市场波动较大",
        },
        {
          value: "其他",
          label: "其他",
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
    // this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let chooseStartDate = "";
      let chooseEndDate = "";
      if (this.input.disSureTime == "" || this.input.disSureTime == null) {
        chooseStartDate = "";
        chooseEndDate = "";
      } else {
        chooseStartDate = this.input.disSureTime[0];
        chooseEndDate = this.input.disSureTime[1];
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        chooseStartDate: chooseStartDate,
        chooseEndDate: chooseEndDate,
      };
      getCancelCancelQuery(params).then((res) => {
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
      this.input = {
        disSureTime: "",
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

    handleClick(row) {
      this.bondId = row.bondId;
      this.value = row.canlRsn;
      this.dialogVisible = true;
    },
    upDate() {
      let params = {
        bondId: this.bondId,
        canlRsn: this.value,
      };
      getCancelCancelUpdate(params).then((res) => {
        console.log(res);
        this.getData();
        this.dialogVisible = false;
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
  .search-label {
    line-height: 36px;
    text-align: right;
    color: #515a5e;
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
      width: 180px;
      line-height: 36px;
    }
  }
  button {
    border-radius: 5px !important;
  }
  .el-button--small {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  .edit {
    color: blue;
    cursor: pointer;
  }
}
</style>
