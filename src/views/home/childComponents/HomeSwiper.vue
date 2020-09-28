<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,i) in banners" :key="i">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// 导入Swiper，SwiperItem组件
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name:'HomeSwiper',
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
      return {
        // 记录状态
        isLoad:false,
      }
    },
    components:{
       Swiper,
       SwiperItem
    },
    methods:{
      // 监听 轮播图图片加载完毕
      imgLoad(){
        if(!this.isLoad){
           this.$emit('swiperImgLoad')
           this.isLoad=true 
        }   
      }
    }
}
</script>

<style>

</style>