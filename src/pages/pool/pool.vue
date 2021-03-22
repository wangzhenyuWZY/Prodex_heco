<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="poolContainer">
        <div class="poolRewards">
            <h2>Liquidity provider rewards</h2>
            <p>Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
            <a>Read more about providing liquidity</a>
        </div>
        <div class="addOrCreate">
            <router-link to="/addLiquidity" class="btn add">Add Liquidity</router-link>
        </div>
        <div class="liquidityList">
            <div class="liquidityItem" v-for="(item,index) in pairList" :key="index">
                <div class="liquidityHead clearfix" @click="showCon(index)">
                    <img :src="requierImg(item.token1.name)">
                    <img :src="requierImg(item.token2.name)">
                    <span>{{item.token1.name}}-{{item.token2.name}}</span>
                    <p>Manage</p>
                </div>
                <div class="liquidityCon" v-show="item.show">
                    <p class="clearfix"><span class="fl">您的总池令牌：</span><span class="fr">{{item.myLpTotal}}</span></p>
                    <p class="clearfix"><span class="fl">Pooled {{item.token1.name}}：</span><span class="fr">{{parseFloat(item.token1.poolBalance).toFixed(2)}}</span></p>
                    <p class="clearfix"><span class="fl">Pooled {{item.token2.name}}：</span><span class="fr">{{parseFloat(item.token2.poolBalance).toFixed(2)}}</span></p>
                    <p class="clearfix"><span class="fl">您的池子份额：</span><span class="fr">{{parseFloat(item.myShare*100).toFixed(2)}}%</span></p>
                    <div class="addOrRemove clearfix">
                        <a @click="toAddLiquidity(item)">Add</a>
                        <a @click="toRemoveLiquidity(item)">Remove</a>
                    </div>
                </div>
            </div>
        </div>
        <p class="connectTips" v-show="false">Connect to a wallet to view your liquidity.</p>
        <p class="notLiquidity" v-show="false">Don't see a pool you joined?<span>Import it.</span></p>
    </div>
  </div>
</template>
<script>
import Navbar from '../../components/Navbar'
import {Factory,Token1,Router,Pair,LpPair} from '../../utils/contract'
import BigNumber from 'bignumber.js'
import {getPoolInfo} from '@/api/user'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      web3:null,
      isConnect:false,
      pairLength:0,
      pairAddressList:[],
      pairList:[],
      FactoryContract:null,
      pairData:[]
    }
  },
  mounted() {
    this.getPairData()  
    this.$initWeb3().then((web3)=>{
        this.web3 = web3
        this.FactoryContract = new web3.eth.Contract(Factory.abi, Factory.address)
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
    toAddLiquidity(item){
        this.$router.push({
            path: '/addLiquidity',
            query: {
                poolDetail: JSON.stringify(item)
            }
        })
    },
    toRemoveLiquidity(item){
        this.$router.push({
            path: '/removeLiquidity',
            query: {
                poolDetail: JSON.stringify(item)
            }
        })
    },
    showCon(index){
        this.$set(this.pairList[index],'show',!this.pairList[index].show)
    },
    getPairData(){
      let that = this
      getPoolInfo().then(res=>{
        if(res.data.status==200){
          that.pairData = res.data.data
          that.getMyPool()
        }
      })
    },
    getPairLength(){
        let that = this
        this.FactoryContract.methods.allPairsLength().call().then(res=>{
            that.pairLength = res
            that.getPairList()
        })
    },
    async getPairList(){
        for(var i=0;i<this.pairLength;i++){
            let res = await this.FactoryContract.methods.allPairs(i).call()
            this.pairAddressList.push(res)
            if(i==(this.pairLength-1)){
                this.getMyPool()
            }
        }
    },
    async getMyPool(){
        let that = this
        this.pairData.forEach((item,index)=>{
            let PoolContract = new this.web3.eth.Contract(Pair.abi, item.contract)
            PoolContract.methods.balanceOf(this.web3.eth.defaultAccount).call().then(res=>{
                if(res!=='0'){
                    let obj = {
                        address:item.contract,
                        decimails:item.wei,
                        totalSupply:0,
                        myLpTotal:res,
                        myShare:0,
                        token1:{
                            address:item.coinInfos[0].token,
                            name:item.coinInfos[0].symbol,
                            decimails:item.coinInfos[0].wei
                        },
                        token2:{
                            address:item.coinInfos[1].token,
                            name:item.coinInfos[1].symbol,
                            decimails:item.coinInfos[1].wei
                        },
                        show:false
                    }
                    that.getPairDetail(obj)
                }
            })
        })
    },
    async getPairDetail(item){
        let that = this
        let PoolContract = new this.web3.eth.Contract(LpPair.abi, item.address)
        let totalSupply = await PoolContract.methods.totalSupply().call()
            item.totalSupply = totalSupply
            item.myShare = item.myLpTotal/totalSupply
        let reserves = await PoolContract.methods.getReserves().call()      
        let basic = item.myLpTotal/item.totalSupply    
        item.token1.poolBalance = basic*reserves[0]/Math.pow(10,item.token1.decimails)
        item.token2.poolBalance = basic*reserves[1]/Math.pow(10,item.token2.decimails)   
        this.pairList.push(item)    
    }
  }
}
</script>
<style  lang="less" scoped>
.poolContainer{
    text-align:center;
  .poolRewards{
      width: 600px;
        height: 140px;
        background: linear-gradient(270deg, #232221 0%, #373330 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        padding:15px;
        box-sizing: border-box;
        margin:100px auto 0;
        text-align:left;
        background-image: url(../../assets/img/icon12.png);
        background-repeat: no-repeat;
        background-position: right 20px top 13px;
        background-size:88px 114px;
      h2{
          font-size:16px;
          color:#fff;
          line-height:15px;
          padding-bottom:10px;
      }  
      p{
          font-size:13px;
          color:#C4C2BE;
          line-height:17px;
          padding-bottom:10px;
      }
      a{
          font-size:14px;
          color:#C4C2BE;
          line-height:18px;
          text-decoration: underline;
      }
  }
  .addOrCreate{
      padding-top:20px;
      padding-bottom:66px;
      width:300px;
      margin:0 auto;
      overflow:hidden;
      .btn{
          width: 240px;
          height: 32px;
          background: #30694B;
          border-radius: 16px;
          text-align:center;
          line-height:32px;
          color:#fff;
          font-size:14px;
          &.add{
              float:left;
          }
          &.create{
              float:right;
              background:none;
              border: 1px solid #333936;
              color:#536A5E;
          }
      }
  }
  .liquidityList{
      width:600px;
      margin:0 auto;
    .liquidityItem{
        text-align:left;
        background: #232221;
        box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
        border-radius: 18px;
        border: 1px solid #232221;
        box-sizing: border-box;
        padding:20px 15px;
        margin-bottom:20px;
        .liquidityHead{
            padding-bottom:15px;
            img{
                vertical-align: middle;
                width:20px;
                margin-right:10px;
            }
            img{
                vertical-align: middle;
                width:20px;
                margin-right:10px;
            }
            span{
                font-size:18px;
                color:#C4C2BE;
                line-height:20px;
                padding-left:10px;
            }
            p{
                float:right;
                font-size:12px;
                color:#30694B;
            }
        }
        .liquidityCon{
            p{
                padding-bottom:12px;
                span{
                    font-size:12px;
                    color:#837F76;
                    line-height:20px;
                    &.fr{
                        color:#C4C2BE;
                        float:right;
                    }
                }
            }
            .addOrRemove{
                a{
                    display:inline-block;
                    vertical-align:middle;
                    width:274px;
                    height:50px;                  
                    background: #30694B;
                    border-radius: 12px;
                    line-height:50px;
                    text-align:center;
                    color:#fff;
                    font-size:14px;
                    &:first-child{
                        margin-right:20px;
                    }
                }
            }
        }
    }
  }
  .connectTips{
      font-size:14px;
      color:#6A6A6A;
      line-height:20px;
  }
  .notLiquidity{
      font-size:14px;
      color:#C4C2BE;
      line-height:20px;
      padding-top:120px;
      span{
          color:#FFA006;
      }
  }
}
@media screen and (max-width: 750px) {
    .poolContainer{
       .poolRewards{
           margin-top:40px;
           width:345px;
           height:190px;
           background-size:124px 161px;
           h2{
               line-height:22px;
           }
           p{
               padding-bottom:20px;
           }
       } 
    }
    .poolContainer .liquidityList{width: 345px;}
    .poolContainer .liquidityList .liquidityItem .liquidityCon .addOrRemove a{width:145px;}
}
</style>
