<template>
  <div class="sidebar-box">
    <!-- <div class="sidebar-logo">
            <img class="logo-png" src="../../../assets/logo.png" alt="">
    </div>-->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->

    <div class="menu-wrap">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        style="overflow-x: auto"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          style="width: 300px"
        />
      </el-menu>
    </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
export default {
  components: { SidebarItem },

  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),

    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    isWiki() {
      // <router-link v-if="path==='http://baidu.com'" :to="{path: path}">
      return "http://10.10.80.201/wiki/";
    },
  },
  mounted() {
    console.log(">>>>>>>>>>", this.permission_routes);
  },
  methods: {
    // getTitleName(route) {
    //   if (route.children) {
    //     return "wwww";
    //   }
    //   //     console.log("routoooooooooooooe", eee);
    //   //   } else {
    //   //     console.log("route");
    //   //     console.log(route);
    //   //   }
    // },
  },
};
</script>
<style scoped lang="scss">
.sidebar-box {
  .sidebar-logo {
    background: #2f4d6f;
    padding: 10px;
    margin: 0px;
    height: 1000px;
  }
}
</style>
