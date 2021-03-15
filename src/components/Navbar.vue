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
            <div class="connected" @click="walletFlag = !walletFlag">
                Connect to a Wallet
            </div>
            <div class="prodexbtn" @click="breakFlag = !breakFlag">Prodex</div>
            <i class="setico" @click="setFlag = !setFlag"></i>
            <i class="moreico" @click="moreFlag = !moreFlag"></i>
        </div>

        <div class="nav_merge">
          <img class="merge_img" src="@/assets/img/icon17.png" @click="drawer = true" alt="">
        </div>
        <el-drawer title="我是标题" :visible.sync="drawer" :show-close="false" custom-class="drawer_body" :with-header="false" @click="tolerPop=false">
          <ul class="mobelNavlist">
              <li>
                  <img src="@/assets/img/icon28.png">
                  <span>首页</span>
              </li>
              <li @click="toExchange">
                  <img src="@/assets/img/icon29.png">
                  <span>兑换</span>
              </li>
              <li @click="toPool">
                  <img src="@/assets/img/icon30.png">
                  <span>资金池</span>
              </li>
              <li @click="toLpMining">
                  <img src="@/assets/img/icon31.png">
                  <span>流动性挖矿</span>
              </li>
              <li>
                  <img src="@/assets/img/icon32.png">
                  <span>免费发行交易对</span>
              </li>
              <li>
                  <img src="@/assets/img/icon33.png">
                  <span>Prodex</span>
              </li>
          </ul>
        </el-drawer>
        <!---->
        <Settings v-show="setFlag"></Settings>
        <Mores v-show="moreFlag"></Mores>
        <Wallet v-show="walletFlag"></Wallet>
        <Breakdown v-show="breakFlag"></Breakdown>
    </div>
</template>
<script>
import Settings from '@/components/setting'
import Mores from '@/components/mores'
import Wallet from '@/components/wallet'
import Breakdown from '@/components/breakdown'
export default {
  components:{
    Settings,
    Mores,
    Wallet,
    Breakdown
  }, 
  data(){
    return {
        nav:localStorage.getItem('nav') || 0,
        setFlag:false,
        moreFlag:false,
        walletFlag:false,
        breakFlag:false,
        drawer:false
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
    .nav_merge{display:none;}
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
            cursor: pointer;
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
        .navigation .navlist{display:none;}
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
        .nav_merge{
            display:block;
            float:right;
            .merge_img{
                width:22px;
            }
        }
        .mobelNavlist{
            padding-top:20px;
            li{
                padding:20px;
                img{
                    width:22px;
                }
                span{
                    font-size:14px;
                    color:#C4C2BE;
                    line-height:22px;
                    padding-left:10px;
                }
            }
        }
    }
}
</style>
<style >
.drawer_body {
  width: 60% !important;
  background: #232221;
  outline: 0;
}
</style>