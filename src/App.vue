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
  //  background: url(./assets/img/bg.png) 
   background-image: url(./assets/img/BG1.png);
   background-repeat: no-repeat;
   background-size: 100% 380px;
  //  background-size: cover;
}
html{
  //  background: #FFFFFF;
  background: #F6F7FB;
}


</style>
