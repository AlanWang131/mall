<template>
	<div id="detail">
	  <detail-nav-bar class="detail-nav" 
										@titleClick='titleClick'
										ref="nav"/>
	  <scroll class="content" 
						ref="scroll" 
						:probe-type="3" 
						@scroll="contentScroll">
		
	    <detail-swiper ref="swiper" :top-images="topImages"/>
	    <detail-base-info :goods="goods"/>
	    <detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @goodsImgLoad="goodsImgLoad1"/>
			<detail-param-info ref="param" :param-info="paramInfo"/>
			<detail-comment-info ref="comment" :comment-info="commentInfo"/>
			<good-list ref="recommend" :goods="recommends"/>
	  </scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
		<detail-bottom-bar @addToCart="addToCart"/>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper';
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import GoodList from 'components/content/goods/GoodsList'
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail'
	import {backTopMixin} from "common/mixin";
	import {debounce} from "common/utils";
	import {BACKTOP_DISTANCE} from "common/const";
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodList,
			DetailBottomBar,
			
			Scroll
			},
			mixins: [backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				gethemeTopYs: null
			}
		},
		methods: {
		    goodsImgLoad1() {
		      this.$refs.scroll.refresh()
					this.getThemeTopYs()
		    },
				titleClick(index) {
					this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],500)
				},
				addToCart() {
				  // 1.创建对象
				  const product = {}
				  // 2.对象信息
				  product.iid = this.iid;
				  product.imgURL = this.topImages[0]
				  product.title = this.goods.title
				  product.desc = this.goods.desc;
				  product.newPrice = this.goods.realPrice;
				  // 3.添加到Store中
				  this.$store.commit('addCart', product)
					
				},
				
				contentScroll(position) {
					// 1.获取y值
					const positionY = -position.y
					
					let length = this.themeTopYs.length
					for(let i = 0; i < length; i++){
						// if (this.currentIndex !== i &&(i < length - 1 && positionY >= this.themeTopYs[i] &&positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY > this.themeTopYs[i])) 
						if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
						
						{
							this.currentIndex = i
							this.$refs.nav.currentIndex = this.currentIndex
						}
					}
					 this.isShowBackTop = (-position.y) > 1000
				}
		  },
		created() {
		  // 1.保存传入的iid
		  this.iid = this.$route.params.iid
		
		  // 2.根据iid请求详情数据
		  getDetail(this.iid).then(res => {
				
		    // 1.获取顶部的图片轮播数据
		    // console.log(res);
		    const data = res.result;
		    this.topImages = data.itemInfo.topImages
		
		    // 2.获取商品信息
		    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
		
		    // 3.创建店铺信息的对象
		    this.shop = new Shop(data.shopInfo)
		
		    // 4.保存商品的详情数据
		    this.detailInfo = data.detailInfo;
		
		    // 5.获取参数的信息
		    this.paramInfo = new GoodsParam(
					data.itemParams.info, data.itemParams.rule
				)
				// 6.保存评论信息
				if (data.rate.list) {
				  this.commentInfo = data.rate.list[0];
				}
		  }),
			
			// 3.请求推荐数据
		  getRecommend().then(res => {
			    this.recommends = res.data.list
			})
		
			// 4.给getThemeTopYs赋值（对给this,themeTopYs赋值的操作进行防抖）
			this.getThemeTopYs = debounce(() =>{
				this.themeTopYs = []
				this.themeTopYs.push(this.$refs.swiper.$el.offsetTop-44);
				this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
				this.themeTopYs.push(Number.MAX_VALUE)
				
			})
		},
		mounted() {
			this.$bus.$on('detailItemImgLoad', () => {
		    refresh()
		  })

		}
	}

		
</script>
	
<style scoped>
	#detail {
	  position: relative;
	  z-index: 9;
	  background-color: #fff;
	  height: 100vh;
	}
	
	.detail-nav {
	  position: relative;
	  z-index: 9;
	  background-color: #fff;
	}
	
	.content {
	  height: calc(100% - 103px);
	}
	
	#ul{width: 100%;
	position: fixed;
	z-index: 5;}
</style>
