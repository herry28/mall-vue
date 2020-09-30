import {debounce} from './utils.js'


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
        console.log('混入的内容')
    }
}