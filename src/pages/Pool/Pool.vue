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
      })
    },
    async getBFactoryContract () {//链接BFactory合约
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory);
    },
    async createBPool () {//newBPool
      let that = this
      try {
        if (this.BFactoryContract) {
          let res = await that.BFactoryContract["newBPool"]().send();
          if (res) {
            that.getBPoolContract()
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getBPoolContract (bPollContract) {//链接BPool合约
      this.BPoolContract = await window.tronWeb.contract().at(bPollContract);
      if (this.BPoolContract) {
        this.bindCoin()
      }
    },
    async bindCoin () {//bind
      let that = this
      try {
        let res = await that.BPoolContract["newBPool"]().send();
        if (res) {
          that.getBFactoryContract()
        }
      } catch (error) {
        console.log(error);
      }
    },
  }

}
</script>

<style lang="scss" >
@import '@/styles/pool.scss'
</style>