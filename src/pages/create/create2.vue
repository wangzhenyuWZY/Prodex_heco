<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle"><i class="returnBack" @click="returnback"></i>{{$t('lang28')}}</h2>
        <p class="createpair">{{$t('lang29')}}</p>
        <div class="pairlist">
          <div class="pairitem">
            <i></i>
            {{tokenInfo.symbol}} & USDT
          </div>
          <div class="pairitem">
            <i></i>
            {{tokenInfo.symbol}} & PDX
          </div>
        </div>
        <input :placeholder="$t('lang30')" class="emailput" v-model="email">
        <el-button class="btn" :disabled='isPledging' :loading='isPledging' @click="createNext">{{$t('lang31')}}</el-button>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {createPledge,updateTxHash} from '../../api/user'
import {Pledge,Token1} from '../../utils/contract'
import BigNumber from 'bignumber.js'
const Web3Utils = require('web3')
export default {
  components:{
    Navbar
  },
  data() {
    return {
      isConnect:false,
      web3:null,
      tokenInfo:{},
      email:'',
      PledgeContract:null,
      pdxToken:null,
      pdxName:'PDX',
      isApproved:false,
      isPledging:false
    }
  },
  mounted() {
    let tokenData = this.$store.getters.tokenData
    let pdxToken = tokenData.filter((item)=>{return item.name.toUpperCase() == this.pdxName})
    this.pdxToken = pdxToken[0]
    if(this.$route.query.tokenInfo){
      let tokenInfo = this.$route.query.tokenInfo
      this.tokenInfo = JSON.parse(tokenInfo)
    }
    this.$initWeb3().then((web3)=>{
        this.web3 = web3
        this.isConnect = true
        this.PledgeContract = new web3.eth.Contract(Pledge.abi, Pledge.address)
        this.PdxContract = new web3.eth.Contract(Token1.abi, this.pdxToken.address)
        // this.getAllowance()
    })
  },
  methods: {
    async getAllowance(){
        let res = await this.PledgeContract.methods.allowance(this.web3.eth.defaultAccount,this.pdxToken.address).call()
        if(parseInt(res)){
          this.isApproved = true
        }
    },
    returnback(){
      this.$router.push('/create')
    },
    createNext(){
      if(this.email == ''){
        this.$message.error(this.$t('lang32'))
        return
      }
      this.isPledging = true
      this.createOrder()
    },
    async checkApprove(item){
      if(this.isApproved){
        this.toPledge(item)
      }else{
        const MAX = Web3Utils.utils.toTwosComplement(-1)
        let apr1 = await this.PdxContract.methods.approve(Pledge.address,MAX).send({from:this.web3.eth.defaultAccount})
        if(apr1){
          this.toPledge(item)
        }
      }
    },
    createOrder(){
      let that = this
      let data = {
        userId:this.email,
        tokenName:this.tokenInfo.tokenName,
        symbol:this.tokenInfo.symbol,
        decimals:18,
        totalSupply:this.tokenInfo.totalsupply,
        type:this.tokenInfo.hasToken?2:1,
        contractAddress:this.tokenInfo.contractAddress,
        tokenToAddress:this.tokenInfo.tokenToAddress,
        iconUrl:this.tokenInfo.imageUrl
      }
      createPledge(data).then((res)=>{
        if(res.data.status==200){
          let item = res.data.data
          that.checkApprove(item)
        }else{
          that.isPledging = false
          that.$message.error(res.data.innerException)
        }
      })
    },
    toPledge(item){
      let that = this
      let num = 10000/item.pdxPrice
      num = new BigNumber(num)
      num = num.times(Math.pow(10,this.pdxToken.decimals))
      console.log(num.toFixed())
      this.PledgeContract.methods.pledge(num.toFixed()).send({from:this.web3.eth.defaultAccount})
      .on('receipt', function(receipt){
          item.txHash = receipt.txHash
            that.postHash(item)
        })
        .on('confirmation', function(confirmationNumber, receipt){
            
        })
        .on('error', function(){
            that.$message.success(this.$t('lang33'))
            that.isPledging = false
        })
    },
    postHash(item){
      let that = this
      let data = {
        orderId:item.orderId,
        txHash:item.txHash
      }
      updateTxHash(data).then((res)=>{
        if(res.data.status==200){
          that.isPledging = false
          that.$router.push({
            path: '/createSuc',
            query: {
              email: that.email
            }
          })
          that.$router.push('/createSuc')
        }else{
          that.isPledging = false
          that.$message.error(res.data.message)
        }
      })
    }
  }
}
</script>
<style  lang="less" scoped>
.exchangeBar{
    width: 345px;
    min-height:340px;
    background: #232221;
    box-shadow:inset 3px 3px 3px 0px rgb(0 0 0 / 20%);
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
    .createpair{
      font-size:14px;
      color:#C4C2BE;
      line-height:14px;
      padding-bottom:24px;
    }
    .pairlist{
      .pairitem{
        padding-bottom:20px;
        font-size:14px;
        color:#C4C2BE;
        line-height:14px;
        cursor: pointer;
        i{
          display:inline-block;
          vertical-align: middle;
          width:18px;
          height:18px;
          margin-right:10px;
          background: url(../../assets/img/icon36.png) no-repeat center;
          background-size:100% 100%;
        }
      }
    }
    .emailput{
      width:100%;
      height: 60px;
      box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
      border-radius: 12px;
      border: 1px solid #38393B;
      text-indent: 10px;
      font-size:14px;
      color:#fff;
      line-height:60px;
      background:none;
      box-sizing: border-box;
      &::-webkit-input-placeholder{
        color:#837F76;
      }
    }
}
</style>
