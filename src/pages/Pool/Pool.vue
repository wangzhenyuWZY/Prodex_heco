<template>
  <div class="container">
    <div class="globle_title" @click="createBPool">Pool</div>
      <!-- <addfrombox/> -->
      <!-- <connectbox/> -->
      <!-- <selctoken/> -->
      <!-- <AddLiquidity /> -->
      <addd/>
      <!-- <recevive/>
        <willRecevive/> -->
              <!-- <liquidity/> -->
    <!-- <vAlret/> --> 
      <!-- <router-view></router-view> -->
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
import recevive from './recevive';
import willRecevive from './willRecevive';
import addfrombox from './addfrombox';
import connectbox from './Connectbox'
//import liquidity from './liquidity'
import {approved} from '../../utils/tronwebFn'
// import selctoken from './selctToken';
import addd from './createpair';


export default {
  data () {
    return {
      BFactoryContract:null,
      firstCoinContract:null,
      bPoolContract:null,
      isSelect:false
    }
  },
  components: {
    // addfrombox,
    // connectbox,
    // selctoken
    AddLiquidity,
    addd
      // recevive,
      //  willRecevive
    // liquidity
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
        // that.checkBind(that.bPoolContract)
        // that.unBindCoin();
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
              that.bPoolContract = res
              approved('TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C',res).then(()=>{
                that.bindCoin()
              })
            }
          }
        }
        catch (error) {
          console.log(error);
        }
    },
    async bindCoin(){//绑定币种
      let that = this
      var functionSelector = 'bind(address,uint256,uint256)';
      var parameter = [
          {type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C'},
          {type: 'uint256', value: '10000001'},
          {type: 'uint256', value: '1000000000000000001'},
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.bPoolContract,functionSelector,{}, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              alert('success');
          });
      }) 
    },
    async unBindCoin(){//解除绑定
      let that = this
      var functionSelector = 'unbind(address)';
      var parameter = [
          {type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C'}
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract('TR51WC82auiTArBttVTUCDgYSJ9bw7363t',functionSelector,{}, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              alert('success');
          });
      }) 
    },
    async checkBind(){//检查是否绑定
      var functionSelector = 'isBound(address)';
      var parameter = [{type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C'}]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TR51WC82auiTArBttVTUCDgYSJ9bw7363t',functionSelector,{}, parameter);
      console.log(window.tronWeb.toDecimal(transaction.constant_result[0]))
    }
  }

}
</script>

<style lang="scss" >
@import '@/styles/pool.scss'
</style>