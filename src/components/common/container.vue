<template>
  <div class="totalModel">
      <slot name="title"></slot>
    <div class="modelBg" :style="{'paddingTop':top+'px'}">
        <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    top:{
      type:String,
      default:'96'
    }
  }
};
</script>

<style lang="scss" scoped>
.totalModel {
  width: 720px;
  height: 721px;
  background: #171f30;
  border-radius: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 115px;
  .modelBg {
    padding: 0 50px;
  }
}
</style>