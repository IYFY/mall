// 1、创建vue.config.js文件，自定义一些配置
// alias  配置路径别名
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
      }
    }
  }
}
