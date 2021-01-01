import Vue from 'vue'
import Vuex from 'vuex'

// 代码复杂时 将Store中的mutations和actions抽取成一个独立的js文件，再导入
// 但一般state不需要抽取出去
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
