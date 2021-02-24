<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <selectToken v-show="false"></selectToken>
        <div class="panelTop clearfix">
            <i class="return"></i>
            <div class="tips">
                <p class="tipText">
                    When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                </p>
            </div>
            <h2>Add Liquidity</h2>
        </div>
        <div class="changePanel">
            <h2>Input</h2>
            <input class='entrynum'>
            <div class="coinbar">
                <img src="" class="coinimg">
                <span class="coinname">ETH</span>
                <i class="dropico"></i>
            </div>
        </div>
        <i class="changeico"></i>
        <div class="changePanel">
            <h2>Input</h2>
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
    .panelTop{
        padding-bottom:18px;
        .return{
            float:left;
            width:22px;
            height:22px;
            background: url(../../assets/img/icon14.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
        }
        h2{
            font-size:16px;
            color:#C4C2BE;
            line-height:22px;
            text-align:center;
        }
        .tips{
            float:right;
            width:16px;
            height:16px;
            background: url(../../assets/img/icon13.png) no-repeat center;
            background-size:100% 100%;
            cursor: pointer;
            position:relative;
            &:hover,&:active{
              .tipText{display:block;} 
            }
            .tipText{
                display:none;
                position:absolute;
                right: 26px;
                top: -90px;
                width: 215px;
                height: 203px;
                background: #3D3B39;
                border: 1px solid #6A6A6A;
                box-sizing: border-box;
                padding:15px;
                font-size:14px;
                color:#C4C2BE;
                line-height:20px;
            }
        }
    }
    .firstTip{
        font-size:13px;
        color:#009346;
        line-height:18px;
        padding:17px 15px;
        background:#1F2823;
        border-radius:12px;
        margin:18px 0 15px;
    }
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
