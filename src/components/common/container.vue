<template>
  <div class="totalModel"  :style="{'width':width+'px','height':height+'px'}">
    <div class="modelBg">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
 props: {
   width: {
     type:String,
     default:'720'
   },
   height: {
     type: String,
     default: '721'
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
    padding-top: 95px;
  }
}
</style>