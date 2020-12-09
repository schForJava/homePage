<template>
  <div class="table">
    <div class="table_style_one" :style="tableStyle">
      <slot></slot>
      <el-table
        border
        :data="tableData"
        :header-cell-style="styleObj"
        v-if="tableConfig"
        style="width: 100%"
        @sort-change="changeTableSort"
        :show-header="showHeader"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :fixed="item.fixed"
          :width="item.width"
          align="center"
          :min-width="item.minWidth"
          :header-align="item.headerAlign"
          :show-overflow-tooltip="false"
          v-for="(item, index) in tableConfig"
          :key="index"
          :type="item.model"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <!-- 多选 -->
            <div v-if="item.type == 'checkbox'">
              <el-checkbox
                :disabled="scope.row[item.isGrey] == '1'"
                :checked="scope.row[item.statu] === 1"
                @change="item.callback(scope.row)"
              ></el-checkbox>
            </div>
            <!-- 序号 -->
            <div v-if="item.type == 'check'">
              <el-checkbox
                :disabled="scope.row[item.isGrey] == '1'"
                v-model="scope.row[item.statu]"
                @change="item.callback(scope.row)"
              ></el-checkbox>
            </div>
            <!-- 序号 -->
            <div v-if="item.type == 'orderNumber'">{{ scope.$index + 1 }}</div>
            <!--正常文本 -->
            <div
              v-if="item.type == 'text'"
              class="add_class"
              v-html="scope.row[item.prop]"
            ></div>
            <!--列表 -->
            <div v-if="item.type == 'list'">
              <div
                v-for="(text, index) in scope.row[item.prop]"
                class="add_class"
                :key="index"
              >
                {{ text }}
                <br />
              </div>
            </div>
            <!-- 单个路由跳转 -->
            <div
              v-if="item.type == 'route'"
              class="add_class addlink"
              @click="item.click.callback(scope.row)"
              v-html="scope.row[item.prop]"
            ></div>
            <!-- list路由跳转 -->
            <div v-if="item.type == 'routeList'" class="add_class addlink">
              <div
                v-for="(text, index) in scope.row[item.prop]"
                :key="index"
                @click="item.click.callback(text)"
                v-html="text"
              ></div>
            </div>
            <!-- 相关操做 -->
            <div v-if="item.type == 'operate'">
              <el-button
                v-for="(btn, idx) in item.btns"
                :key="idx"
                style="font-size: 14px"
                @click="btn.callback(scope.row)"
                type="text"
                class="el-button"
                >{{ btn.text }}</el-button
              >
            </div>
            <div v-if="item.type == 'buttt'">
              <el-button
                v-for="(btn, idx) in scope.row.btns"
                :key="idx"
                v-show="scope.row.isCase == 0 || scope.row.traceStatus === 0"
                style="font-size: 14px"
                @click="item.callback(btn.funName, scope.row)"
                type="text"
                >{{ btn.text }}</el-button
              >
            </div>
            <!-- 信息发布管理 按钮组 yijon -->
            <div v-if="item.type == 'information_btns'">
              <el-button
                v-for="(btn, idx) in scope.row.btns"
                :key="idx"
                style="font-size: 14px"
                @click="item.callback(btn.funName, scope.row)"
                type="text"
                >{{ btn.text }}</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="one-pagination" v-if="pageTotal > 10">
      <div class="footer" v-if="typeof footer != 'undefined'">
        {{ footer.countName }}:
        <span>{{ footer.count }}</span>
        {{ footer.reName }}:
        <span>{{ footer.reCount }}</span>
      </div>
      <div class="pagination-wrap fz12">
        <el-pagination
          ref="pagination"
          background
          v-if="pageTotal > 10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="propObj.currentPage"
          :page-size="propObj.pageSize"
          layout="total,prev, pager, next,sizes,jumper"
          :total="pageTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalPage: Number,
    border: Boolean,
    tableConfig: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    showHeader: {
      type: Boolean,
      default() {
        return true;
      },
    },
    resetPaging: { type: Boolean },
    footer: { type: Object },
  },
  data() {
    return {
      djd: true,
      styleObj: {
        color: "#fff",
        padding: "10px 0",
      },
      propObj: {
        currentPage: 1,
        pageSize: 10,
        prop: "",
        order: "",
      },
      pageTotal: this.totalPage,
      multipleSelection: [],
    };
  },
  watch: {
    totalPage(val, oldval) {
      this.pageTotal = val;
    },
    resetPaging(val) {
      this.propObj.currentPage = 1;
    },
  },
  mounted() {
    console.log(this.resetPaging);
  },
  computed: {
    // 列表样式
    tableStyle() {
      return {
        height: `calc(100% - ${this.pageTotal > 10 ? 46 : 0}px)`,
      };
    },
    pagesTotal() {
      return Math.ceil(this.pageTotal / this.propObj.pageSize);
    },
  },
  methods: {
    // 切换页码
    handleSizeChange(val) {
      this.propObj.pageSize = val;
      this.$emit("getData", this.propObj);
    },
    handleCurrentChange(val) {
      this.propObj.currentPage = val;
      this.$emit("getData", this.propObj);
    },
    changeTableSort({ column, prop, order }) {
      this.$emit("changeTableSort", column, prop, order);
      this.propObj.currentPage = 1;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
.table {
  width: 100%;
  height: 100%;
}
.add_class {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}
.addlink {
  text-decoration: underline;
}
.number {
  border-radius: 0 !important;
}
.cell {
  color: #515a6e !important;
}
.el-button {
  height: 34px;
  min-width: 80px;
  color: #ffffff;
  border: 0 none;
  border-radius: 8px;
  font-size: 14px;
  background-image: linear-gradient(to top, #e6efff -400%, #0d5fff 100%);
}
// 暂无数据页面样式
.no_data_empty {
  font-size: 18px;
  color: #ffffff;
  img {
    width: 100px;
  }
  p {
    height: 18px !important;
    padding-left: 0 !important;
    line-height: 0px !important;
  }
}
.one-pagination {
  width: 100%;
  height: 30px;
  position: relative;
  display: inline-block;
  .pagination-wrap {
    position: absolute;
    right: 45px;
  }
}
</style>
