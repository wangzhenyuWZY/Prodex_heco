<template>
  <div :class="dark?'dark':''">
    <div class="bimg"> </div>
    <div class="nav ">
      <div class="logo"> </div>
      <div class="nav-header fl_lt" v-show="moble">
        <div class="van_list" id="van_list" ref="header">
          <span
v-for="(idx, index) in tag"
:key="idx.path"
@click="handelActive(idx.path, index)"
                :class="navIndex == index ?'active':''">{{ idx.name }}</span>
        </div>
        <div class="active-bar" :style="{ transform: `translateX(${key}px)` }"></div>
      </div>
      <div class="nav-right fl_rg">
        <div class="nav-butt">
          <div class="login_wallet" v-if="!connectFlag&&moble" @click="btnClick">
            <img class="wallet_img" src="@/assets/img/icon_wallet_green.svg" alt="">
            <span class="wallet_addrs">{{$t('nav.CWet')}}</span>
          </div>
          <!-- <el-button class="from_botton nav_btn " v-if="!connectFlag" @click="btnClick">{{$t('nav.CWet')}}</el-button> -->
          <div class="login_wallet" v-if="connectFlag&&moble">
            <img class="wallet_img" src="@/assets/img/icon_wallet_green.svg" alt="">
            <span class="wallet_addrs">{{walletAddres.address|address}}</span>
          </div>
        </div>
        <div class="nav_merge" v-show="!moble">
          <img class="merge_img" src="@/assets/img/icon_nav.svg" @click="drawer = true" alt="">
        </div>
        <el-drawer title="我是标题" :visible.sync="drawer" :show-close="false" custom-class="drawer_body" :with-header="false" @click="tolerPop=false">
          <div class="drawer_logo">
            <div class="lt_logo"> <img :src="dark?require('../../assets/img/dark/logo.svg'):require('../../assets/img/dark/logo.svg')" alt="" />
            </div>
            <div class="rg_colse"> <img src="../../assets/img/icon_colse_nor.svg" alt="" @click.stop="drawer = false"> </div>
          </div>
          <div class="drawer_btn">
            <div class="nav-butt">
              <div class="login_wallet drawer_wallet" v-if="!connectFlag" @click.stop="btnClick">
                <img class="wallet_img" src="@/assets/img/icon_wallet_green.svg" alt="">
                <span class="wallet_addrs">{{$t('nav.CWet')}}</span>
              </div>
              <!-- <el-button class="from_botton nav_btn " v-if="!connectFlag" @click.stop="btnClick">
                {{$t('nav.CWet')}}
              </el-button> -->
              <div class="login_wallet drawer_wallet" v-if="connectFlag">
                <img class="wallet_img" src="@/assets/img/icon_wallet_green.svg" alt="">
                <span class="wallet_addrs">{{walletAddres.address|address}}</span>
                <span class="conversion" v-show="moble">{{walletAddres.balance}}TRX</span>
              </div>
            </div>
          </div>
          <ul class="drawer_nav">
            <li
v-for="(idx, index) in tag"
:key="idx.path+'drawer'+index"
@click.stop="handelActive(idx.path, index)"
                :class="navIndex == index ?'drawer_nav_active':''">{{idx.name }}</li>
          </ul>
          <div class="langAndSet">
            <div class="setbox" @click.stop="tolerPop=true"><i class="setico"></i>Setting</div>
            <div class="setbox fr" @click="hdel"><i class="langico"></i>{{this.$i18n.locale=='zh'?'简体中文':'English'}}</div>
          </div>
          <ul class="drawer_nav_aubt">
            <li @click="open2 "> <img src="@/assets/img/foxdex/icon_推特.svg" alt=""> </li>
            <li @click="open3"> <img src="@/assets/img/foxdex/icon_telegram.svg" alt=""> </li>
            <li @click="open4 "> <img src="@/assets/img/foxdex/icon_discord.svg" alt=""> </li>
            <li @click="open5 "> <img src="@/assets/img/foxdex/icon_medium.svg" alt=""> </li>
          </ul>
        </el-drawer>

        <div class="lang" @click="hdel">{{this.$i18n.locale=='zh'?'简体中文':'English'}}<i></i></div>
        <i class="setting" @click="tolerPop=!tolerPop"></i>
        <div class="setPanel" v-show="tolerPop">
          <h2> {{$t('Tnos')}}</h2>
          <p class="totletitle"> {{$t('Sete')}} <i></i></p>
          <div class="tolerTab">
            <span @click="changeToler(0.01);num=1" :class="num==1?'active':''">1%</span>
            <span @click="changeToler(0.05);num=2" :class="num==2?'active':''">5%</span>
            <span @click="changeToler(0.1);num=3" :class="num==3?'active':''">10%</span>
            <span @click="changeToler(0.3);num=4" :class="num==4?'active':''">30%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { IsPc } from '../../utils/index'
export default {
  data() {
    return {
      tolerPop: false,
      num: 0,
      key: '31',
      navIndex: 0,
      drawer: false,
      childrenNode: [
        85, 118, 71, 84, 87, 80],
      childrenNode1: [
        72,
        72,
        92,
        72,
        87,
        72
      ],
      moble: true,
      tag: [
        {
          path: '/',
          name: this.$t('nav.home1')
        },
        {
          path: '/exchange',
          name: this.$t('nav.Exchange')
        },
        {
          path: '/pool',
          name: this.$t('nav.Pool')
        },
        {
          path: '/foxdex',
          name: this.$t('nav.FoxDex')
        },
        {
          path: '/wtrx',
          name: this.$t('nav.WTRX')
        },
        {
          path: '/stake',
          name: this.$t('nav.Stake')
        }
      ]
    }
  },

  created() {
    this.moble = IsPc()
  },
  computed: {
    ...mapState(['walletAddres', 'connectFlag', 'dark'])

  },
  watch: {
    '$i18n.locale': {
      handler: function(val) {
        // this.doc = false
        // setTimeout(()=>{
        //   this.doc = true;
        //   this.$forceUpdate();
        //   console.log(this.$t('nav.home1'))
        // })
        var a = [
          {
            path: '/',
            name: this.$t('nav.home1')
          },
          {
            path: '/exchange',
            name: this.$t('nav.Exchange')
          },
          {
            path: '/pool',
            name: this.$t('nav.Pool')
          },
          {
            path: '/foxdex',
            name: this.$t('nav.FoxDex')
          },
          {
            path: '/wtrx',
            name: this.$t('nav.WTRX')
          },
          {
            path: '/stake',
            name: this.$t('nav.Stake')
          }
        ]
        console.log(a)
        this.tag = a
      }

    },
    drawer(val) {
      if (!val) {
        this.tolerPop = false
      }
    }
  },
  mounted() {
    try {
      const lang = this.$i18n.locale
      if (lang == 'zh') {
        this.childrenNode = this.childrenNode1
      }
      const hash = location.hash
      const str = hash.split('#')[1]
      if (str) {
        this.handelActive(str)
      } else {
        this.handelActive('/')
      }
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    open2() {
      window.open('https://twitter.com/AbeloFinance')
    },
    open3() {
      window.open('https://t.me/AbeloFinance')
    },
    open4() {
      window.open('https://discord.gg/tSD6cjXJqw')
    },
    open5() {
      window.open('https://medium.com/@AbeloFinance')
    },

    changeToler(num) {
      this.$store.commit('changeTolerance', num)
    },
    btnClick() {
      this.$popup({
        // showAlert:true,
        click: () => {
          // 点击按钮事件
          this.$router.push('../../popup/popup')
        }
      })
    },
    hdel(n) {
      const i18n = this.$i18n.locale
      this.$i18n.locale = i18n == 'en' ? 'zh' : 'en'
      localStorage.setItem('lang', this.$i18n.locale)
      this.childrenNode = []
      try {
        setTimeout(() => {
          this.$refs.header.children.forEach((element) => {
            // const str = element.getBoundingClientRect()
            // console.log(str);
            this.childrenNode.push(element.offsetWidth)
          })
          const hash = location.hash
          const str = hash.split('#')[1]
          if (str) {
            this.handelActive(str)
          } else {
            this.handelActive('/')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    handelActive(e, index) {
      this.drawer = false

      if (e == '/') {
        this.navIndex = 0
      } else {
        for (let i = 0; i < this.tag.length; i++) {
          const el = this.tag[i].path + ''
          if (e.match(el) && el != '/') {
            this.navIndex = i
            break
          }
        }
      }
      console.log(e)
      this.key = this.setActive(this.navIndex)
      this.$router.push(e)
    },
    handleCommand(res) {
      this.$router.push(res)
      console.log(res)
    },
    setActive(n) {
      let num = 0
      for (let index = 0; index <= n; index++) {
        num = (this.childrenNode[index] + num) * 1
      }
      const num1 = parseInt((num - 20) - this.childrenNode[n] / 2)
      return num1
    }
  },
  filters: {
    address(n) {
      if (!n) return ''
      const pop = n.slice(0, 6)
      const len = n.substring(n.length - 4)
      const str = pop + '....' + len
      return str
    }
  }

}
</script>
<style >
.nav .drawer_body {
  width: 69% !important;
  background: #070a0e;
  border-radius: 16px 0px 0px 16px;
  color: #ffffff;
  /* position: relative; */
  outline: 0;
}
</style>
<style lang="scss" scoped>
.setPanel {
  background: #fff;
  padding: 24px 20px;
  border-radius: 20px;
  box-sizing: border-box;
  width: 364px;
  position: fixed;
  right: 48px;
  top: 80px;
  z-index: 9999;
}
.setPanel h2 {
  font-size: 18px;
  color: #070a0e;
  line-height: 100%;
  padding-bottom: 18px;
}
.setPanel .totletitle {
  font-size: 16px;
  color: #878b97;
  line-height: 100%;
  padding-bottom: 11px;
}
.setPanel .totletitle i {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background: url(../../assets/img/icon_instructions.png) no-repeat center;
  background-size: 100% 100%;
  margin-left: 4px;
}
.setPanel .tolerTab {
  overflow: hidden;
}
.setPanel .tolerTab span {
  float: left;
  width: 72px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 32px;
  background: #f6f7fb;
  font-size: 16px;
  color: #878b97;
  margin-left: 12px;
  cursor: pointer;
}
.setPanel .tolerTab span:first-child {
  margin-left: 0;
}
.setPanel .tolerTab span.active {
  background: #fc6446;
  color: #ffffff;
}
.setting {
  width: 28px;
  height: 28px;
  background: url(../../assets/img/setIco.png) no-repeat center;
  background-size: 100% 100%;
  margin-left: 16px;
  margin-top: 18px;
  cursor: pointer;
}
.lang {
  color: #a6aeb7;
  line-height: 40px;
  font-size: 16px;
  margin-top: 18px;
  margin-left: 36px;
  cursor: pointer;
}
.lang i {
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  background: url(../../assets/img/langIco.png) no-repeat center;
  background-size: 100% 100%;
}
.drawer_logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.2rem;
  .lt_logo {
    padding-left: 0.3rem;
    img {
      width: 3.5rem;
    }
  }
  .rg_colse {
    padding-right: 0.4rem;
    img {
      // width: 0.9rem;
      width: 0.58rem;
    }
  }
}
.drawer_nav_aubt {
  position: absolute;
  left: 0;
  bottom: 0.7rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  li {
    img {
      width: 0.58667rem;
    }
  }
}
.drawer_nav {
  // font-size: 0.5rem;
  font-size: 0.426667rem;
  margin-top: 0.5rem;
  li {
    line-height: 1.3rem;
    padding-left: 0.8rem;
  }
}
.drawer_nav_active {
  color: #fc6446;
  font-family: roboto-mediumitalic;
}

.drawer_btn {
  padding: 0.4rem;
  .drawer_wallet {
    display: flex;
    justify-content: center;
  }
}
.iconsv {
  margin-left: 50px;
}
.icons {
  font-size: 34px;
  color: #fc6446;
  vertical-align: sub;
}
.bimg {
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
.drawer_body {
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
  .merge_img {
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
  background: #fc6446;
}

.logo {
  float: left;
  display: flex;
  align-items: center;
  width: 180px;
  height: 64px;
  margin-top: 6px;
  margin-left: 38px;
  background: url("../../assets/img/dark/logo.svg") no-repeat;
  background-size: 100% 100%;
  // .logop{
  //   font-family: 'roboto-mediumitalice';
  //   margin-left: 10px;

  // }
}
.nav-header {
  color: #a6aeb7;
  position: relative;
  // margin-left: 22px;
}
.active {
  font-family: roboto-mediumitalic;
  color: #fc6446;
}
.active-bar {
  position: absolute;
  left: 0px;
  bottom: 15px;
  width: 40px;
  height: 3px;
  background: #fc6446;
  border-radius: 3px;
  transition: transform 0.6s;
}
.nav-header span {
  font-size: 20px;
  padding: 0 16px;
  cursor: pointer;
  /* color: #B7BFC8; */
  /* text-align: center; */
}
.on {
  color: #ffffff;
}
.login_wallet {
  margin-top: 18px;
  height: 40px;
  line-height: 40px;
  border-radius: 28px;
  background: #19242e;
  color: #fc6446;
  padding: 0 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    margin-right: 2px;
  }
  .wallet_icon {
    font-size: 24px;
    vertical-align: sub;
  }
  .wallet_addrs {
    font-size: 18px;
    font-family: roboto-mediumitalic;
    margin-left: 4px;
  }
  span {
    vertical-align: sub;
  }
  .conversion {
    padding: 0 16px;
    height: 24px;
    line-height: 24px;
    background: #fc6446;
    border-radius: 28px;
    font-size: 18px;
    font-family: roboto-mediumitalic;
    font-weight: normal;
    color: #ffffff;
  }
}
.nav_btn {
  margin-top: 17px;
  margin-right: 8px;
}
@media screen and (max-width: 750px) {
  .nav {
    padding-top: 0px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: inherit;

    // padding-bottom: 1.2rem;
    .logop {
      font-size: 0.5rem;
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
    }
    .logo {
      // transform: scale(0.9);
      margin-left: 0px;
      img {
        width: 3rem;
        height: auto;
        // transform: scale(0.9);
      }
    }
  }
  .nav-right {
    padding-right: 15px;
    .nav_merge {
      margin-left: 14px;
    }
    .login_wallet {
      padding: 0 20px;
      margin-top: 0px;
    }
    .wallet_addrs {
      margin: 0;
      font-size: 0.35rem;
    }
    .nav_btn {
      width: 100%;
      padding: 0 0.25rem;
      font-size: 0.4rem;
    }
    .nav_btn {
      margin-top: 0;
    }
  }
  .content_text {
    display: none;
  }
  .bimg {
    height: 4.58rem;
    background-size: 100% 4.58rem;
  }
  .setPanel {
    width: auto;
    left: 15px;
    right: 15px;
    top: 30%;
    padding: 24px 15px;
  }
  .setPanel .tolerTab span {
    margin-left: 6px;
  }
  .lang {
    display: none;
  }
  .setting {
    display: none;
  }
  .langAndSet {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    text-align: center;
  }
  .langAndSet .setbox {
    float: left;
    font-size: 0.37rem;
    line-height: 44px;
    padding-left: 24px;
  }
  .langAndSet .setbox.fr {
    float: right;
    padding-right: 24px;
  }
  .langAndSet .setbox .setico {
    display: inline-block;
    vertical-align: middle;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../../assets/img/setIco.png) no-repeat center;
    background-size: 100% 100%;
  }
  .langAndSet .setbox .langico {
    display: inline-block;
    vertical-align: middle;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../../assets/img/langIco.png) no-repeat center;
    background-size: 100% 100%;
  }
}

// 换色系
.dark {
  .logo {
    background: url("../../assets/img/dark/logo.svg") no-repeat;
    background-size: 100% 100%;
  }
  .active {
    color: #fc6446;
  }
  .login_wallet {
    color: #fc6446;
  }
  .active-bar {
    background: #fc6446;
  }
}
</style>
