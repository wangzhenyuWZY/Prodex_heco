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
            <h2>Create a pair</h2>
        </div>
        <p class="firstTip">
            You are the first liquidity provider.
            <br>
            The ratio of tokens you add will set the price of this pool.
Once you are happy with the rate click supply to review.
        </p>
        <div class="changePanel">
            <h2>From</h2>
            <input class='entrynum' v-model="token1Num">
            <div class="coinbar" @click="item=0;tokensPop=true">
                <img :src="token1.logoURI" class="coinimg">
                <span class="coinname">{{token1.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico"></i>
        <div class="changePanel">
            <h2>To</h2>
            <input class='entrynum' v-model="token2Num">
            <div class="coinbar" @click="item=1;tokensPop=true">
                <img :src="token2.logoURI" class="coinimg">
                <span class="coinname">{{token2.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <el-button class="btn" :disabled='false' @click="addLiquidity">{{isConnect?'Create':'Connect Wallet'}}</el-button>
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
      token1:{},
      token2:{},
      item:0,
      isConnect:false,
      web3:null,
      Token1Contract:null,
      Token2Contract:null,
      RouterContract:null,
      token1Num:0,
      token2Num:0
    }
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
          this.isConnect = true
          this.getPair(web3)
        //   this.createPair(web3)
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
    async createPair(){
        let that = this
        let apr1 = await this.Token1Contract.methods.approve(Router.address,'1000000000000000000000').send({from:this.web3.eth.defaultAccount})
        let apr2 = await this.Token2Contract.methods.approve(Router.address,'1000000000000000000000').send({from:this.web3.eth.defaultAccount})
        let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
        FactoryContract.methods.createPair(that.token1.address,that.token2.address).send({from:this.web3.eth.defaultAccount}).then((result)=>{
            that.addLiquidity()
        })
    },
    async addLiquidity(){
        let that = this
        let token1num = new BigNumber(this.token1Num)
        token1num = token1num.times(Math.pow(10,this.token1.decimals))
        let token2num = new BigNumber(this.token2Num)
        token2num = token2num.times(Math.pow(10,this.token2.decimals))
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        let apr1 = await this.Token1Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        let apr2 = await this.Token2Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        const ret3 = await that.RouterContract.methods.addLiquidity(that.token1.address, that.token2.address, token1num.toFixed(), token2num.toFixed(), token1num.toFixed(), token2num.toFixed(),this.web3.eth.defaultAccount,1702480290 ).send({from:this.web3.eth.defaultAccount})
        if(ret3){
            that.$message.success('创建成功')
        }
    },
    getPair(web3){
        let FactoryContract = new web3.eth.Contract(Factory.abi, Factory.address)
        FactoryContract.methods.getPair('0x6e5B3b424072C915A55aBD58f69737023a3723a6','0xdFC3e325e5F6cc2235A0d570B02B21224b251B70').call().then((result)=>{
            console.log(result)
        })
    },
    changeToken(token){
        this.tokensPop = false
        this.item==0?this.token1=token:this.token2=token
        this.getBalance(token.address)
        if(this.item==0){
            this.Token1Contract = new this.web3.eth.Contract(Token1.abi, this.token1.address)
        }else{
            this.Token2Contract = new this.web3.eth.Contract(Token1.abi, this.token2.address)
        }
    }
  }
}
</script>
<style  lang="less" scoped>
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
