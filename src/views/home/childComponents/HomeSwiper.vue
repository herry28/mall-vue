<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,i) in banners" :key="i">
        <a :href="item.link">
          <img :src="item.image" alt="">
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
    components:{
       Swiper,
       SwiperItem
    }
}
</script>

<style>

</style>