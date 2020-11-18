<template>
<div class="wtrx">
  <div class="wtrx-top">
    <h3>WTROX Exchange</h3>
  </div>

  <div class="wtrx-left">
    <p>TRX->WTRX</p>
    <p>TRX Balance:</p>
    <input type="text">
    <p>You will get WTRX:</p>
    <button></button>
  </div>
  <div class="wtrx-right">
    <p>WTRX->TRX</p>
    <p>WTRX Balance:</p>
    <input type="text">
    <p>You will get WTRX:</p>
    <button></button>
  </div>
  <div class="wtrx-bottom">
    <p>what is WTRX?</p>
    <p>TRX is the native asset of TRON, and WTRX is a TRC20 Token with the equivalent value to TRX.
    <br> DepositTRX to mint an equivalent amount of WTRX, and burn WTRX to get an equivalent amount of TRX.</p>
    <p>Can WTRX exchange to other TRC20 Tokens?</p>
    <p>WTRX is a TRC20 Token, you can swap to any other TRC20 Tokens on FoxDex.</p>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
.wtrx{
  height: 1008px;
  background: #0F1522;
  position: relative;
}
.wtrx-top{
  /* float: left; */
  font-size: 24px;
  position: absolute;
  top: 145px;
  left: 830px;
  overflow: hidden;
  color: #ffffff;
}
.wtrx-left{
  position: absolute;
  border-radius: 20px;
  width: 400px;
  height: 352px;
  top: 240px;
  left: 531px;
  border-radius: 20px;
  background: #171F30;
}
.wtrx-left p{
  text-align: center;
  color:#ffffff;
}
.wtrx-left p:nth-child(1){
  text-align: center;
  color:#ffffff;
}
.wtrx-left p:nth-child(2){
  text-align: center;
  color:#ffffff;
}
.wtrx-left input{
  overflow: hidden;
  margin-left: 120px;
}
.wtrx-left button{
  width: 150px;
  height: 20px;
  margin-left: 120px;
}
.wtrx-right p{
  text-align: center;
  color:#ffffff;
}
.wtrx-right{
  position: absolute;
  width: 400px;
  height: 350px;
  top: 240px;
  left: 961px;
  border-radius: 20px;
  background: #171F30;
}
.wtrx-right P:nth-child(1){
  text-align: center;
  color:#ffffff;
}
.wtrx-right P:nth-child(2){
  text-align: center;
  color:#ffffff;
}


.wtrx-bottom{
  position: absolute;
  top: 600px;
  left: 520px;
  /* background: #ffffff; */
  width: 860px;
  height: 300px;
}
.wtrx-bottom p:nth-child(1){
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
  margin-top: 42px;
  text-align: center;
  line-height: 21px;
}
.wtrx-bottom p:nth-child(2){
  font-weight: bold;
  font-size: 18px;
  color: #A6AEB7;
  text-align: center;
  line-height: 24px; 
  font-family: Arial-BoldMT, Arial;
 font-weight: normal;
}
.wtrx-bottom p:nth-child(3){
  
  color: #ffffff;
  text-align: center;  
}
.wtrx-bottom p:nth-child(4){
  font-weight: bold;
  color: #A6AEB7;
  text-align: center;  
}

</style>
