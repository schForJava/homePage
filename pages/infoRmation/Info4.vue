<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1"
            >当日披露发行文件及申请取消发行债券基本信息列表（日终）</span
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
      <el-row class="topCentent">
        <el-col :span="6">
          <label class="search-label">债券全称：</label>
          <el-input
            placeholder="请输入"
            v-model="input.bondName"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">发行人：</label>
          <el-input
            placeholder="请输入"
            v-model="input.issuerName"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">主承销商：</label>
          <el-input
            placeholder="请输入"
            v-model="input.leadId"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">发行状态：</label>
          <el-select v-model="valueOne" placeholder="请选择" clearable >
            <el-option
              v-for="item in optionOne"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!--输入框4 -->
      <!--输入框1 -->
      <el-row class="topCentent" style="margin-top: 30px">
        <el-col :span="6">
          <label class="search-label">发行方式：</label>
          <el-select v-model="valueTwo" placeholder="请选择" clearable >
            <el-option
              v-for="item in optionTwo"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="search-label">披露时间：</label>
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
        </el-col>
        <el-col :span="6">
          <label class="search-label">审核时间：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.submitTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <label class="search-label">发行起始日：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.issueDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="defaultDate"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="topCentent" style="margin-top: 30px">
        <el-col :span="6">
          <label class="search-label">缴款日：</label>
          <el-date-picker
            class="dateinterval"
            value-format="yyyy-MM-dd"
            v-model="input.paymentDate"
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
          <el-button type="primary" @click="dialogVisible = true"
            >导出</el-button
          >
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
        <el-table
          v-loading="loading"
          element-loading-text="正在导出"
          :data="tableData"
          style="width: 100%"
          border
        >
          <el-table-column label="序号" prop="id" align="center" width="70px">
            <!-- <template slot-scope="scope">{{scope.$index+1}}</template> -->
          </el-table-column>
          <el-table-column
            prop="disSureTime"
            width="200px"
            label="披露日期"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="issueStatus"
            width="120px"
            label="发行状态"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dcmOrPpn"
            width="120px"
            label="发行方式"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="bondName"
            width="300px"
            header-align="center"
            label="债券全称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="issuerName"
            width="300px"
            header-align="center"
            label="发行人"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="leadId"
            width="200px"
            label="主承销商"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="jointLeadId"
            width="300px"
            label="联席主承销商"
            header-align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="bondType"
            width="120px"
            label="品种"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="issueFaceValue"
            width="200px"
            align="center"
            label="计划发行金额（万元）"
          ></el-table-column>
          <el-table-column
            prop="issueDate"
            width="120px"
            align="center"
            label="发行起始日"
          ></el-table-column>
          <el-table-column
            prop="issueDateEnd"
            width="120px"
            align="center"
            label="发行截止日"
          ></el-table-column>
          <el-table-column
            prop="paymentDate"
            width="120px"
            align="center"
            label="缴款日"
          ></el-table-column>
          <el-table-column
            prop="term"
            width="120px"
            label="期限"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isIncludeRight"
            width="120px"
            align="center"
            label="是否含权"
          ></el-table-column>
          <el-table-column
            prop="contactName"
            width="120px"
            align="center"
            label="联系人"
          ></el-table-column>
          <el-table-column
            prop="contactTel"
            width="120px"
            label="座机"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="contactMobile"
            width="120px"
            label="手机"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="contactEmail"
            width="300px"
            label="邮箱"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="submitTime"
            width="120px"
            label="审核时间"
            align="center"
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
  import {getInfo4, getSysDate} from "../../library/api/api.public";
import { downloadUrl } from "../../library/api/axiosExport";

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
        bondName: "",
        issuerName: "",
        leadId: "",
        issueDate: "",
        submitTime: [],
        disSureTime: [],
        paymentDate: "",
      },
      tableData: [],
      valueOne: "",
      valueTwo: "",
      optionOne: [
        {
          value: "发行",
          name: "发行",
        },
        {
          value: "取消发行",
          name: "取消发行",
        },
      ],
      optionTwo: [
        {
          value: "公募",
          name: "公募",
        },
        {
          value: "私募",
          name: "私募",
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
      let issueStart = "";
      let issueEnd = "";
      let auditStart = "";
      let auditEnd = "";
      let disSureStart = "";
      let disSureEnd = "";
      let paymentStart = "";
      let paymentEnd = "";
      if (this.input.issueDate == "" || this.input.issueDate == null) {
        issueStart = "";
        issueEnd = "";
      } else {
        issueStart = this.input.issueDate[0];
        issueEnd = this.input.issueDate[1];
      }
      if (this.input.submitTime == "" || this.input.submitTime == null) {
        auditStart = "";
        auditEnd = "";
      } else {
        auditStart = this.input.submitTime[0];
        auditEnd = this.input.submitTime[1];
      }
      if (this.input.disSureTime == "" || this.input.disSureTime == null) {
        disSureStart = "";
        disSureEnd = "";
      } else {
        disSureStart = this.input.disSureTime[0];
        disSureEnd = this.input.disSureTime[1];
      }
      if (this.input.paymentDate == "" || this.input.paymentDate == null) {
        paymentStart = "";
        paymentEnd = "";
      } else {
        paymentStart = this.input.paymentDate[0];
        paymentEnd = this.input.paymentDate[1];
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        bondName: this.input.bondName,
        issuerName: this.input.issuerName,
        leadId: this.input.leadId,
        issueStatus: this.valueOne,
        dcmOrPpn: this.valueTwo,
        issueStart: issueStart,
        issueEnd: issueEnd,
        auditStart: auditStart,
        auditEnd: auditEnd,
        disSureStart: disSureStart,
        disSureEnd: disSureEnd,
        paymentStart: paymentStart,
        paymentEnd: paymentEnd,
      };
      getInfo4(params).then((res) => {
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
        bondName: "",
        issuerName: "",
        leadId: "",
        issueDate: "",
        submitTime: [],
        disSureTime: [],
        paymentDate: "",
      };
      this.valueOne = "";
      this.valueTwo = "";
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
    /**
     * 导出功能
     */

    derive() {
      this.dialogVisible = false;
      let url =
        this.$api.IP +
        "/dayIssue/queryHisExportList?disSureTime=" +
        this.timeValue;
      let param = {

        selectTime: this.timeValue,

      }
      getSysDate(param).then((res) => {
        let code = res.data.code;
        if (code == 1) {
          downloadUrl(url);
        } else if (code == 0) {
          let hour = res.data.hour;
          let minute = res.data.minute;
          if (hour > 17) {
            downloadUrl(url);
          } else if(hour == 17 && minute>30){
            downloadUrl(url);
          }else {
            this.$confirm('日终未到规定时间，请勿使用导出功能，是否确认继续导出？', '确认信息', {
              distinguishCancelAndClose: false,
              confirmButtonText: '导出',
              cancelButtonText: '取消'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '导出数据'
              });
              downloadUrl(url);
            }).catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                        ? '导出已取消'
                        : '导出已取消'
              })
            });

          }
        }

      })
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
    margin-left: 8%;
    border-radius: 5px !important;
  }
}
</style>
