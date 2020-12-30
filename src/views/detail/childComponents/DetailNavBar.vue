<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/fanhui.png" alt />
      </div>
      <div slot="center">
        <tab-control :titles="titles" @tabClick="tabClick" ref="tabcontrol"></tab-control>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
    TabControl
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    tabClick(index) {
      this.$emit("tabClick", index);
    }
  },
  watch: {
    currentIndex() {
      this.$refs.tabcontrol.currentIndex = this.currentIndex;
    }
  }
};
</script>

<style scoped>
.back img {
  height: 42px;
  width: 42px;
  margin-top: 6px;
}
</style>
