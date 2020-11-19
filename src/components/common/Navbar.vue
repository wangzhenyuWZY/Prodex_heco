<template>
  <div class="nav">
    <div class="logo"><img src="../../assets/img/logo.png" alt="" /></div>
    <div class="nav-header" ref='header'>
      <span tag="span" exact-active-class="on" @click="handelActive('Exchange')"
        >Exchange</span
      >
      <span tag="span" exact-active-class="on" @click="handelActive('pool')"
        >Pool</span
      >
      <span tag="span" exact-active-class="on" @click="handelActive('foxdex')"
        >FoxDex</span
      >
      <span tag="span" active-class="on" @click="handelActive('wtrx')">WTRX</span>
      <div class="active-bar" :style="{'transform':`translateX(${key}px)`}"></div>
    </div>
    <div class="nav-right">dsdsds</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: '0',
      childrenNode:[]
    }
  },
  mounted() {
    console.log(this.$refs);
    
  },
  methods: {
    handelActive(e) {
      switch (e) {
        case 'Exchange':
           this.$router.push('/');
           this.key=0;
          break;
        case 'pool':
           this.key=129;
          break;
        case 'foxdex':
            this.key=240;
          break;
        case 'wtrx':
            this.key=362;
          break;
      }
      if (e !='Exchange') this.$router.push('/'+e);
    },
  },
};
</script>

<style >
.nav {
  /* width: 1920px; */
  line-height: 72px;
  height: 72px;
  background-color: #131a28;
  display: flex;
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
.nav-right {
}
.active-bar {
  position: absolute;
  left: 50px;
  bottom: 15px;
 width: 40px;
height: 4px;
background: linear-gradient(136deg, #FDAB2B 0%, #DF0019 100%);
border-radius: 3px;
  transition: transform .6s;
}
.nav-header span {
  font-size: 22px;
  margin: 0 26px;
  cursor: pointer;
  /* color: #B7BFC8; */
  /* text-align: center; */
}
.on {
  color: #ffffff;
}
</style>