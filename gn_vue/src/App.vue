<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/style/global.scss";
export default {
  name: "App"
};
</script>

<style>
html,
body,
#app,
.el-container,
.h {
  height: 100%;
}
</style>
