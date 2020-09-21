<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 轮播图区域 -->
    <home-swiper :banners='banners'></home-swiper>
    <!-- 推荐区域 -->
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
 
//  导入NavBar组件
import NavBar from 'components/common/navbar/NavBar.vue'
// 导入HomeSwiper
import HomeSwiper from './childComponents/HomeSwiper.vue'
// 导入HomeRecommend
import HomeRecommend from './childComponents/HomeRecommend.vue'



// 导入getHomeMultiData方法
import {getHomeMultiData} from 'network/home.js'

	export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend
    },
    data(){
      return {
        // 轮播图数据
        banners:[],
        // 推荐数据
        recommends:[]

      }
    },
    async created(){
      // 请求首页多个数据
      // gethomeMultiData().then(res=>{
      //   console.log(res)
      // })
      const {data:res}=await getHomeMultiData()
      // console.log(res)
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      console.log(this.banners)
      console.log(this.recommends)
     
    }
	}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
