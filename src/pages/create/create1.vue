<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle">token 信息</h2>
        <p class="selType" @click="hasToken = true"><i></i>我没有Token，帮我发行HECO Token</p>
        <div class="hasToken" v-show="hasToken">
          <input placeholder="Token 全称">
          <input placeholder="Token 简称">
          <input placeholder="Token 总量">
        </div>
        <p class="selType" @click="hasToken = false"><i></i>我已发行HECO Token,帮我创建交易对</p>
        <div class="hasToken" v-show="!hasToken">
          <input placeholder="Token 合约地址">
        </div>  
        <el-button class="btn" :disabled='false' @click="createNext">下一步  创建交易对</el-button>
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
    min-height:400px;
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
    }
    .selType{
      font-size:14px;
      color:#C4C2BE;
      line-height:14px;
      padding-bottom:20px;
      cursor: pointer;
      i{
        display:inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid #38393B;
        margin-right:10px;
      }
    }
    .hasToken{
      input{
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
        margin-bottom:20px;
        &::-webkit-input-placeholder{
          color:#837F76;
        }
      }
    }
}
</style>
