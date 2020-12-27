<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
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
  }
};
</script>

<style>
</style>
