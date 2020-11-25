<template>
  <div class="container">
    <div class="globle_title">Pool</div>
      <!-- <addfrombox/> -->
      <!-- <connectbox/> -->
      <!-- <selctoken/> -->
      <!-- <AddLiquidity /> -->
      <!-- <recevive/> -->
        <!-- <willRecevive/> -->
              <!-- <liquidity/> -->
    <!-- <vAlret/> --> 
      <router-view></router-view>
    <!-- <liquidity/> -->
    <!-- <Pool1/> -->
    <!-- <Pool2/> -->
    <!-- <createpair/> -->
     
  </div>

</template>

<script>
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
//import selctoken from './selctToken';
import createpair from './createpair';


export default {
  data () {
    return {
      
    }
  },
  components: {
    // addfrombox,
    // connectbox,
    // selctoken
    // AddLiquidity,
      // recevive,
      //  willRecevive,
    liquidity,
    // vAlret
    createpair
  },    

  created () {
    
  },
  methods: {
    
  }

}
</script>

<style lang="scss" >
@import '@/styles/pool.scss'
</style>