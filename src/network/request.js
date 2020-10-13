import axios from 'axios'


// 封装axios，并导出
export function request(config){
    // 1.创建axios的实例
    const instance=axios.create({
        // baseURL:'HTTP://123.207.32.32:8000',
       baseURL:'http://152.136.185.210:8000/api/w6',
      
        
        timeout:5000
    })
    // 2.拦截器
    instance.interceptors.request.use(config=>{
        // 处理请求信息
        return config //一定要返回config
    },err=>{
        console.log(err)
    })
    instance.interceptors.response.use(res=>{
          // 处理响应信息
        return res  //一定要返回res
    },err=>{
        console.log(err)
    })
    // 3.发送真正的请求
    return instance(config)
}