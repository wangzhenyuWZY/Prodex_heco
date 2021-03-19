<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="poolContainer">
        <h2 class="poolTitle">Prodex Pool</h2>
        <p class="notice">Notice: We just support Heco now, don't<br>
transfer ETHEREUM mainnet tokens</p>
        <div class="stakebox">
          <div class="stakeinfo">
            <p class="staketitle">Your Balance</p>
            <div class="balance">
              <img src="@/assets/img/icon27.png">
              {{pdxBalance}}
            </div>
            <el-button class="btn" :disabled='isHarvesting' :loading='isHarvesting' @click="toClaim">Harvest All Token</el-button>
          </div>
          <div class="stakeinfo">
            <p class="staketitle">Staked</p>
            <div class="balance">
              Locked {{myStakeAmount}}
            </div>
            <el-button class="btn" :disabled='isUnstaking' :loading='isUnstaking' @click="unStake">Unstake</el-button>
          </div>
          <div class="stakeinfo">
            <p class="staketitle">Your Balance</p>
            <div class="balance">
              <img src="@/assets/img/icon27.png">
              {{myLpBalance}}
            </div>
            <div class="stakeput">
              <input v-model="stakeNum"><span @click="stakeNum = myLpBalance">MAX</span>
            </div>
            <el-button class="btn" :disabled='isStaking' :loading='isStaking' @click="toStake">{{isApproved?'Stake':'Approve'}}</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {LpPair,Pool,Token1} from '../../utils/contract'
const Web3Utils = require('web3')
import BigNumber from 'bignumber.js'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      miningPool:{},
      isConnect:false,
      LpPoolContract:null,
      PoolContract:null,
      LpTokenContract:null,
      myLpBalance:0,
      stakeNum:0,
      lpApproveBalance:0,
      isApproved:false,
      pdxBalance:0,
      myStakeAmount:0,
      isStaking:false,
      isUnstaking:false,
      isHarvesting:false
    }
  },
  mounted() {
    let that = this
    if(this.$route.query.miningPool){
      this.miningPool = JSON.parse(this.$route.query.miningPool)
      this.$initWeb3().then((web3)=>{
          that.web3 = web3
          that.LpTokenContract = new this.web3.eth.Contract(Token1.abi, this.miningPool.lpAddress)
          that.PoolContract = new web3.eth.Contract(Pool.abi,Pool.address)
          that.LpPoolContract = new web3.eth.Contract(LpPair.abi, that.miningPool.lpAddress)
          that.isConnect = true
          that.getAllowance()
          that.getMyPdx()
      })
    }
    
  },
  methods: {
    getMyPdx(){
      let that = this
      that.LpPoolContract.methods.balanceOf(that.web3.eth.defaultAccount).call().then(res=>{
        that.myLpBalance = res/Math.pow(10,18)
      })
      that.PoolContract.methods.userInfo(that.miningPool.pid,that.web3.eth.defaultAccount).call().then(res=>{
        that.myStakeAmount = res.amount/Math.pow(10,18)
      })
      that.PoolContract.methods.pending(this.miningPool.pid,this.web3.eth.defaultAccount).call().then(res=>{
        if(res){
          that.pdxBalance = res[0]/Math.pow(10,18)
        }
      })
    },
    async getAllowance(){
        let res = await this.LpTokenContract.methods.allowance(this.web3.eth.defaultAccount,Pool.address).call()
        if(parseInt(res)){
          this.isApproved = true
          this.lpApproveBalance = res
        }
    },
    async toStake(){
      this.isStaking = true
      if(this.isApproved){
        this.doDeposit()
      }else{
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        let apr1 = await this.LpTokenContract.methods.approve(Pool.address,MAX).send({from:this.web3.eth.defaultAccount})
        if(apr1){
          this.isApproved = true
          this.doDeposit()
        }
      }
    },
    doDeposit(){
      let that = this
      let stakeNum = new BigNumber(this.stakeNum)
      stakeNum = stakeNum.times(Math.pow(10,18))
      console.log('stakenum====='+stakeNum)
      that.PoolContract.methods.deposit(this.miningPool.pid,stakeNum.toFixed()).send({from:this.web3.eth.defaultAccount})
      .on('receipt', function(receipt){
          that.isStaking = false
          that.$message.success('质押成功')
          window.location.reload()
          console.log(receipt)
      })
      .on('confirmation', function(confirmationNumber, receipt){
          that.isStaking = false
      })
      .on('error', function(){
          that.$message.success('质押失败')
          that.isStaking = false
      });
    },
    toClaim(){
      let that = this
      that.isHarvesting = true
      that.PoolContract.methods.withdraw(this.miningPool.pid,0).send({from:this.web3.eth.defaultAccount})
      .on('receipt', function(receipt){
          that.isHarvesting = false
          that.$message.success('PDX奖励领取成功')
          window.location.reload()
          console.log(receipt)
      })
      .on('confirmation', function(confirmationNumber, receipt){
          that.isHarvesting = false
      })
      .on('error', function(){
          that.$message.success('PDX奖励领取失败')
          that.isHarvesting = false
      });
    },
    unStake(){
      let that = this
      that.isUnstaking = true
      let stakeNum = new BigNumber(this.myStakeAmount)
      stakeNum = stakeNum.times(Math.pow(10,18))
      that.PoolContract.methods.withdraw(this.miningPool.pid,stakeNum).send({from:this.web3.eth.defaultAccount})
      .on('receipt', function(receipt){
          that.isUnstaking = false
          that.$message.success('解除质押成功')
          window.location.reload()
          console.log(receipt)
      })
      .on('confirmation', function(confirmationNumber, receipt){
          that.isUnstaking = false
      })
      .on('error', function(){
          that.$message.success('解除质押失败')
          that.isUnstaking = false
      });
    }
  }
}
</script>
<style  lang="less" scoped>
.poolContainer{
  .poolTitle{
    padding-top:40px;
    font-size:16px;
    color:#C4C2BE;
    line-height:18px;
    text-align:center;
  }
  .notice{
    padding-top:14px;
    font-size:16px;
    color:#C4C2BE;
    line-height:18px;
    text-align:center;
  }
  .stakebox{
    padding-top:20px;
    text-align:center;
    .stakeinfo{
      display:inline-block;
      vertical-align: middle;
      width: 345px;
      background: #232221;
      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
      border-radius: 18px;
      border: 1px solid #232221;
      margin-right:15px;
      padding-bottom:20px;
      .stakeput{
        padding-bottom:20px;
        input{
          border:1px solid #484744;
          border-radius:5px;
          outline: none;
          background:none;
          font-size:14px;
          text-indent:10px;
          line-height:40px;
          color:#fff;
        }
        span{
          padding-left:10px;
          color:#fff;
          cursor: pointer;
        }
      }
      .staketitle{
        font-size:12px;
        color:#837F76;
        line-height:20px;
        padding-top:18px;
        text-align:center;
        padding-bottom:10px;
      }
      .balance{
        text-align:center;
        font-size:23px;
        color:#C4C2BE;
        line-height:30px;
        padding-bottom:40px;
        img{
          width:30px;
          vertical-align: middle;
          margin-right:13px;
        }
      }
      .el-button.btn{
        width: 180px;
        height: 40px;
        background: #30694B;
        border-radius: 6px;
        color:#FFFFFF;
        font-size:14px;
        display:block;
        margin:0 auto;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .poolContainer .stakebox{padding:20px 15px;}
  .poolContainer .stakebox .stakeinfo{width:100%;margin-bottom:15px;}
  .poolContainer .stakebox .stakeinfo:first-child{margin-right:0;}
}
</style>
