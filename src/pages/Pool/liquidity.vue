<template>
   <div class="pool-box">
    <div class="pool_bg">

        <div class="pool-box1">
            <p>Liquidity provider rewards</p>
            <p>Liquidity providers earn a 0.3% fee on all trades proportional to their share of 
               <br>
               pool. Fees are added to the pool, accrue in real time and can be claimed 
               <br>
               withdrawing your liquidity.</p>
            <p>Read more about providing liquidity</p>
        </div>
        <div class="pool-btn">
            <p class=""></p>
        </div>
        <div class="pool-box2">
          <div class="pool_boxbg">
          <samp class="pool-p">Your liquidity</samp>
          <div class="pool-butt">
          <div class="pool-butt1">
          <vbutton  height='48' >Add Liquidity</vbutton>
          </div>
          <div class="pool-butt2">
          <vbutton  height='48' >Add Liquidity</vbutton>
          </div>
          </div>
          <samp class="pool-p1">Connect to a wallet to view your liquidity.</samp>
          <samp class="pool-p2"> Don't see a pool you joined?<samp class="pool-p3"> Import it.</samp></samp>
        </div>
        </div>
    </div>
</div>
   
</template>

<script>
import { vbutton } from '../../components/index'
  export default {
      components: {
        vbutton
      }
  }
</script>

<style lang="scss" scoped>

</style>