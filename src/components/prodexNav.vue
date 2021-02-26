<template>
    <div class="navcontainer clearfix">
        <div class="navigation clearfix">
            <img class="logo" src="../assets/img/icon2.png">
            <span class="name">Prodex</span>
            <i class="morenav" @click="drawer=true"></i>
            <ul class="navlist clearfix">
                <li>Products</li>
                <li>Developers</li>
                <li>Governance</li>
                <li>Community</li>
                <li>About</li>
            </ul>  
        </div>
        <el-drawer :visible.sync="drawer" :show-close="false" custom-class="drawer_body" :with-header="false">
            <ul class="navlist">
                <li>Products</li>
                <li>Developers</li>
                <li>Documentation</li>
                <li>GitHub</li>
                <li>Whitepaper</li>
                <li>Audit</li>
                <li>Bug Bounty</li>
                <li>Governance</li>
                <li>Community</li>
            </ul>
            <i class="closeico" @click="drawer=false"></i>
        </el-drawer>
    </div>
</template>
<script>
export default {
  data(){
    return {
        nav:localStorage.getItem('nav') || 0,
        drawer:false
    };
  },
  created(){
      
  },
  methods:{
      
  }
}
</script>

<style lang='less' scoped>
.navcontainer{
    height:70px;
    border-bottom:1px solid #282827;
    padding:20px 15px;
    .navigation{
        .logo{
            width:19px;
        }
        
        .name{
            font-size:14px;
            color:#F8941F;
            line-height:20px;
            padding-left:10px;
        }
        .navlist{
            float:right;
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
        .navigation .navlist{display:none;}
        .morenav{
            float:right;
            width:22px;
            height:22px;
            background: url(../assets/img/icon17.png) no-repeat center;
            background-size:100% 100%;
        }
        .navlist{
            li{
                font-size:14px;
                color:#C4C2BE;
                line-height:100%;
                padding:15px;
            }
        }
        .closeico{
            position:absolute;
            top:15px;
            right:15px;
            width:26px;
            height:26px;
            background:url(../assets/img/icon7.png) no-repeat center;
            background-size:100% 100%;
        }
    }
}
</style>
<style >
.drawer_body {
  width: 100% !important;
  background: #232221;
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