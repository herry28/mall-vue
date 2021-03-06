import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>import('../views/home/Home.vue')
const Category = ()=>import('../views/category/Category.vue')
const Cart = () =>import('../views/cart/Cart.vue')
const Profile = ()=>import('../views/profile/Profile.vue')
const Detail = ()=>import('../views/detail/Detail.vue')
// import Home from 'views/home/Home.vue'
// import Category from 'views/category/Category.vue'
// import  Cart from 'views/cart/Cart.vue'
// import  Profile from 'views/profile/Profile.vue'
// import Detail from 'views/detail/Detail.vue'

//1. 安装插件
Vue.use(VueRouter)
// 2.创建路由对象
const routes=[
    {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/profile',
        component: Profile
      },
      {
        path: '/detail/:iid',
        component: Detail,
        props:true
      }
]
const router=new VueRouter({
    routes,
    mode:'history'
})
// 3.导出路由对象
export default router