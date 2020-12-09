<template>
    <div class="edit12">
        <el-row class="count">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span class="count1">发行文件披露情况表（日中）</span>
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
                    <label class="search-label">主承销商：</label>
                    <el-input
                            placeholder="请输入"
                            v-model="input.leadId"
                            clearable
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <label class="search-label">代理机构：</label>
                    <el-input
                            placeholder="请输入"
                            v-model="input.agency"
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
            </el-row>
            <!--输入框4 -->
            <!--输入框1 -->
            <el-row class="topCentent" style="margin-top: 30px">
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
            </el-row>
            <!-- 下半部分 -->
            <el-row class="bottomContent">
                <div class="btns">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="dialogVisible = true"
                    >导出
                    </el-button
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
                            prop="noticeTitle"
                            label="公告标题"
                            header-align="center"
                            align="left"
                            width="300px"
                            :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                            prop="noticeType1"
                            label="公告类别（一级）"
                            align="center"
                            width="150px"
                    ></el-table-column>
                    <el-table-column
                            prop="noticeType2"
                            label="公告类别（二级）"
                            align="center"
                            width="150px"
                    ></el-table-column>
                    <el-table-column
                            prop="fileCount"
                            label="附件个数"
                            align="center"
                            width="100px"
                    ></el-table-column>
                    <el-table-column
                            prop="issuerName"
                            label="发行人"
                            width="300px"
                            header-align="center"
                            :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                            prop="submitTime"
                            label="审核时间"
                            align="center"
                            width="200px"
                    ></el-table-column>
                    <el-table-column
                            prop="isPandaBond"
                            label="熊猫债披露"
                            align="center"
                            width="150px"
                    ></el-table-column>
                    <el-table-column
                            prop="leadId"
                            label="主承销商"
                            header-align="center"
                            width="300px"
                            :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                            prop="agency"
                            label="代理机构"
                            header-align="center"
                            align="left"
                            width="150px"
                    ></el-table-column>
                    <el-table-column
                            prop="disSureTime"
                            label="披露时间"
                            align="center"
                            width="200px"
                    ></el-table-column>
                    <el-table-column
                            prop="zip"
                            align="center"
                            width="150px"
                            label="备注"
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
    import {getInfo1, getInfo1Download, getSysDate} from "../../library/api/api.public";
    import {downloadUrl} from "../../library/api/axiosExport";
    import axios from "../../library/api/axiosExport.js";
    // import $http
    import TableOne from "../home/components/TableOne";
    import messageBox from "../home/components/messageBox.vue";
    import MenuRole from "../home/components/MenuRole.vue";
    import api from "../../library/api/apis/api.config";

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
                    noticeTitle: "",
                    issuerName: "",
                    leadId: "",
                    agency: "",
                    submitTime: [],
                    disSureTime: [],
                },
                tableData: [],
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
                let auditStart = "";
                let auditEnd = "";
                let disSureStart = "";
                let disSureEnd = "";
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
                    issuerName: this.input.issuerName,
                    leadId: this.input.leadId,
                    agency: this.input.agency,
                    auditStart: auditStart,
                    auditEnd: auditEnd,
                    disSureStart: disSureStart,
                    disSureEnd: disSureEnd,
                };
                getInfo1(params).then((res) => {
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
                    noticeTitle: "",
                    issuerName: "",
                    leadId: "",
                    agency: "",
                    submitTime: [],
                    disSureTime: [],
                };
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
             * 日中/日终未到规定时间，请勿使用导出功能，是否确认继续导出？
             */
            derive() {
                this.dialogVisible = false;
                let url =
                    this.$api.IP + "/releDoc/queryExportList?disSureTime=" + this.timeValue;

                let param = {

                    selectTime: this.timeValue,

                }
                getSysDate(param).then((res) => {
                    let code = res.data.code;
                    if (code == 1) {
                        downloadUrl(url);
                    } else if (code == 0) {
                        let hour = res.data.hour;
                        if (hour >= 12) {
                            downloadUrl(url);
                        } else {
                            this.$confirm('日中未到规定时间，请勿使用导出功能，是否确认继续导出？', '确认信息', {
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

            .tables /deep/ .el-table__header-wrapper {
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
<style>

</style>