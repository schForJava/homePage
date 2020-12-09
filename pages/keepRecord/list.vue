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
      <el-row class="titleContent" style="margin-bottom: 30px;">
        <el-col :span="24">
          <i class="el-icon-back" @click="back" style="corsor: pointer;"></i>
          <div class="grid-content bg-purple-dark" @click="back" style="corsor: pointer;">返回</div>
        </el-col>
      </el-row>
      <!--输入框1 -->
      <el-form :model="input" ref="ruleForm" label-width="180px" class="demo-ruleForm">
        <el-row class="topCentent">
          <el-col :span="6">
            <el-form-item label="审计名称">
              <el-select
                v-model="value1"
                placeholder="请选择"
                filterable
                :filter-method="dataFilter"
                v-el-select-loadmore="loadmore"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :value-key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getAuditRecordsGetAuditNameAll } from "../../library/api/api.public";
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
      input: "",
      loading: false,
      activeName: "first",
      loading: false,
      dialogVisible: false,
      addVisible: false,
      formData: {
        pageNum: 1,
        pageSize: 20,
      },
      // 备案确认搜索条件
      input: {
        submitTime: [],
        leadName: "",
        bondName: "",
        remarks: "",
      },
      options1: [],
      value1: "",
      value4: "",
      value3: "",
      schoolName: "",
      shchoolList: [],
      newShchoolList: [],
      state1: "",
      state2: "",
      currentPage: 1,
      pageSize: 2,
      totalNum: 0,
      cityData: {},
      tableData: [],
      multipleSelection: [],
      pageCount: 0,
    };
  },
  // 获取初始数据
  created() {},

  mounted() {
    this.getList(this.formData);
  },
  // 定义方法
  methods: {
    loadmore() {
      this.formData.pageNum++;
      this.getList(this.formData);
    },
    dataFilter(val) {
      this.options1 = [];
      // this.value = val;
      this.formData = {
        pageNum: 1,
        pageSize: 20,
      };
      this.getList(this.formData);
    },

    getList(formData) {
      let aduitName = this.value;
      let params = {
        aduitName,
        formData,
      };
      // 这里是接口请求数据, 带分页条件
      getAuditRecordsGetAuditNameAll(params).then((res) => {
        console.log(res);
        const _res = res.data.list; // 请求得到的数据
        this.options1 = [...this.options1, ..._res];
      });
    },
    back() {
      // 返回上一个页面
      this.$router.back(-1);
    },
  },
  watch: {
    value(val, oldval) {
      console.log(val, oldval);
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
          width: 60%;
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
}
</style>
