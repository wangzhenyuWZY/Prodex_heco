<template>
    <div class="prodexContainer">
        <prodexNav></prodexNav>
        <h2 class="prodexInfo" style="padding-top:40px;">Introducing</h2>
        <h2 class="prodexInfo">Prodex</h2>
        <div class="prodexDate">
            <span>
                <img src="../../assets/img/icon2.png">
            </span>
            <p>September 16th, 2020</p>
        </div>
        <p class="prodextip">Having proven product-market fit for highly decentralized financial infrastructure with a platform that has thrived independently, Uniswap is now particularly well positioned for community-led growth, development, and self-sustainability. The introduction of Prodex (ERC-20) serves this purpose, enabling shared community ownership and a vibrant, diverse, and dedicated governance system, which will actively guide the protocol towards the future.</p>
    </div>
</template>
<script>
import prodexNav from '@/components/prodexNav'
export default {
  components:{
    prodexNav,
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
<style lang='less' scoped>
.prodexContainer{
    .prodexInfo{
        font-size:80px;
        color:#fff;
        text-align:center;
        padding-bottom:7px;
    }
    .prodexDate{
        text-align:center;
        padding-top:40px;
        span{
            display:block;
            width:20px;
            margin:0 auto;
            padding-bottom:8px;
            border-bottom:1px solid #6A6A6A;
            img{width:19px;}
        }
        p{
            font-size:16px;
            color:#837F76;
            line-height:22px;
            padding-top:10px;
        }
    }
    .prodextip{
        font-size:18px;
        color:#C4C2BE;
        line-height:24px;
        text-align:center;
        width:600px;
        margin:50px auto;
    }
} 
@media screen and (max-width: 750px) {
    .prodexContainer .prodexInfo{
        font-size:50px;
    }
    .navcontainer .navigation .navlist{
        display:none;
    }
    .prodexContainer .prodextip{
        font-size:13px;
        text-align:left;
        padding:0 15px;
        width:auto;
    }
}
</style>