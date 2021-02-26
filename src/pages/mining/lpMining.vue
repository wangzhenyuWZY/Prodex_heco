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
        <ul class="lpPoolList clearfix">
          <li>
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <!-- <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png"> -->
            </div>
            <p class="stakeInfo">MDX/USDT <br>Earn 254051 MDX(Per Day)<br> Earn 7621538 MDX(Per Month)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select">Select</a>
          </li>
          <li>
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png">
            </div>
            <p class="stakeInfo">MDX/USDT <br>Earn 254051 MDX(Per Day)<br> Earn 7621538 MDX(Per Month)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select">Select</a>
          </li>
          <li>
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png">
            </div>
            <p class="stakeInfo">MDX/USDT <br>Earn 254051 MDX(Per Day)<br> Earn 7621538 MDX(Per Month)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select">Select</a>
          </li>
          <li>
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png">
            </div>
            <p class="stakeInfo">MDX/USDT <br>Earn 254051 MDX(Per Day)<br> Earn 7621538 MDX(Per Month)<br> 0 USDT</p>
            <a class="btn active">APY Loading...</a>
            <a class="btn select">Select</a>
          </li>
          <li>
            <div class="coinLogo">
              <img src="../../assets/img/btc.png">
              <img class="or" src="../../assets/img/icon15.png">
              <img src="../../assets/img/eth.png">
            </div>
            <p class="stakeInfo">MDX/USDT <br>Earn 254051 MDX(Per Day)<br> Earn 7621538 MDX(Per Month)<br> 0 USDT</p>
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
  .lpPoolList{
    text-align:center;
    width:1000px;
    margin:20px auto;
    li{
      float:left;
      width: 300px;
      height: 250px;
      background: #232221;
      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border: 1px solid #232221;
      margin:0 7px;
      margin-bottom:15px;
      .coinLogo{
        text-align:center;
        padding:18px 0 10px;
        img{
          width:24px;
          vertical-align: middle;
          &.or{
            width:18px;
            margin:0 16px;
          }
        }
      }
      .stakeInfo{
        font-size:12px;
        color:#C4C2BE;
        line-height:20px;
        text-align: center;
      }
      .btn{
        display:inline-block;
        width: 270px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid #353330;
        margin-top:20px;
        text-align:center;
        line-height:32px;
        box-sizing: border-box;
        font-size:14px;
        color:#009346;
        cursor: pointer;
        &.active{
          background:#30694B;
          color:#fff;
          border:none;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .lpMiningContainer .lpPoolList{width:auto;padding:0 15px;}
  .lpMiningContainer .lpPoolList li{width:49%;height:290px;padding:0 15px;box-sizing:border-box;margin:0;margin-bottom:20px;}
  .lpMiningContainer .lpPoolList li:nth-child(2n){margin-left:2%;}
  .lpMiningContainer .lpPoolList li .btn{width:100%;}
}
</style>
