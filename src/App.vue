<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from './components/common/Navbar'
export default {
  name: 'App',
  components:{
    navBar
  }
}
</script>

<style lang="scss" >
html, body, #app{
  width: 100%;
  height: 100%;
  background: #0F1522; 
}


</style>
