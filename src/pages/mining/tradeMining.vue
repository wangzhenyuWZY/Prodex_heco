<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="miningContainer">
      <div class="rewardData">
        <p class="reward">{{$t('lang63')}}<span>{{parseFloat(totalReward).toFixed(4)}} PDX</span></p>
        <p class="reward">{{$t('lang64')}}<span>{{parseFloat(totalPersonReward).toFixed(4)}} PDX</span></p>
        <el-button class="btn" :disabled='isTakering' :loading='isTakering' @click='doClaimReward'>{{$t('lang65')}}</el-button>
      </div>
      <ul class="poolList clearfix">
        <li v-for="(item,index) in pairList" :key="index" @click="checkThis(index)" :class="active==index?'active':''">
          <div class="timeico" v-show="false">12.83</div>
          <div class="coinLogo">
            <img :src="requierImg(item.token1Name)">
            <img class="or" src="../../assets/img/icon15.png">
            <img :src="requierImg(item.token2Name)">
          </div>
          <h2 class="poolCoin">{{item.token1Name}}-{{item.token2Name}}</h2>
          <div class="earninfo">
            <p class="earninfoItem">{{$t('lang66')}}：<span>964% / 351,921%</span></p>
            <p class="earninfoItem">{{$t('lang67')}}：<span>{{parseFloat(item.allocPdxAmount).toFixed(2)}} PDX</span></p>
            <p class="earninfoItem">{{$t('lang68')}}：<span>${{parseFloat(item.totalQuantity).toFixed(2)}}</span></p>
            <p class="earninfoItem">{{$t('lang69')}}：<span>${{parseFloat(item.quantity).toFixed(2)}}</span></p>
            <p class="earninfoItem">{{$t('lang70')}}：<span>${{parseFloat(item.personAmount).toFixed(2)}}({{item.personZhanbi}}%)</span></p>
            <p class="earninfoItem">{{$t('lang71')}}：<span>{{parseFloat(item.personReward).toFixed(2)}} PDX</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {Pool,Token1,SwapMing} from '../../utils/contract'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      SwapMingContract:null,
      poolLength:0,
      pairList:[],
      totalReward:0,
      totalPersonReward:0,
      isTakering:false,
      active:''
    }
  },
  mounted() {
    this.$initWeb3().then((web3)=>{
        this.web3 = web3
        console.log(SwapMing.address)
        this.SwapMingContract = new web3.eth.Contract(SwapMing.abi, SwapMing.address)
        this.getPairLength()
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
    checkThis(i){
      this.active = i
    },
    async getPairLength(){
        let that = this
        this.SwapMingContract.methods.poolLength().call().then(res=>{
            that.poolLength = res
            that.getPairList()
        })
    },
    async getPairList(){
        for(var i=0;i<this.poolLength;i++){
            let res = await this.SwapMingContract.methods.poolInfo(i).call()
            if(res){
              res.pid = i
              this.getPoolDetail(res)
            }
        }
    },
    async getPoolDetail(item){
      let res = await this.SwapMingContract.methods.getPoolInfo(item.pid).call()
      let userreward = await this.SwapMingContract.methods.getUserReward(item.pid).call()
      if(userreward){
        let Token1Contract = new this.web3.eth.Contract(Token1.abi,res[0])
        let Token2Contract = new this.web3.eth.Contract(Token1.abi,res[1])
        let token1Name = await Token1Contract.methods.symbol().call()
        let token2Name = await Token2Contract.methods.symbol().call()

        item.token1Name = token1Name
        item.token2Name = token2Name
        item.personAmount = userreward[1]/Math.pow(10,18)//usdt
        item.personZhanbi = parseFloat(userreward[1]/item.totalQuantity*100).toFixed(2)
        item.personReward = userreward[0]/Math.pow(10,18)
        item.totalQuantity = item.totalQuantity/Math.pow(10,18)//usdt
        item.quantity = item.quantity/Math.pow(10,18)//usdt
        item.allocPdxAmount = res[5]/Math.pow(10,18)
        this.totalReward += item.allocPdxAmount
        this.totalPersonReward += item.personReward
        console.log(userreward)
        this.pairList.push(item)
      }
    },
    async doClaimReward(){
      let res = await this.SwapMingContract.methods.takerWithdraw().send({from:this.web3.eth.defaultAccount})
      .on('receipt', function(receipt){
            that.isTakering = false
            that.$message.success(that.$t('lang72'))
            window.location.reload()
        })
        .on('confirmation', function(confirmationNumber, receipt){
            that.isTakering = false
        })
        .on('error', function(){
            that.$message.success(that.$t('lang73'))
            that.isTakering = false
        });
    }
  }
}
</script>
<style  lang="less" scoped>
.miningContainer{
  .rewardData{
    padding-top:50px;
    text-align:center;
    .reward{
      display:inline-block;
      vertical-align: middle;
      font-size:12px;
      color:#837F76;
      line-height:18px;
      padding:0 22px;
      span{
        color:#C4C2BE;
        padding-left:10px;
      }
    }
    .el-button.btn{
      width: 345px;
      height: 50px;
      background: linear-gradient(270deg, #232221 0%, #373330 100%);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      border-radius: 6px;
      color:#6A6A6A;
      display:block;
      margin:28px auto;
    }
  }
  .poolList{
    padding-top:46px;
    width:990px;
    margin:0 auto;
    li{
      position:relative;
      float:left;
      margin:0 7px 20px;
      width: 300px;
      height: 360px;
      background: #232221;
      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
      border-radius: 18px;
      border: 1px solid #232221;
      &.active{
        border: 1px solid #009346;
      }
      .timeico{
        position:absolute;
        top:0;
        left:15px;
        width:51px;
        height:50px;
        line-height:50px;
        text-align:center;
        z-index:9;
        font-size:14px;
        color:#C4C2BE;
        background: url(../../assets/img/icon16.png) no-repeat center;
        background-size:100% 100%;
      }
      .coinLogo{
        padding-top:38px;
        padding-bottom:28px;
        text-align:center;
        img{
          width:50px;
          vertical-align: middle;
          &.or{
            width:18px;
            vertical-align: middle;
            margin:0 16px;
          }
        }
      }
      .poolCoin{
        font-size:23px;
        color:#C4C2BE;
        line-height:20px;
        text-align:center;
      }
      .earninfo{
        padding:24px 15px 5px;
        .earninfoItem{
          padding-bottom:12px;
          font-size:12px;
          color:#837F76;
          overflow: hidden;
          span{
            float:right;
            text-align:right;
            font-size:12px;
            color:#C4C2BE;
            line-height:20px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .miningContainer .rewardData{padding:40px 15px 0;}
  .miningContainer .rewardData .reward{padding:0;width:50%;text-align:center;}
  .miningContainer .rewardData .reward span{display:block;text-align:center;padding-left:0;}
  .miningContainer .poolList{padding:26px 15px;width:auto;}
  .miningContainer .poolList li{padding:0;width:100%;margin:0;margin-bottom:15px;}
}
</style>
