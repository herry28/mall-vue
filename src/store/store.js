import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 1.安装vuex
Vue.use(Vuex)
// 2.创建store对象
const state={
    cartList:[]
}
const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
// 3.导出store对象，然后挂载到vue中
export default store