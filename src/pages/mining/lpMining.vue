<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="lpMiningContainer">
        <p class="earntip">Earn MDX tokens by staking HSwap LP<br> && Tokens</p>
        <el-button class="btn">Total Value Locked 0.00 USDT</el-button>
        <div class="staketab">
          <span :class="isMult?'active':''" @click="isMult=true">Mdex LP</span>
          <span :class="!isMult?'active':''" @click="isMult=false">Single Token</span>
        </div>
        <ul class="lpPoolList clearfix" v-show="isMult">
          <li v-for="(item,index) in multLpPool" :key="index">
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <!-- <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png"> -->
            </div>
            <p class="stakeInfo">{{item.token1Name}}/{{item.token2Name}} <br>Earn {{parseFloat(item.earnPerDay).toFixed(2)}} PDX(Per Day)<br> Earn {{parseFloat(item.earnPerMonth).toFixed(2)}} PDX(Per Month)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select" @click="goDeposit(item)">Select</a>
          </li>
        </ul>
        <ul class="lpPoolList clearfix" v-show="!isMult">
          <li v-for="(item,index) in singleLpPool" :key="index">
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <!-- <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png"> -->
            </div>
            <p class="stakeInfo">{{item.tokenName}} <br>Earn {{parseFloat(item.earnPerDay).toFixed(2)}} PDX(Per Day)<br> Earn {{parseFloat(item.earnTotal).toFixed(2)}} PDX(Total)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select" @click="goDeposit(item)">Select</a>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {Factory,LpPair,Pool,Token1} from '../../utils/contract'
import BigNumber from 'bignumber.js'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      isMult:true,
      homeInfo:{},
      chartData:[],
      pageNum:0,
      pageNum1:0,
      blockList:[],
      transList:[],
      isConnect:false,
      PoolContract:null,
      FactoryContract:null,
      poolLength:0,
      pairAddressList:[],
      multLpPool:[],
      singleLpPool:[]
    }
  },
  mounted() {
    this.$initWeb3().then((web3)=>{
        this.web3 = web3
        this.FactoryContract = new web3.eth.Contract(Factory.abi, Factory.address)
        this.PoolContract = new web3.eth.Contract(Pool.abi, Pool.address)
        this.isConnect = true
        this.getPairLength()
    })
  },
  methods: {
    goDeposit(item){
      this.$router.push({
        path: '/selectPool',
        query: {
          miningPool: JSON.stringify(item)
        }
      })
    },
    async getPairLength(){
        let that = this
        let pdxPerBlock = await this.PoolContract.methods.pdxPerBlock().call()
        this.pdxPerBlock = pdxPerBlock/Math.pow(10,18)
        this.totalAllocPoint = await this.PoolContract.methods.totalAllocPoint().call()
        this.PoolContract.methods.poolLength().call().then(res=>{
            that.poolLength = res
            that.getPairList()
        })
    },
    async getPairList(){
        for(var i=0;i<this.poolLength;i++){
            let res = await this.PoolContract.methods.poolInfo(i).call()
            if(res)
            res.pid = i
            this.getPoolDetail(res)
        }
    },
    async getPoolDetail(item){
      // let isMultLP = await this.PoolContract.methods.isMultLP(item.lpToken).call()
      if(item.pid>3){
        let PairContract = new this.web3.eth.Contract(LpPair.abi, item.lpToken)
        let token1Address = await PairContract.methods.token0().call()
        let token2Address = await PairContract.methods.token1().call()
        let Token1Contract = new this.web3.eth.Contract(Token1.abi,token1Address)
        let Token2Contract = new this.web3.eth.Contract(Token1.abi,token2Address)
        let token1Name = await Token1Contract.methods.symbol().call()
        let token2Name = await Token2Contract.methods.symbol().call()
        this.multLpPool.push({
          pid:item.pid,
          lpAddress:item.lpToken,
          earnPerDay:this.pdxPerBlock*item.allocPoint/this.totalAllocPoint*60/3*60*24,
          earnPerMonth:this.pdxPerBlock*item.allocPoint/this.totalAllocPoint*60/3*60*24*30,
          allocPoint:item.allocPoint,
          totalAmount:item.totalAmount/Math.pow(10,18),
          token1Address:token1Address,
          token2Address:token2Address,
          token1Name:token1Name,
          token2Name:token2Name
        })
      }else{
        let TokenContract = new this.web3.eth.Contract(Token1.abi,item.lpToken)
        let tokenName = await TokenContract.methods.symbol().call()
        this.singleLpPool.push({
          pid:item.pid,
          lpAddress:item.lpToken,
          earnPerDay:this.pdxPerBlock*item.allocPoint/this.totalAllocPoint*60/3*60*24,
          earnTotal:0,
          tokenName:tokenName
        })
      }
    },
  }
}
</script>
<style  lang="less" scoped>
.lpMiningContainer{
  .earntip{
    font-size:16px;
    color:#C4C2BE;
    line-height:18px;
    padding-top:40px;
    padding-bottom:10px;
    text-align:center;
  }
  .el-button.btn{
    width: 345px;
    height: 70px;
    background: #232221;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    border: 1px solid #232221;
    font-size:14px;
    color:#fff;
    display:block;
    margin:0 auto 20px;
  }
  .staketab{
    text-align:center;
    span{
      cursor: pointer;
      display:inline-block;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #333936;
      margin:0 5px;
      font-size:12px;
      color:#536A5E;
      line-height:30px;
      text-align:center;
      box-sizing: border-box;
      &.active{
        border:none;
        background:#30694B;
        color:#fff;
      }
    }
  }
  .lpPoolList{
    text-align:center;
    width:1000px;
    margin:20px auto;
    li{
      float:left;
      width: 300px;
      height: 250px;
      background: #232221;
      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border: 1px solid #232221;
      margin:0 7px;
      margin-bottom:15px;
      .coinLogo{
        text-align:center;
        padding:18px 0 10px;
        img{
          width:24px;
          vertical-align: middle;
          &.or{
            width:18px;
            margin:0 16px;
          }
        }
      }
      .stakeInfo{
        font-size:12px;
        color:#C4C2BE;
        line-height:20px;
        text-align: center;
      }
      .btn{
        display:inline-block;
        width: 270px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid #353330;
        margin-top:20px;
        text-align:center;
        line-height:32px;
        box-sizing: border-box;
        font-size:14px;
        color:#009346;
        cursor: pointer;
        &.active{
          background:#30694B;
          color:#fff;
          border:none;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .lpMiningContainer .lpPoolList{width:auto;padding:0 15px;}
  .lpMiningContainer .lpPoolList li{width:49%;height:290px;padding:0 15px;box-sizing:border-box;margin:0;margin-bottom:20px;}
  .lpMiningContainer .lpPoolList li:nth-child(2n){margin-left:2%;}
  .lpMiningContainer .lpPoolList li .btn{width:100%;}
}
</style>
