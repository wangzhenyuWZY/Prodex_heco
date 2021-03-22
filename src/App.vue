<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      tokenList:[{
            name:'WHT',
            logoURI:'',
            address:'0xEAdba3a810Be346A975b2F6fDFC98d087BB7CFD3',
            decimals:18
        },{
            name:'PDX',
            logoURI:'',
            address:'0x11BE64D1F45D5d77c32fdB76F86497e025f0C186',
            decimals:18
        },{
            name:'PUSDT',
            logoURI:'',
            address:'0xb8066c134FF10953020D9C7377E1a2312df9854b',
            decimals:18
        },{
            name:'PBTC',
            logoURI:'',
            address:'0xC35Dd3EA032001306e22fA28495834a8ca945E20',
            decimals:18
        },{
            name:'PETH',
            logoURI:'',
            address:'0x48095Df0d1d5a012918B357c31FAE49003aF6930',
            decimals:18
        },{
            name:'OUTTOKEN1',
            logoURI:'',
            address:'0xccEF6c21466Cc9C8E0381314fE8599185B9257Af',
            decimals:18
        },{
            name:'OUTTOEKN2',
            logoURI:'',
            address:'0x7a49B692c6e5baD8F51d34e1c252E21d5c037395',
            decimals:18
        }
      ]
    }
  },
  created() {
    this.$store.commit('SET_TOKEN_DATA', this.tokenList);
  },
  methods: {
    
  }

}
</script>

<style lang="scss" >

</style>
