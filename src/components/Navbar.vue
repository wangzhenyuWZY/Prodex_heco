<template>
    <div class="browserHead clearfix">
        <div class="logo">
            <img src="../assets/img/logo.png">
        </div>
        <ul class="navlist">
            <li :class="nav==0?'active':''" @click="toHome">首页</li>
            <li :class="nav==1?'active':''" @click="toBlock">区块</li>
            <li :class="nav==2?'active':''" @click="toTransfer">交易</li>
            <li :class="nav==3?'active':''" @click="toWhitepage">白皮书</li>
        </ul>
        <div class="rtNav">
            <div class="downlogad">下载</div>
            <div class="lang">
                <span>简体中文</span>
                <div class="downlang">
                    <p>简体中文</p>
                    <p>English</p>
                    <p>繁体中文</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
        nav:localStorage.getItem('nav') || 0
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
    .browserHead{display:none;}
}
</style>