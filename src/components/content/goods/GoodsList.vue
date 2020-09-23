<template>
  <div class="goods">
     <goods-list-item v-for="(item,i) in goods" :key="i" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
 // 导入GoodsListItem组件
import GoodsListItem from './GoodsListItem.vue'

export default {   
    name:'GoodsList',
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        GoodsListItem
    }
}
</script>

<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>