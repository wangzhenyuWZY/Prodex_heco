<template>
  <div>
    <div class="nav">
      <div class="logo"><img src="../../assets/img/logo.png"
             alt="" /></div>
      <div class="nav-header">
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
      <div class="nav-right">
        <div class="nav-butt">
          <el-button class="from_botton nav_btn ">Connect to a wallet</el-button>
        </div>
        <!-- <div class="nav-inp">1</div>
      <div class="nav-ion1">2</div>
      <div class="nav-ion2">3</div> -->
      </div>
    </div>
  </div>
</template>

<script>

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
      console.log(e)
      if (e == '/') {
        this.navIndex = 0;
      } else {
        for (let i = 0; i < this.tag.length; i++) {
          let el = this.tag[i].path+'';
          if (e.match(el)&&el != '/') {
            console.log(e.match(el)  == e)
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
};
</script>

<style lang="scss" scoped>
.nav {
  /* width: 1920px; */
  line-height: 72px;
  height: 72px;
  display: flex;
}
.nav-butt {
  // width: 119px;
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
  margin-top: 10px;
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
  font-size: 22px;
  padding: 0 26px;
  cursor: pointer;
  /* color: #B7BFC8; */
  /* text-align: center; */
}
.on {
  color: #ffffff;
}
</style>