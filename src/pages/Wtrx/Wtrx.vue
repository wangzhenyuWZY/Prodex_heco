<template>
  <div class="container">
    <div class="wtrx">
      <div class="wtrx-box">
        <div class="wtrx-box1">
          <div class="wtrx-left">
            <samp class="trx">TRX <img class="wtrx_img"
                   src="@/assets/img/icon_arrow_right.png"
                   alt=""> WTRX</samp>
            <div class="trx-a"> <samp class="trx-a1">TRX Balance:</samp><samp class="trx-a2"> {{trxBalance}}</samp> </div>
            <input type="number"
                   v-model="trxNum"
                   :disabled="inputdisabled1"
                   onKeypress="return (/[\d,.]/.test(String.fromCharCode(event.keyCode)))"
                   placeholder="Please enter the amout of TRX">
            <div class="trx-b"> <samp class="trx-b1">You will get WTRX:</samp><samp class="wtrx-b2">{{trxNum?trxNum:'0'}}</samp></div>
            <div class="wtr-btn">
              <el-button class="from_botton"
                         :loading="btnLoading1"
                         :disabled="btnDisabled1"
                         @click="changeWtrx">Confim</el-button>
            </div>

          </div>
          <div class="wtrx-right">
            <samp class="wtrx1">WTRX <img class="wtrx_img"
                   src="@/assets/img/icon_arrow_right.png"
                   alt=""> TRX</samp>
            <div class="wtrx-a"> <samp class="wtrx-a1">WTRX Balance:</samp><samp class="wtrx-a2">{{wtrxBalance}}</samp> </div>
            <input type="number"
                   v-model="wtrxNum"
                   :disabled="inputdisabled1"
                   onKeypress="return (/[\d,.]/.test(String.fromCharCode(event.keyCode)))"
                   placeholder="Please enter the amout of TRX">
            <div class="wtrx-b"> <samp class="wtrx-b1">You will get TRX:</samp><samp class="wtrx-b2">{{wtrxNum?wtrxNum:0}}</samp></div>
            <div class="wtr-btn ">
              <el-button class="from_botton"
                         :loading="btnLoading2"
                         :disabled="btnDisabled2"
                         @click="getAllowance">Confim</el-button>
            </div>
          </div>
        </div>

        <div class="wtrx-bottom">
          <p>What is WTRX?</p>
          <p>TRX is the native asset of TRON, and WTRX is a TRC20 Token with the equivalent value to TRX.
            <br> DepositTRX to mint an equivalent amount of WTRX, and burn WTRX to get an equivalent amount of TRX.
          </p>
          <p>Can WTRX exchange to other TRC20 Tokens?</p>
          <p>WTRX is a TRC20 Token, you can swap to any other TRC20 Tokens on FoxDex.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ipConfig from '../../config/ipconfig.bak'
import { approved, allowance } from '../../utils/tronwebFn'
export default {
  data () {
    return {
      wtrxContract: null,
      trxBalance: 0,
      wtrxBalance: 0,
      approveBalance: 0,
      trxNum: null,
      wtrxNum: null,
      btnDisabled1: true,
      btnDisabled2: true,
      inputdisabled1: true,
      inputdisabled2: true,
      btnLoading1: false,
      btnLoading2: false,
    };
  },
  computed: {

  },
  watch: {
    trxNum (value) {
      this.trxNum = this.inputType(this.trxNum)
      if (value != '') {
        if (value <= parseInt(this.trxBalance)) {
          this.btnDisabled1 = false;
          return;
        }
        this.btnDisabled1 = true
      } else {
        this.btnDisabled1 = true;
      }
    },
    wtrxNum (value) {
      this.wtrxNum = this.inputType(this.wtrxNum)
      if (value != '') {
        if (value <= parseInt(this.wtrxBalance)) {
          this.btnDisabled2 = false;
          return;
        }
        this.btnDisabled2 = true
      } else {
        this.btnDisabled2 = true;
      }
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.gettrx();
        that.getWtrxContract()
      })
    },
    gettrx () {
      var that = this;
      window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58).then(function (account) {
        that.trxBalance = window.tronWeb.fromSun(account.balance)
      });
    },
    async getWtrxContract () {//链接wtrx合约
      this.wtrxContract = await window.tronWeb.contract().at(ipConfig.wtrxAddress);
      if (this.wtrxContract) {
        this.getWtrx()
      }
    },
    async getWtrx () {//获取wtrxbalance
      let that = this
      try {
        let res = await that.wtrxContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
        that.wtrxBalance = window.tronWeb.fromSun(res);
        this.inputdisabled1 = false
        this.inputdisabled2 = false
      } catch (error) {
        console.log(error);
      }
    },
    async changeWtrx () {//兑换wtrx
      let that = this;
      this.loading1(1);
      try {
        let res = await that.wtrxContract["deposit"]().send({
          feeLimit: 100000000,
          callValue: window.tronWeb.toSun(that.trxNum),
          tokenId: 0,
          shouldPollResponse: true
        });
        if (res) {
          this.getWtrx();
          this.gettrx();
        }
        this.loading1();
      } catch (error) {
        if (error == "Confirmation declined by user") {
          alert('拒绝合约');
        }
        this.loading1();
        console.log(error);
      }
    },
    getAllowance () {//查询授权
      let that = this;
      that.loading2(1);
      allowance(ipConfig.wtrxAddress, ipConfig.wtrxAddress).then((res) => {
        if (res) {
          let approveBalance = window.tronWeb.toSun(res._hex)
          if (approveBalance == 0) {
            alert('未授权请先授权');
            approved(ipConfig.wtrxAddress, ipConfig.wtrxAddress)
            that.loading2(0);
          } else {
            that.changeTrx()
          }
        } else {
          that.loading2();
        }
      })
    },
    async changeTrx () {//兑换trx
      let that = this;
      let contractAddress = ipConfig.wtrxAddress;
      let functionSelector = 'withdraw(uint256)';
      let options = {};
      let parameter = [{ type: 'uint256', value: window.tronWeb.toSun(this.wtrxNum) }];
      try {
        let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector, options, parameter);
        if (!transaction.result || !transaction.result.result) {
          that.loading2(0);
          return console.error('Unknown error: ' + transaction, null, 2);
        }
        window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function () {
            alert('success');
            that.getWtrx();
            that.gettrx();
            that.loading2(0);

          });
        });
      } catch (error) {
        that.loading2(0);
        console.log(error);
      }

    },
    loading1 (n) {
      if (n) {
        this.btnLoading1 = true;
        this.btnDisabled1 = true;
      } else {
        this.btnLoading1 = false;
        this.btnDisabled1 = false;
      }
    },
    loading2 (n) {
      if (n) {
        this.btnLoading2 = true;
        this.btnDisabled2 = true;
      } else {
        this.btnLoading2 = false;
        this.btnDisabled2 = false;
      }

    },
    inputType (n) {
      if (n.indexOf(".") != -1) {
        let str = n.split(".");
        if (str[1].length > 8) {
          return n = str[0] + '.' + str[1].slice(0, 8);
        }
      }
      return n;
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.from_botton{
  background: #05C98E;
}
.wtrx {
  color: #0f1730;
}
.wtrx-box {
  height: 800px;
  /* background: #cccc; */
  padding-top: 120px;

  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wtrx-box1 {
  // margin-top: 40px;
  display: flex;
  justify-content: center;
}

.wtrx-left {
  margin-right: 15px;
  border-radius: 20px;
  background: #ffffff;
  width: 400px;
  height: 386px;
  top: 240px;
  left: 531px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .trx {
    margin-top: 49px;
    height: 28px;
    font-size: 24px;
    font-family: roboto-mediumitalic;
    font-weight: 500;
    color: #0f1730;
    line-height: 28px;
 
  }
  .trx-a {
    margin-top: 40px;

    .trx-a1 {
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0F1730;
      line-height: 21px;
      
        .trx-a2 {
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0F1730;
      line-height: 21px;

      .trx-a2 {
        height: 21px;
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #0f1730;
        line-height: 21px;
      }
    }
  }
  .trx-b {
    margin-top: 48px;
    .trx-b1 {
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0f1730;
      line-height: 21px;
      .trx-b2 {
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0F1730;
      line-height: 21px;
      
    }
    }
  }
}

.wtrx-left input {
  box-sizing: border-box;
  padding-left: 50px;
  margin-top: 12px;
  font-size: 16px;
  font-family: roboto-mediumitalic;
  font-weight: 400;
  color: #878b97;
  line-height: 18px;
  width: 320px;
  height: 48px;
  background: #f4f5fa;
  border-radius: 24px;
}
.wtrx-right {
  width: 400px;
  height: 386px;
  border-radius: 20px;
  background: #fff;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .wtrx1 {
    margin-top: 49px;  
  height: 28px;
  font-size: 24px;
  font-family: roboto-mediumitalic;
  font-weight: 500;
  color: #0F1730;
  line-height: 28px;
  }
  .wtrx-a {
    margin-top: 39px;

    .wtrx-a1 {
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0f1730;
      line-height: 21px;
    .wtrx-a2{

      
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0F1730;
      line-height: 21px;

    }
    }
  }
  .wtrx-b {
    margin-top: 48px;
    .wtrx-b1 {
      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0f1730;
      line-height: 21px;
    .wtrx-b2{

      height: 21px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #0F1730;
      line-height: 21px;
     }
    } 
  }
}

.wtrx-right input {
  box-sizing: border-box;
  font-size: 16px;
  font-family: roboto-mediumitalic;
  color: #878b97;
  line-height: 18px;
  margin-top: 12px;
  width: 320px;
  height: 48px;
  background: #f4f5fa;
  border-radius: 24px;
  padding-left: 50px;
}

.wtr-btn {
  width: 320px;
  height: 56px;
  margin: 0 auto;
  margin-top: 16px;
}

.wtrx-bottom {
  width: 860px;
  height: 300px;
}
.wtrx-bottom p:nth-child(1) {
  font-family: roboto-mediumitalic;
  font-weight: 400;
  font-size: 18px;
  margin-top: 48px;
  text-align: center;
  line-height: 21px;
  color: #0f1730;
}
.wtrx-bottom p:nth-child(2) {

  font-family:roboto;
  font-weight: 400;
  margin-top: 8px;
  font-size: 18px;
  color: #878B97;
  text-align: center;
  line-height: 24px;
}
.wtrx-bottom p:nth-child(3) {
  
  font-family: roboto-mediumitalic;
  font-weight: 500;
  margin-top: 24px;
  color: #0f1730;
  text-align: center;
}
.wtrx-bottom p:nth-child(4) {
  font-family: roboto;
  font-weight: 400;
  margin-top: 8px;
  color: #878b97;
  text-align: center;
}
.wtrx_img {
  vertical-align: sub;
  margin: 0 4px;
  cursor: pointer;
}
.wtrx-b2 {
  max-width: 220px;
  overflow: hidden;
  vertical-align: middle;
  display: inline-block;
  margin-top: -2px;
}

@media screen and (max-width: 750px) {
  .wtrx {
    .wtrx-box1 {
      flex-wrap: wrap;
      .wtrx-right {
        margin: 0;
        font-size: 0.5rem;
        .wtrx-a {
          margin-top: 20px;
        }
        .trx-b {
          margin-top: 1rem;
        }
      }
      .wtrx-left {
        margin: 0;
        margin-bottom: 20px;
        font-size: 0.5rem;
        .trx-b {
          margin-top: 1rem;
        }
        .trx-a {
          margin-top: 20px;
        }
        .trx-a2 {
        }
      }
    }
    .wtrx-box{
        padding-top: 10px;
        height: 100%;
    }
    .wtrx-bottom{
      width: 100%;
      font-size: 0.4rem;
      p:nth-child(2),p:nth-child(4){
          font-size: 0.3rem;
      }
      p:nth-child(4){
        padding-bottom: 1rem;
      }
    }
  }
}
</style>
