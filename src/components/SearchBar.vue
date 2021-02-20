<template>
    <div class="searchbox">
        <input placeholder="输入地址/交易哈希/区块号" v-model="val" >
        <i @click="changed"></i>
    </div>
</template>
<script>
export default {
  props:['address'],
  data(){
    return {
        val:''
    };
  },
  watch:{
    address(val){
      this.val = val
    }
  },
  created(){
    this.val = this.address
  },
  methods:{
    changed(){
      this.$emit('change',this.val)
    }
  }
}
</script>
<style lang='less' scoped>
.searchbox{
    position:relative;
    width:100%;
    height:50px;
    background: #252525;
    box-shadow: 2px 4px 8px 0px #151515, -2px -2px 4px 0px #1E1E1E;
    border-radius: 3px;
    border: 1px solid #323232;
    input{
      width:100%;
      line-height:50px;
      text-indent: 20px;
      font-size:14px;
      color:#fff;
      background:none;
      &::-webkit-input-placeholder{
        color:#585858;
      }
    }
    i{
      position:absolute;
      right:13px;
      top:4px;
      height:42px;
      width:42px;
      background:url(../assets/img/search.png) no-repeat center;
      background-size:100% 100%;
      cursor: pointer;
    }
  }
@media screen and (max-width: 750px) {
    .searchbox{width:100%;}
}  
</style>