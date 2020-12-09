<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">集中披露带附件个数明细表（日终）</span>
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
          <label class="search-label">公告标题：</label>
          <el-input
            placeholder="请输入"
            v-model="input.noticeTitle"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <label
            class="search-label"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            "
            >公告类别（一级）：</label
          >
          <el-select
            v-model="valueOne"
            placeholder="请选择"
            clearable
            @change="selectChange"
          >
            <el-option
              v-for="item in optionOne"
              :key="item.value"
              :label="item.noticeName"
              :value="item.noticeTitleId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label
            class="search-label"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            "
            >公告类别（二级）：</label
          >
          <el-select v-model="valueTwo" placeholder="请选择" clearable >
            <el-option
              v-for="item in optionTwo"
              :key="item.value"
              :label="item.noticeName"
              :value="item.noticeTitleId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="search-label">发行人：</label>
          <el-input
            placeholder="请输入"
            v-model="input.issuerName"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <!--输入框4 -->
      <!--输入框1 -->
      <el-row class="topCentent" style="margin-top: 30px">
        <el-col :span="6">
          <label class="search-label">代理机构：</label>
          <el-input
            placeholder="请输入"
            v-model="input.agency"
            clearable
          ></el-input>
        </el-col>

        <el-col :span="6">
          <label class="search-label">披露日期：</label>
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
      <!--tab部分 -->
      <div class="tables">
        <el-table
          v-loading="loading"
          element-loading-text="正在导出"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column label="序号" prop="id" align="center" width="70px">
            <!-- <template slot-scope="scope">{{scope.$index+1}}</template> -->
          </el-table-column>
          <el-table-column
            prop="noticeTitle"
            header-align="center"
            align="left"
            width="300px"
            label="公告标题"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="noticeType1"
            width="150px"
            label="公告类别（一级）"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="noticeType2"
            width="150px"
            label="公告类别（二级）"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="fileCount"
            width="100px"
            label="附件个数"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="issuerName"
            width="300px"
            label="发行人"
            header-align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="submitTime"
            width="200px"
            label="审核时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isPandaBond"
            width="150px"
            label="熊猫债披露"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="timingDisTime"
            width="150px"
            label="定时披露"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="agency"
            width="200px"
            header-align="center"
            label="代理机构"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="disSureTime"
            width="200px"
            label="披露时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="bz"
            label="备注"
            width="150px"
            header-align="center"
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
  import {getInfo3, getInfoSelect, getSysDate} from "../../library/api/api.public";
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
        noticeTitle: "", //公告标题
        agency: "", //代理机构
        issuerName: "", //发行人
        submitTime: [], //审核时间
        disSureTime: [], //披露时间
      },
      valueOne: "",
      valueTwo: "",
      optionOne: "",
      optionTwo: "",
      tableData: [],
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      defaultDate: new Date(),
      timeValue: "",
    };
  },
  // 获取初始数据
  created() {
    this.infoSelect();
    this.convertTime();
    // this.getData();
  },
  // 定义方法
  methods: {
    /**
     * 列表渲染
     */
    getData() {
      let disSureStart = "";
      let disSureEnd = "";
      let auditStart = "";
      let auditEnd = "";
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
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        noticeTitle: this.input.noticeTitle,
        noticeType1: this.valueOne,
        noticeType2: this.valueTwo,
        issuerName: this.input.issuerName,
        agency: this.input.agency,
        consignee1Id: this.input.consignee1Id,
        disSureStart: disSureStart,
        disSureEnd: disSureEnd,
        auditStart: auditStart,
        auditEnd: auditEnd,
      };
      getInfo3(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      });
    },
    /**
     *  下拉框联动
     */
    infoSelect() {
      let params = {};
      getInfoSelect(params).then((res) => {
        console.log(res);
        this.optionOne = res.data;
      });
    },
    selectChange() {
      let params = { parentNoticeId: this.valueOne };
      getInfoSelect(params).then((res) => {
        console.log(res);
        this.valueTwo = "";
        this.optionTwo = res.data;
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
        noticeTitle: "", //公告标题
        agency: "", //代理机构
        issuerName: "", //发行人
        submitTime: [], //审核时间
        disSureTime: [], //披露时间
      };
      this.valueOne = "";
      this.valueTwo = "";
      this.defaultDate = new Date();
      this.convertTime();
    },
    /**
     * 导出功能
     */

    derive() {
      this.dialogVisible = false;
      let url =
        this.$api.IP +
        "/focusDis/queryExportList?disSureTime=" +
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
    //设置菜单权限
    handleClick3() {
      this.menuRoleVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum = 1;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.getData();
    },
    /**
     * 导出功能
     */

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
    border-radius: 5px !important;
  }
}
</style>
