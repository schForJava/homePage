<template>
  <div class="edit14">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">社会融资规模增量</span>
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
      <!--输入框 -->
      <el-row class="topCentent">
        <el-col :span="6">
          <label class="search-label" style="width:120px">统计月份：</label>
         <el-date-picker  v-model="input.stac_mon" type="month"  placeholder="选择月" clearable></el-date-picker>
        </el-col>
        <el-col :span="6">
          <label class="search-label" style="width:180px">社会融资规模增量：</label>
          <el-input placeholder="请输入社会融资规模增量" v-model="input.financing_amt_add" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">新增人民币贷款：</label>
          <el-input placeholder="请输入新增人民币贷款" v-model="input.rmb_loan_add " clearable></el-input>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <el-col :span="4" class="btns">
          <el-button size="mini" icon="el-icon-plus" @click="this.Addtable">新增</el-button>
          <el-button size="mini" icon="el-icon-search" @click="query">查询</el-button>
          <el-button size="mini" icon="el-icon-document-add" class="toLead" @click="handleClick3()">导入数据</el-button>

          <!-- <el-button size="mini" icon="el-icon-printer">批量打印通知书</el-button>
          <el-button size="mini" icon="el-icon-lollipop">批量生效</el-button>-->
        </el-col>
      </el-row>
      <el-dialog :visible.sync="menuRoleVisible" append-to-body title="导入数据">
        <menu-role v-if="menuRoleVisible" ref="menuRole"  @renewal="updateModal" @cencel="cencelModal"></menu-role>
      </el-dialog>
      <!--tab部分 -->
      <div class="tables">
        <table-one
          ref="table"
          :tableConfig="tableone.tableConfig"
          :tableData="tableone.tableData"
          :totalPage="tableone.totalPage"
          @getData="getDataCunt"
        ></table-one>
      </div>
    </div>
    <!-- 修改弹框部分 -->
    <el-dialog title="修改" :visible.sync="dialogVisible" width="56%">
      <!-- 内容部分 -->
      <el-row class="handelDial">
        <el-col :span="19" class="callHandelDial">
          <label class="search-label">社会融资规模增量：</label>
          <el-input placeholder="请输入社会融资规模增量" v-model="input.update_fact" clearable></el-input>
          <label class="search-label">新增人民币贷款：</label>
          <el-input placeholder="请输入新增人民币贷款" v-model="input.update_plan " clearable></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tzupdata" :loading="isLoding">{{text}}</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹框部分 -->
    <el-dialog title="新增" :visible.sync="Adddialog" width="36%">
      <!-- 内容部分 -->
      <el-row class="handelDial">
        <el-col :span="19" class="callHandelDial">
          <label class="search-label">统计月份：</label>
          <el-date-picker  v-model="input.inster_stac" type="month"  placeholder="选择月" clearable></el-date-picker>
        </el-col>
        <el-col :span="19" class="callHandelDial">
          <label class="search-label">社会融资规模增量：</label>
          <el-input placeholder="请输入社会融资规模增量" v-model="input.inster_fact" clearable></el-input>
        </el-col>
        <el-col :span="19" class="callHandelDial">
          <label class="search-label">新增人民币贷款：</label>
          <el-input placeholder="请输入新增人民币贷款" v-model="input.inster_plan" clearable></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Adddialog = false">取 消</el-button>
        <el-button type="primary" @click="add" :loading="isLoding">{{text}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDatas,
  getUpade,
  getquerybyStacdt
} from "../../library/api/api.charging";
// import $http
import TableOne from "../home/components/TableOne";
import messageBox from "../home/components/messageBox.vue";
import MenuRole from "./Importexcel/MenuRole-financing.vue";
export default {
  components: {
    TableOne,
    messageBox,
    MenuRole
  },
  data() {
    return {
      menuRoleVisible: false,
      dialogVisible: false,
      Adddialog: false,
      text: "确定",
      // from数据
      input: {
        stac_mon: "",          //查询统计月份（yyyy-mm-dd）
        financing_amt_add: "", //查询社会融资规模增量
        rmb_loan_add: "", //查询新增人民币贷款
        update_fact: "",      //修改社会融资规模增量
        update_plan: "",      //修改新增人民币贷款
        inster_fact: "",      //新增社会融资规模增量
        inster_plan: "" ,      //新增新增人民币贷款
        inster_stac:""
      },

      tableone: {
        tableConfig: [
          {
            type: "text",
            label: "统计月份",
            prop: "stac_mon",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "社会融资规模增量",
            prop: "financing_amt_add",
            width: "180px",
            sortable: true
          },
          {
            type: "text",
            label: "新增人民币贷款",
            prop: "rmb_loan_add",
            width: "440px",
            sortable: true
          },
          {
            type: "text",
            label: "加载时间戳",
            prop: "load_dttm",
            width: "240px",
            sortable: true
          },
          {
            type: "operate",
            label: "操作",
            width: "189px",
            btns: [
              {
                text: "修改",
                callback: this.handelbtns
              }
            ]
          }
        ],

        tableData: [],
        operateDetails: "",
        totalPage: 100
      },
      list: {
        curpage: "1",
        pageSize: "10"
      },
      // 定义变量存储点击数据
      currentData: {},
      isLoding: false
    };
  },
  // 获取初始数据
  created() {
    this.getData();
  },
  // 定义方法
  methods: {
    //初始化查询
    getData() {
      let subbegindate = "";
      if (this.input.stac_mon != null && this.input.stac_mon != "") {
        subbegindate = new Date(this.input.stac_mon);
        var subbeginYear =  subbegindate.getFullYear() //年
        var subbeginmonth = this.zeroFill(subbegindate.getMonth() + 1);//月
       var subbeginday = this.zeroFill(subbegindate.getDate());//日
        subbegindate = subbeginYear+"-"+subbeginmonth ;
      }
      let params = {
        reqAppId: "FINANCING0001",
        reqAppName: "社会融资规模增量",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          stac_mon: subbegindate + "",
          financing_amt_add: this.input.financing_amt_add + "",
          rmb_loan_add: this.input.rmb_loan_add + ""
        },
        // 使用变量ok
        Pagenum: this.list.curpage,
        Curpage: this.list.pageSize,
        msgId: "1",
        msgReqTime: "10"
      };
      getDatas(params).then(res => {
        
        if (res.msgRetCode == "000000" && res.body != null) {
          this.tableone.tableData = res.body;
          debugger;
          this.tableone.totalPage = parseInt(res.datesize);
          // console.log(this.tableone.tableData);
        } else {
          this.tableone.tableData = "";
          this.tableone.totalPage = 0;
          this.$message("暂无数据");
        }
      });
    },
    // 点击查询
    query() {
     let subbegindate = "";
      if (this.input.stac_mon != null && this.input.stac_mon != "") {
        subbegindate = new Date(this.input.stac_mon);
        var subbeginYear =  subbegindate.getFullYear() //年
        var subbeginmonth = this.zeroFill(subbegindate.getMonth() + 1);//月
       var subbeginday = this.zeroFill(subbegindate.getDate());//日
        subbegindate = subbeginYear+"-"+subbeginmonth ;
      }
      let params = {
        reqAppId: "FINANCING0001",
        reqAppName: "社会融资规模增量",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          stac_mon: subbegindate + "",
          financing_amt_add: this.input.financing_amt_add + "",
          rmb_loan_add: this.input.rmb_loan_add + ""
        },
        // 使用变量ok
        Pagenum: "1",
        Curpage: "10",
        msgId: "1",
        msgReqTime: "10"
       };
      //  console.log(params);
       getDatas(params).then(res => {
        // console.log(res);
        if (res.msgRetCode == "000000" && res.body != null) {
          this.tableone.tableData = res.body;
          this.tableone.totalPage = parseInt(res.datesize);
          // console.log(this.tableone.tableData);
        } else {
          this.tableone.tableData = "";
          this.tableone.totalPage = 0;
          this.$message("暂无数据");
        }
      });
    },
    // 点击修改，弹出框显示修改页面；
    handelbtns(data) {
        // 用户点击修改，将数据赋值给变量
      this.currentData = data;
      this.dialogVisible = true;
      this.input.update_fact = data.financing_amt_add;
      this.input.update_plan = data.rmb_loan_add;
    },
    // 点击新增，弹出框显示修改页面；
    Addtable() {
      this.reset();
      this.Adddialog = true;
    },
    //点击导入，弹出框显示导入页面；
    handleClick3() {
      this.menuRoleVisible = true;
    },
    /***************************************新增**************************************************/
    //新增社会融资规模增量
    add(data) {
        let subbegindate = "";
        this.text = "新增中";
        this.isLoding = true;
        var date = new Date();
        var Year =  date.getFullYear() //年
        var month = this.zeroFill(date.getMonth() + 1);//月
        var day = this.zeroFill(date.getDate());//日
        var hour = this.zeroFill(date.getHours());//时
        var minute = this.zeroFill(date.getMinutes());//分
        var second = this.zeroFill(date.getSeconds());//秒
        var Nowdate =Year +"-" +month +"-" + day +" " + hour +":" + minute +":" +minute;
        if (this.input.inster_stac != null && this.input.inster_stac != "") {
          subbegindate = new Date(this.input.inster_stac);
          var subbeginYear =  subbegindate.getFullYear() //年
          var subbeginmonth = this.zeroFill(subbegindate.getMonth() + 1);//月
          var subbeginday = this.zeroFill(subbegindate.getDate());//日
          subbegindate = subbeginYear+"-"+subbeginmonth;
          }
      let params = {
        reqAppId: "FINANCING0007", //查询重复sql语句
        reqAppName: "社会融资规模增量重复数据",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          stac_mon: subbegindate+""
        },
        msgId: "1",
        msgReqTime: "10"
      };
      getquerybyStacdt(params).then(res => {
        if (res > 0) {
          this.$confirm("该统计月份已存在, 是否执行更新操作?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning" 
          })
            .then(() => {
              let params = {
                reqAppId: "FINANCING0002", //更新sql语句
                reqAppName: "社会融资规模增量新增",
                reqUserCode: "",
                reqUserPwd: "",
                body: {
                  stac_mon: subbegindate+"",
                  financing_amt_add: this.input.inster_fact +"",
                  rmb_loan_add: this.input.inster_plan +"",
                  load_dttm: Nowdate+""
                },
                msgId: "1",
                msgReqTime: "10"
              };
              getUpade(params).then(res => {
                if (res.msgRetCode == "000000") {
                  this.text = "确定";
                  this.isLoding = false;
                  this.$message("更新成功");
                  this.getData();
                  this.Adddialog = false;
                  this.reset();
                } else {
                  this.text = "确定";
                  this.isLoding = false;
                  this.$message("更新失败！请联系管理员");
                  this.getData();
                }
              });
            })
            .catch(() => {
              this.text = "确定";
              this.isLoding = false;
         
            });
        } else {
          let params = {
            reqAppId: "FINANCING0003", //新增sql语句
            reqAppName: "社会融资规模增量新增",
            reqUserCode: "",
            reqUserPwd: "",
            body: {
              //我需要获取这两个数据
              stac_mon: subbegindate+"",
              financing_amt_add: this.input.inster_fact+"",
              rmb_loan_add: this.input.inster_plan+"",
              load_dttm: Nowdate+""
            },
            msgId: "1",
            msgReqTime: "10"
          };
          getUpade(params).then(res => {
            if (res.msgRetCode == "000000") {
              this.text = "确定";
              this.isLoding = false;
              this.$message("新增成功");
              this.getData();
             this.Adddialog = false;
              this.reset();
            } else {
              this.text = "确定";
              this.isLoding = false;
              this.$message("新增失败！请联系管理员");
              this.getData();
            }
          });
        }
      });
    },
    /*****************************************************************************************/
    //日期补零
    zeroFill(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
    },
    /***************************************修改**************************************************/
    //修改社会融资规模增量
    tzupdata(data) {
      debugger;
      this.text = "更新中";
      this.isLoding = true;
      var date = new Date();
      var Year =  date.getFullYear() //年
      var month = this.zeroFill(date.getMonth() + 1);//月
      var day = this.zeroFill(date.getDate());//日
      var hour = this.zeroFill(date.getHours());//时
      var minute = this.zeroFill(date.getMinutes());//分
      var second = this.zeroFill(date.getSeconds());//秒
      var Nowdate =Year +"-" +month +"-" + day +" " + hour +":" + minute +":" +minute;
      let params = {
        reqAppId: "FINANCING0002",
        reqAppName: "社会融资规模增量更新",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          //我需要获取这两个数据
          financing_amt_add: this.input.update_fact+"", 
          rmb_loan_add: this.input.update_plan+"", 
          stac_mon: this.currentData.stac_mon+"",
          load_dttm: Nowdate
        },
        msgId: "1",
        msgReqTime: "10"
      };
      getUpade(params).then(res => {
        if (res.msgRetCode == "000000") {
          this.text = "确定";
          this.isLoding = false;
          this.$message("更新成功");
          this.getData();
          this.dialogVisible = false;
        } else {
          this.text = "确定";
          this.isLoding = false;
          this.$message("更新失败！请联系管理员");
          this.getData();
        }
      });
    },
    /*****************************************************************************************/
    // 点击页码
    getDataCunt(data) {
      // console.log(data);
      //更改变量的值
      this.list.curpage = data.currentPage;
      this.list.pageSize = data.pageSize;
      // console.log(data.currentPage);
      // 再次加载
      this.getData();
      // console.log(data);
    },
    // 点击返回
    back() {
      // 返回上一个页面
      this.$router.back(-1);
    },
    // 重置
    reset() {
      // 重置数据
      this.input = {
        stac_mon: "",          //查询统计月份（yyyy-mm-dd）
        financing_amt_add: "", //查询社会融资规模增量
        rmb_loan_add: "", //查询新增人民币贷款
        update_fact: "",      //修改社会融资规模增量
        update_plan: "",      //修改新增人民币贷款
        inster_fact: "",      //新增社会融资规模增量
        inster_plan: "" ,      //新增新增人民币贷款
        inster_stac:""
      };
      // 重新渲染页面数据
    },
    cencelModal() {
      this.menuRoleVisible = false;
    },
    updateModal(){
       this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.edit14 {
  margin-top: -1px;
  padding: 20px;
  font-size: 12px;
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
      /deep/ .el-button.el-button--mini {
        border-radius: 8px;
      }
      .el-col {
        display: flex;
        width: 33.83333%;
        .search-label {
          width: 67%;
          line-height: 36px;
          text-align: right;
          color: #515a5e;
        }
        /deep/ .el-input__inner {
          padding-right: unset;
          width: 75%;
          height: 28px;
          font-size: 12px;
        }
      }
      .btns {
        display: flex;
        // justify-content: center;
        // margin-left: 10px;
        button {
          margin-left: 8%;
        }
      }
      .toLead {
        padding: 0;
      }
    }
    // 下半部分
    .bottomContent {
      margin-left: 780px;
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
  }
  // 弹框部分
  .handelDial {
    padding: 16px;
    .callHandelDial {
      padding-top: 10px;
      display: flex;
      align-items: center;
      .search-label {
        width: 86%;
        text-align: center;
      }
    }
  }
}
</style>