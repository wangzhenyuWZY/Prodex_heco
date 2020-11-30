<template>
  <el-dialog title=""    
             :visible.sync="showAlert"
             width="480px"
             custom-class="dialog_selct"
             :before-close="handleClosea">
    <span slot="title"
          class="select_size">
      <span>Connect to Wallet</span>
      <img class="select_title"
     
           src="@/assets/img/icon_instructions.svg"
           alt="">
    </span>
    <div class="conter">

      <div class="mag_list">
        <div class="currency_list" @click="tlink" >
         <button class="con-but"> <img src="../assets/img/conter.png" alt=""> Tronlink wallet</button>
        </div>
      </div>
      <div class="con-p"><samp class="con-p1">Haven't installed TronLink yet?<samp class="con-p2">Click here>></samp></samp></div>
      
    </div>
  </el-dialog>
</template>

<script>
import tokenData from '../utils/token'
import {mapState} from 'vuex'
export default {
  props: {
    showAlert: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Number,
      default: 1,
    },
    selectType:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      value: '',
      // tokenList: tokenData.tokenList,
    }
  },
  computed: {
    ...mapState(["connectFlag",]),
     tokenList () {
         if (this.selectType == '') {
           return tokenData.tokenList
         } else {
           let arry = tokenData.pairList.filter(el=> this.selectType == el.token1.name|| this.selectType == el.token2.name )
            return arry;
         }
     }
  },
  created () {

    // console.log('showAlert====================', this.showAlert)
  },
  methods: {
    handleClosea () {
      console.log("点击关闭");
      this.showAlert = false
      // this.$emit('closeAlert')
    },
    tlink(){
      // if(){

      // }
      console.log("登入跳转");
      // if(this.connectFlag = false){}
      //链接钱包.....
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style  scoped>
.con-p{
    width: 349px;
    height: 21px;
    font-size: 18px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #878B97;
    line-height: 21px;
    margin-left: 32px;
}
.con-p1{   
    height: 21px;
    font-size: 18px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #878B97;
    line-height: 21px;
}
.con-p2{
   
    height: 21px;
    font-size: 18px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #FA403D;
    line-height: 21px;
}
.conter{
    margin-top: 40px;
}

>>> .dialog_selct {
    width: 480px;
    height: 273px;
    background: #FFFFFF;
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
  padding: 0;
}
.conter {
  padding: 0 32px;
}
>>> .el-dialog__header {
  padding: 28px 32px 0px;
}
>>> .el-dialog__headerbtn {
  top: 24px;
  right: 34px;
}
>>> .search__input {
}
>>> .search__input .el-input__inner {
  border-radius: 32px;
  border: 1px solid #ff5d37;
  border-radius: 32px;
  padding-left: 77px;
  font-size: 18px;
}
>>> .search__input .el-input__inner::placeholder {
  color: #b7bfc8;
  font-size: 18px;
}
.search__box {
  margin-top: 25px;
  margin-bottom: 33px;
}
.select_title {
    height: 24px;
    font-size: 20px;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    color: #0F1730;
    line-height: 24px;
}
.select_size {
  font-size: 20px;
  color: #0f1730;
  font-weight: normal;
}
.currency_list {
    width: 416px;
    height: 80px;
    background: #F4F8FB;
    border-radius: 16px; 
    overflow-y: scroll;
    margin-bottom: 32px;
}
.con-but{
    background: #F4F8FB;
    height: 24px;
    font-size: 20px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #0F1730;
    line-height: 24px;
    margin-top: 26px;
    margin-left: 123px;
}

.currency_list::-webkit-scrollbar {
  width: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.currency_list::-webkit-scrollbar-thumb {
  border-radius: 4px;
}
</style>