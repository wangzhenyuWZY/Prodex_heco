<template>
<el-dialog 
    title=""
    :visible.sync="showAlert"
    width="480px"
    custom-class="dialog_selct"
    :before-close="handleClosea">
      <span slot="title"  class="select_size">
         <span>Select a token</span>
         <img  class="select_title" src="@/assets/img/icon_instructions.svg" alt="">
      </span>
      <div class="conter">

      <div class="search__box">
          <el-input 
              class="search__input" 
              v-model="value" 
              placeholder="Search name or paste address"
            ></el-input>
      </div>
      <div class="select_size select__bases" hidden>
        <span> Common bases</span>
         <img  class="select_title" src="@/assets/img/icon_instructions.svg" alt="">
      </div>
      <ul class="bases__list" v-show="false">
          <li>
                <img  class="currency_img" src="@/assets/img/btc.svg" alt="">
                  <span class="bases_currency">ETH</span>
             
          </li>
           <li>
             <img  class="currency_img" src="@/assets/img/btc.svg" alt="">
             <span class="bases_currency">ETH</span>
          </li>
           <li>
             <img class="currency_img"  src="@/assets/img/btc.svg" alt="">
             <span class="bases_currency"> ETH</span>
          </li>
      </ul>
      <div class="select_size select__sorting ">
        <span>Token Name</span>
         <img  class="sorting" src="@/assets/img/icon_sorting.svg" alt="">
      </div>
      <div class="currency_list">
        <ul class="list_scroll">
            <li v-for="(item,index) in tokenList" :key="index" @click="selectClick(item,index)">
              <img  class="currency_img" src="@/assets/img/btc.svg" alt="">
                <span class="bases_currency">{{item.name}}</span>
            </li>
        </ul>
      </div>

      </div>

      <div class="Change_back clearfix" hidden>
         <div class="Change_lt fl_lt tag">
            <img src="@/assets/img/icon_instructions.svg" alt="">
            <span>CoinGecko</span>
         </div>
         <div class="Change_rg fl_rg tag">
            Change
         </div>
      </div>
  </el-dialog>
</template>

<script>
import tokenData from '../../utils/token'
  export default { 
    props: {
      showAlert: {
        type: Boolean,
        default: false,
      },
      item: {
        type: Number,
        default: 1,
      }
    },   
    data () {
      return {
        value:'',
        tokenList: tokenData.tokenList,
      }
    },
    created(){
      console.log('showAlert====================',this.showAlert)
    },
    methods: {
      handleClosea () {
        this.$emit('closeAlert')
      },
      selectClick(e,index) {
        e.item = index
        this.$emit('change',e)
      },
    }

  }
</script>

<style  scoped>
>>> .dialog_selct {
  border-radius: 20px;
}
>>> .dialog_selct .el-icon-close {
  font-size: 28px;
  color: #0f1730;
}
>>> .dialog_selct .el-icon-close:hover {
  color: #0f1730;
}
>>> .el-dialog__body {
  padding: 0 ;
}
.conter{
  padding: 0 32px;
}
>>>.el-dialog__header{
    padding: 28px 32px 0px;
  } 
  >>>.el-dialog__headerbtn{
    top: 24px;
    right: 34px;
  }
  >>>.search__input{
      
  }
  >>>.search__input .el-input__inner{
      border-radius: 32px;
      border: 1px solid #FF5D37;
      border-radius: 32px;
      padding-left: 77px;
      font-size: 18px;
  }
  >>>.search__input .el-input__inner::placeholder{
      color: #B7BFC8;
      font-size: 18px;
    }
    .search__box{
      margin-top: 25px;
      margin-bottom: 33px;
    }
.select_title{
  width: 24px;
  height: 24px;
  vertical-align: sub;
  margin-left: 4px;
}
.select_size{
font-size: 20px;
color: #0F1730;

font-weight: normal;
}
.select__bases{
  margin-bottom: 17px;
}
.bases__list{
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  margin-bottom: 15px;
}
.bases__list>li{
  width: 120px;
  height: 48px;
  line-height: 48px;
  background: #F4F5FA;
  border-radius: 32px;
  font-size: 18px;
  color: #0F1730;
  padding-left: 8px;
  margin-bottom: 12px;
}
 .currency_img{
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 8px;
}
.bases_currency{
  display: inline-block;
  font-size: 18px;
  color: #0F1730;
}
.select__sorting{
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 12px;
}
.currency_list{
    height: 256px;
    background: #F4F5FA;
    border-radius: 16px;
    overflow-y: scroll;
    margin-bottom: 31px;
}
.list_scroll{
  padding: 16px;
  
}
.list_scroll>li{
  margin-bottom: 16px;
  cursor: pointer;
}
.Change_back{
    border-top: 1px solid #E5EBF2;
    line-height: 60px;
    padding: 0 32px;
}
.Change_lt{
  
font-size: 18px;
color: #0F1730;
}
.Change_rg{
  font-size: 18px;
  color: #FF5D37;
}
.currency_list::-webkit-scrollbar{
  width: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none; 
}
.currency_list::-webkit-scrollbar-thumb{
  border-radius: 4px;
}
</style>