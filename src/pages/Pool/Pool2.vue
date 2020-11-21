<template>
   <div class="pool-box">
    <div class="pool_bg">

        <div class="pool-box1">
            <p>Liquidity provider rewards</p>
            <p>Liquidity providers earn a 0.3% fee on all trades proportional to their share of 
               the pool. Fees are added to the pool, accrue in real time and can be claimed 
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
            <input type="wtext"  v-model="wtrxNum" placeholder="Acoout analytics and accrued fees" >
          </div>
          <div class="pool-inp2">
            <input type="wtext"  v-model="wtrxNum" placeholder="Acoout analytics and accrued fees">
            <div class="inp-box"> 
                <div class="inp-li">
                <div class="inp-a"> <samp class="inp-a1">Your tatal pool token:</samp> <samp class="inp-a2"> 4.9345465</samp></div>
                <div class="inp-a"> <samp class="inp-a1">Pooled ETH:</samp> <samp class="inp-a2"> 4.9345465</samp></div>
                <div class="inp-a"> <samp class="inp-a1">Pooled USDT:</samp> <samp class="inp-a2"> 4.9345465</samp></div>
                <div class="inp-a"> <samp class="inp-a1">Your pool share:</samp> <samp class="inp-a2"> 4.9345465</samp></div>
                </div>
                
                <div class="">
                    <samp>View accrued fees and analycis</samp>
                </div>
                <div class=""> </div>
            
            </div>
          </div>
          <samp class="pool-p2"> Don't see a pool you joined?<samp class="pool-p3"> Import it.</samp></samp>
         
          
        
        </div>
        </div>
    </div>
</div>
   
</template>

<script>
  export default {
      components: {
      }
  }
</script>

<style lang="scss" scoped>
.pool-box2{
   height: 800px;
}
.pool-inp1{
  margin-top: 32px;
  input{
  width: 627px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid #0F1730;
  font-size: 21px;
  color: #0F1730;
  
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
  .inp-box{
    width: 627px;
    height: 300px;
    background: #F4F5FA;
    border-radius: 16px;
  }
  .inp-li{
    width: 580px;
    margin: 12px auto;
    //   background: #000;
   display: flex;
   flex-direction:column;
   .inp-a{
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       margin-top: 20px;
   }

    
  }
}


</style>