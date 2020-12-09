<template>
    <div class="edit12">
        <el-row class="count">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span class="count1">备案确认情况</span>
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
                <el-tab-pane label="备案确认" name="first">
                    <!--输入框1 -->
                    <el-form
                            :model="input"
                            ref="ruleForm"
                            label-width="150px"
                            class="demo-ruleForm"
                    >
                        <el-row class="topCentent">
                            <el-col :span="8">
                                <el-form-item label="提交时间：">
                                    <el-date-picker
                                            v-model="input.submitTime"
                                            type="datetimerange"
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            value="yyyy-MM-dd HH:mm:ss"
                                            :default-value="defaultDate"
                                    ></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="定期披露：">
                                    <el-date-picker
                                            v-model="input.timingTime"
                                            type="datetimerange"
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            value="yyyy-MM-dd HH:mm:ss"
                                            :default-value="defaultDate"
                                    ></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="topCentent">
                            <el-col :span="6">
                                <el-form-item label="主承全称：">
                                    <el-input
                                            placeholder="请输入"
                                            v-model="input.leadName"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="债券全称：">
                                    <el-input
                                            placeholder="请输入"
                                            v-model="input.bondName"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="品种：">
                                    <el-select v-model="value" placeholder="请选择" clearable >
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="6">
                            <label class="search-label">备注：</label>
                            <el-input placeholder="请输入" v-model="input.remarks" clearable></el-input>
                            </el-col>-->
                        </el-row>
                    </el-form>

                    <!-- 下半部分 -->
                    <el-row class="bottomContent">
                        <div class="searchBtns btns">
                            <el-button type="primary" @click="search">查询</el-button>
                            <el-button type="primary" @click="Import">导入</el-button>
                            <el-button type="primary" @click="derive">导出</el-button>
                            <el-button plain @click="reset">重置</el-button>
                        </div>
                    </el-row>
                    <el-dialog
                            title="备案确认情况导入"
                            class="import"
                            :visible.sync="ImportVisible"
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
              >点击下载:备案确认情况导入模板.xlsx</span
              >
              <el-button @click="ImportVisible = false">取 消</el-button>
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
                                    width="70"
                                    align="center"
                                    label="序号"
                            ></el-table-column>
                            <el-table-column
                                    prop="submitTime"
                                    width="200"
                                    :show-overflow-tooltip="true"
                                    label="提交时间"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="timingTime"
                                    width="200"
                                    :show-overflow-tooltip="true"
                                    label="披露时间"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="leadName"
                                    width="250"
                                    :show-overflow-tooltip="true"
                                    label="主承全称"
                                    header-align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="deputyLeadName"
                                    width="250"
                                    :show-overflow-tooltip="true"
                                    label="联主/辅主承"
                                    header-align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="issuer"
                                    width="250"
                                    :show-overflow-tooltip="true"
                                    label="发行人全称"
                                    header-align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="bondName"
                                    width="300"
                                    :show-overflow-tooltip="true"
                                    label="债券全称"
                                    header-align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="bondType"
                                    width="100"
                                    align="center"
                                    :show-overflow-tooltip="true"
                                    label="品种"
                            ></el-table-column>
                            <el-table-column
                                    prop="term"
                                    width="100"
                                    align="center"
                                    :show-overflow-tooltip="true"
                                    label="期限"
                            ></el-table-column>
                            <el-table-column
                                    prop="remarks"
                                    header-align="center"
                                    label="备注"
                                    width="300"
                                    :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                    prop="status"
                                    align="center"
                                    label="状态"
                                    width="200"
                                    :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                    prop="recRslt"
                                    align="center"
                                    label="可挂网"
                                    width="200"
                                    :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                    prop="issueFaceValue"
                                    align="center"
                                    label="计划发行总金额（万元）"
                                    width="200"
                                    :show-overflow-tooltip="true"
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
                </el-tab-pane>
                <el-tab-pane label="审计记录" name="second">
                    <!--输入框1 -->
                    <el-row class="topCentent">
                        <el-col :span="6">
                            <label class="search-label">年度：</label>
                            <el-date-picker
                                    class="dateinterval"
                                    format="yyyy"
                                    value-format="yyyy"
                                    v-model="sjInput.timingTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-value="defaultDate"
                            ></el-date-picker>
                        </el-col>
                        <el-col :span="6">
                            <label class="search-label">发行人全称：</label>
                            <!-- <el-input placeholder="请输入" v-model="sjInput.issuerFullName" clearable></el-input> -->
                            <el-select
                                    v-model="sjInput.issuerFullName"
                                    placeholder="请选择"
                                    clearable
                                    filterable
                                    :filter-method="fullNameDataFilter"
                                    v-el-select-loadmore="fullNameLoadmore"
                                    clearable
                                    @visible-change="clearFull"
                            >
                                <el-option
                                        v-for="(item, index) in issuerFullNameOptions"
                                        :key="index"
                                        :label="item.issuerName"
                                        :value="item.issuerName"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <label class="search-label">审计机构：</label>
                            <!-- <el-input placeholder="请输入" v-model="sjInput.aduitName" clearable></el-input> -->
                            <el-select
                                    v-model="sjInput.aduitName"
                                    placeholder="请选择"
                                    filterable
                                    :filter-method="dataFilter"
                                    v-el-select-loadmore="loadmore"
                                    @visible-change="clearFilter"
                                    clearable
                            >
                                <el-option
                                        v-for="(item, index) in aduitNameOptions"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <label class="search-label">是否特殊审计：</label>
                            <el-select v-model="sjInput.value" placeholder="请选择" clearable >
                                <el-option
                                        v-for="item in sjInput.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <!-- 下半部分 -->
                    <el-row class="bottomContent">
                        <div class="searchBtns btns">
                            <el-button type="primary">
                                <span @click="sjSearch">查询</span>
                            </el-button>
                            <el-button plain @click="sjReset">重置</el-button>
                        </div>
                    </el-row>
                    <!-- 下半部分 -->
                    <el-row class="bottomContent">
                        <el-col :span="5" class="btns">
                            <el-button type="primary" @click="addKeep">
                                <span>新增</span>
                            </el-button>
                            <el-button type="primary" @click="editData">
                                <span>编辑</span>
                            </el-button>
                            <el-button type="primary" @click="bookDelete">删除</el-button>
                        </el-col>
                        <el-col :span="5"></el-col>
                        <el-col :span="9"></el-col>
                        <el-col :span="5"></el-col>
                    </el-row>

                    <!--tab部分 -->
                    <div class="tables">
                        <el-table
                                v-loading="loading"
                                element-loading-text="正在导出"
                                :data="tableSjData"
                                style="width: 100%"
                                border
                                @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column
                                    prop="rowId"
                                    width="70"
                                    align="center"
                                    label="序号"
                            ></el-table-column>
                            <el-table-column
                                    prop="year"
                                    label="年度"
                                    align="center"
                                    width="100"
                            ></el-table-column>
                            <el-table-column
                                    prop="issuerFullName"
                                    header-align="center"
                                    label="发行人全称"
                            ></el-table-column>
                            <el-table-column
                                    prop="aduitName"
                                    header-align="center"
                                    label="审计机构"
                            ></el-table-column>
                            <el-table-column
                                    prop="isSpclAudit"
                                    label="是否特殊审计"
                                    width="150"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.isSpclAudit == '1'">是</span>
                                    <span v-else>否</span>
                                </template>
                            </el-table-column>
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

                    <!-- 编辑弹窗 -->
                    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
                        <el-form
                                ref="form"
                                :model="checkForm"
                                label-width="200px"
                                size="mini"
                        >
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item
                                            label="年度："
                                            prop="timingTime"
                                            :required="true"
                                    >
                                        <el-date-picker
                                                v-model="checkForm.timingTime"
                                                type="year"
                                                :disabled="true"
                                                placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="发行人全称：" :required="true">
                                        <el-input
                                                placeholder="请输入内容"
                                                v-model="checkForm.issuerFullName"
                                                :disabled="true"
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="审计机构：" :required="true">
                                        <el-select
                                                v-model="checkForm.aduitName"
                                                filterable
                                                :filter-method="dataFilter"
                                                v-el-select-loadmore="loadmore"
                                                placeholder="请选择"
                                                clearable
                                        >
                                            <el-option
                                                    v-for="(item, index) in aduitNameOptions"
                                                    :key="index"
                                                    :label="item.name"
                                                    :value="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="是否特殊审计：" :required="true">
                                        <el-select
                                                v-model="checkForm.isSpclAudit"
                                                placeholder="请选择"
                                                clearable
                                                :disabled="true"
                                        >
                                            <el-option
                                                    v-for="(item, index) in checkForm.isSpclAuditOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveData">确 定</el-button>
            </span>
                    </el-dialog>
                    <!-- 新增弹窗 -->
                    <el-dialog title="新增" :visible.sync="addVisible" width="40%">
                        <el-form
                                ref="addForm"
                                :model="addForm"
                                :rules="addFormRules"
                                label-width="200px"
                                size="mini"
                        >
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="年度：" prop="timingTime">
                                        <el-date-picker
                                                v-model="addForm.timingTime"
                                                type="year"
                                                placeholder="选择日期"
                                                format="yyyy"
                                                value-format="yyyy"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="发行人全称" prop="issuerFullName">
                                        <!-- <el-input placeholder="请输入内容" v-model="addForm.issuerFullName"></el-input> -->
                                        <el-select
                                                v-model="addForm.issuerFullName"
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
                                                    :label="item.issuerName"
                                                    :value="item.issuerId"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="审计机构：" prop="aduitName">
                                        <el-select
                                                v-model="addForm.aduitName"
                                                filterable
                                                :filter-method="dataFilter"
                                                v-el-select-loadmore="loadmore"
                                                @visible-change="clearFilter"
                                                placeholder="请选择"
                                                clearable
                                        >
                                            <el-option
                                                    v-for="(item, index) in aduitNameOptions"
                                                    :key="index"
                                                    :label="item.name"
                                                    :value="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="是否特殊审计：" prop="isSpclAudit">
                                        <el-select
                                                v-model="addForm.isSpclAudit"
                                                placeholder="请选择"
                                                clearable
                                                :disabled="true"
                                        >
                                            <el-option
                                                    v-for="(item, index) in addForm.isSpclAuditOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
              <el-button @click="addVisible = false">取 消</el-button>
              <el-button type="primary" @click="addData('addForm')"
              >确 定</el-button
              >
            </span>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="特殊审计机构" name="specialAudit">
                    <el-row class="topCentent">
                        <el-col :span="6">
                            <label class="search-label">特殊审计机构：</label>
                            <!-- <el-input placeholder="请输入" v-model="sjInput.aduitName" clearable></el-input> -->
                            <el-select
                                    v-model="auditInput.aduitName"
                                    placeholder="请选择"
                                    filterable
                                    :filter-method="dataFilter"
                                    v-el-select-loadmore="loadmore"
                                    @visible-change="clearFilter"
                                    clearable
                            >
                                <el-option
                                        v-for="(item, index) in aduitNameOptions"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1"></el-col>
                        <el-col :span="5" class="btns">
                            <el-button type="primary">
                                <span @click="auditSearch">查询</span>
                            </el-button>
                            <el-button plain @click="auditReset">重置</el-button>
                        </el-col>
                    </el-row>
                    <!-- 下半部分 -->
                    <el-row class="bottomContent">
                        <el-col :span="5" class="btns">
                            <el-button type="primary" @click="sjAddKeep">
                                <span>新增</span>
                            </el-button>
                            <el-button type="primary" @click="auditBookDelete"
                            >删除
                            </el-button
                            >
                        </el-col>
                        <el-col :span="5"></el-col>
                        <el-col :span="9"></el-col>
                        <el-col :span="5"></el-col>
                    </el-row>

                    <!--tab部分 -->
                    <div class="tables">
                        <el-table
                                v-loading="loading"
                                element-loading-text="正在导出"
                                :data="auditTable"
                                style="width: 100%"
                                border
                                @selection-change="handleSelectionChange1"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column
                                    prop="rowId"
                                    width="70"
                                    align="center"
                                    label="序号"
                            ></el-table-column>
                            <el-table-column
                                    prop="aduitName"
                                    label="特殊审计机构"
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
                                :total="AuditTotalCount"
                        ></el-pagination>
                    </div>
                    <!-- 新增弹窗 -->
                    <el-dialog title="新增" :visible.sync="sjAddVisible" width="40%">
                        <el-form
                                ref="auditAddForm"
                                :model="auditAddForm"
                                :rules="addFormRules"
                                label-width="200px"
                                size="mini"
                        >
                            <el-row class="topCentent">
                                <el-col :span="18">
                                    <el-form-item label="审计机构：" prop="aduitName">
                                        <el-select
                                                v-model="auditAddForm.aduitName"
                                                filterable
                                                :filter-method="dataFilter"
                                                v-el-select-loadmore="loadmore"
                                                @visible-change="clearFilter"
                                                placeholder="请选择"
                                                clearable
                                        >
                                            <el-option
                                                    v-for="(item, index) in aduitNameOptions"
                                                    :key="index"
                                                    :label="item.name"
                                                    :value="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
              <el-button @click="sjAddVisible = false">取 消</el-button>
              <el-button type="primary" @click="auditAddData('auditAddForm')"
              >确 定</el-button
              >
            </span>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        getPutRecordGetAllRecord,
        getAuditRecordsSelectAll,
        getAuditRecordsAddAuditRecords,
        getAuditRecordsUpdateAuditRecords,
        getAuditRecordsDeleteAuditRecords,
        getAuditRecordsGetAuditNameAll,
        getAuditRecordsGetIssuerNameAll,
        getScplIsAudtSelectAll,
        getScplIsAudtAddScplIs,
        getScplIsAudtDeleteScplIs,
    } from "../../library/api/api.public";
    import {axios, downloadUrl} from "../../library/api/axiosExport.js";

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
                loading: false,
                activeName: "first",
                loading: false,
                dialogVisible: false,
                ImportVisible: false,
                errorData: false,
                addVisible: false,
                sjAddVisible: false,
                // 备案确认搜索条件
                input: {
                    submitTime: [],
                    leadName: "",
                    bondName: "",
                    remarks: "",
                    timingTime: [],
                },
                value: "DCM",
                options: [
                    {
                        value: "DCM",
                        label: "DCM",
                    },
                    {
                        value: "PPN",
                        label: "PPN",
                    },
                ],
                updateExclAll: "",
                fileList: [],
                fileRes: [],
                //数据列表
                tableData: [],

                pageNum: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 0,
                // 个数选择器（可修改）
                pageSizes: [5, 10, 15, 20],
                // 默认每页显示的条数（可修改）
                pageSize: 5,

                //审计参数
                tableSjData: [],
                pageNum1: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount1: 0,
                // 个数选择器（可修改）
                pageSizes1: [5, 10, 15, 20],
                // 默认每页显示的条数（可修改）
                pageSize1: 5,
                auditTable: [],
                AuditTotalCount: 0,
                pageNum2: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                // 个数选择器（可修改）
                pageSizes2: [5, 10, 15, 20],
                // 默认每页显示的条数（可修改）
                pageSize2: 5,
                // 审计搜索条件
                sjInput: {
                    timingTime: "",
                    aduitName: "",
                    isSpclAudit: "",
                    value: "",
                    options: [
                        {
                            value: "0",
                            label: "否",
                        },
                        {
                            value: "1",
                            label: "是",
                        },
                    ],
                },
                auditInput: {
                    aduitName: "",
                },
                aduitNameOptions: [],
                issuerFullNameOptions: [],
                checkForm: {
                    id: "",
                    timingTime: "",
                    aduitName: "",
                    isSpclAudit: "",
                    isSpclAuditOptions: [
                        {
                            value: "0",
                            label: "否",
                        },
                        {
                            value: "1",
                            label: "是",
                        },
                    ],
                    issuerFullName: "",
                },

                addForm: {
                    timingTime: "",
                    aduitName: "",
                    isSpclAudit: "",
                    isSpclAuditOptions: [
                        {
                            value: "0",
                            label: "否",
                        },
                        {
                            value: "1",
                            label: "是",
                        },
                    ],
                    issuerFullName: "",
                },
                auditAddForm: {
                    aduitName: "",
                },
                addFormRules: {
                    aduitName: [{required: true, message: "请选择内容", trigger: "blur"}],
                    isSpclAudit: [{message: "请选择内容", trigger: "blur"}],
                    issuerFullName: [
                        {required: true, message: "发行人全称不能为空", trigger: "blur"},
                    ],
                    timingTime: [
                        {
                            type: "string",
                            required: true,
                            message: "请选择日期",
                            trigger: "blur",
                        },
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
                    addTip: "新增成功",
                    addErrTip: "新增失败",
                    delSucTip: "删除成功",
                    delErrTip: "删除失败",
                },
                // 表格选中行数组
                multipleSelection: [],
                multipleSelection1: [],
                currentEditNum: -1,
                currentEditNum1: -1,
                defaultDate: new Date(),
                formData: {
                    pageNum: 1,
                    pageSize: 20,
                },
                nameData: {
                    pageNum: 1,
                    pageSize: 20,
                },
            };
        },
        // 获取初始数据
        created() {
        },
        mounted() {
            this.convertTime();
            // this.getData();
        },
        // 定义方法
        methods: {
            //初始化请求表格数据
            getData() {
                let submitTimeStart = "";
                let submitTimeEnd = "";
                let timingStartTime = "";
                let timingEndTime = "";
                if (this.input.submitTime == "" || this.input.submitTime == null) {
                    submitTimeStart = "";
                    submitTimeEnd = "";
                } else {
                    submitTimeStart = this.input.submitTime[0];
                    submitTimeEnd = this.input.submitTime[1];
                }
                if (this.input.timingTime == "" || this.input.timingTime == null) {
                    timingStartTime = "";
                    timingEndTime = "";
                } else {
                    timingStartTime = this.input.timingTime[0];
                    timingEndTime = this.input.timingTime[1];
                }
                let params = {
                    bondType: this.value,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    submitStartTime: submitTimeStart,
                    submitEndTime: submitTimeEnd,
                    timingStartTime: timingStartTime,
                    timingEndTime: timingEndTime,
                    leadName: this.input.leadName,
                    bondName: this.input.bondName,
                    remarks: this.input.remarks,
                };
                getPutRecordGetAllRecord(params).then((res) => {
                    console.log(res);
                    this.tableData = res.data.list;
                    this.totalCount = res.data.total;
                });
            },

            //查询条件搜索
            search() {
                this.pageNum = 1;
                this.getData();
            },
            auditSearch() {
                this.pageNum2 = 1;
                this.getAuditData();
            },
            //重置搜索条件
            reset() {
                this.convertTime();
                this.input.leadName = "";
                this.input.bondName = "";
                this.value = "DCM";
                this.defaultDate = new Date();
            },
            auditReset() {
                this.auditInput.aduitName = "";
            },

            addKeep() {
                this.addVisible = true;
                this.$nextTick(() => {
                    this.resetForm("addForm");
                    this.clearValidate("addForm");
                });
            },
            sjAddKeep() {
                this.sjAddVisible = true;
                this.$nextTick(() => {
                    this.resetForm("auditAddForm");
                    this.clearValidate("auditAddForm");
                });
            },
            clearValidate(formName) {
                this.$refs[formName].clearValidate();
            },
            //审计表格数据
            getSjData() {
                let startYear = "";
                let endYear = "";
                if (this.sjInput.timingTime == "" || this.sjInput.timingTime == null) {
                    startYear = "";
                    endYear = "";
                } else {
                    startYear = this.sjInput.timingTime[0];
                    endYear = this.sjInput.timingTime[1];
                }
                let params = {
                    pageSize: this.pageSize1,
                    pageNum: this.pageNum1,
                    startYear: startYear,
                    endYear: endYear,
                    aduitName: this.sjInput.aduitName,
                    isSpclAudit: this.sjInput.value,
                    issuerFullName: this.sjInput.issuerFullName,
                };
                getAuditRecordsSelectAll(params).then((res) => {
                    console.log(res);
                    this.tableSjData = res.data.list;
                    this.totalCount1 = res.data.total;
                });
            },
            //审计查询条件搜索
            sjSearch() {
                this.pageNum1 = 1;
                this.getSjData();
            },
            //审计重置搜索条件
            sjReset() {
                this.sjInput = {
                    timingTime: "",
                    aduitName: "",
                    isSpclAudit: "",
                    value: "",
                    options: [
                        {
                            value: "0",
                            label: "否",
                        },
                        {
                            value: "1",
                            label: "是",
                        },
                    ],
                };
                this.defaultDate = new Date();
            },

            /**
             * 新增表格行
             */
            addData(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            year: this.addForm.timingTime,
                            issuerFullName: this.addForm.issuerFullName,
                            aduitName: this.addForm.aduitName,
                            isSpclAudit: this.addForm.isSpclAudit,
                        };
                        getAuditRecordsAddAuditRecords(params).then((res) => {
                            console.log(res);
                            if (res.code == "000000") {
                                if (res.data > 0) {
                                    this.openTipBox(this.tipInfo.addTip, this.tipType.success);
                                    this.getSjData();
                                } else {
                                    this.openTipBox(
                                        "修改失败，请勿添加重复数据",
                                        this.tipType.error
                                    );
                                }
                            } else {
                                this.openTipBox(this.tipInfo.addErrTip, this.tipType.error);
                            }
                        });
                        this.addVisible = false;
                        this.resetForm("addForm");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            //特殊审计新增
            auditAddData(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            aduitName: this.auditAddForm.aduitName,
                        };
                        getScplIsAudtAddScplIs(params).then((res) => {
                            console.log(res);
                            if (res.code == "000000") {
                                if (res.data > 0) {
                                    this.openTipBox(this.tipInfo.addTip, this.tipType.success);
                                    this.getAuditData();
                                } else {
                                    this.openTipBox(
                                        "修改失败，请勿添加重复数据",
                                        this.tipType.error
                                    );
                                }
                            } else {
                                this.openTipBox(this.tipInfo.addErrTip, this.tipType.error);
                            }
                        });
                        this.sjAddVisible = false;
                        this.resetForm("auditAddForm");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            /**
             * 选中某一行数据
             @params val 当前选中的数据
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.currentEditNum = this.tableSjData.indexOf(val[0]);
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
                this.currentEditNum1 = this.auditTable.indexOf(val[0]);
            },

            /**
             * 编辑表格行
             */
            editData() {
                if (this.multipleSelection.length !== 1) {
                    this.openTipBox(this.tipInfo.editTip, this.tipType.warn);
                } else {
                    console.log(this.tableSjData[this.currentEditNum]);

                    this.checkForm = {
                        id: this.tableSjData[this.currentEditNum].id,
                        timingTime: this.tableSjData[this.currentEditNum].year,
                        aduitName: this.tableSjData[this.currentEditNum].aduitName,
                        isSpclAudit: this.tableSjData[this.currentEditNum].isSpclAudit,
                        issuerFullName: this.tableSjData[this.currentEditNum].issuerFullName,
                        isSpclAuditOptions: [
                            {
                                value: "0",
                                label: "否",
                            },
                            {
                                value: "1",
                                label: "是",
                            },
                        ],
                    };
                    this.dialogVisible = true;
                }
            },

            /**
             * 保存编辑
             */
            saveData() {
                let params = {
                    id: this.checkForm.id,
                    aduitName: this.checkForm.aduitName,
                    isSpclAudit: this.checkForm.isSpclAudit,
                };
                getAuditRecordsUpdateAuditRecords(params).then((res) => {
                    console.log(res);
                    if (res.code == "000000") {
                        this.openTipBox(this.tipInfo.editSucTip, this.tipType.success);
                        this.getSjData();
                    } else {
                        this.openTipBox(this.tipInfo.editErrTip, this.tipType.error);
                    }
                });
                this.dialogVisible = false;
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
            /**
             * 批量删除
             */
            bookDelete() {
                let ids = [];
                // 删除
                if (this.multipleSelection.length == 0) {
                    this.openTipBox(this.tipInfo.deleteTip, this.tipType.warn);
                } else {
                    this.multipleSelection.forEach((item) => {
                        ids.push(item.id);
                    });
                    let params = {
                        ids,
                    };
                    getAuditRecordsDeleteAuditRecords(ids).then((res) => {
                        console.log(params);
                        if (res.code == "000000") {
                            this.openTipBox(this.tipInfo.delSucTip, this.tipType.success);
                            this.getSjData();
                        } else {
                            this.openTipBox(this.tipInfo.delErrTip, this.tipType.error);
                        }
                    });
                }
                console.log(ids);
            },
            auditBookDelete() {
                let ids = [];
                // 删除
                if (this.multipleSelection1.length == 0) {
                    this.openTipBox(this.tipInfo.deleteTip, this.tipType.warn);
                } else {
                    this.multipleSelection1.forEach((item) => {
                        ids.push(item.id);
                    });
                    let params = {
                        ids,
                    };
                    getScplIsAudtDeleteScplIs(ids).then((res) => {
                        console.log(params);
                        if (res.code == "000000") {
                            this.openTipBox(this.tipInfo.delSucTip, this.tipType.success);
                            this.getAuditData();
                        } else {
                            this.openTipBox(this.tipInfo.delErrTip, this.tipType.error);
                        }
                    });
                }
                console.log(ids);
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
            loadmore() {
                this.formData.pageNum++;
                this.getList(this.formData);
            },
            dataFilter(val) {
                this.aduitNameOptions = [];
                // this.sjInput.aduitName = val;
                this.formData = {
                    pageNum: 1,
                    pageSize: 20,
                };
                this.getList(this.formData, val);
            },

            getList(formData, val) {
                let params = {
                    aduitName: this.sjInput.aduitName,
                    aduitName: val,
                    formData,
                };
                // 这里是接口请求数据, 带分页条件
                getAuditRecordsGetAuditNameAll(params).then((res) => {
                    console.log(res);
                    const _res = res.data.list; // 请求得到的数据
                    this.aduitNameOptions = [...this.aduitNameOptions, ..._res];
                });
            },
            getNameList(nameData, val) {
                console.log(val);
                let params = {
                    issuerName: this.sjInput.issuerFullName,
                    issuerName: val,
                    nameData,
                };
                // 这里是接口请求数据, 带分页条件
                getAuditRecordsGetIssuerNameAll(params).then((res) => {
                    console.log(res);
                    const _res = res.data.list; // 请求得到的数据
                    this.issuerFullNameOptions = [...this.issuerFullNameOptions, ..._res];
                });
            },
            derive() {
                let submitTimeStart = "";
                let submitTimeEnd = "";
                if (this.input.submitTime == "" || this.input.submitTime == null) {
                    submitTimeStart = "";
                    submitTimeEnd = "";
                } else {
                    submitTimeStart = this.input.submitTime[0];
                    submitTimeEnd = this.input.submitTime[1];
                }

                let data =
                    "bondType=" +
                    this.value +
                    "&submitStartTime=" +
                    submitTimeStart +
                    "&submitEndTime=" +
                    submitTimeEnd +
                    "&leadName=" +
                    this.input.leadName +
                    "&bondName=" +
                    this.input.bondName;
                this.dialogVisible = false;
                let url = this.$api.IP + "/putRecord/export?" + data;
                downloadUrl(url);
            },
            getAuditData() {
                let params = {
                    pageNum: this.pageNum2,
                    pageSize: this.pageSize2,
                    aduitName: this.auditInput.aduitName,
                };
                getScplIsAudtSelectAll(params).then((res) => {
                    console.log(res);
                    this.auditTable = res.data.list;
                    this.AuditTotalCount = res.data.total;
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
                this.getSjData();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange1(val) {
                this.pageNum1 = val;
                this.getSjData();
                console.log(`当前页: ${val}`);
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.pageNum2 = 1;
                this.getAuditData();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange2(val) {
                this.pageNum2 = val;
                this.getAuditData();
                console.log(`当前页: ${val}`);
            },
            handleClick(tab, event) {
                console.log(tab.name, "111111111111");
                if (tab.name == "first") {
                    this.getData();
                } else if (tab.name == "second") {
                    this.getSjData();
                    this.getList(this.formData);
                    this.getNameList(this.nameData);
                } else if (tab.name == "specialAudit") {
                    this.getAuditData();
                    this.getList(this.formData);
                    this.getNameList(this.nameData);
                }
            },

            // 操作 查看
            check(row) {
                this.id = row.id;
                this.dialogVisible = true;
            },

            // //转换日期格式
            convertTime() {
                this.input.submitTime = [];
                this.input.timingTime = [];
                this.timeValue = new Date();
                this.endTime = new Date();
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
                this.timeValue =
                    y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
                // let time = new Date();
                // var y = time.getFullYear();
                // var m = time.getMonth() + 1;
                // var d = time.getDate();
                // var t = y + "-" + m + "-" + d + " " + "08:00:00";
                // var tDate = new Date(Date.parse(t.replace(/-/g, "/")));
                // tDate = +tDate + 24 * 60 * 60 * 1000;
                // tDate = new Date(tDate);
                // console.log(tDate);
                let d1 = this.getNextDate(this.endTime, -1);
                let startTime = d1 + " " + "10:00:00";
                let endTime = y + "-" + m + "-" + d + " " + "10:00:00";
                /* let timingTime = y + "-" + m + "-" + d + " " + "00:00:00";
                 let timingEndTime = y + "-" + m + "-" + d + " " + "23:59:59";*/
                this.input.submitTime.push(startTime);
                this.input.submitTime.push(endTime);
                /*this.input.timingTime.push(timingTime);
                this.input.timingTime.push(timingEndTime);*/

                console.log(this.input.submitTime);
                console.log(this.input.timingTime);
            },

            getNextDate(date, day) {
                var dd = new Date(date);
                dd.setDate(dd.getDate() + day);
                var y = dd.getFullYear();
                var m =
                    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
                var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
                return y + "-" + m + "-" + d;
            },
            //新增后重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            Import() {
                this.ImportVisible = true;
                this.$nextTick(() => {
                    this.$refs.upload.clearFiles();
                    this.updateExclAll =
                        this.$api.IP + "/putRecord/upload?type=" + this.value;
                });
            },
            //上传文件
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
                console.log(this.fileList);
            },
            //清空上传列表
            upClear() {
            },
            //上传成功
            upSuccess() {
                let code = this.fileList[0].response.code;
                this.fileRes = this.fileList[0].response.data;
                if (this.fileRes.length > 0) {
                    this.errorData = true;
                } else {
                    this.openTipBox("数据导入成功", this.tipType.success);
                }
                this.$nextTick(() => {
                    this.$refs.upload.clearFiles();
                });
                this.ImportVisible = false;
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
            deriveMb() {
                window.location.href = this.$api.IP + "/putRecord/downMoudel";
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
                        width: 30%;
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

        .cz {
            color: #5882fa !important;
        }

        /deep/ .el-input-number .el-input__inner {
            padding: 0;
        }

        /deep/ .el-input-number--mini {
            line-height: 34px;
        }
    }
</style>
<style lang="scss">
    .el-scrollbar .el-scrollbar__wrap {
        margin-bottom: 0 !important;
    }
</style>
