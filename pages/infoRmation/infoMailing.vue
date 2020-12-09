<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">集中信息披露日中/日终-一键导出/一键发送</span>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <!-- 标题 -->
      <el-row class="titleContent" style="margin-bottom: 30px">
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="邮件报送" name="first">
          <el-dropdown
            size="small"
            placement="bottom"
            trigger="click"
            @command="batchOperate"
            style="margin-left: 10px"
          >
            <el-button class="search-btn" size="mini">
              一键导出
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              style="
                transform-origin: center top;
                z-index: 2005;
                width: 112px;
                position: absolute;
                top: 205px;
                left: 421px;
                text-align: center;
              "
            >
              <el-dropdown-item command="batch_remarks">日中</el-dropdown-item>
              <el-dropdown-item command="export_excel">日终</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            size="small"
            placement="bottom"
            trigger="click"
            @command="batchSend"
            style="margin-left: 10px"
          >
            <el-button class="search-btn" size="mini">
              一键发送
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              style="
                transform-origin: center top;
                z-index: 2005;
                width: 112px;
                position: absolute;
                top: 205px;
                left: 421px;
                text-align: center;
              "
            >
              <el-dropdown-item command="sendMidday">日中</el-dropdown-item>
              <el-dropdown-item command="sendEnd">日终</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="rowId"
                label="序号"
                width="70"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="jobName"
                label="任务名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="jobType"
                label="任务类型"
                align="center"
              ></el-table-column>
              <el-table-column prop="name" label="操作" align="center">
                <template slot-scope="scope">
                  <a
                    class="cz"
                    @click="mailConfig(scope.row)"
                    type="text"
                    size="small"
                    >邮件配置</a
                  >
                  <a
                    class="cz"
                    @click="check(scope.row)"
                    type="text"
                    size="small"
                    >查看</a
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="nextSendTimeStr"
                align="center"
                label="下次发送时间"
              ></el-table-column>
              <el-table-column
                prop="lastTime"
                align="center"
                label="上次发送时间"
              ></el-table-column>
              <el-table-column
                prop="lastResult"
                align="center"
                label="上次发送结果"
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
          <!-- 邮件配置 -->
          <el-dialog
            title="邮件配置"
            :close-on-click-modal="false"
            :visible.sync="bookEdit"
            width="40%"
          >
            <el-form
              ref="bookConfigForm"
              :model="bookConfig"
              :rules="rules"
              size="mini"
            >
              <el-row class="topCentent" v-show="false">
                <el-col :span="12">
                  <el-form-item label="任务ID：">
                    <!-- <el-input v-model="sizeForm.name"></el-input> -->
                    <span v-text="bookConfig.id"></span>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>
              <el-row class="topCentent">
                <el-col :span="24">
                  <el-form-item>
                    <div slot="label" style="margin-left: 10px">任务名称：</div>
                    <span v-text="bookConfig.jobName"></span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label=" 发件人地址：" prop="mailSender">
                <el-input
                  v-model="bookConfig.mailSender"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label=" 发件人密码：" prop="mailSenderPassword">
                <el-input
                  type="password"
                  v-model="bookConfig.mailSenderPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label=" 收件人：" prop="mailTo">
                <el-input v-model="bookConfig.mailTo"></el-input>
                <p>提示:支持填写多个邮箱，以 ; 隔开</p>
              </el-form-item>
              <el-form-item prop="mailCc">
                <div slot="label" style="margin-left: 10px">抄送</div>
                <el-input v-model="bookConfig.mailCc"></el-input>
                <p>提示:支持填写多个邮箱，以 ; 隔开</p>
              </el-form-item>

              <el-row class="topCentent">
                <el-col :span="11">
                  <el-form-item label="发行方式：" prop="jobType">
                    <el-radio-group
                      v-model="bookConfig.jobType"
                      @change="radioChange"
                    >
                      <el-radio class="radio" label="1">定时发送</el-radio>
                      <el-radio class="radio" label="2">一键发送</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="11">
                  <el-form-item label=" 延迟发送：" prop="sendDelay">
                    <el-input-number
                      :disabled="configDisabled"
                      v-model="bookConfig.sendDelay"
                      @change="handleChange"
                      :min="0"
                      :max="240"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="1"></el-col>
              </el-row>
              <el-row class="topCentent">
                <el-col :span="11">
                  <el-form-item label="   重复：" prop="jobCycle">
                    <el-select
                      v-model="bookConfig.jobCycle"
                      placeholder="请选择"
                    >
                      <el-option
                        :disabled="configDisabled"
                        v-for="item in jobTypeoOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="11">
                  <el-form-item label="发送时间：" prop="jobTime">
                    <el-time-select
                      v-model="bookConfig.jobTime"
                      :disabled="configDisabled"
                      :picker-options="{
                        start: '00:00',
                        step: '1:00',
                        end: '23:00',
                      }"
                      value-format="yyyy-MM-dd"
                      placeholder="选择时间"
                    ></el-time-select>
                  </el-form-item>
                </el-col>
                <el-col :span="1"></el-col>
              </el-row>
              <el-form-item>
                <div slot="label" style="margin-left: 10px">签名落款：</div>
                <el-input
                  type="textarea"
                  :rows="8"
                  v-model="bookConfig.mainSign"
                ></el-input>
              </el-form-item>
              <!-- <el-row class="topCentent">
                <el-col :span="11" v-if="mailType">
                  <el-form-item label="时间段：" prop="jobParam">
                    <el-input-number
                      v-model="bookConfig.jobParam"
                      @change="handleChange"
                      :min="0"
                      :max="10"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="1"></el-col>
              </el-row> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="bookEdit = false">取 消</el-button>
              <el-button type="primary" @click="updateMail('bookConfigForm')"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!-- 操作 查看 -->
          <el-dialog
            title="选择日期"
            class="import"
            :visible.sync="dialogVisible"
            width="25%"
          >
            <div class="dialog-body">
              <span class="demonstration">选择日期 :</span>
              <el-date-picker
                v-model="timeValue"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="checkTime(timeValue)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-dialog
            title="选择日期"
            class="import"
            :visible.sync="sendMiddleVisible"
            width="25%"
          >
            <div class="dialog-body">
              <span class="demonstration">选择日期 :</span>
              <el-date-picker
                v-model="Middle"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="sendMiddleVisible = false">取 消</el-button>
              <el-button type="primary" @click="sendMiddle(Middle)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-dialog
            title="选择日期"
            class="import"
            :visible.sync="sendEndVisible"
            width="25%"
          >
            <div class="dialog-body">
              <span class="demonstration">选择日期 :</span>
              <el-date-picker
                v-model="EndTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="sendEndVisible = false">取 消</el-button>
              <el-button type="primary" @click="sendEnd(EndTime)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-dialog
            title="选择日期"
            class="import"
            :visible.sync="exporRVisible"
            width="25%"
          >
            <div class="dialog-body">
              <span class="demonstration">选择日期 :</span>
              <el-date-picker
                v-model="exporR"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="exporRVisible = false">取 消</el-button>
              <el-button type="primary" @click="exporMiddle()">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="选择日期"
            class="import"
            :visible.sync="exporZVisible"
            width="25%"
          >
            <div class="dialog-body">
              <span class="demonstration">选择日期 :</span>
              <el-date-picker
                v-model="exporZ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="exporZVisible = false">取 消</el-button>
              <el-button type="primary" @click="exportEnd">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="发送结果"
            class="import"
            :visible.sync="resDataVisible"
            width="25%"
          >
            <div class="dialog-body">
              <ul>
                <p>失败数据</p>
                <li
                  v-for="(item, index) in errorResult"
                  :key="index"
                  :title="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="resDataVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 选择日期 并查看 -->
          <el-dialog
            title="查看"
            :close-on-click-modal="false"
            :visible.sync="checkVisible"
            width="40%"
          >
            <el-row class="topCentent">
              <el-form
                ref="checkForm"
                :model="checkForm"
                size="mini"
                :rules="checkFormRules"
              >
                <el-form-item label=" 收件人：" prop="mailTo" key="1">
                  <el-input v-model="checkForm.mailTo"></el-input>
                </el-form-item>

                <el-form-item prop="mailCc" key="2">
                  <div slot="label" style="margin-left: 10px">抄送：</div>
                  <el-input v-model="checkForm.mailCc"></el-input>
                </el-form-item>

                <el-form-item label=" 标题：" prop="subject" key="3">
                  <el-input v-model="checkForm.subject"></el-input>
                </el-form-item>

                <el-form-item label=" 正文：" prop="context" key="4">
                  <el-input
                    type="textarea"
                    :rows="8"
                    v-model="checkForm.context"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <div slot="label" style="margin-left: 10px">签名落款：</div>
                  <el-input
                    type="textarea"
                    :rows="8"
                    v-model="checkForm.mainSign"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <a
                    style="text-decoration: underline !important"
                    :href="this.$api.IP + checkForm.url"
                    >{{ checkForm.attachName }}</a
                  >
                </el-form-item>
                <el-button
                  type="primary"
                  @click="mailOneClickSend('checkForm')"
                  v-if="jobType"
                  >一键发送</el-button
                >
              </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="checkVisible = false"
                >关闭</el-button
              >
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="邮件发送日志" name="second">
          <!--输入框1 -->
          <el-row class="topCentent">
            <el-col :span="6">
              <label class="search-label">任务名称：</label>
              <el-select v-model="valueOne" placeholder="请选择" clearable >
                <el-option
                  v-for="item in optionOne"
                  :key="item.value"
                  :label="item.jobName"
                  :value="item.jobName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">收件人：</label>
              <el-input
                placeholder="请输入"
                v-model="input.mailTo"
                clearable
              ></el-input>
            </el-col>

            <el-col :span="6">
              <label class="search-label">抄送：</label>
              <el-input
                placeholder="请输入"
                v-model="input.mailCc"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">发送日期：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="input.sendTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="defaultDate"
              ></el-date-picker>
            </el-col>
          </el-row>
          <!--输入框4 -->

          <!-- 下半部分 -->
          <el-row class="bottomContent">
            <el-col :span="20"></el-col>
            <el-col :span="4" class="btns">
              <el-button type="primary" @click="mailSearch">查询</el-button>
              <el-button plain @click="reset">重置</el-button>
            </el-col>
          </el-row>

          <!--tab部分 -->
          <div class="tables">
            <el-table
              v-loading="loading"
              element-loading-text="正在导出"
              :data="tableData1"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="rowId"
                label="序号"
                width="70"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="jobName"
                :show-overflow-tooltip="true"
                label="任务名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="mailTo"
                :show-overflow-tooltip="true"
                label="收件人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="mailCc"
                :show-overflow-tooltip="true"
                label="抄送"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="nextSendTimeStr"
                label="发送时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="mailStatus"
                label="发送结果"
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
              :total="totalCount1"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="模板修改日志" name="changeLogs">
          <!--输入框1 -->
          <el-row class="topCentent">
            <el-col :span="6">
              <label class="search-label">操作类型：</label>
              <el-select v-model="changeLogsValue" placeholder="请选择" clearable >
                <el-option
                  v-for="item in changeLogsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">任务名称：</label>
              <el-input
                placeholder="请输入"
                v-model="changeLog.logItem1"
                clearable
              ></el-input>
            </el-col>

            <el-col :span="6">
              <label class="search-label">操作人：</label>
              <el-input
                placeholder="请输入"
                v-model="changeLog.logOperator"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">发送日期：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="changeLog.logTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="defaultDate"
              ></el-date-picker>
            </el-col>
          </el-row>
          <!--输入框4 -->

          <!-- 下半部分 -->
          <el-row class="bottomContent">
            <el-col :span="20"></el-col>
            <el-col :span="4" class="btns">
              <el-button type="primary" @click="changeLogSearch"
                >查询</el-button
              >
              <el-button plain @click="changeLogReset">重置</el-button>
            </el-col>
          </el-row>

          <!--tab部分 -->
          <div class="tables">
            <el-table :data="changeLogData" border style="width: 100%">
              <el-table-column
                prop="rowId"
                label="序号"
                width="70"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="logItem1"
                :show-overflow-tooltip="true"
                label="任务名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="logType"
                :show-overflow-tooltip="true"
                label="操作类型"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.logType == 'a02'">邮件模板</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="logOperator"
                :show-overflow-tooltip="true"
                label="操作人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="logItem4"
                label="操作时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="detail"
                label="操作详情"
                :show-overflow-tooltip="true"
                align="center"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="pageNum2"
              :page-sizes="pageSizes2"
              :page-size="pageSize2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount2"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getInfoDiscMail,
  getInfoDiscMailConfig,
  getInfoDiscMailUpdateMail,
  getInfoDiscMailShowMail,
  getInfoDiscMailOneClickSend,
  getInfoDiscMailPaperList,
  getInfoDiscMailListX,
  getSelectAllLog,
  getInfoDiscSendMailList,
} from "../../library/api/api.public";
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
    // 邮箱发送地址重复校验
    let filterEmail = (rule, value, callback) => {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})(,([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4}))*$/;
      console.log(value);
      if (value == "" || value == null) {
        callback(new Error("收件人不能为空"));
      } else {
        this.mailToAddress = value.split(";");
        if (
          this.mailToAddress == "" ||
          this.mailToAddress == undefined ||
          this.mailToAddress == null
        ) {
          callback();
        } else {
          if (reg.test(this.mailToAddress)) {
            var l = this.mailToAddress.length;
            for (var i = 0; i < l; i++) {
              for (var j = i + 1; j < l; j++) {
                if (this.mailToAddress[i] === this.mailToAddress[j]) {
                  i++;
                  j = i;
                  callback(new Error("存在重复邮箱地址，请更换"));
                }
              }
            }
            callback();
          } else {
            callback(new Error("请输入正确的邮箱地址"));
          }
        }
      }
    };

    let filterEmail1 = (rule, value, callback) => {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})(,([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4}))*$/;
      console.log(value);
      if (value == "" || value == null) {
        callback();
      } else {
        this.mailToAddress = value.split(";");
        if (
          this.mailToAddress == "" ||
          this.mailToAddress == undefined ||
          this.mailToAddress == null
        ) {
          callback();
        } else {
          if (reg.test(this.mailToAddress)) {
            var l = this.mailToAddress.length;
            for (var i = 0; i < l; i++) {
              for (var j = i + 1; j < l; j++) {
                if (this.mailToAddress[i] === this.mailToAddress[j]) {
                  i++;
                  j = i;
                  callback(new Error("存在重复邮箱地址，请更换"));
                }
              }
            }
            callback();
          } else {
            callback(new Error("请输入正确的邮箱地址"));
          }
        }
      }
    };
    let Time = (rule, value, callback) => {
      console.log(value);
      if (this.configDisabled) {
        callback();
      } else {
        if (value == "" || value == null) {
          callback(new Error("发送时间不能为空"));
        } else {
          callback();
        }
      }
    };
    return {
      loading: false,
      text: "确定",
      activeName: "first",
      // from数据
      input: {
        jobName: "",
        mailCc: "",
        mailTo: "",
        sendTime: "",
      },
      tableData: [],
      tableData1: [],
      workReport: [],
      nowTimeHour: "",
      nowTimeYear: "",
      jobType: false,
      sendJson: "",
      valueOne: "",
      optionOne: [{ value: "", label: "全部" }],
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      pageNum1: 1,
      totalCount1: 0,
      // 个数选择器（可修改）
      pageSizes1: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize1: 5,
      pageNum2: 1,
      totalCount2: 0,
      // 个数选择器（可修改）
      pageSizes2: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize2: 5,
      id: "", //当前行id
      timeValue: "",
      //弹出层 form表单
      bookConfig: {
        id: "",
        jobName: "", //任务名称
        mailTo: "", //收件人
        mailCc: "", //抄送人
        jobType: "", //发送类型
        jobCycle: "", //重复  下拉
        jobTime: "", //发送时间
        sendDelay: "", //延迟发送
        jobParam: "", //时间段
        mainSign: "",
        mailSender: "",
        mailSenderPassword: "",
      },
      oldForm: {},
      rules: {
        mailCc: [{ validator: filterEmail1, trigger: "change" }],
        mailTo: [
          { required: true, message: "收件人不能为空", trigger: "blur" },
          { validator: filterEmail, trigger: ["change", "blur"] },
        ],
        jobTime: [
          {
            validator: Time,
            trigger: "blur",
            required: true,
          },
        ],
        jobCycle: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        sendDelay: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        jobParam: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],

        mailSender: [
          { required: true, message: "发件人地址不能为空", trigger: "blur" },
          { validator: filterEmail1, trigger: "change" },
        ],
        mailSenderPassword: [
          {
            required: true,
            message: "发件人密码不能为空",
            trigger: "blur",
          },
        ],
        jobType: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
      },
      checkForm: {
        attachName: "",
        context: "",
        mailTo: "",
        mailCc: "",
        subject: "",
        mainSign: "",
        exts: [],
        mailFrom: "",
        jobId: "",
        jobType: "",
        url: "",
        jobTime: "",
      },
      checkFormRules: {
        mailCc: [{ validator: filterEmail1, trigger: "change" }],
        mailTo: [
          { required: true, message: "收件人不能为空", trigger: "blur" },
          { validator: filterEmail, trigger: ["change", "blur"] },
        ],
        subject: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        context: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        mainSign: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        mailSender: [
          { required: true, message: "发件人地址不能为空", trigger: "blur" },
          { validator: filterEmail1, trigger: "change" },
        ],
      },
      checkJobName: "",
      jobTypeoOptions: [
        {
          value: "1",
          label: "每日",
        },
        {
          value: "2",
          label: "每周五",
        },
      ],

      sendTime: "",
      configDisabled: false,
      num: 0,
      num1: 0,
      textarea: "",
      defaultDate: new Date(),
      //邮件类型
      mailType: true,
      checkRow: "",
      mailPdfData: [],
      multipleSelection: [],
      //模板修改日志
      changeLogData: [],
      changeLogsValue: "",
      changeLogsOption: [{ value: "a02", label: "邮件模板" }],
      changeLog: {
        logItem1: "",
        logOperator: "",
        logTime: [],
      },
      Middle: "",
      EndTime: "",
      exporR: "",
      exporZ: "",
      errorResult: [],
      rightResult: [],
      dialogNumInput: "4",
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
      isError: true,
      //弹出层
      menuRoleVisible: false,
      dialogVisible: false,
      bookEdit: false,
      checkVisible: false,
      msgLoading: false,
      sendMiddleVisible: false,
      sendEndVisible: false,
      exporZVisible: false,
      exporRVisible: false,
      resDataVisible: false,
    };
  },
  // 获取初始数据
  created() {},
  mounted() {
    this.getData();
    this.convertTime();
  },
  // 定义方法
  methods: {
    //初始化请求表格数据
    getData() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getInfoDiscMail(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      });
    },
    batchOperate(command) {
      switch (command) {
        case "batch_remarks":
          this.exporRVisible = true;
          break;
        case "export_excel":
          this.exporZVisible = true;
          break;
      }
    },
    batchSend(command) {
      switch (command) {
        case "sendMidday":
          this.sendMiddleVisible = true;
          break;
        case "sendEnd":
          this.sendEndVisible = true;
          break;
      }
    },
    // 导出
    exporMiddle(type) {
      if (this.exporR == "" || this.exporR == null) {
        this.openTipBox("时间日期不能为空", this.tipType.error);
      } else {
        this.exporRVisible = false;
        window.location.href =
          this.$api.IP +
          "/infoDiscMail/dowMailList?endOrMiddle=" +
          "1" +
          "&&jobTime=" +
          this.exporR;
      }
    },
    exportEnd(type) {
      if (this.exporZ == "" || this.exporZ == null) {
        this.openTipBox("时间日期不能为空", this.tipType.error);
      } else {
        this.sendEndVisible = false;
        window.location.href =
          this.$api.IP +
          "/infoDiscMail/dowMailList?endOrMiddle=" +
          "2" +
          "&&jobTime=" +
          this.exporZ;
      }
    },
    sendMiddle() {
      if (this.Middle == "" || this.Middle == null) {
        this.openTipBox("时间日期不能为空", this.tipType.error);
      } else {
        this.errorResult = [];
        this.rightResult = [];
        this.sendMiddleVisible = false;
        let params = {
          endOrMiddle: "1",
          date: this.Middle,
        };
        getInfoDiscSendMailList(params).then((res) => {
          console.log(res);

          if (res.data.errorResult.length == "0") {
            this.openTipBox("一键发送成功", this.tipType.success);
          } else {
            this.errorResult = res.data.errorResult;
            this.resDataVisible = true;
          }
        });
      }
    },
    sendEnd() {
      if (this.EndTime == "" || this.EndTime == null) {
        this.openTipBox("时间日期不能为空", this.tipType.error);
      } else {
        this.errorResult = [];
        this.rightResult = [];
        this.sendEndVisible = false;
        let params = {
          endOrMiddle: "2",
          date: this.EndTime,
        };
        getInfoDiscSendMailList(params).then((res) => {
          console.log(res);
          if (res.data.errorResult.length == "0") {
            this.openTipBox("一键发送成功", this.tipType.success);
          } else {
            this.errorResult = res.data.errorResult;
            this.resDataVisible = true;
          }
        });
      }
    },
    //邮件配置
    mailConfig(row) {
      //时间段是否显示
      if (row.mailType == 2) {
        this.mailType = false;
      } else {
        this.mailType = true;
      }
      console.log(row);
      this.bookEdit = true;
      this.$nextTick(() => {
        this.resetForm("bookConfigForm");
      });
      let params = {
        jobId: row.id,
      };
      getInfoDiscMailConfig(params).then((res) => {
        let data = res.data;
        // console.log("==========================>" + data);
        this.bookConfig = {
          id: row.id,
          jobName: data.jobName, //任务名称
          mailTo: data.mailTo, //收件人
          mailCc: data.mailCc, //抄送人
          jobType: data.jobType, //发送类型
          jobCycle: data.jobCycle, //重复  下拉
          jobTime: data.jobTime, //发送时间
          sendDelay: data.sendDelay, //延迟发送
          jobParam: data.jobParam, //时间段
          mainSign: data.mainSign,
          mailSender: data.mailSender,
          mailSenderPassword: data.mailSenderPassword,
          userName: sessionStorage.getItem("name"),
        };
        const oldForm = {
          id: row.id,
          jobName: data.jobName, //任务名称
          mailTo: data.mailTo, //收件人
          mailCc: data.mailCc, //抄送人
          jobType: data.jobType, //发送类型
          jobCycle: data.jobCycle, //重复  下拉
          jobTime: data.jobTime, //发送时间
          sendDelay: data.sendDelay, //延迟发送
          jobParam: data.jobParam, //时间段
          mainSign: data.mainSign,
          mailSender: data.mailSender,
          mailSenderPassword: data.mailSenderPassword,
        };
        this.oldForm = oldForm;
        this.radioChange();
      });
    },

    //更新配置
    updateMail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bookEdit = false;
          let params = {
            old: this.oldForm,
            new: this.bookConfig,
          };
          //           id: this.bookConfig.id,
          // jobName: this.bookConfig.jobName, //任务名称
          // mailTo: this.bookConfig.mailTo, //收件人
          // mailCc: this.bookConfig.mailCc, //抄送人
          // jobType: this.bookConfig.jobType, //发送类型
          // jobCycle: this.bookConfig.jobCycle, //重复  下拉
          // jobTime: this.bookConfig.jobTime, //发送时间
          // sendDelay: this.bookConfig.sendDelay, //延迟发送
          // jobParam: this.bookConfig.jobParam, //时间段
          // mainSign: this.bookConfig.mainSign,
          // mailSender: this.bookConfig.mailSender,
          // mailSenderPassword: this.bookConfig.mailSenderPassword,
          getInfoDiscMailUpdateMail(params).then((res) => {
            console.log("==========================>" + res);
            if (res.data > 0) {
              this.$message.success("更新成功");
              this.getData();
            } else {
              this.$message.error("更新失败");
            }
          });
        } else {
          // this.$message.error("发送时间不能为空");
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    //控制配置项 disabled
    radioChange() {
      if (this.bookConfig.jobType == 2) {
        this.configDisabled = true;
        this.clearValidate("bookConfigForm");
      } else if (this.bookConfig.jobType == 1) {
        this.configDisabled = false;
      }
    },
    dateFormat(time) {
      console.log(time);
    },
    // 选择时间后查看信息
    checkTime(time) {
      if (this.timeValue == "" || this.timeValue == null) {
        this.openTipBox("时间日期不能为空", this.tipType.error);
      } else {
        this.dialogVisible = false;
        //查看 表格是否显示
        if (this.checkRow.mailType == 2) {
          this.mailType = false;
        } else {
          this.mailType = true;
        }

        let params = {
          id: this.id,
          jobTime: time,
          jobCycle: this.dialogNumInput,
        };
        getInfoDiscMailShowMail(params).then((res) => {
          this.checkVisible = true;
          this.$nextTick(() => {
            this.resetForm("checkForm");
            this.sendJson = res.data;
            console.log(this.sendJson);
            this.mailPdfData = res.data.exts;
            this.checkForm = {
              attachName: res.data.attachName,
              subject: res.data.subject,
              context: res.data.context,
              mailTo: res.data.mailTo,
              mailCc: res.data.mailCc,
              mainSign: res.data.mainSign,
              listingBusinessReport: res.data.listingBusinessReport,
              mailFrom: res.data.mailFrom,
              jobId: res.data.jobId,
              jobType: res.data.jobType,
              url: res.data.url,
              jobTime: res.data.jobTime,
            };
            if (res.data.jobType == 1) {
              console.log("定时发送");
              this.jobType = false;
            } else {
              console.log("一键发送");
              this.jobType = true;
            }
          });
        });
      }
    },
    /**
     * 选中某一行数据
     * @params val 当前选中的数据
     */
    handleSelectionChange(val) {
      // 记录当前选中的信息
      console.log(val);
      this.checkForm.exts = val;
    },

    /**
     *  邮件下载pdf
     * @parmas String group;  分组
     * @parmas String path;   路径
     * @parmas String fullName; 全称
     * @parmas String fileName; 文件名
     *
     */
    downLoadPdf(row) {
      console.log(row);

      window.location.href =
        this.$api.IP +
        "/mail/getMailFileSingle?group=" +
        row.group +
        "&&path=" +
        row.path +
        "&&fullName=" +
        row.fullName +
        "&&fileName=" +
        row.fileName;
    },
    //点击一键发送 Json字符串
    mailOneClickSend(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.msgLoading = true;
          getInfoDiscMailOneClickSend(this.checkForm).then((res) => {
            this.msgLoading = false;
            console.log(res);
            if (res.data == "一键发送邮件成功") {
              this.$message.success("一键发送邮件成功");
              this.checkVisible = false;
            } else {
              this.$message.error("一键发送邮件失败");
              this.checkVisible = true;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
      console.log(`当前页: ${val}`);
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.pageNum1 = 1;
      this.getMailData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.pageNum1 = val;
      this.getMailData();
      console.log(`当前页: ${val}`);
    },
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.pageNum2 = 1;
      this.getChangeLogs();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.getChangeLogs();
      console.log(`当前页: ${val}`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == "first") {
        this.getData();
      } else if (tab.name == "second") {
        this.getMailList();
        this.getMailData();
      } else if (tab.name == "changeLogs") {
        console.log(">>>>>>>", "模板修改日志");
        this.getChangeLogs();
      }
    },
    mailSearch() {
      this.pageNum1 = 1;
      this.getMailData();
    },
    changeLogSearch() {
      this.pageNum2 = 1;
      this.getChangeLogs();
    },
    getMailData() {
      let startSendTime = "";
      let endSendTime = "";
      if (this.input.sendTime == "" || this.input.sendTime == null) {
        startSendTime = "";
        endSendTime = "";
      } else {
        startSendTime = this.input.sendTime[0];
        endSendTime = this.input.sendTime[1];
      }
      let params = {
        pageNum: this.pageNum1,
        pageSize: this.pageSize1,
        jobName: this.valueOne,
        mailCc: this.input.mailCc,
        mailTo: this.input.mailTo,
        startSendTime: startSendTime,
        endSendTime: endSendTime,
      };
      getInfoDiscMailPaperList(params).then((res) => {
        console.log(res);
        this.tableData1 = res.data.list;
        this.totalCount1 = res.data.total;
      });
    },
    getMailList() {
      let params = {};
      getInfoDiscMail(params).then((res) => {
        console.log(res);
        this.optionOne = res.data.list;
        this.optionOne.unshift({ jobName: "", jobName: "全部" });
      });
    },
    getChangeLogs() {
      let logTimeStart = "";
      let logTimeEnd = "";
      if (this.changeLog.logTime == "" || this.changeLog.logTime == null) {
        logTimeStart = "";
        logTimeEnd = "";
      } else {
        logTimeStart = this.changeLog.logTime[0];
        logTimeEnd = this.changeLog.logTime[1];
      }
      let params = {
        moduleId: 30000,
        logType: this.changeLogsValue,
        logOperator: this.changeLog.logOperator,
        logItem1: this.changeLog.logItem1,
        logTimeStart: logTimeStart,
        logTimeEnd: logTimeEnd,
        pageNum: this.pageNum2,
        pageSize: this.pageSize2,
      };
      getSelectAllLog(params).then((res) => {
        console.log(res);
        this.changeLogData = res.list;
        this.totalCount2 = res.total;
      });
    },
    //重置搜索条件
    reset() {
      this.input = {
        mailCc: "",
        mailTo: "",
        sendTime: "",
      };
      this.valueOne = "";
      this.defaultDate = new Date();
    },
    changeLogReset() {
      this.changeLog = {
        logItem1: "",
        logOperator: "",
        logTime: [],
      };
      this.changeLogsValue = "";
      this.defaultDate = new Date();
    },
    // 操作 查看
    check(row) {
      this.checkRow = row;
      this.id = row.id;
      this.dialogVisible = true;
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

    // 点击返回
    back() {
      // 返回上一个页面
      this.$router.back(-1);
    },
    //计数器
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit12 {
  margin-top: -1px;
  padding: 20px;
  font-size: 12px;
  /deep/.el-dialog__body {
    padding: 20px 50px;
    justify-content: center;
    border-bottom: solid 1px #e8eaec;
    overflow: auto;
  }
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
    .el-button {
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
  .el-button.el-button--mini {
    border-radius: 5px !important;
  }
  a {
    color: blue;
  }
  .import {
    /deep/.el-dialog__body {
      padding: 20px;
    }
    .el-button {
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    .el-icon-upload2 {
      text-indent: 15px;
    }
    .el-upload__tip {
      margin-top: 15px;
    }
    .download {
      float: left;
      line-height: 34px;
      margin-left: 34px;
      font-weight: 700;
      color: blue;
      text-decoration: underline;
    }
    ul {
      text-align: left;
      margin: auto;
      li {
        list-style: none;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        line-height: 20px;
      }
      p {
        line-height: 50px;
      }
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
          border-radius: 5px !important;
        }
      }
      .toLead {
        padding: 0;
      }
    }

    /deep/.el-form-item {
      width: 100% !important;
    }
    /deep/.el-form {
      width: 100% !important;
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
    align-items: baseline;
    width: 300px;
    margin: 0 auto;
    margin-top: 5px;
    span {
      width: 100px;
      line-height: 36px;
    }
    .el-date-editor.el-input {
      width: 65% !important;
    }
  }
  .cz {
    color: #5882fa !important;
  }
  /deep/.el-input-number .el-input__inner {
    padding: 0;
  }
  /deep/.el-input-number--mini {
    line-height: 34px;
  }
  .work-title {
    width: 100%;
    line-height: 40px;
    text-align: center;
    background: #ff0000;
    color: #000;
    font-size: 22px;
    border: 1px solid #000;
    border-bottom: 0;
  }
  .workReport {
    .el-table {
      margin: 0;
    }
    .el-table td,
    .el-table th.is-leaf,
    .el-table--border,
    .el-table--group {
      border-color: black;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: black;
    }
    /deep/.el-table th > .cell {
      color: #fff !important;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    border: 1px solid #000;
    border-top: 0;
    padding: 0 15px 0 15px;
  }
  /deep/ .el-table {
    margin-top: 0;
  }
}
</style>
