<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
       <cart-list-item  v-for="(item,i) in cartList" :key="i" :product="item"></cart-list-item>
      
      </scroll>
      
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

import {mapState} from 'vuex'

export default {
    name:'CartList',
    computed:{
        ...mapState(['cartList'])
    },
    components:{
        Scroll,
        CartListItem
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list{
    height: calc(100%-49px-44px-40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>