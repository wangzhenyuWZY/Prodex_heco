<template>
  <container top="32" pdd>
    <div class="title"
         slot="title">
      <div class="lt_box">
        <span class="icon_box">
          <i class="el-icon-back back_icon"></i>
        </span>
        <span class="content_text">Add Liquidity</span>
      </div>
      <div class="rg_box">
        <img src="@/assets/img/icon_instructions.svg"
             alt="" />
      </div>
    </div>
    <div slot="body"
         class="posting">
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="input"
                     showmax
                     balance='123'
                     v-model="value1"></frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect lable="321321"
                     text="深圳" />
        </div>
      </div>

      <div class="from_contentIcon">+</div>
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="input"
                     v-model="value3"></frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect :showSelect="false"
                     text="深2圳"
                     lable="321321" />
        </div>
      </div>
      <div class="box_sizes">
        <div class="provider connectbox">
          <div class="box_title">Prices and pool share</div>
          <ul class="pre_list clearfix">
            <li>
              <p>--</p>
              <p>0XBTC per ETH</p>
            </li>
            <li>
              <p>--</p>
              <p>ETH per 0XBTC</p>
            </li>
            <li>
              <p>0</p>
              <p>Share of Pool</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="connect_btn clearfix">
        <div class="whe fl_lt">
          <el-button class="from_botton"> <img class="whe_img"
                 src="@/assets/img/icon_my_wallet.svg"
                 alt=""> Connect to a wallet</el-button>
        </div>
        <div class="whe fl_rg">
          <el-button class="from_botton black_botton"> Connect to a wallet</el-button>
        </div>
      </div>

    </div>
    <div slot="footer"
         class="position">
      <div class="box_sizes connect_boxs">
        <div class="provider c_receove_Share ">
          <div class="">
            <div class="received metitle ">
              <div class="lt ">
                Your position
              </div>
              <div class="rg connect_currency">
                <div class="">
                     <img class="lt_icon"
                     src="@/assets/img/btc.svg"
                     alt="">
                     <span>ETH/USDT</span>
                </div>
                 <div class="currencyprices">0.000000233456</div>
                     
              </div>
            </div>
            <div class="received mrge12 mrgtop16">
              <div class="lt">
                <span>Your pool share:</span>
              </div>
              <span class="rg">0.0000005%</span>
            </div>
            <div class="received mrge12">
              <div class="lt">
                <span>ETH:</span>
              </div>
              <span class="">0.0092546357</span>
            </div>
            <div class="received">
              <div class="lt">
                <span>USDT:</span>
              </div>
              <span class="">4.56507</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </container>

</template>

<script>
import { container,frominput,setselect } from '../../components/index'

export default {
  data () {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0,
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
  width: 293px;
  margin: 0 auto;
  padding-bottom: 56px;
  margin-top: 48px;
}
.whe_img {
  vertical-align: sub;
}
.connectbox {
  padding: 0 24px 24px 24px;
  margin-top: 24px;
  .box_title {
    line-height: 50px;
    border-bottom: 1px solid #e5ebf2;
    font-size: 20px;
    color: #0f1730;
  }
}
.pre_list {
  margin-top: 12px;
  li {
    width: 33.3%;
    float: left;
    text-align: center;
    font-size: 18px;
    color: #0f1730;
    p:nth-child(1) {
      line-height: 25px;
      height: 25px;
    }
    p:nth-child(2) {
      color: #878b97;
      margin-top: 8px;
    }
  }
}
.connect_boxs{
    
    border-radius: 0 0 20px 20px;
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 690px;
    z-index: -1;
}

.metitle{
  height: 72px;
  line-height: 72px;
  border-bottom: 1px solid #E5EBF2;
  font-weight: normal;
    color: #0F1730;
    font-size: 20px;
    
}
.connect_currency{
  display: flex;
  justify-content: flex-start
}
.c_receove_Share{
  padding: 24px 40px;
}
.currencyprices{
  width: 190px;
  text-align: right;
}
</style>