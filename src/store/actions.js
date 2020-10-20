import {ADD_COUNTER,ADD_TO_CART} from './mutations-type.js'


export default{
    
        addCart(context,payload){
            return new Promise((resolve,reject)=>{
            // payload：添加的商品
            // 1.先判断是否存在该商品
            let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
            if(oldProduct){//数量+1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前的商品数量+1')
            }else{//添加新商品
                payload.count=1
               context.commit(ADD_TO_CART,payload)
               resolve('添加新商品')
            }     
        })
    }
   
}