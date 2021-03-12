<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="tokensPop" @closePop='tokensPop=false' @change='changeToken'></selectToken>
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
        <el-button class="btn" :disabled='false' @click="clickHdl">{{isConnect?(isApproved?'Add Liquidity':'Approve'):'Connect Wallet'}}</el-button>
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
      token2Num:0,
      isApproved:false
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
            this.isApproved = false
            this.doSwap()
        }
        this.doSwap()
    },
    async doSwap(){
      let that = this
      let token1num = new BigNumber(this.token1Num)
      token1num = token1num.times(Math.pow(10,this.token1.decimals))
      const ret3 = await this.RouterContract.methods.swapExactTokensForTokens(token1num.toFixed(),0,[this.token1.address,this.token2.address],this.web3.eth.defaultAccount,1702480290 ).send({from:this.web3.eth.defaultAccount})
      if(ret3){
          console.log(ret3)
      }
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
        this.tokensPop = false
        this.item==0?this.token1=token:this.token2=token
        this.getBalance(token.address)
        if(this.item==0){
            this.checkApprovedBalance()
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
