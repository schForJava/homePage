<template>
  <div v-if="!item.hidden" id="menu-wrapper" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)" @click="a">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
        :title="child.name"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  created() {
    console.log(1111111, this.item);
    console.log(2222222222, this.isNest);
    console.log(3333333333, this.basePath);
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      Disabled: true,
    };
  },
  mounted() {
    // console.log(this.onlyOneChild)
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    a(e) {
      // console.log(888)
      // console.log(e)
      e.stopPropagation();
      return false;
    },
  },
};
</script>
<style lang="scss">
.menu-wrapper span {
  font-size: 14px !important;
  // color: #e0e0e0 !important;
}
.menu-wrapper span:hover {
  color: #ffffff !important;
}

.menu-wrapper a:hover {
  background: #7388aa !important;
  text-decoration: none !important;
}
.el-menu-item.is-disabled {
  background: #334354 !important;
  opacity: 1 !important;
}
.el-submenu__title {
  background: #334354 !important;
  color: #fff !important;
}
.el-submenu:hover {
  background: #7388aa !important;
  text-decoration: none !important;
}

#app .sidebar-container .el-menu-item {
  color: #e0e0e0 !important;
  background: #334354 !important;
}
#app .sidebar-container .noclick {
  // pointer-events: none;
  color: #7388aa;
  // cursor: not-allowed;
}
.menu-wrapper .noclick:hover {
  background: #334354 !important;
}
.menu-wrapper .noclick span:hover {
  color: #7388aa !important;
}
#app .sidebar-container .isactive .svg-icon {
  color: #7388aa;
  font-size: 18px;
}
#app .sidebar-container .isactive {
  color: #7388aa !important;
}
// .menu-wrapper /deep/ .el-menu{
//     background: #334354 !important;
// }
#app .sidebar-container .el-menu {
  background: #334354 !important;
}
</style>