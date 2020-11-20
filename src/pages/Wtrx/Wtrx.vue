<template>
<div class="wtrx">
 <div class="wtrx-box"> 
    <div class="wtrx-top">
      <h3>WTROX Exchange</h3>
    </div>

    <div class="wtrx-box1">
      <div class="wtrx-left">
        <samp class="trx">TRX->WTRX</samp>
        <div class="trx-a"> <samp class="trx-a1">TRX Balance:</samp><samp class="trx-a2"> {{trxBalance}}</samp> </div>
        <input type="text" v-model="trxNum" placeholder="Please enter the amout of TRX">
        <div class="trx-b"> <samp class="trx-b1">You will get WTRX:</samp><samp class="trx-b2">{{trxNum}}</samp></div>
        <button @click="changeWtrx">Confim</button>
      </div>
      <div class="wtrx-right">
        <samp class="wtrx1">WTRX->TRX</samp>
        <div class="wtrx-a"> <samp class="wtrx-a1">TRX Balance:</samp><samp class="wtrx-a2">{{wtrxBalance}}</samp> </div>
        <input type="wtext"  v-model="wtrxNum" placeholder="Please enter the amout of TRX">
        <div class="wtrx-b"> <samp class="wtrx-b1">You will get TRX:</samp><samp class="wtrx-b2">{{wtrxNum}}</samp></div>
        <button @click="allowance">Confim</button>
      </div>
    </div>

    <div class="wtrx-bottom">
      <p>what is WTRX?</p>
      <p>TRX is the native asset of TRON, and WTRX is a TRC20 Token with the equivalent value to TRX.
      <br> DepositTRX to mint an equivalent amount of WTRX, and burn WTRX to get an equivalent amount of TRX.</p>
      <p>Can WTRX exchange to other TRC20 Tokens?</p>
      <p>WTRX is a TRC20 Token, you can swap to any other TRC20 Tokens on FoxDex.</p>
    </div>
  </div>
</div>
</template>
<script>
import ipConfig from '../../config/ipconfig.bak'
export default {
  data() {
    return {
      wtrxContract:null,
      trxBalance:0,
      wtrxBalance:0,
      approveBalance:0,
      trxNum:null,
      wtrxNum:null,
    };
  },
  computed: {
    
  },
  created() {
    this.init()
  },
  methods: {
    init(){//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58).then(function (account) {
          that.trxBalance = window.tronWeb.fromSun(account.balance)
        });
        that.getWtrxContract()
      })
    },
    async getWtrxContract(){//链接wtrx合约
      this.wtrxContract = await window.tronWeb.contract().at(ipConfig.wtrxAddress);
      if(this.wtrxContract){
        this.getWtrx()
      }
    },
    async getWtrx(){//获取wtrxbalance
      let that = this
        try {
            let res = await that.wtrxContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
            that.wtrxBalance = window.tronWeb.fromSun(res)
        } catch (error) {
            console.log(error);
        }
    },
    async changeWtrx(){//兑换wtrx
        let that = this
        try {
            let res = await that.wtrxContract["deposit"]().send({
              feeLimit:100000000,
              callValue:window.tronWeb.toSun(that.trxNum),
              tokenId:0,
              shouldPollResponse:true
            });
            if(res){
              window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    },
    async allowance(){//查询授权
      let that = this
      try {
          let res = await that.wtrxContract["allowance"](window.tronWeb.defaultAddress.base58,ipConfig.wtrxAddress).call()
          if(res){
            let approveBalance = window.tronWeb.toSun(res._hex)
            if(approveBalance==0){
              that.approved()
            }else{
              that.changeTrx()
            }
          }
      } catch (error) {
          console.log(error);
      }
    },
    async approved(){//授权
      let that = this
      try {
          let res = await that.wtrxContract["approve"](ipConfig.wtrxAddress,0xe8d4a51000).send()
          if(res){
            alert('授权成功')
            that.changeTrx()
          }
      } catch (error) {
          console.log(error);
      }
    },
    async changeTrx(){//兑换trx
      let contractAddress = ipConfig.wtrxAddress
      let functionSelector = 'withdraw(uint256)';
      let options = {}
      let parameter = [{type:'uint256',value:window.tronWeb.toSun(this.wtrxNum)}]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector, options,parameter);
      if (!transaction.result || !transaction.result.result)
          return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function () {
            alert('success');
            window.location.reload();
        });
      });
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
.wtrx {
  height: 1008px;
  background: #0f1522;
}
.wtrx-box {
  height: 800px;
  /* background: #cccc; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wtrx-box1 {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.wtrx-top {
  /* float: left; */
  margin-top: 145px;
  font-size: 24px;
  color: #ffffff;
}
.wtrx-left {
  margin-right: 15px;
  background: #171f30;
  border-radius: 20px;
  width: 400px;
  height: 352px;
  top: 240px;
  left: 531px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .trx {
    margin-top: 40px;
    color: #ffffff;
    font-size: 20px;
  }
  .trx-a {
    margin-top: 40px;
    color: #ffffff;

    .trx-a1 {
      font-size: 18px;
    }
  }
  .trx-b {
    margin-top: 40px;
    color: #ffffff;
    .trx-b1 {
      font-size: 18px;
    }
  }
}

.wtrx-left input {
  box-sizing: border-box;
  padding-left: 50px;
  margin-top: 12px;
  font-size: 16px;
  font-family: ArialMT;
  color: #878b97;
  line-height: 18px;
  width: 320px;
  height: 48px;
  background: #0f1522;
  border-radius: 24px;
}

.wtrx-left button {
  margin-top: 12px;
  width: 320px;
  height: 48px;
  background: linear-gradient(136deg, #fdab2b 0%, #df0019 100%);
  border-radius: 24px;

  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  line-height: 21px;
}

.wtrx-right {
  width: 400px;
  height: 350px;
  border-radius: 20px;
  background: #171f30;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .wtrx1 {
    margin-top: 40px;
    color: #ffffff;
    font-size: 20px;
  }
  .wtrx-a {
    margin-top: 40px;
    color: #ffffff;

    .wtrx-a1 {
      font-size: 18px;
    }
  }
  .wtrx-b {
    margin-top: 40px;
    color: #ffffff;
    .wtrx-b1 {
      font-size: 18px;
    }
  }
}

.wtrx-right input {
  box-sizing: border-box;
  font-size: 16px;
  font-family: ArialMT;
  color: #878b97;
  line-height: 18px;
  margin-top: 12px;
  width: 320px;
  height: 48px;
  background: #0f1522;
  border-radius: 24px;
  padding-left: 50px;
}

.wtrx-right button {
  margin-top: 12px;

  width: 320px;
  height: 48px;
  background: linear-gradient(136deg, #fdab2b 0%, #df0019 100%);
  border-radius: 24px;
  color: #ffffff;
  font-size: 18px;
  line-height: 21px;
}

.wtrx-bottom {
  width: 860px;
  height: 300px;
}
.wtrx-bottom p:nth-child(1) {
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
  margin-top: 42px;
  text-align: center;
  line-height: 21px;
}
.wtrx-bottom p:nth-child(2) {
  margin-top: 8px;
  font-weight: bold;
  font-size: 18px;
  color: #a6aeb7;
  text-align: center;
  line-height: 24px;
  font-family: Arial-BoldMT, Arial;
  font-weight: normal;
}
.wtrx-bottom p:nth-child(3) {
  margin-top: 20px;
  color: #ffffff;
  text-align: center;
}
.wtrx-bottom p:nth-child(4) {
  margin-top: 8px;
  font-weight: bold;
  color: #a6aeb7;
  text-align: center;
}
</style>
