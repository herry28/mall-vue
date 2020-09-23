// module.exports={
//     configureWebpack:{
//         resolve:{
//             // 配置别名
//             alias:{
//                 'assets':'@/assets',
//                 'common':'@/common',
//                 'components':'@components',
//                 'views':'@views',
//                 'network':'@network'
//             }
//         }
//     }
// }

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  // 自动打开浏览器
  devServer:{
    open:true
  }
}
