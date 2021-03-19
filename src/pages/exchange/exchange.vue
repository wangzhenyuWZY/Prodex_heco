<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="tokensPop" @closePop='tokensPop=false' @change='changeToken'></selectToken>
        <div class="changePanel">
            <h2>From<span class="balance">{{parseFloat(token1.balance).toFixed(2)}}</span></h2>
            <input class='entrynum' v-model="token1Num" @input="caleToken2">
            <div class="coinbar" @click="item=0;tokensPop=true">
                <img :src="token1.logoURI" class="coinimg">
                <span class="coinname">{{token1.name}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico" @click="convertToken"></i>
        <div class="changePanel">
            <h2>To<span class="balance">{{parseFloat(token2.balance).toFixed(2)}}</span></h2>
            <input class='entrynum' v-model="token2Num" @input="caleToken1">
            <div class="coinbar" @click="item=1;tokensPop=true">
                <img :src="token2.logoURI" class="coinimg">
                <span class="coinname">{{token2.name?token2.name:'Select'}}</span>
                <i class="dropico"></i>
            </div>
        </div>
        <el-button class="btn" :disabled='isSwaping' :loading='isSwaping' @click="clickHdl">{{isConnect?(isApproved?'Confirm Swap':'Approve'):'Connect Wallet'}}</el-button>
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
      isSwaping:false
    }
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
          this.FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
          this.isConnect = true
          let tokenData = this.$store.getters.tokenData
          let token1 = tokenData.filter((item)=>{return item.name.toUpperCase() == this.baseToken})
          this.changeToken(token1[0])
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
    convertToken(){
        this.token1 = this.token2
        this.token2 = this.token1
        this.token1BalanceInPool = this.token2BalanceInPool
        this.token2BalanceInPool = this.token1BalanceInPool
        this.getPair()
    },
    async clickHdl(){
        this.isSwaping = true
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        if(this.token1ApproveBalance==0){
            let apr1 = await this.Token1Contract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
            this.isApproved = false
            this.doSwap()
        }else{
            this.doSwap()
        }
    },
    async doSwap(){
      let that = this
      let token1num = new BigNumber(this.token1Num)
      token1num = token1num.times(Math.pow(10,this.token1.decimals))
      this.RouterContract.methods.swapExactTokensForTokens(token1num.toFixed(),0,[this.token1.address,this.token2.address],this.web3.eth.defaultAccount,1702480290 ).send({from:this.web3.eth.defaultAccount})
        .on('transactionHash', function(hash){
            
        })
        .on('receipt', function(receipt){
            that.isSwaping = false
            that.$message.success('兑换成功')
            window.location.reload()
        })
        .on('confirmation', function(confirmationNumber, receipt){
            that.isSwaping = false
        })
        .on('error', function(){
            that.$message.success('兑换失败')
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
            this.checkApprovedBalance()
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
        this.getPair()
    },
    getPair(){
        let that = this
        if(this.token1.address && this.token2.address){
            this.FactoryContract.methods.getPair(this.token1.address,this.token2.address).call().then((result)=>{
                if(parseInt(result)){
                    that.hasPair = true
                }else{
                    that.$message.error('交易对不存在')
                    that.hasPair = false
                }
            })
            this.FactoryContract.methods.getReserves(that.token1.address,that.token2.address).call().then((res)=>{
                that.poolsReserves = res
                that.token1BalanceInPool = res[0]/Math.pow(10,that.token1.decimals)
                that.token2BalanceInPool = res[1]/Math.pow(10,that.token2.decimals)
            })
        }
    },
    caleToken2(){
        let that = this
        if(!this.hasPair){
            this.$message.error('交易对不存在')
            return
        }
        if(this.token1Num && parseInt(this.poolsReserves[0])){
            let token1Num = new BigNumber(this.token1Num)
            token1Num = token1Num.times(Math.pow(10,this.token1.decimals))
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.getAmountOut(token1Num,this.poolsReserves[0],this.poolsReserves[1]).call().then((result)=>{
                that.token2Num = parseInt(result)/Math.pow(10,that.token2.decimals)
                that.token2Num = that.token2Num.toFixed(2)
            })
        }
    },
    caleToken1(){
        let that = this
        if(!this.hasPair){
            this.$message.error('交易对不存在')
            return
        }
        if(this.token2Num && parseInt(this.poolsReserves[0])){
            let token2Num = new BigNumber(this.token2Num)
            token2Num = token2Num.times(Math.pow(10,this.token2.decimals))
            let FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
            FactoryContract.methods.getAmountIn(token2Num,this.poolsReserves[0],this.poolsReserves[1]).call().then((result)=>{
                that.token1Num = parseInt(result)/Math.pow(10,that.token1.decimals)
                that.token1Num = that.token1Num.toFixed(2)
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
                position: absolute;
                right: 12px;
                top: 10px;
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
