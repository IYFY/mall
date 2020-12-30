import BackTop from "components/content/backTop/BackTop";
export const bcakTopMixin = {
   data() {
     return {
      isshow: false,
     }
   },
   components: {
    BackTop
   },
   methods: {
    backClick() {
      // 通过ref获取scroll组件对象
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    offsettop(position){
      // 返回顶部按键是否显示
      this.isshow = (-position.y) > 1000;
      //tabControl的粘停吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    }
   }
}

//混入
