<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div 
              class="title-item"
              :class="{active:index===currentIndex}"
              @click="titleClick(index)"
              v-for="(item,index) in titles" 
              :key="index">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'




export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
   data(){
       return {
           //导航栏标题
           titles:['商品','参数','评论','推荐'],
            //导航栏的当前索引
            currentIndex:0   
       }
   },
   methods:{
    /**
     * 事件监听
     */
        //点击标题，切换样式    
       titleClick(index){
           this.currentIndex=index
           this.$emit('titleClick',index)
       },
        //返回首页    
       backClick(){
           this.$router.back()
       }

   
   }
}
</script>

<style scoped>
.title{
    display: flex;
}
.title-item{
    flex: 1;
}
.active{
    color:var(--color-high-text)
}
.back img{
    margin-top: 12px;
}
</style>