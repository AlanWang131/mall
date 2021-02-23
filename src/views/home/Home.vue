<template>
  <div id="home">
		<nav-bar ><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<recommend-view :recommends="recommends"/>
		<feature-view/>
		<tab-control class="tab-control"  :titles="['流行','新款','精选']"/>
		
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper';
	import RecommendView from './childComps/RecommendView';
	import FeatureView from './childComps/FeatureView';
	
	import NavBar from 'components/common/navbar/NavBar';
	import TabControl from 'components/content/tabControl/TabControl'
	
	import {getHomeMultidata,getHomeGoods} from "network/home";
	
	
  export default {
    name: "Home" ,
		components:{
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl
		},
		data(){
			return{
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'news': {page: 0, list: []},
					'sell': {page: 0, list: []},
				}
			}
		},
		created(){
			//1.请求多个数据
			getHomeMultidata().then(res =>{
				// console.log(res);
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			})
		
			//2.请求商品数据
			getHomeGoods('pop',1).then(res =>{
				console.log(res);
			})
		}
  }
</script>

<style scoped>
	#home{
		padding-top: 44px;
		height: 2000px;
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
	.tab-control {
		position: -webkit-sticky;
		position: sticky;
		top: 44px;
	}
</style>
