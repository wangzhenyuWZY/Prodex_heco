<template>
  <div class="nav">
    <div class="logo"><img src="../../assets/img/logo.png" alt="" /></div>
    <div class="nav-header">
      <div class="van_list" ref="header">
        <span
          v-for="(idx, index) in tag"
          :key="idx.path"
          @click="handelActive(idx.path, index)"
          >{{ idx.name }}</span
        >
      </div>

      <div
        class="active-bar"
        :style="{ transform: `translateX(${key}px)` }"
      ></div>
    </div>
    <div class="nav-right">
      <div class="nav-butt">
        <vbutton text='FoxDex'  height='40' > </vbutton>
      </div>
      <!-- <div class="nav-inp">1</div>
      <div class="nav-ion1">2</div>
      <div class="nav-ion2">3</div> -->
    </div>
  </div>
</template>

<script>
import vbutton from "./button";

export default {
  data() {
    return {
      key: "0",
      childrenNode: [],
      tag: [
        {
          path: "/",
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
  components:{
    vbutton,
  },

  mounted() {
    console.log(this.$refs);
    try {
      this.$nextTick(() => {
        this.$refs.header.children.forEach((element) => {
          this.childrenNode.push(element.offsetWidth);
        });
        let hash = location.hash;
        let str = hash.split("/")[1];
        if (str) {
          this.handelActive("/" + str);
        } else {
          this.handelActive("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  
  methods: {
    handelActive(e, index) {
      let indexOf4 =0 ;
      if (index === undefined) {
         indexOf4 = (this.tag || []).findIndex((item) => item.path === e);
         indexOf4 == -1 ?  0: indexOf4;
      }
      this.key = this.setActive(index||indexOf4);
      this.$router.push(e);
    },
    setActive(n) {
      let num = 0;
      for (let index = 0; index <=n; index++) {
        num = (this.childrenNode[index] + num) * 1;
      }
      let num1 = parseInt((num-20)-this.childrenNode[n]/2);
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
  background-color: #131a28;
  display: flex;
}
.nav-butt{
  width: 119px;
}
.nav-right{
  display: flex;
  justify-content:flex-end;
  align-items:center;

}
.nav-inp{
  width: 100px;
  height: 40px;
  background: #ffffff;
}
.nav-ion1{
   width: 50px;
  height: 40px;
  background: pink;
}
.nav-ion2{
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
  color: #b7bfc8;
  position: relative;
}

.active-bar {
  position: absolute;
  left: 0px;
  bottom: 15px;
  width: 40px;
  height: 4px;
  background: linear-gradient(136deg, #FDAB2B 0%, #DF0019 100%);
  border-radius: 3px;
  transition: transform .6s;
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