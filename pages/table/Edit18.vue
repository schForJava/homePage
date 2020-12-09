
<template>
  <div class="edit18">
    <div style="height:auto;"></div>
  </div>
</template>
<script>
import Html from "../../library/components/Html";
export default {
  mounted() {
    window.open(this.$api.firstStageIP + "/webroot/decision");
    this.url2 = "https://www.jb51.net/article/124153.htm";
    const oIframe = document.getElementById("show-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) + "px";
    oIframe.style.width = Number(deviceWidth) - 220 + "px";
  },
};
</script>

