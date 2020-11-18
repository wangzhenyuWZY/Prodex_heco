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

.nav {
  /* width: 1920px; */
  line-height: 72px;
  height: 72px;
  background-color:#131A28;
  
}
.logo{
  float: left;
  width: 35px;
  height: 35px;
  margin-top: 10px;
  margin-left: 33px;
}
.logo img{
  width: 100%;
}
.nav-header{
  
  color: #B7BFC8;
}
.nav-header span {
  font-size: 22px;
  margin: 0 26px;
  cursor: pointer;
  /* color: #B7BFC8; */
  /* text-align: center; */
}
.on {
  color:#ffffff;
  
}

</style>
