<template>
  <div class="container">
    <div class="globle_title">Exchange</div>
    <container top="40">
      <div slot="body">
        <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
            <frominput lable="From"
                       v-model="value1"></frominput>
          </div>
          <div class="ctx_2 fl_lt">
            <frominput lable="From"
                       v-model="value1"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect :lable='false'
                       text="深圳" />
          </div>
        </div>

        <div class="from_contentIcon">
          <i class="el-icon-back tran_icon"></i>
        </div>
        <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
            <frominput lable="To"
                       v-model="value3"></frominput>
          </div>
              <div class="ctx_2 fl_lt">
            <frominput lable="To"
                       v-model="value3"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect :lable='false'
                        :attrsrc="wenicon"
                       :showSelect="login"
                       text="深2圳" />
          </div>
        </div>
        <div class="Price_text"   v-show="login"> 
            <span>Price: </span> 
            <span>0.0020495 </span>
                <span> ETH </span> 
               <span> per </span>
               <span> DAI </span> 
               <img src="@/assets/img/icon_slect.png" alt=""></div>
        <div class="whe" :class="login?'login_text':'outlogin'">
          <el-button class="from_botton"> <img class="whe_img"
                v-show="!login"
                @click="handel"
                 src="@/assets/img/icon_my_wallet.svg"
                 alt=""> {{login?'Swap':'Connect to a wallet'}}</el-button>
        </div>
          <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
            <frominput lable="To"
                       v-model="value3"></frominput>
          </div>
              <div class="ctx_2 fl_lt">
            <frominput lable="To"
                       v-model="value3"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <frominput lable="To"
                       v-model="value3"></frominput>
          </div>
        </div>
      </div>
    <div slot="footer"
        v-show="login"
         class="position">
      <div class="box_sizes connect_boxs">
        <div class="provider c_receove_Share ">
          <div class="">
            <div class="received">
              <div class="lt">
                <span>Minimum received <img src="@/assets/img/icon_instructions.svg" alt=""></span>
              </div>
              <span class="rg">441.4 aDAI</span>
            </div>
            <div class="received setmage">
              <div class="lt">
                <span>Price Impacte <img src="@/assets/img/icon_instructions.svg" alt=""></span>
              </div>
              <span class="rec_red">5.30%</span>
            </div>
            <div class="received">
              <div class="lt">
                <span>Liquidity Provider Fee <img src="@/assets/img/icon_instructions.svg" alt=""></span>
              </div>
              <span class="">0.003 ETH</span>
            </div>
             <div class="fees_account">View pair analytics <img  src="@/assets/img/icon_jump_green.png"
                 alt=""></div>
          </div>
        </div>
      </div>
    </div>
    </container>
  </div>
</template>

<script>
import { container, frominput, setselect } from '../../components/index'
export default {
  data () {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0,
      login:false,
      wenicon: require('@/assets/img/icon_instructions.svg')
    }
  },
  components: {
    container,
    frominput,
    setselect,

  },
  methods: {
    handel() {
      console.log('2222')
      this.login = !this.login
    }
   },
}
</script>

<style lang="scss" scoped>
.whe {
  width: 320px;
  margin: 0 auto;
  padding-bottom: 48px;
}
.whe_img {
  vertical-align: sub;
}

.ctx_1 {
  width: 200px;
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
  margin-left: 12px;
}
.from_contentIcon {
  height: 36px;
  font-size: 32px;
  font-family: ArialMT;
  color: #0f1730;
  text-align: center;
}
// .add_marg{
//   margin-left: 40px;
//   margin-right: 29px;
// }
.box_top {
  padding-left: 16px;
  padding-right: 27px;
  margin-bottom: 12px;
  span {
    font-size: 20px;
  }
  span:nth-child(1) {
    float: left;
    color: #0f1730;
  }
  span:nth-child(2) {
    float: right;
    color: #ff5d37;
    text-decoration: underline;
    cursor: pointer;
  }
}
.box_slider {
  display: flex;
  .between {
    font-size: 56px;
    font-weight: normal;
    color: #ff5d37;
    width: 144px;
  }
  .demonstration {
    flex: 1;
    padding-top: 10px;
  }
}
.lt_box {
  .back_icon {
    color: #fff;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: linear-gradient(136deg, #fdab2b 0%, #df0019 100%);
    cursor: pointer;
  }
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
  margin-top: 24px;
}
.received {
  display: flex;
  justify-content: space-between;
  color: #0f1730;

  span {
    display: inline-block;
    font-size: 20px;
  }
  img {
    width: 24px;
    height: 24px;
    vertical-align: sub;
    margin-right: 8px;
  }
  .rg {
  }
  .setColr {
    color: #ff5d37;
  }
}
.setSlider {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  li {
    width: 112px;
    line-height: 48px;
    border-radius: 24px;
    font-weight: normal;
    color: #ffffff;
    font-size: 20px;
    background: #0f1730;
    text-align: center;
    cursor: pointer;
  }
}
.add_marg {
  padding: 50px 38px 32px 39px;
}
.from_contentIcon {
  margin: 24px 0;
  .tran_icon {
    transform: rotate(-90deg);
    color: #0f1730;
    font-size: 32px;
    font-weight: bold;
  }
}
.Receive {
  padding: 24px 32px;
}
.weth {
  width: 200px;
  margin: 0 auto;
  margin-top: 16px;
  .weth_btn {
    background: none;
    border-radius: 28px;
    border: 1px solid #ff5d37;
    font-size: 20px;
    color: #fe613c;
    padding: 0;
    width: 200px;
    height: 32px;
  }
}
.mount_title {
  font-size: 20px;
  font-weight: normal;
  color: #0f1730;
  padding-left: 32px;
  margin-top: 32px;
}
.box_Price {
  margin-top: 12px;
  span {
    font-size: 18px;
  }
}
.Approve_btn {
  padding: 48px 0;
  .Approve1 {
    width: 293px;
    height: 56px;
    border-radius: 25px;
    color: #878b97;
    font-size: 20px;
    border: none;
    background: #f4f5fa;
  }
  .Approve2 {
    float: right;
  }
}
.demonstration {
  .el-slider__button {
    border: none;
    width: 32px;
    height: 32px;
    position: relative;
  }
  .el-slider__button::before {
    content: "";
    background: #ff5d37;
    width: 20px;
    height: 20px;
    line-height: 32px;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .el-slider__bar {
    background: #0f1730;
  }
  .el-slider__runway {
    background: #0f1730;
  }
  .from_contentIcon {
    margin: 24px 0;
    .tran_icon {
      transform: rotate(-90deg);
      color: #0f1730;
      font-size: 32px;
      font-weight: bold;
    }
  }

}
  .Price_text{
    font-size: 20px;
    color: #0F1730;
    margin-top: 49px;
    margin-bottom: 17px;
    text-align: center;
    >img{
        vertical-align: sub;
        margin-left: 4px;
    }
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
    background: #F4F5FA;
    border-radius: 0 0 20px 20px;
    position: absolute;
    bottom: -275px;
    left: 0;
    width: 690px;
    z-index: 0;
    border-radius: 16px;
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
  padding-top: 40px;
}
.currencyprices{
  width: 190px;
  text-align: right;
}

.setmage{
    margin: 20px 0;
}
 .fees_account {
    height: 56px;
    line-height: 56px;
    border-radius: 16px;
    padding-left: 24px;
    margin-top: 25px;
    margin-bottom: 32px;
    border: 1px solid #0f1730;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      top: 12px;
      right: 24px;
    }
  }
  .rec_red{

color: #FF5D37;
  }
  .outlogin{
      margin-top: 48px;
  }
</style>