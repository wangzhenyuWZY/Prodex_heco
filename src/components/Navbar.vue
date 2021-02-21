<template>
    <div class="browserHead clearfix">
        <div class="logo">
            <img src="../assets/img/logo.png">
        </div>
        <div class="navico" @click="drawer=true">
            <img src="../assets/img/icon_nav.svg">
        </div>
        <ul class="navlist">
            <li :class="nav==0?'active':''" @click="toHome">首页</li>
            <li :class="nav==1?'active':''" @click="toBlock">区块</li>
            <li :class="nav==2?'active':''" @click="toTransfer">交易</li>
            <li :class="nav==3?'active':''" @click="toWhitepage">白皮书</li>
        </ul>
        <div class="rtNav">
            <div class="downlogad" @click="toDownload">下载</div>
            <div class="lang">
                <span>简体中文</span>
                <div class="downlang">
                    <p>简体中文</p>
                    <p>English</p>
                    <p>繁体中文</p>
                </div>
            </div>
        </div>
        <!---->
        <el-drawer :visible.sync="drawer" :show-close="false" custom-class="drawer_body" :with-header="false">
            <ul class="navlist">
                <li :class="nav==0?'active':''" @click="toHome">首页</li>
                <li :class="nav==1?'active':''" @click="toBlock">区块</li>
                <li :class="nav==2?'active':''" @click="toTransfer">交易</li>
                <li :class="nav==3?'active':''" @click="toWhitepage">白皮书</li>
            </ul>
            <div class="rtNav clearfix">
                <div class="downlogad" @click="toDownload">下载</div>
                <div class="lang">
                    <span @click="langstatus=true">简体中文</span>
                    <div class="downlang" v-show="langstatus">
                        <p>简体中文</p>
                        <p>English</p>
                        <p>繁体中文</p>
                    </div>
                </div>
            </div>
        </el-drawer>    
    </div>
</template>
<script>
export default {
  data(){
    return {
        nav:localStorage.getItem('nav') || 0,
        drawer:false,
        langstatus:false
    };
  },
  created(){
  },
  methods:{
      toHome(){
          localStorage.setItem('nav',0)
          this.$router.push('/')
      },
      toBlock(){
          localStorage.setItem('nav',1)
          this.$router.push('/BlockHistory')
      },
      toTransfer(){
          localStorage.setItem('nav',2)
          this.$router.push('/TransferHistory')
      },
      toWhitepage(){
          localStorage.setItem('nav',3)
        //   this.$router.push('/')
      },
      toDownload(){
          this.$router.push('/Download')
      }
  }
}
</script>

<style lang='less' scoped>
.browserHead{
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
    height:60px;
    line-height:60px;
    .logo{
        float:left;
        line-height:60px;
        width:118px;
    }
    .navico{display:none;}
    .navlist{
        float:left;
        padding-left:30px;
        li{
            font-size:13px;
            color:#585858;
            line-height:60px;
            cursor: pointer;
            margin-right:20px;
            float:left;
            &.active{
                color:#FFA006;
            }
            a{
                color:#585858;
            }
        }
    }
    .rtNav{
        float:right;
        .downlogad{
            float:left;
            font-size:13px;
            color:#B7B7B7;
            line-height:60px;
            cursor: pointer;
            margin-right:20px;
        }
        .lang{
            float:left;
            position:relative;
            margin-top:15px;
            span{
                display:block;
                width:80px;
                height:28px;
                line-height:28px;
                text-align:center;
                font-size:13px;
                color:#B7B7B7;
                background:#242424;
                border-radius:4px;
            }
            &:hover{
                .downlang{
                    display:block;
                }
            }
            .downlang{
                display:none;
                position:absolute;
                left:0;
                top:28px;
                background:#323232;
                line-height:28px;
                color:#585858;
                font-size:13px;
                z-index:999;
                p{
                    text-align:center;
                    width:80px;
                    line-height:28px;
                    cursor: pointer;
                    &:hover{
                        color:#fff;
                    }
                }
                
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .browserHead{
        .navlist,.rtNav{
            display:none;
        }
        .drawer_body{
            .navlist,.rtNav{
                display:block;
            }
        }
        .navico{display:block;float:right;
            img{width:30px;}
        }
    }
}
</style>
<style >
.drawer_body {
  width: 69% !important;
  background: #1C1C1C;
  border-radius: 16px 0px 0px 16px;
  color: #ffffff;
  /* position: relative; */
  outline: 0;
}
.browserHead .drawer_body .navlist{padding-top:60px;float:initial;}
.browserHead .drawer_body .navlist li{
    font-size:13px;
    color:#fff;
    line-height:60px;
    cursor: pointer;
    margin-right:20px;
    float:initial;
}
.browserHead .drawer_body .navlist li.active{color:#FFA006;}
.browserHead .drawer_body .rtNav{width:100%;float:initial;position:absolute;bottom:20px;left:20px;}
.browserHead .drawer_body .rtNav .lang .downlang{
    display:block;
    top:-88px;
}
.browserHead .drawer_body .rtNav .lang .downlang p:active{color:#FFA006;}
</style>