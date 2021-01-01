<template>
  <div class="toast" v-show="isShow">
    <div >{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   show : {
  //     type: Boolean,
  //     default: true
  //   }
  // }
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    //给 message、 duration  默认toast弹框内容、 2000
    show(message = 'toast弹框内容', duration = 2000) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration)
    }
  }

}
</script>

<style scoped>
.toast {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 10px;
  position: fixed;
  border-radius: 5px;
  top: 50%;
  right: 50%;
  transform:translate(50%, -50%);
  z-index: 999;

}
</style>
