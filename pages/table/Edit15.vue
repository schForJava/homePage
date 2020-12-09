<template>
  <div class="edit15">
    <div style="height:auto;">
      <iframe id="show-iframe" frameborder="0" scrolling="yes" src></iframe>
    </div>
  </div>
</template>
<script>
import Html from "../../library/components/Html";
import { getCode } from "../../library/api/api.charging";
export default {
  mounted() {
    getCode().then((res) => {
      //生产
      document.getElementById("show-iframe").src =
        this.$api.reportIP +
        "/report/ReportServer?reportlet=report%2Fwbs%2Freport0603.cpt&op=view&partnerId=WBS&code=" +
        res +
        "";
      //测试
      // document.getElementById("show-iframe").src =
      //   this.$api.reportIP +
      //   "/WebReport/ReportServer?reportlet=%5B7b80%5D%5B62a5%5D0702.cpt&op=view&partnerId=WBS&code=" +
      //   res +
      //   "";
    });
    this.url2 = "https://www.jb51.net/article/124153.htm";
    const oIframe = document.getElementById("show-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) + "px";
    oIframe.style.width = Number(deviceWidth) - 220 + "px";
  },
};
</script>
