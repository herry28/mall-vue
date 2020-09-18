<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
 
//  导入NavBar组件
import NavBar from 'components/common/navbar/NavBar.vue'

import {gethomeMultiData} from 'network/home.js'

	export default {
    name:'Home',
    components:{
      NavBar
    },
    created(){
      // 请求多个数据
      gethomeMultiData().then(res=>{
        console.log(res)
      })
    }
	}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
