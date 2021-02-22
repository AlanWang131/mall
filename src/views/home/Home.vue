<template>
  <div id="home">
		<nav-bar ><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<recommend-view :recommends="recommends"/>
		<feature-view/>
		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar';
	import HomeSwiper from './childComps/HomeSwiper';
	import RecommendView from './childComps/RecommendView';
	import FeatureView from './childComps/FeatureView';
	
	import {getHomeMultidata} from "network/home";
	
	
  export default {
    name: "Home" ,
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView
		},
		data(){
			return{
				banners: [],
				recommends: []
			}
		},
		created(){
			//1.请求多个数据
			getHomeMultidata().then(res =>{
				console.log(res);
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			})
		}
  }
</script>

<style scoped>
	#home{
		padding-top: 44px;
		padding-bottom: 44px;
	}
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
		
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 1;
  }
</style>
