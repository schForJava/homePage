<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div class="main-header">
            <navbar />
    </div>-->

    <div class="main-content">
      <el-scrollbar style="height: 100%;overflow" class="main-inner">
        <sidebar class="sidebar-container" />
        <div class="el-bg">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
    <div v-show="show" class="popContainer" style="z-index: 2499">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from "./components";
import { mapState } from "vuex";
export default {
  name: "Layout",
  components: {
    // Navbar,
    Sidebar,
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      fixedHeader: (state) => state.settings.fixedHeader,
      show: (state) => state.request.show,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    },
  },
  mounted() {
    // console.log(this.$route.matched[0])
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.popContainer {
  position: fixed;
  font-size: 80px;
  color: #0d5fff;
  top: 0px;
  left: 250px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-header {
  width: 100%;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  &-menu {
    width: 100%;
    height: 50px;
    background-color: white;
  }
  &-img {
    flex: 1;
    background-color: red;
  }
}
.main-content {
  height: 100%;
  // height: calc(100% - 45px);
  // overflow: hidden;
  width: 100%;
  background-color: rgb(22, 36, 62);
  position: absolute;
  // top: 45px;
  // left: #{$sideBarWidth};
}
.color8a {
  color: #8a8a8a;
}
.color90 {
  color: rgba(0, 0, 0, 0.65);
}
.blue0e6 {
  color: #0e67ff;
}
/*  白色背景  */
.el-bg {
  height: 100%;
  width: calc(100% - 250px);
  position: relative;
  left: 250px;
  top: -1157px;
}
.container {
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 50px 100px 0px rgba(74, 74, 74, 0.15);
  padding: 20px;
}
/*  左侧菜单   */
.sidebar-container {
  padding-bottom: 60px;
  height: 900px;
}
.el-scrollbar__view {
  overflow-x: hidden;
}
.main-content /deep/ .el-scrollbar__view {
  height: 640px !important;
}
#app .sidebar-container {
  height: 1157px;
  background-color: #334354 !important;
}
</style>
