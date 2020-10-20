<template>
  <div class="bottom-bar">
    <div class="btn">
       <check-button 
       @checkBtnClick='checkClick'
       :is-checked='isSelectAll'/>
       <span class="txt">全选</span>
    </div>
    <div class="price"> 
      合计：{{totalPrice}}
    </div>
    <div class="count" @click="countClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name:'CartBottomBar',
    components:{
        CheckButton,
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){//全部选中
          this.$store.state.cartList.forEach(item=>item.checked=false)
        }else{
           this.$store.state.cartList.forEach(item=>item.checked=true)
        }
      },
      countClick(){
        console.log(111)
        if(!isSelectAll){
          this.$toast.show('请选择需要购买的商品')
        }
      }
    },
    computed:{
      totalPrice(){
        return '￥'+ this.$store.state.cartList.filter(item=>{
          return  item.checked
        }).reduce((preValue,item)=>{
          return preValue+item.price*item.count
        },0).toFixed(2)    
      },
      checkedLength(){
        return this.$store.state.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length===0) return false
        return !this.$store.state.cartList.find(item=>!item.checked)
      }
    }
}
</script>

<style scoped>
.bottom-bar{
  display: flex;
  height: 40px;
  position: fixed;
  text-align: center;
  /* c; */
  left: 0;
  right: 0;
  bottom: 49px;
  background-color: #eee;
}
.btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
.txt{
 padding-left: 5px;
}
.price{
  flex:1;
  line-height: 40px;
}
.count{
  background-color: pink;
  line-height: 40px;
}
</style>