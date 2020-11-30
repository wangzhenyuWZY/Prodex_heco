<template>
  <div class="connect_pd">
    <container top="32"
               pdd >
      <div class="title"
           slot="title">
        <div class="lt_box">
          <router-link to="/pool">
            <span class="icon_box">
              <i class="el-icon-back back_icon"></i>
            </span>
          </router-link>

          <span class="content_text">Add Liquidity</span>
          <el-button class="typeBtn"
                     @click="iSingle=true"
                     type="small">Single Token </el-button>
          <el-button class="typeBtn"
                     @click="iSingle=false"
                     type="small">Double Token </el-button>
        </div>
        <div class="rg_box">
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
            <span class="fees_zies">Uni {{token1.name}}-{{token2.name}} </span>
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
          <div class="ctx_3 fl_lt">
            <setselect lable="321321"
                       :imgUrl="token1.img"
                       item='1'
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
                       @input="calcToken1Num"
                       v-model="token2Num"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect :imgUrl="token2.img"
                       item='2'
                       :balance="token2.balance"
                       :text="token2.name"
                       @click="showSelect(1)" />
          </div>
        </div>
        <div class="box_sizes">
          <div class="provider connectbox">
            <div class="box_title">Prices and pool share</div>
            <ul class="pre_list clearfix">
              <li>
                <p>{{justPrice?justPrice.toFixed(4):'--'}}</p>
                <p>{{token1.name}} per {{token2.name}}</p>
              </li>
              <li>
                <p>{{reversePrice?reversePrice.toFixed(4):'--'}}</p>
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
                    <span>{{token1.name}}/{{token2.name}}</span>
                  </div>
                  <div class="currencyprices">{{myBalanceInPool}}</div>

                </div>
              </div>
              <div class="received mrge12 mrgtop16">
                <div class="lt">
                  <span>Your pool share:</span>
                </div>
                <span class="rg">{{myShare}}%</span>
              </div>
              <div class="received mrge12">
                <div class="lt">
                  <span>{{token1.name}}:</span>
                </div>
                <span class="">{{token1Balance*myShare}}</span>
              </div>
              <div class="received">
                <div class="lt">
                  <span>{{token2.name}}:</span>
                </div>
                <span class="">{{token2Balance*myShare}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </container>
    <selctoken :showAlert='isSelect'
               :item='item'
               :selectType="selectType"
               @closeAlert="isSelect=false"
               @change="changeCoin"
               @linkage="linkage" />
    <recevive
      :showAlert ='confirmPop'
      :popsData = 'popsData'
      @change='supply'
      @close="confirmPop = false"
    />           
  </div>
</template>

<script>
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
    confirmSupply(){//输出的lptoken数量
      this.reciveLptoken = getTokenInGivenPoolOut(this.token1Num,this.token1Balance,this.token2Num,this.token2Balance,this.lpTotal)
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
        this.token1Num = parseInt(this.token2Num/this.token2Balance*this.token1Balance)
      }
    },
    calcShare(){
      this.getShare()
    },
    getShare () {
      let that = this
      if(this.token1Num && this.token1Num!==0){
        if(this.token1Balance&&this.denormalizedWeight&&this.lpTotal&&this.totalDenormalizedWeight){
          let poolOut = calcPoolOutGivenSingleIn(this.token1Balance,this.denormalizedWeight,this.lpTotal,this.totalDenormalizedWeight,this.token1Num,this.foxDex)
          this.share = (poolOut/this.lpTotal*100).toFixed(2) 
        }else{
          this.getToken1DenormalizedWeight()//获取token1在pool中的权重
          // this.getToken2DenormalizedWeight()//获取token2在pool中的权重
          this.getTotalDenormalizedWeight()//获取lptoken总权重
          this.getSwapFeeForDex()//获取swapfee
        }
      } else {
        this.share = 0
      }
      if(this.token1Balance&&this.token2Balance){
        this.token2Num = parseInt(this.token1Num/this.token1Balance*this.token2Balance)
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
        return item.pair == pairname.toUpperCase() || pairname1.toUpperCase()
      })
      debugger ;
      if (pair) {
        this.pair = pair[0]
        console.log(this.token1.address,this.token2.address)
        this.getSpotPrice(this.token1.address, this.token2.address, 'justPrice')
        this.getSpotPrice(this.token2.address, this.token1.address, 'reversePrice')
        this.getBalanceInPool(pair[0], this.token1).then((res) => {//获取token1在pool中的总量
          this.token1Balance = res
          getMyBalanceInPool(pair[0]).then((res)=>{
            that.myBalanceInPool = res
            if(that.lpTotal){
              that.myShare = (that.myBalanceInPool/that.lpTotal).toFixed(4)
            }
          })
        })
        this.getBalanceInPool(pair[0],this.token2).then((res)=>{//获取token2在pool中的总量
          this.token2Balance = res
          getLpBalanceInPool(this.pair).then((res)=>{//获取lptoken总量
            that.lpTotal = res
            if(that.myBalanceInPool){
              that.myShare = (that.myBalanceInPool/that.lpTotal).toFixed(4)
            }
          })
        })
        
        allowance(this.token1.address,pair[0].address).then((res) => {
          if (res) {
            let approveBalance = parseInt(res._hex, 16)
            if (approveBalance == 0) {
              that.$message({
                message: '未授权请先授权',
                type: 'error'
              });
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
    getMyPoolInfo(){
      getLpBalanceInPool(item).then((res)=>{
        that.lpTotal = res
        if(that.myBalanceInPool){
          that.share = (that.myBalanceInPool/that.lpTotal).toFixed(4)
        }
      })
      getMyBalanceInPool(item).then((res)=>{
        that.myBalanceInPool = res
        if(that.lpTotal){
          that.share = (that.myBalanceInPool/that.lpTotal).toFixed(4)
        }
      })
    },
    async joinPool () {
      let that = this
      var functionSelector = 'joinPool(uint256,uint256[])';
      var parameter = [
        { type: 'uint256', value: '1000000000000000000' },
        { type: 'uint256[]', value: [that.token1Num * Math.pow(10, that.token1.decimals), that.token2Num * Math.pow(10, that.token2.decimals)] },
      ]
      console.log(parameter)
      try {
        let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.pair.address, functionSelector, {}, parameter);
        if (!transaction.result || !transaction.result.result)
          that.charm1();
        return console.error('Unknown error: ' + transaction, null, 2);
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
        let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract('THyjBqMKwx9RVqqiuMeFDjKw4LYqPui4uR', functionSelector, {}, parameter);
        if (!transaction.result || !transaction.result.result)
          that.charm1();
          return console.error('Unknown error: ' + transaction, null, 2);
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
        console.log(error);
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
        name == 'justPrice' ? this.justPrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals) : this.reversePrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
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
        this.isSelect = true;
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
      this.isSelect = false;
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
    border: 1px solid #0f1730;
    color: #0f1730;
    text-align: center;
    line-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .fees_zies {
      font-size: 20px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      margin: 0 8px;
    }
    img {
      width: 32px;
      height: 32px;
    }
    .fees_zies {
    }
    img:nth-child(2) {
      transform: translateX(-16px);
    }
  }
}
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
.connect_btn {
  display: flex;
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
.connect_boxs {
  border-radius: 0 0 20px 20px;
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 690px;
  z-index: -1;
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
  padding: 24px 40px;
}
.currencyprices {
  width: 190px;
  text-align: right;
}
.typeBtn {
  border-color: #409eff;
  border-radius: 25px;
}
</style>