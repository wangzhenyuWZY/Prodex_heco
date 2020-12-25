<template>
  <div class="stake_slect">
    <!-- <h3 class="selct_top">Earn FARM with FoxDex</h3> -->
    <container top="24">
      <!-- top="0" -->
      <div class="title" slot="title">
        <div class="lt_box">
          <span class="icon_box" @click="handelInit">
            <i class="el-icon-back back_icon"></i>
          </span>
          <span class="content_text">{{$t('Stake.Yol')}}</span>
        </div>
      </div>
      <div slot="body">
        <div class="select_top clearfix" v-show="!connectFlag">
          <p class="top__size">You haven't connected a wallet.</p>
          <p class="top__btn">
            <el-button class="from_botton" @click="butlink"> <img class="whe_img" src="@/assets/img/icon_my_wallet.svg" alt="">{{$t('nav.CWet')}}
            </el-button>
          </p>

        </div>
        <div class="box_sizes ">
          <div class="provider add_marg">
            <div class="received">
              <div class="lt">
                <span>{{farmtoal.item?farmtoal.item.token1.name:''}}</span>
                <img class="lt_icon" :src="requierImg(farmtoal.item.token1.name,0)" alt="" />
              </div>

            </div>
            <div class="text_conent ftblod">Abelo_LP
              <div class="rgh"> <span class="text_color">APY:</span> <span class="ftblod fbbb">{{farmtoal.APY}}%</span></div>
            </div>

            <div class="received">
              <div class="lt">
                <span>{{farmtoal.item?farmtoal.item.token2.name:''}}</span>
                <img class="lt_icon" :src="requierImg( farmtoal.item.token2.name,0)" alt="" />
              </div>
              <!-- <div class="rg">
                <span class="text_color">APR:</span> <span class="ftblod">322.16%</span>
                 </div> -->
            </div>
          </div>
        </div>
        <!--  -->
        <div class="text_border"> {{$t('Stake.sfox')}} <span class="colorF"></span> </div>
        <div class="received">
          <div class="lt">
            <span> {{$t('Stake.stfe')}}</span>
          </div>
          <div class="rg ftblod">{{farmtoal.uniswaplp}}</div>
        </div>
        <div class="received mrgtop16">
          <div class="lt">
            <span> {{$t('Stake.syuf')}}</span>
          </div>
          <div class="rg ftblod">{{farmtoal.balanceOf}}</div>
        </div>
        <div class="received mrgtop16">
          <div class="lt">
            <span> {{$t('Stake.sysfl')}}</span>
          </div>
          <div class="rg ftblod">{{farmtoal.shareToal}}</div>
        </div>
        <div class="Approve_btns clearfix">
          <el-button class="Approve1 from_botton fl_lt" :loading="farmtoal.btnFlag3" :disabled="Withdrawal" @click="Approve"> {{$t('unstb1')}}
          </el-button>
          <el-button class="Approve1 from_botton fl_rg" :loading="farmtoal.btnFlag2" :disabled="reward" @click="amount">{{$t('unstb2')}}</el-button>
        </div>
        <div class="ftblod mrge12"> {{$t('Stake.Approve')}}</div>
        <div class="box_sizes box_Price">
          <div class="provider ">
            <div class="">
              <div class="received ">
                <div class="lt">
                  <frominput showmax :balance="farmtoal.balanceOf" :disabled="!connectFlag" :placeholder="0.0" v-model="test1" />
                </div>
                <div class="rg mobles_rg">Abelo_LP</div>
              </div>
            </div>
          </div>
        </div>
        <div class="selt_btn clearfix">
          <el-button class="from_botton " :loading="farmtoal.btnFlag1" :disabled="stakes" @click="stake">{{$t('nav.Stake')}}</el-button>
        </div>
      </div>
    </container>
    <valret :isShow="farmtoal.showAlert1" :url="farmtoal.defaultAddress" @close='farmtoal.showAlert1=false' />
  </div>
</template>

<script>
import { container, frominput } from '../../components/index'
import { mapState } from 'vuex'
import valret from '../Pool/valret'
export default {
  props: {
    farmtoal: {
      default: {
        farmTotal: 0,
        shareToal: 0,
        uniswaplp: 0,
        maxamount: 0,
        balanceOf: 0,
        foxBalance: 0,
        btnFlag1: false,
        btnFlag2: false,
        btnFlag3: false,
        showAlert1: false,
        defaultAddress: '',
        item: { token1: {}, token2: {}}
      }
    },
    farmList: {

    }
  },
  computed: {
    ...mapState(['connectFlag']),
    reward() {
      if (this.connectFlag && this.farmtoal.uniswaplp != 0) {
        if (!this.farmtoal.btnFlag2) {
          return false
        }
        return true
      }
      return true
    },
    Withdrawal() {
      if (this.connectFlag && this.farmtoal.shareToal != 0) {
        if (!this.farmtoal.btnFlag3) {
          return false
        }
        return true
      }
      return true
    },
    stakes() {
      if (this.connectFlag && this.test1 != '') {
        if (!this.farmtoal.btnFlag1) {
          return false
        }
        return true
      }
      return true
    }
  },
  data() {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0

    }
  },
  watch: {

  },
  components: {
    // vButton: vbutton,
    container,
    frominput,
    // vfromInput: fromInput,
    // setselect
    valret
  },
  methods: {
    requierImg(name, number) {
      console.log('----------------' + name)
      let str
      // debugger
      if (name) {
        try {
          if (number != undefined) {
            str = name.split('/')

            return require('@/assets/img/currency/' + str[number] + '.png')
          }
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      } else {
        return require('@/assets/img/currency/avitve.png')
      }
    },

    hadelClick(e) {
      console.log('22222')
      console.log(e)
    },
    Approve() {
      debugger
      this.$emit('Approve')
    },
    amount() {
      this.$emit('amount', this.test1)
    },
    stake() {
      this.$emit('stake', this.farmtoal.item, this.test1)
    },
    handelInit() {
      this.test1 = ''
      this.$emit('back')
    },
    butlink() {
      console.log('点击了')
      this.$popup({
        click: () => {
          // 点击按钮事件

          this.$router.push('../../popup/popup')
        }
      })
    }

  }
}
</script>

<style lang="scss"   scoped>
.fbbb {
  color: #fc6446;
}
.rgh {
  float: right;
  font-size: 15px;
}
.colorF {
  color: #fc6446;
}
.stake_slect {
  color: #0f1730;
  font-size: 18px;
  // margin-top: 50px;
  padding-top: 120px;
  .selct_top {
    margin-bottom: 14px;
    text-align: center;
    font-size: 24px;
    font-family: roboto-mediumitalic, Roboto;
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
    font-family: roboto-mediumitalic;
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
    font-size: 16px;
    text-align: center;
    margin-top: 12px;
    margin-bottom: 32px;
  }
  .box_slider {
    display: flex;
    .between {
      font-size: 56px;
      font-weight: normal;
      color: #fc6446;
      width: 144px;
    }
    .demonstration {
      flex: 1;
      padding-top: 10px;
    }
  }
  .box_Price {
    height: 72px;
    line-height: 72px;
    padding-right: 24px;
    overflow: hidden;
    .rg {
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
      font-family: roboto-mediumitalice;
      // font-weight: normal;
      color: #0f1730;
      margin-left: 12px;
    }

    img {
      vertical-align: middle;
    }
    .lt_icon {
      // margin-top: 4px;
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
        color: #070a0e;

        // color: #0F1730;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        background: #f4f6fc;
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
    // margin-top: 50px;
    color: #878b97;
  }
  .text_conent {
    width: 300px;
    font-size: 22px;
    // text-align: center;
    margin-left: 90px;
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
        font-size: 16px;
        color: #0f1730;

        // color: #0F1730;
      }
    }
    .rg {
      span {
        font-size: 16px;
        color: #0f1730;
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
      color: #fc6446;
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
      border: 1px solid#FC6446;
      font-size: 20px;
      color: #fc6446;
      padding: 0;
      width: 200px;
      height: 32px;
    }
  }
  .selt_btn {
    padding-top: 24px;
    padding-bottom: 48px;
    .Approve1 {
      height: 56px;
      width: 210px;
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
@media screen and (max-width: 750px) {
  .stake_slect {
    padding-top: 0;
    .add_marg {
      padding: 24px 14px;
    }
    .received .lt span {
      font-size: 0.37rem;
    }
    .received .rg span {
      font-size: 0.37rem;
    }
    .text_conent {
      padding-left: 90px;
      font-size: 0.4rem;
      text-align: center;
      margin-left: 0;
      width: 100%;
    }
    .text_border {
      font-size: 0.37rem;
    }
    .Approve_btns {
      display: flex;
      .Approve1 {
        font-size: 0.37rem;
      }
    }
    .box_Price {
      height: auto;
      line-height: inherit;
      .mobles_rg {
        display: flex;
        align-items: center;
        font-size: 0.4rem;
      }
    }
  }
}
</style>
