<template>
    <div class="edit12">
        <el-row class="count">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span class="count1">集中簿记建档情况简报</span>
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
            <el-row class="topCentent" style="margin-top: 20px">
                <el-col :span="6">
                    <label class="search-label">选择日期：</label>
                    <el-date-picker
                            v-model="time"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                    >>
                    </el-date-picker
                    >
                </el-col>
                <el-col :span="9">
                    <div class="btns">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-dropdown
                                size="small"
                                placement="bottom"
                                trigger="click"
                                @command="batchOperate"
                                style="margin-left: 10px"
                        >
                            <el-button class="search-btn" size="mini">
                                导出
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="export_excel"
                                >导出excel
                                </el-dropdown-item
                                >
                                <el-dropdown-item command="batch_remarks"
                                >导出word
                                </el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--<el-button type="primary" @click="derive">导出</el-button>-->
                        <el-button plain @click="reset">重置</el-button>
                    </div>
                </el-col>
            </el-row>
            <!-- 下半部分 -->
            <!-- <el-page-header content="详情页面"></el-page-header> -->
            <h2>概况</h2>
            <!--tab部分 -->
            <div class="tables">
                <el-table :data="monthTableData" style="width: 100%">
                    <el-table-column
                            prop="bondCase"
                            align="center"
                            label="债券品种"
                    ></el-table-column>
                    <el-table-column
                            prop="bondCount"
                            align="center"
                            label="发行只数（只）"
                    ></el-table-column>
                    <el-table-column
                            prop="factAmt"
                            align="center"
                            label="发行规模（亿元）"
                    ></el-table-column>
                </el-table>
            </div>
            <h2 style="margin-top: 25px">详情列表</h2>
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
                            prop="bondName"
                            align="center"
                            label="债券简称"
                    ></el-table-column>
                    <el-table-column
                            prop="bookName"
                            align="center"
                            label="簿记管理人"
                    ></el-table-column>
                    <el-table-column
                            prop="factAmt"
                            align="center"
                            label="发行额（亿元）"
                    ></el-table-column>
                    <el-table-column
                            prop="bondRate"
                            align="center"
                            label="票面利率（%）"
                    ></el-table-column>
                    <el-table-column
                            prop="pubCreditRate"
                            align="center"
                            label="主体评级"
                    ></el-table-column>
                    <el-table-column
                            prop="bondTermStr"
                            align="center"
                            label="债券期限"
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
    import {getBookPingList} from "../../../library/api/api.public";

    import {axios, downloadUrl} from "../../../library/api/axiosExport.js";
    // import $http
    import TableOne from "../../home/components/TableOne";
    import messageBox from "../../home/components/messageBox.vue";
    import MenuRole from "../../home/components/MenuRole.vue";

    export default {
        components: {
            TableOne,
            messageBox,
            MenuRole,
        },
        data() {
            return {
                loading: false,
                dialogVisible: false,
                // from数据
                time: "",

                value: "",
                options: "",
                tableData: [],
                monthTableData: [],

                pageNum: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 0,
                // 个数选择器（可修改）
                pageSizes: [5, 10, 15, 20],
                // 默认每页显示的条数（可修改）
                pageSize: 5,
                // 定义变量存储点击数据
                timeValue: "",

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
                // pickerOptions: {
                //   disabledDate(time) {
                //     return (
                //       time.getTime() >
                //       new Date(
                //         new Date(new Date().toLocaleDateString()).getTime() +
                //           24 * 60 * 60 * 1000 -
                //           1
                //       )
                //     );
                //   },
                // },
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
                let params = {
                    payEndDate: this.time,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                };
                getBookPingList(params).then((res) => {
                    console.log(res);
                    this.tableData = res.data.bookPingInfos;
                    this.monthTableData = res.data.querList;
                    this.totalCount = res.data.paging;
                });
            },

            /**
             * 查询条件
             */
            search() {
                if (this.time == "" || this.time == null) {
                    this.$message.error("请选择日期后查询");
                } else {
                    this.pageNum = 1;
                    this.getData();
                }
            },

            /**
             * 搜索条件重置
             */
            reset() {
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
            //转换日期格式
            convertTime() {
                this.time = new Date();
                var d = new Date(this.time);
                var yue =
                    d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
                var re = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
                var youWant = d.getFullYear() + "-" + yue + "-" + re;
                this.time = youWant;
            },
            batchOperate(command) {
                switch (command) {
                    case "batch_remarks":
                        this.deriveWord();
                        break;
                    case "export_excel":
                        this.deriveExcel();
                        break;
                }
            },
            /**
             * 导出功能
             */
            deriveWord() {
                if (this.time == "" || this.time == null) {
                    this.$message.error("请选择日期后导出");
                } else {
                    let url =
                        this.$api.IP + "/BookPing/downloadWord?payEndDate=" + this.time;
                    downloadUrl(url);
                }
            },
            deriveExcel() {
                if (this.time == "" || this.time == null) {
                    this.$message.error("请选择日期后导出");
                } else {
                    let url =
                        this.$api.IP + "/BookPing/downloadExcel?payEndDate=" + this.time;
                    downloadUrl(url);
                }
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
                justify-content: center;
                display: flex;
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
                    margin-right: 10px;
                    display: flex;

                    .search-label {
                        width: 55%;
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
                        margin-left: 8%;
                        border-radius: 5px !important;
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
            margin-left: 8%;
            border-radius: 5px !important;
        }

        h2 {
            margin-top: 20px;
            line-height: 40px;
        }
    }
</style>
