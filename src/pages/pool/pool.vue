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
            <router-link to="/" class="btn add">Add Liquidity</router-link>
            <router-link to="/" class="btn create">Create a pair</router-link>
        </div>
        <p class="connectTips">Connect to a wallet to view your liquidity.</p>
        <p class="notLiquidity">Don't see a pool you joined?<span>Import it.</span></p>
    </div>
  </div>
</template>
<script>
import Navbar from '../../components/Navbar'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
    
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
          width: 140px;
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
}
</style>
