<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <!-- tab-control区域 -->
    <tab-control 
    @tabClick='tabClick'
    v-show="isTabControlFixed"
    ref="tabControl1"
    :titles="['流行','新款','精选']" 
    class="tab-control"></tab-control>
    <!-- 滚动区域开始 -->
    <scroll class="content" ref="scroll" 
    :probe-type="3"
    :pull-up-load="true"
    @pullingUp="loadMore"
    @scroll="contentScroll">
      <!-- 轮播图区域 -->
    <home-swiper 
    @swiperImgLoad='swiperImgLoad'
    :banners='banners'></home-swiper>
    <!-- 推荐区域 -->
    <home-recommend :recommends="recommends"></home-recommend>
    <!-- homefeature区域 -->
    <home-feature></home-feature>
    <!-- tab-control区域 -->
    <tab-control 
    @tabClick='tabClick'
    ref="tabControl2"
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
// 导入防抖函数
import {debounce} from '../../common/utils.js'
// 导入mixins对象
import {itemListenerMixins} from '../../common/mixins.js'

	export default {
    name:'Home',
    mixins:[itemListenerMixins],
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
        isShowBackTop:false,
        // tabControl的offsetTop的值
        tabControlOffSetTop:0,
        //tabControl是否吸顶
        isTabControlFixed:false,
        // 离开时home的位置
        saveY:0,


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
      // 调用 获取首页商品分类数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
     
    },
    mounted(){
       // 监听图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh,200) //将频繁调用的函数用debounce包裹起来
      this.$bus.$on('itemImgLoad',()=>{
        refresh()
      })
    },
    // 当进入home组件时调用，将离开时的位置重新赋值
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    // 当离开home组件时调用，记录离开时的位置
    deactivated(){
      // 1.获取y值
      this.saveY=this.$refs.scroll.getSaveY()
      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      // 监听tabControl的点击事件，切换tab
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
        // 让2个tabControl的currentIndex保持一致
        this.$refs.tabControl1.currentIndex=i
        this.$refs.tabControl2.currentIndex=i
      },

    // 监听回到顶部按钮点击事件，回到顶部
       backTopClick(){
         this.$refs.scroll.scrollTo(0,0)
       },
      //  监听页面滚动事件，回到顶部按钮的显示与隐藏
       contentScroll(position){
        // 1. backTop是否显示
         this.isShowBackTop = (-position.y) > 1000 
        // 2. tabControl是否吸顶（position：fixed）
        this.isTabControlFixed=(-position.y)>this.tabControlOffSetTop

        },
        // 监听上拉事件，上拉加载更多
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        // 监听轮播图图片加载完成
        swiperImgLoad(){
           // 获取tabControl的offsetTop的值；$el：获取组件中的元素
          // console.log(this.$refs.tabControl2.$el.offsetTop)
          this.tabControlOffSetTop=this.$refs.tabControl2.$el.offsetTop
        },


      /**
       * 网络请求相关的方法
       */
      // 请求首页轮播图和推荐数据
     async getHomeMultiData(){
         const {data:res}=await getHomeMultiData()
        //  console.log(res)
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

        // 完成上拉加载更多
         this.$refs.scroll.finishPullUp()
        
       },

      
    }

	}
</script>

<style scoped>
  #home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;


    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
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
