<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle"><i class="returnBack" @click="toPool"></i>{{$t('lang94')}}</h2>
        <div class="deleteType clearfix">
          <span class="fl">{{$t('lang95')}}</span>
          <span class="fr">{{$t('lang96')}}</span>
        </div>
        <span class="amount">{{slidenum}}%</span>
        <el-slider
          :show-tooltip="false"
          :max="100"
          v-model="slidenum"
          @change="changeSlide"
        ></el-slider>
        <div class="scale clearfix">
          <span class="calibration" @click="slidenum=25">25%</span>
          <span class="calibration" @click="slidenum=50">50%</span>
          <span class="calibration" @click="slidenum=75">75%</span>
          <span class="calibration" @click="slidenum=100">Max</span>
        </div>
        <el-button class="btn" :disabled='isRemoving' :loading='isRemoving' @click="handelClick">{{isApprove?$t('lang90'):$t('lang97')}}</el-button>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import Navbar from '../../components/Navbar'
import {Factory,Token1,Router} from '../../utils/contract'
const Web3Utils = require('web3')
export default {
  components:{
    Navbar
  },
  data() {
    return {
      isConnect:false,
      web3:null,
      hasToken:true,
      slidenum:0,
      RouterContract:null,
      poolDetail:null,
      isApprove:false,
      isRemoving:false
    }
  },
  mounted() {
    let tokenData = this.$store.getters.tokenData
    if(this.$route.query.poolDetail){
        this.poolDetail = JSON.parse(this.$route.query.poolDetail)
    }
    this.$initWeb3().then((web3)=>{
        this.web3 = web3
        this.isConnect = true
        this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
        this.getAllowance()
    })
  },
  methods: {
    toPool(){
        this.$router.push('/pool')
    },
    changeSlide(){

    },
    async handelClick(){
      this.isRemoving = true
      if(this.isApprove){
        this.removeLiquidity()
      }else{
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        let PoolContract = new this.web3.eth.Contract(Token1.abi,this.poolDetail.address)
        let apr1 = await PoolContract.methods.approve(Router.address,MAX).send({from:this.web3.eth.defaultAccount})
        if(apr1){
          this.isApprove = true
          this.isRemoving = false
        }
      }
    },
    async getAllowance(Spender){
        const contract = new this.web3.eth.Contract(Token1.abi, this.poolDetail.address)
        let res = await contract.methods.allowance(this.web3.eth.defaultAccount,Router.address).call()
        if(parseInt(res)){
          this.isApprove = true
        }
        return res
    },
    async removeLiquidity(){
      let that = this
      let tokenA = this.poolDetail.token1.address
      let tokenB = this.poolDetail.token2.address
      console.log(this.poolDetail.myLpTotal)
      let liquidity = new BigNumber(this.poolDetail.myLpTotal)
      liquidity = liquidity.times(this.slidenum/100)
      let amountAMin = 0
      let amountBMin = 0
      let to = this.web3.eth.defaultAccount
      let deadline = 1702480290
      this.RouterContract.methods.removeLiquidity(tokenA,tokenB,parseInt(liquidity).toFixed(),amountAMin,amountBMin,to,deadline).send({from:this.web3.eth.defaultAccount})
      .on('transactionHash', function(hash){
      })
      .on('receipt', function(receipt){
        that.isRemoving = false
        that.$message.success(that.$t('lang98'))
        window.location.reload()
      })
      .on('confirmation', function(confirmationNumber, receipt){
          
      })
      .on('error', function(){
          that.$message.success(that.$t('lang99'))
          that.isRemoving = false
      });
    }
  }
}
</script>
<style  lang="less" scoped>
.exchangeBar{
    width: 345px;
    min-height:340px;
    background: #232221;
    box-shadow:inset 3px 3px 3px 0px rgba(0, 0, 0, 0.4);
    border-radius: 18px;
    border: 1px solid #232221;
    box-sizing: border-box;
    padding:20px 18px;
    margin:40px auto;
    position:relative;
    .createTitle{
      font-size:16px;
      color:#C4C2BE;
      line-height:22px;
      text-align:center;
      padding-bottom:26px;
      .returnBack{
        float:left;
        width:22px;
        height:22px;
        background:url(../../assets/img/icon14.png) no-repeat center;
        background-size:100% 100%;
        cursor: pointer;
      }
    }
    .deleteType{
      padding-top:10px;
      padding-bottom:25px;
      span{
        font-size:14px;
        color:#C4C2BE;
        line-height:20px;
        cursor: pointer;
        &.fl{
          float:left;
        }
        &.fr{
          float:right;
          color:#30694B;
        }
      }
    }
    .amount{
      font-size:40px;
      color:#C4C2BE;
      line-height:40px;
      padding-bottom:26px;
    }
    .scale{
      margin-top:26px;
      .calibration{
        float:left;
        width:58px;
        height:40px;
        background:#30694B;
        border-radius:6px;
        font-size:14px;
        color:#C4C2BE;
        line-height:40px;
        text-align:center;
        margin-left:24px;
        &:first-child{
          margin-left:0;
        }
      }
    }
}
</style>
<style>
.el-slider{
  padding-top:40px;
}
.el-slider__button{
  width: 30px;
  height: 30px;
  background: #30694B;
  border:none;
  margin-top: -2px;
}
.el-slider__runway{
  height: 2px;
  background: linear-gradient(90deg, #38393B 0%, rgba(56, 57, 59, 0) 100%);
}
</style>
