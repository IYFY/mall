<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/check.svg">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type:Boolean,
      default: false
    }
  }
}
</script>

<style>
.check-button img{

  border: 2px solid #aaa;
  border-radius: 50%;
  width: 15px;
  height: 15px;

}
.check {
  border-radius: 50%;
  background-color: palevioletred;
}
</style>
