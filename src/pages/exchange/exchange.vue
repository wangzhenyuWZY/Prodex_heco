<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="tokensPop" @closePop='tokensPop=false' @change='changeToken'></selectToken>
        <div class="changePanel">
            <h2>From<span class="balance">{{$t('lang51')}}：{{parseFloat(token1.balance).toFixed(2)}}</span></h2>
            <input class='entrynum' placeholder='0.0' v-model="token1Num" @input="caleToken2">
            <div class="coinbar" @click="item=0;tokensPop=true">
                <img :src="requierImg(token1.name)" class="coinimg">
                <span class="coinname">{{token1.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico" @click="convertToken"></i>
        <div class="changePanel">
            <h2>To<span class="balance">{{$t('lang51')}}：{{parseFloat(token2.balance).toFixed(2)}}</span></h2>
            <input class='entrynum' placeholder='0.0' v-model="token2Num" @input="caleToken1">
            <div class="coinbar" @click="item=1;tokensPop=true">
                <img :src="requierImg(token2.name)" class="coinimg">
                <span class="coinname">{{token2.name?token2.name:'Select'}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <p class="tokenBasicPrice" v-show="token2.name">1{{token2.name}} = {{token1BasicPrice}}{{token1.name}}</p>
        <el-button class="btn" :disabled='isSwaping' :loading='isSwaping' @click="clickHdl">{{isConnect?(isApproved?$t('lang38'):$t('lang37')):'Connect Wallet'}}</el-button>
        <div class='transDetail'>
            <div class="transItem">
                <p class="title">{{$t('lang15')}}
                        <el-tooltip class="item" effect="dark" :content="$t('lang113')" placement="right">
                            <i></i>
                        </el-tooltip>
                </p>
                <p class="val">{{tolerance}}%</p>
            </div>
            <div class="transItem">
                <p class="title">{{$t('lang110')}}
                    <el-tooltip class="item" effect="dark" :content="$t('lang114')" placement="right">
                            <i></i>
                        </el-tooltip>
                </p>
                <p class="val oringe">{{priceToler}}%</p>
            </div>
            <div class="transItem">
                <p class="title">{{$t('lang111')}}
                    <el-tooltip class="item" effect="dark" :content="$t('lang115')" placement="right">
                            <i></i>
                        </el-tooltip>
                </p>
                <p class="val">{{token2Num}} {{token2.name}}</p>
            </div>
            <div class="transItem">
                <p class="title">{{$t('lang112')}}
                    <el-tooltip class="item" effect="dark" :content="$t('lang116')" placement="right">
                            <i></i>
                        </el-tooltip>
                </p>
                <p class="val">{{fee}} {{token1.name}} </p>
            </div>
        </div>
    </div>
  </div>
</template>




<script>
import Navbar from '../../components/Navbar'
import selectToken from '../../components/selectToken'
import {Factory,Token1,Router} from '../../utils/contract'
import BigNumber from 'bignumber.js'
const Web3Utils = require('web3')
export default {
  components:{
    Navbar,
    selectToken
  },
  watch: {
    
  },
  data() {
    return {
      tokensPop:false,
      token1:{
          balance:0
      },
      token2:{
          balance:0
      },
      item:0,
      isConnect:false,
      web3:null,
      Token1Contract:null,
      Token2Contract:null,
      RouterContract:null,
      FactoryContract:null,
      token1Num:'',
      token2Num:'',
      isApproved:false,
      token1BalanceInPool:0,
      token2BalanceInPool:0,
      hasPair:false,
      baseToken:'PDX',
      isSwaping:false,
      priceToler:0,
      minToken2:0,
      fee:0,
      token1BasicPrice:0,
      curryPut:0
    }
  },
  computed: {
    tokenData : {
        get(){
            return this.$store.state.app.tokenData;
        },
        set(v){
            return v
        }
    },
    tolerance(){
        return this.$store.getters.tolerance
    }
  },
  watch: {
    tokenData(list) {
      this.tokenData = list  
      if(!this.token1.name){
          let token1 = this.tokenData.filter((item)=>{return item.name.toUpperCase() == this.baseToken})
        this.changeToken(token1[0])
      }
    },
  },  
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
          this.FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
          this.isConnect = true
          if(this.tokenData.length>0){
              let token1 = this.tokenData.filter((item)=>{return item.name.toUpperCase() == this.baseToken})
             this.changeToken(token1[0])
          }
      })
    
  },
  methods: {
    requierImg(name) {
      if (name) {
        try {
          return require('@/assets/img/logo/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/logo/PETH.png')
        }
      }
    },
    toPool(){
        this.$router.push('/pool')
    },
    getBalance(address){
        let TokenContract = new this.web3.eth.Contract(Token1.abi, address)
        TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
            return res
        })
    },
    convertToken(){
        let token1 = this.token1
        let token2 = this.token2
        let token1BalanceInPool = this.token2BalanceInPool
        let token2BalanceInPool = this.token1BalanceInPool
        let token1Num = this.token1Num
        let token2Num = this.token2Num
        this.token1 = token2
        this.token2 = token1
        this.token1BalanceInPool = token2BalanceInPool
        this.token2BalanceInPool = token1BalanceInPool
        this.token1Num = token2Num
        this.token2Num = token1Num
        if(this.curryPut==0){
            this.caleToken1()
            this.curryPut==0
        }else{
            this.caleToken2()
            this.curryPut==1
        }
    },
    async clickHdl(){
        
        this.isSwaping = true
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        if(this.token1ApproveBalance==0){
            let apr1 = await this.Token1Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
            this.isApproved = false
            this.isSwaping = false
            this.doSwap()
        }else{
            this.doSwap()
        }
    },
    async doSwap(){
      let that = this
      that.isSwaping = true
      let token1num = new BigNumber(this.token1Num)
      token1num = token1num.times(Math.pow(10,this.token1.decimals))

      let token1BalanceInPool = this.token1BalanceInPool+this.token1Num
      let token2BalanceInPool = this.token2BalanceInPool-this.token2Num
      let beforePrice = this.token1BalanceInPool/this.token2BalanceInPool
      let afterPrice = parseFloat(token1BalanceInPool)/parseFloat(token2BalanceInPool)
      let tolerance = Math.abs((1-afterPrice/beforePrice)*100)
      if(this.$store.getters.tolerance && tolerance>this.$store.getters.tolerance){
          this.$message.error(this.$t('lang39'))
          that.isSwaping = false
          return
      }
      this.RouterContract.methods.swapExactTokensForTokens(token1num.toFixed(),0,[this.token1.address,this.token2.address],this.web3.eth.defaultAccount,1702480290 ).send({from:this.web3.eth.defaultAccount})
        .on('transactionHash', function(hash){
            
        })
        .on('receipt', function(receipt){
            that.isSwaping = false
            that.$message.success(that.$t('lang40'))
            window.location.reload()
        })
        .on('confirmation', function(confirmationNumber, receipt){
            that.isSwaping = false
        })
        .on('error', function(){
            that.$message.success(that.$t('lang41'))
            that.isSwaping = false
        });
    },
    async checkApprovedBalance(){
        let that = this
        that.token1ApproveBalance = await that.getAllowance(that.token1.address)
        if(that.token1ApproveBalance>0){
            that.isApproved = true
        }
    },
    async getAllowance(Spender){
        const contract = new this.web3.eth.Contract(Token1.abi, Spender)
        let res = await contract.methods.allowance(this.web3.eth.defaultAccount,Router.address).call()
        return res
    },
    changeToken(token){
        let that = this
        this.tokensPop = false
        this.item==0?this.token1=token:this.token2=token
        let TokenContract = new this.web3.eth.Contract(Token1.abi, token.address)
        if(this.item==0){
            TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                console.log(res)
                that.$set(that.token1, 'balance', res/Math.pow(10,token.decimals))
            })
            this.Token1Contract = new this.web3.eth.Contract(Token1.abi, this.token1.address)
            this.checkApprovedBalance()
        }else{
            TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                that.$set(that.token2, 'balance', res/Math.pow(10,token.decimals))
            })
            this.Token2Contract = new this.web3.eth.Contract(Token1.abi, this.token2.address)
        }
        this.getPair()
    },
    getPair(){
        let that = this
        if(this.token1.address && this.token2.address){
            this.FactoryContract.methods.getPair(this.token1.address,this.token2.address).call().then((result)=>{
                if(parseInt(result)){
                    that.hasPair = true
                }else{
                    that.$message.error(that.$t('lang42'))
                    that.hasPair = false
                }
            })
            this.FactoryContract.methods.getReserves(that.token1.address,that.token2.address).call().then((res)=>{
                that.poolsReserves = res
                that.token1BalanceInPool = res[0]/Math.pow(10,that.token1.decimals)
                that.token2BalanceInPool = res[1]/Math.pow(10,that.token2.decimals)

                let token2Num = new BigNumber(1)
                token2Num = token2Num.times(Math.pow(10,that.token2.decimals))
                let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
                FactoryContract.methods.getAmountIn(token2Num,this.poolsReserves[0],this.poolsReserves[1]).call().then((result)=>{
                    let token1Num = parseInt(result)/Math.pow(10,that.token1.decimals)
                    that.token1BasicPrice = token1Num.toFixed(2)
                })
            })
        }
    },
    caleToken2(){
        let that = this
        this.curryPut = 0
        if(!this.hasPair){
            this.$message.error(that.$t('lang42'))
            return
        }
        if(this.token1Num && parseInt(this.poolsReserves[0])){
            let token1Num = new BigNumber(this.token1Num)
            token1Num = token1Num.times(Math.pow(10,this.token1.decimals))
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.getAmountOut(token1Num,this.poolsReserves[0],this.poolsReserves[1]).call().then((result)=>{
                that.token2Num = parseInt(result)/Math.pow(10,that.token2.decimals)
                that.token2Num = that.token2Num.toFixed(2)

                let token1BalanceInPool = parseFloat(this.token1BalanceInPool)+parseFloat(this.token1Num)
                let token2BalanceInPool = parseFloat(this.token2BalanceInPool)-parseFloat(this.token2Num)
                let beforePrice = this.token1BalanceInPool/this.token2BalanceInPool
                console.log(parseFloat(token1BalanceInPool),parseFloat(token2BalanceInPool))
                let afterPrice = parseFloat(token1BalanceInPool)/parseFloat(token2BalanceInPool)
                let tolerance = Math.abs((1-afterPrice/beforePrice)*100)
                this.priceToler = tolerance.toFixed(2)
                this.fee = this.token1Num*0.003
                that.token1BasicPrice = (that.token1Num/that.token2Num).toFixed(2)
            })
        }
    },
    caleToken1(){
        let that = this
        this.curryPut = 1
        if(!this.hasPair){
            this.$message.error(that.$t('lang42'))
            return
        }
        if(this.token2Num && parseInt(this.poolsReserves[0])){
            let token2Num = new BigNumber(this.token2Num)
            token2Num = token2Num.times(Math.pow(10,this.token2.decimals))
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.getAmountIn(token2Num,this.poolsReserves[0],this.poolsReserves[1]).call().then((result)=>{
                that.token1Num = parseInt(result)/Math.pow(10,that.token1.decimals)
                that.token1Num = that.token1Num.toFixed(2)

                let token1BalanceInPool = this.token1BalanceInPool+this.token1Num
                let token2BalanceInPool = this.token2BalanceInPool-this.token2Num
                let beforePrice = this.token1BalanceInPool/this.token2BalanceInPool
                let afterPrice = parseFloat(token1BalanceInPool)/parseFloat(token2BalanceInPool)
                let tolerance = Math.abs((1-afterPrice/beforePrice)*100)
                this.priceToler = tolerance.toFixed(2)
                this.fee = this.token1Num*0.003
                that.token1BasicPrice = (that.token1Num/that.token2Num).toFixed(2)
            })
        }
    },
  }
}
</script>
<style  lang="less" scoped>
.exchangeBar{
    width: 345px;
    min-height:400px;
    background: #232221;
    box-shadow:inset 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
    border-radius: 18px;
    border: 1px solid #232221;
    box-sizing: border-box;
    padding:20px 18px;
    margin:40px auto;
    position:relative;
    .tokenBasicPrice{
        color:#C4C2BE;
        padding-top:20px;
        font-size:12px;
    }
    .transDetail{
        padding-top:20px;
        .transItem{
            padding-bottom:10px;
            overflow:hidden;
            .title{
                float:left;
                font-size:12px;
                color:#6A6A6A;
                line-height:16px;
                font-weight:400;
                i{
                    display:inline-block;
                    vertical-align:middle;
                    margin-left:10px;
                    width:16px;
                    height:16px;
                    background:url(../../assets/img/icon37.png) no-repeat;
                    background-size:100% 100%;
                }
            }
            .val{
                float:right;
                font-size:12px;
                color:#C4C2BE;
                line-height:16px;
                &.oringe{
                    color:#F8941F;
                }
            }
        }
    }
    .changePanel{
        height: 90px;
        box-shadow:inset 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
        border-radius: 12px;
        border: 1px solid #38393B;
        h2{
            font-size:12px;
            color:#C4C2BE;
            line-height:18px;
            padding-top:12px;
            padding-left:15px;
            padding-bottom:14px;
            .balance{
                float:right;
                text-align:right;
                padding-right:20px;
            }
        }
        .entrynum{
            float:left;
            width:60%;
            border:none;
            outline: none;
            line-height:30px;
            font-size:20px;
            color:#fff;
            background:none;
            text-indent:20px;
            &::-webkit-input-placeholder{
                color:#6A6A6A;
            }
        }
        .coinbar{
            position:relative;
            float:right;
            width:33%;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #484744;
            font-size:0;
            margin-right:3%;
            .coinimg{
                display:inline-block;
                vertical-align:middle;
                width:16px;
                margin-left:10px;
                margin-top:-3px;
            }
            .coinname{
                display:inline-block;
                vertical-align:middle;
                font-size:12px;
                color:#C4C2BE;
                line-height:30px;
                padding:0 4px;
                width:54%;
                text-align:center;
            }
            .dropico{
                position: absolute;
                right: 12px;
                top: 12px;
                width:9px;
                height:6px;
                background:url(../../assets/img/icon5.png) no-repeat center;
                background-size:100% 100%;
            }
        }
    }
    .changeico{
        display:block;
        width:8px;
        height:13px;
        margin:25px auto;
        background: url(../../assets/img/icon1.png) no-repeat center;
        background-size:100% 100%;
    }
}
</style>
<style>
    .el-button.btn{margin-top:10px;}
</style>