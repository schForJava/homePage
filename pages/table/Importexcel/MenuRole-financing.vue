<template>
  <div class="widget-content">
    <el-modal v-model="importDataModal" title="导入数据">
      <el-row class="info">
        <el-col
          :span="24"
          style="font-size: 0.5rem; font-weight: 500;"
          class="coll"
        >
          <div>
            <label
              v-if="itemId !== 1"
              style="font-size: 0.9rem; font-weight: 800;"
              >台账导入：</label
            >
            <input
              type="file"
              name="file"
              id="excel"
              style="display: none"
              @change="excelSelect"
              ref="excelFile"
            />
            <el-button
              icon="el-icon-upload"
              class="select"
              type="primary"
              @click="excelFileLClick"
              >选择文件</el-button
            >
          </div>
          <div class="uploadfile-list" v-if="hasFile">
            {{ accessory }}
            <i
              class="el-icon-close fontIcon"
              @click="delFile"
              v-show="accessory"
            ></i>
          </div>
        </el-col>
      </el-row>
      <el-row class="btns">
        <a :href="exportIP" download="社会融资规模增量导入模板" class="adown"
          >点击下载：社会融资规模增量导入模板.xlsx</a
        >
        <el-button size="mini" @click="cencelModal" class="cencel"
          >取消</el-button
        >
        <el-button
          size="mini"
          @click="submitExcel"
          class="good"
          :loading="isLoding"
          >{{ text }}</el-button
        >
      </el-row>
    </el-modal>
  </div>
</template>
<script>
import { importExcel } from "../../../library/api/api.charging";
export default {
  data() {
    return {
      accessory: "",
      hasFile: false,
      cencelModa: false,
      importDataModal: true,
      itemId: 0,
      text: "确定",
      isLoding: false,
      exportIP: this.$api.exportIP + "/queryweb/downExcel?Code=financing",
    };
  },
  methods: {
    accessoryFileInput() {
      this.$refs.accessory.click();
    },
    // 减少权限设置
    excelFileLClick() {
      this.$refs.excelFile.click();
    },
    // 文件选择事件
    excelSelect() {
      this.hasFile = true;
      //   console.log(this.$refs.excelFile.files[0].name);
      this.accessory = this.$refs.excelFile.files[0].name;
    },
    // deleteFile() {
    //   this.hasFile = false;
    //   this.accessory = "";
    //   this.$refs.accessory.value = "";
    //   this.$refs.excelFile.value = "";
    // },
    // 点击删除
    delFile() {
      this.accessory = "";
    },
    // 数据导入
    // submitExcel() {
    //   console.log("111");
    //   let form = new FormData();
    //   if (!this.$refs.excelFile.files[0]) {
    //     this.$Message.warning("请选择文件");
    //     return;
    //   }
    //   form.append("file", this.$refs.excelFile.files[0]);
    //   let fileSize = this.$refs.excelFile.files[0].size / 1024000;
    //   console.log(fileSize);
    //   if (fileSize > 300) {
    //     this.$Message.warning("上传文件不能超过300M");
    //     return true;
    //   }
    // }
    submitExcel() {
      let form = new FormData();
      // console.log(this.$refs.excelFile.files[0]);
      if (!this.$refs.excelFile.files[0]) {
        this.$message("请选择文件");
        return;
      }
      this.text = "上传中";
      this.isLoding = true;
      let params = {
        reqAppId: "PARBJS0002",
        reqAppName: "社会融资规模增量",
        reqUserCode: "",
        reqUserPwd: "",
        body: "",
        msgId: "1",
        msgReqTime: "10",
      };
      let files = this.$refs.excelFile.files[0];
      this.xlsxFile = files;
      //需要上传的两个参数 file 文件   ApiRequest json格式请求报文
      form.append("file", this.xlsxFile);
      // form.append("ApiRequest", params);
      let fileSize = this.$refs.excelFile.files[0].size / 1024000;
      if (fileSize > 300) {
        this.$message("上传文件不能超过300M");
        this.isLoding = false;
        this.text = "确定";
        return true;
      }
      let fileName = this.$refs.excelFile.files[0].name;
      if (fileName.indexOf(".xlsx") < 0) {
        this.$message("模板格式不正确！");
        this.isLoding = false;
        this.text = "确定";
        return true;
      }
      if (fileName.indexOf("社会融资规模增量") < 0) {
        this.$message("提示“文件名称包含“社会融资规模增量”字样”");
        this.isLoding = false;
        this.text = "确定";
        return true;
      }
      importExcel(form).then((res) => {
        if (res.msgRetCode != null && res.msgRetCode != "") {
          if (res.msgRetCode == "000000") {
            this.text = "确定";
            this.isLoding = false;
            this.$message("上传成功");
            this.$emit("renewal");
          } else {
            this.$message(res.msgRetInf);
            this.isLoding = false;
            this.text = "确定";
          }
        }
      });
    },
    // 点击弹框中的取消
    cencelModal() {
      this.$emit("cencel");
    },
  },
};
</script>

<style lang="scss">
.el-dialog__header {
  border-bottom: solid 1px #e8eaec;
  /deep/ .el-dialog__title {
    font-size: 14px !important;
  }
}
.el-dialog__body {
  padding: 0;
  .info {
    padding: 16px;
    border-bottom: solid 1px #e8eaec;
    .coll {
      display: flex;
      align-items: center;
      padding: 16px;
      .uploadfile-list {
        margin: 10px 10px 0px;
        .fontIcon {
          margin-left: 6px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          &:hover {
            color: #0d5fff;
          }
        }
      }
      .select {
        border-radius: 8px;
      }
    }
  }
  .btns {
    padding: 12px 18px 12px 18px;
    text-align: right;
    display: flex;
    .cencel {
      color: black;
      background-color: transparent;
      background-image: none;
    }
    .good {
      border-radius: 8px;
    }
    .adown {
      flex: 1;
      display: flex;
      text-align: left;
      align-items: flex-end;
      color: #0d5fff;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
