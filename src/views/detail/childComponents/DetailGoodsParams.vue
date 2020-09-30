<template>
    <div class="goods-params" v-if="Object.keys(goodsParams).length!==0">
        <!-- 尺寸信息 -->
        <table v-for="(table,i1) in goodsParams.sizes" :key="i1" class="info-size">
           <tr v-for="(tr,i2) in table" :key="i2">
               <td v-for="(td,i3) in tr" :key="i3">{{td}}</td>
           </tr>
        </table>
        <!-- 其他参数 -->
        <table class="info-params">
            <tr v-for="(tr,i1) in goodsParams.infos" :key="i1">
                <td class="info-params-key">{{tr.key}}</td>
                <td class="info-params-value">{{tr.value}}</td>
            </tr>
        </table>
        <!-- 图片信息 -->
        <div class="info-img" v-if="goodsParams.image.length !==0">
            <img :src="goodsParams.image" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailGoodsParams',
    props:{
        goodsParams:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
.goods-params{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}
.goods-params table{
    width: 100%;
    border-collapse: collapse;
}
.goods-params table tr{
    height: 42px;
}
.goods-params table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-size{

}
.info-params{
    border-top: 1px solid rgba(0,0,0,.1);
}
.info-params-key{
    width: 95px;
}
.info-params-value{
    color:#eb4868;
}
.info-img img{
    width: 100%;
}
</style>