<template>
	<div id="app">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">处理中心</el-menu-item>
			<!--<el-submenu index="2">
				<template slot="title">我的工作台</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
				<el-submenu index="2-4">
					<template slot="title">选项4</template>
					<el-menu-item index="2-4-1">选项1</el-menu-item>
					<el-menu-item index="2-4-2">选项2</el-menu-item>
					<el-menu-item index="2-4-3">选项3</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="3">消息中心</el-menu-item>
			<el-menu-item index="4">订单管理</el-menu-item>-->
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				navTitle: [{
					id: 1,
					content: "首页",
					items: []
				},{
					id: 2,
					content: "产品服务",
					items: [{
						id: 1,
						iname: "产品服务1",
						link: ""
					}, {
						id: 2,
						iname: "产品服务1",
						link: ""
					}]
				}, {
					id: 3,
					content: "解决方案",
					items: [{
						id: 1,
						iname: "解决方案1",
						link: ""
					}]
				},{
					id: 4,
					content: "合作伙伴",
					items: [{
						id: 1,
						iname: "合作伙伴1",
						link: ""
					}]
				}]
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 0px;
	}
</style>