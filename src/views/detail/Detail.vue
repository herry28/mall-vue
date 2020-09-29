<template>
  <div id="detail">
   <!-- 导航栏 -->
   <detail-nav-bar />
   <!-- 滚动区域 -->
  <scroll class="content">
    <!-- 轮播图 -->
    <detail-swiper :topImages="topImages"></detail-swiper>
    <!-- 商品基本信息 -->
    <detail-base-info :goods="goods"></detail-base-info>
    <!-- 店家信息 -->
    <detail-shop-info :shop="shop"></detail-shop-info>
    <!-- 商品详情信息 -->
    <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
  </scroll>
  
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'


import Scroll from 'components/common/scroll/Scroll.vue'


import {getDetail,Goods,Shop} from 'network/detail.js'

	export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    data(){
      return {
        // 轮播图数据
        topImages:[],
        // 商品信息数据
        goods:{},
        // 店家信息
        shop:{},
        // 商品详情信息
        detailInfo:{},
      }
    },
    props:{
      // 通过props接收来自商品详情页的iid
      iid:{
        type:String,
        default:null
      }
    },
    created(){
        this.getDetail()
    },
    methods:{
       /**
        * 数据请求
       */    
      async getDetail(){
       const{data:res} =await getDetail(this.iid)
       console.log(res)
      //  1.轮播图数据
       this.topImages=res.result.itemInfo.topImages
      //  console.log(this.topImages)
      // 2.商品信息数据
      this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
      // console.log(this.goods)
      // 3.店家信息
      this.shop=new Shop(res.result.shopInfo)
      // console.log(this.shop)
      // 4.商品详情信息
      this.detailInfo=res.result.detailInfo
      }
    }
	}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 1;
   background-color: #fff;
   height: 100vh;
 }
 .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
