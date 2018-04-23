<template>
	<div id="app">
		<!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item v-for="item in navTitle" v-if="item.items==null">{{item.content}}</el-menu-item>
				<el-submenu v-for="item in navTitle" v-if="item.items!=null">
					<template slot="title">{{item.content}}</template>
					<el-menu-item v-for="nextItem in item.items" :index="item.id-nextItem.id">{{nextItem.iname}}</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
						<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
					</el-submenu>
				</el-submenu>
				
		</el-menu>-->
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item v-if="!item.items || item.items.length===0" v-for="item in navTitle" :index="item.id">{{item.content}}</el-menu-item>
	        <el-submenu v-else :index="item.id">
	        <template slot="title">{{item.content}}</template>
		        <my-component :message="item.items"></my-component>
	        </el-submenu>
		</el-menu>
		 
	</div>
</template>

<script>
import Vue from "vue";

Vue.component("my-component", {
  props: ["message"],
  template: `<a><el-menu-item v-if="!item.items || item.items.length===0" v-for="item in message" :index="item.id">{{item.content}}</el-menu-item>
			          <el-submenu v-else :index="item.id">
                <template slot="title">{{item.content}}</template>
                <my-component :message="item.items"></my-component>
        </el-submenu></a>`
});

export default {
  data() {
    return {
      activeIndex: "1",
      navTitle: [
        {
          id: "1",
          content: "首页",
          items: []
        },
        {
          id: "2",
          content: "产品服务",
          items: [
            {
              id: "2-1",
              content: "产品服务1",
              link: ""
            },
            {
              id: "2-2",
              content: "产品服务2",
              items: [
                {
                  id: "2-2-1",
                  content: "首页111",
                  items: []
                },
                {
                  id: "2-2-2",
                  content: "首页222",
                  items: [
                    {
                      id: "2-2-2-1",
                      content: "首页ee",
                      items: [
                        {
                          id: "2-2-2-12",
                          content: "首页ee1",
                          items: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "3",
          content: "解决方案",
          items: [
            {
              id: "3-1",
              content: "解决方案1",
              link: ""
            }
          ]
        },
        {
          id: "4",
          content: "合作伙伴",
          items: [
            {
              id: "4-1",
              content: "合作伙伴1",
              link: ""
            }
          ]
        }
      ]
    };
  },
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>