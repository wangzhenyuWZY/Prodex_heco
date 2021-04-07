<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="quoContent clearfix">
      <div class="leftNav">
        <p class='active'>Overview</p>
        <p>Tokens</p>
        <p>Pairs</p>
        <p>Accounts</p>
      </div>
      <div class="rightCon">
        <h2 class="quoTitle">Mdex Analytics</h2>
        <div class="searchTokenPut">
          <input placeholder="Search Mdex pairs and tokens…">
          <i class="searchIco"></i>
        </div>
        <h2 class="quoTitle size">HT Price:$17.18  Transations(24H):1,43,284 Pairs:4,343</h2>
        <div class="chartCon clearfix">
          <div class="chartBar fl"></div>
          <div class="chartBar fr"></div>
        </div>
        <h2 class="quoTitle">Top Tokens<router-link to="#" class="more">See All</router-link></h2>
        <div class="tableCon">

        </div>
        <h2 class="quoTitle"></h2>

        <h2 class="quoTitle"></h2>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
export default {
  components:{
    Navbar
  },
  data() {
    return {
      isConnect:false,
      web3:null
    }
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.isConnect = true
      })
  },
  methods: {
    
  }
}
</script>
<style  lang="less" scoped>
.container{
  height:calc(100vh);
  background: linear-gradient(180deg, #282824 0%, #1A1918 100%);
  .quoContent{
    height:calc(100vh - 72px);
    .leftNav{
      float:left;
      width:230px;
      height:100%;
      padding-top:80px;
      background: linear-gradient(180deg, #171716 0%, #090909 100%);
      p{
        font-size:14px;
        color:#68655E;
        line-height:16px;
        padding-bottom:12px;
        text-align:center;
        &.active{
          color:#fff;
        }
      }
    }
    .rightCon{
      overflow:hidden;
      padding:0 30px;
      .quoTitle{
        font-size:16px;
        color:#fff;
        line-height:22px;
        padding-top:30px;
        padding-bottom:20px;
        &.size{
          font-size:12px;
        }
        .more{
          float:right;
          font-size:12px;
          color:#30694B;
        }
      }
      .searchTokenPut{
        width:100%;
        height:50px;
        background: #121111;
        box-sizing: border-box;
        border-radius:12px;
        border:1px solid #333936;
        position:relative;
        input{
          background:none;
          width:100%;
          height:100%;
          line-height:48px;
          text-indent:10px;
          outline: none;
          font-size:14px;
          color:#fff;
          &::-webkit-input-placeholder{
            color:#30694B;
          }
        }
        .searchIco{
          position:absolute;
          top:12px;
          right:12px;
        }
      }
      .chartCon{
        .chartBar{
          height:250px;
          width:45%;
          background:#171615;
          border:1px solid #2D2C2B;
          border-radius:12px;
          &.fl{float:left;}
          &.fr{float:right;}
        }
      }
      .tableCon{
        padding:30px 20px;
        background:#171615;
        border:1px solid #2D2C2B;
        border-radius:1px;
      }
    }
  }
}
</style>
