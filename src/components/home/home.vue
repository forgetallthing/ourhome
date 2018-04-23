<template>
	<div class="block">
		<el-carousel height="670px">
			<el-carousel-item v-for="imgItem in images" :key="imgItem.id">
				<img :src="imgItem.url" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				images: [{
						id: "img1",
						url: "http://mapopen-website-wiki.cdn.bcebos.com/banner%2FtraceTraffic-20180404.jpg"
					},
					{
						id: "img2",
						url: "http://mapopen-website-wiki.cdn.bcebos.com/banner%2Fsubway-banner0403.jpg"
					},
					{
						id: "img3",
						url: "http://mapopen-website-wiki.cdn.bcebos.com/banner%2Flight-apply-banner.jpg"
					},
					{
						id: "img4",
						url: "http://mapopen-website-wiki.cdn.bcebos.com/banner%2Ffankui-banner-0416.jpg"
					}
				],
				components: {},
				methods: {}
			}
		}
	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	img{
		width: 100%;
		height: 670px;
	}
</style>