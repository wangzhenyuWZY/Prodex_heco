<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="lpMiningContainer">
        <p class="earntip">{{$t('lang43')}}</p>
        <el-button class="btn">{{$t('lang44')}} {{isMult?parseFloat(totalLocked).toFixed(2):parseFloat(sigleTotalLocked).toFixed(2)}} USDT</el-button>
        <div class="staketab">
          <span :class="isMult?'active':''" @click="isMult=true">Pdex LP</span>
          <span :class="!isMult?'active':''" @click="isMult=false">{{$t('lang107')}}</span>
        </div>
        <ul class="lpPoolList clearfix" v-show="isMult">
          <li v-for="(item,index) in multLpPool" :key="index" @click="checkThis(index)" :class="active==index?'active':''">
            <div class="coinLogo">
              <img :src="requierImg(item.token1Name)">
              <img class="or" src="@/assets/img/icon15.png">
              <img :src="requierImg(item.token2Name)">
            </div>
            <p class="stakeInfo">{{item.token1Name}}/{{item.token2Name}} <br>{{$t('lang45')}} {{parseFloat(item.earnPerDay).toFixed(2)}} PDX({{$t('lang46')}})<br> {{$t('lang45')}} {{parseFloat(item.earnPerMonth).toFixed(2)}} PDX({{$t('lang47')}})<br> {{parseFloat(item.totalPrice).toFixed(2)}} USDT</p>
            <a class="btn active">APY {{parseFloat(item.apy).toFixed(2)}}%</a>
            <a class="btn select" @click="goDeposit(item)">{{$t('lang48')}}</a>
          </li>
        </ul>
        <ul class="lpPoolList clearfix" v-show="!isMult">
          <li v-for="(item,index) in singleLpPool" :key="index" @click="checkSingleThis(index)" :class="singleActive==index?'active':''">
            <div class="coinLogo">
              <img :src="requierImg(item.tokenName)">
              <!-- <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png"> -->
            </div>
            <p class="stakeInfo">{{item.tokenName}} <br>{{$t('lang45')}} {{parseFloat(item.earnPerDay).toFixed(2)}} PDX({{$t('lang46')}})<br> {{$t('lang45')}} {{parseFloat(item.earnPerMonth).toFixed(2)}} PDX({{$t('lang47')}})<br> {{item.totalPrice}} USDT</p>
            <a class="btn active">APY {{parseFloat(item.apy).toFixed(2)}}%</a>
            <a class="btn select" @click="goDeposit(item)">{{$t('lang48')}}</a>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {Factory,LpPair,Pool,Token1} from '../../utils/contract'
import BigNumber from 'bignumber.js'
import {getPoolInfo,getSingle} from '@/api/user'
export default {
  components:{
    Navbar,
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
      singleLpPool:[],
      usdtToken:null,
      basicToken:'PUSDT',
      totalLocked:0,
      sigleTotalLocked:0,
      blockNumber:0,
      period:0,
      pdxToken:null,
      pdxName:'PDX',
      pdxPrice:0,
      dayBlock:0,
      pairData:[],
      singleData:[],
      singleActive:'',
      active:''
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
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      if(this.tokenData.length>0){
        let usdtToken = this.tokenData.filter((res)=>{return res.name.toUpperCase() == this.basicToken})
        this.usdtToken = usdtToken[0]
        let pdxToken = this.tokenData.filter((res)=>{return res.name.toUpperCase() == this.pdxName})
        this.pdxToken = pdxToken[0]
        this.$initWeb3().then((web3)=>{
            this.web3 = web3
            web3.eth.getBlockNumber().then(res=>{
              this.blockNumber = res
              console.log('当前区块高度'+this.blockNumber)
            })
            this.FactoryContract = new web3.eth.Contract(Factory.abi, Factory.address)
            this.PoolContract = new web3.eth.Contract(Pool.abi, Pool.address)
            this.isConnect = true
            this.getPairData()
            this.getSingleData()
        })
      }
    },
    checkThis(i){
      this.active = i
    },
    checkSingleThis(i){
      this.singleActive = i
    },
    requierImg(name) {
      if (name) {
        try {
          return require('@/assets/img/logo/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/logo/PETH.png')
        }
      }
    },
    getPairData(){
      let that = this
      getPoolInfo().then(res=>{
        if(res.data.status==200){
          that.pairData = res.data.data
          that.getPairLength()
        }
      })
    },
    getSingleData(){
      let that = this
      getSingle().then(res=>{
        if(res.data.status==200){
          that.singleData = res.data.data
          that.getSingleLpData()
        }
      })
    },
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
        let period = await this.PoolContract.methods.phase(this.blockNumber).call()
        let periodBlock = this.pdxPerBlock/Math.pow(2,period)
        this.dayBlock = 24*60*60/3*periodBlock
        let basicPairAddress = await this.FactoryContract.methods.getPair(this.pdxToken.address,this.usdtToken.address).call()
        let PairContract = new this.web3.eth.Contract(LpPair.abi, basicPairAddress)
        let pdxPrice = await PairContract.methods.price(this.pdxToken.address,Math.pow(10,this.pdxToken.decimals)+'').call()
        this.pdxPrice = pdxPrice/Math.pow(10,6)
        this.getPairList()
    },
    async getPairList(){
        for(var i=0;i<this.pairData.length;i++){
            let item = this.pairData[i]
            let res = await this.PoolContract.methods.poolInfo(item.liquidPid).call()
            if(res)
            res.pid = item.liquidPid
            this.getPoolDetail(res,item)
        }
    },
    async getPoolDetail(item,pair){
        let token1Address = pair.coinInfos[0].token
        let token2Address = pair.coinInfos[1].token
        let token1Name = pair.coinInfos[0].symbol
        let token2Name = pair.coinInfos[1].symbol
        let token1Decimals = pair.coinInfos[0].wei
        let token2Decimals = pair.coinInfos[1].wei

        let PairContract = new this.web3.eth.Contract(LpPair.abi, item.lpToken)
        let totalSupply = await PairContract.methods.totalSupply().call()
        let basic = parseInt(item.totalAmount)/parseInt(totalSupply)
        let reserves = await PairContract.methods.getReserves().call()
        let token1Price = 0
        let token2Price = 0
        if(token1Name.toUpperCase()==this.basicToken){
           token1Price = 1
        }else{
          let basicPairAddress = await this.FactoryContract.methods.getPair(token1Address,this.usdtToken.address).call()
          let PairContract = new this.web3.eth.Contract(LpPair.abi, basicPairAddress)
          token1Price = await PairContract.methods.price(token1Address,Math.pow(10,token1Decimals)+'').call()
          token1Price = token1Price/Math.pow(10,6)
        }
        if(token2Name.toUpperCase()==this.basicToken){
           token2Price = 1
        }else{
          let basicPairAddress = await this.FactoryContract.methods.getPair(token2Address,this.usdtToken.address).call()
          let PairContract = new this.web3.eth.Contract(LpPair.abi, basicPairAddress)
          token2Price = await PairContract.methods.price(token2Address,Math.pow(10,token2Decimals)+'').call()
          token2Price = token2Price/Math.pow(10,6)
        }
        let totalPrice = basic*reserves[0]*token1Price/Math.pow(10,token1Decimals)+basic*reserves[1]*token2Price/Math.pow(10,token2Decimals)
        if(totalPrice){
          this.totalLocked += totalPrice
        }
        let apy = this.dayBlock*parseInt(item.allocPoint)/10*this.pdxPrice*365/totalPrice
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
          token2Name:token2Name,
          token1Balance:basic*reserves[0],
          token2Balance:basic*reserves[1],
          totalPrice:totalPrice,
          apy:apy
        })
    },
    async getSingleDetail(item,singleToken){
      let tokenName = singleToken.symbol0
      let tokenDecimals = singleToken.wei
      let tokenPrice = 0
      if(tokenName.toUpperCase()==this.basicToken){
          tokenPrice = 1
      }else{
        console.log(item.lpToken)
        let basicPairAddress = await this.FactoryContract.methods.getPair(item.lpToken,this.usdtToken.address).call()
        if(basicPairAddress){
          let PairContract = new this.web3.eth.Contract(LpPair.abi, basicPairAddress)
          tokenPrice = await PairContract.methods.price(item.lpToken,Math.pow(10,tokenDecimals)+'').call()
          tokenPrice = tokenPrice/Math.pow(10,6)
        }
      }
      let totalPrice = tokenPrice*item.totalAmount/Math.pow(10,tokenDecimals)
      if(totalPrice){
        this.sigleTotalLocked += totalPrice
      }

      let apy = this.dayBlock*parseInt(item.allocPoint)/10*this.pdxPrice*365/totalPrice
      this.singleLpPool.push({
        pid:item.pid,
        lpAddress:item.lpToken,
        earnPerDay:this.pdxPerBlock*item.allocPoint/this.totalAllocPoint*60/3*60*24,
        earnPerMonth:this.pdxPerBlock*item.allocPoint/this.totalAllocPoint*60/3*60*24*30,
        earnTotal:0,
        tokenName:tokenName,
        totalPrice:totalPrice,
        apy:apy
      })
    },
    async getSingleLpData(){
      console.log(this.singleData.length)
      for(var i=0;i<this.singleData.length;i++){
          let item = this.singleData[i]
          let res = await this.PoolContract.methods.poolInfo(item.pid).call()
          if(res)
          res.pid = item.pid
          this.getSingleDetail(res,item)
      }
    }
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
      &.active{
        border: 1px solid #009346;
      }
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
