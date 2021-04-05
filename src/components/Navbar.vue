<template>
    <div>
    <div class="navcontainer clearfix">
        <div class="navigation clearfix">
            <div class='logobar'>
                <img class="logo" src="../assets/img/icon2.png">
                Prodex
            </div>
            
            <ul class="navlist clearfix">
                <li :class="nav==0?'active':''" @click="toExchange">{{$t('lang8')}}</li>
                <li :class="nav==1?'active':''" @click="toPool">{{$t('lang9')}}</li>
                <li :class="nav==2?'active':''" @click="toDealMining">{{$t('lang10')}}</li>
                <li :class="nav==4?'active':''" @click="toProdex">Prodex</li>
                <li :class="nav==5?'active':''" @click="toCreate">{{$t('lang12')}}</li>
            </ul>
        </div>
        <div class="toolCon">
            <div class="connected" @click="checkWalter">
                {{!isConnect?'Connect to a Wallet':defaultAccount}}
            </div>
            <div class="prodexbtn" @click="breakFlag = !breakFlag;setFlag =false;moreFlag =false;walletFlag=false;">Prodex</div>
            <i class="setico" @click="setFlag = !setFlag;moreFlag =false;breakFlag=false;walletFlag=false;"></i>
            <i class="moreico" @click="moreFlag = !moreFlag;breakFlag=false;walletFlag=false;setFlag=false"></i>
        </div>

        <div class="nav_merge">
          <img class="merge_img" src="@/assets/img/icon17.png" @click="drawer = true" alt="">
        </div>
        
        <!---->
        <Settings v-show="setFlag"></Settings>
        <Mores v-show="moreFlag"></Mores>
        <Wallet v-show="walletFlag" @close='walletFlag=false'></Wallet>
        <Breakdown v-show="breakFlag" @close='breakFlag=false'></Breakdown>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :show-close="false" custom-class="drawer_body" :with-header="false" @click="tolerPop=false">
        <ul class="mobelNavlist">
            <li @click="toExchange">
                <img src="@/assets/img/icon29.png">
                <span>{{$t('lang8')}}</span>
            </li>
            <li @click="toPool">
                <img src="@/assets/img/icon30.png">
                <span>{{$t('lang9')}}</span>
            </li>
            <li @click="toDealMining">
                <img src="@/assets/img/icon31.png">
                <span>{{$t('lang10')}}</span>
            </li>
            <li @click="toCreate">
                <img src="@/assets/img/icon32.png">
                <span>{{$t('lang12')}}</span>
            </li>
            <li @click="toProdex">
                <img src="@/assets/img/icon33.png">
                <span>Prodex</span>
            </li>
        </ul>
    </el-drawer>
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
        drawer:false,
        isConnect:false,
        defaultAccount:''
    };
  },
  created(){
      this.$initWeb3().then((web3)=>{
        this.web3 = web3
        if(web3.eth.defaultAccount){
            this.isConnect = true
            this.defaultAccount = this.plusXing(web3.eth.defaultAccount,5,5)
        }
        
    })
  },
  methods:{
      checkWalter(){
          this.$initWeb3().then(web3=>{
              this.web3 = web3
              this.isConnect = true
              this.defaultAccount = this.plusXing(web3.eth.defaultAccount,5,5)
          })
      },
      plusXing (str,frontLen,endLen) { 
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
            xing ='*******';
        }
        return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
      },
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
      },
      toProdex(){
          localStorage.setItem('nav',4)
          this.$router.push('/prodex')
      },
      toCreate(){
          localStorage.setItem('nav',5)
          this.$router.push('/create')
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
        .logobar{
            display:inline-block;
            vertical-align:bottom;
            font-size:14px;
            color:#F8941F;
            line-height:20px;
            font-weight:600;
        }
        .logo{
            width:19px;
            vertical-align: bottom;
            margin-right:10px;
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
        position: fixed;
        top: 0;
        width: 100%;
        z-index:99;
        background:linear-gradient(180deg, #282824 0%, #1A1918 100%);
        .navigation .navlist{display:none;}
        .toolCon{
            position:fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px 15px;
            width: 100%;
            background:linear-gradient(184deg, #282824 0%, #1A1918 100%);
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
</style>
<style >
.drawer_body {
  width: 60% !important;
  background: #232221;
  outline: 0;
}
</style>