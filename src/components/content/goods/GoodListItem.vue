<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{'￥' + goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
      // 监听图片加载完
      imgLoad()  {
        // 在main.js中new vue实例，赋值给原型
        // 通过事件总线，发射事件，在其它（home）组件中直接监听事件
        this.$bus.$emit('itemImgLoad');
      },
      itemClick() {
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid
          }
        });
      }
    }
}
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;

}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position:absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/home/collect_icon.png") 0 0/14px 14px;
}
</style>
