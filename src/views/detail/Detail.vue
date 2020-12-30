<template>
  <div id="detail">
    <detail-nav-bar class="navbar" @tabClick="tabClick" ref="dnavbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar class="bottombar" @addCart="addCart"></detail-bottom-bar>

    <!-- 组件作为标签时，监听原生事件要加.native修饰符 -->
    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/datail";
import { debounce } from "common/utils";

import { bcakTopMixin } from "common/mixin";
export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
  // 使用混入
  mixins: [bcakTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      currentIndex: 0
    };
  },
  created() {
    // 保存iid
    this.iid = this.$route.query.iid;

    // 使用iid请求具体数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      console.log(res);
      // 商品信息
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 商家信息
      this.shop = new Shop(data.shopInfo);
      //商品详情数据
      this.detailInfo = data.detailInfo;
      // 商品属性
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {
    // 使用事件总线监听item的图片加载
    // 防抖处理
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    const themeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param && this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(
        this.$refs.param && this.$refs.comment.$el.offsetTop
      );
      this.themeTopYs.push(
        this.$refs.param && this.$refs.recommend.$el.offsetTop
      );
    }, 100);
    // 监听图片加载完成
    this.itemImgListener = () => {
      refresh();
      themeTopY();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },

  destroyed() {
    //destroyed时取消itemImgLoad事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    // 加入购物车
    addCart() {
      console.log("dddddd");
      // 购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

      this.$store.dispatch('addCart', product)
    },
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    //导航跳转
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
      // console.log(this.themeTopYs);
    },
    //位置事件
    contentScroll(position) {
      this.offsettop(position);

      //导航栏随内容位置变化
      for (let len = this.themeTopYs.length - 1; len >= 0; len--) {
        if (-position.y >= this.themeTopYs[len]) {
          if (this.currentIndex !== len) {
            this.currentIndex = len;

            this.$refs.dnavbar.currentIndex = this.currentIndex;
            // console.log(this.$refs.dnavbar.currentIndex)
          }
          return;
        }
      }
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.navbar {
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>
