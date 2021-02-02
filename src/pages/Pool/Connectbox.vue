<template>
  <div class="connect_pd">
    <container top="32" pdd>
      <div class="title" slot="title">
        <div class="lt_box  ">
          <router-link to="/pool" class="disa">
            <i class="el-icon-back back_icon"></i>
          </router-link>
          <span class="content_text fl_lt">{{$t('pool.al')}}</span>
          <div class="text_btn conct_btn fl_lt">
            <el-button class="from_botton connect_btns" :class="iSingle?'green_btn':'fff_button'" @click="iSingle=true" type="small">
              {{$t('pool.assets1')}}</el-button>
          </div>
          <div class="text_btn fl_lt">
            <el-button class=" from_botton connect_btns" :class="!iSingle?'green_btn':'fff_button'" @click="iSingle=false" type="small">
              {{$t('pool.assets2')}}</el-button>
          </div>

        </div>
        <div class="rg_box  fl_rg">
          <el-tooltip placement="left">
            <div slot="content">
              {{$t('pool.stkk1')}} <br>
              {{$t('pool.stkk2')}} <br>
              {{$t('pool.stkk3')}} <br>
              {{$t('pool.stkk4')}} <br>
              {{$t('pool.stkk5')}} <br>
            </div>
            <img src="@/assets/img/icon_instructions.svg" alt="">
          </el-tooltip>

        </div>
      </div>

      <div slot="body" class="posting">
        <div class="xzk" v-if="showFees(token1 )" @click="validation">
          <div class="fees">
            <span>
              <img :src="requierImg(token1.name)" alt="">
              <img v-show="showFees(token2)" :src="requierImg(token2.name)" alt="">
            </span>
            <span class="fees_zies">{{token1.name}}-{{token2.name}} </span>
            <img src="@/assets/img/icon_down.svg" alt="">
          </div>
        </div>
        <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
            <frominput :lable="$t('pool.Input')" showmax :balance='token1.balance' v-model="token1Num" @input="calcShare"></frominput>
          </div>
          <div class="ctx_3s fl_lt">
            <setselect
              lable="321321"
              :imgUrl="token1.img"
              item='1'
              :showSelect="JSON.stringify(token1)!='{}'"
              :balance="token1.balance"
                                    :text="token1.name"
              @click="showSelect(0)" />
          </div>
        </div>

        <div class="from_contentIcon" v-show="!iSingle">+</div>
        <div class="setInput clearfix" v-show="!iSingle">
          <div class="ctx_1 fl_lt">
            <frominput :lable="$t('pool.Input')" placeholder="" showmax :balance='token2.balance' @input="calcToken1Num" v-model="token2Num">
            </frominput>
          </div>
          <div class="ctx_3s fl_lt">
            <setselect
            :imgUrl="token2.img"
            item='2'
            :balance="token2.balance"
            :showSelect="JSON.stringify(token2)!='{}'"
            :text="token2.name"
                       @click="showSelect(1)" />
          </div>
        </div>
        <div class="box_sizes" v-show="JSON.stringify(token1)!='{}'||JSON.stringify(token2)!='{}'">
          <div class="provider connectbox">
            <div class="box_title">{{$t('pool.paps')}}</div>
            <ul class="pre_list clearfix">
              <li>
                <p>{{justPrice?justPrice.toFixed(4):'--'}}</p>
                <p>{{token1.name}}{{$t('Exc.per')}} {{token2.name}}</p>
              </li>
              <li>
                <p>{{reversePrice?reversePrice.toFixed(4):'--'}}</p>
                <p>{{token2.name}} {{$t('Exc.per')}} {{token1.name}}</p>
              </li>
              <li>
                <p>{{share}}%</p>
                <p> {{$t('sopl')}} </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="connect_btn clearfix">
          <div class="whe fl_lt" v-show="!isApproved">
            <el-button class="from_botton" :loading="charm.btnLoading2" :disabled="charm.disabled2" @click="doApprove">{{$t('Stake.Approve')}}
            </el-button>
          </div>
          <div class="whe fl_rg">
            <el-button class="from_botton" :loading="charm.btnLoading1" :disabled="btndisable()" @click="confirmSupply">{{$t('Supply')}}</el-button>
          </div>
        </div>
      </div>
      <div slot="footer" class="position " v-show="JSON.stringify(token1)!='{}'||JSON.stringify(token2)!='{}'">
        <div class="box_sizes connect_boxs">
          <div class="provider c_receove_Share ">
            <div class="">
              <div class="received metitle ">
                <div class=" ">
                  {{$t('pool.yopn')}}
                </div>
                <div class="rg connect_currency">
                  <div class="metits">
                    <span>
                      <img :src="requierImg(token1.name)" alt="">
                      <img v-show="showFees(token2)" :src="requierImg(token2.name)" alt="">
                    </span>
                    <span class="setsize">{{token1.name}}/{{token2.name}}</span>
                  </div>
                  <div class="currencyprices">{{(myBalanceInPool/Math.pow(10,18)).toFixed(6)}}</div>

                </div>
              </div>
              <div class="received mrge12 mrgtop16">
                <div class="lt1">
                  <span class="wlt"> {{$t('pool.yops')}}</span>
                </div>
                <span class="rg1">{{(myShare*100).toFixed(2)}}%</span>
              </div>
              <div class="received mrge12">
                <div class="lt2">
                  <span class="wlt">{{token1.name}}:</span>
                </div>
                <span class="rg2">{{myToken1Balance}}</span>
              </div>
              <div class="received">
                <div class="lt3">
                  <span class="wlt">{{token2.name}}:</span>
                </div>
                <span class="rg3">{{myToken2Balance}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </container>
    <selctoken :showAlert='isSelect' :item='item' @closeAlert="isSelect=false" @change="changeCoin" />
    <!--单币种流动性弹窗 -->
    <selctoken :showAlert="isSelect1" :item='item' :selectType="selectType" @closeAlert="isSelect1=false" @linkage="linkage" />
    <recevive  :showAlert='confirmPop' :popsData='popsData' @change='supply(1)' @close="confirmPop = false" />
    <removealert
      :isShow="false"
      :alertType="alertType"
      :token1Num="token1Num"
      :token2Num="token2Num"
      :token1="token1"
      :token2="token2"
      :url="typeUrl"
      @close="closeAlert" />
  </div>
</template>

<script>
const Web3Utils = require('web3')
const Decimal = require('decimal.js')
import BigNumber from 'bignumber.js'
import ipConfig from '../../config/ipconfig.bak'
import { container, frominput, setselect } from '../../components/index'
import selctoken from './selctToken'
import { decimals, Allowance, Approved, getLpBalanceInPool, getMyBalanceInPool, getTokenDenormalizedWeight } from '../../utils/tronwebFn'
import { calcPoolOutGivenSingleIn, getTokenInGivenPoolOut } from '../../utils/calc_comparisons'
import recevive from './recevive'
import removealert from './valret'
import {WETH,BPool,FactoryManager} from '../../api/deployments'
export default {
  data() {
    return {
      token1Num: '',
      token2Num: '',
      token1: {},
      token2: {},
      pair: {},
      token: {},
      isSelect: false,
      isSelect1: false,
      item: 1,
      pairAddress: null,
      justPrice: 0,
      reversePrice: 0,
      decimals: 18,
      isApproved: false,
      selectType: '',
      iSingle: false,
      token1Balance: 0,
      token2Balance: 0,
      lpTotal: 0,
      denormalizedWeight: 0,
      totalDenormalizedWeight: 0,
      typeUrl: '',
      foxDex: 0,
      share: 0,
      charm: {
        btnLoading1: false,
        disabled1: true,
        subimt: false,
        btnLoading2: false,
        disabled2: false
      },
      token2denormalizedWeight: 0,
      token1denormalizedWeight: 0,
      myShare: 0,
      myToken1Balance: 0,
      myToken2Balance: 0,
      myBalanceInPool: 0,
      reciveLptoken: 0,
      confirmPop: true,
      popsData: {},
      showAlert1: false,
      alertType: 'success',
      token1ApproveBalance: 0,
      token2ApproveBalance: 0,
      pairList: []
    }
  },
  components: {
    container,
    frominput,
    setselect,
    selctoken,
    recevive,
    removealert
  },
  computed: {
    pairData(){
      return this.$store.state.app.pairData;
    },
  },
  created() {
    const that = this
    if (this.$route.params.pair) {
      const pair = JSON.parse(this.$route.params.pair)
      this.token1 = pair.token1
      this.token2 = pair.token2
      this.token1.item = 0
      this.token2.item = 1
      this.getBasicInfo(this.token1)
      this.getBasicInfo(this.token2)
    }
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
    this.setPair()
  },
  watch: {
    token1Num() {
      this.validity()
    },
    token2Num() {
      this.validity()
    },
    iSingle() {
      this.validity()
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
            this.getBasicInfo(this.token1)
            this.getBasicInfo(this.token2)
            this.changePair()
          }
        })
      }
    },
    requierImg(name) {
      if (name) {
        try {
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      }
    },
    disableds() {
      if (JSON.stringify(this.token1) != '{}' && JSON.stringify(this.token2) != '{}') {
        if (this.token1ApproveBalance == 0) {
          return true
        } else {
          if (this.token2ApproveBalance == 0) {
            return true
          } else {
            return false
          }
        }
      } else {
        return false
      }
    },
    btndisable() {
      if (!this.charm.disabled1) { // 可以执行
        if (this.token1ApproveBalance == 0) {
          return true
        } else {
          if (this.token2ApproveBalance == 0) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    },
    closeAlert() {
      this.showAlert1 = false
      window.location.reload()
    },
    checkSupply() {
      if (!this.token1Num || this.token1Num == '' || this.token1Num == 0) {
        this.$message({
          message: this.$t('pewe1'),
          type: 'error'
        })
      } else if (this.token1Num > this.token1.balance) {
        this.$message({
          message: this.$t('pewe2'),
          type: 'error'
        })
      }
    },
    confirmSupply() { // 输出的lptoken数量
      if (parseFloat(this.token1Num) > parseFloat(this.token1.balance) || parseFloat(this.token2Num) > parseFloat(this.token2.balance)) {
        this.$message({
          message: this.$t('pewe2'),
          type: 'error'
        })
        return
      }

      if (this.iSingle) {
        const reciveLptoken = calcPoolOutGivenSingleIn(this.token1Balance, this.token1denormalizedWeight, Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))), this.totalDenormalizedWeight, this.token1Num, Decimal(this.foxDex).div(Decimal(Math.pow(10, 18))))
        this.reciveLptoken = Decimal(reciveLptoken).toFixed(6)
      } else {
        const reciveLptoken = getTokenInGivenPoolOut(this.token1Balance, this.token1Num, this.token2Balance, Decimal(this.token2Num), Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))))
        this.reciveLptoken = Decimal(reciveLptoken).toFixed(6)
      }
      this.popsData = {
        reciveLptoken: this.reciveLptoken,
        token1Num: this.token1Num,
        token2Num: this.iSingle ? 0 : this.token2Num,
        t1Per: this.justPrice,
        t2Per: this.reversePrice,
        token1: this.token1,
        token2: this.token2,
        share: this.share
      }
      this.confirmPop = true
    },
    calcToken1Num() {
      if (this.token2Num <= 0) {
        return
      }
      if (this.token1Balance && this.token2Balance) {
        this.token1Num = (this.token2Num / this.token2Balance * this.token1Balance).toFixed(6)
        // let differ = this.token2.decimals-this.token1.decimals
        // if(differ!==0 && differ>0){
        //   this.token1Num = (this.token1Num/Math.pow(10,Math.abs(differ))).toFixed(6)
        // }else if(differ!==0 && differ<0){
        //   this.token1Num = (this.token1Num*Math.pow(10,Math.abs(differ))).toFixed(6)
        // }
      }
    },
    calcShare() {
      if (this.token1Num <= 0) {
        this.share = 0
        return
      }
      if (this.token1Balance && this.token2Balance && !this.iSingle) {
        this.token2Num = (this.token1Num / this.token1Balance * this.token2Balance).toFixed(6)
        // let differ = this.token1.decimals-this.token2.decimals
        // if(differ!==0 && differ>0){
        //   this.token2Num = (this.token2Num/Math.pow(10,Math.abs(differ))).toFixed(6)
        // }else if(differ!==0 && differ<0){
        //   this.token2Num = (this.token2Num*Math.pow(10,Math.abs(differ))).toFixed(6)
        // }
      }
      if (this.pair.address) {
        this.getShare()
      }
    },
    getShare() {
      const that = this
      if (this.token1Num && this.token1Num !== 0) {
        if (this.token1Balance && this.token1denormalizedWeight && this.lpTotal && this.totalDenormalizedWeight) {
          const poolOut = calcPoolOutGivenSingleIn(this.token1Balance, this.token1denormalizedWeight, Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))), this.totalDenormalizedWeight, this.token1Num, Decimal(this.foxDex).div(Decimal(Math.pow(10, 18))))
          const plus = Decimal(poolOut).plus(Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))))
          const share = Decimal(poolOut).div(plus).mul(100)
          this.share = share.toFixed(2)
        } else {
          getTokenDenormalizedWeight(this.token1.address, this.pair.address).then((response) => {
            that.token1denormalizedWeight = response / Math.pow(10, that.pair.decimals)
            console.log('token1denormalizedWeight=========' + that.token1denormalizedWeight)
          })
          getTokenDenormalizedWeight(this.token2.address, this.pair.address).then((response) => {
            that.token2denormalizedWeight = response / Math.pow(10, that.pair.decimals)
            console.log('token2denormalizedWeight=========' + that.token2denormalizedWeight)
          })
          this.getTotalDenormalizedWeight()// 获取lptoken总权重
          this.getSwapFeeForDex()// 获取swapfee
          // this.getShare()
        }
      } else {
        this.share = 0
      }
    },
    // async getToken2DenormalizedWeight () {
    //   var functionSelector = 'getDenorm(address)';
    //   var parameter = [
    //     { type: 'address', value: this.token2.address }
    //   ]
    //   let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter);
    //   if (transaction) {
    //     this.token2denormalizedWeight = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
    //     console.log("token2权重=======" + this.token2denormalizedWeight)
    //   }
    // },
    // async getToken1DenormalizedWeight () {
    //   var functionSelector = 'getDenorm(address)';
    //   var parameter = [
    //     { type: 'address', value: this.token1.address }
    //   ]
    //   let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter);
    //   if (transaction) {
    //     this.denormalizedWeight = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
    //     console.log("token1权重=======" + this.denormalizedWeight)
    //   }
    // },
    async getTotalDenormalizedWeight() {
      let that = this
      const contract = new web3.eth.Contract(BPool.abi, this.pair.address)
      contract.methods.getTotalDenormalizedWeight().call().then((result)=>{
        that.totalDenormalizedWeight = result / Math.pow(10, this.pair.decimals)
      })
    },
    async getSwapFeeForDex() {
      let that = this
      const contract = new web3.eth.Contract(FactoryManager.abi, FactoryManager.address)
      contract.methods.swapFeeForDex().call().then((result)=>{
        that.foxDex = result / Math.pow(10, this.pair.decimals)
      })
    },
    async getCreateToken(item) {
      const that = this
      var functionSelector = 'getCurrentTokens()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(item.address, functionSelector, { shouldPollResponse: true }, parameter)
      if (!transaction.result || !transaction.result.result) {
        return console.error('Unknown error: ' + transaction, null, 2)
      }
      console.log(transaction)
    },
    async getPairAddress() {
      const that = this
      const pairname = this.token1.name + '/' + this.token2.name
      const pairname1 = this.token2.name + '/' + this.token1.name
      const pair = this.pairList.filter((item) => {
        return item.pair.toUpperCase() == pairname.toUpperCase() || item.pair.toUpperCase() == pairname1.toUpperCase()
      })
      if (pair && pair.length > 0) {
        this.pair = pair[0]
      }
    },
    changePair() {
      const that = this
      const pair = this.pair
      this.getSpotPrice(this.token1.address, this.token2.address, 'justPrice')
      this.getSpotPrice(this.token2.address, this.token1.address, 'reversePrice')
      this.getBalanceInPool(pair, this.token1).then((res) => { // 获取token1在pool中的总量
        this.token1Balance = Decimal(res+'').div(Math.pow(10,that.token1.decimals))
        getMyBalanceInPool(pair).then((res) => {
          that.myBalanceInPool = Decimal(res+'')
          if (that.lpTotal) {
            that.myShare = that.myBalanceInPool.div(that.lpTotal)
            that.myToken1Balance = that.token1Balance.mul(that.myShare)
            that.myToken2Balance = that.token2Balance.mul(that.myShare)
            console.log('that.token1Balance=========='+that.token1Balance)
            console.log('that.myShare=========='+that.myShare)
          }
        })
      })
      this.getBalanceInPool(pair, this.token2).then((res) => { // 获取token2在pool中的总量
        this.token2Balance = Decimal(res+'').div(Math.pow(10,that.token2.decimals))
        getLpBalanceInPool(this.pair).then((res) => { // 获取lptoken总量
          that.lpTotal = Decimal(res+'')
          if (that.myBalanceInPool) {
            that.myShare = that.myBalanceInPool.div(that.lpTotal)
            that.myToken1Balance = that.token1Balance.mul(that.myShare)
            that.myToken2Balance = that.token2Balance.mul(that.myShare)
            console.log('that.token1Balance=========='+that.token1Balance)
            console.log('that.myShare=========='+that.myShare)
            // that.myShare = Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal))
            // that.myToken1Balance = Decimal(that.token1Balance).mul(Decimal(that.myShare)).toFixed(6)
            // that.myToken2Balance = Decimal(that.token2Balance).mul(Decimal(that.myShare)).toFixed(6)
            // console.log('that.myShare========' + Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)))
          }
        })
      })
      let contract = {
        address:this.token1.address,
        abi:WETH.abi
      }
      Allowance(contract,pair.address).then((res) => {
        if (res) {
          that.token1ApproveBalance = res/Math.pow(10,that.token1.decimals)
          console.log(that.token1ApproveBalance)
          if (that.token1ApproveBalance == 0) {
            that.isApproved = false
          } else {
            that.isApproved = true
          }
        }
      })
      let contract1 = {
        address:this.token2.address,
        abi:WETH.abi
      }
      Allowance(contract1,pair.address).then((res) => {
        if (res) {
          that.token2ApproveBalance = res/Math.pow(10,that.token2.decimals)
          if (that.token2ApproveBalance == 0) {
            that.isApproved = false
          } else {
            that.isApproved = true
          }
        }
      })
    },
    charm1(n) {
      if (n) {
        this.charm.btnLoading1 = true
        this.charm1.disabled1 = true
      } else {
        this.charm.btnLoading1 = false
        this.charm1.disabled1 = false
      }
    },
    validity() {
      if (!this.charm.subimt) {
        if (this.iSingle) { //  单1流动性
          if (this.token1Num != '' && JSON.stringify(this.token1) != '{}' && JSON.stringify(this.token2) != '{}') {
            this.charm.disabled1 = false
          } else {
            this.charm.disabled1 = true
          }
        } else { //  双向
          if (this.token1Num != '' && JSON.stringify(this.token1) != '{}' && this.token2Num != '' && JSON.stringify(this.token2) != '{}') {
            this.charm.disabled1 = false
          } else {
            this.charm.disabled1 = true
          }
        }
      }
    },
    charm2(n) {
      if (n) {
        this.charm.btnLoading2 = true
        this.charm.disabled2 = true
      } else {
        this.charm.btnLoading2 = false
        this.charm.disabled2 = false
      }
    },
    supply() {
      this.charm1(1)
      if (this.token1ApproveBalance == 0 || this.token2ApproveBalance == 0) {
        this.$message({
          message: this.$t('pewe3'),
          type: 'error'
        })
        return
      }

      if (this.iSingle) {
        this.joinswapExternAmountIn()
      } else {
        this.joinPool()
      }
      this.confirmPop = false
    },
    async joinPool() {
      const that = this
      const MAX = Web3Utils.utils.toTwosComplement(-1)
      let lptokenNum = new BigNumber(that.reciveLptoken)
      console.log('lptokenNum==========='+lptokenNum)
      lptokenNum = lptokenNum.times(Math.pow(10, that.pair.decimals))
      const contract = new web3.eth.Contract(BPool.abi, that.pair.address)
      contract.methods.joinPool(lptokenNum.toFixed(),[MAX, MAX]).send({from:this.$store.state.app.defaultAccout}).then((result)=>{
        that.$message.success('SUCCESS!')
        // that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + signedTransaction.txID
        that.charm1()
        that.charm2()
        that.showAlert1 = true
      })
    },
    async joinswapExternAmountIn() {
      const that = this
      let token1num = new BigNumber(that.token1Num)
      token1num = token1num.times(Math.pow(10, that.token1.decimals))
      let token1balance = new BigNumber(this.token1Balance)
      token1balance = token1balance.times(Math.pow(10, 18))
      if (token1num > token1balance / 2) {
        that.$message.error('添加数量不能大于流动池的50%!')
        this.charm1()
        return
      }
      const contract = new web3.eth.Contract(BPool.abi, that.pair.address)
      contract.methods.joinswapExternAmountIn(that.token1.address,token1num.toFixed(),0).send({from:this.$store.state.app.defaultAccout}).then((result)=>{
        that.$message.success('success')
        that.charm1()
        that.showAlert1 = true
      })
    },
    changeCoin(token) {
      this.isSelect = false
      this.getBasicInfo(token)
    },
    getBasicInfo(token) {
      const that = this
      if (token.item == 0) {
        that.token1 = token
        that.selectType = token.name
      } else {
        this.token2 = token
      }
      that.getBalance(token)
      this.validity()
    },
    doApprove() {
      this.charm2(1)
      if (this.pair) {
        if (this.token1ApproveBalance == 0) {
          Approved(WETH.abi,this.token1.address, this.pair.address).then((res) => {
            this.getPairAddress()
            this.charm2()
          })
        }
        if (this.token2ApproveBalance == 0 && !this.iSingle) {
          Approved(WETH.abi,this.token2.address, this.pair.address).then((res) => {
            this.getPairAddress()
            this.charm2()
          })
        }
      } else {
        this.$layer.msg(this.$t('pewe4'))
      }
    },
    async getBalance(token) { // 获取余额
      const that = this
      let BFactoryContract = new web3.eth.Contract(WETH.abi, token.address)
      BFactoryContract.methods.balanceOf(this.$store.state.app.defaultAccout).call().then((result)=>{
        var balance = new BigNumber(result);
        balance = balance.div(Math.pow(10, token.decimals)).toFixed(3)
        token.item == 0 ? that.token1.balance = balance : that.token2.balance = balance
        if (this.token1.address && this.token2.address) {
          this.getPairAddress()
        }
      })
    },
    getBalanceInPool(pair, coin) { // 获取Pool中的余额
      const that = this
      return new Promise(function(resolve, reject) {
        let BPoolContract = new web3.eth.Contract(BPool.abi, pair.address)
        BPoolContract.methods.getBalance(coin.address).call().then((result)=>{
          var balance = new BigNumber(result);
          resolve(balance)
        })
      })
    },
    async getSpotPrice(address1, address2, name) {
      const that = this
      let BPoolContract = new web3.eth.Contract(BPool.abi,this.pair.address)
      BPoolContract.methods.getSpotPrice(address1,address2).call().then((result)=>{
        if (name == 'justPrice') {
          that.justPrice = result / Math.pow(10, this.pair.decimals)
          // const differ = this.token1.decimals - this.token2.decimals
          // if (differ !== 0 && differ > 0) {
          //   this.justPrice = that.justPrice / Math.pow(10, Math.abs(differ))
          // } else if (differ !== 0 && differ < 0) {
          //   this.justPrice = that.justPrice * Math.pow(10, Math.abs(differ))
          // }
        } else {
          that.reversePrice = result / Math.pow(10, this.pair.decimals)
          // const differ = this.token2.decimals - this.token1.decimals
          // if (differ !== 0 && differ > 0) {
          //   this.reversePrice = that.reversePrice / Math.pow(10, Math.abs(differ))
          // } else if (differ !== 0 && differ < 0) {
          //   this.reversePrice = that.reversePrice * Math.pow(10, Math.abs(differ))
          // }
        }
      })
    },
    async checkBind() { // 检查是否绑定
      var functionSelector = 'isBound(address)'
      var parameter = [{ type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C' }]
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TVQpB9Eh66hua8VKNoq3oGt6SacSbXzWk9', functionSelector, {}, parameter)
      console.log('检查==========' + window.tronWeb.toDecimal(transaction.constant_result[0]))
    },
    validation(n) {
      const str = JSON.stringify(this.token1)
      if (str != '{}') {
        this.isSelect1 = true
        this.selectType = this.token1.name
      } else {
        this.$message({
          message: this.$t('pewe4'),
          type: 'error'
        })
      }
    },
    showFees(n) { // 是否显示联动框
      if (JSON.stringify(n) == '{}') {
        return false
      }
      return true
    },
    linkage(token) { // 联动
      this.isSelect1 = false
      if (token.token1.name == this.selectType) {
        this.token1 = token.token1
        this.token2 = token.token2
      } else {
        this.token2 = token.token1
        this.token1 = token.token2
      }
      this.token1.item = 0
      this.token2.item = 1
      this.getBasicInfo(this.token1)
      this.getBasicInfo(this.token2)
    },
    showSelect(index) {
      if (index == 1 && this.iSingle) return
      this.isSelect = true
      this.selectType = ''
      this.item = index
    }
    // sbmitBtn() {
    //   if (this.showFees(this.token1) && this.showFees(this.token2)) { // 是否为空
    //     if (this.token1Num != '' && this.token2Num != '') {

    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
>>> .el-dialog__wrapper {
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.connect_pd {
  padding-top: 120px;
  padding-bottom: 100px;
}
.xzk {
  height: 56px;
  border-radius: 16px;
  // border: 1px solid #0F1730;;
  margin-bottom: 32px;
  .fees {
    height: 56px;
    border-radius: 16px;
    border: 1px solid #070a0e;
    color: #0f1730;
    text-align: center;
    line-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      display: flex;
      align-items: center;
    }
    cursor: pointer;
    .fees_zies {
      font-size: 18px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      margin: 0 8px;
    }
    img {
      width: 28px;
      height: 28px;
    }
    .fees_zies {
    }
    img:nth-child(2) {
      transform: translateX(-14px);
    }
  }
}
.wlt {
  font-size: 16px;

  color: #a6aeb7;
}

.lt_box {
  overflow: hidden;
  display: flex;
  justify-items: center;
  align-items: center;
  height: 100%;
  flex: 1;
}
.from_contentIcon {
  margin-top: 16px;
  margin-bottom: 12px;
  text-align: center;
}
.whe {
  width: 440px;
  margin: 0 auto;
  padding-bottom: 48px;
  margin-top: 40px;
}
.whe_img {
  vertical-align: sub;
}
.metit {
  // width: 30%;
}
.setsize {
  font-size: 14px;
}
.connectbox {
  padding: 0 24px 24px 24px;
  margin-top: 24px;
  .box_title {
    line-height: 50px;
    border-bottom: 1px solid #e5ebf2;
    font-size: 18px;
    font-family: roboto-mediumitalic;
    font-weight: 400;
    color: #0f1730;
  }
}

.disa {
  display: flex;
  align-items: center;
}
.conct_btn {
  margin-left: 12px;
  margin-right: 8px;
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
      font-size: 16px;
    }
  }
}
.position {
  max-width: 480px;
  margin-top: -40px;
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
  border-radius: 0 0 24px 24px;
  width: 100%;
  // position: absolute;
  font-size: 16px;
  bottom: 59px;
  left: 0;

  height: 210px;
  background: #070a0e;
  z-index: -1;
}
.connect_btns {
  height: 48px;
  font-size: 14px;
  border-radius: 12px;
  line-height: 48px;
}
.connect_btn {
  display: flex;
}
.metitle {
  margin-top: 12px;
  height: 62px;
  line-height: 62px;
  border-bottom: 1px solid #e5ebf2;
  font-weight: normal;
  color: #e5ebf2;
  display: flex;
}
.rex {
  font-size: 18px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
  color: #a6aeb7;
}
.ctx_1 {
  // max-width: 268px;
  display: inline-block;
}
.text_btn {
  max-width: 104px;
}
.text_btn1 {
}
.setInput {
  display: flex;
  .ctx_1 {
    flex: 1;
  }
  .ctx_3s {
    width: 160px;
    display: inline-block;
    margin-left: 12px;
  }
}

.lt1,
.lt2,
.lt3 {
  height: 17px;
  color: #a6aeb7;
  font-size: 16px;
}
.rg1,
.rg2,
.rg3 {
  height: 17px;
  color: #e5ebf2;
  font-size: 16px;
}
.title {
  display: flex;
}

.connect_currency {
  overflow: hidden;
  flex: 1;
  display: flex;
  justify-content: center;
}
.c_receove_Share {
  padding: 24px 20px;
}
.currencyprices {
  // width: 190px;
  text-align: right;
  width: 40%;
}
.received {
  display: flex;
  justify-content: space-between;
}
.metits {
  width: 60%;
  font-size: 16px;
  text-align: center;

  span {
    margin-right: 6px;
    display: inline-block;
  }
  img {
    transform: translateX(12px);
    width: 28px;
  }
  img:nth-child(2) {
    transform: translateX(1px);
  }
}
.typeBtn {
  width: 136px;
  height: 48px;
  background: #fff;
  border-radius: 16px;
  margin-left: 23px;

  font-size: 18px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
}
.typeBtn1 {
  width: 136px;
  height: 48px;
  background: #fc6446;
  border-radius: 16px;
  margin-left: 8px;
  font-size: 18px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
}
@media screen and (max-width: 750px) {
  .connect_pd {
    margin: 0;
    padding: 0;
    padding-top: 10px;
    .back_icon {
      width: 0.8rem;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
  .setInput .ctx_3s {
    width: 2.8rem;
  }
  .from_contentIcon {
    margin: 0;
  }
  .position {
    width: 100%;
  }
  .received span {
    font-size: 16px;
  }
  .title {
    display: flex;
    padding: 10px 0.2rem;
    .content_text {
      // width: 54px;
      font-size: 0.4rem;
    }
  }
}
@media screen and (max-width: 475px) {
  .conct_btn {
    // margin-left: 50px;
    margin: 0 0.2rem;
  }
  .lt_box {
    flex-wrap: wrap;
  }
  .pre_list {
    li {
      width: 50%;
    }
    li:nth-child(3) {
      width: 100%;
      margin-top: 10px;
    }
  }
  .connect_btns {
    font-size: 12px;
    height: 1rem;
    line-height: 1rem;
    width: 2.1rem;
    padding: 0;
  }
}
//  @media screen and (max-width:375px){
// .conct_btn{
//     margin-left:15px;
//   }
//  }
//   @media screen and (max-width:320px){
// .conct_btn{
//     margin-left:9px;
//   }
//  }
</style>
