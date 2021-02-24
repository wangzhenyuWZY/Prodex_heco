<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="lpMiningContainer">
        <p class="earntip">Earn MDX tokens by staking HSwap LP<br> && Tokens</p>
        <el-button class="btn">Total Value Locked 0.00 USDT</el-button>
        <div class="staketab">
          <span class="active">Mdex LP</span>
          <span>Single Token</span>
        </div>
        <ul class="lpPoolList">
          <li>
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png">
            </div>
            <p>MDX/USDT <br>Earn 254051 MDX(Per Day)<br> Earn 7621538 MDX(Per Month)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select">Select</a>
          </li>
        </ul>
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
      homeInfo:{},
      chartData:[],
      pageNum:0,
      pageNum1:0,
      blockList:[],
      transList:[],
      over:null
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>
<style  lang="less" scoped>
.lpMiningContainer{
  .earntip{
    font-size:16px;
    color:#C4C2BE;
    line-height:18px;
    padding-top:40px;
    padding-bottom:10px;
    text-align:center;
  }
  .el-button.btn{
    width: 345px;
    height: 70px;
    background: #232221;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    border: 1px solid #232221;
    font-size:14px;
    color:#fff;
    display:block;
    margin:0 auto 20px;
  }
  .staketab{
    text-align:center;
    span{
      cursor: pointer;
      display:inline-block;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #333936;
      margin:0 5px;
      font-size:12px;
      color:#536A5E;
      line-height:30px;
      text-align:center;
      box-sizing: border-box;
      &.active{
        border:none;
        background:#30694B;
        color:#fff;
      }
    }
  }
}
</style>
