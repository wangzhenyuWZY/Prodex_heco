<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle"><i class="returnBack"></i>创建交易对</h2>
        <p class="createpair">即将创建以下交易对</p>
        <div class="pairlist">
          <div class="pairitem">
            <i></i>
            ABC & USDT
          </div>
          <div class="pairitem">
            <i></i>
            ABC & USDT
          </div>
        </div>
        <input placeholder="您的邮箱" class="emailput">
        <el-button class="btn" :disabled='false' @click="createNext">下一步  质押PDX</el-button>
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
      web3:null,
      hasToken:true
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
    .createpair{
      font-size:14px;
      color:#C4C2BE;
      line-height:14px;
      padding-bottom:24px;
    }
    .pairlist{
      .pairitem{
        padding-bottom:20px;
        font-size:14px;
        color:#C4C2BE;
        line-height:14px;
        cursor: pointer;
        i{
          display:inline-block;
          vertical-align: middle;
          width:18px;
          height:18px;
          margin-right:10px;
        }
      }
    }
    .emailput{
      width:100%;
      height: 60px;
      box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
      border-radius: 12px;
      border: 1px solid #38393B;
      text-indent: 10px;
      font-size:14px;
      color:#fff;
      line-height:60px;
      background:none;
      &::-webkit-input-placeholder{
        color:#837F76;
      }
    }
}
</style>
