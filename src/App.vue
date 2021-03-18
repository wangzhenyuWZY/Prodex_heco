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
            name:'ST1',
            logoURI:'',
            address:'0xA255E08287EBeF8Af8B6055983f73dBc22bD4B13',
            decimals:18
        },
        {
            name:'ST2',
            logoURI:'',
            address:'0xD926c882469b0522655f28e97C5b4F3d72a5d81f',
            decimals:18
        },{
            name:'ST3',
            logoURI:'',
            address:'0x55BC716a9d95767c821d37780aa33ea975E2C4A8',
            decimals:18
        },{
            name:'ST4',
            logoURI:'',
            address:'0xCFeE4592B754B64429eC5ab5d18C517563729899',
            decimals:18
        },{
            name:'WHT',
            logoURI:'',
            address:'0xd2D29106dD6515d500E1f67E6a24cAA05cdE8a58',
            decimals:18
        },{
            name:'PDX',
            logoURI:'',
            address:'0xC28B738981C19f3d21DC754321c9A6106C8211a0',
            decimals:18
        },{
            name:'PUSDT',
            logoURI:'',
            address:'0xC455a2aBcCB0126A9c024a2cc726fD5dd39D66eD',
            decimals:6
        },{
            name:'PBTC',
            logoURI:'',
            address:'0x35E63daBDB2D7e663Dd778B38bf48DB0342D7Dc7',
            decimals:8
        },{
            name:'PETH',
            logoURI:'',
            address:'0x8B8557a0EE95e0e8a92c44E6bd204e647fceAcba',
            decimals:18
        },{
            name:'OUTTOKEN1',
            logoURI:'',
            address:'0x8537e059d7792B239A042f677B2a81ad76843101',
            decimals:6
        },{
            name:'OUTTOEKN2',
            logoURI:'',
            address:'0xE3Dc0B58589416d86A02B7645C18D252d1F78779',
            decimals:10
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
