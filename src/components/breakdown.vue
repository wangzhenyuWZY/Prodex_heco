<template>
    <div class="breakdownCon">
        <div class="breakTitle">
            <h2>Your Prodex Breakdown</h2>
            <i class="closeico" @click="close"></i>
        </div>
        <div class="breakcon">
            <p>Prodex price:<span>${{pdxPrice}}</span></p>
            <p>Prodex in circulation:<span>289,227,438</span></p>
            <p>Total Supply<span>{{pdxTotal}}</span></p>
        </div>
        <a class="view">View Prodex Analytics</a>
    </div>
</template>
<script>
import {Token1,Factory,LpPair} from '../utils/contract'
import BigNumber from 'bignumber.js'
export default {
  data(){
    return {
        PdxToken:null,
        pdxTotal:0,
        web3:null,
        UsdtToken:null,
        pdxPrice:0
    };
  },
  created(){
    let tokenData = this.$store.getters.tokenData
    let pdxToken = tokenData.filter((res)=>{return res.name.toUpperCase() == 'PDX'})
    this.PdxToken = pdxToken[0]
    let usdtToken = tokenData.filter((res)=>{return res.name.toUpperCase() == 'PUSDT'})
    this.UsdtToken = usdtToken[0]
    this.$initWeb3().then((web3)=>{
        this.web3 = web3
        this.FactoryContract = new this.web3.eth.Contract(Factory.abi, Factory.address)
        this.getPdxInfo()
    })
  },
  methods:{
      async getPdxInfo(){
        let TokenContract = new this.web3.eth.Contract(Token1.abi, this.PdxToken.address)
        let res = await TokenContract.methods.totalSupply().call()
        this.pdxTotal = res/Math.pow(10,this.PdxToken.decimals)
        let basicPairAddress = await this.FactoryContract.methods.getPair(this.PdxToken.address,this.UsdtToken.address).call()
        let PairContract = new this.web3.eth.Contract(LpPair.abi, basicPairAddress)
        let pdxPrice = await PairContract.methods.price(this.PdxToken.address,Math.pow(10,this.PdxToken.decimals)+'').call()
        this.pdxPrice = pdxPrice/Math.pow(10,6)
      },
      close(){
          this.$emit('close')
      }
  }
}
</script>
<style lang='less' scoped>
.breakdownCon{
    position:absolute;
    top:240px;
    left:50%;
    width:375px;
    margin-left:-185px;  
    padding-bottom:18px;
    background: #373330;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    z-index:99;
    background-image: url(../assets/img/icon12.png);
    background-position: right 27px top 20px;
    background-repeat: no-repeat;
    background-size:139px 181px;
    .breakTitle{
        border-bottom:1px solid #232221;
        h2{
            padding-left:15px;
            font-size:16px;
            color:#fff;
            line-height:52px;
        }
        .closeico{
            position:absolute;
            top:10px;
            right:13px;
            width:26px;
            height:26px;
            background: url(../assets/img/icon7.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
        }
    }
    .breakcon{
        padding:10px 15px 20px;
        p{
            font-size:14px;
            color:#fff;
            line-height:30px;
            span{
                float:right;
            }
        }
    }
    .view{
        font-size:13px;
        color:#009346;
        line-height:18px;
        cursor: pointer;
        padding-left:15px;
    }
}
@media screen and (max-width: 750px) {
    .breakdownCon{
        top:auto;
        bottom:0;
        left:0;
        margin-left:0;
    }
}
</style>