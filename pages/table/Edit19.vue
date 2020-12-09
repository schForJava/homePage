
<template>
  <div class="edit19">
    <div style="height:auto;">
      <iframe id="show-iframe" frameborder="0" scrolling="yes" src></iframe>
      <iframe id="iframe" frameborder="0" scrolling="yes" src style="display:none"></iframe>
    </div>
  </div>
</template>
<script>
import Html from "../../library/components/Html";
export default {
  mounted() {
    var username = sessionStorage.getItem("username");
    if (username == null) {
      this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=/home`);
    }
    var password = sessionStorage.getItem("password"); //获取输入的参数
    var scr = document.getElementById("iframe"); //创建iframe
    scr.src =
      this.$api.reportIP  +
      "/webroot/decision/login/cross/domain?fine_username=" +
      username +
      "&fine_password=" +
      password +
      "&validity=" +
      -1 +
      "&callback=callback";
    document.getElementById("show-iframe").src =
      this.$api.reportIP + 
      "/webroot/decision/v5/design/report/a00c88fe1ff14929ad248fe0187acf7e/view";
    this.url2 = "https://www.jb51.net/article/124153.htm";
    const oIframe = document.getElementById("show-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) + "px";
    oIframe.style.width = Number(deviceWidth) - 220 + "px";
  },
};
</script>

