<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="exchangeBar">
        <h2 class="createTitle">{{$t('lang34')}}</h2>
        <i class="sucicon"></i>
        <p class="suctips">{{$t('lang35')}} ：</br>{{email}}，{{$t('lang36')}}</p>
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
      hasToken:true,
      email:this.$route.query.email
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
    box-shadow:inset 3px 3px 3px 0px rgba(0, 0, 0, 0.4);
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
    .sucicon{
      display:block;
      width:60px;
      height:60px;
      margin:36px auto 40px;
      background:url(../../assets/img/icon34.png) no-repeat center;
      background-size:100% 100%;
    }
    .suctips{
      font-size:12px;
      color:#C4C2BE;
      line-height:22px;
    }
}
</style>
