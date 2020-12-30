<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { getHomeMultidata } from "network/home";
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSeiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners:{
      type: Array,
      defualt() {
        return []
      }
    }
  },
  data() {
    return{
      isLoad: false
    }
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {
      this.$emit('swiperImgLoad');
      this.isLoad = true;
      }

    }
  }
};
</script>

<style>
</style>
