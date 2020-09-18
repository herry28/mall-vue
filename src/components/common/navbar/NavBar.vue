<template>
  <div class="nav-bar"> 
      <!-- left插错 -->
      <div class="left"><slot name="left"></slot></div>
        <!-- center插错 -->
      <div class="center"><slot name="center"></slot></div>
        <!-- right插错 -->
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style scoped>
    .nav-bar{
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100,100,100,.1);
    }
    .left,
    .right{
        width: 60px;
        /* background-color: red; */
    }
    .center{
       flex: 1;
       /* background-color: pink; */
    }

</style>>
