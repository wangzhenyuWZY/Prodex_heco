<template>
  <el-dialog title=""
             :visible.sync="showAlert"
             width="480px"
             custom-class="dialog_selct"
             :close-on-click-modal="false"
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
        <div class="currency_list"
             @click="tlink">
          <button class="con-but"> <img src="../assets/img/conter.png"
                 alt=""> Tronlink wallet <i class="el-icon-loading"
               v-show="connect!=null"></i> </button>
        </div>
      </div>
      <div class="con-p">
        <samp class="con-p1">Haven't installed TronLink yet?
          <samp class="con-p2">Click here>></samp>
        </samp>

      </div>

    </div>
  </el-dialog>
</template>

<script>
import tokenData from '../utils/token'
import { mapState } from 'vuex'
import store from '../store/index'
import { Notification } from 'element-ui';
export default {
  data () {
    return {
      value: '',
      showAlert: false,
      connect: null,
      index: 1
      // tokenList: tokenData.tokenList,
    }
  },
  computed: {
    ...mapState(["connectFlag"])

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
    tlink () {
      this.connectWill();

    },
    connectWill () {
      let that = this
      this.connect = setInterval(async () => {
        this.index += 1;
        if (this.index > 10) {
          clearInterval(this.connect);
          this.index = 0;
          this.connect = null;
          that.showAlert = false;
          Notification({
            title: '连接失败',
            message: '请检查钱包',
            position: 'bottom-right',
            type: 'error'
          });
          that.showAlert = false;
          return;
        }
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            clearInterval(this.connect);
            store.dispatch('connectWallett');
            this.index = 0;
            this.connect = null;
            that.showAlert = false;
            Notification({
              title: '连接成功',
              message: '请检查钱包',
              position: 'bottom-right',
              type: 'success'
            });

          }

      }, 1000)
    },
    show () {
      this.showAlert = true;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style  scoped>
.con-p {
  width: 349px;
  height: 21px;
  font-size: 18px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
  color: #878b97;
  line-height: 21px;
  margin-left: 32px;
}
.con-p1 {
  height: 21px;
  font-size: 18px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
  color: #878b97;
  line-height: 21px;
}
.con-p2 {
  height: 21px;
  font-size: 18px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
  color: #05C98E;
  line-height: 21px;
}
.conter {
  margin-top: 40px;
}

>>> .dialog_selct {
  width: 480px;
  height: 273px;
  background: #ffffff;
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
  border: 1px solid#05C98E;
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
  color: #0f1730;
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
  background: #f4f8fb;
  border-radius: 16px;
  overflow-y: scroll;
  margin-bottom: 32px;
}
.con-but {
  background: #f4f8fb;
  height: 24px;
  font-size: 20px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
  color: #0f1730;
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