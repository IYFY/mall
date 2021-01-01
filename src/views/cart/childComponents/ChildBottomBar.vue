<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-btn" :isChecked="isChecked" @click.native="btnClick"></check-button>
      <span>全选</span>
    </div>
    <div class="check-price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calculateCclick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "ChildBottomBar",
  components: {
    CheckButton
  },
  methods: {
    btnClick() {
      if (this.isChecked) {
        // for (let item of this.$store.getters.cartlist) {
        //   item.checked = false;
        // }
        this.$store.getters.cartlist.forEach(item => (item.checked = false));
      } else {
        //   for (let item of this.$store.getters.cartlist) {
        //     item.checked = true;
        //   }
        this.$store.getters.cartlist.forEach(item => (item.checked = true));
      }
    },
    calculateCclick() {
      if(!this.isChecked) {
        this.$toast.show('请选择购买的商品')
      }
    }
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartlist
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.getters.cartlist.filter(item => item.checked).length;
    },
    isChecked() {
      if (this.$store.getters.cartlist.length === 0) {
        return false;
      } else {
        // return this.$store.getters.cartlist.every(item => item.checked);
        return !this.$store.getters.cartlist.find(item => !item.checked);
      }
    }
  }
};
</script>

<style>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  bottom: 49px;
}
.check-content {
  display: flex;
  margin-top: 10px;
  margin-left: 4px;
  /* align-items: center; */
}
.check-btn {
  width: 20px;
  height: 20px;
}
.check-price {
  margin-top: 10px;
  margin-left: 15px;
}
.calculate {
  margin-top: 10px;
  margin-left: 40px;
}
</style>
