<template>
  <div >
    <div class="bimg"> </div>
    <div class="nav ">
      <div class="logo"><img src="../../assets/img/logo_FoxDex.png"
             alt="" />
             <!-- <span class="logop">FoxDex</span> -->
             </div>
             
      <div class="nav-header fl_lt" v-show="moble">
        <div class="van_list"
             ref="header">
          <span v-for="(idx, index) in tag"
                :key="idx.path"
                @click="handelActive(idx.path, index)"
                :class="navIndex == index ?'active':''">{{ idx.name }}</span>
        </div>
        <div class="active-bar"
             :style="{ transform: `translateX(${key}px)` }"></div>
      </div>
      <div class="nav-right fl_rg">
        <div class="nav-butt">
          <el-button class="from_botton nav_btn " v-if="!connectFlag" @click="btnClick">Connect to a wallet</el-button>
          <div class="login_wallet" v-if="connectFlag&&moble">
              <img class="wallet_img" src="@/assets/img/icon_wallet_green.svg" alt="">
              <span class="wallet_addrs">{{walletAddres.address|address}}</span>
               <span class="conversion" v-show="moble">{{walletAddres.balance}}TRX</span>
          </div>
        </div>
        <div class="nav_merge" v-show="!moble">
              <img  class="merge_img" src="@/assets/img/icon_nav.svg" @click="drawer = true" alt="">
        </div>
        <el-drawer
          title="我是标题"
          :visible.sync="drawer"
           :show-close ="false"
           custom-class="drawer_body"
          :with-header="false">
            <div class="drawer_logo">
               <div class="lt_logo"> <img src="../../assets/img/logo_FoxDex.png"
             alt="" /></div>
               <div class="rg_colse"> <img src="../../assets/img/icon_colse_nor.svg" alt="" @click="drawer = false"> </div>
            </div>
            <div class="drawer_btn">
                <div class="nav-butt">
                  <el-button class="from_botton nav_btn " v-if="!connectFlag" @click="btnClick">Connect to a wallet</el-button>
                  <div class="login_wallet drawer_wallet" v-if="connectFlag">
                      <img class="wallet_img" src="@/assets/img/icon_wallet_green.svg" alt="">
                      <span class="wallet_addrs">{{walletAddres.address|address}}</span>
                      <span class="conversion" v-show="moble">{{walletAddres.balance}}TRX</span>
                  </div>
                </div>
            </div>
            <ul class="drawer_nav">
                <li  v-for="(idx, index) in tag"
                :key="idx.path+'drawer'+index"
                @click="handelActive(idx.path, index)"
                :class="navIndex == index ?'drawer_nav_active':''">{{idx.name }}</li>
            </ul>
            <ul class="drawer_nav_aubt">
                <li> <img src="@/assets/img/icon_feckbook.svg" alt=""></li>
                <li> <img src="@/assets/img/icon_tetile.svg" alt=""></li>
                <li> <img src="@/assets/img/icon_telegram.svg" alt=""></li>
                <li> <img src="@/assets/img/icon_discord.svg" alt=""></li>
                <li> <img src="@/assets/img/icon_medium.svg" alt=""></li>
                <li> <img src="@/assets/img/icon_reddit.svg" alt=""></li>
            </ul>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import {IsPc} from '../../utils/index';
export default {
  data () {
    return {
      key: "31",
      navIndex: 0,
      drawer:false,
      childrenNode: [
            102,
            133,
            87,
            113,
            103,
            97
      ],
      moble:true,
      tag: [
        {
          path: '/',
          name: 'Home'
        },
        {
          path: "/exchange",
          name: "Exchange",
        },
        {
          path: "/pool",
          name: "Pool",
        },
        {
          path: "/foxdex",
          name: "FoxDex",
        },
        {
          path: "/wtrx",
          name: "WTRX",
        },
        {
          path: "/stake",
          name: "Stake",
        },
      ],
    };
  },
  created() {
    this.moble = IsPc();
  },
  computed: {
    ...mapState(['walletAddres','connectFlag'])
  },

  mounted () {
    try {
      // setTimeout(()=>{
        // this.$refs.header.children.forEach((element) => {
        //     let str = element.getBoundingClientRect();
        //     // console.log(str);
        //   this.childrenNode.push(element.offsetWidth);
        // });
        let hash = location.hash;
        let str = hash.split("#")[1];
        if (str) {
          this.handelActive(str);
        } else {
          this.handelActive("/");
        }
      // },1000)
 
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
     btnClick () {
      this.$popup({
        // showAlert:true,
        click: () => {
          // 点击按钮事件 
          this.$router.push('../../popup/popup')

        }
      })
    },


    handelActive (e, index) {
        this.drawer = false;

      if (e == '/') {
        this.navIndex = 0;
      } else {
        for (let i = 0; i < this.tag.length; i++) {
          let el = this.tag[i].path + '';
          if (e.match(el) && el != '/') {
            this.navIndex = i;
            break;
          }

        }
      }
      console.log(e)
      this.key = this.setActive(this.navIndex);
      this.$router.push(e);

    },
    handleCommand (res) {
      this.$router.push(res);
          console.log(res);
    },
    setActive (n) {
      let num = 0;
      for (let index = 0; index <= n; index++) {
        num = (this.childrenNode[index] + num) * 1;
      }
      let num1 = parseInt((num - 20) - this.childrenNode[n] / 2);
      return num1;
    },
  },
  filters:{
    address (n) {
      if (!n) return '';
      let pop  = n.slice(0, 6);
      let len  =  n.substring(n.length-4);
      let str = pop+'....' + len ;
          return str;
    }
  }
};
</script>
<style >
.nav .drawer_body{
      width: 69% !important;
      background: #070A0E;
      border-radius: 16px 0px 0px 16px;
      color: #FFFFFF;
      /* position: relative; */
        outline: 0;
        }
</style>
<style lang="scss" scoped>
// .logop{
//   float: left;
//   // margin-top: 8px;
//   height: 38px;
//   font-size: 32px;
//   font-family: roboto-mediumitalice;;
//   color: #05C98E;
//   line-height: 38px;
//   // margin-left: 116px;
//   margin-right: 22px;
// }
.drawer_logo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.2rem;
    .lt_logo{
      padding-left: 0.3rem;
      img{
        width: 3.5rem;
        
      }
    }
    .rg_colse{
      padding-right: 0.4rem;
      img{
        width: 0.9rem;
      }
    }
   
}
.drawer_nav_aubt{
  position: absolute;
  left: 0;
  bottom: 0.7rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  li{
  
    img{
       width: 0.9rem;
    }
  }
}
 .drawer_nav{
      font-size: 0.5rem;
      margin-top: 0.5rem;
      li{
        line-height: 1.3rem;
        padding-left: 0.8rem;
      }
    }
    .drawer_nav_active{
        background-color:#05c98e26;
        color: #05C98E;
        font-family: roboto-mediumitalic;
    }
   
 .drawer_btn{
      padding: 0.4rem;
      .drawer_wallet{
        display: flex;
        justify-content: center;
      }
    }
.iconsv{
  margin-left: 50px;
}
.icons {
  font-size: 34px;
  color: #05C98E;
  vertical-align: sub;
}
.bimg{
  position: absolute;
  width: 100%;
  height: 380px;
  background-image: url(../../assets/img/BG1.png);
  background-repeat: no-repeat;
  background-size: 100% 380px;
  z-index: -1;
  border-radius: 0 0 16px 16px;
}
.nav {
  position: relative;
    overflow: hidden;
  /* width: 1920px; */  
  line-height: 72px;
  height: 72px;
}
.drawer_body{
  width: 50%;
}
.nav-butt {
  // width: 119px;
}
.nav_merge {
  margin-left: 24px;
  img {
    vertical-align: middle;
    margin-top: -3px;
    cursor: pointer;
  }
  .merge_img{
    width: 0.8rem;
    height: auto;
  }
}
.nav-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
}
.nav-inp {
  width: 100px;
  height: 40px;
  background: #ffffff;
}
.nav-ion1 {
  width: 50px;
  height: 40px;
  // background: pink;
}
.nav-ion2 {
  width: 50px;
  height: 40px;
  background: green;
}

.logo {
  float: left;
    display: flex;
    align-items: center;
    
    margin-top: 2px;
    margin-left: 38px;
  // .logop{
  //   font-family: 'roboto-mediumitalice';
  //   margin-left: 10px;
    
  // }
}
.logo img {
  width: 100%;
  width:180px ;
    height: 64px;
}
.nav-header {
   
  color: #A6AEB7;
  position: relative;
  // margin-left: 22px;

}
.active {
  font-family: roboto-mediumitalic;
  color: #05C98E;

}
.active-bar {
  position: absolute;
  left: 0px;
  bottom: 15px;
  width: 40px;
  height: 3px;
  background: #05C98E;
  border-radius: 3px;
  transition: transform 0.6s;
}
.nav-header span {
  font-size: 20px;
  padding: 0 24px;
  cursor: pointer;
  /* color: #B7BFC8; */
  /* text-align: center; */
}
.on {
  color: #ffffff;
}
.login_wallet{
  margin-top: 18px;
  height: 40px;
  line-height: 40px;
  border-radius: 28px;
  background: #19242E;
  color:#05C98E;
  padding: 0 32px;
  display: flex;
  align-items: center;
      cursor: pointer;
    img{
      margin-right: 2px;
    }
  .wallet_icon{
    font-size: 24px;
    vertical-align: sub;
   
  }
  .wallet_addrs{
      font-size: 18px;
      font-family: roboto-mediumitalic;
       margin-left: 4px;
       margin-right: 16px;
  }
  span{
      vertical-align: sub;
  }
  .conversion{
      padding: 0 16px;
      height: 24px;
      line-height: 24px;
      background:#05C98E;
      border-radius: 28px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: normal;
      color: #FFFFFF;
  }
}
.nav_btn{
  margin-top: 17px;
  margin-right: 8px;
}
@media screen and (max-width: 750px)  {
   .nav{
    padding-top: 0px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: inherit;
    padding-top: 0.4rem;

    // padding-bottom: 1.2rem;
    .logop{
      font-size: 0.5rem;
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
    }
    .logo{
      // transform: scale(0.9);
      margin-left: 0px;
      img{
        width: 3rem;
        height: auto;
        // transform: scale(0.9);
      }
    }
  }
  .nav-right{
    padding-right: 15px;
      .nav_merge{
        margin-left: 14px;
    }
    .login_wallet{
      padding: 0 20px;
      margin-top: 0px;
    }
      .wallet_addrs{
      margin: 0;
      font-size: 0.35rem;
  }
  .nav_btn{
    width: 100%;
    padding: 0 0.25rem;
    font-size: 0.4rem;
  }.nav_btn{
    margin-top: 0;
  }
 
  }
  .content_text{
    display: none;
  }
  .bimg{
    height: 4.58rem;
    background-size: 100%  4.58rem;
  }
    
}

</style>