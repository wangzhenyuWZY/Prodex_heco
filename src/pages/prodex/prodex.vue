<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="poolContainer">
        <div class="poolRewards">
            <h2>{{$t('lang100')}}</h2>
            <p>Deposit your Liquidity Provider tokens to receive PDX, the Prodex protocol governance token.</p>
            <a>Read more about Prodex</a>
        </div>
        <div class="partic clearfix">
            <span class="fl">Participating pools</span>
            <span class="fr">Rewards have ended!</span>
            <input placeholder="Rewards have ended!">
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
    text-align:center;
  .poolRewards{
      width: 600px;
        height: 140px;
        background: linear-gradient(270deg, #232221 0%, #373330 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        padding:15px;
        box-sizing: border-box;
        margin:100px auto 0;
        text-align:left;
        background-image: url(../../assets/img/icon12.png);
        background-repeat: no-repeat;
        background-position: right 20px top 13px;
        background-size:88px 114px;
      h2{
          font-size:16px;
          color:#fff;
          line-height:15px;
          padding-bottom:10px;
      }  
      p{
          font-size:13px;
          color:#C4C2BE;
          line-height:17px;
          padding-bottom:10px;
      }
      a{
          font-size:14px;
          color:#C4C2BE;
          line-height:18px;
          text-decoration: underline;
          cursor: pointer;
      }
  }
  .partic{
      padding-top:28px;
      width:600px;
      margin:0 auto;
      span.fl{
          float:left;
          font-size:16px;
          color:#C4C2BE;
          line-height:22px;
      }
      span.fr{
          float:right;
          font-size:16px;
          color:#837F76;
          line-height:20px;
      }
      input{
          width: 100%;
            height: 60px;
            box-shadow: 2px 2px 3px 0px rgba(19, 19, 19, 0.5);
            border-radius: 12px;
            border: 1px solid #38393B;
            font-size:14px;
            text-indent: 26px;
            margin-top:20px;
            background:none;
            color:#fff;
            &::-webkit-input-placeholder{color:#837F76;}
      }
  }
}
@media screen and (max-width: 750px) {
    .poolContainer{
       .poolRewards{
           margin-top:40px;
           width:345px;
           height:140px;
           background-size:124px 161px;
           h2{
               line-height:22px;
           }
           p{
               padding-bottom:20px;
           }
       } 
       .partic{
           padding:20px 15px;
           width:auto;
           text-align:left;
           span.fl{
               float:inherit;
               display:block;
           }
           span.fr{
               float:inherit;
               display:block;
           }
       }
    }
}
</style>
