<template>
  <div class="stake_slect">
    <container top="24">
      <!-- top="0" -->
      <div class="title"
           slot="title">
        <div class="lt_box">
          <span class="icon_box">
            <i class="el-icon-back back_icon"></i>
          </span>
          <span class="content_text">Your Selected Pool</span>
        </div>
      </div>
      <div slot="body">
        <div class="select_top clearfix">
          <p class="top__size">You haven't connected a wallet.</p>
          <p class="top__btn">
            <el-button class="from_botton"> <img class="whe_img"
                   src="@/assets/img/icon_my_wallet.svg"
                   alt=""> Connect to a wallet</el-button>
          </p>

        </div>
        <div class="box_sizes ">
          <div class="provider add_marg">
            <div class="received">
              <div class="lt">
                <span>ETH</span>
                <img class="lt_icon"
                     src="@/assets/img/icon_jump_green.png"
                     alt="">
              </div>
              <div class="rg"> <span class="text_color">APY:</span> <span class="ftblod">322.16%</span> </div>
            </div>
            <div class="text_conent ftblod">UNISWAP_LP</div>
            <div class="received">
              <div class="lt">
                <span>ETH</span>
                <img class="lt_icon"
                     src="@/assets/img/icon_jump_green.png"
                     alt="">
              </div>
              <div class="rg"> <span class="text_color">APY:</span> <span class="ftblod">322.16%</span> </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="text_border">To stake UNISWAP_LP tokens, acquire <span class="colorFE613C">them here</span> </div>
        <div class="received">
          <div class="lt">
            <span>Total FARM Earned</span>
          </div>
          <div class="rg ftblod">0.000000000</div>
        </div>
        <div class="received mrgtop16">
          <div class="lt">
            <span>Your Unstaked UNISWAP_LP</span>
          </div>
          <div class="rg ftblod">0.000000000</div>
        </div>
        <div class="received mrgtop16">
          <div class="lt">
            <span>Your Staked UNISWAP_LP</span>
          </div>
          <div class="rg ftblod">0.000000000</div>
        </div>
        <div class="Approve_btn clearfix">
          <el-button class="Approve1">Approve</el-button>
          <el-button class="Approve1 Approve2">Enter an amount</el-button>
        </div>
        <div class="ftblod mrge12">Amount</div>
        <div class="box_sizes box_Price">
          <div class="provider ">
            <div class="">
              <div class="received ">
                <div class="lt">
                 <frominput
                    showmax
                     balance='123'
                    v-model="test1"
                 />
                </div>
                <div class="rg">UNISWAP_LP</div>
              </div>
            </div>
          </div>
        </div>
         <div class="selt_btn clearfix">
          <el-button class="Approve1">STAKE</el-button>
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

    }
  },
  components: {
    // vButton: vbutton,
    container,
    frominput
    // vfromInput: fromInput,
    // setselect

  }
}
</script>

<style lang="scss"   scoped>
.stake_slect {
  color: #0f1730;
  font-size: 20px;

  .ctx_1 {
    width: 397px;
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
  .text_border {
    height: 56px;
    line-height: 56px;
    border-radius: 16px;
    border: 1px solid #0f1730;
    font-size: 20px;
    text-align: center;
    margin-top: 12px;
    margin-bottom: 32px;
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
  .box_Price{

    height: 88px;
    line-height: 88px;
    padding-right: 24px;   
    overflow: hidden;
     .rg{
      
    }
  }
  .title {
    height: 71px;
    line-height: 71px;
    border-bottom: 1px solid #e5ebf2;
    padding: 0 32px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .content_text {
      font-size: 20px;
      font-family: Arial-BoldMT, Arial;
      font-weight: normal;
      color: #0f1730;
      margin-left: 12px;
    }

    img {
      vertical-align: middle;
    }
    .lt_icon {
      margin-right: 12px;
    }
    .rg_icon {
      img {
        width: 32px;
        height: 32px;
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
  }
  .select_top {
    margin-bottom: 30px;
  }
  .top__size {
    color: #878b97;
    text-align: center;
    margin-bottom: 8px;
  }
  .top__btn {
    width: 320px;
    margin: 0 auto;
  }
  .whe_img {
    vertical-align: sub;
  }
  .text_color {
    color: #878b97;
  }
  .text_conent {
    font-size: 20px;
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
    margin-top: 24px;
  }
  .received {
    display: flex;
    justify-content: space-between;
    color: #0f1730;
    .lt {
      span {
        font-size: 20px;
      }
    }
    .rg {
      span {
        font-size: 18px;
      }
    }
    span {
      display: inline-block;
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
    padding: 24px;
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
  .selt_btn{
    padding-top: 24px;
    padding-bottom: 48px;
    .Approve1 {
      height: 56px;
      width: 100%;
      border-radius: 25px;
      color: #878b97;
      font-size: 20px;
      border: none;
      background: #f4f5fa;
    }
  }
  .Approve_btn {
    margin-top: 32px;
    margin-bottom: 40px;
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
}
</style>