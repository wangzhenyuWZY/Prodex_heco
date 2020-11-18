<template>
  <div class="nav">
      <div class="logo"><img src="../../assets/img/logo.png" alt=""></div>
      <div class="nav-header"> 
      <router-link to='/' tag='span' exact-active-class='on'>Exchange</router-link>
      <router-link to='/pool' tag='span' exact-active-class='on'>Pool</router-link>
      <router-link to='/foxdex' tag='span' exact-active-class='on'>FoxDex</router-link>
      <router-link to='/wtrx' tag='span' active-class='on'>WTRX</router-link>
      <router-link to='/stake' tag='span' active-class='on'>Stake</router-link>
      </div>
      <div class="nav-right">

      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style >
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