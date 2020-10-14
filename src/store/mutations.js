import {ADD_COUNTER,ADD_TO_CART} from './mutations-type.js'


export default{
    // 若商品存在 ，数量+1
    [ADD_COUNTER](state,payload){
        payload.count++
  },
//   若商品不存在，将其添加到购物车
    [ADD_TO_CART](state,payload){
        state.cartList.push(payload)
    }
}