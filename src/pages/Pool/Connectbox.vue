<template>
  <div class="connect_pd">
    <container top="32"
               pdd >
      <div class="title"
           slot="title">
        <div class="lt_box  fl_lt">
          <router-link to="/pool" class="fl_lt">
            <span class="icon_box">
              <i class="el-icon-back back_icon"></i>
            </span>
          </router-link>
          <span class="content_text fl_lt">Add Liquidity</span>
          <div class="text_btn conct_btn fl_lt">
               <el-button class="from_botton connect_btns  green_btn "
                     @click="iSingle=true"
                     type="small">Single Token </el-button>
          </div>
         <div class="text_btn fl_lt">
              <el-button class=" from_botton  fff_button connect_btns"
                     @click="iSingle=false"
                     type="small">Double Token </el-button>
         </div>
        
        </div>
        <div class="rg_box  fl_rg">
          <el-tooltip class="item" 
                  effect="dark" 
                  content="Right Center 提示文字" 
                  placement="right">
                  <img src="@/assets/img/icon_instructions.svg" alt="">
                </el-tooltip>
        </div>
      </div>

      <div slot="body"
           class="posting">
        <div class="xzk"
             v-show="showFees(token1)"
             @click="validation">
          <div class="fees">
            <span>
              <img src="@/assets/img/btc.svg"
                   alt="">
              <img v-show="showFees(token2)"
                   src="@/assets/img/btc.svg"
                   alt="">
            </span>
            <span class="fees_zies">{{token1.name}}-{{token2.name}} </span>
            <img src="@/assets/img/icon_down.svg"
                 alt="">
          </div>
        </div>
        <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
            <frominput lable="input"
                       showmax
                       :balance='token1.balance'
                       v-model="token1Num"
                       @input="calcShare"></frominput>
          </div>
          <div class="ctx_3s fl_lt">
            <setselect lable="321321"
                       :imgUrl="token1.img"
                       item='1'
                       :showSelect ="JSON.stringify(token1)!='{}'"
                       :balance="token1.balance"
                       :text="token1.name"
                       @click="showSelect(0)" />
          </div>
        </div>

        <div class="from_contentIcon"
             v-show="!iSingle">+</div>
        <div class="setInput clearfix"
             v-show="!iSingle">
          <div class="ctx_1 fl_lt">
            <frominput lable="input"
                       placeholder=""
                       showmax
                     
                       :balance='token2.balance'
                       @input="calcToken1Num"
                       v-model="token2Num"></frominput>
          </div>
          <div class="ctx_3s fl_lt">
            <setselect :imgUrl="token2.img"
                       item='2'
                       :balance="token2.balance"
                         :showSelect ="JSON.stringify(token2)!='{}'"
                       :text="token2.name"
                       @click="showSelect(1)" />
          </div>
        </div>
        <div class="box_sizes">
          <div class="provider connectbox">
            <div class="box_title">Prices and pool share</div>
            <ul class="pre_list clearfix">
              <li>
                <p>{{justPrice?justPrice.toFixed(6):'--'}}</p>
                <p>{{token1.name}} per {{token2.name}}</p>
              </li>
              <li>
                <p>{{reversePrice?reversePrice.toFixed(6):'--'}}</p>
                <p>{{token2.name}} per {{token1.name}}</p>
              </li>
              <li>
                <p>{{share}}%</p>
                <p>Share of Pool</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="connect_btn clearfix">
          <div class="whe fl_lt"
               v-show="!isApproved">
            <el-button class="from_botton"
                       @click="doApprove">Approve {{token1.name}}</el-button>
          </div>
          <div class="whe fl_rg">
            <el-button class="from_botton black_botton"
                       :loading="charm.btnLoading1"
                       :disabled="charm.disabled1"
                       @click="confirmSupply">Supply</el-button>
          </div>
        </div>
      </div>
      <div slot="footer"
           class="position clearfix" v-show="JSON.stringify(token1)!='{}'||JSON.stringify(token2)!='{}'">
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
                    <span>{{token1.name}}/{{token2.name}}</span>
                  </div>
                  <div class="currencyprices">{{myBalanceInPool}}</div>

                </div>
              </div>
              <div class="received mrge12 mrgtop16">
                <div class="lt1">
                  <span>Your pool share:</span>
                </div>
                <span class="rg1">{{myShare*100}}%</span>
              </div>
              <div class="received mrge12">
                <div class="lt2">
                  <span>{{token1.name}}:</span>
                </div>
                <span class="rg2">{{token1Balance*myShare}}</span>
              </div>
              <div class="received">
                <div class="lt3">
                  <span>{{token2.name}}:</span>
                </div>
                <span class="rg3">{{token2Balance*myShare}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </container>
    <selctoken :showAlert='isSelect'
               :item='item'
               @closeAlert="isSelect=false"
               @change="changeCoin"
                />
      <!--单币种流动性弹窗 -->
    <selctoken
          :showAlert ="isSelect1"
          :item='item'
          :selectType="selectType"
          @closeAlert="isSelect1=false"
          @linkage="linkage"
    />
    <recevive
      v-if="confirmPop"
      :showAlert ='confirmPop'
      :popsData = 'popsData'
      @change='supply(1)'
      @close="confirmPop = false"
    />           
  </div>
</template>

<script>
const Decimal = require('decimal.js');
import ipConfig from '../../config/ipconfig.bak'
import { container, frominput, setselect } from '../../components/index'
import selctoken from './selctToken';
import tokenData from '../../utils/token'
import { decimals, allowance, approved, getLpBalanceInPool, getMyBalanceInPool  } from '../../utils/tronwebFn'
import {calcPoolOutGivenSingleIn,getTokenInGivenPoolOut} from '../../utils/calc_comparisons'
import recevive from './recevive'

export default {
  data () {
    return {
      token1Num: '',
      token2Num: '',
      token1: {},
      token2: {},
      pair: {},
      token: {},
      isSelect: false,
      isSelect1:false,
      item: 1,
      pairAddress: null,
      justPrice: 0,
      reversePrice: 0,
      decimals: 18,
      isApproved: true,
      selectType: '',
      item: 1,
      iSingle: false,
      token1Balance: 0,
      token2Balance: 0,
      lpTotal: 0,
      denormalizedWeight: 0,
      totalDenormalizedWeight: 0,
      foxDex: 0,
      share: 0,
      charm: {
        btnLoading1: false,
        disabled1: true,
        subimt: false
      },
      token2denormalizedWeight:0,
      myShare:0,
      myBalanceInPool:0,
      reciveLptoken:0,
      confirmPop:false,
      popsData:{}
    }
  },
  components: {
    container,
    frominput,
    setselect,
    selctoken,
    recevive
  },
  created () {
    if (this.$route.params.pair) {
      let pair = JSON.parse(this.$route.params.pair)
      this.token1 = pair.token1
      this.token2 = pair.token2
      this.token1.item = 0
      this.token2.item = 1
      this.getBasicInfo(this.token1)
      this.getBasicInfo(this.token2)
    }
  },
  watch: {
    token1Num () {
      this.validity();
    },
    token2Num () {
      this.validity();
    },
    iSingle () {
      this.validity();
    }
  },
  methods: {
    checkSupply(){
      if(!this.token1Num || this.token1Num=='' || this.token1Num==0){
        that.$message({
          message: '请输入添加数量',
          type: 'error'
        });
      }else if(this.token1Num>this.token1.balance){
        that.$message({
          message: '钱包余额不足',
          type: 'error'
        });
      }
    },
    confirmSupply(){//输出的lptoken数量
      let reciveLptoken = getTokenInGivenPoolOut(this.token1Balance,this.token1Num,this.token2Balance,this.token2Num,Decimal(this.lpTotal).div(Math.pow(10,this.pair.decimals)).toString())
      this.reciveLptoken = reciveLptoken
      this.popsData = {
        reciveLptoken:this.reciveLptoken,
        token1Num:this.token1Num,
        token2Num:this.token2Num,
        t1Per:this.justPrice,
        t2Per:this.reversePrice,
        token1:this.token1,
        token2:this.token2,
        share:this.share
      }
      this.confirmPop = true
    }, 
    calcToken1Num(){
      if(this.token1Balance&&this.token2Balance){
        this.token1Num = (this.token2Num/this.token2Balance*this.token1Balance).toFixed(6)
        // let differ = this.token2.decimals-this.token1.decimals
        // if(differ!==0 && differ>0){
        //   this.token1Num = (this.token1Num/Math.pow(10,Math.abs(differ))).toFixed(6)
        // }else if(differ!==0 && differ<0){
        //   this.token1Num = (this.token1Num*Math.pow(10,Math.abs(differ))).toFixed(6)
        // }
      }
      
    },
    calcShare(){
        if(this.token1Balance&&this.token2Balance){
          this.token2Num = (this.token1Num/this.token1Balance*this.token2Balance).toFixed(6)
          // let differ = this.token1.decimals-this.token2.decimals
          // if(differ!==0 && differ>0){
          //   this.token2Num = (this.token2Num/Math.pow(10,Math.abs(differ))).toFixed(6)
          // }else if(differ!==0 && differ<0){
          //   this.token2Num = (this.token2Num*Math.pow(10,Math.abs(differ))).toFixed(6)
          // }
        }
      if(this.pair){
        this.getShare()
      }
    },
    getShare () {
      let that = this
      if(this.token1Num && this.token1Num!==0){
        if(this.token1Balance&&this.denormalizedWeight&&this.lpTotal&&this.totalDenormalizedWeight){
          let poolOut = calcPoolOutGivenSingleIn(this.token1Balance,this.denormalizedWeight,this.lpTotal,this.totalDenormalizedWeight,this.token1Num,this.foxDex)
          this.share = (poolOut/this.lpTotal*100).toFixed(2) 
        }else{
          this.getToken1DenormalizedWeight()//获取token1在pool中的权重
          this.getToken2DenormalizedWeight()//获取token2在pool中的权重
          this.getTotalDenormalizedWeight()//获取lptoken总权重
          this.getSwapFeeForDex()//获取swapfee
        }
      } else {
        this.share = 0
      }
      
    },
    async getToken2DenormalizedWeight(){
      var functionSelector = 'getDenormalizedWeight(address)';
      var parameter = [
        { type: 'address', value: this.token2.address }
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter);
      if (transaction) {
        this.token2denormalizedWeight = parseInt(transaction.constant_result[0],16)/Math.pow(10,this.pair.decimals)
        console.log("token2权重======="+this.token2denormalizedWeight)
      }
    },
    async getToken1DenormalizedWeight(){
      var functionSelector = 'getDenormalizedWeight(address)';
      var parameter = [
        { type: 'address', value: this.token1.address }
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter);
      if (transaction) {
        this.denormalizedWeight = parseInt(transaction.constant_result[0],16)/Math.pow(10,this.pair.decimals)
        console.log("token1权重======="+this.denormalizedWeight)
      }
    },
    async getTotalDenormalizedWeight () {
      var functionSelector = 'getTotalDenormalizedWeight()';
      var parameter = []
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter);
      if (transaction) {
        this.totalDenormalizedWeight = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
        console.log('this.totalDenormalizedWeight========' + this.totalDenormalizedWeight)
      }
    },
    async getSwapFeeForDex () {
      var functionSelector = 'swapFeeForDex()';
      var parameter = []
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(ipConfig.FactoryManager, functionSelector, {}, parameter);
      this.foxDex = parseInt(transaction.constant_result[0], 16)
      console.log('this.foxDex========' + transaction.constant_result[0])
    },
    async getPairAddress () {
      let that = this
      let pairname = this.token1.name + '/' + this.token2.name
      let pairname1 = this.token2.name + '/' + this.token1.name
      let pair = tokenData.pairList.filter((item) => {
        return item.pair == pairname.toUpperCase() || item.pair == pairname1.toUpperCase()
      })
      if (pair) {
        this.pair = pair[0]
        console.log(this.token1.address,this.token2.address)
        this.getSpotPrice(this.token1.address, this.token2.address, 'justPrice')
        this.getSpotPrice(this.token2.address, this.token1.address, 'reversePrice')
        this.getBalanceInPool(pair[0], this.token1).then((res) => {//获取token1在pool中的总量
          console.log('this.token1Balance====='+res)
          this.token1Balance = res
          getMyBalanceInPool(pair[0]).then((res)=>{
            that.myBalanceInPool = Decimal(res).div(Math.pow(10,this.pair.decimals))
            console.log('that.myBalanceInPool========'+that.myBalanceInPool   )
            if(that.lpTotal){
              that.myShare = Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)).toFixed(4).toString()
              console.log("that.myShare========"+Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)).toString())
            }
          })
        })
        this.getBalanceInPool(pair[0],this.token2).then((res)=>{//获取token2在pool中的总量
          console.log('this.token2Balance====='+res)
          this.token2Balance = res
          getLpBalanceInPool(this.pair).then((res)=>{//获取lptoken总量
            console.log('lptoken======='+res)
            // that.lpTotal = Decimal(res).div(Math.pow(10,this.pair.decimals))
            that.lpTotal = Decimal(res)
            if(that.myBalanceInPool){
              that.myShare = Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)).toFixed(4).toString()
              console.log("that.myShare========"+Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)))
            }
          })
        })
        
        allowance(this.token1.address,pair[0].address).then((res) => {
          if (res) {
            let approveBalance = parseInt(res._hex, 16)
            if (approveBalance == 0) {
              // that.$message({
              //   message: '未授权请先授权',
              //   type: 'error'
              // });
              that.isApproved = false
            } else {
              that.isApproved = true
            }
          }
        })
      }
    },
    charm1 (n) {
      if (n) {
        this.charm.btnLoading1 = true;
        this.charm1.disabled1 = true;
      } else {
        this.charm.btnLoading1 = false;
        this.charm1.disabled1 = false;
      }

    },
    validity () {
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
    supply () {
      this.charm1(1);
      if (this.iSingle) {
        this.joinswapExternAmountIn()
      } else {
        this.joinPool()
      }
      this.confirmPop = false
    },
    async joinPool () {
      let that = this
      var functionSelector = 'joinPool(uint256,uint256[])';
      var parameter = [
        { type: 'uint256', value: Decimal(that.reciveLptoken).mul(Math.pow(10,that.pair.decimals)).toString() },
        { type: 'uint256[]', value: [Decimal(that.token1Balance).mul(Math.pow(10,that.token1.decimals)).toString(), Decimal(that.token2Balance).mul(Math.pow(10,that.token2.decimals)).toString()] },
      ]
      console.log(parameter)
      try {
        let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.pair.address, functionSelector, {}, parameter);
        if (!transaction.result || !transaction.result.result){
            that.charm1();
            return console.error('Unknown error: ' + transaction, null, 2);
        }
        window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
            that.$message.success("SUCCESS!")
            that.charm1();
          }).catch((err) => {
            console.log(err);
            that.charm1();
          });
        })
      } catch (error) {
        console.log(error);
        that.charm1();
      }

    },
    async joinswapExternAmountIn () {
      let that = this
      var functionSelector = 'joinswapExternAmountIn(address,uint256,uint256)';
      var parameter = [
        { type: 'address', value: that.token1.address },
        { type: 'uint256', value: that.token1Num * Math.pow(10, that.token1.decimals) },
        { type: 'uint256', value: 0 }
      ]
      try {
        console.log('走到1')
        let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.address, functionSelector, {}, parameter);
        console.log('走到2',transaction)
        if (!transaction.result || !transaction.result.result){
          that.charm1();
          return console.error('Unknown error: ' + transaction, null, 2);
        }
        window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
            that.$message.success('success');
            that.charm1();
          }).catch(err => {
            that.charm1();
            console.log(err);
          });
        })
      } catch (error) {
        console.log('走到3')
        console.log(111,error);
          that.charm1();
      }

    },
    changeCoin (token) {
      this.isSelect = false
      this.getBasicInfo(token)
    },
    getBasicInfo (token) {
      let that = this;
    
      decimals(token.address).then((res) => {
        token.decimals = res
        if (token.item == 0) {
          that.token1 = token
          that.selectType = token.name;
        } else {
          this.token2 = token
        }
        that.getBalance(token)
      }).catch((err) => {
        console.log(err);
      })
      this.validity();
    },
    doApprove () {
      if (this.pair) {
        approved(this.token1.address, this.pair.address)
      } else {
        this.$layer.msg('请选择交易对')
      }
    },
    async getBalance (token) {//获取余额
      let that = this
      let tokenContract = await window.tronWeb.contract().at(token.address)
      let tokenBalance = await tokenContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
      if (token) {
        let balance = parseInt(tokenBalance._hex, 16) / Math.pow(10, token.decimals)
        token.item == 0 ? that.token1.balance = balance : that.token2.balance = balance
        if (this.token1.address && this.token2.address) {
          this.getPairAddress()
        }
      }
    },
    getBalanceInPool (pair, coin) {//获取Pool中的余额
      let that = this
      return new Promise(function (resolve, reject) {
        var functionSelector = 'getBalance(address)';
        var parameter = [
          { type: 'address', value: coin.address }
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          let tokenBalanceInPool = parseInt(transaction.constant_result[0], 16) / Math.pow(10, coin.decimals)
          resolve(tokenBalanceInPool);
        })
      })
    },
    async getSpotPrice (address1, address2, name) {
      var functionSelector = 'getSpotPrice(address,address)';
      var parameter = [
        { type: 'address', value: address1 },
        { type: 'address', value: address2 }
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter);
      if (transaction) {
        if(name == 'justPrice'){
          let justPrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
          let differ = this.token1.decimals-this.token2.decimals
          if(differ!==0 && differ>0){
            this.justPrice = justPrice/Math.pow(10,Math.abs(differ))
          }else if(differ!==0 && differ<0){
            this.justPrice = justPrice*Math.pow(10,Math.abs(differ))
          }
        }else{
          let reversePrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
          let differ = this.token2.decimals-this.token1.decimals
          if(differ!==0 && differ>0){
            this.reversePrice = reversePrice/Math.pow(10,Math.abs(differ))
          }else if(differ!==0 && differ<0){
            this.reversePrice = reversePrice*Math.pow(10,Math.abs(differ))
          }
        }
        // name == 'justPrice' ? this.justPrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals) : this.reversePrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
      }
    },
    async checkBind () {//检查是否绑定
      var functionSelector = 'isBound(address)';
      var parameter = [{ type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C' }]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TVQpB9Eh66hua8VKNoq3oGt6SacSbXzWk9', functionSelector, {}, parameter);
      console.log("检查==========" + window.tronWeb.toDecimal(transaction.constant_result[0]))
    },
    validation (n) {

      let str = JSON.stringify(this.token1);
      if (str != "{}") {
        this.isSelect1 = true;
        this.selectType = this.token1.name
      } else {
        this.$message({
          message: '请先选择交易对',
          type: 'error'
        });
      }
    },
    showFees (n) {  // 是否显示联动框
      if (JSON.stringify(n) == "{}") {
        return false
      }
      return true;
    },
    linkage (token) { // 联动
      this.isSelect1 = false;
      if(token.token1.name==this.selectType){
        this.token1 = token.token1
        this.token2 = token.token2
      }else{
        this.token2 = token.token1
        this.token1 = token.token2
      }
      this.token1.item = 0
      this.token2.item = 1
      this.getBasicInfo(this.token1)
      this.getBasicInfo(this.token2)
    },
    showSelect (index) {
      if (index == 1 && this.iSingle) return;
      this.isSelect = true
      this.selectType = ""
      this.item = index
    },
    sbmitBtn () {
      if (this.showFees(this.token1) && this.showFees(this.token2)) {  // 是否为空    
        if (this.token1Num != '' && this.token2Num != "") {

        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>


.connect_pd{
  margin-top: 120px;
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
    border: 1px solid #070A0E;
    color: #0f1730;
    text-align: center;
    line-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
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
      transform: translateX(-16px);
    }
  }
}

.lt_box{
  overflow: hidden;
  display: flex;
  justify-items: center;
  align-items: center;
}
.from_contentIcon{
  margin-top: 16px;
  margin-bottom: 12px;
}
.whe {
  width: 293px;
  margin: 0 auto;
  padding-bottom: 48px;
  margin-top: 40px;
}
.whe_img {
  vertical-align: sub;
}
.connectbox {
  padding: 0 24px 24px 24px;
  margin-top: 24px;
  height: 134px;
  .box_title {
    line-height: 50px;
    border-bottom: 1px solid #e5ebf2;
    font-size: 18px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #0F1730;

 
  }
}
.conct_btn{
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
.position{
    max-width: 480px;
}
.connect_boxs {
  border-radius: 0 0 24px 24px;
      width: 100%;
  position: absolute;
  font-size: 16px;
  bottom: 59px;
  left: 0;

  height: 210px;
  background: #070A0E;
  z-index: -1;
}
.connect_btns{
  height: 48px;
  font-size: 14px;
border-radius: 12px;
line-height: 48px;
}
.connect_btn{
  display: flex;

}
.metitle {

  margin-top: 12px;
  height: 62px;
  line-height: 62px;
  border-bottom: 1px solid #e5ebf2;
  font-weight: normal;
  color: #E5EBF2;

}
.rex{
  font-size: 18px;
font-family: Roboto-Regular, Roboto;
font-weight: 400;
color: #A6AEB7;

}
.ctx_1 {
  max-width: 268px;
  display: inline-block;
}
.text_btn{
  max-width: 104px;
}
.text_btn1{
  
}
.setInput{
  display: flex;
  .ctx_1{
    flex: 1;
  }
.ctx_3s {
  min-width: 160px;
  display: inline-block;
  margin-left: 12px;
}
}

.lt1,.lt2,.lt3{
  
  height: 17px;
  color: #A6AEB7;
  font-size: 16px;
}
.rg1,.rg2,.rg3{
height: 17px;
color: #E5EBF2;
font-size: 16px;

}


.connect_currency {
  display: flex;
  justify-content: flex-start;
}
.c_receove_Share {
  padding: 24px 20px;
}
.currencyprices {
  width: 190px;
  text-align: right;
}
.typeBtn {
  width: 136px;
  height: 48px;
  background: #05C98E;
  border-radius: 16px;
  margin-left: 23px;
  
font-size: 18px;
  font-family: Roboto-Regular, Roboto;
  font-weight: 400;
}
.typeBtn1 {
  width: 136px;
  height: 48px;
  background: #ffffff;
  border-radius: 16px;
  margin-left: 8px;
  font-size: 18px;
  font-family: Roboto-Regular, Roboto;
  font-weight: 400;

}
</style>