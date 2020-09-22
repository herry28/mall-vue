import {request} from './request.js'


// 获取首页轮播图及推荐信息数据
export function getHomeMultiData(){
    return request({
        url:'/home/multidata'
    })
}


// 获取首页商品数据
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}