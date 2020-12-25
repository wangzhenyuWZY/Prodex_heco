<template>
  <container top="32">
    <div
class="title"
         slot="title">
      <div class="lt_box">
        <span class="icon_box">
          <i class="el-icon-back back_icon"></i>
        </span>

        <span class="content_text">{{$t('pool.al')}}</span>
      </div>
      <div class="rg_box">
        <img
src="@/assets/img/icon_instructions.svg"
             alt="" />
      </div>
    </div>
    <div slot="body">
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput
lable="input"
                     v-model="value1"></frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect text="深圳" />
        </div>
      </div>

      <div class="from_contentIcon">+</div>
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput
lable="input"
                     v-model="value3"></frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect
:showSelect="false"
                     text="深2圳" />
        </div>
      </div>
      <div class="whe">
        <el-button class="from_botton"> <img
class="whe_img"
               src="@/assets/img/icon_my_wallet.svg"
               alt="">{{$t('nav.CWet')}}</el-button>
      </div>

    </div>
  </container>

</template>

<script>
import { container, frominput, setselect } from '../../components/index'

export default {
  data() {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0
    }
  },
  components: {
    container,
    frominput,
    setselect

  }
}
</script>

<style lang="scss" scoped>

.whe {
  width: 320px;
  margin: 0 auto;
  padding-bottom: 56px;
  margin-top: 48px;
}
.whe_img {
  vertical-align: sub;
}
</style>
