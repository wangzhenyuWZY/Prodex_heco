<template>
  <div>
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
         <div class="xzk">
           <el-button class="xzk-but">Uni ETH-USDT <img src="../../assets/img/icon_down.svg" alt=""></el-button>
           
           
           
         </div>
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="input"
                     showmax
                     :balance='token1.balance'
                     v-model="token1Num"></frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect lable="321321"  :showSelect="false" :imgUrl="token1.img" item='1' :balance="token1.balance"
                     :text="token1.name" @click="showSelect(0)" />
        </div>
      </div>

      <div class="from_contentIcon">+</div>
      <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="input"
                     v-model="token2Num"></frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect :showSelect="false" :imgUrl="token2.img" item='2' :balance="token2.balance"
                     :text="token2.name" @click="showSelect(1)"  />
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
              <p>0</p>
              <p>Share of Pool</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="connect_btn clearfix">
        <div class="whe fl_lt" v-show="!isApproved">
          <el-button class="from_botton" @click="doApprove">Approve {{token1.name}}</el-button>
        </div>
        <div class="whe fl_rg">
          <el-button class="from_botton black_botton" @click="joinPool">Supply</el-button>
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
  <selctoken :showAlert='isSelect' :item='item' @closeAlert="isSelect=false" @change="changeCoin" />
  </div>
</template>

<script>
import { container,frominput,setselect } from '../../components/index'
import selctoken from './selctToken';
import tokenData from '../../utils/token'
import {decimals,allowance,approved} from '../../utils/tronwebFn'
export default {
  data () {
    return {
      token1Num:'',
      token2Num:'',
      token1:{},
      token2:{},
      isSelect:false,
      item:1,
      pairAddress:null,
      justPrice:0,
      reversePrice:0,
      decimals:18,
      isApproved:true
    }
  },
  components: {
    container,
    frominput,
    setselect,
    selctoken
  },
  created(){
    this.init(0)
  },
  methods:{
    init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.checkBind()
      })
    },
    async getPairAddress(){
      let pairname = this.token1.name+'/'+this.token2.name
      let pair = tokenData.pairList.filter((item)=>{
        return item.pair==pairname.toUpperCase()
      })
      if(pair){
        this.pairAddress = pair[0].address
        var fun = 'decimals()';
        var par = []
        let res = await window.tronWeb.transactionBuilder.triggerConstantContract(pair[0].address,fun,{}, par);
        this.decimals = parseInt(res.constant_result[0],16)
        this.getSpotPrice(this.token1.address,this.token2.address,'justPrice')
        this.getSpotPrice(this.token2.address,this.token1.address,'reversePrice')
      }
    },
    async joinPool(){
      let that = this
      var functionSelector = 'joinPool(uint256,uint256[])';
      var parameter = [
          {type: 'uint256', value: '1000000000000000000'},
          {type: 'uint256[]', value: [that.token1Num*Math.pow(10, that.token1.decimals), that.token2Num*Math.pow(10, that.token2.decimals)]},
      ]
      console.log(parameter)
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.pairAddress,functionSelector,{}, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              alert('success');
          });
      }) 
    },
    async joinswapExternAmountIn(){
      let that = this
      var functionSelector = 'joinswapExternAmountIn(address,uint256,uint256)';
      var parameter = [
          {type: 'address',value: that.token1.address},
          {type: 'uint256', value: that.token1Num*Math.pow(10, that.token1.decimals)},
          {type: 'uint256', value: Math.pow(10, that.token1.decimals)}
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.pairAddress,functionSelector,{}, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              alert('success');
          });
      }) 
    },
    changeCoin(token){
      let that = this
      this.isSelect = false
      decimals(token.address).then((res)=>{
        that.token.decimals = res
        if(token.item==0){
          that.token1 = token
          allowance(that.token1.address).then((res)=>{
            if(res){
              let approveBalance = window.tronWeb.toSun(res._hex)
              if (approveBalance == 0) {
                alert('未授权请先授权');
                that.isApproved = false
              } else {
                that.isApproved = true
              }
            }
          })
        }else{
          this.token2 = token 
        }
        that.getBalance(token)
      })
    },
    doApprove(){
      if(this.token1.address && this.token2.address){
        approved(this.token1.address,this.pairAddress)
      }else{
        this.$layer.msg('请选择交易对')
      }
    },
    async getBalance(token){//获取余额
      let that = this
      let tokenContract = await window.tronWeb.contract().at(token.address)
      let tokenBalance = await tokenContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
      if(token){
        let balance = parseFloat(window.tronWeb.fromSun(tokenBalance))
        token.item==0?that.token1.balance=balance:that.token2.balance=balance
        if(this.token1.address && this.token2.address){
          this.getPairAddress()
        }
      }
    },
    async getSpotPrice(address1,address2,name){
      var functionSelector = 'getSpotPrice(address,address)';
      var parameter = [
        {type: 'address', value: address1},
        {type: 'address', value: address2}
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pairAddress,functionSelector,{}, parameter);
      if(transaction){
        name=='justPrice'?this.justPrice=parseInt(transaction.constant_result[0],16)/Math.pow(10,this.decimals):this.reversePrice=parseInt(transaction.constant_result[0],16)/Math.pow(10,this.decimals)
      }
    },
    async checkBind(){//检查是否绑定
      var functionSelector = 'isBound(address)';
      var parameter = [{type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C'}]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TVQpB9Eh66hua8VKNoq3oGt6SacSbXzWk9',functionSelector,{}, parameter);
      console.log("检查=========="+window.tronWeb.toDecimal(transaction.constant_result[0]))
    },
    showSelect(index){
      this.isSelect = true
      this.item = index
    },
  }
}
</script>

<style lang="scss" scoped>
.xzk{
 
  height: 56px;
  border-radius: 16px;
  // border: 1px solid #0F1730;;
  margin-bottom: 32px;
  .xzk-but{
    width: 608px;
    height: 56px;
    border-radius: 16px;
    border: 1px solid #0F1730;
    color: #000;
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