import {ADD_COUNTER,ADD_TO_CART} from './mutations-type.js'


export default{
    addCart(context,payload){
        // payload：添加的商品
        // 1.先判断是否存在该商品
        let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
        if(oldProduct){
            context.commit(ADD_COUNTER,oldProduct)
        }else{
            payload.count=1
           context.commit(ADD_TO_CART,payload)
        }     
    }
}