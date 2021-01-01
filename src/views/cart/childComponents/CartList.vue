<template>
  <div class="cart-list">
    <scroll class="cart-content" ref="cartcontent">
      <cart-list-item v-for="(item, index) in cartlist" :product="item" :key="index">

      </cart-list-item>

</scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters([
      'cartlist'
    ])
  },
  activated() {
    this.$refs.cartcontent.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.cart-content {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
  height: calc(100% - 93px - 40px);
}
</style>
