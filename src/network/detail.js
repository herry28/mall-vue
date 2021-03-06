import {request} from './request.js'



export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export function getRecommend(){
    return request({
        url:'/recommend'
    })
}

// 将商品基本信息封装到Goods类中
export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title
        this.desc=itemInfo.desc
        this.newPrice=itemInfo.price
        this.oldPrice=itemInfo.oldPrice
        this.discount=itemInfo.discountDesc
        this.columns=columns
        this.services=services
        this.realPrice=itemInfo.lowNowPrice
    }
}

// 将店家信息封装到Shop类中
export class Shop{
    constructor(shopInfo){
        this.logo=shopInfo.shopLogo
        this.name=shopInfo.name
        this.fans=shopInfo.cFans
        this.sells=shopInfo.cSells
        this.score=shopInfo.score
        this.goodsCount=shopInfo.cGoods
    }
}

// 将商品参数信息封装到GoodsParams类中
export class GoodsParams{
    constructor(info,rule){
        // 有些商品有，有些没有
        this.image=info.images?info.images[0]:''
        this.infos=info.set
        this.sizes=rule.tables
    }
}