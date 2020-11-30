<template>
  <div class="container">
    <div class="globle_title">Exchange</div>
    <container top="40">
      <div slot="body">
        <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
          <frominput 
            lable="From"
            v-model="token1Num" 
            @input='cumpToken2'>
            </frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect  
            :showSelect="selectColor1" 
            :imgUrl="token1.img" item='0' 
            :balance="token1.balance"
            :text="token1.name" @click="showSelect(0)" />           
          </div>
        </div>

        <div class="from_contentIcon">
          <i class="el-icon-back tran_icon"></i>
        </div>
        <div class="setInput clearfix">
          <div class="ctx_1 fl_lt">
            <frominput lable="To"
                       v-model="token2Num" @input="cumpToken1"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect :showSelect="selectColor2" :imgUrl="token2.img" item='1' :balance="token2.balance"
                     :text="token2.name" @click="showSelect(1)"  />
          </div>
        </div>
        <div class="Price_text"   v-show="connectFlag"> 
            <span>Price: </span> 
            <span>{{spotPrice.toFixed(token1.decimals)}} </span>
                <span> {{token1.name}} </span> 
               <span> per </span>
               <span> {{token2.name}} </span> 
               <img src="@/assets/img/icon_slect.png" alt="" @click="convert"></div>
        <div class="whe" :class="connectFlag?'login_text':'outlogin'">
          <div class="connect_btn clearfix">
            <div class="whe fl_lt" v-show="!isApproved && connectFlag">
              <el-button class="from_botton" @click="doApprove">Approve {{token1.name}}</el-button>
            </div>
            <div class="whe fl_rg">
                 <el-button class="from_botton" v-show="!connectFlag" 
                 @click="btnClick"
                 > <img class="whe_img"
                 src="@/assets/img/icon_my_wallet.svg"
                 alt=""> {{connectFlag?'Swap':'Connect to a wallet'}}</el-button>
            
              <el-button class="from_botton" :loading="btnLoading1"      v-show="connectFlag"
                         :disabled="btnDisabled1" @click="confirmSwap">Swap</el-button>
            </div>
          </div>       
        </div>

      </div>
    <div slot="footer"
        v-show="connectFlag"
         class="position">
      <div class="box_sizes connect_boxs">
        <div class="provider c_receove_Share ">
          <div class="">
            <div class="received">
              <div class="lt">
                <span>Minimum received 
                <el-tooltip placement="right">
                  <div slot="content" class="slotp"> 
                      Your transaction will revert if<br> 
                      there is a large,unfavorable <br>
                      price movement before it is 
                      <br>confirmed.</div>
                  <img src="@/assets/img/icon_instructions.svg" alt="">
                </el-tooltip>
                  </span>
              </div>
              <span class="rg">{{token2Num}} {{token2.name}}</span>
            </div>
            <div class="received setmage">
              <div class="lt">
                <span>Price Impacte 
                    <el-tooltip placement="right">
                  <div slot="content" class="slotp2"> 
                       Right Center 提示文字<br> 
                      </div>
                  <img src="@/assets/img/icon_instructions.svg" alt="">
                </el-tooltip>          
                  </span>
              </div>
              <span class="rec_red">{{percentage}}%</span>
            </div>
            <div class="received">
              <div class="lt">
                <span>Liquidity Provider Fee 
                  <el-tooltip placement="right">
                  <div slot="content" class="slotp3"> 
                       Right Center 提示文字<br> 
                      </div>
                  <img src="@/assets/img/icon_instructions.svg" alt="">
                </el-tooltip>   
                  </span>
              </div>
              <span class="">{{swapFee}} {{token1.name}}</span>
            </div>
             <div class="fees_account">View pair analytics <img  src="@/assets/img/icon_jump_green.png"
                 alt=""></div>
          </div>
        </div>
      </div>
    </div>
    </container>
    <change v-if="isConfirm"
       @doConfirm="doswap" 
       :token1='token1'
       :token2='token2'
       :token1Num='token1Num'
       :token2Num='token2Num'
       :spotPrice='spotPrice'
       :swapFee='swapFee'
       :percentage='percentage'
       @handleClosea ="isConfirm = false"
       />
    <selctoken :showAlert='isSelect' :item='item' @closeAlert="isSelect=false" @change="changeCoin" />
  </div>
 
</template>

<script>
import { container, frominput, setselect } from '../../components/index'
import change from './change'
import selctoken from '../Pool/selctToken';
import tokenData from '../../utils/token'
import {approved,decimals,getConfirmedTransaction,allowance} from '../../utils/tronwebFn'
import {calcSpotPrice,
    calcOutGivenIn,
    calcInGivenOut,
    calcOutGivenInAfterPrice} from '../../utils/calc_comparisons'
    import { mapState} from 'vuex'
export default {
  data () {
    return {
      token1:{},
      token2:{},
      token1Num:null,
      token2Num:null,
      login:true,
      isApproved:true,
      isSelect:false,
      item:0,
      pair:{},
      decimals:18,
      token1Balance:0,
      token2Balance:0,
      token1Weight:0,
      token2Weight:0,
      swapFee:0,
      spotPrice:0,
      percentage:0,
      isConfirm:false,
      selectColor1:false,
      selectColor2:false,
      btnLoading1:false,
      btnDisabled1:true

    }
  },
  computed: {
    ...mapState(['connectFlag'])
  },
  components: {
    container,
    frominput,
    setselect,
    change,
    selctoken
  },
  created(){

  },
  watch: {
    token1Num() {
      console.log(this.token1Num);
      this.inputFlag();
    },
     token2Num() {
      this.inputFlag();
    }
    
  },
  methods:{
    btnClick () {
      this.$popup({
        click: () => {
          // 点击按钮事件
          this.$router.push('../../popup/popup')
        }
      })
    },

    showSelect(index){
      this.isSelect = true
      this.item = index
    },
    
    changeCoin(token){
      let that = this
      this.isSelect = false
      if ( token.item==0) {
          this.token1 = token;
           this.selectColor1 = true;
      } else {
          this.token2 = token;
          this.selectColor2 = true;
      }
      that.getBalance(token)
      this.inputFlag();
    },
    async getBalance(token){//获取余额
      let that = this
      let tokenContract = await window.tronWeb.contract().at(token.address)
      let tokenBalance = await tokenContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
      if(token){
        let balance = parseInt(tokenBalance._hex,16)/Math.pow(10,token.decimals)
        token.item==0?that.token1.balance=balance:that.token2.balance=balance
        if(this.token1.address && this.token2.address){
          this.getPairAddress(token)
        }
      }
    },
    doApprove(){
      if(this.token1.address && this.token2.address){
        approved(this.token1.address,this.pair.address).then((res)=>{
          this.isApproved = true
        })
      }else{
        this.$layer.msg('请选择交易对')
      }
    },
    async getPairAddress(){
      let that = this
      let pairname = this.token1.name+'/'+this.token2.name
      let pairname1 = this.token2.name+'/'+this.token1.name
      let pair = tokenData.pairList.filter((item)=>{
        return item.pair==pairname.toUpperCase() || item.pair==pairname1.toUpperCase()
      })
      if(pair&&pair.length>0){
        this.pair = pair[0]
        this.decimals = pair[0].decimals
        allowance(that.token1.address,pair[0].address).then((res)=>{
          if(res){
            let approveBalance = parseInt(res._hex,16)
            if (approveBalance == 0) {
              that.isApproved = false
            } else {
              that.isApproved = true
            }
          }
        })
        this.getBalanceInPool(pair[0],this.token1).then((res)=>{
          this.token1Balance = res
          this.getSpotPrice()
        })
        this.getBalanceInPool(pair[0],this.token2).then((res)=>{
          this.token2Balance = res
          this.getSpotPrice()
        })
        this.getWeight(pair[0],this.token1).then((res)=>{
          this.token1Weight = res
          this.getSpotPrice()
        })
        this.getWeight(pair[0],this.token2).then((res)=>{
          this.token2Weight = res
          this.getSpotPrice()
        })
        this.getSwapFee(pair[0]).then((res)=>{
          this.swapFee = res
          this.getSpotPrice()
        })
      }
    },
    cumpToken1(){//计算兑换的token1
      if(this.token1Balance&&this.token1Weight&&this.token2Balance&&this.token2Weight&&this.swapFee&&this.token1Num){
        let token1Num = calcInGivenOut(this.token1Balance,this.token1Weight,this.token2Balance,this.token2Weight,this.token2Num,this.swapFee)
        this.token1Num = token1Num.toFixed(this.token1.decimals)
      }
    },
    cumpToken2(){//计算兑换的token2
      if(this.token1Balance&&this.token1Weight&&this.token2Balance&&this.token2Weight&&this.swapFee&&this.token1Num){
        let token2Num = calcOutGivenIn(this.token1Balance,this.token1Weight,this.token2Balance,this.token2Weight,this.token1Num,this.swapFee)
        this.token2Num = token2Num.toFixed(this.token2.decimals)
        let afterPrice = calcOutGivenInAfterPrice(this.token1Balance,this.token1Weight,this.token2Balance,this.token2Weight,this.token1Num,this.swapFee)
        this.percentage = ((afterPrice-this.spotPrice)/this.spotPrice*100).toFixed(2)
      }
    },
    getSpotPrice(){//计算token1的价格
      if(this.token1Balance&&this.token1Weight&&this.token2Balance&&this.token2Weight&&this.swapFee){
        this.spotPrice = calcSpotPrice(this.token1Balance,this.token1Weight,this.token2Balance,this.token2Weight,this.swapFee)
      }
      if(this.token1Num){
        this.cumpToken2()
      }
    },
    getBalanceInPool(pair,coin){//获取Pool中的余额
      let that = this
      return new Promise(function (resolve, reject) {
        var functionSelector = 'getBalance(address)';
        var parameter = [
          {type: 'address', value: coin.address}
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address,functionSelector,{}, parameter).then((transaction)=>{
          let tokenBalanceInPool = parseInt(transaction.constant_result[0],16)/Math.pow(10,coin.decimals)
          resolve(tokenBalanceInPool);
        })
      })
    },
    getWeight(pair,coin){//获取权重
      let that = this
      return new Promise(function (resolve, reject) {
        var functionSelector = 'getNormalizedWeight(address)';
        var parameter = [
          {type: 'address', value: coin.address}
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address,functionSelector,{}, parameter).then((transaction)=>{
          let weight = parseInt(transaction.constant_result[0],16)/Math.pow(10,pair.decimals)
          resolve(weight);
        })
      })
    },
    getSwapFee(pair){//获取swapfee
      let that = this
      return new Promise(function (resolve, reject) {
        var functionSelector = 'getSwapFee()';
        var parameter = []
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address,functionSelector,{}, parameter).then((transaction)=>{
          let swapFee = parseInt(transaction.constant_result[0],16)/Math.pow(10,pair.decimals)
          resolve(swapFee);
        })
      })
    },
    confirmSwap(){  
      this.isConfirm = true
    },
    inputFlag () {
         if (this.token1Num!=""&&this.token2Num!=""&& JSON.stringify(this.token1)!="{}"&&JSON.stringify(this.token2)!="{}") {
              this.btnDisabled1 =false;
      }  else {
         this.btnDisabled1 =true;
      }
    },
    convert(){
      let token1 = this.token1
      let token2 = this.token2
      this.token1 = token2
      this.token2 = token1
    },
    async doswap(){
      let that = this;
      this.isConfirm = false;
      this.btnDisabled1 = true;
      this.btnLoading1 = true;
      if(that.token1Num>that.token1Balance){
        this.$message.error('兑换额不能大于流动性池余额');
         that.btnDisabled1 = false;
          that.btnLoading1 = false;
        return
      }
      var functionSelector = 'swapExactAmountIn(address,uint256,address,uint256,uint256)';
      var parameter = [
        {type:'address',value:that.token1.address},
        {type:'uint256',value:that.token1Num*Math.pow(10,that.token1.decimals)},
        {type:'address',value:that.token2.address},
        {type:'uint256',value:0},
        {type:'uint256',value:'1000000000000000000000000'}
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.address,functionSelector,{}, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              getConfirmedTransaction(res.txid).then((e)=>{
                this.$message.success('成功');
              }).catch((err)=>{
                 console.log(err);
              })
            that.btnDisabled1 = false;
            that.btnLoading1 = false;
          });
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>

.slotp{ 
    height: 76px;
    font-size: 16px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #EEEEF0;
    line-height: 19px;
}
.whe {
  width: 320px;
  margin: 0 auto;
  padding-bottom: 48px;
}
.whe_img {
  vertical-align: sub;
}

.ctx_1 {
  width: 316px;
  display: inline-block;
}

.ctx_3 {
  width: 180px;
  display: inline-block;
  margin-left: 12px;
}
.from_contentIcon {
  height: 36px;
  font-size: 32px;
  font-family: Roboto-Regular, Roboto;
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
  margin: 16px 0;
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
    margin: 16px 0;
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