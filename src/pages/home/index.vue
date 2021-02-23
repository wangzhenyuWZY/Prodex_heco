<template>
  <div class="container">
    <Navbar></Navbar>
    
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
export default {
  components:{
    Navbar,
  },
  watch: {
    
  },
  data() {
    return {
      homeInfo:{},
      chartData:[],
      pageNum:0,
      pageNum1:0,
      blockList:[],
      transList:[],
      over:null
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>
<style  lang="less" scoped>
.homeContainer{
  
}
</style>
