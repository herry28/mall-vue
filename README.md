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
better-scroll在决定有多少区域可以滚动时，是根据scrollHeight属性决定的
scrollHeight属性是根据better-scroll的content的子组件高度决定的
刚开始在计算scrollHeight属性时，没有将图片计算在内，所以计算出来的高度是错误的，后来图片加载完后有了新高度，但scrollHeight没有更新
监听图片加载完成：
原生js：img.onload=function(){}
vue：@load
## refresh() 函数找不到
在mounted(){}中调用
先判断this.scroll是否存在