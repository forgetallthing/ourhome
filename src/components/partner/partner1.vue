<template>
	<div id="">
		<div id="myChart" :style="{width: '70%', height: '350px'}"></div>
		<div id="myChart1" :style="{width: '70%', height: '350px'}"></div>
	</div>

</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: '多情谁似南山月，特地暮云开。灞桥烟柳，曲江池馆，应待人来。'
			}
		},
		mounted() {
			this.drawLine();
			this.mycehart();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: '多情谁似南山月，特地暮云开。灞桥烟柳，曲江池馆，应待人来。',
						subtext: 'wulilli'
					},
					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							var date = new Date(params.value[0]);
							data = date.getFullYear() + '-' +
								(date.getMonth() + 1) + '-' +
								date.getDate() + ' ' +
								date.getHours() + ':' +
								date.getMinutes();
							return data + '<br/>' +
								params.value[1] + ', ' +
								params.value[2];
						}
					},
					dataZoom: {
						show: true,
						start: 70
					},
					legend: {
						data: ['series1']
					},
					grid: {
						y2: 80
					},
					xAxis: [{
						type: 'time',
						splitNumber: 10
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: 'series1',
						type: 'line',
						showAllSymbol: true,
						symbolSize: function(value) {
							return Math.round(value[2] / 10) + 2;
						},
						data: (function() {
							var d = [];
							var len = 0;
							var now = new Date();
							var value;
							while(len++ < 200) {
								d.push([
									new Date(2014, 9, 1, 0, len * 10000),
									(Math.random() * 30).toFixed(2) - 0,
									(Math.random() * 100).toFixed(2) - 0
								]);
							}
							return d;
						})()
					}]
				});
			},
			mycehart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
				// 绘制图表
				myChart1.setOption({
					tooltip: {
						trigger: 'axis',
						showDelay: 0,
						axisPointer: {
							show: true,
							type: 'cross',
							lineStyle: {
								type: 'dashed',
								width: 1
							}
						}
					},
					legend: {
						data: ['sin', 'cos']
					},
					xAxis: [{
						type: 'value',
						scale: true
					}],
					yAxis: [{
						type: 'value',
						scale: true
					}],
					series: [{
							name: 'sin',
							type: 'scatter',
							large: true,
							data: (function() {
								var d = [];
								var len = 10000;
								var x = 0;
								while(len--) {
									x = (Math.random() * 10).toFixed(3) - 0;
									d.push([
										x,
										//Math.random() * 10
										(Math.sin(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
									]);
								}
								//console.log(d)
								return d;
							})()
						},
						{
							name: 'cos',
							type: 'scatter',
							large: true,
							data: (function() {
								var d = [];
								var len = 10000;
								var x = 0;
								while(len--) {
									x = (Math.random() * 10).toFixed(3) - 0;
									d.push([
										x,
										//Math.random() * 10
										(Math.cos(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
									]);
								}
								//console.log(d)
								return d;
							})()
						}
					]
				});
			}
		}
	}
</script>

<style>

</style>