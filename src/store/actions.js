// 一般为了（创建或使用）方法时名字不易拼错，使用一个常量了保存方法名
import {ADD_GOOD, ADD_GOOD_COUNT} from './mutations-type'

export default {
  addCart(context, payload) {
    let product = context.state.cartList.find(item => item.iid === payload.iid);
      if(product) {
        context.commit(ADD_GOOD_COUNT,product);
        // product.count += 1;
      }else {
        context.commit(ADD_GOOD,payload)
        payload.count = 1;
        // state.cartList.push(payload)
      }
  }
}
