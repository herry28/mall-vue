<template>
  <div class="cart-list-item">
      {{product}}
     <div class="item-selector">
         <check-button @checkBtnClick='checkedChange' :is-checked="product.checked"></check-button>
     </div>
     <div class="item-img">
         <img :src="product.image" alt="">
     </div>
     <item-info class="item-info"> 
         <div class="item-title">{{product.title}}</div>
         <div class="item-desc">商品描述：{{product.desc}}</div>
        <div class="info-bottom">
            <div class="item-price">￥{{product.price}}</div>
            <div class="item-count">x{{product.count}}</div>
        </div>
     </item-info>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name:'CartListItem',
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    components:{
        CheckButton
    },
    methods:{
        checkedChange(){
            this.product.checked=!this.product.checked
        }
    }
}
</script>

<style scoped>
.cart-list-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.item-img{
padding: 5px;
}
.item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.item-info {
    font-size: 17px;
    color:#333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}
.item-desc,
.item-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
.info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

.info-bottom .item-price {
    color: orangered;
  }
</style>