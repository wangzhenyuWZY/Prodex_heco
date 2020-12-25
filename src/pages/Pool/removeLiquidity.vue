<template>
<div class="removeLq">
  <container top="32">
    <!-- top="0" -->
    <div
class="title"
         slot="title">
      <div class="lt_box">
        <span class="icon_box">
          <router-link to="/pool">
           <i class="el-icon-back back_icon"></i>
          </router-link>
        </span>

        <span class="content_text">{{$t('rly')}}</span>
      </div>
      <div class="rg_box">
        <img
src="@/assets/img/icon_instructions.svg"
             alt="" />
      </div>
    </div>
    <div slot="body" style="padding-bottom:40px;">
      <!-- 滑块部分开始 -->
      <div class="box_top clearfix"><span> {{$t('Stake.Account')}} </span><span>{{$t('Stake.Detailed')}}</span></div>
      <div class="box_sizes ">
        <div class="provider add_marg">
          <div class="box_slider">
            <div class="between">{{slidenum}}%</div>
            <div class="demonstration">
              <el-slider
:show-tooltip="false"
:max="100"
                         v-model="slidenum"
@change="changeSlide"
                         ></el-slider>
            </div>
          </div>
          <ul class="setSlider">
            <li @click="changeSlide(25)">25%</li>
            <li @click="changeSlide(50)">50%</li>
            <li @click="changeSlide(75)">75%</li>
            <li @click="changeSlide(100)">MAX</li>
          </ul>
        </div>
      </div>
      <!-- 滑块结束 -->
      <!-- 箭头 -->
      <div class="from_contentIcon">
        <i class="el-icon-back tran_icon"></i>
      </div>
      <!-- end -->
        <div class="box_sizes">
          <div class="provider Receive">
            <div class="">
              <div class="received mobilerece">
                <div class="lt">
                  <img
class="lt_icon"
                      src="@/assets/img/icon_wen.svg"
                      alt="">
                  <span>{{token1.name}}</span>
                </div>
                <div class="rg"> {{token1BalanceInPool}}</div>
              </div>
              <div class="received ive_top">
                <div class="lt">
                  <img
src="@/assets/img/icon_wen.svg"
                      alt="">
                  <span>{{token2.name}}</span>
                </div>
                <div class="rg">{{token2BalanceInPool}}</div>
              </div>
            </div>
            <div class="weth">
              <el-button class="weth_btn" @click="showAlert = true">{{$t('rly1')}} {{pair.pair}}</el-button>

            </div>
          </div>
        </div>
        <div class="mount_title" hidden>
         {{$t('Exc.Price')}}
        </div>
        <div class="box_sizes box_Price" hidden>
          <div class="provider Receive">
            <div class="">
              <div class="received ">
                <div class="lt">
                  <span>1ETH=499.165 USDT</span>
                </div>
                <div class="rg">1USDT=0.02034564 ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Approve_btn clearfix" hidden>
              <el-button class="Approve1" @click="approveLpToken">{{$t('Stake.Approve')}}</el-button>
              <el-button class="Approve1 Approve2" >{{$t('Enat')}}</el-button>
        </div>
    </div>
  </container>
  <recevive
      :showAlert ='showAlert'
      @change="exitPool"
      :token1 ="token1"
      :token2 ="token2"
      :token1Num ="token1BalanceInPool"
      :token2Num ="token2BalanceInPool"
      :justPrice = "justPrice"
      :reversePrice = "reversePrice"
      :clickFn ="exitPool"
      @close="showAlert = false"
  />
   <removealert
      :isShow="showAlert1"
      :alertType="alertType"
      :url="tyepUrl"
      @close="closeAlert"
   />
</div>

</template>

<script>
const Decimal = require('decimal.js')
import { container, frominput, setselect } from '../../components/index'
import recevive from './willRecevive'
import removealert from './valret'
import BigNumber from 'bignumber.js'
export default {
  data() {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0,
      maxBalance: 0,
      slidenum: 0,
      percentage: 0,
      pair: {},
      token1: {},
      token2: {},
      token1BalanceInPool: 0,
      token2BalanceInPool: 0,
      showAlert: false,
      justPrice: 0,
      reversePrice: 0,
      tyepUrl: '',
      showAlert1: false,
      alertType: 'success' // success  waiting
    }
  },
  components: {
    container,
    recevive,
    removealert
  },
  created() {
    const setData = sessionStorage.getItem('toRemove')
    const paramsData = this.$route.params.pair
    if (this.$route.params.pair || setData) {
      const totatlData = this.$route.params.pair || setData
      this.pair = JSON.parse(totatlData)
      this.token1 = this.pair.token1
      this.token2 = this.pair.token2
      this.token1BalanceInPool = this.token1.balanceInPool
      this.token2BalanceInPool = this.token2.balanceInPool
      this.getBalance()
      this.getSpotPrice(this.token1.address, this.token2.address, 'justPrice')
      this.getSpotPrice(this.token2.address, this.token1.address, 'reversePrice')
    }
  },
  methods: {
    closeAlert() {
      this.showAlert1 = false
      window.location.reload()
    },
    async getBalance() {
      const that = this
      var functionSelector = 'balanceOf(address)'
      var parameter = [
        { type: 'address', value: window.tronWeb.defaultAddress.base58 }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(that.pair.address, functionSelector, {}, parameter)
      if (transaction) {
        that.maxBalance = parseInt(transaction.constant_result[0], 16)
      }
    },
    async approveLpToken() {
      const that = this
      var functionSelector = 'approve(address,uint256)'
      var parameter = [
        { type: 'address', value: that.pair.address },
        { type: 'uint256', value: '100000000000000000000' }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.addrss, functionSelector, { shouldPollResponse: true }, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.$message.success('success')
        })
      })
    },
    async exitPool() {
      const that = this
      var functionSelector = 'exitPool(uint256,uint256[])'
      const slidenum = Decimal(that.slidenum).div(100)
      const maxBalance = Decimal(this.maxBalance)
      // let num = Decimal(slidenum).mul(Decimal(maxBalance)).toString()
      let num = new BigNumber(slidenum)
      num = num.times(maxBalance)
      var parameter = [
        { type: 'uint256', value: num.toFixed() },
        { type: 'uint256[]', value: [0, 0] }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.address, functionSelector, {}, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.showAlert = false
          that.tyepUrl = 'https://shasta.tronscan.org/#/transaction/' + res.txID
          that.showAlert1 = true
        })
      })
    },
    changeSlide(num) {
      if (num) {
        this.slidenum = num
      }
      this.token1BalanceInPool = this.token1.balanceInPool * this.slidenum / 100
      this.token2BalanceInPool = this.token2.balanceInPool * this.slidenum / 100
    },
    async getSpotPrice(address1, address2, name) {
      var functionSelector = 'getSpotPrice(address,address)'
      var parameter = [
        { type: 'address', value: address1 },
        { type: 'address', value: address2 }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter)
      if (transaction) {
        name == 'justPrice' ? this.justPrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals) : this.reversePrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
      }
    }
  }
}
</script>

<style lang="scss"  >
.removeLq{
  padding-top: 120px;
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
color: #0F1730;
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
    color:#FC6446;
    text-decoration: underline;
    cursor: pointer;
  }
}
.box_slider {
  display: flex;
  .between {
    font-size: 56px;
    font-weight: normal;
    color:#FC6446;
    width: 144px;
  }
  .demonstration {
    flex: 1;
    padding-top: 10px;
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
    color:#FC6446;
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
 text-align: center;
  margin: 0 auto;
  margin-top: 16px;
  .weth_btn {
    background: none;
    border-radius: 28px;
    border: 1px solid#FC6446;
    font-size: 20px;
    color:#FC6446;
    padding: 0 32px;
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
.Approve_btn{
  padding: 48px 0;
  .Approve1{
      width: 293px;
      height: 56px;
      border-radius: 25px;
      color: #878B97;
      font-size: 20px;
      border: none;
    background: #F4F5FA;
  }
    .Approve2{
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
    background:#02B27D;
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
}
@media screen and (max-width: 750px) {
  .removeLq{
     padding-top: 0px;
      .add_marg {
        padding: 0.5rem 0.4rem;
      }
      .box_slider{
        .between{
          font-size:1rem;
          line-height: 1.3;
          width: 35%;
        }
      }
      .setSlider{
          li{
            width: 22%;
            // height: 0.7rem;
            line-height: 0.74rem;
            font-size: 0.35rem;
          }

      }
  .mobilerece{
    span{
      font-size: 0.37rem;
    }
  }
  }
  .weth{
    .weth_btn{
      font-size: 0.37rem;
    }
  }
  .Receive{
     padding: 0.5rem 0.4rem;
  }
    .box_top{
            span{
            font-size: 0.4rem;

            }
          }
}
</style>
