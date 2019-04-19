<template>
    <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <div class="menu-switch" @click="openMenu">
                <i class="el-icon-more-outline"></i>
            </div>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>welcome</span>
        </el-header>
        <el-container class="container-inner">
            <el-aside class="menu" v-bind:class="{ 'menu-fixed': menufixed,'menu-show':menuShow }">
                <el-menu @click="selectNav" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :default-openeds="['1']" :default-active="activeIndex" router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/socket">socket</el-menu-item>
                            <el-menu-item index="/list">list</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航三</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="3-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      activeIndex: "/socket",
      isCollapse: true, //是否折叠menu
      menufixed: true, //小屏幕使menu悬浮布局
      menuShow: true //是否显示menu
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.init();
    this.showMenu();
  },
  watch: {},
  methods: {
    init() {
      this.activeIndex = location.hash.split("#")[1];
      let that = this;
      window.onresize = function() {
        that.showMenu();
      };
    },
    showMenu() {
      if (window.innerWidth > 900) {
        this.isCollapse = false;
        this.menufixed = false;
        this.menuShow = true;
      } else {
        this.isCollapse = true;
        this.menufixed = true;
        this.menuShow = false;
      }
    },
    openMenu() {
      this.menuShow = !this.menuShow;
    },
    selectNav(index, indexPath) {
      this.activeIndex = index;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
.container-inner {
  overflow: hidden;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  width: auto !important;
}
.menu {
  display: none;
}
.menu-switch {
  float: left;
  height: 100%;
  margin-left: 10px;
  font-size: 22px;
  width: 40px;
  text-align: center;
}
.menu-fixed {
  position: fixed;
}
.menu-show {
  display: block;
}
</style>
