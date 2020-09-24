<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 滚动区域开始 -->
    <scroll class="content" ref="scroll" 
    :probe-type="3"
    :pull-up-load="true"
    @pullingUp="loadMore"
     @scroll="contentScroll">
      <!-- 轮播图区域 -->
    <home-swiper :banners='banners'></home-swiper>
    <!-- 推荐区域 -->
    <home-recommend :recommends="recommends"></home-recommend>
    <!-- homefeature区域 -->
    <home-feature></home-feature>
    <!-- tab-control区域 -->
    <tab-control 
    @tabClick='tabClick'
    :titles="['流行','新款','精选']" 
    class="tab-control"></tab-control>
    <!-- 商品展示区域 -->
    <goods-list :goods='showGoods'></goods-list>
    </scroll> 
    <!-- 滚动区域结束 -->
    <back-top 
    @click.native="backTopClick" 
    v-show="isShowBackTop"
    ></back-top>


   <!-- 原生滚动开始 -->
    <!-- <home-swiper :banners='banners'></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature></home-feature>
    <tab-control 
    @tabClick='tabClick'
    :titles="['流行','新款','精选']" 
    class="tab-control"></tab-control>
    <goods-list :goods='showGoods'></goods-list> -->
       <!-- 原生滚动结束 -->

    
    
 
  </div>
</template>

<script>
 
//  导入公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


// 导入子组件
import HomeSwiper from './childComponents/HomeSwiper.vue'
import HomeRecommend from './childComponents/HomeRecommend.vue'
import HomeFeature from './childComponents/HomeFeature.vue'



// 导入请求首页数据的方法
import {getHomeMultiData,getHomeGoods} from 'network/home.js'

	export default {
    name:'Home',
    components:{
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,

      HomeSwiper,
      HomeRecommend,
      HomeFeature
    },
    data(){
      return {
        // 轮播图数据
        banners:[],
        // 推荐数据
        recommends:[],
        // 商品的数据模型设计
        goods:{
          'pop':{page:1,list:[]},
          'new':{page:1,list:[]},
          'sell':{page:1,list:[]},
        },
        // 当前展示的商品种类
        currentType:'pop',
        // 是否显示返回按钮
        isShowBackTop:false

      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 调用获取首页轮播图和推荐数据的方法
      this.getHomeMultiData()
      // 调用 获取首页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
     
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      tabClick(i){
        switch(i){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
            
        }
      },

    // 回到顶部
       backTopClick(){
         this.$refs.scroll.scrollTo(0,0)
       },
      //  滚动事件处理函数
       contentScroll(position){
        //  console.log(position)
         this.isShowBackTop = (-position.y) > 1000 
        },
        // 上拉加载更多
        loadMore(){
          this.getHomeGoods(this.currentType)
          this.$refs.scroll.scroll.refresh()
        },


      /**
       * 网络请求相关的方法
       */
      // 请求首页轮播图和推荐数据
     async getHomeMultiData(){
         const {data:res}=await getHomeMultiData()
         // console.log(res)
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
          // console.log(this.banners)
          // console.log(this.recommends)
      },

       // 请求首页商品数据
       async getHomeGoods(type){
         const page=this.goods[type].page
         const {data:res}=await getHomeGoods(type,page)
          // console.log(res)
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page+=1

         this.$refs.scroll.finishPullUp()
        
       },

      
    }

	}
</script>

<style scoped>
  #home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /* 滚动区域的高度  方法一*/
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 滚动区域的高度  方法二*/
  /* .content{
    height:calc(100%-44px-49px);
    overflow: hidden;
    margin-top: 44px;
  } */
  
</style>
