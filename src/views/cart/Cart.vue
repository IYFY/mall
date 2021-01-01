<template>
<div class="cart">
  <nav-bar class="cart_navbar">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>

  <cart-list></cart-list>
  <child-bottom-bar></child-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComponents/CartList'
  import ChildBottomBar from './childComponents/ChildBottomBar'

  // 官网的vuex的mapGetters辅助函数的使用
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      ChildBottomBar
    },
    computed: {
        // 将 store 中的 getter 映射到局部计算属性,避免多写一个计算属性引用getters
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style>
.cart_navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-text);
  color: #fff;
}
</style>
