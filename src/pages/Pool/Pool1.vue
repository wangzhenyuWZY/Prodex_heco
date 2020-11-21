<template>
   <div class="pool-box">
    <div class="pool_bg">

        <div class="pool-box1">
            <p>Liquidity provider rewards</p>
            <p>Liquidity providers earn a 0.3% fee on all trades proportional to their share of 
               <br>
               the pool. Fees are added to the pool, accrue in real time and can be claimed 
               <br>
               withdrawing your liquidity.</p>
    
            <p>Read more about providing liquidity</p>
        </div>
        <div class="pool-btn">
            <p class=""></p>
        </div>
        <div class="pool-box2">
          <div class="pool_boxbg">
          
          <div class="pool-butt">
          <samp class="pool-p">Your liquidity</samp>
          <div class="pool-butt1">
           <el-button class="from_botton">Add Liquidity</el-button >
          </div>
          <div class="pool-butt2">
            <el-button class="from_botton">Add Liquidity</el-button >
          </div>
          </div>
          <div class="pool-inp1">
            <input type="wtext"  v-model="wtrxNum" placeholder="Acoout analytics and accrued fees">
          </div>
          <div class="pool-inp2">
            <input type="wtext"  v-model="wtrxNum" placeholder="Acoout analytics and accrued fees">
          </div>
          <samp class="pool-p2"> Don't see a pool you joined?<samp class="pool-p3"> Import it.</samp></samp>
          
        
        </div>
        </div>
    </div>
</div>
   
</template>

<script>

  export default {
      
  }
</script>

<style lang="scss" scoped>
.pool-inp1{
  margin-top: 32px;
  input{

  width: 627px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid #0F1730;
  }
  
}
.pool-inp2{
  margin-top: 32px;
  input{

  width: 627px;
  height: 72px;
  border-radius: 16px;
  background: url(../../assets/img/binp.png) no-repeat;
  background-size: 627px 72px;
  }
}

</style>