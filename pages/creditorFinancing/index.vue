<template>
  <div class="edit12">
    <el-row class="count">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="count1">债权融资计划-台账</span>
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
        <el-tab-pane label="台账管理" name="first">
          <!--输入框1 -->
          <el-row class="topCentent">
            <el-col :span="6">
              <label class="search-label">挂牌状态：</label>
              <el-select v-model="input.listedStatus" placeholder="请选择" clearable >
                <el-option
                  v-for="item in input.listedStatusOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.pcode"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label" style="">挂牌开始时间：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="input.listedStartdate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <label class="search-label">挂牌结束时间：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="input.listedEnddate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <label class="search-label">产品全称：</label>
              <el-input
                placeholder="请输入"
                v-model="input.productFullName"
                clearable
              ></el-input>
            </el-col>
          </el-row>
          <!--输入框2 -->
          <el-row class="topCentent" style="margin-top: 30px">
            <el-col :span="6">
              <label class="search-label">产品简称：</label>
              <el-input
                placeholder="请输入"
                v-model="input.productShortName"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">产品代码：</label>
              <el-input
                placeholder="请输入"
                v-model="input.productCode"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">挂牌管理人：</label>
              <el-input
                placeholder="请输入"
                v-model="input.bookManager"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">主承销商：</label>
              <el-input
                placeholder="请输入"
                v-model="input.leadUnderwriter"
                clearable
              ></el-input>
            </el-col>
          </el-row>
          <!--输入框3 -->
          <el-row class="topCentent" style="margin-top: 30px">
            <el-col :span="6">
              <label class="search-label">产品期限：</label>
              <el-input
                placeholder="请输入"
                v-model="input.productTimeLimit"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">期限单位：</label>
              <el-select v-model="input.timeUnit" placeholder="请选择" clearable >
                <el-option
                  v-for="item in input.timeUnitOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">缴款截止时间：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="input.paymentEndDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <label class="search-label">是否定向挂牌：</label>
              <el-select v-model="input.isDirectListed" placeholder="请选择" clearable >
                <el-option
                  v-for="item in input.isDirectListedOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!--输入框4 -->
          <el-row class="topCentent" style="margin-top: 30px">
            <el-col :span="6">
              <label class="search-label">是否含权：</label>
              <el-select v-model="input.isContainRight" placeholder="请选择" clearable >
                <el-option
                  v-for="item in input.isContainRightOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">是否分销：</label>
              <el-select v-model="input.isDistribution" placeholder="请选择" clearable >
                <el-option
                  v-for="item in input.isDistributionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>

            <el-col :span="6">
              <label class="search-label">是否挂牌金额 动态调整：</label>
              <el-select v-model="input.isAdjustAmount" placeholder="请选择" clearable >
                <el-option
                  v-for="item in input.isAdjustAmountOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">地区：</label>
              <el-select
                v-model="input.registeredProvince"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in input.registeredProvinceOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.pcode"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- 下半部分 -->
          <el-row class="bottomContent">
            <el-col :span="20"></el-col>
            <el-col :span="4" class="btns">
              <el-button type="primary" @click="bookSearch">查询</el-button>
              <el-button plain @click="reset">重置</el-button>
            </el-col>
          </el-row>
          <el-row class="bottomContent">
            <el-col :span="6" class="btns">
              <el-button type="primary" @click="Import">台账导入</el-button>
              <el-button type="primary" @click="derive">台账导出</el-button>
              <el-button
                type="primary"
                @click="editData('tableForm', isSaveBtn)"
              >
                <span v-if="isSaveBtn">保存</span>
                <span v-else>编辑</span>
              </el-button>
              <el-button v-if="isSaveBtn" type="primary" @click="cancelEdit"
                >取消编辑</el-button
              >
              <!-- <el-button type="primary" @click="qx">取消</el-button> -->
              <el-button type="primary" @click="bookDelete">删除</el-button>
            </el-col>
          </el-row>
          <!-- 倒计时 -->
          <div class="textInfo">
            <i class="el-icon-info"></i>
            您好！最新一次更新时间为{{ updateTime }}，下一次更新将在{{
              keepTime
            }}后
          </div>
          <el-form
            :model="input"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!--tab部分 -->
            <div class="tables">
              <el-form
                :model="tableForm"
                ref="tableForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-table
                  :data="tableForm.tableData"
                  v-loading="loading"
                  element-loading-text="台账更新中，请稍后"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  border
                  ref="table"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                    fixed
                    :selectable="selectEnable"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    prop="rowId"
                    align="center"
                    width="70px"
                    fixed
                  ></el-table-column>
                  <el-table-column
                    prop="listedStatus"
                    width="150"
                    align="center"
                    label="挂牌状态"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.listedStatus"
                        placeholder="请选择"
                        @change="selectChange"
                      >
                        <el-option
                          v-for="item in input.listedStatusOptions"
                          :key="item.pcode"
                          :label="item.name"
                          :value="item.pcode"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.listedStatus }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="listedStartdate1"
                    width="150"
                    align="center"
                    label="挂牌开始日期"
                  ></el-table-column>
                  <el-table-column
                    prop="listedEnddate1"
                    width="150"
                    align="center"
                    label="挂牌结束日期"
                  ></el-table-column>
                  <el-table-column
                    prop="productType"
                    width="150"
                    :show-overflow-tooltip="true"
                    align="center"
                    label="挂牌类型"
                  ></el-table-column>
                  <el-table-column
                    prop="productFullName"
                    width="300"
                    :show-overflow-tooltip="true"
                    label="产品全称"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="productShortName"
                    align="center"
                    :show-overflow-tooltip="true"
                    width="150"
                    label="产品简称"
                  ></el-table-column>
                  <el-table-column
                    prop="productCode"
                    align="center"
                    width="150"
                    label="产品代码"
                  ></el-table-column>
                  <el-table-column
                    prop="productBusiCode"
                    align="center"
                    width="150"
                    label="业务编号"
                  ></el-table-column>
                  <el-table-column
                    prop="bookManager"
                    align="center"
                    width="200"
                    label="挂牌管理人"
                  ></el-table-column>
                  <el-table-column
                    prop="leadUnderwriter"
                    align="center"
                    :show-overflow-tooltip="true"
                    width="200"
                    label="主承销商"
                  ></el-table-column>
                  <el-table-column
                    prop="otherUnderwriter"
                    align="center"
                    width="200"
                    label="副主承销商/联席主承销商"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.otherUnderwriter"
                        placeholder="请输入内容"
                      ></el-input>
                      <span v-else>{{ scope.row.otherUnderwriter }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="originalListAmountStr"
                    align="center"
                    width="200"
                    label="计划挂牌金额（万元）"
                  ></el-table-column>
                  <el-table-column
                    prop="listAmount"
                    align="center"
                    width="200"
                    label="实际挂牌金额（万元）"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'tableData.' + scope.$index + '.listAmount'"
                        :rules="tableFormRules.listAmount"
                      >
                        <el-input
                          v-if="scope.row.isEdit"
                          v-model="scope.row.listAmount"
                          placeholder="请输入内容"
                        ></el-input>

                        <span v-else>{{ scope.row.listAmountStr }}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sellerName"
                    width="250"
                    label="融资人全称"
                    align="center"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="enhanceOrgName"
                    width="250"
                    label="增进机构"
                    align="center"
                    :show-overflow-tooltip="true"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.enhanceOrgName"
                        placeholder="请输入内容"
                      ></el-input>
                      <span v-else>{{ scope.row.enhanceOrgName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="productTimeLimit"
                    align="center"
                    width="150"
                    label="产品期限"
                  ></el-table-column>
                  <el-table-column
                    prop="timeUnit"
                    align="center"
                    label="期限单位"
                  ></el-table-column>
                  <el-table-column
                    prop="listedPrice"
                    align="center"
                    width="200"
                    label="票面利率（%）/价格（元）"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'tableData.' + scope.$index + '.listedPrice'"
                        :rules="tableFormRules.listedPrice"
                      >
                        <el-input
                          v-if="scope.row.isEdit"
                          v-model="scope.row.listedPrice"
                        ></el-input>
                        <span v-else>{{ scope.row.listedPrice }}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="participantNum"
                    align="center"
                    width="150"
                    label="投资者数量"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.participantNum"
                        placeholder="请输入内容"
                        type="number"
                        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                        >></el-input
                      >
                      <span v-else>{{ scope.row.participantNum }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="paymentEndDate1"
                    align="center"
                    width="150"
                    label="缴款截至时间"
                  ></el-table-column>
                  <el-table-column
                    prop="principalRademption1"
                    align="center"
                    width="150"
                    label="本金兑付日"
                  ></el-table-column>
                  <el-table-column
                    prop="listedType"
                    align="center"
                    width="150"
                    label="挂牌方式"
                  ></el-table-column>
                  <el-table-column
                    prop="isDirectListed"
                    align="center"
                    width="150"
                    label="是否定向挂牌"
                  ></el-table-column>
                  <el-table-column
                    prop="isContainRight"
                    align="center"
                    width="150"
                    label="是否含权"
                  ></el-table-column>
                  <el-table-column
                    prop="isDistribution"
                    align="center"
                    width="150"
                    label="是否分销"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.isDistribution"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in input.isDistributionOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.isDistribution }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="isAdjustAmount"
                    align="center"
                    width="200"
                    label="是否挂牌金额动态调整"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.isAdjustAmount"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in input.isAdjustAmountOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.isAdjustAmount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sellerCreditGrade1"
                    align="center"
                    width="150"
                    label="主体评级"
                  ></el-table-column>
                  <el-table-column
                    prop="bondCreditGrade1"
                    align="center"
                    width="150"
                    label="债项评级"
                  ></el-table-column>
                  <el-table-column
                    prop="registeredProvince"
                    align="center"
                    width="250"
                    label="地区"
                  ></el-table-column>
                  <el-table-column
                    prop="nafmii1"
                    width="200"
                    align="center"
                    label="NAFMII行业（一级）"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.nafmii1"
                        placeholder="请选择"
                        @change="mafmii1Change(scope.row.nafmii1, 'nafmii1')"
                      >
                        <el-option
                          v-for="item in input.nafmii1Options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.pcode"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.nafmii1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="nafmii2"
                    width="200"
                    align="center"
                    label="NAFMII行业（二级）"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.nafmii2"
                        placeholder="请选择"
                        @change="mafmii1Change(scope.row.nafmii2, 'nafmii2')"
                      >
                        <el-option
                          v-for="item in input.nafmii2Options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.pcode"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.nafmii2 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="gjIndustry1"
                    width="200"
                    align="center"
                    label="国民经济行业（一级）"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.gjIndustry1"
                        placeholder="请选择"
                        @change="
                          mafmii1Change(scope.row.gjIndustry1, 'gjIndustry1')
                        "
                      >
                        <el-option
                          v-for="item in input.gjIndustry1Options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.pcode"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.gjIndustry1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="gjIndustry2"
                    align="center"
                    width="200"
                    label="国民经济行业（二级）"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-if="scope.row.isEdit"
                        v-model="scope.row.gjIndustry2"
                        placeholder="请选择"
                        @change="
                          mafmii1Change(scope.row.gjIndustry2, 'gjIndustry2')
                        "
                      >
                        <el-option
                          v-for="item in input.gjIndustry2Options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.pcode"
                        ></el-option>
                      </el-select>
                      <span v-else>{{ scope.row.gjIndustry2 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="remarks"
                    width="300"
                    label="备注"
                    :show-overflow-tooltip="true"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.remarks"
                        placeholder="请输入内容"
                      ></el-input>
                      <span v-else>{{ scope.row.remarks }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>

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
          </el-form>
          <!-- 台账导入 -->
          <el-dialog
            title="台账导入"
            class="import"
            :visible.sync="dialogVisible"
            width="25%"
          >
            <div class="dialog-body">
              <span>*附件上传 ：</span>
              <el-upload
                ref="upload"
                :limit="1"
                accept=".xlsx"
                class="upload-demo"
                :action="updateExclAll"
                :on-change="handleChange"
                :file-list="fileList"
                :on-progress="upLoading"
                :on-error="upError"
                :on-success="upSuccess"
                :clearFiles="upClear"
              >
                <el-button class="el-icon-upload2"
                  >&nbsp;&nbsp;上传文件</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  支持扩展名：.xls .xlsx ...
                </div>
              </el-upload>
            </div>

            <span slot="footer" class="dialog-footer">
              <span class="download" @click="deriveMb"
                >点击下载:债融台账导入模板.xlsx</span
              >
              <el-button @click="dialogVisible = false">取 消</el-button>
              <!-- <el-button type="primary" @click="derive">确 定</el-button> -->
            </span>
          </el-dialog>
          <!-- 导入失败数据 -->
          <el-dialog title="导入失败数据" :visible.sync="errorData" width="30%">
            <div class="dialog-body">
              <el-row>
                <div>
                  <ul>
                    <li v-for="(item, index) in fileRes" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="errorData = false">关 闭</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="second">
          <!--输入框1 -->
          <el-row class="topCentent">
            <el-col :span="6">
              <label class="search-label">操作类型：</label>
              <el-select v-model="logInput.logType" placeholder="请选择">
                <el-option
                  v-for="item in logInput.logTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search-label">操作人：</label>
              <el-input
                placeholder="请输入"
                v-model="logInput.logOperator"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">操作日期：</label>
              <el-date-picker
                class="dateinterval"
                value-format="yyyy-MM-dd"
                v-model="logInput.logTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <!--输入框4 -->
          <!--输入框1 -->
          <el-row class="topCentent" style="margin-top: 30px">
            <el-col :span="6">
              <label class="search-label">产品全称：</label>
              <el-input
                placeholder="请输入"
                v-model="logInput.logItem1"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">产品简称：</label>
              <el-input
                placeholder="请输入"
                v-model="logInput.logItem2"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6">
              <label class="search-label">产品代码：</label>
              <el-input
                placeholder="请输入"
                v-model="logInput.logItem3"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <!-- 下半部分 -->
          <el-row class="bottomContent">
            <el-col :span="20"></el-col>
            <el-col :span="4" class="btns">
              <el-button type="primary" @click="bookLogSearch">查询</el-button>
              <el-button plain @click="bookLogReset">重置</el-button>
            </el-col>
          </el-row>

          <!--tab部分 -->
          <div class="tables">
            <el-table
              :data="tableLogData"
              border
              style="width: 100%"
              @selection-change="logSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                label="序号"
                prop="rowId"
                align="center"
                width="70px"
              >
                <!-- <template slot-scope="scope">{{scope.$index+1}}</template> -->
              </el-table-column>
              <el-table-column prop="logType" width="150" label="操作类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.logType == '0'">编辑</span>
                  <span v-else-if="scope.row.logType == '1'">导出</span>
                  <span v-else-if="scope.row.logType == '2'">手工录入</span>
                  <span v-else-if="scope.row.logType == '3'">同步</span>
                  <span v-else>删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="logResult"
                width="150"
                label="操作结果"
              ></el-table-column>
              <el-table-column
                prop="logItem1"
                width="300"
                label="产品全称"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="logItem2"
                width="300"
                label="产品简称"
              ></el-table-column>
              <el-table-column
                prop="logItem3"
                width="200"
                label="产品代码"
              ></el-table-column>
              <el-table-column
                prop="logOperator"
                width="150"
                label="操作人"
              ></el-table-column>
              <el-table-column
                prop="logItem4"
                width="200"
                label="操作时间"
              ></el-table-column>
              <el-table-column
                prop="detail"
                label="操作详情"
                :show-overflow-tooltip="true"
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getWkbCbsStadBook,
  getStadBookPage,
  getSelectCode,
  getStadBookUpdate,
  getSelectAllLog,
  getStadBookDelete,
  getSelectCodeTwo,
  getWkbCbsStadBookSelectTime,
  selectTime,
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
    let validateLength = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (parseFloat(value) >= 50) {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("输入正确的数字"));
          }
        } else {
          var reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("输入正确的数字"));
          }
        }
      }
    };
    return {
      isSelect: true,
      // 上传文件
      fileList: [],
      fileRes: [],
      //弹出层
      loading: false,
      menuRoleVisible: false,
      dialogVisible: false,
      bookEditVisible: false,
      errorData: false,
      //tab 切换
      activeName: "first",
      updateExclAll:
        this.$api.IP +
        "/wkbCbsStadBook/updateExclAll?userName=" +
        sessionStorage.getItem("name"),
      // search 表格字段
      // 表格数据
      updateTime: "",
      updateTimeEnd: "",
      input: {
        listedStatus: "", //挂牌状态
        listedStatusOptions: "", //挂牌下拉
        //挂牌开始日期
        listedStartdate: [],
        listedStartdateStart: "",
        listedStartdateEnd: "",
        //挂牌结束日期
        listedEnddate: [],
        listedEnddateStart: "",
        listedEnddateEnd: "",
        productFullName: "", //产品全称
        productShortName: "", //产品简称
        productCode: "", //产品代码
        bookManager: "", //挂牌管理人
        leadUnderwriter: "", //主承销商
        productTimeLimit: "", //产品期限
        productTimeLimitOptions: "", //产品期限下拉
        timeUnit: "", //期限单位
        timeUnitOptions: "", //期限单位
        //缴款截止日期
        paymentEndDate: [],
        paymentEndDateStart: "",
        paymentEndDateEnd: "",
        isDirectListed: "", //是否定向挂牌
        isDirectListedOptions: [
          //是否含权下拉
          {
            value: "1",
            label: "是",
          },
          {
            value: "0",
            label: "否",
          },
        ], //是否定向挂牌下拉
        isContainRight: "", //是否含权
        isContainRightOptions: [
          //是否含权下拉
          {
            value: "1",
            label: "是",
          },
          {
            value: "0",
            label: "否",
          },
        ],
        isDistribution: "", //是否分销
        isDistributionOptions: [
          //是否分销下拉
          {
            value: "1",
            label: "是",
          },
          {
            value: "0",
            label: "否",
          },
        ],
        isAdjustAmount: "", //是否挂牌金额动态调整
        isAdjustAmountOptions: [
          //是否挂牌金额动态调整下拉
          {
            value: "1",
            label: "是",
          },
          {
            value: "0",
            label: "否",
          },
        ], //是否挂牌金额动态调整 下拉
        registeredProvince: "", //地区
        registeredProvinceOptions: "", //地区下拉
        nafmii1Options: "",
        nafmii2Options: "",
        gjIndustry1Options: "",
        gjIndustry2Options: "",
      },
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        num: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
      },
      // 分页配置
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 20,
      fileResShow: false,
      // 记录当前编辑的是第几行
      currentEditNum: -1,
      // 记录当前多选按钮选中的数据
      // 是否为保存按钮
      isSaveBtn: false,
      selectedData: [],
      strData: [],
      tableForm: {
        tableData: [],
      },
      tableFormRules: {
        listAmount: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确的数字",
            trigger: "change",
          },
        ],
        listedPrice: [
          {
            required: false,
            message: "请输入数字",
            trigger: "change",
          },
          { validator: validateLength, trigger: "change" },
        ],
      },
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

      // 表格选中行数组
      multipleSelection: [],
      // 编辑时向后台传递的数组
      editForm: {},

      // 操作日志配置
      tableLogData: [],
      logSelectArr: [],
      logTableDel: [],
      logInput: {
        logType: "",
        logTypeOptions: [
          {
            value: "0",
            label: "编辑",
          },
          {
            value: "1",
            label: "导出",
          },
          {
            value: "2",
            label: "手工录入",
          },
          {
            value: "3",
            label: "同步",
          },
          {
            value: "4",
            label: "删除",
          },
        ],
        logResult: "",
        logItem1: "",
        logItem2: "",
        logItem3: "",
        logOperator: "",
        logTime: "",
        detail: "",
      },
      // 分页配置
      pageNum1: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount1: 0,
      // 个数选择器（可修改）
      pageSizes1: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      pageSize1: 5,
      //倒计时
      d: "",
      h: "",
      m: "",
      s: "",
      keepTime: "",
      miao: "",
      time: "",
      listuser: "",
    };
  },

  // 获取初始数据
  created() {},
  mounted() {
    this.getData();
    this.getSelect();
    this.convertTime();
    this.bookCount();
  },

  // 定义方法
  methods: {
    //初始化表格数据
    getData() {
      let listedStartdateStart = "";
      let listedStartdateEnd = "";
      let listedEnddateStart = "";
      let listedEnddateEnd = "";
      let paymentEndDateStart = "";
      let paymentEndDateEnd = "";
      if (
        this.input.listedStartdate == "" ||
        this.input.listedStartdate == null
      ) {
        listedStartdateStart = "";
        listedStartdateEnd = "";
      } else {
        listedStartdateStart = this.input.listedStartdate[0];
        listedStartdateEnd = this.input.listedStartdate[1];
      }
      if (this.input.listedEnddate == "" || this.input.listedEnddate == null) {
        listedEnddateStart = "";
        listedEnddateEnd = "";
      } else {
        listedEnddateStart = this.input.listedEnddate[0];
        listedEnddateEnd = this.input.listedEnddate[1];
      }
      if (
        this.input.paymentEndDate == "" ||
        this.input.paymentEndDate == null
      ) {
        paymentEndDateStart = "";
        paymentEndDateEnd = "";
      } else {
        paymentEndDateStart = this.input.paymentEndDate[0];
        paymentEndDateEnd = this.input.paymentEndDate[1];
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        listedStatus: this.input.listedStatus,
        listedStartdateStart: listedStartdateStart,
        listedStartdateEnd: listedStartdateEnd,
        listedEnddateStart: listedEnddateStart,
        listedEnddateEnd: listedEnddateEnd,
        paymentEndDateStart: paymentEndDateStart,
        paymentEndDateEnd: paymentEndDateEnd,
        productFullName: this.input.productFullName,
        productShortName: this.input.productShortName,
        productCode: this.input.productCode,
        bookManager: this.input.bookManager,
        leadUnderwriter: this.input.leadUnderwriter,
        productTimeLimit: this.input.productTimeLimit,
        timeUnit: this.input.timeUnit,
        isDirectListed: this.input.isDirectListed,
        isContainRight: this.input.isContainRight,
        isDistribution: this.input.isDistribution,
        isAdjustAmount: this.input.isAdjustAmount,
        registeredProvince: this.input.registeredProvince,
      };

      getStadBookPage(params).then((res) => {
        this.tableForm.tableData = res.list;
        this.totalCount = res.total;
        //  this.tableForm.tableData.forEach( (item,index)=>{
        //    item.listedPrice = item.listedPrice.toFixed(3)
        //  })
      });
    },

    //初始化下拉数据
    getSelect() {
      let params = {};
      getSelectCode(params).then((res) => {
        this.input.listedStatusOptions = res.gpstatus;
        this.input.timeUnitOptions = res.dateutie;
        this.input.registeredProvinceOptions = res.pacecode;
        this.input.nafmii1Options = res.naffii1;
        this.input.gjIndustry1Options = res.gmjj1;
      });
    },

    //台账更新 倒计时
    bookCount() {
      var url = this.$api.IP + "/wkbCbsStadBook/selectTime";
      var slef = this;
      selectTime().then((res) => {
        slef.listuser = res.data;
        //200表示成功
        slef.updateTime = slef.listuser.ext2;
        slef.miao = slef.listuser.logItem3;
        slef.time = setInterval(slef.showTime, 1000);
      });
    },

    showTime() {
      this.miao -= 1;
      if (this.miao <= 0) {
        clearInterval(this.time);
        this.bookCount();
      } else {
        this.formatSeconds(this.miao);
      }
    },
    formatSeconds(value) {
      var theTime = parseInt(value); // 秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }
      var result = "" + parseInt(theTime) + "秒";
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
      }
      if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
      }
      this.keepTime = result;
    },
    //编辑后下拉联动
    mafmii1Change(rowId, selectId) {
      let pid = rowId;
      let params = { pid };
      let options = [];
      if (selectId == "nafmii1") {
        this.tableForm.tableData[this.currentEditNum].nafmii2 = "";
        this.tableForm.tableData[this.currentEditNum].nafmii1Code = "";
        getSelectCodeTwo(params).then((res) => {
          this.input.nafmii2Options = res.two;
        });
      } else if (selectId == "gjIndustry1") {
        this.tableForm.tableData[this.currentEditNum].gjIndustry2 = "";
        this.tableForm.tableData[this.currentEditNum].gjIndustry1Code = "";
        getSelectCodeTwo(params).then((res) => {
          this.input.gjIndustry2Options = res.two;
        });
      } else if (selectId == "nafmii2") {
        this.tableForm.tableData[this.currentEditNum].nafmii2Code = "";
      } else if (selectId == "gjIndustry2") {
        this.tableForm.tableData[this.currentEditNum].gjIndustry2Code = "";
      }
    },

    /**
     * 搜索表格数据
     */
    bookSearch() {
      this.pageNum = 1;
      this.getData();
      this.isSaveBtn = false;
    },
    //导出功能
    derive() {
      let listedStartdateStart = "";
      let listedStartdateEnd = "";
      let listedEnddateStart = "";
      let listedEnddateEnd = "";
      let paymentEndDateStart = "";
      let paymentEndDateEnd = "";
      if (
        this.input.listedStartdate == "" ||
        this.input.listedStartdate == null
      ) {
        listedStartdateStart = "";
        listedStartdateEnd = "";
      } else {
        listedStartdateStart = this.input.listedStartdate[0];
        listedStartdateEnd = this.input.listedStartdate[1];
      }
      if (this.input.listedEnddate == "" || this.input.listedEnddate == null) {
        listedEnddateStart = "";
        listedEnddateEnd = "";
      } else {
        listedEnddateStart = this.input.listedEnddate[0];
        listedEnddateEnd = this.input.listedEnddate[1];
      }
      if (
        this.input.paymentEndDate == "" ||
        this.input.paymentEndDate == null
      ) {
        paymentEndDateStart = "";
        paymentEndDateEnd = "";
      } else {
        paymentEndDateStart = this.input.paymentEndDate[0];
        paymentEndDateEnd = this.input.paymentEndDate[1];
      }
      //  params: {
      //       listedStatus: this.input.listedStatus,
      //       listedStartdateStart: listedStartdateStart,
      //       listedStartdateEnd: listedStartdateEnd,
      //       listedEnddateStart: listedEnddateStart,
      //       listedEnddateEnd: listedEnddateEnd,
      //       paymentEndDateStart: paymentEndDateStart,
      //       paymentEndDateEnd: paymentEndDateEnd,
      //       productFullName: this.input.productFullName,
      //       productShortName: this.input.productShortName,
      //       productCode: this.input.productCode,
      //       bookManager: this.input.bookManager,
      //       leadUnderwriter: this.input.leadUnderwriter,
      //       productTimeLimit: this.input.productTimeLimit,
      //       timeUnit: this.input.timeUnit,
      //       isDirectListed: this.input.isDirectListed,
      //       isContainRight: this.input.isContainRight,
      //       isDistribution: this.input.isDistribution,
      //       isAdjustAmount: this.input.isAdjustAmount,
      //       registeredProvince: this.input.registeredProvince,
      //     },
      window.location.href =
        this.$api.IP +
        "/wkbCbsStadBook/downExclAll?listedStatus=" +
        this.input.listedStatus +
        "&&listedStartdateStart=" +
        listedStartdateStart +
        "&&listedStartdateEnd=" +
        listedStartdateEnd +
        "&&listedEnddateStart=" +
        listedEnddateStart +
        "&&listedEnddateEnd=" +
        listedEnddateEnd +
        "&&paymentEndDateStart=" +
        paymentEndDateStart +
        "&&paymentEndDateEnd=" +
        paymentEndDateEnd +
        "&&productFullName=" +
        this.input.productFullName +
        "&&productShortName=" +
        this.input.productShortName +
        "&&productCode=" +
        this.input.productCode +
        "&&bookManager=" +
        this.input.bookManager +
        "&&leadUnderwriter=" +
        this.input.leadUnderwriter +
        "&&productTimeLimit=" +
        this.input.productTimeLimit +
        "&&timeUnit=" +
        this.input.timeUnit +
        "&&isDirectListed=" +
        this.input.isDirectListed +
        "&&isContainRight=" +
        this.input.isContainRight +
        "&&isDistribution=" +
        this.input.isDistribution +
        "&&isAdjustAmount=" +
        this.input.isAdjustAmount +
        "&&registeredProvince=" +
        this.input.registeredProvince +
        "&&userName=" +
        sessionStorage.getItem("name");
      let params = {};
    },
    deriveMb() {
      window.location.href = this.$api.IP + "/wkbCbsStadBook/downMoudel";
    },
    /**
     * 对比数据是否发生变化
     */
    contrastData(info, key) {
      if (info === this.selectedData[0][key]) {
        delete this.editForm[key];
      } else {
        this.editForm[key] = info;
      }
    },

    /**
       * 选中某一行数据
       @params val 当前选中的数据
       */
    handleSelectionChange(val) {
      // 记录当前选中的信息
      this.selectedData = JSON.parse(JSON.stringify(val));
      // 记录当前选中的是那一行
      this.currentEditNum = this.tableForm.tableData.indexOf(val[0]);
    },

    /**
     * 是否可编辑
     */
    selectEnable(data) {
      if (this.isSaveBtn) {
        return false;
      } else {
        return true;
      }
    },
    selectChange(val) {
      this.isSelect = false;
      this.tableForm.tableData[this.currentEditNum].listedStatusCode = "";
    },
    // qx() {
    //   // 保存变编辑
    //   this.isSaveBtn = false;
    //   // input变成span
    //   this.tableForm.tableData[this.currentEditNum].isEdit = false;
    // },
    /**
     * 编辑数据
     */
    editData(formName) {
      // 保存
      if (this.isSaveBtn) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //   // 调取接口
            // this.tableForm.tableData[this.currentEditNum].listedStatus = "申购中";
            // this.tableForm.tableData[this.currentEditNum].listedStatusCode = "";
            this.tableForm.tableData[
              this.currentEditNum
            ].userName = sessionStorage.getItem("name");
            const params = this.tableForm.tableData[this.currentEditNum];
            getStadBookUpdate(params).then((res) => {
              this.tableForm.tableData[this.currentEditNum].isEdit = true;
              this.openTipBox(this.tipInfo.editSucTip, this.tipType.success);
              this.getData();
            });
            // }
            // 保存变编辑
            this.isSaveBtn = false;
            // input变成span
            this.tableForm.tableData[this.currentEditNum].isEdit = false;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        // 编辑
        if (this.selectedData.length !== 1) {
          this.openTipBox(this.tipInfo.editTip, this.tipType.warn);
        } else {
          this.tableForm.tableData[this.currentEditNum].isEdit = true;
          // 编辑变保存
          this.isSaveBtn = true;
        }
      }
    },

    /**
     * 取消编辑
     */
    cancelEdit() {
      for (var i in this.tableForm.tableData[this.currentEditNum]) {
        if (i !== "id" && i !== "isEdit") {
          if (
            this.selectedData[0][i] !==
            this.tableForm.tableData[this.currentEditNum][i]
          ) {
            this.tableForm.tableData[this.currentEditNum][
              i
            ] = this.selectedData[0][i];
          }
        }
      }
      this.clearValidate("tableForm");
      // 显示取消编辑
      this.isSaveBtn = false;
      // input变成span
      this.tableForm.tableData[this.currentEditNum].isEdit = false;
    },
    /**
     * 批量删除
     */
    bookDelete() {
      let ids = [];
      // 删除
      if (this.selectedData.length == 0) {
        this.openTipBox(this.tipInfo.deleteTip, this.tipType.warn);
      } else {
        let code = true;
        this.selectedData.forEach((item) => {
          ids.push(item.id);
          if (item.srcSysCd != "3") {
            7;
            code = false;
          }
        });
        if (code == true) {
          // 调取接口
          let params = {
            userName: sessionStorage.getItem("name"),
            ids,
          };
          getStadBookDelete(params).then((res) => {
            if (res.code == "000000") {
              this.openTipBox(this.tipInfo.delSucTip, this.tipType.success);
              this.getData();
            } else {
              this.openTipBox(this.tipInfo.delErrTip, this.tipType.error);
            }
          });
        } else {
          this.openTipBox(
            "选中的数据有非手工录入,请重新选择",
            this.tipType.error
          );
        }
      }
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    /**操作日志模块 */
    bookLogData() {
      let logTimeStart = "";
      let logTimeEnd = "";

      if (this.logInput.logTime == "" || this.logInput.logTime == null) {
        logTimeStart = "";
        logTimeEnd = "";
      } else {
        logTimeStart = this.logInput.logTime[0];
        logTimeEnd = this.logInput.logTime[1];
      }
      let params = {
        pageNum: this.pageNum1,
        pageSize: this.pageSize1,
        logType: this.logInput.logType,
        logItem1: this.logInput.logItem1,
        logItem2: this.logInput.logItem2,
        logItem3: this.logInput.logItem3,
        logOperator: this.logInput.logOperator,
        logTimeStart: logTimeStart,
        logTimeEnd: logTimeEnd,
        moduleId: 10000,
      };
      getSelectAllLog(params).then((res) => {
        this.tableLogData = res.list;
        this.totalCount1 = res.total;
      });
    },

    /**
     * 操作日志删除操作
     * @params ids Array 删除id
     */
    logDel() {
      this.$message.error("暂时没写");
    },

    /**
       * 选中某一行数据
       @params val 当前选中的数据
       */
    logSelectionChange(val) {
      this.logSelectArr = val;
      this.logTableDel = [];
      if (this.logSelectArr.length != 0) {
        this.logSelectArr.forEach((item) => {
          this.logTableDel.push(item.id);
        });
      }
    },
    /**
     * 操作日志查询
     */
    bookLogSearch() {
      this.pageNum1 = 1;
      this.bookLogData();
    },

    /**
     * 操作日志重置搜索条件
     */
    bookLogReset() {
      this.logInput = {
        logType: "",
        logTypeOptions: [
          {
            value: "0",
            label: "编辑",
          },
          {
            value: "1",
            label: "导出",
          },
          {
            value: "2",
            label: "手工录入",
          },
        ],
        logResult: "",
        logItem1: "",
        logItem2: "",
        logItem3: "",
        logOperator: "",
        logTime: "",
        detail: "",
      };
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
    //转换日期格式
    convertTime() {
      this.timeValue = new Date();
      var d = new Date(this.timeValue);
      var yue =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      var re = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
      var youWant = d.getFullYear() + "-" + yue + "-" + re;
      this.timeValue = youWant;
    },
    //上传文件
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    Import() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.upload.clearFiles();
      });
    },
    //清空上传列表
    upClear() {},
    //上传成功
    upSuccess() {
      this.fileRes = this.fileList[0].response.data;
      if (this.fileRes.length > 0) {
        this.errorData = true;
      } else {
        this.openTipBox("数据导入成功", this.tipType.success);
      }
      this.$nextTick(() => {
        this.$refs.upload.clearFiles();
      });
      this.dialogVisible = false;
      this.getData();
    },
    //上传中
    upLoading() {
      console.log("上传中");
    },
    //上传失败
    upError() {
      console.log("上传失败");
    },
    //重置搜索条件
    reset() {
      this.input.listedStatus = ""; //挂牌状态
      //挂牌开始日期
      this.input.listedStartdate = [];
      this.input.listedStartdateStart = "";
      this.input.listedStartdateEnd = "";
      //挂牌结束日期
      this.input.listedEnddate = [];
      this.input.listedEnddateStart = "";
      this.input.listedEnddateEnd = "";
      this.input.productFullName = ""; //产品全称
      this.input.productShortName = ""; //产品简称
      this.input.productCode = ""; //产品代码
      this.input.bookManager = ""; //挂牌管理人
      this.input.leadUnderwriter = ""; //主承销商
      this.input.productTimeLimit = ""; //产品期限
      this.input.timeUnit = ""; //期限单位
      //缴款截止日期
      this.input.paymentEndDate = [];
      this.input.paymentEndDateStart = "";
      this.input.paymentEndDateEnd = "";
      this.input.isDirectListed = ""; //是否定向挂牌
      this.input.isDirectListedOptions = [
        //是否含权下拉
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ]; //是否定向挂牌下拉
      this.input.isContainRight = " "; //是否含权
      this.input.isContainRightOptions = [
        //是否含权下拉
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ];
      this.input.isDistribution = " "; //是否分销
      this.input.isDistributionOptions = [
        //是否分销下拉
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ];
      this.input.isAdjustAmount = ""; //是否挂牌金额动态调整
      this.input.isAdjustAmountOptions = [
        //是否挂牌金额动态调整下拉
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ]; //是否挂牌金额动态调整 下拉
      this.input.registeredProvince = " "; //地区
      this.getSelect();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum = 1;
      this.isSaveBtn = false;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.isSaveBtn = false;
      this.getData();
    },
    //分页
    handleSizeChange1(val) {
      this.pageSize1 = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum1 = 1;
      this.bookLogData();
    },
    handleCurrentChange1(val) {
      this.pageNum1 = val;
      this.bookLogData();
    },
    //tab 切换
    handleClick(tab, event) {
      this.bookLogData();
    },

    /**
     * 台账倒计时
     */
    // countTime() {
    //   //获取当前时间
    //   var date = new Date();
    //   var now = date.getTime();
    //   //设置截止时间
    //   var endDate = new Date(this.updateTimeEnd);
    //   var end = endDate.getTime();
    //   //时间差
    //   var leftTime = end - now;
    //   //定义变量 d,h,m,s保存倒计时的时间
    //   if (leftTime > 0) {
    //     // this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
    //     // this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
    //     this.m = Math.floor((leftTime / 1000 / 60) % 60);
    //     this.s = Math.floor((leftTime / 1000) % 60);
    //   }
    //   console.log(leftTime);
    //   console.log(this.updateTimeEnd);

    //   // if (this.updateTimeEnd != undefined) {
    //   //   //递归每秒调用countTime方法，显示动态时间效果
    //   setTimeout(this.countTime(), 10000);
    //   // }
    // },
    // updateData() {
    //   if (this.m == 0) {
    //     if (this.s == 0) {
    //       this.bookCount();
    //     }
    //   }
    //   setTimeout(this.updateData, 1000);
    // },

    // timeDown() {
    //   const endTime = new Date(this.updateTimeEnd);
    //   const nowTime = new Date();
    //   let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
    //   let d = parseInt(leftTime / (24 * 60 * 60));
    //   let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
    //   let m = this.formate(parseInt((leftTime / 60) % 60));
    //   let s = this.formate(parseInt(leftTime % 60));
    //   if (leftTime <= 0) {
    //     this.bookCount();
    //   }
    //   this.keepTime = `${m}分${s}`;
    // },
    // formate(time) {
    //   if (time >= 10) {
    //     return time;
    //   } else {
    //     return `0${time}`;
    //   }
    // },
    // 点击返回
    back() {
      // 返回上一个页面
      this.$router.back(-1);
    },
  },
  beforeDestroy() {
    clearInterval(this.time); //关闭
  },
};
</script>

<style lang="scss" scoped>
.edit12 {
  margin-top: -1px;
  padding: 20px;
  font-size: 12px;
  /deep/.el-dialog__body {
    padding: 20px;
    justify-content: center;
    border-bottom: solid 1px #e8eaec;
    overflow: auto;
  }
  .textInfo {
    padding-left: 10px;
    margin: 15px 0;
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
  .import {
    /deep/.el-dialog__body {
      display: flex;
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

    .el-col {
      /deep/.el-form-item {
        width: 100% !important;
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
    justify-content: baseline;
    align-items: baseline;
    width: 300px;
    span {
      width: 100px;
      line-height: 36px;
    }
    .upload-demo {
      width: 150px;
    }
  }
  /deep/ .el-form-item__error {
    position: static;
    text-align: right;
    font-size: 11px;
  }
  /deep/ .el-form-item__content {
    margin: 0 !important;
  }
  /deep/ .el-form-item {
    margin: 0 !important;
  }
}
</style>
<style lang="scss">
.el-scrollbar .el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
</style>
