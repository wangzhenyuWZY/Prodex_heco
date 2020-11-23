<template>
  <el-dialog title=""
             :visible.sync="showAlert"
             width="480px"
             custom-class="dialog_recevive"
             :before-close="handleClosea">
    <span slot="title"
          class="select_size">
      <span>Confirm Swap</span>
    </span>
    <div class="box_sizes">
      <div class="provider receive__Pool receove_Share">
        <div class="received ">
          <span class="rg ftblod">0.000000233456</span>
          <div class="lt change_img">
            <img class="lt_icon"
                 src="@/assets/img/btc.svg"
                 alt="">
            <span>ETH</span>
          </div>

        </div>
        <div class="from_contentIcon">
          <i class="el-icon-back changeicon"></i>
        </div>
        <div class="received ">
          <span class="rg ftblod">0.000000233456</span>
          <div class="lt change_img">
            <img class="lt_icon"
                 src="@/assets/img/btc.svg"
                 alt="">
            <span>USDT</span>
          </div>
        </div>
      </div>
    </div>
    <div class="receive__size">Output is estimated.If the price change by more than 0.5% your transaction will revert</div>
      <div class="Price_text" > 
            <span>Price: </span> 
            <span>0.0020495 </span>
                <span> ETH </span> 
               <span> per </span>
               <span> DAI </span> 
               <img src="@/assets/img/icon_slect.png" alt=""></div>
    <div class="box_sizes">
      <div class="provider receove_Share ">
        <div class="">
          <div class="received ">
            <div class="lt change_img">
              
              <span>Minimum received</span>
              <img class="lt_icon"
                   src="@/assets/img/icon_instructions.svg"
                   alt="">
            </div>
            <span class="rg ">441.4 aDAI</span>
          </div>
            <div class="received change20">
            <div class="lt change_img">
              
              <span>Price Impacte</span>
              <img class="lt_icon"
                   src="@/assets/img/icon_instructions.svg"
                   alt="">
            </div>
            <span class="rg change_red">5.30%</span>
          </div>
            <div class="received ">
            <div class="lt change_img">
              
              <span>Liquidity Provider Fee</span>
              <img class="lt_icon"
                   src="@/assets/img/icon_instructions.svg"
                   alt="">
            </div>
            <span class="rg ">0.003 ETH</span>
          </div>
    

        </div>
      </div>
    </div>
    <el-button class="from_botton recevive_btn">Confirm Swap</el-button>
  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      showAlert: true

    }
  },
  components: {
    // vButton: vbutton,
    // frominput,
    // vfromInput: fromInput,
    // setselect

  }
  , methods: {
    handleClosea () {

    }
  },
}
</script>

<style  scoped>
>>> .dialog_recevive {
  border-radius: 20px;
}
>>> .dialog_recevive .el-icon-close {
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
.title__num {
  font-size: 40px;
  font-weight: normal;
  color: #fe613c;
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
  border-bottom: 1px solid #e5ebf2;
}
.received span {
  font-size: 18px;
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
.received {
  display: flex;
  justify-content: space-between;
  color: #0f1730;
}
.from_contentIcon{
  margin: 15px 0;
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
    font-size: 20px;
    color: #0F1730;
    margin-top: 24px;
    margin-bottom: 12px;
    text-align: center;
  
  }
  .Price_text>img{
        vertical-align: sub;
        margin-left: 4px;
        cursor: pointer;
  }
</style>