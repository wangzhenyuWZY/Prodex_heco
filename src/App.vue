<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from './components/common/Navbar'
import { mapActions } from 'vuex'
import { TokenData, PairData } from './utils/index'
import Web3 from 'web3'
export default {
  name: 'App',
  components: {
    navBar
  },
  created() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3('https://kovan.infura.io/v3/58c5c1771340434488786a1d5e8ac86f')
    }
    this.init()
    TokenData().then((res) => {
      this.$store.state.app.tokenData = res
    })
    PairData().then((res) => {
      this.$store.state.app.pairData = res
    })
  },
  methods: {
    async init(){
      const accounts = await ethereum.enable() 
      if(accounts && accounts.length>0){
          this.$store.state.app.defaultAccout = accounts[0]
      }
    }

  }

}
</script>

<style lang="scss" >
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  //  background: url(./assets/img/bg.png)
  //  background-image: url(./assets/img/BG1.png);
  //  background-repeat: no-repeat;
  //  background-size: 100% 380px;
  //  background-size: cover;
}
html {
  //  background: #FFFFFF;
  background: #f6f7fb;
}
</style>
