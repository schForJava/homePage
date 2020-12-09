<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">台账导入</span>
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
        <el-col :span="5">
          <label class="search-label">债券代码：</label>
          <el-input placeholder="请输入债券代码" v-model="input.bond_code" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <label class="search-label">债券全称：</label>
          <el-input placeholder="请输入债券全称" v-model="input.bond_full_name" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <label class="search-label">债券简称：</label>
          <el-input placeholder="请输入债券简称" v-model="input.bond_short_name " clearable></el-input>
        </el-col>
        <el-col :span="4">
          <label class="search-label">债券品种：</label>
          <el-select v-model="input.bond_type" placeholder="请选择">
            <el-option
              v-for="item in options.bond_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!--输入框2-->
      <el-row class="topCentent">
        <el-col :span="5">
          <label class="search-label">发行人：</label>
          <el-input placeholder="请输入发行人" v-model="input.mem_name" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <label class="search-label">发行地点：</label>
          <el-select v-model="input.pub_place" placeholder="请选择">
            <el-option
              v-for="item in options.pub_place"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
     <el-col :span="5">
          <label class="search-label">注册通知书文号：</label>
          <el-input placeholder="请输入注册通知书文号" v-model="input.reg_notice_number" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <label class="search-label">债券处理状态：</label>
          <el-select v-model="input.status" placeholder="请选择">
            <el-option
              v-for="item in options.status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!--输入框3 -->
      <el-row class="topCentent">
        <el-col :span="5">
          <label class="search-label">取消债券是否中止：</label>
          <el-select v-model="input.is_cancel" placeholder="请选择">
            <el-option
              v-for="item in options.is_cancel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <label class="search-label">发行方式：</label>
          <el-select v-model="input.publish_model" placeholder="请选择">
            <el-option
              v-for="item in options.publish_model"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <label class="search-label">生效状态：</label>
          <el-select v-model="input.effect_status" placeholder="请选择">
            <el-option
              v-for="item in options.effect_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <label class="search-label">簿记管理人：</label>
          <el-input placeholder="请输入簿记管理人" v-model="input.book_manager_name" clearable></el-input>
        </el-col>
      </el-row>
      <!--输入框4 -->
           <!--输入框1 -->
      <el-row class="topCentent">
        <el-col :span="4" style=" width: 42%">
          <label class="search-label" style=" width: 23%">缴款日：</label>
          <el-date-picker
          class="dateinterval"
          v-model="input.consign_pay_date"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
           </el-date-picker>
        </el-col>
        <el-col :span="4" style=" width: 53%">
          <label class="search-label" style=" width: 33%">*发送到账确认书日期：</label>
          <el-date-picker 
          class="dateinterval"
          value-format="yyyy-MM-dd"
          v-model="input.acc_confirm_date" 
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <!-- 下半部分 -->
      <el-row class="bottomContent">
        <el-col :span="5" style="width:35%"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="9" class="btns">
          <el-button size="mini" icon="el-icon-document-add" class="toLead" @click="handleClick3()">台账导入</el-button>
          <el-button size="mini" icon="el-icon-download" @click="downQuery" :loading="isLoding">{{DownText}}</el-button>
          <el-button size="mini" icon="el-icon-search" @click="query">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="menuRoleVisible" append-to-body title="导入数据">
        <menu-role v-if="menuRoleVisible" ref="menuRole" @renewal="updateModal" @cencel="cencelModal"></menu-role>
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
    <el-dialog title="修改" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="reset" width="98%" >
      <!-- 内容部分 -->
      <el-scrollbar style="height:400px;">
      <el-row class="handelDial">
        <!-- <el-col :span="15" class="callHandelDial">
          <label class="search-label">发行地点：</label>
          <el-select v-model="input.issue" @change="handelInput">
            <el-option
              v-for="item in options.issue"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col> -->
        <!----------------------------------------------------->
        <el-col :span="24" class="callHandelDial">
           <label class="search-label">债券代码：</label>
          <el-input  v-model="input.bond_code" ></el-input> 
          <label class="search-label">债券全称：</label>
          <el-input  v-model="input.bond_full_name " ></el-input>
          <label class="search-label">债券简称：</label>
          <el-input  v-model="input.bond_short_name" ></el-input>
          <label class="search-label">发行起始日：</label>
          <el-date-picker v-model="input.publish_date_b" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
        </el-col>
        <el-col :span="24" class="callHandelDial">
          <label class="search-label">申购期限开始日期：</label>
          <el-date-picker v-model="input.sub_begin_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          <label class="search-label">申购期限开始时间：</label>
          <el-input  v-model="input.sub_begin_time " ></el-input>
          <label class="search-label">申购期限结束日期：</label>
          <el-date-picker v-model="input.sub_end_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          <label class="search-label">申购期限结束时间：</label>
          <el-input  v-model="input.sub_end_time " ></el-input>
        </el-col>
          <el-col :span="24" class="callHandelDial">
          <label class="search-label">定价配售发送上清所日期：</label>
          <el-date-picker v-model="input.send_cfets_date" type="date" value-format="yyyy-mm-dd" placeholder="选择日期" clearable></el-date-picker>
          <label class="search-label">*发送到账确认书日期：</label>
          <el-date-picker v-model="input.acc_confirm_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          <label class="search-label">缴款日：</label>
          <el-date-picker v-model="input.consign_pay_end_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          <label class="search-label">债权债务登记日：</label>
          <el-date-picker v-model="input.registr_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
        </el-col>
          <el-col :span="24" class="callHandelDial">
          <label class="search-label">发行人全称：</label>
          <el-input  v-model="input.mem_name" ></el-input>
          <label class="search-label">发行人托管账号：</label>
          <el-input  v-model="input.publisher_account " ></el-input>
          <label class="search-label">簿记管理人全称：</label>
          <el-input  v-model="input.book_manager_name " ></el-input>
          <label class="search-label">联席承销团成员：</label>
          <el-input  v-model="input.co_main " ></el-input>
        </el-col>
          <el-col :span="24" class="callHandelDial">
          <label class="search-label">债券品种：</label>
          <el-select v-model="input.bond_type" @change="handelInput">
          <el-option
              v-for="item in options.bond_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">债项评级：</label>
          <!-- <el-input  v-model="input.prdt_rating " ></el-input> -->
           <el-select v-model="input.prdt_rating" @change="handelInput">
          <el-option
              v-for="item in options.prdt_rating"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">债项评级2：</label>
          <!-- <el-input  v-model="input.prdt_rating2 " ></el-input> -->
          <el-select v-model="input.prdt_rating2" @change="handelInput">
          <el-option
              v-for="item in options.prdt_rating2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">发行人信用评级：</label>
          <!-- <el-input  v-model="input.pub_creditrate " ></el-input>  -->
          <el-select v-model="input.pub_creditrate" @change="handelInput">
          <el-option
              v-for="item in options.pub_creditrate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
          <el-col :span="24" class="callHandelDial">
          <label class="search-label">发行人信用评级2：</label>
          <!-- <el-input  v-model="input.pub_creditrate2" ></el-input> -->
          <el-select v-model="input.pub_creditrate2" @change="handelInput">
          <el-option
              v-for="item in options.pub_creditrate2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">申购类型：</label>
          <el-input  v-model="input.app_type " ></el-input>
          <label class="search-label">发行价格(元)：</label>
          <el-input  v-model="input.pub_price" ></el-input>
          <label class="search-label">票面利率(%)：</label>
          <el-input  v-model="input.bond_rate " ></el-input>
        </el-col>
        <el-col :span="24" class="callHandelDial">
          <label class="search-label">债券期限：</label>
          <el-input  v-model="input.bond_term " ></el-input>
          <label class="search-label">期限单位：</label>
           <!--<el-input  v-model="input.term_unit" ></el-input>-->
          <el-select v-model="input.term_unit" @change="handelInput">
            <el-option
              v-for="item in options.term_unit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
           </el-select>
          <label class="search-label">发行额(亿元)：</label>
          <el-input  v-model="input.fact_pub_amt " ></el-input>
          <label class="search-label">团成员或投资人数量：</label>
          <el-input  v-model="input.congisn_count " ></el-input>
        </el-col>
          <el-col :span="24" class="callHandelDial">
          <label class="search-label">合规申购家数：</label>
          <el-input  v-model="input.app_org_num " ></el-input>
          <label class="search-label">有效申购家数：</label>
          <el-input  v-model="input.vali_org_num" ></el-input>
          <label class="search-label">认购倍数：</label>
          <el-input  v-model="input.sub_multy " ></el-input>
          <label class="search-label">边际倍数：</label>
          <el-input  v-model="input.margin_multy " ></el-input>
        </el-col>
          <el-col :span="24" class="callHandelDial">
          <label class="search-label">发行节点：</label>
          <!-- <el-input  v-model="input.publish_flow_node " ></el-input> -->
          <el-select v-model="input.publish_flow_node" @change="handelInput">
          <el-option
              v-for="item in options.publish_flow_node"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">债券处理状态：</label>
          <!-- <el-input  v-model="input.status" ></el-input> -->
              <el-select v-model="input.status" @change="handelInput">
            <el-option
              v-for="item in options.status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">生效状态：</label>
          <!-- <el-input  v-model="input.effect_status " ></el-input> -->
              <el-select v-model="input.effect_status" @change="handelInput">
            <el-option
              v-for="item in options.effect_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
         <label class="search-label">发行方式：</label>
          <!-- <el-input  v-model="input.publish_model " ></el-input> -->
            <el-select v-model="input.publish_model" @change="handelInput">
            <el-option
              v-for="item in options.publish_model"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
          <el-col :span="24" class="callHandelDial">
             <label class="search-label">通知书文号：</label>
          <el-input  v-model="input.reg_notice_number " ></el-input>
          <label class="search-label">佣金费率：</label>
          <el-input  v-model="input.commission_rate" ></el-input>
          <label class="search-label">是否发行金额调整：</label>
          <!-- <el-input  v-model="input.is_upd_pub_amt " ></el-input> -->
              <el-select v-model="input.is_upd_pub_amt" @change="handelInput">
            <el-option
              v-for="item in options.is_upd_pub_amt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">到期日：</label>
          <el-date-picker v-model="input.maturity_date" type="date" placeholder="选择日期" clearable></el-date-picker>
         </el-col>
         <el-col :span="24" class="callHandelDial">
           <label class="search-label">发行地点：</label>
           <el-select v-model="input.pub_place" @change="handelInput">
            <el-option
              v-for="item in options.pub_place"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
          <label class="search-label">费率：</label>
          <el-input  v-model="input.fee_rate" ></el-input>
          <label class="search-label">打折前簿记建档费用(万元)：</label>
          <el-input  v-model="input.pre_book_fee " ></el-input>
          <label class="search-label">折扣率：</label>
          <el-input  v-model="input.discount_rate" ></el-input>
         </el-col>
        <el-col :span="24" class="callHandelDial">
          <label class="search-label">打折后簿记建档费用(万元)：</label>
          <el-input  v-model="input.current_book_fee " ></el-input>
          <label class="search-label">债券全称发行人：</label>
          <el-input  v-model="input.bond_fullname_publisher" ></el-input>
          <label class="search-label">债券全称与发行人核对：</label>
          <el-input  v-model="input.is_publisher_check " ></el-input>
          <label class="search-label">取消债券是否中止：</label>
          <el-input  v-model="input.is_cancel" ></el-input>
        </el-col>
          <el-col :span="6" class="callHandelDial">
          <label class="search-label">是否为湖北企业：</label>
           <el-select v-model="input.is_hubei" @change="handelInput">
            <el-option
              v-for="item in options.is_hubei"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
      <!----------------------------------------------------->

      </el-row>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tzcancel">取 消</el-button>
        <el-button type="primary" @click="tzupdata" :loading="isLoding">{{text}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDatas, getUpade, getdownQuery, getDelete } from "../../library/api/api.charging";
// import $http
import TableOne from "../home/components/TableOne";
import messageBox from "../home/components/messageBox.vue";
import MenuRole from "../home/components/MenuRole.vue";
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
      text: "确定",
      DownText: "导出",
      // from数据
      input: {
        bond_code: "", //债券代码
        bond_full_name: "", //债券全称
        bond_short_name: "", //债券简称
        bond_type: "", //债券品种
        mem_name: "", //发行人
        pub_place: "", //发行地点
        acc_confirm_date: "", //发送到账确认书日期
        consign_pay_end_date: "", //结束缴款日
        consign_pay_date: "", //缴款日
        acc_confirm_star_date: "", //开始*发送到账确认书日期
        consign_pay_star_date: "", //开始缴款日
        acc_confirm_end_date: "", //结束*发送到账确认书日期
        is_cancel: "", //取消债券是否中止
        publish_model: "", //发行方式
        effect_status: "", //生效状态
        book_manager_name: "", //簿记管理人
        reg_notice_number: "", //注册通知书文号
        status: "", //债券处理状态
        issue: "" //发行地点修改
      },
      options: {
        pub_place: [
          //发行地点
          {
            label: "现场",
            value: "现场"
          },
          {
            label: "远程",
            value: "远程"
          }
        ],
        issue: [
          //发行地点
          {
            label: "现场",
            value: "现场"
          },
          {
            label: "远程",
            value: "远程"
          }
        ],
        status: [
          //债券处理状态
          {
            label: "暂存",
            value: "暂存"
          },
          {
            label: "待复核",
            value: "待复核"
          },
          {
            label: "已复核",
            value: "已复核"
          },
          {
            label: "已补录",
            value: "已补录"
          },
          {
            label: "簿记准备完成待确认",
            value: "簿记准备完成待确认"
          },
          {
            label: "簿记准备完成",
            value: "簿记准备完成"
          },
          {
            label: "补录暂存",
            value: "补录暂存"
          }
        ],
        effect_status: [
          //生效状态
          {
            label: "未生效",
            value: "未生效"
          },
          {
            label: "正常",
            value: "正常"
          },
          {
            label: "中止",
            value: "中止"
          },
          {
            label: "过期",
            value: "过期"
          }
        ],
        publish_model: [
          //发行方式
          {
            label: "私募",
            value: "私募"
          },
          {
            label: "公募",
            value: "公募"
          }
        ],
        is_cancel: [
          //取消债券是否中止
          {
            label: "OK",
            value: "OK"
          },
          {
            label: "FALSE",
            value: "FALSE"
          }
        ],
        is_upd_pub_amt: [
           {
            label: "是",
            value: "是"
          },
          {
            label: "否",
            value: "否"
          }
        ],
        is_hubei: [
          {
            label: "是",
            value: "是"
          },
          {
            label: "否",
            value: "否"
          }
        ],
        publish_flow_node:[
          {
            label: "初始",
            value: "初始"
          },
          {
            label: "簿记准备完成",
            value: "簿记准备完成"
          },
          {
            label: "申购",
            value: "申购"
          },
          {
            label: "定价配售",
            value: "定价配售"
          },
          {
            label: "分销",
            value: "分销"
          },
          {
            label: "发行结束",
            value: "发行结束"
          }
        ],
        term_unit: [
          {
            label: "年",
            value: "年"
          },
          {
            label: "月",
            value: "月"
          },
          {
            label: "日",
            value: "日"
          }
        ],
        bond_type: [
          //债券品种
          {
            label: "SCP",
            value: "SCP"
          },
          {
            label: "CP",
            value: "CP"
          },
          {
            label: "MTN",
            value: "MTN"
          },
          {
            label: "PPNCP",
            value: "PPNCP"
          },
          {
            label: "PPNMTN",
            value: "PPNMTN"
          },
          {
            label: "ABN",
            value: "ABN"
          },
          {
            label: "RB-PB",
            value: "RB-PB"
          },
          {
            label: "PRN",
            value: "PRN"
          },
          {
            label: "SMECN",
            value: "SMECN"
          },
          {
            label: "SMECNII",
            value: "SMECNII"
          },
         {
            label: "PPNSMECN",
            value: "PPNSMECN"
          },
         {
            label: "PPNSMECNII",
            value: "PPNSMECNII"
          },{
            label: "SDR",
            value: "SDR"
          }
        ],
        prdt_rating: [
           {
            label: "无",
            value: "无"
          },
          {
            label: "A-1",
            value: "A-1"
          },
          {
            label: "A-2",
            value: "A-2"
          },
          {
            label: "A-3",
            value: "A-3"
          },
          {
            label: "AAA",
            value: "AAA"
          },
          {
            label: "AAA-",
            value: "AAA-"
          },
          {
            label: "AA+",
            value: "AA+"
          },
          {
            label: "AA",
            value: "AA"
          },
          {
            label: "AA-",
            value: "AA-"
          },
          {
            label: "A+",
            value: "A+"
          },
         {
            label: "A",
            value: "A"
          },
         {
            label: "A-",
            value: "A-"
          },{
            label: "A-1+",
            value: "A-1+"
          },{
            label: "A1",
            value: "A1"
          },{
            label: "A1+",
            value: "A1+"
          },{
            label: "AAA（S）",
            value: "AAA（S）"
          },{
            label: "B",
            value: "B"
          },{
            label: "B-",
            value: "B-"
          },{
            label: "B+",
            value: "B+"
          },{
            label: "BB",
            value: "BB"
          },{
            label: "BB-",
            value: "BB-"
          },{
            label: "BB+",
            value: "BB+"
          },{
            label: "BBB",
            value: "BBB"
          },{
            label: "BBB-",
            value: "BBB-"
          },{
            label: "BBB+",
            value: "BBB+"
          },{
            label: "BBBpi",
            value: "BBBpi"
          },{
            label: "Bbpi",
            value: "Bbpi"
          },{
            label: "Bpi",
            value: "Bpi"
          },{
            label: "C",
            value: "C"
          },{
            label: "CC",
            value: "CC"
          },{
            label: "CCC",
            value: "CCC"
          },{
            label: "CCC-",
            value: "CCC-"
          },{
            label: "CCC+",
            value: "CCC+"
          },{
            label: "",
            value: ""
          }
        ],
        prdt_rating2: [
           {
            label: "无",
            value: "无"
          },
          {
            label: "A-1",
            value: "A-1"
          },
          {
            label: "A-2",
            value: "A-2"
          },
          {
            label: "A-3",
            value: "A-3"
          },
          {
            label: "AAA",
            value: "AAA"
          },
          {
            label: "AAA-",
            value: "AAA-"
          },
          {
            label: "AA+",
            value: "AA+"
          },
          {
            label: "AA",
            value: "AA"
          },
          {
            label: "AA-",
            value: "AA-"
          },
          {
            label: "A+",
            value: "A+"
          },
         {
            label: "A",
            value: "A"
          },
         {
            label: "A-",
            value: "A-"
          },{
            label: "A-1+",
            value: "A-1+"
          },{
            label: "A1",
            value: "A1"
          },{
            label: "A1+",
            value: "A1+"
          },{
            label: "AAA（S）",
            value: "AAA（S）"
          },{
            label: "B",
            value: "B"
          },{
            label: "B-",
            value: "B-"
          },{
            label: "B+",
            value: "B+"
          },{
            label: "BB",
            value: "BB"
          },{
            label: "BB-",
            value: "BB-"
          },{
            label: "BB+",
            value: "BB+"
          },{
            label: "BBB",
            value: "BBB"
          },{
            label: "BBB-",
            value: "BBB-"
          },{
            label: "BBB+",
            value: "BBB+"
          },{
            label: "BBBpi",
            value: "BBBpi"
          },{
            label: "Bbpi",
            value: "Bbpi"
          },{
            label: "Bpi",
            value: "Bpi"
          },{
            label: "C",
            value: "C"
          },{
            label: "CC",
            value: "CC"
          },{
            label: "CCC",
            value: "CCC"
          },{
            label: "CCC-",
            value: "CCC-"
          },{
            label: "CCC+",
            value: "CCC+"
          },{
            label: "",
            value: ""
          }
        ],
        pub_creditrate: [
          {
            label: "无",
            value: "无"
          },
          {
            label: "A-1",
            value: "A-1"
          },
          {
            label: "A-2",
            value: "A-2"
          },
          {
            label: "A-3",
            value: "A-3"
          },
          {
            label: "AAA",
            value: "AAA"
          },
          {
            label: "AAA-",
            value: "AAA-"
          },
          {
            label: "AA+",
            value: "AA+"
          },
          {
            label: "AA",
            value: "AA"
          },
          {
            label: "AA-",
            value: "AA-"
          },
          {
            label: "A+",
            value: "A+"
          },
         {
            label: "A",
            value: "A"
          },
         {
            label: "A-",
            value: "A-"
          },{
            label: "A-1+",
            value: "A-1+"
          },{
            label: "A1",
            value: "A1"
          },{
            label: "A1+",
            value: "A1+"
          },{
            label: "AAA（S）",
            value: "AAA（S）"
          },{
            label: "B",
            value: "B"
          },{
            label: "B-",
            value: "B-"
          },{
            label: "B+",
            value: "B+"
          },{
            label: "BB",
            value: "BB"
          },{
            label: "BB-",
            value: "BB-"
          },{
            label: "BB+",
            value: "BB+"
          },{
            label: "BBB",
            value: "BBB"
          },{
            label: "BBB-",
            value: "BBB-"
          },{
            label: "BBB+",
            value: "BBB+"
          },{
            label: "BBBpi",
            value: "BBBpi"
          },{
            label: "Bbpi",
            value: "Bbpi"
          },{
            label: "Bpi",
            value: "Bpi"
          },{
            label: "C",
            value: "C"
          },{
            label: "CC",
            value: "CC"
          },{
            label: "CCC",
            value: "CCC"
          },{
            label: "CCC-",
            value: "CCC-"
          },{
            label: "CCC+",
            value: "CCC+"
          },{
            label: "",
            value: ""
          }
        ], 
        pub_creditrate2: [
          {
            label: "无",
            value: "无"
          },
          {
            label: "A-1",
            value: "A-1"
          },
          {
            label: "A-2",
            value: "A-2"
          },
          {
            label: "A-3",
            value: "A-3"
          },
          {
            label: "AAA",
            value: "AAA"
          },
          {
            label: "AAA-",
            value: "AAA-"
          },
          {
            label: "AA+",
            value: "AA+"
          },
          {
            label: "AA",
            value: "AA"
          },
          {
            label: "AA-",
            value: "AA-"
          },
          {
            label: "A+",
            value: "A+"
          },
         {
            label: "A",
            value: "A"
          },
         {
            label: "A-",
            value: "A-"
          },{
            label: "A-1+",
            value: "A-1+"
          },{
            label: "A1",
            value: "A1"
          },{
            label: "A1+",
            value: "A1+"
          },{
            label: "AAA（S）",
            value: "AAA（S）"
          },{
            label: "B",
            value: "B"
          },{
            label: "B-",
            value: "B-"
          },{
            label: "B+",
            value: "B+"
          },{
            label: "BB",
            value: "BB"
          },{
            label: "BB-",
            value: "BB-"
          },{
            label: "BB+",
            value: "BB+"
          },{
            label: "BBB",
            value: "BBB"
          },{
            label: "BBB-",
            value: "BBB-"
          },{
            label: "BBB+",
            value: "BBB+"
          },{
            label: "BBBpi",
            value: "BBBpi"
          },{
            label: "Bbpi",
            value: "Bbpi"
          },{
            label: "Bpi",
            value: "Bpi"
          },{
            label: "C",
            value: "C"
          },{
            label: "CC",
            value: "CC"
          },{
            label: "CCC",
            value: "CCC"
          },{
            label: "CCC-",
            value: "CCC-"
          },{
            label: "CCC+",
            value: "CCC+"
          },{
            label: "",
            value: ""
          }
        ]
      },
      tableone: {
        tableConfig: [
         {
            type: "text",
            label: "债券代码",
            prop: "bond_code",
            width: "150px",
            sortable: true
          },
        
          {
            type: "text",
            label: "债券全称",
            prop: "bond_full_name",
            width: "440px",
            sortable: true
          }, {
            type: "text",
            label: "债券简称",
            prop: "bond_short_name",
            width: "180px",
            sortable: true
          },
          {
            type: "text",
            label: "发行起始日",
            prop: "publish_date_b",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "申购期限开始日期",
            prop: "sub_begin_date",
            minWidth: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "申购期限开始时间",
            prop: "sub_begin_time",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "申购期限结束日期",
            prop: "sub_end_date",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "申购期限结束时间",
            prop: "sub_end_time",
            minWidth: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "定价配售发送上清所日期",
            prop: "send_cfets_date",
            width: "300px",
            sortable: true
          },
          {
            type: "text",
            label: "*发送到账确认书日期",
            prop: "acc_confirm_date",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "缴款日",
            prop: "consign_pay_end_date",
            width: "120px",
            sortable: true
          },
          {
            type: "text",
            label: "债权债务登记日",
            prop: "registr_date",
            width: "200px",
            sortable: true
          },
          {
            type: "text",
            label: "发行人全称",
            prop: "mem_name",
            width: "350px",
            sortable: true
          },
          {
            type: "text",
            label: "发行人托管账号",
            prop: "publisher_account",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "簿记管理人全称",
            prop: "book_manager_name",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "联席承销团成员",
            prop: "co_main",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "债券品种",
            prop: "bond_type",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "债项评级",
            prop: "prdt_rating",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "债项评级2",
            prop: "prdt_rating2",
            width: "180px",
            sortable: true
          },
          {
            type: "text",
            label: "发行人信用评级",
            prop: "pub_creditrate",
            width: "240px"
          },
          {
            type: "text",
            label: "发行人信用评级2",
            prop: "pub_creditrate2",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "申购类型",
            prop: "app_type",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "发行价格（元）",
            prop: "pub_price",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "票面利率（%）",
            prop: "bond_rate",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "债券期限",
            prop: "bond_term",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "期限单位",
            prop: "term_unit",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "发行额（亿元）",
            prop: "fact_pub_amt",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "团成员或投资人数量",
            prop: "congisn_count",
            width: "280px",
            sortable: true
          },
          {
            type: "text",
            label: "合规申购家数",
            prop: "app_org_num",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "有效申购家数",
            prop: "vali_org_num",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "认购倍数",
            prop: "sub_multy",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "边际倍数",
            prop: "margin_multy",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "发行节点",
            prop: "publish_flow_node",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "债券处理状态",
            prop: "status",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "生效状态",
            prop: "effect_status",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "发行方式",
            prop: "publish_model",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "通知书文号",
            prop: "reg_notice_number",
            width: "150px",
            sortable: true
          
          },
          {
            type: "text",
            label: "佣金费率",
            prop: "commission_rate",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "是否发行金额调整",
            prop: "is_upd_pub_amt",
            width: "240px",
            sortable: true
          },
          {
            type: "text",
            label: "到期日",
            prop: "maturity_date",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "发行地点",
            prop: "pub_place",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "费率",
            prop: "fee_rate",
            width: "150px",
            sortable: true
             
          },
          {
            type: "text",
            label: "打折前簿记建档费用(万元）",
            prop: "pre_book_fee",
            width: "340px",
            sortable: true
          },
          {
            type: "text",
            label: "折扣率",
            prop: "discount_rate",
            width: "150px",
            sortable: true
          },
          {
            type: "text",
            label: "打折后簿记建档费用（万元）",
            prop: "current_book_fee",
            width: "340px",
            sortable: true
          },
          {
            type: "text",
            label: "债券全称发行人",
            prop: "bond_fullname_publisher",
            width: "350px",
            sortable: true
          },
          {
            type: "text",
            label: "债券全称与发行人核对",
            prop: "is_publisher_check",
            width: "280px",
            sortable: true
          },
          {
            type: "text",
            label: "取消债券是否中止",
            prop: "is_cancel",
            width: "200px",
            sortable: true
          },{
            type: "text",
            label: "是否为湖北企业",
            prop: "is_hubei",
            width: "200px",
            sortable: true
          },{
            type: "operate",
            label: "操作",
            width: "300px",
            btns: [
              {
                text: "修改",
                callback: this.handelbtns
              },{
                text: "删除",
                callback: this.deletebyId
              }
            ]
          }
        ],

        tableData: [],
        operateDetails: ""
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
    //this.getData();
    // 更改修改中的数据
    this.handelData();
  },
  // 定义方法
  methods: {
 
    getData() {
      let params = {
        reqAppId: "PARBJS0001",
        reqAppName: "台账导入查询",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          bond_code:this.input.bond_code,
          bond_full_name:this.input.bond_full_name,
          bond_short_name:this.input.bond_short_name,
          bond_type:this.input.bond_type,
          mem_name:this.input.mem_name,
          pub_place:this.input.pub_place,
          consign_pay_end_date:this.input.consign_pay_end_date,
          consign_pay_star_date:this.input.consign_pay_star_date,
          acc_confirm_star_date: this.input.acc_confirm_star_date,  // 开始*发送到账确认书日期
          acc_confirm_end_date: this.input.acc_confirm_end_date,  // 结束*发送到账确认书日期
         // acc_confirm_date:this.input.acc_confirm_date,
          is_cancel:this.input.is_cancel,
          publish_model:this.input.publish_model,
          effect_status:this.input.effect_status,
          book_manager_name:this.input.book_manager_name,
          reg_notice_number:this.input.reg_notice_number,
          status:this.input.status
        },
        // 使用变量ok
        Pagenum: this.list.curpage,
        Curpage: this.list.pageSize,
        msgId: "1",
        msgReqTime: "10"
      };
   
      getDatas(params).then(res => {
        // console.log(res);
        if (res.msgRetCode == "000000" && res.body != null) {
           var n = res.body;
          for(var i=0;i<n.length;i++){
           var fee = n[i].fee_rate;
          if(fee != null && fee !=""){
            var doublen = fee.toString().split(".")[1];
            if(fee.toString().split(".").length == 1) doublen="0";
            if((doublen+'').length<4){
              n[i].fee_rate =fee.toFixed(4);
            }
           }
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

    excelFileLClick() {
      this.$refs.excelFile.click();
    },
    // 点击查询
    query() {
      let ConsignPaystartDate = "";  //开始缴款日
      let ConsignPayendDate = "";  //结束缴款日
      let AccConfirmstartDate = ""; //开始*发送到账确认书日期
      let AccConfirmendtDate = ""; //结束*发送到账确认书日期
      if (this.input.consign_pay_date != null && this.input.consign_pay_date != "") {
         ConsignPaystartDate =this.input.consign_pay_date[0];
         ConsignPayendDate =this.input.consign_pay_date[1];
      }
      if (this.input.acc_confirm_date != null && this.input.acc_confirm_date != "") {
         AccConfirmstartDate =this.input.acc_confirm_date[0];
         AccConfirmendtDate =this.input.acc_confirm_date[1];
      }
      let params = {
        reqAppId: "PARBJS0001",
        reqAppName: "台账导入查询",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          bond_code:this.input.bond_code+ "",
          bond_full_name:this.input.bond_full_name+ "",
          bond_short_name:this.input.bond_short_name+ "",
          bond_type:this.input.bond_type+ "",
          mem_name:this.input.mem_name+ "",
          pub_place:this.input.pub_place+ "",
          consign_pay_star_date:ConsignPaystartDate+ "", //开始缴款日
          consign_pay_end_date:ConsignPayendDate+ "", //结束缴款日
          acc_confirm_star_date:AccConfirmstartDate+ "",  // 开始*发送到账确认书日期
          acc_confirm_end_date:AccConfirmendtDate+ "",  // 结束*发送到账确认书日期
          is_cancel:this.input.is_cancel+ "",
          publish_model:this.input.publish_model+ "",
          effect_status:this.input.effect_status+ "",
          book_manager_name:this.input.book_manager_name+ "",
          reg_notice_number:this.input.reg_notice_number+ "",
          status:this.input.status+ ""
        },
        // 使用变量ok
        Pagenum: "1",
        Curpage: "10",
        msgId: "1",
        msgReqTime: "10"
      };
      // console.log(params);
      getDatas(params).then(res => {
        if (res.msgRetCode == "000000" && res.body != null ) {
           var n = res.body;
          for(var i=0;i<n.length;i++){
           var fee = n[i].fee_rate;
          if(fee != null && fee !=""){
            var doublen = fee.toString().split(".")[1];
            if(fee.toString().split(".").length == 1) doublen="0";
            if((doublen+'').length<4){
              n[i].fee_rate =fee.toFixed(4);
            }
           }
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

    // 点击导出
    downQuery() { 

      let ConsignPaystartDate = "";  //开始缴款日
      let ConsignPayendDate = "";  //结束缴款日
      let AccConfirmstartDate = ""; //开始*发送到账确认书日期
      let AccConfirmendtDate = ""; //结束*发送到账确认书日期 
    if(this.input.bond_code != null && this.input.bond_code != "" || 
      this.input.bond_full_name != null && this.input.bond_full_name != "" || 
      this.input.bond_short_name != null && this.input.bond_short_name != "" || 
      this.input.bond_type != null && this.input.bond_type != "" || 
      this.input.mem_name != null && this.input.mem_name != "" || 
      this.input.pub_place != null && this.input.pub_place != "" || 
      this.input.consign_pay_date != null && this.input.consign_pay_date != "" || 
      this.input.acc_confirm_date != null && this.input.acc_confirm_date != "" || 
      this.input.is_cancel != null  &&  this.input.is_cancel != "" || 
      this.input.publish_model != null && this.input.publish_model != "" || 
      this.input.effect_status != null  && this.input.effect_status != ""|| 
      this.input.book_manager_name != null  && this.input.book_manager_name != ""|| 
      this.input.reg_notice_number != null && this.input.reg_notice_number != "" || 
      this.input.status != null && this.input.status != ""){
       if (this.input.consign_pay_date != null && this.input.consign_pay_date != "") {
         ConsignPaystartDate =this.input.consign_pay_date[0];
         ConsignPayendDate =this.input.consign_pay_date[1];
      }
      if (this.input.acc_confirm_date != null && this.input.acc_confirm_date != "") {
         AccConfirmstartDate =this.input.acc_confirm_date[0];
         AccConfirmendtDate =this.input.acc_confirm_date[1];
      }
      let params = {
        reqAppId: "PARBJS0006",
        reqAppName: "台账数据",
        reqUserCode: "",
        reqUserPwd: "",
        body: {
          bond_code:this.input.bond_code+ "",
          bond_full_name:this.input.bond_full_name+ "",
          bond_short_name:this.input.bond_short_name+ "",
          bond_type:this.input.bond_type+ "",
          mem_name:this.input.mem_name+ "",
          pub_place:this.input.pub_place+ "",
          consign_pay_star_date:ConsignPaystartDate+ "", //开始缴款日
          consign_pay_end_date:ConsignPayendDate+ "", //结束缴款日
          acc_confirm_star_date:AccConfirmstartDate+ "",  // 开始*发送到账确认书日期
          acc_confirm_end_date:AccConfirmendtDate+ "",  // 结束*发送到账确认书日期
          is_cancel:this.input.is_cancel+ "",
          publish_model:this.input.publish_model+ "",
          effect_status:this.input.effect_status+ "",
          book_manager_name:this.input.book_manager_name+ "",
          reg_notice_number:this.input.reg_notice_number+ "",
          status:this.input.status+ ""
        },
        // 使用变量ok
        Pagenum: "1",
        Curpage: "10",
        msgId: "1",
        msgReqTime: "10"
      };
      //window.open("http://10.10.54.199:8087/queryweb/downExcelbyData?apiRequest="+encodeURI(encodeURI(JSON.stringify(params))));
      window.open(this.$api.exportIP +"/queryweb/downExcelbyData?apiRequest=" +encodeURI(encodeURI(JSON.stringify(params))));
     }else{
        this.$message("导出时请填写任意条件！");
     }

     
  /*************************** */


    },
    // 点击修改，弹出框显示修改页面；
    handelbtns(data) {
      // console.log(data.pub_place);
      // 用户点击修改，将数据赋值给变量
      this.currentData = data;
      //  this.input.value = data.pub_place;
      this.dialogVisible = true;
      // console.log(data.pub_place);


      
      this.input = data;
      // console.log(this.input.issue);
    },

      deletebyId(data) {
        
          this.$confirm("确定要删除这条数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning" 
          }).then(() => {
                  let params = {
                  reqAppId: "PARBJS0007", //查询重复sql语句
                  reqAppName: "台账补录删除",
                  reqUserCode: "",
                  reqUserPwd: "",
                  body: {
                    bond_id: data.bond_id+""
                  },
                  msgId: "1",
                  msgReqTime: "10"
                };
              getDelete(params).then(res => {
                if (res.msgRetCode == "000000") {
                  this.$message("删除成功");
                  this.getData();
                  this.Adddialog = false;
                } else {
                  this.$message("删除失败！请联系管理员");
                  this.getData();
                }
              });
            }).catch(() => {
            });
    },
    // // 修改中的下拉框事件
    // handelInput(data) {
    //   debugger;
    //   // console.log(this.options.pub_place[0].value);
    //   //  this.input.issue = this.options.pub_place[1];
    //   this.input.issue = data;
    // },
    handelData() {
        this.input.bond_code = "";//债券代码
        this.input.bond_full_name= ""; //债券全称
        this.input.bond_short_name= ""; //债券简称
        this.input.bond_type= ""; //债券品种
        this.input.mem_name= ""; //发行人
        this.input.pub_place= ""; //发行地点
        this.input.acc_confirm_date= ""; //发送到账确认书日期
        this.input.consign_pay_end_date= ""; //结束缴款日
        this.input.consign_pay_date= ""; //缴款日
        this.input.acc_confirm_star_date= ""; //开始*发送到账确认书日期
        this.input.consign_pay_star_date= ""; //开始缴款日
        this.input.acc_confirm_end_date= ""; //结束*发送到账确认书日期
        this.input.is_cancel= ""; //取消债券是否中止
        this.input.publish_model= ""; //发行方式
        this.input.effect_status= ""; //生效状态
        this.input.book_manager_name= ""; //簿记管理人
        this.input.reg_notice_number= ""; //注册通知书文号
        this.input.status= ""; //债券处理状态
        this.input. issue= "" //发行地点修改
      // console.log(this.currentData);
      // console.log(111);
    },
    tzupdata(data) {
      var ss = this.input;
      console.log(this.input);
      this.text = "更新中";
      this.isLoding = true;
      var bondid =this.input.bond_id;
      var currentbookfee =this.input.current_book_fee;
      var consignpayenddate =this.input.consign_pay_end_date;
      var prebookfee =this.input.pre_book_fee;
      var prompt ="";
     if(!bondid){
         this.$message("更新失败！");
      }
      if(!currentbookfee){
        prompt +=",打折后簿记建档费用（万元）";
      }
      if(!consignpayenddate){
         prompt +=",缴款日";
      }
      if(!prebookfee){
          prompt +=",打折前簿记建档费用(万元）";
      }
      if(prompt){
          this.$confirm("更新失败！请确认"+prompt+"不能为空", "提示", {
             confirmButtonText: "确定",
             cancelButtonText: "取消",
             type: "warning" 
          }).then(() => {
               this.text = "确定";
              this.isLoding = false;
          }).catch(() => {
              this.text = "确定";
              this.isLoding = false;
            });
            return false;
      }
      let params = {
        reqAppId: "PARBJS0003",
        reqAppName: "台账导入更新",
        reqUserCode: "",
        reqUserPwd: "",
        body:JSON.stringify(this.input),
        msgId: "1",
        msgReqTime: "10"
      };
      getUpade(params).then(res => {
        if (res.msgRetCode == "000000") {
          this.$message("更新成功");
         // this.reset();
          this.getData();
          this.text = "确定";
         this.isLoding = false;
       //   this.dialogVisible = false;
        } else {
          this.text = "确定";
          this.isLoding = false;
          this.$message("更新失败！请联系管理员");
        //  this.getData();
        }
      });
    },
    //设置菜单权限
    handleClick3() {
  
      this.menuRoleVisible = true;
    },
    clearAll() {
      this.hasFile = false;
      this.remark = "";
      this.accessory = "";
      if (this.$refs.accessory) {
        this.$refs.accessory.value = "";
      }
      if (this.$refs.excelFile) {
        this.$refs.excelFile.value = "";
      }
    },
     
    // 点击页码
    getDataCunt(data) {
 
      if (this.input.consign_pay_date != null && this.input.consign_pay_date != "") {
         this.input.consign_pay_star_date =this.input.consign_pay_date[0];
         this.input.consign_pay_end_date =this.input.consign_pay_date[1];
      }
      if (this.input.acc_confirm_date != null && this.input.acc_confirm_date != "") {
         this.input.acc_confirm_star_date =this.input.acc_confirm_date[0];
         this.input.acc_confirm_end_date =this.input.acc_confirm_date[1];
      }
      //更改变量的值
      this.list.curpage = data.currentPage;
      this.list.pageSize = data.pageSize;
      // console.log(data.currentPage);
      // 再次加载
      this.getData();
      // console.log(data);
    },
    //
    handleBtn() {
      // this.$refs.Msbox.handleCloseBox();
      let params = {
        consultationId: this.currentData.consultationId
      };
    },
    // 点击返回
    back() {
      // 返回上一个页面
      this.$router.back(-1);
    },
    // 点击重置
    reset() {
      // 重置数据
      this.input = {
        bond_code: "", //债券代码
        bond_full_name: "", //债券全称
        bond_short_name: "", //债券简称
        bond_type: "", //债券品种
        mem_name: "", //发行人
        pub_place: "", //发行地点
        consign_pay_date:"", //缴款日
        acc_confirm_date: "", //*发送到账确认书日期
        is_cancel: "", //取消债券是否中止
        publish_model: "", //发行方式
        effect_status: "", //生效状态
        book_manager_name: "", //簿记管理人
        reg_notice_number: "", //注册通知书文号
        status: "", //债券处理状态
        issue: "" //发行地点修改
      };
      // 重新渲染页面数据
    },
    cencelModal() {
      this.menuRoleVisible = false;
    },
    updateModal(){
       this.getData();
    },
    tzcancel(){
    this.reset();
    this.dialogVisible = false;
  }
  }
};
</script>

<style lang="scss" scoped>
.edit12 {
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
      margin-top: 9px;
      /deep/ .el-button.el-button--mini {
        border-radius: 8px;
      }
      .el-col {
        display: flex;
        width: 23.83333%;
        .search-label {
          width: 97%;
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
        .dateinterval{
        width:300px;
        /deep/ .el-range-separator{
          width:30px;
        }
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
        width: 76%;
        margin-left: 15px;
      }
    }
  }
   /deep/ .el-scrollbar__wrap {
    overflow-x: hidden!important;
}
}
</style>