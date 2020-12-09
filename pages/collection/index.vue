<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">孔开及N+X系统数据采集</span>
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
        style="margin-top: 40px"
      >
        <el-tab-pane label="孔开-主承销商团成员名单" name="second">
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <label class="search-label">注册通知书文号：</label>
              <el-input
                placeholder="请输入"
                v-model="input.regNoticeNo"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">发行人名称：</label>
              <el-input
                placeholder="请输入"
                v-model="input.companyName"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">注册品种：</label>
              <el-select v-model="input.regPrdtType" placeholder="请选择" clearable >
                <el-option
                  v-for="(item, index) in input.regPrdtTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <div class="btns">
                <el-button type="primary" @click="search">查询</el-button>
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
            >
              <el-table-column
                prop="id"
                label="序号"
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="regNoticeNo"
                label="注册通知书文号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="companyName"
                label="发行人名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="regPrdtType"
                label="注册品种"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="操作"
                align="center"
                width="100"
              >
                <template slot-scope="scope">
                  <a
                    class="cz"
                    @click="
                      check(
                        scope.row.projTrackNo,
                        scope.row.instNo,
                        scope.row.sourceType
                      )
                    "
                    type="text"
                    size="small"
                    >查看</a
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
        </el-tab-pane>
        <el-tab-pane label="N+X-新增定向投资人名单" name="first">
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 40px">
            <el-col :span="6">
              <label class="search-label">注册通知书文号：</label>
              <el-input
                placeholder="请输入"
                v-model="Nxinput.batchNumber"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">发行人名称：</label>
              <el-input
                placeholder="请输入"
                v-model="Nxinput.issuerOrgFullName"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">选择日期：</label>
              <el-date-picker
                v-model="Nxinput.chooseTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width: 270px !important"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <div class="btns">
                <el-button type="primary" @click="NxSearch">查询</el-button>
                <el-button type="primary" @click="derive">导出</el-button>
                <el-button plain @click="Nxreset">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="NxtableData"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="id"
                label="编号"
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="issuerOrgFullName"
                label="发行人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="managerOrgName"
                label="主承销商/联席主承销商"
                align="center"
                width="300"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="bondType"
                label="债券品种"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="batchNumber"
                label="注册通知书文号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="years"
                label="年度/期数"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="orgFullName"
                label="新增投资人名称"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="gmtModify"
                label="变更时间"
                align="center"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pageNum1"
              :page-sizes="pageSizes1"
              :page-size="pageSize1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="NxtotalCount"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 查看弹窗 -->
    <el-dialog
      title="主承销商团成员名单"
      width="60%"
      :visible.sync="checkVisible"
    >
      <div class="content" style="width: 100%">
        <el-row class="topCentent lookWarp">
          <el-col :span="24">
            <label class="search-label">主承销商团成员 :</label>
            <el-input
              placeholder="请输入"
              v-model="entryName"
              clearable
            ></el-input>
            <el-button type="primary" @click="checkSearch">查询</el-button>
          </el-col>
        </el-row>
        <div class="tables">
          <el-table :data="checkTable" style="width: 100%" border>
            <el-table-column label="序号" align="center" width="70px">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column
              prop="entryName"
              label="主承销商团成员"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!--tab部分 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOpenHoleQueryList,
  getOpenHoleQueryName,
  getOpenHoleQueryNxList,
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
        regNoticeNo: "",
        companyName: "",
        regPrdtType: "",
        regPrdtTypeOptions: [
          {
            value: "DFI",
            label: "DFI",
          },

          {
            value: "TDFI",
            label: "TDFI",
          },
          {
            value: "PPN",
            label: "PPN",
          },
          {
            value: "PPN-PN",
            label: "PPN-PN",
          },
          {
            value: "PPN-PB",
            label: "PPN-PB",
          },
          {
            value: "PPN-PRN",
            label: "PPN-PRN",
          },
          {
            value: "PPkN-ABN",
            label: "PPN-ABN",
          },
          {
            value: "PPN-GN",
            label: "PPN-GN",
          },
        ],
      },
      tableData: [],
      NxtableData: [],
      Nxinput: {
        issuerOrgFullName: "",
        chooseTime: "",
        batchNumber: "",
      },
      checkTable: [],
      entryName: "",
      projTrackNo: "",
      instNo: "",
      sourceType: "",
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
      time: "",
      pageNum1: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      NxtotalCount: 0,
      // 个数选择器（可修改）
      pageSizes1: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize1: 5,
    };
  },
  created() {},
  // 获取初始数据
  mounted() {
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
        regNoticeNo: this.input.regNoticeNo,
        companyName: this.input.companyName,
        regPrdtType: this.input.regPrdtType,
      };
      getOpenHoleQueryList(params).then((res) => {
        console.log(res);
        this.tableData = res.data.queryList;
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
        regNoticeNo: "",
        companyName: "",
        regPrdtTypeOptions: [
          {
            value: "DFI",
            label: "DFI",
          },

          {
            value: "TDFI",
            label: "TDFI",
          },
          {
            value: "PPN",
            label: "PPN",
          },
          {
            value: "PPN-PN",
            label: "PPN-PN",
          },
          {
            value: "PPN-PB",
            label: "PPN-PB",
          },
          {
            value: "PPN-PRN",
            label: "PPN-PRN",
          },
          {
            value: "PPkN-ABN",
            label: "PPN-ABN",
          },
          {
            value: "PPN-GN",
            label: "PPN-GN",
          },
        ],
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

    /**
     * @params private String projTrackNo
     * @params private String instNo
     */
    check(projTrackNo, instNo, sourceType) {
      this.projTrackNo = projTrackNo;
      this.instNo = instNo;
      this.sourceType = sourceType;
      this.checkVisible = true;
      let params = {
        projTrackNo: this.projTrackNo,
        instNo: this.instNo,
        entryName: this.entryName,
        sourceType: this.sourceType,
      };
      getOpenHoleQueryName(params).then((res) => {
        console.log(res);
        this.checkTable = res.data;
      });
    },
    /**
     * 查看 搜索
     * @params private String entryName
     * @params private String projTrackNo
     * @params private String instNo
     */
    checkSearch() {
      let params = {
        projTrackNo: this.projTrackNo,
        instNo: this.instNo,
        entryName: this.entryName,
        sourceType: this.sourceType,
      };
      getOpenHoleQueryName(params).then((res) => {
        console.log(res);
        this.checkTable = res.data;
      });
    },

    /**
     * 列表渲染
     */
    getNXData() {
      let params = {
        pageSize: this.pageSize1,
        pageNum: this.pageNum1,
        chooseTime: this.Nxinput.chooseTime,
        batchNumber: this.Nxinput.batchNumber,
        issuerOrgFullName: this.Nxinput.issuerOrgFullName,
      };
      getOpenHoleQueryNxList(params).then((res) => {
        console.log(res);
        this.NxtableData = res.data.list;
        this.NxtotalCount = res.data.total;
      });
    },
    NxSearch() {
      this.pageNum1 = 1;
      this.getNXData();
    },
    Nxreset() {
      this.Nxinput = {
        issuerOrgFullName: "",
        chooseTime: "",
        batchNumber: "",
      };
    },
    /**
     * 导出功能
     */
    derive() {
      window.location.href =
        this.$api.IP +
        "/openHole/nxExportList?issuerOrgFullName=" +
        this.Nxinput.issuerOrgFullName +
        "&batchNumber=" +
        encodeURIComponent(this.Nxinput.batchNumber) +
        "&chooseTime=" +
        this.Nxinput.chooseTime;
    },
    //表格分页
    handleSizeChange1(val) {
      this.pageSize1 = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum1 = 1;
      this.getNXData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.pageNum1 = val;
      console.log(`当前页: ${val}`);
      this.getNXData();
    },
    /*handleClick(tab, event) {
      console.log(tab);
      if (tab.name == "first") {
        this.getNXData();
      }
    },*/
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
          width: 55%;
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
}
</style>
