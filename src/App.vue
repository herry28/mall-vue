<template>
  <div id="app">
    <router-view />
   <main-tab-bar />
  </div>
</template>

<script>
// 导入maintabbar组件
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  name:'app',
  components:{
     MainTabBar
  }
  
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
