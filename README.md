# mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 首页模块
## HomeFeature组件
div>a>img
## TabControl组件



# bug
## 解决首页中better-scroll可滚动区域的bug
- better-scroll在决定有多少区域可以滚动时，是根剧scrollHeight属性决定的
- scrollHeight属性是根据better-scroll的content的子组件高度决定的
- 刚开始在计算scrollHeight属性时，没有将图片计算在内，所以计算出来的高度是错误的，后来图片加载完后有了新高度，但scrollHeight没有更新
- 监听图片加载完成：
    - 原生js监听图片：img.onload=function(){}
    - vue中监听：@load=‘方法’
- 调用scroll的refresh()
## refresh() **函数找不到
1. 在mounted(){}中调用
2. 先判断this.scroll是否存在
## refresh()非常频繁的问题，进行防抖操作
- 防抖：debounce()    节流：throttle()
- 防抖函数起作用的过程：
  - 若直接执行refresh()，则refresh()会被执行30次
  - 可以将refresh函数传入到debounce函数中，生成一个新的函数
  - 之后在调用非常频繁时，使用新的函数（并不会频繁调用，因为如果下次来的很快，会把上次取消掉）
  - 
  # 如何将GoodsListItem.vue中的事件传入到Home.vue中？
  - bus事件总线
  - Vue.prototype.$bus=new Vue()
  - this.$bus.$emit('事件名称'，参数)
  - this.$bus.$on('事件名称'，回调函数)


# TabControl的吸顶效果
1. 获取tabControl的offsetTop
   -  必须知道滚动到多少时，开始有吸顶效果，需要获取tabControl的offsetTop
      -  但如果直接在mounted中获取tabControl的offsetTop，值是不正确的
      -  如何获取正确的值？
         -  监听HomeSwiper.vue中img加载完成
         -  加载完成后，发出事件，在Home.vue中获取正确的值
         -  为了不让HomeSwiper.vue多次发出事件，可用isLoad记录状态
2. 监听滚动，动态改变tabControl的样式
   - 动态改变tabControl的样式时会出现2个问题：
     - 1. 下面的商品内容会突然上移
     - 2. tabcontrol虽设置了fixed，但也随着better-scroll一起滚动出去了
   - 解决办法：
     - 在最上面赋值一份tabcontrol组件对象，利用它来实现吸顶效果
     - 当用户滚动到一定位置时，让上面的tabcontrol组件对象显示出来，否则隐藏


# home页保持原来的状态
1. home不要随意销毁：keep-alive
2. home中的内容保持原来的位置：
   - 离开时，保存一个位置信息
   - 进来时，将位置设置为原来保存的位置即可
     - 回来时最好进行一次refresh()****


# 标题和内容的联动效果
## 点击标题，滚动到对应的主题
  1. 在detail组件中监听标题的点击，获取index
  2. 滚动到对应的主题：
     - 获取所有主题的offsetTop
     - 问题：在哪里才能获取正确的offsetTop
       -  created不行，因为压根不能获取到元素
       -  mounted不行，数据还没获取到
       -  获取到数据的回调中也不行，dom还没渲染完
       -  $nextTick也不行，因为图片的高度还没计算
       -  在图片加载完毕后获取到的才是正确的
  
  ## 内容滚动，显示正确的标题


  # 底部工具栏，点击加入购物车
  1. 监听点击，获取购物车页面需要展示的信息
    - 子组件中发射事件
    - 父组件中监听事件
      - 将所需展示的信息封装到一个对象中
  2. 添加到购物车（vuex）
    - 安装vuex
    - 配置vuex
    - 定义mutations，将商品添加到state.cartList中
    - 重构代码：
      - 将mutations中的代码抽取到actions中（复杂逻辑定义2个mutations）
        - 通过dispatch()触发actions中的方法，然后在actions中的方法中通过commit()触发mutations中的方法，修改state中的数据
      - 将mutations、actions单独抽取到文件中



# 购物车页面
1. 购物车导航栏的展示
2. 购物车商品的展示
   - CartList--->Scroll
   - CartListItem--->CheckButton
   - 商品的选中和不选中切换：
     - 修改模型对象，改变选中和不选中
3. 底部工具栏的封装
    - 全选按钮
      - 全选按钮的显示状态：
        - 有一个不选中，全选按钮就是不选中
      - 点击全选按钮：
        - 如果原来都是选中，点击全选，全部不选中
        - 如果原来都是不选中（某些不选中），点击全选，全部选中
    - 计算总价格
    - 去计算
   


   # 添加购物车弹框
   1. actions可以返回一个promise
   2. mapActions的映射
   3. 以插件的形式封装toast组件
   

   # ps
  1. 减小移动端300ms的延迟：fastclick
      - 安装
      - 导入
      - 调用attach()
  2. 图片懒加载：vue-lazyload
      - npm install vue-lazyload
      - 导入
      - Vue.use()
      - src--->v-lazy


##  项目部署（nginx（软件，提供服务的））
### window
1. 官网下载nginx--->解压--->输入localhost，显示welcome nginx，即安装成功
2. 将打包好的文件夹放进去
### linux（ubuntu（学习）   |   centos（更稳定） ）
 - yum：linux系统下的安装包管理工具
 - 通过ssh登录到远程服务器主机上 
1. yum install nginx
2. system 

  


   











  





