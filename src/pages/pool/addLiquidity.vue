<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="tokensPop" @closePop='tokensPop=false' @change='changeToken'></selectToken>
        <div class="panelTop clearfix">
            <i class="return" @click="toPool"></i>
            <div class="tips">
                <p class="tipText">
                    {{$t('lang74')}}
                </p>
            </div>
            <h2>{{$t('lang75')}}</h2>
        </div>
        <div class="changePanel">
            <h2>Input<span class="balance">{{parseFloat(token1.balance).toFixed(2)}}</span></h2>
            <input class='entrynum' v-model="token1Num" @input="caleToken2">
            <div class="coinbar" @click="item=0;tokensPop=true">
                <img :src="requierImg(token1.name)" class="coinimg">
                <span class="coinname">{{token1.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico"></i>
        <div class="changePanel">
            <h2>Input<span class="balance">{{parseFloat(token2.balance).toFixed(2)}}</span></h2>
            <input class='entrynum' v-model="token2Num" @input="caleToken1">
            <div class="coinbar" @click="item=1;tokensPop=true">
                <img :src="requierImg(token2.name)" class="coinimg">
                <span class="coinname">{{token2.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <div class="PriceShare" v-if="poolsReserves">
            <p class="priceTitle">{{$t('lang76')}}</p>
            <div class="pricebar">
                <div class="priceItem">
                    <p class="val">{{(token1BalanceInPool/token2BalanceInPool).toFixed(4)}}</p>
                    <p class="title">{{token1.name}} per {{token2.name}}</p>
                </div>
                <div class="priceItem">
                    <p class="val">{{(token2BalanceInPool/token1BalanceInPool).toFixed(4)}}</p>
                    <p class="title">{{token2.name}} per {{token1.name}}</p>
                </div>
                <div class="priceItem">
                    <p class="val">{{share}}%</p>
                    <p class="title">{{$t('lang77')}}</p>
                </div>
            </div>
        </div>
        <el-button class="btn" :disabled='isAdding' :loading='isAdding' @click="clickHdl">{{isConnect?(isApproved?$t('lang75'):$t('lang97')):'Connect Wallet'}}</el-button>
    </div>
    <p class="prodexTips">☆ {{$t('lang78')}}。</p>
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
      token1Num:'',
      token2Num:'',
      token1Balance:0,
      token2Balance:0,
      token1ApproveBalance:0,
      token2ApproveBalance:0,
      isApproved:false,
      poolsReserves:null,
      share:0,
      token1BalanceInPool:0,
      token2BalanceInPool:0,
      isAdding:false
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
    }
  },
  watch: {
    tokenData(list) {
      this.tokenData = list  
      if(!this.token1.name && this.$route.query.poolDetail){
          let poolDetail = JSON.parse(this.$route.query.poolDetail)
          let token1 = this.tokenData.filter((item)=>{return item.address == poolDetail.token1.address})
          let token2 = this.tokenData.filter((item)=>{return item.address == poolDetail.token2.address})
          this.token1 = token1[0]
          this.token2 = token2[0]
          this.token1.item = 0
          this.token2.item = 1
          this.$initWeb3().then((web3)=>{
            this.web3 = web3
            this.checkPair(this.token1)
            this.checkPair(this.token2)
          })
      }
    },
  },  
  mounted() {
      if(this.$route.query.poolDetail && this.tokenData.length>0){
          let poolDetail = JSON.parse(this.$route.query.poolDetail)
          let token1 = this.tokenData.filter((item)=>{return item.address == poolDetail.token1.address})
          let token2 = this.tokenData.filter((item)=>{return item.address == poolDetail.token2.address})
          this.token1 = token1[0]
          this.token2 = token2[0]
          this.token1.item = 0
          this.token2.item = 1
          this.$initWeb3().then((web3)=>{
            this.web3 = web3
            this.checkPair(this.token1)
            this.checkPair(this.token2)
          })
      }
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
          this.isConnect = true
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
    async getBalance(address){
        let TokenContract = await new this.web3.eth.Contract(Token1.abi, address)
        let res = await TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call()
        if(res){
            return res
        }
    },
    async clickHdl(){
        this.isAdding = true
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        if(this.token1ApproveBalance==0){
            let apr1 = await this.Token1Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        }
        if(this.token2ApproveBalance==0){
            let apr2 = await this.Token2Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        }
        if(this.token1Num && this.token2Num){
            this.addLiquidity()
        }else{
            this.checkApprovedBalance()
            this.isAdding = false
        }
    },
    addLiquidity(){
        let that = this
        if(parseFloat(this.token1Num)>this.token1.balance || parseFloat(this.token2Num)>this.token2.balance){
            that.$message.error(that.$t('lang79'))
            return
        }
        let token1num = new BigNumber(this.token1Num)
        token1num = token1num.times(Math.pow(10,this.token1.decimals))
        let token2num = new BigNumber(this.token2Num)
        token2num = token2num.times(Math.pow(10,this.token2.decimals))
        this.RouterContract.methods.addLiquidity(this.token1.address, this.token2.address, token1num.toFixed(), token2num.toFixed(), 0, 0,this.web3.eth.defaultAccount,1702480290 ).send({from:this.web3.eth.defaultAccount})
        .on('transactionHash', function(hash){
            
        })
        .on('receipt', function(receipt){
            that.isAdding = false
            that.$message.success(that.$t('lang80'))
            window.location.reload()
            console.log(receipt)
        })
        .on('confirmation', function(confirmationNumber, receipt){
            that.isAdding = false
        })
        .on('error', function(){
            that.$message.success(that.$t('lang81'))
            that.isAdding = false
        });
    },
    getPair(){
        let that = this
        if(this.token1.address && this.token2.address){
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.getPair(this.token1.address,this.token2.address).call().then((result)=>{
                that.checkApprovedBalance()
            })
            FactoryContract.methods.getReserves(that.token1.address,that.token2.address).call().then((res)=>{
                that.poolsReserves = res
                that.token1BalanceInPool = res[0]/Math.pow(10,that.token1.decimals)
                that.token2BalanceInPool = res[1]/Math.pow(10,that.token2.decimals)
            })
        }
    },
    async checkApprovedBalance(){
        let that = this
        that.token1ApproveBalance = await that.getAllowance(that.token1.address)
        that.token2ApproveBalance = await that.getAllowance(that.token2.address)
        if(that.token1ApproveBalance>0 && that.token2ApproveBalance>0){
            that.isApproved = true
        }
    },
    changeToken(token){
        let that = this
        this.tokensPop = false
        this.item==0?this.token1=token:this.token2=token
        this.getPair()
        let TokenContract = new this.web3.eth.Contract(Token1.abi, token.address)
        if(this.item==0){
            TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                that.$set(that.token1, 'balance', res/Math.pow(10,token.decimals))
            })
            this.Token1Contract = new this.web3.eth.Contract(Token1.abi, this.token1.address)
        }else{
            TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                that.$set(that.token2, 'balance', res/Math.pow(10,token.decimals))
            })
            this.Token2Contract = new this.web3.eth.Contract(Token1.abi, this.token2.address)
        }
    },
    checkPair(token){
        let that = this
        this.getPair()
        let TokenContract = new this.web3.eth.Contract(Token1.abi, token.address)
        if(token.item==0){
            TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                that.$set(that.token1, 'balance', res/Math.pow(10,token.decimals))
            })
            this.Token1Contract = new this.web3.eth.Contract(Token1.abi, this.token1.address)
        }else{
            TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                that.$set(that.token2, 'balance', res/Math.pow(10,token.decimals))
            })
            this.Token2Contract = new this.web3.eth.Contract(Token1.abi, this.token2.address)
        }
    },
    async getAllowance(Spender){
        const contract = new this.web3.eth.Contract(Token1.abi, Spender)
        let res = await contract.methods.allowance(this.web3.eth.defaultAccount,Router.address).call()
        return res
    },
    caleToken2(){
        let that = this
        if(this.token1Num && parseInt(this.poolsReserves[0])){
            let token1Num = new BigNumber(this.token1Num)
            token1Num = token1Num.times(Math.pow(10,this.token1.decimals))
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.quote(token1Num,this.poolsReserves[0],this.poolsReserves[1]).call().then((result)=>{
                that.token2Num = parseInt(result)/Math.pow(10,that.token2.decimals)
                that.token2Num = that.token2Num.toFixed(2)
                that.getShare()
            })
        }
    },
    caleToken1(){
        let that = this
        if(this.token2Num && parseInt(this.poolsReserves[0])){
            let token2Num = new BigNumber(this.token2Num)
            token2Num = token2Num.times(Math.pow(10,this.token2.decimals))
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.quote(token2Num,this.poolsReserves[1],this.poolsReserves[0]).call().then((result)=>{
                that.token1Num = parseInt(result)/Math.pow(10,that.token1.decimals)
                that.token1Num = that.token1Num.toFixed(2)
                that.getShare()
            })
        }
    },
    getShare(){
        if(this.token1Num && this.poolsReserves){
            let token1Total = new BigNumber(this.poolsReserves[0])
            token1Total = token1Total.div(Math.pow(10,this.token1.decimals))
            let token1Num = new BigNumber(this.token1Num)
            let afterTotal = token1Num.plus(token1Total)
            let share = token1Num.div(afterTotal)
            this.share = share.times(100).toFixed(2)
        }
    }
  }
}
</script>
<style  lang="less" scoped>
.prodexTips{
    width:345px;
    font-size:10px;
    color:#6A6A6A;
    line-height:14px;
    text-align:center;
    margin:0 auto;
}
.exchangeBar{
    width: 345px;
    min-height:400px;
    background: #232221;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
    border-radius: 18px;
    border: 1px solid #232221;
    box-sizing: border-box;
    padding:20px 18px;
    margin:40px auto;
    position:relative;
    .panelTop{
        padding-bottom:18px;
        .return{
            float:left;
            width:22px;
            height:22px;
            background: url(../../assets/img/icon14.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
        }
        h2{
            font-size:16px;
            color:#C4C2BE;
            line-height:22px;
            text-align:center;
        }
        .tips{
            float:right;
            width:16px;
            height:16px;
            background: url(../../assets/img/icon13.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
            position:relative;
            &:hover,&:active{
              .tipText{display:block;} 
            }
            .tipText{
                display:none;
                position:absolute;
                right: 26px;
                top: -90px;
                width: 215px;
                height: 203px;
                background: #3D3B39;
                border: 1px solid #6A6A6A;
                box-sizing: border-box;
                padding:15px;
                font-size:14px;
                color:#C4C2BE;
                line-height:20px;
            }
        }
    }
    .firstTip{
        font-size:13px;
        color:#009346;
        line-height:18px;
        padding:17px 15px;
        background:#1F2823;
        border-radius:12px;
        margin:18px 0 15px;
    }
    .changePanel{
        width: 310px;
        height: 90px;
        box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
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
                font-size:14px;
                color:#C4C2BE;
                line-height:30px;
                padding:0 4px;
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
    .PriceShare{
        padding-top:24px;
        .priceTitle{
            font-size:12px;
            color:#C4C2BE;
            line-height:17px;
            padding-bottom:10px;
        }
        .pricebar{
            font-size:0;
            .priceItem{
                display:inline-block;
                vertical-align: middle;
                width:33.3%;
                text-align:center;
                color:#6A6A6A;
                line-height:22px;
                .title{
                    font-size:12px;
                }
                .val{
                    font-size:16px;
                }
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
