<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getCoinInfoList} from '@/api/user'
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      tokenList:[
      ]
    }
  },
  created() {
    let that = this
    getCoinInfoList().then(res=>{
      if(res.data.status==200){
        res.data.data.forEach(element => {
          that.tokenList.push({
            name:element.symbol,
            address:element.token,
            decimals:element.wei
          })
        });
        that.$store.commit('SET_TOKEN_DATA', that.tokenList);
      }
    })
    
  },
  methods: {
    
  }

}
</script>

<style lang="scss" >

</style>
