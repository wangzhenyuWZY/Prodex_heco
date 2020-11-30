<template>
  <el-dialog title=""
             :visible.sync="showAlert"
             width="480px"
             :close-on-click-modal="false"
             custom-class="dialog_recevive"
             :before-close="handleClosea">
    <span slot="title"
          class="select_size">
      <span>You will recevive</span>
    </span>

    <div class="box_sizes">
      <div class="provider receive__Pool">
        <div class="title__num">{{popsData.reciveLptoken}}</div>
        <div class="">{{popsData.token1.name}}{{popsData.token2.name}} Pool Tokens</div>
      </div>
    </div>
    <div class="receive__size">Output is estimated.If the price change by more than 0.5% your transaction will revert</div>
    <div class="box_sizes">
      <div class="provider receove_Share ">
        <div class="">
          <div class="received mrge12">
            <div class="lt ">
              <img class="lt_icon"
                   src="@/assets/img/btc.svg"
                   alt="">
              <span>{{popsData.token1.name}} Deoosited</span>
            </div>
            <span class="rg">{{popsData.token1Num}}</span>
          </div>
          <div class="received mrge24">
            <div class="lt">
              <img src="@/assets/img/btc.svg"
                   alt="">
              <span>{{popsData.token2.name}} Deoosited</span>
            </div>
            <span class="rg">{{popsData.token2Num}}</span>
          </div>
          <div class="received mrge12">
            <div class="lt">
              <span>Rates</span>
            </div>
            <span class="">1{{popsData.token1.name}}={{popsData.justPrice}} {{popsData.token2.name}}</span>
          </div>
          <div class="conversion mrge24">1{{popsData.token2.name}}={{popsData.reversePrice}} {{popsData.token1.name}}</div>
          <div class="received">
            <div class="lt">
              <span>Share of pool</span>
            </div>
            <span class="">{{popsData.share}}%</span>
          </div>
        </div>
      </div>
    </div>
    <el-button class="from_botton recevive_btn" @click="clickHadel">Confirm Supply</el-button>
  </el-dialog>
</template>

<script>

export default {
  props:{
    showAlert: {
      type: Boolean,
      default: false,
    },
    popsData: {
      type: Object,
      default: {
        token1:{},
        token2:{}
      },
    }
  },
  data () {
    return {

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
        this.$emit('close')
    },
    clickHadel () {
      this.$emit('change')
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
.recevive_btn{
  margin-top: 48px;
}
</style>