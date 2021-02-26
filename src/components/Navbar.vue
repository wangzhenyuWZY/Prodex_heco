<template>
    <div class="navcontainer clearfix">
        <div class="navigation clearfix">
            <img class="logo" src="../assets/img/icon2.png">
            <ul class="navlist clearfix">
                <li :class="nav==0?'active':''" @click="toExchange">兑换</li>
                <li :class="nav==1?'active':''" @click="toPool">资金池</li>
                <li :class="nav==2?'active':''" @click="toDealMining">交易挖矿</li>
                <li :class="nav==3?'active':''" @click="toLpMining">流动挖矿</li>
                <li :class="nav==4?'active':''">Prodex</li>
            </ul>
        </div>
        <div class="toolCon">
            <div class="connected">
                Connect to a Wallet
            </div>
            <div class="prodexbtn">Prodex</div>
            <i class="setico"></i>
            <i class="moreico"></i>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
        nav:localStorage.getItem('nav') || 0,
    };
  },
  created(){
      
  },
  methods:{
      toExchange(){
          localStorage.setItem('nav',0)
          this.$router.push('/')
      },
      toPool(){
          localStorage.setItem('nav',1)
          this.$router.push('/pool')
      },
      toDealMining(){
          localStorage.setItem('nav',2)
          this.$router.push('/tradeMining')
      },
      toLpMining(){
          localStorage.setItem('nav',3)
          this.$router.push('/lpMining')
      }
  }
}
</script>

<style lang='less' scoped>
.navcontainer{
    height:70px;
    border-bottom:1px solid #282827;
    padding:20px 15px;
    .navigation{
        float:left;
        .logo{
            width:19px;
        }
        .navlist{
            display:inline-block;
            vertical-align:middle;
            li{
                float:left;
                padding-left:20px;
                cursor: pointer;
                font-size:14px;
                color:#837F76;
                line-height:20px;
                &.active{
                    color:#F8941F;
                }
            }
        }
    }
    .toolCon{
        float:right;
        .connected{
            display:inline-block;
            vertical-align: middle;
            padding:0 12px;
            height: 36px;
            border-radius: 12px;
            border: 1px solid #333936;
            font-size:14px;
            color:#30694B;
            line-height:36px;
            margin-right:10px;
        }
        .prodexbtn{
            display:inline-block;
            vertical-align: middle;
            width: 69px;
            height: 36px;
            background: #30694B;
            border-radius: 12px;
            font-size:14px;
            color:#fff;
            line-height:36px;
            text-align:center;
            margin-right:20px;
        }
        i{
           display:inline-block;
           vertical-align: middle; 
           width:36px;
           height:36px;
           margin:0 5px;
           &.setico{
               background:url(../assets/img/icon4.png) no-repeat center;
               background-size:100% 100%;
           }
           &.moreico{
               background:url(../assets/img/icon3.png) no-repeat center;
               background-size:100% 100%;
           }
        }
    }
}
@media screen and (max-width: 750px) {
    .navcontainer{
        .navigation .navlist li{padding-left:15px;}
        .toolCon{
            position:fixed;
            bottom:0;
            left:15px;
            right:15px;
            padding:20px 0;
            .prodexbtn{
                margin-right:14px;
            }
        }
    }
}
</style>