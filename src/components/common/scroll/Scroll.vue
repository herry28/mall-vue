<template>
    <div class="wraper" ref="wraper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
// 导入better-scroll
import BScroll from 'better-scroll'

export default {
    name:'Scroll',
    data(){
        return {
            scroll:null,
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        // 创建scroll对象
        this.scroll=new BScroll(this.$refs.wraper,{
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            click:true
        })
        // 监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position)
            this.$emit('scroll',position)
        })
        // 监听上拉加载更多事件
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=300) {
            // scroll对象存在
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        }

        
    }
}
</script>

<style scoped>

</style>