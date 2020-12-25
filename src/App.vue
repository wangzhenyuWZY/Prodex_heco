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
export default {
  name: 'App',
  components: {
    navBar
  },
  created() {
    this.init()
    TokenData().then((res) => {
      this.$store.dispatch('setTokenData', res)
    })
    PairData().then((res) => {
      this.$store.dispatch('setPairData', res)
    })
  },
  methods: {
    ...mapActions(['connectWallett']),
    async init() {
      this.$initTronWeb().then((tronWeb) => {
        this.connectWallett()
      })
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
