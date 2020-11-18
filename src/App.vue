<template>
  <div id="app">
    <div class="c">1</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
.css{
  .sss{
    background:#131A28;
  }
}
#app{
  .c{
    background: red;
  }
}
html, body {
  padding: 0;
  margin: 0  auto;
  width: 1920px;
  height: 1080px; 
  /* background: #0F1522; */
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
