<template>
	<div id="detail">
		<detail-nav-bar/>
		 <detail-swiper :top-images="topImages"/>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper';
	
	import {getDetail} from 'network/detail'
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper
			},
		data() {
			return {
				iid: null,
				 topImages: []
			}
		},
		created() {
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			
			//2.根据传入的iid请求详情数据
			getDetail(this.iid).then(res => {
			  // 1.获取顶部的图片轮播数据
			  console.log(res);
			  const data = res.result;
			  this.topImages = data.itemInfo.topImages
			})
		}
	}
</script>

<style scoped>
</style>
