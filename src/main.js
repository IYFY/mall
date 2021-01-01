import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入自定义插件toast
import toast from 'components/common/toast'
//解决移动端300ms延迟
import FastClick from 'fastclick'
//图片懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// vue实例可以发射事件，可作为事件总线
Vue.prototype.$bus = new Vue();

FastClick.attach(document.body)

//安装toast插件
Vue.use(toast)
//使用时需要将img标签中的src属性修改成v-lazy
Vue.use(VueLazyLoad)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
