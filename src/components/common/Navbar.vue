<template>
  <div>
    <div class="nav clearfix">
      <div class="logo"><img src="../../assets/img/logo.png"
             alt="" /></div>
      <div class="moble fl_lt" v-show="false">
        <div class="iconsv">
          <el-dropdown trigger="click" size="medium">
            <span class="el-dropdown-link">
              <i class="el-icon-menu icons"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(el,index) in tag" :key="el.path+index">{{el.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="nav-header fl_lt" v-show="true">
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
          <el-button class="from_botton nav_btn " v-if="!connectFlag">Connect to a wallet</el-button>
          <div class="login_wallet" v-if="connectFlag">
              <img class="wallet_img" src="@/assets/img/btn_work_wallet_nor.svg" alt="">
              <span class="wallet_addrs">{{walletAddres.address|address}}</span>
               <span class="conversion">{{walletAddres.balance}}TRX</span>
          </div>
        </div>
        <div class="nav_merge">
          <img src="@/assets/img/icon_merge.svg"
               alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  data () {
    return {
      key: "0",
      navIndex: 0,
      childrenNode: [],
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
          name: "stake",
        },
      ],
    };
  },
  computed: {
    ...mapState(['walletAddres','connectFlag'])
  },

  mounted () {
    try {
      this.$nextTick(() => {
        this.$refs.header.children.forEach((element) => {
          this.childrenNode.push(element.offsetWidth);
        });
        let hash = location.hash;
        let str = hash.split("#")[1];
        if (str) {
          this.handelActive(str);
        } else {
          this.handelActive("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    handelActive (e, index) {
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

      this.key = this.setActive(this.navIndex);
      this.$router.push(e);

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

<style lang="scss" scoped>
.iconsv{
  margin-left: 50px;
}
.icons {
  font-size: 34px;
  color: #0f1730;
  vertical-align: sub;
}
.nav {
  /* width: 1920px; */
  line-height: 72px;
  height: 72px;
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
  background: pink;
}
.nav-ion2 {
  width: 50px;
  height: 40px;
  background: green;
}

.logo {
  float: left;
  width: 35px;
  height: 35px;
  margin-left: 33px;
}
.logo img {
  width: 100%;
}
.nav-header {
  flex: 1;
  color: #495169;
  position: relative;
}
.active {
  color: #0f1522;
}
.active-bar {
  position: absolute;
  left: 0px;
  bottom: 15px;
  width: 40px;
  height: 4px;
  background: linear-gradient(136deg, #fdab2b 0%, #df0019 100%);
  border-radius: 3px;
  transition: transform 0.6s;
}
.nav-header span {
  font-size: 20px;
  padding: 0 26px;
  cursor: pointer;
  /* color: #B7BFC8; */
  /* text-align: center; */
}
.on {
  color: #ffffff;
}
.login_wallet{
  height: 40px;
  line-height: 40px;
  border-radius: 28px;
  border: 1px solid #0F1730;
  color: #0F1730;
  padding: 0 32px;
  display: flex;
  align-items: center;
      cursor: pointer;

  .wallet_icon{
    font-size: 24px;
    vertical-align: sub;
   
  }
  .wallet_addrs{
      font-size: 18px;
      font-family: Roboto-MediumItalic, Roboto;
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
      background: #FF5D37;
      border-radius: 28px;
      font-size: 18px;
      font-family: Roboto-MediumItalic, Roboto;
      font-weight: normal;
      color: #FFFFFF;
  }
}
</style>