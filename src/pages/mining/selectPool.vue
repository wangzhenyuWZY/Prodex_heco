<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="poolContainer">
        <h2 class="poolTitle">Prodex Pool</h2>
        <p class="notice">Notice: We just support Heco now, don't<br>
transfer ETHEREUM mainnet tokens</p>
        <div class="stakebox">
          <div class="stakeinfo">
            <p class="staketitle">Your Balance</p>
            <div class="balance">
              <img>
              Prodex
            </div>
            <el-button class="btn">Harvest All Token</el-button>
          </div>
          <div class="stakeinfo">
            <p class="staketitle">Staked</p>
            <div class="balance">
              Locked
            </div>
            <el-button class="btn">Connect Wallet</el-button>
          </div>
        </div>
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
  .poolTitle{
    padding-top:40px;
    font-size:16px;
    color:#C4C2BE;
    line-height:18px;
    text-align:center;
  }
  .notice{
    padding-top:14px;
    font-size:16px;
    color:#C4C2BE;
    line-height:18px;
    text-align:center;
  }
  .stakebox{
    padding-top:20px;
    text-align:center;
    .stakeinfo{
      display:inline-block;
      vertical-align: middle;
      width: 345px;
      height: 191px;
      background: #232221;
      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
      border-radius: 18px;
      border: 1px solid #232221;
      &:first-child{margin-right:15px;}
      .staketitle{
        font-size:12px;
        color:#837F76;
        line-height:20px;
        padding-top:18px;
        text-align:center;
        padding-bottom:10px;
      }
      .balance{
        text-align:center;
        font-size:23px;
        color:#C4C2BE;
        line-height:30px;
        padding-bottom:40px;
        img{
          width:30px;
          vertical-align: middle;
          margin-right:13px;
        }
      }
      .el-button.btn{
        width: 180px;
        height: 40px;
        background: #30694B;
        border-radius: 6px;
        color:#FFFFFF;
        font-size:14px;
        display:block;
        margin:0 auto;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .poolContainer .stakebox{padding:20px 15px;}
  .poolContainer .stakebox .stakeinfo{width:100%;margin-bottom:15px;}
  .poolContainer .stakebox .stakeinfo:first-child{margin-right:0;}
}
</style>
