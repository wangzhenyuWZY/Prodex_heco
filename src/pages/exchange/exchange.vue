<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="false"></selectToken>
        <div class="changePanel">
            <h2>From</h2>
            <input class='entrynum'>
            <div class="coinbar">
                <img src="" class="coinimg">
                <span class="coinname">ETH</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico"></i>
        <div class="changePanel">
            <h2>From</h2>
            <input class='entrynum'>
            <div class="coinbar">
                <img src="" class="coinimg">
                <span class="coinname">ETH</span>
                <i class="dropico"></i>
            </div>
        </div>
        <el-button class="btn" :disabled='false'>Connect Wallet</el-button>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import selectToken from '../../components/selectToken'
export default {
  components:{
    Navbar,
    selectToken
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
      over:null,
      Web3:null
    }
  },
  mounted() {
    let that = this  
    this.$initWeb3().then((web3)=>{
      that.Web3 = web3  
      that.getTransactionDetail()
    })
  },
  methods: {
    async getTransactionDetail(){
        var receipt = await this.Web3.eth.getTransactionReceipt('0x256f6fa652265689ad586ca2d1adbf7f72ad1df54e48184f42aa2f2c63ea1ef7');
        console.log(receipt);
    }
  }
}
</script>
<style  lang="less" scoped>
.exchangeBar{
    width: 345px;
    min-height:400px;
    background: #232221;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);
    border-radius: 18px;
    border: 1px solid #232221;
    box-sizing: border-box;
    padding:20px 18px;
    margin:40px auto;
    position:relative;
    .changePanel{
        width: 310px;
        height: 90px;
        box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
        border-radius: 12px;
        border: 1px solid #38393B;
        h2{
            font-size:12px;
            color:#C4C2BE;
            line-height:18px;
            padding-top:12px;
            padding-left:15px;
            padding-bottom:14px;
        }
        .entrynum{
            float:left;
            width:60%;
            border:none;
            outline: none;
            line-height:30px;
            font-size:20px;
            color:#fff;
            background:none;
            text-indent:20px;
            &::-webkit-input-placeholder{
                color:#6A6A6A;
            }
        }
        .coinbar{
            float:right;
            width:92px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #484744;
            text-align:center;
            font-size:0;
            margin-right:15px;
            .coinimg{
                display:inline-block;
                vertical-align:middle;
                width:16px;
            }
            .coinname{
                display:inline-block;
                vertical-align:middle;
                font-size:14px;
                color:#C4C2BE;
                line-height:30px;
                padding:0 4px;
            }
            .dropico{
                display:inline-block;
                vertical-align:middle;
                width:9px;
                height:6px;
                background:url(../../assets/img/icon5.png) no-repeat center;
                background-size:100% 100%;
            }
        }
    }
    .changeico{
        display:block;
        width:8px;
        height:13px;
        margin:25px auto;
        background: url(../../assets/img/icon1.png) no-repeat center;
        background-size:100% 100%;
    }
}
</style>
