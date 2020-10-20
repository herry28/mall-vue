import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import toast from 'components/common/toast/toast.js'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus=new Vue()

// 安装toast插件
Vue.use(toast)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
