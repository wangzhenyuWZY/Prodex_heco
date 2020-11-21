<template>
  <el-dialog 
    title=""
    :visible.sync="showAlert"
    width="480px"
    custom-class="dialog_meeage"
    :before-close="handleClosea">
      <div class="alert_type">
        <img class="success"
            :class="dataType == 'failure'?'failure':''"
            :src="dataTypes[dataType]"
            alt="">
      </div>
      <!-- waiting -->
      <div
          v-if="dataType == 'waiting'">
        <div class="alert_size">Connect successfully</div>
        <div class="alert_dtail">Supplying 0.01 ETH and 4.99255 USDT</div>
        <div class="alert_waring">Confirm this transaction in your wallet</div>
      </div>

      <!-- end waiting -->
      <!-- success -->
      <div 
          v-if="dataType == 'success'">
        <div class="alert_size">Connect successfully</div>
        <div class="alert_success">View on Etherscan</div>
        <div class="alert_button"
            v-show="dataType == 'success'">
          <el-button class="from_botton">Close</el-button>
        </div>
      </div>
  </el-dialog>
</template>

<script>
import success from '@/assets/img/icon_submitted.svg';
import waiting from '@/assets/img/icon_waiting.svg';
import failure from '@/assets/img/icon_faile.svg';

export default {
  data () {
    return {
      test: '12',
      ppd: {
        a: 1,
        b: 2,
        c: 3
      },
      dataType: 'success',
      test1: '0',
      showAlert: true,
      dataTypes: {
        success,
        waiting,
        failure,
      }
    }
  },
  methods: {
    handleClosea () {

    }
  },
}
</script>

<style   scoped>
>>> .dialog_meeage {
  border-radius: 20px;
  text-align: center;
  padding-bottom: 48px;
}
>>> .dialog_meeage .el-icon-close {
  font-size: 28px;
  color: #0f1730;
}
>>> .dialog_meeage .el-icon-close:hover {
  color: #0f1730;
}
>>> .el-dialog__body {
  padding: 0;
}
.alert_type {
  margin-top: 64px;
}
.success {
  width: 88px;
  height: 88px;
}
.alert_size {
  font-size: 20px;
  font-weight: normal;
  color: #0f1730;
  margin-top: 44px;
}
.alert_dtail {
  color: #0f1730;
  font-size: 18px;
  margin: 12px 0;
}
.alert_waring {
  font-size: 18px;
  color: #b7bfc8;
}
.alert_success {
  font-size: 18px;
  color: #fe613c;
  margin-top: 12px;
  margin-bottom: 48px;
}
.alert_button {
  width: 416px;
  margin: 0 auto;
}
</style>