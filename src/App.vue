<template>
	<div id="app">
		<el-menu style='height: 70px;font-size: 40px;' :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgb(22, 21, 27)" text-color="#8890a4" active-text-color="#ffffff">
			<el-menu-item index='/' style='position: absolute;left: 9vw;color: #fff;'><div class='logo'>logo</div></el-menu-item>
			<el-menu-item style='margin-left: 35%;' v-if="!item.items || item.items.length===0" v-for="item in navTitle" :key='item.id' :index="'/'+item.name">{{item.content}}</el-menu-item> 
	        <el-submenu v-else :index="'/'+item.name">
	        <template slot="title">{{item.content}}</template>
		        <my-component :message="item.items"></my-component>
	        </el-submenu>
	        </router-link>
		</el-menu>	
		<router-view></router-view>
	</div>
</template>

<script>
import Vue from "vue";

Vue.component("my-component", {
  props: ["message"],
  template: `<a><el-menu-item v-if="!item.items || item.items.length===0" v-for="item in message" :key='item.id' :index="'/'+item.name">{{item.content}}</el-menu-item>
			          <el-submenu v-else :index="'/'+item.name">
                <template slot="title">{{item.content}}</template>
                <my-component :message="item.items"></my-component>
        </el-submenu></a>`
});

export default {
  data() {
    return {
      activeIndex: "/home",
      navTitle: [
        {
          id: "1",
          content: "首页",
          name:"home",
          items: []
        },
        {
          id: "2",
          content: "产品服务",
           name:"product2",
          items: [
            {
              id: "2-1",
              content: "产品服务1",
              name:"product21",
              link: ""
            },
            {
              id: "2-2",
              content: "产品服务2",
               name:"product22",
              items: [
                {
                  id: "2-2-1",
                  content: "首页111",
                  name:"product221",
                  items: []
                },
                {
                  id: "2-2-2",
                  content: "首页222",
                  name:"product222",
                  items: [
                    {
                      id: "2-2-2-1",
                      content: "首页ee",
                      name:"product2221",
                      items: [
                        {
                          id: "2-2-2-12",
                          content: "首页ee1",
                          name:"product22212",
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
          name:"resolve",
          items: [
            {
              id: "3-1",
              content: "解决方案1",
              name:"resolve1",
              link: ""
            }
          ]
        },
        {
          id: "4",
          content: "合作伙伴",
          name:"partner",
          items: [
            {
              id: "4-1",
              content: "合作伙伴1",
              name:"partner1",
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
    
      console.log(this.$route.query);
    }
  },
  watch: {
            $route (to,from){
                // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
                console.log(to);
                console.log(from);
              
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
/*.el-menu {
    padding-left: 35%;
}*/
.logo{
	font-size: 26px;
	font-style: italic;
}
.el-menu--horizontal>.el-submenu:focus .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
    color: #fff !important;
    background-color: rgb(22,21,47) !important;
}
.el-menu-item.is-active {
    background-color: RGB(22,21,47) !important;
   
}
.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color:RGB(22,21,47) !important;
    color: #fff !important;
}
.el-submenu__title:focus, .el-submenu__title:hover {
    outline: 0;
    background-color: RGB(22,21,47) !important;
    color: #fff !important;
    /*color: #34d7c4 !important;*/
}
.el-submenu__title {
    font-size: 18px;
}
.el-menu--horizontal>.el-menu-item {
    height: 70px;
    line-height: 70px;
}
.el-menu-item {
    font-size: 18px;
}
.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 70px;
    line-height: 70px;
}
</style>