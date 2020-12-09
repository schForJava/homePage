<template>
    <div class="edit12">
        <el-row class="count">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span class="count1">信用风险缓释凭证台账</span>
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
                <el-row class="topCentent" style="margin-top: 30px">
                    <el-col :span="8">
                        <label class="search-label">凭证全称：</label>
                        <el-input
                                placeholder="请输入"
                                v-model="input.voucherFullName"
                                clearable
                        ></el-input>
                    </el-col>
                    <el-col :span="8">
                        <label class="search-label">凭证簿记地点：</label>
                        <el-select
                                v-model="input.voucherBookkeepLocation"
                                placeholder="请选择"
                                clearable
                        >
                            <el-option
                                    v-for="(item, index) in voucherBookkeepLocationOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <label class="search-label">凭证簿记日：</label>
                        <el-date-picker
                                class="dateinterval"
                                value-format="yyyy-MM-dd"
                                v-model="input.voucherBookDate"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                </el-row>
                <!--输入框 -->
                <el-row class="topCentent" style="margin-top: 30px">
                    <el-col :span="8">
                        <label class="search-label">债券全称：</label>
                        <el-input
                                placeholder="请输入"
                                v-model="input.bondFullName"
                                clearable
                        ></el-input>
                    </el-col>
                    <el-col :span="8">
                        <label class="search-label">发行类型：</label>
                        <el-select v-model="input.issuerType" placeholder="请选择" clearable>
                            <el-option
                                    v-for="(item, index) in issuerTypeOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <label class="search-label">发行人：</label>
                        <el-input
                                placeholder="请输入"
                                v-model="input.issuer"
                                clearable
                        ></el-input>
                    </el-col>
                </el-row>
                <!--输入框 -->
                <el-row class="topCentent" style="margin-top: 30px">
                    <el-col :span="8">
                        <label class="search-label">债券缴款日：</label>
                        <el-date-picker
                                class="dateinterval"
                                value-format="yyyy-MM-dd"
                                v-model="input.bondPaymentStr"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                </el-row>
                <!-- 下半部分 -->
                <el-row class="bottomContent">
                    <div class="btns" style="margin-left: auto; margin-right: 10px">
                        <el-button type="primary" @click="bookSearch">查询</el-button>
                        <el-button plain @click="reset">重置</el-button>
                    </div>
                </el-row>
                <el-row class="bottomContent">
                    <el-col :span="12" class="btns">
                        <el-button type="primary" @click="Import">台账导入</el-button>
                        <el-button type="primary" @click="derive">台账导出</el-button>
                        <el-button type="primary" @click="addBook">新增台账</el-button>
                        <el-button type="primary" @click="editData('tableForm', isSaveBtn)">
                            <span v-if="isSaveBtn">保存</span>
                            <span v-else>编辑</span>
                        </el-button>
                        <el-button v-if="isSaveBtn" type="primary" @click="cancelEdit"
                        >取消编辑
                        </el-button
                        >
                        <!-- <el-button type="primary" @click="qx">取消</el-button> -->
                        <el-button type="primary" @click="bookDelete">删除</el-button>
                    </el-col>
                </el-row>

                <!--tab部分 -->

                <div class="tables">
                    <el-form
                            :model="tableForm"
                            ref="tableForm"
                            label-width="100px"
                            class="demo-ruleForm tableMagin"
                    >
                        <el-table
                                :data="tableForm.tableData"
                                style="width: 100%"
                                @selection-change="handleSelectionChange"
                                border
                                ref="table"
                        >
                            <el-table-column align="center" label="凭证信息">
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
                                        prop="voucherFullName"
                                        width="300"
                                        align="center"
                                        label="凭证全称"
                                        :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.voucherFullName"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.voucherFullName }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="voucherOrgName"
                                        width="150"
                                        align="center"
                                        label="凭证创设机构"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.voucherOrgName"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.voucherOrgName }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="voucherBookkeeper "
                                        width="150"
                                        align="center"
                                        label="凭证簿记管理人"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.voucherBookkeeper"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.voucherBookkeeper }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="voucherBookkeepLocation"
                                        width="150"
                                        align="center"
                                        label="凭证簿记地点"
                                >
                                    <template slot-scope="scope">
                                        <el-select
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.voucherBookkeepLocation"
                                                placeholder="请选择"
                                                @change="selectChange"
                                        >
                                            <el-option
                                                    v-for="(item, index) in voucherBookkeepLocationOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                        <span v-else>{{ scope.row.voucherBookkeepLocation }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="voucherBookkeepDate"
                                        width="150"
                                        align="center"
                                        label="凭证簿记日"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.voucherBookkeepDate"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.voucherBookkeepDate }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="voucherPaymentDate"
                                        width="150"
                                        align="center"
                                        label="凭证缴款日"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.voucherPaymentDate"
                                                placeholder="请输入内容"
                                        ></el-input>

                                        <span v-else>{{ scope.row.voucherPaymentDate }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="publisherName"
                                        width="150"
                                        align="center"
                                        label="凭证期限"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.publisherName"
                                                placeholder="请输入内容"
                                        ></el-input>

                                        <span v-else>{{ scope.row.publisherName }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="planCreationTotal"
                                        width="200"
                                        align="center"
                                        label="计划创设总额（亿元）"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="'tableData.' + scope.$index + '.planCreationTotal'"
                                                :rules="tableFormRules.planCreationTotal"
                                                v-if="scope.row.isEdit"
                                        >
                                            <el-input
                                                    v-model="scope.row.planCreationTotal"
                                                    placeholder="请输入内容"
                                            ></el-input>
                                        </el-form-item>
                                        <span v-else>{{ scope.row.planCreationTotal }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="actualCreationTotal"
                                        width="200"
                                        align="center"
                                        label="实际创设总额（亿元）"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="
                        'tableData.' + scope.$index + '.actualCreationTotal'
                      "
                                                :rules="tableFormRules.actualCreationTotal"
                                                v-if="scope.row.isEdit"
                                        >
                                            <el-input
                                                    v-model="scope.row.actualCreationTotal"
                                                    placeholder="请输入内容"
                                            ></el-input>
                                        </el-form-item>
                                        <span v-else>{{ scope.row.actualCreationTotal }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="voucherCreationPrice"
                                        width="200"
                                        align="center"
                                        label="凭证创设价格（%）"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="
                        'tableData.' + scope.$index + '.voucherCreationPrice'
                      "
                                                :rules="tableFormRules.voucherCreationPrice"
                                                v-if="scope.row.isEdit"
                                        >
                                            <el-input

                                                    v-model="scope.row.voucherCreationPrice"
                                                    placeholder="请输入内容"
                                            ></el-input>
                                        </el-form-item>
                                        <span v-else>{{ scope.row.voucherCreationPrice }}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="关联债券信息">
                                <el-table-column
                                        prop="bondRate"
                                        width="200"
                                        align="center"
                                        label="债券利率（%）"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="'tableData.' + scope.$index + '.bondRate'"
                                                :rules="tableFormRules.bondRate"
                                        >
                                            <el-input
                                                    v-if="scope.row.isEdit"
                                                    v-model="scope.row.bondRate"
                                                    placeholder="请输入内容"
                                            ></el-input>

                                            <span v-else>{{ scope.row.bondRate }}</span>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="bondSubscriptionMultiple"
                                        width="200"
                                        align="center"
                                        label="债券认购倍数"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="
                        'tableData.' +
                        scope.$index +
                        '.bondSubscriptionMultiple'
                      "
                                                :rules="tableFormRules.bondSubscriptionMultiple"
                                        >
                                            <el-input
                                                    v-if="scope.row.isEdit"
                                                    v-model="scope.row.bondSubscriptionMultiple"
                                                    placeholder="请输入内容"
                                            ></el-input>

                                            <span v-else>{{
                        scope.row.bondSubscriptionMultiple
                      }}</span>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="bondMarginalMultiple"
                                        width="200"
                                        align="center"
                                        label="债券边际倍数"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="
                        'tableData.' + scope.$index + '.bondMarginalMultiple'
                      "
                                                :rules="tableFormRules.bondMarginalMultiple"
                                        >
                                            <el-input
                                                    v-if="scope.row.isEdit"
                                                    v-model="scope.row.bondMarginalMultiple"
                                                    placeholder="请输入内容"
                                            ></el-input>

                                            <span v-else>{{ scope.row.bondMarginalMultiple }}</span>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="bondFullName"
                                        width="300"
                                        align="center"
                                        label="债券全称"
                                        :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="scope">
                    <span @click="addKeep(scope.row.voucherFullName)">
                      <div class="zqqc">
                        {{ scope.row.bondFullName }}
                      </div>
                    </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="bondType"
                                        width="150"
                                        align="center"
                                        label="债券类型"
                                >
                                    <template slot-scope="scope">
                                        <el-select
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.bondType"
                                                placeholder="请选择"
                                                @change="selectChange"
                                        >
                                            <el-option
                                                    v-for="(item, index) in bondTypeOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                        <span v-else>{{ scope.row.bondType }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="term"
                                        width="150"
                                        align="center"
                                        label="期限"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.term"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.term }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="issueAmount"
                                        width="150"
                                        align="center"
                                        label="发行金额（亿元）"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                                :prop="'tableData.' + scope.$index + '.issueAmount'"
                                                :rules="tableFormRules.issueAmount"
                                                v-if="scope.row.isEdit"
                                        >
                                            <el-input
                                                    v-model="scope.row.issueAmount"
                                                    placeholder="请输入内容"
                                            ></el-input>
                                        </el-form-item>
                                        <span v-else>{{ scope.row.issueAmount }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="issuerType"
                                        width="150"
                                        align="center"
                                        label="发行类型"
                                >
                                    <template slot-scope="scope">
                                        <el-select
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.issuerType"
                                                placeholder="请选择"
                                                @change="selectChange"
                                        >
                                            <el-option
                                                    v-for="(item, index) in issuerTypeOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                        <span v-else>{{ scope.row.issuerType }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="issuer"
                                        width="200"
                                        align="center"
                                        label="发行人"
                                        :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.issuer"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.issuer }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="leadUnderwriter"
                                        width="200"
                                        align="center"
                                        label="主承"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.leadUnderwriter"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.leadUnderwriter }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="issuerRating"
                                        width="200"
                                        align="center"
                                        label="发行人评级"
                                >
                                    <template slot-scope="scope">
                                        <el-select
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.issuerRating"
                                                placeholder="请选择"
                                                @change="selectChange"
                                        >
                                            <el-option
                                                    v-for="(item, index) in issuerRatingOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                        <span v-else>{{ scope.row.issuerRating }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="bondPaymentDateStr"
                                        width="200"
                                        align="center"
                                        label="债券缴款日"
                                >
                                    <template slot-scope="scope">
                                        <el-date-picker
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.bondPaymentDateStr"
                                                type="date"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                        <span v-else>{{ scope.row.bondPaymentDateStr }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="personCharge"
                                        width="200"
                                        align="center"
                                        label="负责人"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                                v-if="scope.row.isEdit"
                                                v-model="scope.row.personCharge"
                                                placeholder="请输入内容"
                                        ></el-input>
                                        <span v-else>{{ scope.row.personCharge }}</span>
                                    </template>
                                </el-table-column>
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
                <!-- 台账导入 -->
                <el-dialog
                        title="台账信用风险缓释凭证导入"
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
                        >
                            <el-button class="el-icon-upload2"
                            >&nbsp;&nbsp;上传文件
                            </el-button
                            >
                            <div slot="tip" class="el-upload__tip">
                                支持扩展名：.xls .xlsx ...
                            </div>
                        </el-upload>
                    </div>

                    <span slot="footer" class="dialog-footer">
            <span class="download" @click="deriveMb"
            >点击下载:台账信用风险缓释凭证导入模板.xlsx</span
            >
            <el-button @click="dialogVisible = false">取 消</el-button>
                        <!-- <el-button type="primary" @click="derive">确 定</el-button> -->
          </span>
                </el-dialog>
                <!--新增台账-->
                <el-dialog title="新增台账" :visible.sync="dialogFormVisible" customClass="customWidth"
                           :close-on-click-modal="false">
                    <el-form :model="addForm" label-position="left" size="medium" ref="addForm" :rules="tableFormRules"
                             label-width="30%">
                        <el-row class="topCentent" style="margin-top: 30px">
                            <el-col :span="12">
                                <el-form-item
                                        label="凭证全称："
                                        title="凭证全称"
                                >
                                    <el-input
                                            placeholder="请输入"
                                            v-model="addForm.voucherFullName"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                        label="凭证创设机构："
                                        title="凭证创设机构"
                                >
                                    <el-input
                                            placeholder="请输入"
                                            v-model="addForm.voucherOrgName"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--输入框 -->
                        <el-row class="topCentent" style="margin-top: 30px">
                            <el-col :span="12">
                                <label class="search-label" title="凭证簿记管理人">凭证簿记管理人：</label>
                                <el-input
                                        placeholder="请输入"
                                        v-model="addForm.voucherBookkeeper"
                                        clearable
                                ></el-input>
                            </el-col>
                            <el-col :span="12">
                                <label class="search-label" title="凭证簿记地点">凭证簿记地点：</label>
                                <el-select
                                        v-model="addForm.voucherBookkeepLocation"
                                        placeholder="请选择"
                                        clearable
                                >
                                    <el-option
                                            v-for="(item, index) in voucherBookkeepLocationOptions"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class="topCentent" style="margin-top: 30px">
                            <el-col :span="12">
                                <label class="search-label" title="凭证簿记日">凭证簿记日：</label>
                                <el-input
                                        placeholder="请输入"
                                        v-model="addForm.voucherBookkeepDate"
                                        clearable
                                ></el-input>
                            </el-col>
                            <el-col :span="12">
                                <label class="search-label" title="凭证缴款日">凭证缴款日：</label>
                                <el-input
                                        placeholder="请输入"
                                        v-model="addForm.voucherPaymentDate"
                                        clearable
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row class="topCentent" style="margin-top: 30px">
                            <el-col :span="12">
                                <label class="search-label" title="凭证期限">凭证期限：</label>
                                <el-input
                                        placeholder="请输入"
                                        v-model="addForm.publisherName"
                                        clearable
                                ></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                        prop="planCreationTotal"
                                        label="计划创设总额（亿元）:"
                                        title="计划创设总额（亿元）"
                                >
                                    <el-input
                                            placeholder="请输入"
                                            v-model="addForm.planCreationTotal"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="topCentent" style="margin-top: 30px">
                            <el-col :span="12">
                                <el-form-item
                                        prop="actualCreationTotal"
                                        label="实际创设总额（亿元）:"
                                        title="实际创设总额（亿元）"
                                >
                                    <el-input
                                            placeholder="请输入"
                                            v-model="addForm.actualCreationTotal"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                        prop="voucherCreationPrice"
                                        label="凭证创设价格（%）:"
                                        title="凭证创设价格（%）"
                                >
                                    <el-input
                                            placeholder="请输入"
                                            v-model="addForm.voucherCreationPrice"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="closeInfo('addForm')">取 消</el-button>
                        <el-button type="primary" @click="addinfo('addForm')">确 定</el-button>
                    </div>
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
                <!-- 新增弹窗 -->
                <el-dialog title="修改" :visible.sync="editVisible" width="40%">
                    <el-form
                            ref="auditAddForm"
                            :model="auditAddForm"
                            label-width="200px"
                            size="mini"
                    >
                        <el-row class="topCentent">
                            <el-col :span="18">
                                <el-form-item label="债券全称 ：" style="width: 300px">
                                    <el-select
                                            v-model="auditAddForm.aduitName"
                                            placeholder="请选择"
                                            filterable
                                            :filter-method="fullNameDataFilter"
                                            v-el-select-loadmore="fullNameLoadmore"
                                            @visible-change="clearFull"
                                            clearable
                                    >
                                        <el-option
                                                v-for="(item, index) in issuerFullNameOptions"
                                                :key="index"
                                                :label="item.bondFullName"
                                                :value="item.bondFullName"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="auditAddData('auditAddForm')"
            >确 定</el-button
            >
          </span>
                </el-dialog>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        getCreditVoucherSelectAll,
        getCreditVoucherEditCVou,
        getCreditVoucherSelectByFullName,
        getCreditVoucherDeleteList,
        getCreditVoucherCheckVou,
        addCreditVoucher,
        getCreditVoucherUpdateByFullName,
        getCreditVoucherSelectByCode, getAuditRecordsAddAuditRecords,
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
        directives: {
            "el-select-loadmore": {
                bind(el, binding) {
                    // 获取element-ui定义好的scroll盒子
                    const SELECTWRAP_DOM = el.querySelector(
                        ".el-select-dropdown .el-select-dropdown__wrap"
                    );
                    SELECTWRAP_DOM.addEventListener("scroll", function () {
                        /**
                         * scrollHeight 获取元素内容高度(只读)
                         * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                         * clientHeight 读取元素的可见高度(只读)
                         * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                         * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                         */
                        const condition =
                            this.scrollHeight - this.scrollTop <= this.clientHeight;
                        if (condition) {
                            binding.value();
                        }
                    });
                },
            },
        },
        data() {
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
                editVisible: false,
                errorData: false,
                //tab 切换
                activeName: "first",
                updateExclAll: this.$api.IP + "/creditVoucher/upload",
                //搜索条件
                input: {
                    voucherFullName: "",
                    voucherBookkeepLocation: "",
                    voucherBookDate: [],
                    bondFullName: "",
                    issuerType: "",
                    issuer: "",
                    bondPaymentStr: [],
                },

                auditAddForm: {
                    aduitName: "",
                },

                aduitNameOptions: [],
                tableForm: {
                    tableData: [
                        {
                            bondNum: 0,
                        },
                    ],
                },
                addForm: {
                    voucherFullName: "",
                    voucherOrgName: "",
                    voucherBookkeeper: "",
                    voucherBookkeepLocation: "",
                    voucherBookkeepDate: "",
                    voucherPaymentDate: "",
                    publisherName: "",
                    planCreationTotal: "",
                    actualCreationTotal: "",
                    voucherCreationPrice: "",
                },
                tableFormRules: {
                    voucherFullName: [
                        {
                            required: false,
                            message: "凭证全称不能为空",
                            trigger: "blur",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,6})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,6})$)|^(([1-9]+)$)?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    planCreationTotal: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,6})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,6})$)|^(([1-9]+)$)?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    actualCreationTotal: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,6})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,6})$)|^(([1-9]+)$)|未发行成功?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    voucherCreationPrice: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,4})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,4})$)|^(([1-9]+)$)|^无?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    bondRate: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,4})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,4})$)|^(([1-9]+)$)?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    bondSubscriptionMultiple: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,4})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,4})$)|^(([1-9]+)$)?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    bondMarginalMultiple: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,4})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,4})$)|^(([1-9]+)$)?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                    issueAmount: [
                        {
                            required: false,
                            message: "请输入数字",
                            trigger: "change",
                        },
                        {
                            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,6})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,6})$)|^(([1-9]+)$)?$/,
                            message: "请输入正确的数字",
                            trigger: "change",
                        },
                    ],
                },
                voucherBookkeepLocationOptions: [],
                bondTypeOptions: [],
                issuerTypeOptions: [],
                issuerRatingOptions: [],
                // 分页配置
                pageNum: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 0,
                // 个数选择器（可修改）
                pageSizes: [5, 10, 15, 20],
                // 默认每页显示的条数（可修改）
                pageSize: 5,
                fileResShow: false,
                // 记录当前编辑的是第几行
                currentEditNum: -1,
                // 记录当前多选按钮选中的数据
                // 是否为保存按钮
                isSaveBtn: false,
                selectedData: [],
                voucherFullName: "",
                issuerFullNameOptions: [],
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
                    idErrTip: "项目编号不能重复",

                    delSucTip: "删除成功",
                    delErrTip: "删除失败",
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

                dialogFormVisible: false,
                // 表格选中行数组
                multipleSelection: [],
                // 编辑时向后台传递的数组
                editForm: {},
            };
        },

        // 获取初始数据
        created() {
        },
        mounted() {
            this.getData();
            this.clearFull();
            this.getSelect();
        },

        // 定义方法
        methods: {
            //初始化表格数据
            getData() {
                let voucherBookDateStart = "";
                let voucherBookDateEnd = "";
                let bondPaymentStrStart = "";
                let bondPaymentStrEnd = "";
                if (
                    this.input.voucherBookDate == "" ||
                    this.input.voucherBookDate == null
                ) {
                    voucherBookDateStart = "";
                    voucherBookDateEnd = "";
                } else {
                    voucherBookDateStart = this.input.voucherBookDate[0];
                    voucherBookDateEnd = this.input.voucherBookDate[1];
                }
                if (
                    this.input.bondPaymentStr == "" ||
                    this.input.bondPaymentStr == null
                ) {
                    bondPaymentStrStart = "";
                    bondPaymentStrEnd = "";
                } else {
                    bondPaymentStrStart = this.input.bondPaymentStr[0];
                    bondPaymentStrEnd = this.input.bondPaymentStr[1];
                }

                let params = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    voucherFullName: this.input.voucherFullName,
                    voucherBookkeepLocation: this.input.voucherBookkeepLocation,
                    bondFullName: this.input.bondFullName,
                    issuerType: this.input.issuerType,
                    issuer: this.input.issuer,
                    voucherBookDateStart: voucherBookDateStart,
                    voucherBookDateEnd: voucherBookDateEnd,
                    bondPaymentStrStart: bondPaymentStrStart,
                    bondPaymentStrEnd: bondPaymentStrEnd,
                };

                getCreditVoucherSelectAll(params).then((res) => {
                    this.tableForm.tableData = res.data.list;
                    this.totalCount = res.data.total;
                });
            },
            //初始化下拉数据
            getSelect() {
                let params = {};
                getCreditVoucherSelectByCode(params).then((res) => {
                    this.bondTypeOptions = res.data.bondType;
                    this.issuerTypeOptions = res.data.issueType;
                    this.voucherBookkeepLocationOptions = res.data.location;
                    this.issuerRatingOptions = res.data.rating;
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
                let params = {pid};
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
                let voucherBookDateStart = "";
                let voucherBookDateEnd = "";
                let bondPaymentStrStart = "";
                let bondPaymentStrEnd = "";
                if (
                    this.input.voucherBookDate == "" ||
                    this.input.voucherBookDate == null
                ) {
                    voucherBookDateStart = "";
                    voucherBookDateEnd = "";
                } else {
                    voucherBookDateStart = this.input.voucherBookDate[0];
                    voucherBookDateEnd = this.input.voucherBookDate[1];
                }
                if (
                    this.input.bondPaymentStr == "" ||
                    this.input.bondPaymentStr == null
                ) {
                    bondPaymentStrStart = "";
                    bondPaymentStrEnd = "";
                } else {
                    bondPaymentStrStart = this.input.bondPaymentStr[0];
                    bondPaymentStrEnd = this.input.bondPaymentStr[1];
                }
                let params =
                    "?voucherFullName=" +
                    this.input.voucherFullName +
                    "&voucherBookkeepLocation=" +
                    this.input.voucherBookkeepLocation +
                    "&bondFullName=" +
                    this.input.bondFullName +
                    "&issuerType=" +
                    this.input.issuerType +
                    "&issuer=" +
                    this.input.issuer +
                    "&voucherBookDateStart=" +
                    voucherBookDateStart +
                    "&voucherBookDateEnd=" +
                    voucherBookDateEnd +
                    "&bondPaymentStrStart=" +
                    bondPaymentStrStart +
                    "&bondPaymentStrEnd=" +
                    bondPaymentStrEnd;
                window.location.href = this.$api.IP + "/creditVoucher/export" + params;
            },
            deriveMb() {
                window.location.href = this.$api.IP + "/creditVoucher/downMoudel";
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
                            if (
                                this.tableForm.tableData[this.currentEditNum].voucherFullName !=
                                null &&
                                this.tableForm.tableData[this.currentEditNum].voucherFullName !=
                                ""
                            ) {
                                let params = {
                                    id: this.tableForm.tableData[this.currentEditNum].id,
                                    voucherFullName: this.tableForm.tableData[this.currentEditNum]
                                        .voucherFullName,
                                };
                                getCreditVoucherCheckVou(params).then((res) => {
                                    if (res.data == "1") {
                                        //   // 调取接口
                                        // this.tableForm.tableData[this.currentEditNum].listedStatus = "申购中";
                                        // this.tableForm.tableData[this.currentEditNum].listedStatusCode = "";
                                        const params = this.tableForm.tableData[this.currentEditNum];
                                        getCreditVoucherEditCVou(params).then((res) => {
                                            this.tableForm.tableData[this.currentEditNum].isEdit = true;
                                            this.openTipBox(
                                                this.tipInfo.editSucTip,
                                                this.tipType.success
                                            );
                                            this.getData();
                                        });
                                        // }
                                        // 保存变编辑
                                        this.isSaveBtn = false;
                                        // input变成span
                                        this.tableForm.tableData[this.currentEditNum].isEdit = false;
                                        // 保存变编辑
                                        this.isSaveBtn = false;
                                        // input变成span
                                        this.tableForm.tableData[this.currentEditNum].isEdit = false;
                                    } else {
                                        this.openTipBox(this.tipInfo.idErrTip, this.tipType.warn);
                                    }
                                });
                            } else {
                                this.openTipBox("凭证全称不能为空", this.tipType.warn);
                            }
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
                    this.selectedData.forEach((item) => {
                        ids.push(item.id);
                    });
                    getCreditVoucherDeleteList(ids).then((res) => {
                        if (res.code == "000000") {
                            this.openTipBox(this.tipInfo.delSucTip, this.tipType.success);
                            this.getData();
                        } else {
                            this.openTipBox(this.tipInfo.delErrTip, this.tipType.error);
                        }
                    });
                }
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
            Import() {
                this.dialogVisible = true;

                this.$nextTick(() => {
                    this.$refs.upload.clearFiles();
                });
            },

            clearValidate(formName) {
                this.$refs[formName].clearValidate();
            },
            //上传文件
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
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
                this.input = {
                    productNum: "",
                    underbondFullname: "",
                    underbondShortname: "",
                    bondNum: "",
                    violateDefult: "",
                    tranferorNature: "",
                    successBidderNature: "",
                    dynamicQuoteDate: [],
                    settlementDate: [],
                    settlementType: "",
                };
            },
            addKeep(val) {
                this.voucherFullName = val;
                this.$nextTick(() => {
                    this.auditAddForm.aduitName = "";
                    this.editVisible = true;
                });
            },
            //新增后重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //特殊审计新增
            auditAddData(formName) {
                let params = {
                    bondFullName: this.auditAddForm.aduitName,
                    voucherFullName: this.voucherFullName,
                };
                getCreditVoucherUpdateByFullName(params).then((res) => {
                    this.getData();
                    this.openTipBox("修改成功", this.tipType.success);
                });
                this.editVisible = false;
                this.resetForm("auditAddForm");
            },
            clearFull(val) {
                console.log(val);
                if (!val) {
                    this.fullNameDataFilter();
                }
            },
            clearFilter(val) {
                console.log(val);
                if (!val) {
                    this.dataFilter();
                }
            },
            fullNameDataFilter(val) {
                this.issuerFullNameOptions = [];
                // this.sjInput.issuerFullName = val;
                this.nameData = {
                    pageNum: 1,
                    pageSize: 20,
                };
                this.getNameList(this.nameData, val);
                // this.sjInput.issuerFullName = "";
            },
            fullNameLoadmore() {
                this.nameData.pageNum++;
                this.getNameList(this.nameData);
            },
            getNameList(nameData, val) {
                console.log(val);
                let params = {
                    bondFullName: val,
                    nameData,
                };
                // 这里是接口请求数据, 带分页条件
                getCreditVoucherSelectByFullName(params).then((res) => {
                    console.log(res);
                    const _res = res.data; // 请求得到的数据
                    this.issuerFullNameOptions = [...this.issuerFullNameOptions, ..._res];
                });
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

            //tab 切换
            handleClick(tab, event) {
                this.bookLogData();
            },
            addBook() {
                this.dialogFormVisible = true;
            },
            addinfo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            voucherFullName: this.addForm.voucherFullName,
                            voucherOrgName: this.addForm.voucherOrgName,
                            voucherBookkeeper: this.addForm.voucherBookkeeper,
                            voucherBookkeepLocation: this.addForm.voucherBookkeepLocation,
                            voucherBookkeepDate: this.addForm.voucherBookkeepDate,
                            voucherPaymentDate: this.addForm.voucherPaymentDate,
                            publisherName: this.addForm.publisherName,
                            planCreationTotal: this.addForm.planCreationTotal,
                            actualCreationTotal: this.addForm.actualCreationTotal,
                            voucherCreationPrice: this.addForm.voucherCreationPrice,
                        }
                        if (params.voucherFullName == undefined || params.voucherFullName == "") {
                            this.$message({
                                type: 'info',
                                message: '凭证全称不能为空'
                            })
                        } else {
                            getCreditVoucherCheckVou(params).then((res) => {

                                if (res.data == "1") {
                                    addCreditVoucher(params).then((res) => {
                                        console.log(res)
                                        if (res.code == '000000') {
                                            this.$message({
                                                type: 'success',
                                                message: res.data
                                            })
                                            this.getData();
                                        } else {
                                            this.$message({
                                                type: 'info',
                                                message: '新增失败'
                                            })
                                        }
                                        this.dialogFormVisible = false;
                                        this.resetFormDate();
                                    });

                                } else {
                                    this.openTipBox(res.data, this.tipType.warn);
                                }
                            });

                        }

                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            closeInfo(formName) {
                    this.resetFormDate();
                    this.dialogFormVisible = false;

            },
            resetFormDate() {
                this.addForm.voucherFullName = "";
                this.addForm.voucherOrgName = "";
                this.addForm.voucherBookkeeper = "";
                this.addForm.voucherBookkeepLocation = "";
                this.addForm.voucherBookkeepDate = "";
                this.addForm.voucherPaymentDate = "";
                this.addForm.publisherName = "";
                this.addForm.planCreationTotal = "";
                this.addForm.actualCreationTotal = "";
                this.addForm.voucherCreationPrice = "";
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

        /deep/ .el-dialog__body {
            padding: 20px;
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

        .import {
            /deep/ .el-dialog__body {
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
                    padding-right: 30px;

                    .search-label {
                        width: 45%;
                        line-height: 36px;
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

                .searchBtns {
                    margin-left: auto;
                    margin-right: 10px;
                }

                .toLead {
                    padding: 0;
                }
            }

            .el-col {
                /deep/ .el-form-item {
                    width: 100% !important;
                    margin-left: 0px !important;
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

            .tables /deep/ .el-table__header-wrapper {
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

        .import {
            /deep/ .el-dialog__body {
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

        .zqqc {
            width: 100%;
            height: 30px;
        }

        .cz {
            color: #5882fa !important;
        }

        /deep/ .el-input-number .el-input__inner {
            padding: 0;
        }

        /deep/ .el-input-number--mini {
            line-height: 34px;
        }

        /deep/ .el-form-item__error {
            position: static;
            text-align: right;
            font-size: 11px;
        }

        .tableMagin /deep/ .el-form-item__content {
            margin: 0 !important;
        }

        /deep/ .el-form-item {
            margin: 0 !important;
        }

        /deep/ .customWidth {
            width: 75% !important;
        }

        /deep/ .el-form-item__label {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
        }
    }
</style>
<style lang="scss">
    .el-scrollbar .el-scrollbar__wrap {
        margin-bottom: 0 !important;
    }
</style>
