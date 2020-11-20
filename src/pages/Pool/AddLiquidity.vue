<template>
  <container top="24">
    <!-- top="0" -->
    <div class="title"
         slot="title">
      <div class="lt_box">
        <img class="lt_icon"
             src="@/assets/img/icon_down.svg"
             alt="" />
        <span class="content_text">Add Liquidity</span>
      </div>
      <div class="rg_box">
        <img src="@/assets/img/icon_instructions.svg"
             alt="" />
      </div>
    </div>
    <div slot="body">
      <div class="box_sizes">
        <div class="provider">
          <p>You are the first liquidity provider.</p>
          <p>The ratio of tokens you add will set the price of this pool.</p>
          <p>Once you are happy with the rate click supply to review.</p>
        </div>
      </div>
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="From" v-model="value1"></frominput>
        </div>
        <div class="ctx_2 fl_lt">
          <frominput lable="From" v-model="value2"> </frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect text="深圳" />
        </div>
      </div>

      <div class="from_contentIcon">+</div>
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="From"  v-model="value3"></frominput>
        </div>
        <div class="ctx_2 fl_lt">
          <frominput lable="From" v-model="value4"> </frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect text="深圳" />
        </div>
      </div>
      <div class="margintop">
        <v-button height="50"
                  @click="showAlert = true">
          <img src="@/assets/img/icon_my_wallet.svg"
               alt="">
          <span>Connect to a wallet</span>
        </v-button>
      </div>
      <div class="box_sizes">
        <div class="provider">
          <div class="rece_content">
            <div class="received">
              <div class="lt">
                <span>Minimum received</span>
                <img src="@/assets/img/icon_instructions.svg"
                     alt="">
              </div>
              <div class="rg"> 441.4 aDAI</div>
            </div>
            <div class="received ive_top">
              <div class="lt">
                <span>Price Impacte</span>
                <img src="@/assets/img/icon_instructions.svg"
                     alt="">
              </div>
              <div class="rg setColr"> 5.30%</div>
            </div>
            <div class="received">
              <div class="lt">
                <span>Liquidity Provider Fee</span>
                <img src="@/assets/img/icon_instructions.svg"
                     alt="">
              </div>
              <div class="rg">0.003 ETH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
import { vbutton, container } from '../../components/index'
import frominput from './frominput'
import setselect from './select'
export default {
  data () {
    return {
      test1: '',
      value1:'',
      value2:'',
      value3:'',
      value4:'',

    }
  },
  components: {
    vButton: vbutton,
    container,
    frominput,
    // vfromInput: fromInput,
    setselect

  }
}
</script>

<style lang="scss" scoped>
.ctx_1 {
  width: 250px;
  display: inline-block;
}
.ctx_2 {
  width: 138px;
  display: inline-block;
  margin: 0 16px;
}
.ctx_3 {
  width: 190px;
  display: inline-block;
}
.from_contentIcon {
  height: 36px;
  font-size: 32px;
  font-family: ArialMT;
  color: #e5ebf2;
  text-align: center;
}
.margintop {
  width: 320px;
  margin: 0 auto;
  img {
    vertical-align: sub;
    margin-right: 4px;
  }
}
.rece_content {
  padding: 0 24px;
}
.ive_top {
  margin: 16px 0;
}
.received {
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  img {
    width: 15px;
    height: 15px;
    vertical-align: sub;
    margin-left: 8px;
  }
  .rg {
  }
  .setColr {
    color: #ff5d37;
  }
}
</style>