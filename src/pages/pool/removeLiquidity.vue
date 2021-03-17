<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle"><i class="returnBack"></i>删除流动性</h2>
        <div class="deleteType clearfix">
          <span class="fl">Amount</span>
          <span class="fr">Detailed</span>
        </div>
        <span class="amount">0%</span>
        <el-slider
          :show-tooltip="false"
          :max="100"
          v-model="slidenum"
          @change="changeSlide"
        ></el-slider>
        <div class="scale clearfix">
          <span class="calibration">25%</span>
          <span class="calibration">50%</span>
          <span class="calibration">75%</span>
          <span class="calibration">Max</span>
        </div>
        <el-button class="btn" :disabled='false' @click="createNext">删除</el-button>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import {Factory,Token1,Router} from '../../utils/contract'
export default {
  components:{
    Navbar
  },
  data() {
    return {
      isConnect:false,
      web3:null,
      hasToken:true,
      slidenum:0,
      RouterContract:null
    }
  },
  mounted() {
      this.$initWeb3().then((web3)=>{
          this.web3 = web3
          this.isConnect = true
          this.RouterContract = new web3.eth.Contract(Router.abi, Router.address)
      })
  },
  methods: {
    changeSlide(){

    }
  }
}
</script>
<style  lang="less" scoped>
.exchangeBar{
    width: 345px;
    min-height:340px;
    background: #232221;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.4);
    border-radius: 18px;
    border: 1px solid #232221;
    box-sizing: border-box;
    padding:20px 18px;
    margin:40px auto;
    position:relative;
    .createTitle{
      font-size:16px;
      color:#C4C2BE;
      line-height:22px;
      text-align:center;
      padding-bottom:26px;
      .returnBack{
        float:left;
        width:22px;
        height:22px;
        background:url(../../assets/img/icon14.png) no-repeat center;
        background-size:100% 100%;
        cursor: pointer;
      }
    }
    .deleteType{
      padding-top:10px;
      padding-bottom:25px;
      span{
        font-size:14px;
        color:#C4C2BE;
        line-height:20px;
        cursor: pointer;
        &.fl{
          float:left;
        }
        &.fr{
          float:right;
          color:#30694B;
        }
      }
    }
    .amount{
      font-size:40px;
      color:#C4C2BE;
      line-height:40px;
      padding-bottom:26px;
    }
    .scale{
      margin-top:26px;
      .calibration{
        float:left;
        width:58px;
        height:40px;
        background:#30694B;
        border-radius:6px;
        font-size:14px;
        color:#C4C2BE;
        line-height:40px;
        text-align:center;
        margin-left:24px;
        &:first-child{
          margin-left:0;
        }
      }
    }
}
</style>
<style>
.el-slider{
  padding-top:40px;
}
.el-slider__button{
  width: 30px;
  height: 30px;
  background: #30694B;
  border:none;
  margin-top: -2px;
}
.el-slider__runway{
  height: 2px;
  background: linear-gradient(90deg, #38393B 0%, rgba(56, 57, 59, 0) 100%);
}
</style>
