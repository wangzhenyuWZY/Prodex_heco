<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="tokensPop" @closePop='tokensPop=false' @change='changeToken'></selectToken>
        <div class="panelTop clearfix">
            <i class="return" @click="toPool"></i>
            <div class="tips">
                <p class="tipText">
                    When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                </p>
            </div>
            <h2>Add Liquidity</h2>
        </div>
        <div class="changePanel">
            <h2>Input</h2>
            <input class='entrynum' v-model="token1Num" @input="caleToken2">
            <div class="coinbar" @click="item=0;tokensPop=true">
                <img :src="token1.logoURI" class="coinimg">
                <span class="coinname">{{token1.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico"></i>
        <div class="changePanel">
            <h2>Input</h2>
            <input class='entrynum' v-model="token2Num" @input="caleToken1">
            <div class="coinbar" @click="item=1;tokensPop=true">
                <img :src="token2.logoURI" class="coinimg">
                <span class="coinname">{{token2.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <div class="PriceShare" v-if="poolsReserves">
            <p class="priceTitle">Prices and pool share</p>
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
                    <p class="title">Share of Pool</p>
                </div>
            </div>
        </div>
        <el-button class="btn" :disabled='false' @click="clickHdl">{{isConnect?(isApproved?'Add Liquidity':'Approve'):'Connect Wallet'}}</el-button>
    </div>
    <p class="prodexTips">☆ 通过增强流动性，您将获得Prodex奖励,如您所提供的流动性交易对未支持流动性质押获取Prodex，您暂时将无法获得Prodex奖励。</p>
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
      token1:{},
      token2:{},
      item:0,
      isConnect:false,
      web3:null,
      Token1Contract:null,
      Token2Contract:null,
      RouterContract:null,
      token1Num:0,
      token2Num:0,
      token1Balance:0,
      token2Balance:0,
      token1ApproveBalance:0,
      token2ApproveBalance:0,
      isApproved:false,
      poolsReserves:null,
      share:0,
      token1BalanceInPool:0,
      token2BalanceInPool:0
    }
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
          this.isConnect = true
      })
  },
  methods: {
    toPool(){
        this.$router.push('/pool')
    },
    getBalance(address){
        let TokenContract = new this.web3.eth.Contract(Token1.abi, address)
        TokenContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
            return res
        })
    },
    async clickHdl(){
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        if(this.token1ApproveBalance==0){
            let apr1 = await this.Token1Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        }
        if(this.token2ApproveBalance==0){
            let apr2 = await this.Token2Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        }
        this.addLiquidity()
    },
    async addLiquidity(){
        let that = this
        let token1num = new BigNumber(this.token1Num)
        token1num = token1num.times(Math.pow(10,this.token1.decimals))
        let token2num = new BigNumber(this.token2Num)
        token2num = token2num.times(Math.pow(10,this.token2.decimals))
        const ret3 = await this.RouterContract.methods.addLiquidity(this.token1.address, this.token2.address, token1num.toFixed(), token2num.toFixed(), 0, 0,this.web3.eth.defaultAccount,1702480290 ).send({from:this.web3.eth.defaultAccount})
        if(ret3){
            this.$message.success('添加成功')
        }
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
        this.tokensPop = false
        this.item==0?this.token1=token:this.token2=token
        this.getPair()
        if(this.item==0){
            this.token1Balance = this.getBalance(token.address)
            this.Token1Contract = new this.web3.eth.Contract(Token1.abi, this.token1.address)
        }else{
            this.token2Balance = this.getBalance(token.address)
            this.Token2Contract = new this.web3.eth.Contract(Token1.abi, this.token2.address)
        }
    },
    async getAllowance(Spender){
        const contract = new this.web3.eth.Contract(Token1.abi, Spender)
        let res = await contract.methods.allowance(this.web3.eth.defaultAccount,Router.address).call()
        return res
    },
    caleToken2(){
        if(this.token1Num && parseInt(this.poolsReserves[0])){
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.quote(this.token1Num,this.token1BalanceInPool,this.token2BalanceInPool).call().then((result)=>{
                this.token2Num = result
                this.getShare()
            })
        }
    },
    caleToken1(){
        if(this.token2Num && parseInt(this.poolsReserves[0])){
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.quote(this.token2Num,this.poolsReserves[1],this.poolsReserves[0]).call().then((result)=>{
                this.token1Num = result
                this.getShare()
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
            float:right;
            width:92px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #484744;
            text-align:center;
            font-size:0;
            margin-right:15px;
            .coinimg{
                display:inline-block;
                vertical-align:middle;
                width:16px;
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
                display:inline-block;
                vertical-align:middle;
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
