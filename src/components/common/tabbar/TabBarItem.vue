<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot> -->
    <!-- 在slot中动态绑定属性和设置其它属性除了name外是可能不起作用的，因为slot会被传入的标签替换的建议在外层包装div -->
    <!-- <slot  name="item-text"></slot> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>

// 封装tabbar组件中的item组件，item组件可以自定义图片、文字、活跃时文字颜色

export default {
  name: "TabBarItem",
  props: {
    path:{
      type: String
    },
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {};
    }
  },
  methods: {
    itemClick() {
      // 重复点击会报错，将错误抛出，先不处理
      this.$router.push(this.path).catch(err => err);
    }
  },
  activated() {
    this.isActive = true;
    console.log("houy");
  },
  deactivated() {
    this.isActive = false;
    console.log("buhouy");
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;

  /* 一般tabber的高度设置为49px */
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>