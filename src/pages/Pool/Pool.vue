<template>
  <div class="container">
    <div class="globle_title" @click="createBPool">Pool</div>
      <!-- <addfrombox/> -->
      <!-- <connectbox/> -->
      <!-- <selctoken/> -->
      <!-- <AddLiquidity /> -->
      <!-- <recevive/> -->
        <!-- <willRecevive/> -->
              <!-- <liquidity/> -->
    <!-- <vAlret/> --> 
      <router-view></router-view>
    <!-- <AddLiquidity/> -->
    <!-- <liquidity/> -->
    <!-- <Pool1/> -->
    <!-- <Pool2/> -->

     
  </div>

</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
import success from '@/assets/img/icon_successfully.svg';
import err from '@/assets/img/icon_faile.svg';
import failure from '@/assets/img/icon_faile.svg';
import AddLiquidity from './AddLiquidity'
import liquidity from './liquidity'
import vAlret from './valret'
import selctoken from './selctToken';
import recevive from './recevive';
import willRecevive from './willRecevive';
import addfrombox from './addfrombox';
import connectbox from './Connectbox'
//import liquidity from './liquidity'

export default {
  data () {
    return {
      test: '12',
      ppd: {
        a: 1,
        b: 2,
        c: 3
      },
      types1: 'failure',
      test1: '0',
      showAlert: true,
      types2: {
        success,
        err,
        failure,
      }
    }
  },
  components: {
    // addfrombox
    // connectbox
    // selctoken
    // AddLiquidity,
      // recevive
      //  willRecevive
    // liquidity
    // Pool1
    // Pool2
    // vAlret
  },    

  created () {
    this.init()
    
  },
  methods: {
    init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.getBFactoryContract()
        that.checkBind()
      })
    },
    async getBFactoryContract(){//链接BFactory合约
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory);         
    },
    async createBPool () {//newBPool
      let that = this
        try {
          if(this.BFactoryContract){
            let res = await that.BFactoryContract["newBPool"]().send({
              feeLimit:100000000,
              callValue:0,
              tokenId:0,
              shouldPollResponse:true
            })
            if(res){
              that.getWtrxContract(res)
            }
          }
        }
        catch (error) {
          console.log(error);
        }
    },
    async getWtrxContract(res){
      this.wtrxContract = await window.tronWeb.contract().at('TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq');
      if(this.wtrxContract){
        this.approved(res)
      }
    },
    async approved(data){//授权
      let that = this
      try {
          let res = await that.wtrxContract["approve"](data,0xe8d4a51000).send({shouldPollResponse:true})
          if(res){
            alert('授权成功')
            that.getBPoolContract(data)
          }
      } catch (error) {
          console.log(error);
      }
    },
    async getBPoolContract(bPollContract){
      var functionSelector = 'bind(address,uint256,uint256)';
      var parameter = [
          {type: 'address', value: 'TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq'},
          {type: 'uint256', value: 100},
          {type: 'uint256', value: 10},
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(bPollContract,functionSelector, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              console.log(res)
              alert('success');
              // window.location.reload();
          });
      }) 
    },
    async checkBind(){
      var functionSelector = 'isBound(address)';
      var parameter = [{type: 'address', value: 'TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq'}]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TB7DMRPWsnd2yxvBeoeyz1sHLBghRA9EBn',functionSelector,{}, parameter,'TA6mdQTHYA6orGU2Wj97BXDThHjntCwXE4');
      console.log(transaction)

      //  const parameter1 = []
      // const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract("419e62be7f4f103c36507cb2a753418791b1cdc182", "name()", {},
      //   parameter1,"417946F66D0FC67924DA0AC9936183AB3B07C81126");
      //   console.log(transaction)
      //  window.tronWeb.trx.sendRawTransaction(transaction).then(function (res) {
      //         console.log(res)
      //                     alert('success');
      //                     // window.location.reload();
      //  });
    }
  }

}
</script>

<style lang="scss" >
@import '@/styles/pool.scss'
</style>