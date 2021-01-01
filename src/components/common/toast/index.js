// 插件的形式封装组件
// 在main.js文件中导入安装插件,到时候就会执行这里的install函数
// this.$toast使用
import Toast from './Toast'
const obj = {}
// install函数还会传入一个Vue参数
obj.install = function(Vue) {
  // console.log('toast install', Vue)

  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2、使用new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  // 3、将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4、toast.$el对应的就是div,将div挂载到body上
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj
