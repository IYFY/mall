// 一般为了（创建或使用）方法时名字不易拼错，使用一个常量了保存方法名
import {ADD_GOOD, ADD_GOOD_COUNT} from './mutations-type'

export default {
  [ADD_GOOD](state, payload){
    state.cartList.push(payload)
  },
  [ADD_GOOD_COUNT](state, payload){
    payload.count += 1
  }
}
