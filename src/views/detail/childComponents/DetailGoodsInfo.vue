<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
    <div class="info-key">{{item.key}}</div>
    <div class="info-list">
      <img
        class="img"
        v-for="(item, index) in item.list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  methods: {
    imgLoad() {
      // 也可以使用防抖函数
      if(++this.counter === this.imagesLength) {
        this.$emit('imageLoad');
      }
    }
  },
  watch: {
    detailInfo() {
      // 获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.goods-info {
  position: static;
}
.info-desc {
  padding: 20px 0;
  position: relative;
}
.info-desc .sstart {
  width: 60px;
  height: 1px;
  background-color: #333;
  margin-left: 4px;
}
.sstart ::before, .end ::after{
  position: absolute;
  left: 4px;
  top: -2.5px;
  display: block;
  content: "";
  width: 5px;
  height: 5px;
  background-color: #333;
}
.info-desc .end {
  width: 60px;
  height: 1px;
  background-color: #333;
  position: absolute;
  right: 4px;
  bottom: 0;
}
.desc,
.info-key {
  padding: 10px 4px;
  font-size: 14px;
  padding-bottom: 6px;
  line-height: 20px;
  margin: 4px 0;
  text-indent: 10px;
}
.info-list .img {
  width: 100%;
}
</style>
