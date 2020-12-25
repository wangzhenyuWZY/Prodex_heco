<template>
  <div>
    <div class="container exchange ">
      <container top="40" :mobile="isPc">
        <div slot="body">
          <div class="setInput clearfix">
            <div class="ctx_1 fl_lt">
              <frominput :lable="$t('Exc.From')" showmax v-model="token1Num" :balance="token1.balance" @input='cumpToken2'>

              </frominput>

            </div>
            <div class="ctx_3 fl_lt">
              <setselect
                  :showSelect="JSON.stringify(token1)!='{}'"
                  :imgUrl="token1.img"
                  item='0'
                  :balance="token1.balance"
                  :text="token1.name"
                         @click="showSelect(0)" />
            </div>
          </div>

          <div class="from_contentIcon">

            <img @click="purples" src="../../assets/img/icon_down.png" alt="">
            <!-- <i class="el-icon-back cursor tran_icon"
             @click="purples"></i> -->
          </div>
          <div class="setInput clearfix">
            <div class="ctx_1 fl_lt">
              <frominput :lable="$t('pool.to')" showmax :balance="token2.balance" v-model="token2Num" @input="cumpToken1"></frominput>
            </div>
            <div class="ctx_3 fl_lt">
              <setselect
                :showSelect="JSON.stringify(token2)!='{}'"
                :imgUrl="token2.img"
                item='1'
                :balance="token2.balance"
                :text="token2.name"
                         @click="showSelect(1)" />
            </div>
          </div>
          <div class="Price_text" v-show="connectFlag">
            <span>{{$t('Exc.Price')}}:</span>
            <span>{{spotPrice.toFixed(4)}} </span>
            <span> {{token1.name}} </span>
            <span> {{$t('Exc.per')}}</span>
            <span> {{token2.name}} </span>
            <img src="@/assets/img/icon_slect.png" alt="" @click="convert">
          </div>
          <div class="whe" :class="connectFlag?'login_text':'outlogin'">
            <div class="connect_btn clearfix">
              <div class="whe fl_lt" v-show=" Approved()">
                <el-button class="from_botton" :disabled="btnDisabled2" :loading="btnLoading2" @click="doApprove">{{$t('Stake.Approve')}}
                  {{token1.name}}</el-button>
              </div>
              <div class="whe fl_rg" v-show="!Approved()">
                <span>
                  <el-button class="from_botton" v-show="!connectFlag" @click="btnClick"> <img
                            class="whe_img"
                            src="@/assets/img/icon_my_wallet.svg"
                         alt=""> {{connectFlag?$t('Exc.Swap'): $t('nav.CWet')}}
                  </el-button>
                </span>

                <span>
                  <el-button class="from_botton" :loading="btnLoading1" v-show="connectFlag" :disabled="tobtnDisabled()" @click="confirmSwap">
                    {{$t('Exc.Swap')}}</el-button>
                </span>
              </div>
            </div>
          </div>

        </div>
       
        <div slot="footer" v-show="connectFlag&&JSON.stringify(token1)!='{}'&&JSON.stringify(token2)!='{}'" class="position">
          <div class="box_sizes connect_boxs">
            <div class="provider c_receove_Share ">
              <div class="provider1">
                <div class="received">
                  <div class="lt">
                    <span>{{$t('Exc.mrd')}}
                      <el-tooltip placement="right" effect="light">
                        <div slot="content">
                          {{$t('Exc.cts1')}}<br>
                          {{$t('Exc.cts2')}} <br>
                          {{$t('Exc.cts3')}}<br>
                          {{$t('Exc.cts4')}}
                        </div>
                        <img src="@/assets/img/icon_instructions.svg" alt="">
                      </el-tooltip>
                    </span>
                  </div>
                  <span class="rg">{{token2Num}} {{token2.name}}</span>
                </div>
              
              <div class="received setmage">
                <div class="lt">
                  <span>{{$t('Exc.cpe')}}
                    <el-tooltip placement="right" effect="light">
                      <div slot="content">
                        {{$t('Exc.cpe1')}}<br>
                        {{$t('Exc.cpe2')}}<br>
                        {{$t('Exc.cpe3')}}<br>
                      </div>
                      <img src="@/assets/img/icon_instructions.svg" alt="">
                    </el-tooltip>
                  </span>
                </div>
                <span class="rec_red">{{percentage}}%</span>
              </div>
              <div class="received">
                <div class="lt">
                  <span>{{$t('Exc.lpf')}}
                    <el-tooltip placement="right" effect="light">
                      <div slot="content">
                        {{$t('Exc.lpf1')}}<br>
                        {{$t('Exc.lpf2')}}<br>
                        {{$t('Exc.lpf3')}}<br>
                      </div>
                      <img src="@/assets/img/icon_instructions.svg" alt="">
                    </el-tooltip>
                  </span>
                </div>
                <span class="setspan">{{thisswapFee}} {{token1.name}}</span>
              </div>

              </div>
              <!-- <div class="fees_account">View pair analytics <img src="@/assets/img/icon_jump_green.png"
                     alt=""></div> -->
             </div>
            </div>
        </div>

      </container>
      <change
          v-if="isConfirm"
          @doConfirm="doswap"
          :token1='token1'
          :token2='token2'
          :token1Num='token1Num'
          :token2Num='token2Num'
                        :spotPrice='spotPrice'
          :swapFee='thisswapFee'
          :percentage='percentage'
          @handleClosea="isConfirm = false" />
      <selctoken :showAlert='isSelect' :item='item' @closeAlert="isSelect=false" @change="changeCoin" />
      <removealert :isShow="showAlert1" :alertType="alertType" :url="typeUrl" @close="closeAlert" />
    </div>
  </div>

</template>

<script>
const Web3Utils = require('web3')
const MAX = Web3Utils.utils.toTwosComplement(-1)
import BigNumber from 'bignumber.js'
const Decimal = require('decimal.js')
import { container, frominput, setselect } from '../../components/index'
import change from './change'
import selctoken from '../Pool/selctToken'
import { approved, getConfirmedTransaction, allowance } from '../../utils/tronwebFn'
import removealert from '../Pool/valret'
import {
  calcSpotPrice,
  calcOutGivenIn,
  calcInGivenOut,
  calcOutGivenInAfterPrice
} from '../../utils/calc_comparisons'
import { mapState } from 'vuex'
import { IsPc } from '../../utils/index'
export default {
  data() {
    return {
      token1: {},
      token2: {},
      token1Num: '',
      token2Num: '',
      login: true,
      isApproved: false,
      isSelect: false,
      item: 0,
      pair: {},
      decimals: 18,
      token1Balance: 0,
      token2Balance: 0,
      token1Weight: 0,
      token2Weight: 0,
      swapFee: 0,
      thisswapFee: 0,
      spotPrice: 0,
      percentage: 0,
      isConfirm: false,
      selectColor1: false,
      selectColor2: false,
      btnLoading1: false,
      btnDisabled1: true,
      purple: false,
      btnsbmit: false,
      showAlert1: false,
      alertType: 'success',
      btnLoading2: false,
      isPair: true,
      btnDisabled2: false,
      isPc: IsPc(),
      tips: '',
      typeUrl: '',
      minAmountOut: 0,
      tolerance: 0.1,
      maxPrice: MAX,
      pairList: [],
      token1spotPrice: 0
    }
  },
  computed: {
    ...mapState(['connectFlag', 'pairData'])
  },
  components: {
    container,
    frominput,
    setselect,
    change,
    selctoken,
    removealert
  },
  created() {
    const that = this
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
    this.$initTronWeb().then(function(tronWeb) {
      that.setPair()
    })
  },
  watch: {
    token1Num() {
      this.inputFlag()
    },
    token2Num() {
      this.inputFlag()
    },
    pairData(list) {
      this.pairList = JSON.parse(JSON.stringify(list))
    },
    pair(news) {
      this.changePair()
    }
  },
  methods: {
    setPair() {
      const pairAddress = this.$route.query.pairAddress
      if (this.pairList && this.pairList.length > 0) {
        this.pairList.forEach((item, index) => {
          if (item.address == pairAddress) {
            this.pair = item
            this.token1 = item.token1
            this.token2 = item.token2
            this.token1.item = 0
            this.token2.item = 1
            this.getBalance(this.token1)
            this.getBalance(this.token2)
            this.changePair()
          }
        })
      }
    },
    closeAlert() {
      this.showAlert1 = false

      // window.location.reload()
    },

    btnClick() {
      this.$popup({
        click: () => {
          // 点击按钮事件
          this.$router.push('../../popup/popup')
        }
      })
    },
    tobtnDisabled() {
      if (this.connectFlag) {
        if (this.isApproved) { // true 不需要授权 false 需要授权
          if (this.btnLoading1) {
            return false
          } else {
            return true
          }
        } else {
          if (this.btnDisabled1) {
            return true
          } else {
            return false
          }
        }
      }
      return true
    },
    purples() { // 箭头切换
      this.purple = !this.purple
      const arr = JSON.parse(JSON.stringify(this.token1))
      const arr1 = JSON.parse(JSON.stringify(this.token2))
      if (this.purple) {
        this.token1 = arr1
        this.token2 = arr
      } else {
        this.token2 = arr
        this.token1 = arr1
      }
      this.token1Num = ''
      this.token2Num = ''
      this.percentage = 0
      this.swapFee = 0
      this.spotPrice = 0
      this.inputFlag()
      this.getPairAddress()
    },
    showSelect(index) {
      this.isSelect = true
      this.item = index
    },

    changeCoin(token) {
      const that = this
      this.isSelect = false
      if (token.item == 0) {
        this.token1 = token
      } else {
        this.token2 = token
      }
      this.getPairAddress()
      that.getBalance(token)
      this.inputFlag()
    },
    async getBalance(token) { // 获取余额
      const that = this
      const tokenContract = await window.tronWeb.contract().at(token.address)
      const tokenBalance = await tokenContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
      if (token) {
        const balance = (parseInt(tokenBalance._hex, 16) / Math.pow(10, token.decimals)).toFixed(6)
        token.item == 0 ? that.token1.balance = balance : that.token2.balance = balance
      }
    },
    Approved() {
      if (this.connectFlag) {
        if (this.isApproved) {
          return true
        } else {
          //  if(this.token1.address!=null&&this.token2.address!=null) {
          //    return true
          //  } else {
          //     return false
          //  }
          return false
        }
      }
    },
    doApprove() {
      this.btnDisabled2 = true
      this.btnLoading2 = true
      if (this.token1.address && this.token2.address) {
        approved(this.token1.address, this.pair.address).then((res) => {
          this.isApproved = false
          this.btnLoading2 = false
          this.btnDisabled2 = false
        })
      } else {
        this.$message.error(this.$t('Exc.plsec'))
      }
    },
    async getPairAddress() {
      const pairname = this.token1.name + '/' + this.token2.name
      const pairname1 = this.token2.name + '/' + this.token1.name
      const pair = this.pairList.filter((item) => {
        return item.address == item.pairAddress || item.pair.toUpperCase() == pairname.toUpperCase() || item.pair.toUpperCase() == pairname1.toUpperCase()
      })
      if (pair && pair.length > 0) {
        this.pair = pair[0]
      } else {
        this.isPair = false
      }
    },
    changePair() {
      const that = this
      const pair = this.pair
      this.isPair = true
      allowance(that.token1.address, pair.address).then((res) => {
        if (res) {
          let hex = ''
          if (res._hex) {
            hex = parseInt(res._hex, 16)
          } else if (res.remaining._hex) {
            hex = parseInt(res.remaining._hex, 16)
          } else {
            hex = parseInt(res.constant_result[0], 16)
          }
          that.approveBalance1 = hex
          allowance(that.token2.address, pair.address).then((res) => {
            if (res) {
              let hex1 = ''
              if (res._hex) {
                hex1 = parseInt(res._hex, 16)
              } else if (res.remaining._hex) {
                hex1 = parseInt(res.remaining._hex, 16)
              } else {
                hex1 = parseInt(res.constant_result[0], 16)
              }
              that.approveBalance2 = hex1
              if (that.approveBalance1 == 0 || that.approveBalance2 == 0) {
                that.isApproved = true
              } else {
                that.isApproved = false
              }
            }
          })
        }
      })
      this.getBalanceInPool(pair, this.token1).then((res) => {
        this.token1Balance = res
        this.getSpotPrice()
      })
      this.getBalanceInPool(pair, this.token2).then((res) => {
        this.token2Balance = res
        this.getSpotPrice()
      })
      this.getWeight(pair, this.token1).then((res) => {
        this.token1Weight = res
        this.getSpotPrice()
      })
      this.getWeight(pair, this.token2).then((res) => {
        this.token2Weight = res
        this.getSpotPrice()
      })
      this.getSwapFee(pair).then((res) => {
        this.tips = "A protion of each trade ('+(res*1000).toFixed(4)+'%)goes to liquidity providers as a protocal incentive."
        this.swapFee = res
        this.thisswapFee = res
        this.getSpotPrice()
      })
    },
    cumpToken1() { // 计算兑换的token1
      if (!this.isPair) {
        this.$message({
          message: this.$t('ttpd'),
          type: 'error'
        })
        return
      }
      if (this.token1Balance && this.token1Weight && this.token2Balance && this.token2Weight && this.swapFee && this.token2Num) {
        const token1Num = calcInGivenOut(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.token2Num, this.swapFee)
        if (token1Num.toString() == 'NaN') {
          this.$message({
            message: 'Insufficient balance of flow pool',
            type: 'error'
          })
          return
        }
        this.token1Num = token1Num.toFixed(6)
      }
    },
    cumpToken2() { // 计算兑换的token2
      if (!this.isPair) {
        this.$message({
          message: this.$t('ttpd'),
          type: 'error'
        })
        return
      }
      if (this.token1Num == 0) {
        this.percentage = 0
        this.thisswapFee = 0
        return
      }
      if (this.token1Balance && this.token1Weight && this.token2Balance && this.token2Weight && this.swapFee && this.token1Num) {
        const token2Num = calcOutGivenIn(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.token1Num, this.swapFee)
        this.token2Num = token2Num.toFixed(6)
        const afterPrice = calcOutGivenInAfterPrice(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.token1Num, this.swapFee)
        console.log('spotPrice' + this.spotPrice.toString())
        const percentage = (Decimal(afterPrice).minus(this.spotPrice)).div(this.spotPrice).mul(Decimal(100))
        console.log('afterPrice=======' + afterPrice.toString())
        // console.log('token1spotPrice======='+this.token1spotPrice.toString())
        // this.maxPrice = Decimal(this.spotPrice).mul(1-this.tolerance).mul(this.token1Num).mul(Math.pow(10,this.token2.decimals)).toFixed(0)
        this.percentage = percentage.toFixed(2)
        this.thisswapFee = (this.token1Num * this.swapFee).toFixed(6)
      }
    },
    getMinAmountOut() {
      this.tolerance = this.$store.state.tolerance
      if (this.tolerance == 0) {
        this.maxPrice = 0
      } else {
        const token2Num = calcOutGivenIn(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, 1, this.swapFee)
        let maxNumber = Decimal(this.token1Num).mul(token2Num).mul(1 - this.tolerance)
        maxNumber = new BigNumber(maxNumber)
        this.maxPrice = maxNumber.times(Math.pow(10, this.token2.decimals)).toFixed(0)
      }
    },
    getSpotPrice() { // 计算token1的价格
      if (this.token2Balance && this.token2Weight && this.token1Balance && this.token1Weight && this.swapFee) {
        this.spotPrice = calcSpotPrice(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.swapFee)
        this.token1spotPrice = calcSpotPrice(this.token2Balance, this.token2Weight, this.token1Balance, this.token1Weight, this.swapFee)
      }
      if (this.token1Num) {
        this.cumpToken2()
      }
    },
    getBalanceInPool(pair, coin) { // 获取Pool中的余额
      return new Promise(function(resolve, reject) {
        var functionSelector = 'getBalance(address)'
        var parameter = [
          { type: 'address', value: coin.address }
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          const tokenBalanceInPool = parseInt(transaction.constant_result[0], 16) / Math.pow(10, coin.decimals)
          resolve(tokenBalanceInPool)
        })
      })
    },
    getWeight(pair, coin) { // 获取权重
      return new Promise(function(resolve, reject) {
        var functionSelector = 'getDenorm(address)'
        var parameter = [
          { type: 'address', value: coin.address }
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          const weight = parseInt(transaction.constant_result[0], 16) / Math.pow(10, pair.decimals)
          resolve(weight)
        })
      })
    },
    getSwapFee(pair) { // 获取swapfee
      return new Promise(function(resolve, reject) {
        var functionSelector = 'getSwapFee()'
        var parameter = []
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          const swapFee = parseInt(transaction.constant_result[0], 16) / Math.pow(10, pair.decimals)
          console.log('swapFee==========================' + parseInt(transaction.constant_result[0], 16))
          resolve(swapFee)
        })
      })
    },
    submitInit() {
      this.btnDisabled1 = false
      this.btnLoading1 = false
      this.btnsbmit = false
    },
    confirmSwap() {
      this.isConfirm = true
    },
    inputFlag() {
      if (this.btnsbmit) return
      if (this.token1Num != '' && this.token2Num != '' && JSON.stringify(this.token1) != '{}' && JSON.stringify(this.token2) != '{}') {
        this.btnDisabled1 = false
      } else {
        this.btnDisabled1 = true
      }
    },
    convert() {
      const token1 = this.token1
      const token2 = this.token2
      this.token1 = token2
      this.token2 = token1
      this.token2Balance = 0
      this.token2Weight = 0
      this.token1Balance = 0
      this.token1Weight = 0
      this.swapFee = 0
      this.getPairAddress()
    },
    async doswap() {
      const that = this
      let token1num = new BigNumber(that.token1Num)
      token1num = token1num.times(Math.pow(10, that.token1.decimals)).toFixed()
      if (token1num > that.approveBalance1) {
        that.doApprove()
      }
      this.isConfirm = false
      this.btnDisabled1 = true
      this.btnLoading1 = true
      this.btnsbmit = true
      if (that.token2Num > that.token2Balance) {
        this.$message.error('The exchange amount cannot be greater than the liquidity pool balance')
        that.btnDisabled1 = false
        that.btnLoading1 = false
        return
      }
      var functionSelector = 'swapExactAmountIn(address,uint256,address,uint256,uint256)'

      this.getMinAmountOut()
      console.log('that.maxPrice======' + that.maxPrice)
      var parameter = [
        { type: 'address', value: that.token1.address },
        { type: 'uint256', value: token1num },
        { type: 'address', value: that.token2.address },
        { type: 'uint256', value: that.maxPrice },
        { type: 'uint256', value: MAX }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.address, functionSelector, {}, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + signedTransaction.txID
          that.showAlert1 = true
          getConfirmedTransaction(res.txid).then((e) => {
            if (e.result == 'FAILED') {
              that.$message.error(window.tronWeb.toAscii(e.contractResult[0]))
            }
            // that.$message.success(that.$t('aut'));
            that.token1Num = 0
            that.token2Num = 0
            that.getBalance(that.token1)
            that.getBalance(that.token2)
            that.submitInit()
          }).catch((err) => {
            console.log(err)
            that.submitInit()
          })
        }).catch((err) => {
          console.log(err)
          that.submitInit()
        })
      }).catch(err => {
        console.log(err)
        that.submitInit()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/color.scss";

.provider1{
  // margin-top: -50px;
  background: #070A0E;
  border-radius: 0 0 20px 20px;
  .received{
    
    margin: 20px 10px;
    font-size: 16px;
    .lt{
      font-size: 16px;
      color: #a6aeb7;
    }
    .rg{
      font-size: 16px;
      color: #a6aeb7;
    }
    .rec_red{
       font-size: 16px;
       color: #a6aeb7;
    }
  }
}

.exchange {
  padding-top: 120px;

  .slott {
    background-color: #fff;
  }
  .slotp {
    height: 76px;
    font-size: 16px;
    font-family: roboto-mediumitalic;
    font-weight: 400;
    color: #eeeef0;
    line-height: 19px;
    background: #ffffff;
  }
  .whe {
    width: 100%;
    margin: 0 auto;
    // padding-bottom: 28px;
    margin-bottom: 38px;
  }
  .whe_img {
    vertical-align: sub;
  }

  .ctx_1 {
    width: 268px;
    display: inline-block;
  }
  .ctx_3 {
    width: 160px;
    font-family: roboto-mediumitalic;
    display: inline-block;
    margin-left: 12px;
  }
}
.add_marg {
  padding: 50px 38px 32px 39px;
}
.from_contentIcon {
  margin-top: 10px;
  margin-bottom: 10px;
  .tran_icon {
    transform: rotate(-90deg);
    color: #0f1730;
    font-size: 32px;
    font-family: roboto-mediumitalic;
    font-weight: 400;
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
      color: #fc6446;
      text-decoration: underline;
      cursor: pointer;
    }
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
  .lt_box {
    .back_icon {
      color: #070a0e;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      background: #f4f6fc;
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
    color: #000;
    span {
      display: inline-block;
    }
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }
    .rg {
      color: #ffffff;
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
      font-size: 16px;
      background: #0f1730;
      text-align: center;
      cursor: pointer;
    }
  }
  .add_marg {
    padding: 50px 38px 32px 39px;
  }
  .from_contentIcon {
    margin-top: 16px;
    margin-bottom: 12px;
    .tran_icon {
      transform: rotate(-90deg);
      color: #0f1730;
      font-size: 32px;
      font-weight: bold;
    }
  }
}
.setspan {
  line-height: 24px;
  color: #fc6446;
  padding-bottom: 20px;
}
.Price_text {
  font-size: 20px;
  color: #0f1730;
  margin-top: 30px;
  margin-bottom: 16px;
  text-align: center;
  > img {
    vertical-align: sub;
    margin-left: 4px;
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
  .setInput {
    display: flex;
    .ctx_1 {
      flex: 1;
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
      background: #02b27d;
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
      margin: 16px 0;
      .tran_icon {
        transform: rotate(-90deg);
        color: #0f1730;
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
  .setspan {
    line-height: 24px;
    color: #ffffff;
    // padding-bottom: 20px;
  }
  .Price_text {
    font-size: 20px;
    color: #0f1730;
    margin-top: 41px;
    margin-bottom: 16px;
    text-align: center;
    > img {
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

  .metitle {
    height: 72px;
    line-height: 72px;
    border-bottom: 1px solid #e5ebf2;
    font-weight: normal;
    color: #0f1730;
    font-size: 20px;
  }
  .connect_currency {
    display: flex;
    justify-content: flex-start;
  }
  .c_receove_Share {
    padding: 0 20px;
    padding-top: 50px;
    padding-bottom: 20px;

  }
  .currencyprices {
    width: 190px;
    text-align: right;
  }

  .setmage {
    margin: 18px 0;
  }
  .fees_account {
    height: 48px;
    line-height: 48px;
    border-radius: 16px;
    margin: 24px 0;
    padding-left: 25px;
    color: #a6aeb7;
    border: 1px solid #a6aeb7;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      top: 12px;
      right: 16px;
    }
  }
  .rec_red {
    line-height: 24px;
    color: #fc6446;
    // margin-top: 30px;
  }
  .outlogin {
    margin-top: 48px;
  }
  .position {
    max-width: 480px;
    margin-top: -70px;
    position: relative;
  }
  .position::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #ffffff;
    border-radius: 0 0 24px 24px;
  }
  .connect_boxs {
    background: #070a0e;
    border-radius: 0 0 20px 20px;
    width: 100%;
    z-index: -1;
    border-radius: 16px;
  }
}

@media screen and (max-width: 750px) {
  .exchange {
    margin-top: 0px;
    padding-bottom: 30px;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    // padding-top: 0px;
    .setInput {
      display: flex;
      .ctx_1 {
        flex: 1;
      }
      .ctx_3 {
        min-width: 2.8rem;
        width: 2.8rem;
      }
    }
    .c_receove_Share {
      padding-bottom: 20px;
    }
    .received {
      span {
        font-size: 0.37rem;
      }
    }
    // .setmage {
    //   margin: 8px 0;
    // }
    .fees_account {
      margin: 0;
      margin-top: 24px;
      font-size: 0.4rem;
    }
  }
}
.dark {
  .input_max {
    color: #fc6446;
  }
  .login_wallet {
    color: #fc6446;
  }
  .active-bar {
    background: #fc6446;
  }
}
</style>
