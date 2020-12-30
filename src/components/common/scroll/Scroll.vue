<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//滚动的插件
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // this.scroll.scrollTo(x, y, time);
      // 有时候（图片请求完成，而scoll还没创建）调用该函数时，scroll属性还没有创建，
      // 或者属性没有方法，一调用就会报错，严谨写法：
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    // 下拉加载更多函数
    finishPullUp() {
      // this.scroll.finishPullUp();
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refresh() {
      // this.scroll.refresh();
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // probeType与pullUpLoad 都会触发BScroll的scroll事件
      observeDOM: true
    });
    // 监听滚动位置
    if (this.probeType === 1 || this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    // 监听下拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  }
};
</script>



<style >
</style>
