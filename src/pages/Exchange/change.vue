<template>
<div class="change">

  <el-dialog title=""
             :visible.sync="showAlert"
             :width="mobile?'480px':'90%'"
             custom-class="dialog_recevive"
             :before-close="handleClose">
    <span slot="title"
          class="select_size">
      <span>Confirm Swap</span>
    </span>
    <div class="box_sizes">
      <div class="provider receive__Pool receove_Share">
        <div class="changes_rece ">
          <span class="rg rg_ft ftblod">{{token1Num}}</span>
          <div class="lt change_img">
            <img class="lt_icon"
                 src="@/assets/img/btc.svg"
                 alt="">
            <span>{{token1.name}}</span>
          </div>

        </div>
        <div class="from_contentIcon">
          <i class="el-icon-back changeicon"></i>
        </div>
        <div class="changes_rece ">
          <span class="rg  rg_ft ftblod">{{token2Num}}</span>
          <div class="lt change_img">
            <img class="lt_icon"
                 src="@/assets/img/btc.svg"
                 alt="">
            <span>{{token2.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="receive__size">Output is estimated.If the price change by more than 0.5% your transaction will revert</div>
      <div class="Price_text" > 
            <span>Price: </span> 
            <span>{{spotPrice.toFixed(8)}} </span>
                <span> {{token1.name}} </span> 
               <span> per </span>
               <span> {{token2.name}} </span> 
               <img src="@/assets/img/icon_slect.png" alt=""></div>
    <div class="box_sizes">
      <div class="provider receove_Share ">
        <div class="">
          <div class="changes_rece  changes_rece">
            <div class="lt change_img">
              
              <span>Minimum received</span>
              <img class="lt_icon"
                   src="@/assets/img/icon_instructions.svg"
                   alt="">
            </div>
            <span class="rg ">{{token2Num}} {{token2.name}}</span>
          </div>
            <div class="changes_rece change20">
            <div class="lt change_img">
              
              <span>Price Impacte</span>
              <img class="lt_icon"
                   src="@/assets/img/icon_instructions.svg"
                   alt="">
            </div>
            <span class="rg change_red">{{percentage}}%</span>
          </div>
            <div class="changes_rece ">
            <div class="lt change_img">
              
              <span>Liquidity Provider Fee</span>
              <img class="lt_icon"
                   src="@/assets/img/icon_instructions.svg"
                   alt="">
            </div>
            <span class="rg ">{{swapFee}} {{token1.name}}</span>
          </div>
    

        </div>
      </div>
      </div>
      <el-button class="from_botton recevive_btn" @click="doConfirm">Confirm Swap</el-button>
      </el-dialog>
  </div>
</template>

<script>
import { IsPc } from '../../utils/index'
export default {
  props: ['token1','token2','token1Num','token2Num','spotPrice','swapFee','percentage','mobile'],  
  data () {
    return {
      showAlert: true,
      mobile:!IsPc()

    }
  },
  watch: {
  
  },
  components: {
    // vButton: vbutton,
    // frominput,
    // vfromInput: fromInput,
    // setselect

  }
  , methods: {
    handleClose () {
        this.$emit('handleClosea')
    },
    doConfirm(){
      this.$emit('doConfirm')
    }
  },
}
</script>

<style  scoped>
>>> .dialog_recevive {
  border-radius: 20px;
  width: 480px;
}
>>> .dialog_recevive .el-icon-close {
  /* width: 480px; */
  font-size: 28px;
  color: #0f1730;
}
>>> .dialog_recevive .el-icon-close:hover {
  color: #0f1730;
}
>>> .el-dialog__body {
  padding: 0 32px;
  padding-bottom: 48px;
}
>>> .el-dialog__header {
  padding: 28px 32px 0px;
}
>>> .el-dialog__headerbtn {
  top: 24px;
  right: 34px;
}
>>> .el-dialog__wrapper{
  overflow: auto;
}
.title__num {
  font-size: 40px;
  font-weight: normal;
  color:#05C98E;
  margin-bottom: 8px;
}
.receive__Pool {
  margin-top: 24px;
  font-size: 18px;
  color: #0f1730;
  text-align: center;
  padding: 16px 0;
}
.receive__size {
  margin-top: 16px;
  font-size: 16px;
  color: #878b97;
  padding-bottom: 24px;
  margin-bottom: 24px;
  font-weight: 400;
  border-bottom: 1px solid #e5ebf2;
}
.received span {
  font-size: 16px;
  padding-top: 3px;
}
.received .rg {
  padding-top: 5px;
}
.conversion {
  color: #0f1730;

  font-size: 18px;
  text-align: right;
}
.receove_Share {
  padding: 24px;
}

.recevive_btn {
  margin-top: 48px;
}
.add {
  text-align: left;
  font-size: 24px;
  color: #878b97;
  margin: 10px 0;
}
.change_img{
  display: flex;
  justify-items: center;
}
.change_img img {
  width: 24px;
  height: 24px;
  vertical-align: sub;
  margin-right: 8px;
  margin-left: 4px;
}
.changes_rece {
  display: flex;
  justify-content: space-between;
  color: #0f1730;
}
.changes_rece span{
  font-size: 16px;
  line-height:24px;
  
}
.changes_rece .rg_ft{
    font-size: 24px;
}
.changes_rece  .rg{
  line-height: 24px;
}
.from_contentIcon{
  margin: 16px 0;
}
.changeicon{
  color: #878B97;
  margin-top: 15px 0;
  font-size: 16px;
}
.change20{
  margin: 20px 0;
}
  .Price_text{
    font-size: 16px;
    color: #0F1730;
    margin-top: 24px;
    margin-bottom: 16px;
    text-align: center;
  
  }
  .Price_text>img{
        vertical-align: sub;
        margin-left: 4px;
        width: 20px;
        height: 20px;
        cursor: pointer;
  }
  @media screen and (max-width: 750px) {
 .changes_rece span{
    font-size: 0.35rem;
 }
  
}
</style>

