<template>
  <div class="tab-control">
      <div v-for="(item,i) in titles" :key='i' 
      :class="{active:currentIndex===i}"
      @click="itemClick(i)"
      class="tab-control-item">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemClick(i){
            this.currentIndex=i
        }
    }
}
</script>

<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding: 5px;
    }
    .active{
        color:var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>>

