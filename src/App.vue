<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import navBar from './components/common/Navbar'
import {mapActions} from 'vuex'
import initTronWeb from './utils/tronwebFn'
export default {
  name: 'App',
  components:{
    navBar
  },
  created() {
    this.init();
  },
  methods: {
  ...mapActions(['connectWallett']),
     async init () {
        await initTronWeb();
          this.connectWallett();
  }

  },

}
</script>

<style lang="scss" >
html, body, #app{
  width: 100%;
  height: 100%;
  overflow: hidden;

}
#app{
   background: url(./assets/img/bg.png) no-repeat;
   background-size: cover;
}
html{
   background: #FFFFFF;
}


</style>
