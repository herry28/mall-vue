<template>
  <div id="detail">
   <!-- 导航栏 -->
   <detail-nav-bar ref='nav' class="detail-nav-bar" @titleClick='titleClick' />
   <!-- 滚动区域 -->
  <scroll class="content" 
  ref='scroll'
  :probe-type="3" 
  @scroll="detailScroll">
    <!-- 轮播图 -->
    <detail-swiper :topImages="topImages"></detail-swiper>
    <!-- 商品基本信息 -->
    <detail-base-info :goods="goods"></detail-base-info>
    <!-- 店家信息 -->
    <detail-shop-info :shop="shop"></detail-shop-info>
    <!-- 商品详情信息 -->
    <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
    <!-- 商品参数信息 -->
    <detail-goods-params ref="params" :goods-params="goodsParams"></detail-goods-params>
    <!-- 商品评论信息 -->
    <detail-comment-info ref='comment' :comment-info="commentInfo"></detail-comment-info>
    <!-- 推荐商品信息 -->
    <goods-list ref="recommend" :goods="recommends"></goods-list>

  </scroll>
  <!-- 底部导航栏 -->
  <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
  <!-- 回到顶部按钮 -->
  <back-top 
    @click.native="backTopClick" 
    v-show="isShowBackTop"
    ></back-top>

  
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailGoodsParams from './childComponents/DetailGoodsParams.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import DetailBottomBar from './childComponents/DetailBottomBar.vue'


import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,getRecommend,Goods,Shop,GoodsParams} from 'network/detail.js'

// 导入mixins对象
import {itemListenerMixins,backTopMixins} from '../../common/mixins.js'


	export default {
    name:'Detail',
    mixins:[itemListenerMixins,backTopMixins],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
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
        // 商品参数信息
        goodsParams:{},
        // 评论信息
        commentInfo:{},
        // 推荐信息
        recommends:[],
        // 标题对应区域的y值
        themeTopYs:[],
        currentIndex:0

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
        //  请求推荐数据
      getRecommend().then(res=>{
        // console.log(res)
        this.recommends=res.data.data.list
        // console.log(this.recommends)
      })
    },
    destroyed(){
         // 取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
       /**
        * 数据请求
       */    
      async getDetail(){
       const{data:res} =await getDetail(this.iid)
      //  console.log(res)
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
      // 5.商品参数信息
      this.goodsParams=new GoodsParams(res.result.itemParams.info,res.result.itemParams.rule)
      // console.log(this.goodsParams)
      // 6.评论信息
      if(res.result.rate.list){
        this.commentInfo=res.result.rate.list[0]
        // console.log(this.commentInfo)
      }    
     },
    
      /**
 * 事件监听
 */
// 详情页图片加载完成
    imgLoad(){
      this.$refs.scroll.refresh()
      // 当图片加载完时获取主题区域的offsetTop
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
      },
      // 监听导航栏的点击事件
      titleClick(index){
        // console.log(index)
        // 当点击标题时，滚动到对应的区域
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      // 监听scroll滚动
      detailScroll(position){
        // 1.获取y值
        const positionY=-position.y
        // console.log(positionY)
        // 2.positionY和主题区域的y值进行比较
        let length=this.themeTopYs.length
        for(let i=0;i<length-1;i++){
          if(this.currentIndex!==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
            this.currentIndex=i
            this.$refs.nav.currentIndex=this.currentIndex
          }
        }
        // 3.是否显示回到底部
        this.isShowBackTop=-position.y>1000


      },
      // 点击添加到购物车
      addToCart(){
        // 1.获取购物车页面需要展示的信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.newPrice
        product.iid=this.iid
        // 2.添加到购物车
        this.$store.dispatch('addCart',product).then(res=>{
           // 3.添加到购物车成功
          //  console.log(this.$toast)
          this.$toast.show(res)
        })
       
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
 .detail-nav-bar{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
 .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
