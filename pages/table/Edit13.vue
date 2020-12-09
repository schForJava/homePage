<template>
  <div class="edit13">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">债权融资计划发行规模</span>
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
          <label class="search-label" style="width:120px">统计日期：</label>
          <el-date-picker v-model="input.stac_dt" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-col>
        <el-col :span="6">
          <label class="search-label" style="width:180px">本日计划发行规模(亿元)：</label>
          <el-input placeholder="请输入本日计划发行规模" v-model="input.cbs_fact_pub_amt" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <label class="search-label">明日计划发行规模(亿元)：</label>
          <el-input placeholder="请输入明日计划发行规模" v-model="input.cbs_plan_pub_amt " clearable></el-input>
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
        <menu-role v-if="menuRoleVisible" ref="menuRole"  @renewal="updateModal"  @cencel="cencelModal"></menu-role>
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
        <el-col :span="22" class="callHandelDial">
          <label class="search-label">本日计划发行规模：</label>
          <el-input placeholder="请输入本日计划发行规模" v-model="input.update_fact" ><i slot="suffix" style="font-style:normal;margin-right: 10px;">亿元</i></el-input>
          <label class="search-label">明日计划发行规模：</label>
          <el-input placeholder="请输入明日计划发行规模" v-model="input.update_plan " ><i slot="suffix" style="font-style:normal;margin-right: 10px;">亿元</i></el-input>

        </el-col>
         <el-col :span="22" class="callHandelDial">
          <label class="search-label">上月发行规模：</label>
          <el-input placeholder="请输入上月发行规模" v-model="input.update_plan_last_mon " ><i slot="suffix" style="font-style:normal;margin-right: 10px;">亿元</i></el-input>
                    <label class="search-label">本月发行规模：</label>
          <el-input placeholder="请输入本月发行规模" v-model="input.update_plan_mon " ><i slot="suffix" style="font-style:normal;margin-right: 10px;">亿元</i></el-input>
          </el-col>
           <el-col :span="22" class="callHandelDial">  
                    <label class="search-label">本年累计发行规模：</label>
          <el-input placeholder="请输入本年累计发行规模" v-model="input.update_plan_year " ><i slot="suffix" style="font-style:normal;margin-right: 10px;">亿元</i></el-input>
                    <label class="search-label">同比变化情况：</label>
          <el-input placeholder="请输入同比变化情况" v-model="input.update_per_rate " ><i slot="suffix" style="font-style:normal;margin-right: 10px;">%</i></el-input>
             </el-col>
            <el-col :span="11" class="callHandelDial">
                    <label class="search-label">去年同比数据：</label>
          <el-input placeholder="请输入去年同比数据" v-model="input.update_plan_amtlast_year " ></el-input>
          
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
          <label class="search-label">统计日期：</label>
          <el-date-picker v-model="input.inster_stac" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-col>
        <el-col :span="19" class="callHandelDial">
          <label class="search-label">本日计划发行规模(亿元)：</label>
          <el-input placeholder="请输入本日计划发行规模" v-model="input.inster_fact" clearable></el-input>
        </el-col>
        <el-col :span="19" class="callHandelDial">
          <label class="search-label">明日计划发行规模(亿元)：</label>
          <el-input placeholder="请输入明日计划发行规模" v-model="input.inster_plan" clearable></el-input>
        </el-col>
            <el-col :span="19" class="callHandelDial">
          <label class="search-label">上月发行规模(亿元)：</label>
          <el-input placeholder="请输入上月发行规模" v-model="input.inster_plan_last_mon" clearable></el-input>
        </el-col>
            <el-col :span="19" class="callHandelDial">
          <label class="search-label">本月发行规模(亿元)：</label>
          <el-input placeholder="请输入本月发行规模" v-model="input.inster_plan_mon" clearable></el-input>
        </el-col>
            <el-col :span="19" class="callHandelDial">
          <label class="search-label">本年累计发行规模(亿元)：</label>
          <el-input placeholder="请输入本年累计发行规模" v-model="input.inster_plan_year" clearable></el-input>
        </el-col>
               <el-col :span="19" class="callHandelDial">
          <label class="search-label">同比变化情况(%)：</label>
          <el-input placeholder="请输入同比变化情况" v-model="input.inster_per_rate" clearable></el-input>
          <!-- <i slot="suffix" style="font-style:normal;margin-right: 10px;">%</i> -->
        </el-col>
            <el-col :span="19" class="callHandelDial">
          <label class="search-label">去年同比数据：</label>
          <el-input placeholder="请输入同比变化情况" v-model="input.inster_plan_amtlast_year" clearable></el-input>
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
import MenuRole from "./Importexcel/MenuRole-cbs.vue";
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
        stac_dt: "",          //查询统计日期（yyyy-mm-dd）
        cbs_fact_pub_amt: "", //查询本日计划发行规模(亿元)
        cbs_plan_pub_amt: "", //查询明日计划发行规模(亿元)
        update_fact: "",      //修改本日计划发行规模(亿元)
        update_plan: "",      //修改明日计划发行规模(亿元)

        update_plan_last_mon: "",      //上月发行规模(亿元)
        update_plan_mon: "" ,      //本月发行规模(亿元)
        update_plan_year:"",        //本年累计发行规模(亿元)
        update_per_rate: "" ,      //同比变化情况
        update_plan_amtlast_year:"",  // 去年同比数据

        inster_fact: "",      //新增实际发行规模(亿元)
        inster_plan: "" ,      //新增明日计划发行规模(亿元)
        inster_stac:"",

        inster_plan_last_mon: "",      //上月发行规模(亿元)
        inster_plan_mon: "" ,      //本月发行规模(亿元)
        inster_plan_year:"",        //本年累计发行规模(亿元)
        inster_per_rate: "" ,      //同比变化情况
        inster_plan_amtlast_year:""  // 去年同比数据
      },

      tableone: {
        tableConfig: [
          {
            type: "text",
            label: "统计日期",
            prop: "stac_dt",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "本日计划发行规模(亿元)",
            prop: "cbs_fact_pub_amt",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "明日计划发行规模(亿元)",
            prop: "cbs_plan_pub_amt",
            width: "440px",
            sortable: true
          }, {
            type: "text",
            label: "上月发行规模(亿元)",
            prop: "cbs_fact_pub_amt_last_mon",
            width: "440px",
            sortable: true
          },
          {
            type: "text",
            label: "本月发行规模(亿元)",
            prop: "cbs_fact_pub_amt_mon",
            width: "440px",
            sortable: true
          },{
            type: "text",
            label: "本年累计发行规模(亿元)",
            prop: "cbs_fact_pub_amt_year",
            width: "440px",
            sortable: true
          },
          {
            type: "text",
            label: "同比变化情况(%)",
            prop: "same_per_rate",
            width: "240px",
            sortable: true
          }, {
            type: "text",
            label: "去年同比数据",
            prop: "cbs_fact_pub_amtlast_year",
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
          debugger;
      let subbegindate = "";
      if (this.input.stac_dt != null && this.input.stac_dt != "") {
        subbegindate = new Date(this.input.stac_dt);
        var subbeginYear =  subbegindate.getFullYear() //年
        var subbeginmonth = this.zeroFill(subbegindate.getMonth() + 1);//月
       var subbeginday = this.zeroFill(subbegindate.getDate());//日
        subbegindate = subbeginYear+"-"+subbeginmonth +"-"+subbeginday;
      }
      let params = {
        reqAppId: "CBSPUB0001",
        reqAppName: "债权融资计划发行规模查询",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          stac_dt: subbegindate+ "",
          cbs_fact_pub_amt: this.input.cbs_fact_pub_amt + "",
          cbs_plan_pub_amt: this.input.cbs_plan_pub_amt + ""
        },
        // 使用变量ok
        Pagenum: this.list.curpage,
        Curpage: this.list.pageSize,
        msgId: "1",
        msgReqTime: "10"
      };
      getDatas(params).then(res => {

        if (res.msgRetCode == "000000" && res.body != null) {
            var n = res.body;
          for(var i=0;i<n.length;i++){
            var rate = n[i].same_per_rate;
            if(rate != null && rate !="" && rate !=0){
            n[i].same_per_rate =  Math.round((rate *100)*1000)/1000;
           }
            n[i].cbs_fact_pub_amt = parseFloat(n[i].cbs_fact_pub_amt).toFixed(3);
            n[i].cbs_plan_pub_amt = parseFloat(n[i].cbs_plan_pub_amt).toFixed(3);
            n[i].cbs_fact_pub_amt_last_mon = parseFloat(n[i].cbs_fact_pub_amt_last_mon).toFixed(3);
            n[i].cbs_fact_pub_amt_mon = parseFloat(n[i].cbs_fact_pub_amt_mon).toFixed(3);
            n[i].cbs_fact_pub_amt_year = parseFloat(n[i].cbs_fact_pub_amt_year).toFixed(3);
            n[i].cbs_fact_pub_amtlast_year = parseFloat(n[i].cbs_fact_pub_amtlast_year).toFixed(3);
            n[i].same_per_rate = parseFloat(n[i].same_per_rate).toFixed(2);
          }
          this.tableone.tableData = res.body;
          this.tableone.totalPage = parseInt(res.datesize);
      
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
      if (this.input.stac_dt != null && this.input.stac_dt != "") {
        subbegindate = new Date(this.input.stac_dt);
        var subbeginYear =  subbegindate.getFullYear() //年
        var subbeginmonth = this.zeroFill(subbegindate.getMonth() + 1);//月
       var subbeginday = this.zeroFill(subbegindate.getDate());//日
        subbegindate = subbeginYear+"-"+subbeginmonth +"-"+subbeginday;
      }
      let params = {
        reqAppId: "CBSPUB0001",
        reqAppName: "债权融资计划发行规模查询",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          stac_dt: subbegindate + "",
          cbs_fact_pub_amt: this.input.cbs_fact_pub_amt + "",
          cbs_plan_pub_amt: this.input.cbs_plan_pub_amt + ""
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
            var n = res.body;
          for(var i=0;i<n.length;i++){
            var rate = n[i].same_per_rate;
            if(rate != null && rate !="" && rate !=0){
            n[i].same_per_rate = rate*100;
           }
            n[i].cbs_fact_pub_amt = parseFloat(n[i].cbs_fact_pub_amt).toFixed(3);
            n[i].cbs_plan_pub_amt = parseFloat(n[i].cbs_plan_pub_amt).toFixed(3);
            n[i].cbs_fact_pub_amt_last_mon = parseFloat(n[i].cbs_fact_pub_amt_last_mon).toFixed(3);
            n[i].cbs_fact_pub_amt_mon = parseFloat(n[i].cbs_fact_pub_amt_mon).toFixed(3);
            n[i].cbs_fact_pub_amt_year = parseFloat(n[i].cbs_fact_pub_amt_year).toFixed(3);
            n[i].cbs_fact_pub_amtlast_year = parseFloat(n[i].cbs_fact_pub_amtlast_year).toFixed(3);
            n[i].same_per_rate = parseFloat(n[i].same_per_rate).toFixed(2);
          }
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
      this.input.update_fact = data.cbs_fact_pub_amt;
      this.input.update_plan = data.cbs_plan_pub_amt;
      

      this.input.update_plan_last_mon = data.cbs_fact_pub_amt_last_mon;
      this.input.update_plan_mon = data.cbs_fact_pub_amt_mon;
      this.input.update_plan_year = data.cbs_fact_pub_amt_year;
      this.input.update_per_rate = data.same_per_rate;
       this.input.update_plan_amtlast_year =data.cbs_fact_pub_amtlast_year

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
    //新增债权融资计划发行规模
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
          subbegindate = subbeginYear+"-"+subbeginmonth +"-"+subbeginday;
          }
      let params = {
        reqAppId: "CBSPUB0007", //查询重复sql语句
        reqAppName: "债权融资计划发行规模查询重复数据",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          stac_dt: subbegindate+""
        },
        msgId: "1",
        msgReqTime: "10"
      };
      getquerybyStacdt(params).then(res => {
        if (res > 0) {
          this.$confirm("该统计日期已存在, 是否执行更新操作?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning" 
          })
            .then(() => {
              let params = {
                reqAppId: "CBSPUB0002", //更新sql语句
                reqAppName: "债权融资计划发行规模新增",
                reqUserCode: "",
                reqUserPwd: "",
                body: {
                  stac_dt: subbegindate+"",
                  cbs_fact_pub_amt: this.input.inster_fact +"",
                  cbs_plan_pub_amt: this.input.inster_plan +"",
                  cbs_fact_pub_amt_last_mon: this.input.inster_plan_last_mon +"",
                  cbs_fact_pub_amt_mon: this.input.inster_plan_mon +"",
                  cbs_fact_pub_amt_year: this.input.inster_plan_year +"",
                  same_per_rate: this.input.inster_per_rate +"",
                  cbs_fact_pub_amtlast_year: this.input.inster_plan_amtlast_year +"",
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
            reqAppId: "CBSPUB0003", //新增sql语句
            reqAppName: "债权融资计划发行规模新增",
            reqUserCode: "",
            reqUserPwd: "",
            body: {
              //我需要获取这两个数据
              stac_dt: subbegindate+"",
              cbs_fact_pub_amt: this.input.inster_fact+"",
              cbs_plan_pub_amt: this.input.inster_plan+"",
              cbs_fact_pub_amt_last_mon: this.input.inster_plan_last_mon +"",
              cbs_fact_pub_amt_mon: this.input.inster_plan_mon +"",
              cbs_fact_pub_amt_year: this.input.inster_plan_year +"",
              same_per_rate: this.input.inster_per_rate +"",
              cbs_fact_pub_amtlast_year: this.input.inster_plan_amtlast_year +"",
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
    //修改债权融资计划发行规模
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
        reqAppId: "CBSPUB0002",
        reqAppName: "债权融资计划发行规模更新",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          //我需要获取这两个数据
          cbs_fact_pub_amt: this.input.update_fact+"", 
          cbs_plan_pub_amt: this.input.update_plan+"", 

          cbs_fact_pub_amt_last_mon: this.input.update_plan_last_mon+"", 
          cbs_fact_pub_amt_mon: this.input.update_plan_mon+"", 
          cbs_fact_pub_amt_year: this.input.update_plan_year+"", 
          same_per_rate: this.input.update_per_rate+"", 
          cbs_fact_pub_amtlast_year: this.input.update_plan_amtlast_year+"", 
          stac_dt: this.currentData.stac_dt+"",
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
        stac_dt: "",          //查询统计日期（yyyy-mm-dd）
        cbs_fact_pub_amt: "", //查询本日计划发行规模(亿元)
        cbs_plan_pub_amt: "", //查询明日计划发行规模(亿元)
        update_fact: "",      //修改本日计划发行规模(亿元)
        update_plan: "",      //修改明日计划发行规模(亿元)
            update_plan_last_mon: "",      //上月发行规模(亿元)
        update_plan_mon: "" ,      //本月发行规模(亿元)
        update_plan_year:"",        //本年累计发行规模(亿元)
        update_per_rate: "" ,      //同比变化情况
        update_plan_amtlast_year:"",  // 去年同比数据
        inster_fact: "",      //新增本日计划发行规模(亿元)
        inster_plan: "" ,      //新增明日计划发行规模(亿元)
        inster_stac:"",  
        inster_plan_last_mon: "",      //上月发行规模(亿元)
        inster_plan_mon: "" ,      //本月发行规模(亿元)
        inster_plan_year:"",        //本年累计发行规模(亿元)
        inster_per_rate: "" ,      //同比变化情况
        inster_plan_amtlast_year:""  // 去年同比数据
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
.edit13 {
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