<template>
  <el-dialog
    title=""
    :visible.sync="isShow"
    :width="!mobile?'80%':'480px'"
    custom-class="dialog_meeage"
    :before-close="handleClosea">
      <div class="alert_type">
        <img
class="success"
            :class="alertType == 'failure'?'failure':''"
            :src="dataTypes[alertType]"
            alt="">
      </div>
      <!-- waiting -->
      <!-- <div
          v-if="alertType == 'waiting'">
        <div class="alert_size">Waiting For Confirmation</div>
        <div class="alert_dtail">Supplying {{token1Num}} {{token1.name}} and {{token2Num}} {{token2.name}}</div>
        <div class="alert_waring">Confirm this transaction in your wallet</div>
      </div> -->

      <!-- end waiting -->
      <!-- success -->
      <div
          v-if="alertType == 'success'">
        <div class="alert_size">{{$t('pop.TSed')}}</div>
        <div class="alert_success" @click="openUrl">{{$t('vot')}}</div>
        <div
class="alert_button"
            v-show="alertType == 'success'">
          <el-button class="from_botton" @click="handleClosea">{{$t('Close')}}</el-button>
        </div>
      </div>
  </el-dialog>
</template>

<script>
import success from '@/assets/img/icon_submitted.svg'
import waiting from '@/assets/img/icon_waiting.svg'
import failure from '@/assets/img/icon_faile.svg'
import { IsPc } from '../../utils/index'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    alertType: {
      type: String,
      default: 'success'
    },
    token1Num: {
      type: [String, Number],
      default: 0
    },
    token2Num: {
      type: [String, Number],
      default: 0
    },
    url: {
      default: ''
    }
    // token1:{
    //   type:Object,
    //   default:{}
    // },
    // token2:{
    //   type:Object,
    //   default:{}
    // }
  },
  data() {
    return {
      test: '12',
      addUrl: 'https://shasta.tronscan.org/#/address/',
      ppd: {
        a: 1,
        b: 2,
        c: 3
      },
      test1: '0',
      showAlert: true,
      dataTypes: {
        success,
        waiting,
        failure
      },
      mobile: IsPc()
    }
  },
  methods: {
    openUrl() {
      window.open(this.url)
    },
    handleClosea() {
      this.$emit('close')
    }
  }
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
  color:#FC6446;
  margin-top: 12px;
  margin-bottom: 48px;
  cursor: pointer;
}
.alert_button {
  width:80%;
  margin: 0 auto;
}
</style>
