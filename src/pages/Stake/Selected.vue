<template>
  <div class="stake_slect">
    <!-- <h3 class="selct_top">Earn FARM with FoxDex</h3> -->
    <container top="24">
      <!-- top="0" -->
      <div class="title"
           slot="title">
        <div class="lt_box">
          <span class="icon_box" @click="handelInit">
            <i class="el-icon-back back_icon"></i>
          </span>
          <span class="content_text">Your Selected Pool</span>
        </div>
      </div>
      <div slot="body">
        <div class="select_top clearfix" v-show="!connectFlag">
          <p class="top__size">You haven't connected a wallet.</p>
          <p class="top__btn">
            <el-button class="from_botton" @click="butlink"> <img class="whe_img"
                  
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
              <div class="rg"> 
                <span class="text_color">APR:</span> <span class="ftblod">322.16%</span>
                 </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="text_border">To stake UNISWAP_LP tokens, acquire <span class="colorF">them here</span> </div>
        <div class="received">
          <div class="lt">
            <span>Total FARM Earned</span>
          </div>
          <div class="rg ftblod">{{farmtoal.farmTotal}}</div>
        </div>
        <div class="received mrgtop16">
          <div class="lt">
            <span>Your Unstaked UNISWAP_LP</span>
          </div>
          <div class="rg ftblod">{{farmtoal.balanceOf}}</div>
        </div>
        <div class="received mrgtop16">
          <div class="lt">
            <span>Your Staked UNISWAP_LP</span>
          </div>
          <div class="rg ftblod">{{farmtoal.shareToal}}</div>
        </div>
        <div class="Approve_btns clearfix">
          <el-button class="Approve1 from_botton fl_lt" :loading="farmtoal.btnFlag3" :disabled="Withdrawal" @click="Approve">Withdrawal</el-button>
          <el-button class="Approve1 from_botton fl_rg" :loading="farmtoal.btnFlag2" :disabled="reward" @click="amount">Reward</el-button>
        </div>
        <div class="ftblod mrge12">Amount</div>
        <div class="box_sizes box_Price">
          <div class="provider ">
            <div class="">
              <div class="received ">
                <div class="lt">
                 <frominput
                    showmax
                    :balance="farmtoal.balanceOf"
                    :disabled ="!connectFlag"
                      :placeholder="0.0"
                    v-model="test1"
                 />
                </div>
                <div class="rg">UNISWAP_LP</div>
              </div>
            </div>
          </div>
        </div>
         <div class="selt_btn clearfix">
          <el-button class="from_botton "   :loading="farmtoal.btnFlag1"  :disabled="stakes" @click="stake">STAKE</el-button>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import { container, frominput, setselect } from '../../components/index'
import {mapState} from 'vuex'
export default {
  props: {
     farmtoal:{
       default:{
         farmTotal:0,
        shareToal:0,
        uniswaplp:0,
        maxamount:0,
        balanceOf:0,
        btnFlag1:false,
        btnFlag2:false,
        btnFlag3:false
       }
     }
  },
  computed: {
    ...mapState(['connectFlag']),
    reward () {
          if (this.connectFlag && this.farmtoal.uniswaplp!=0)  {
              if (!this.farmtoal.btnFlag2) {
                  return false
                }
                return true
          }
          return true
    },
    Withdrawal () {
         if (this.connectFlag && this.farmtoal.shareToal!=0)  {
           if (!this.farmtoal.btnFlag3) {
           return false
         }
         return true
         }
          return true;
    },
    stakes () {
      if (this.connectFlag && this.test1!=''){
         if (!this.farmtoal.btnFlag1) {
           return false
         }
         return true
      } 
           return true;
    }
  },
  data () {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0,

    }
  },
  watch: {
    
  },
  components: {
    // vButton: vbutton,
    container,
    frominput 
    // vfromInput: fromInput,
    // setselect

  },
  methods: {
    hadelClick (e) {
      console.log('22222')
        console.log(e)
    },
    Approve () {
        this.$emit('Approve')
    },
    amount () {
        this.$emit('amount',this.test1)
    },
    stake () {
      this.$emit('stake',this.test1)
    },
    handelInit() {
      this.test1 = '';
      this.$emit('back')
    },
    butlink(){
      console.log("点击了");
       this.$popup({
        click: () => {
          // 点击按钮事件 
        
          this.$router.push('../../popup/popup')

        }
      })
    }
    
  },
}
</script>

<style lang="scss"   scoped>
.colorF{
  color: #05C98E;
}
.stake_slect {
  color: #0f1730;
  font-size: 18px;
  margin-top: 50px;
  .selct_top{
    margin-bottom: 14px;
    text-align: center;
    font-size: 24px;
    font-family: Roboto-MediumItalic, Roboto;
  }
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
    font-family: Roboto-Regular, Roboto;
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

    height: 80px;
    line-height: 80px;
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
      font-family: roboto-mediumitalic;
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
        color: #070A0E;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
          background: #F4F6FC;
          font-size: 18px;
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
      width:210px;
      border-radius: 25px;
      font-size: 20px;
    }
  }
  .Approve_btns {
    margin-top: 32px;
    margin-bottom: 40px;
    .Approve1 {
      width: 210px;
      height: 56px;
      border-radius: 25px;
 
    }
    .Approve2 {
      float: right;
    }
  }
}
</style>