<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
// body {
//   font-family: "GB2312";
// }
.el-scrollbar__wrap {
  background-color: #f7f7ff !important;
}
.el-scrollbar .el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
a:visited,
span.MsoHyperlinkFollowed {
  text-decoration: none !important;
}
a:link,
span.MsoHyperlink {
  text-decoration: none !important;
}
</style>
