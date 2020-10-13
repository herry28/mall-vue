import {debounce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixins={
    data(){
        return {
            // 事件
            itemImgListener:null
        }
    },
    mounted(){
        let refresh = debounce(this.$refs.scroll.refresh,200)
        this.itemImgListener=()=>{
            refresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
        // console.log('混入的内容')
    }
}


// 回到顶部按钮的mixins
export const backTopMixins={
    components:{
        BackTop
    },
    data(){
        return{
            // 是否显示返回按钮
            isShowBackTop:false,
        }
    },   
    methods:{
         // 监听回到顶部按钮点击事件，回到顶部
        backTopClick(){
            this.$refs.scroll.scrollTo(0,0)
      },
    }
}
