import Toast from './Toast.vue'



const obj={}

obj.install=function(Vue){
    // 1. 创建组件构造函数
    const toastConstructor=Vue.extend(Toast)
    // 2.通过new，创建一个组件对象
    const toast=new toastConstructor()
    // 3.将组件对象手动挂载到某一个元素上，此时toast.$el对应的就是div
    toast.$mount(document.createElement('div'))
    // 4.将div挂载到body中
    document.body.appendChild(toast.$el)
    
    Vue.prototype.$toast=toast
}

export default obj