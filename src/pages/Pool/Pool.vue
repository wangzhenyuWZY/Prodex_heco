<template>
  <div class="container">
    <div class="pool">
      <div class="pool-top">
        <h1 @click="createBPool">Pool</h1>
      </div>
      <!-- <addfrombox/> -->
      <!-- <connectbox/> -->
      <!-- <selctoken/> -->
      <!-- <AddLiquidity /> -->
      <!-- <recevive/> -->
        <!-- <willRecevive/> -->
              <!-- <liquidity/> -->
    <!-- <vAlret/> --> 
   
    <!-- <AddLiquidity/> -->
    <!-- <liquidity/> -->
    <!-- <Pool1/> -->
    <!-- <Pool2/> -->

     
    </div>
  </div>

</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
import success from '@/assets/img/icon_successfully.svg';
import err from '@/assets/img/icon_faile.svg';
import failure from '@/assets/img/icon_faile.svg';
import AddLiquidity from './AddLiquidity'
import liquidity from './liquidity'
import vAlret from './valret'
import selctoken from './selctToken';
import recevive from './recevive';
import willRecevive from './willRecevive';
import addfrombox from './addfrombox';
import connectbox from './Connectbox'
//import liquidity from './liquidity'
// import Pool1 from './Pool1'
import Pool2 from './Pool2'

export default {
  data () {
    return {
      test: '12',
      ppd: {
        a: 1,
        b: 2,
        c: 3
      },
      types1: 'failure',
      test1: '0',
      showAlert: true,
      types2: {
        success,
        err,
        failure,
      }
    }
  },
  components: {
    // addfrombox
    // connectbox
    // selctoken
    // AddLiquidity,
      // recevive
      //  willRecevive
    // liquidity
    // Pool2
    // vAlret
  },    

  created () {
    this.init()
    
  },
  methods: {
    init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.getBFactoryContract()
        that.checkBind()
      })
    },
    async getBFactoryContract(){//链接BFactory合约
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory);         
    },
    async createBPool () {//newBPool
      let that = this
        try {
          if(this.BFactoryContract){
            let res = await that.BFactoryContract["newBPool"]().send({
              feeLimit:100000000,
              callValue:0,
              tokenId:0,
              shouldPollResponse:true
            })
            if(res){
              that.getWtrxContract(res)
            }
          }
        }
        catch (error) {
          console.log(error);
        }
    },
    async getWtrxContract(res){
      this.wtrxContract = await window.tronWeb.contract().at('TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq');
      if(this.wtrxContract){
        this.approved(res)
      }
    },
    async approved(data){//授权
      let that = this
      try {
          let res = await that.wtrxContract["approve"](data,0xe8d4a51000).send({shouldPollResponse:true})
          if(res){
            alert('授权成功')
            that.getBPoolContract(data)
          }
      } catch (error) {
          console.log(error);
      }
    },
    async getBPoolContract(bPollContract){
      var functionSelector = 'bind(address,uint256,uint256)';
      var parameter = [
          {type: 'address', value: 'TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq'},
          {type: 'uint256', value: 100},
          {type: 'uint256', value: 10},
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(bPollContract,functionSelector, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
              console.log(res)
              alert('success');
              // window.location.reload();
          });
      }) 
    },
    async checkBind(){
      var functionSelector = 'isBound(address)';
      var parameter = [{type: 'address', value: 'TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq'}]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TB7DMRPWsnd2yxvBeoeyz1sHLBghRA9EBn',functionSelector,{}, parameter,'TA6mdQTHYA6orGU2Wj97BXDThHjntCwXE4');
      console.log(transaction)

      //  const parameter1 = []
      // const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract("419e62be7f4f103c36507cb2a753418791b1cdc182", "name()", {},
      //   parameter1,"417946F66D0FC67924DA0AC9936183AB3B07C81126");
      //   console.log(transaction)
      //  window.tronWeb.trx.sendRawTransaction(transaction).then(function (res) {
      //         console.log(res)
      //                     alert('success');
      //                     // window.location.reload();
      //  });
    }
  }

}
</script>

<style lang="scss" >
.demo {
  --demostyle: red;
  color: var(--demostyle);
}

.pool {
  /* position: relative; */
}

.pool-box2 {

   border-radius: 0 0 20px 20px;
  .pool_boxbg{
    display: flex;
    height: 360px;
    flex-direction: column;
    padding-top: 40px;
    padding-left: 30px;
    background: #fff;
    background: url(../../assets/img/pool_bg.png) no-repeat;
    background-size: 240px 219px;
    background-position: 460px 140px;
    
  }
  
  .pool-p1 {
    width: 360px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    color: #a6aeb7;
    line-height: 21px;
    margin-top: 32px;
  }
  .pool-p2 {
    width: 380px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    color: #a6aeb7;
    line-height: 21px;
    margin-top: 32px;

    .pool-p3 {
      width: 76px;
      height: 20px;
      font-size: 18px;
      font-family: ArialMT;
      color: #ff5d37;
      line-height: 21px;
    }
  }

  .pool-butt {
    width: 100%;
    display: flex;
    justify-items: center;
    margin-top: 24px;
    .pool-p {
    margin: auto 0;
    width: 130px;
    height: 28px;
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #0F1730;
    line-height: 23px;

     }
    .pool-butt1 {
      margin-left: 70px;
      width: 200px;
    }
    .pool-butt2 {
      margin-left: 22px;
      width: 200px;
    }
  }
}

.pool-top {
  box-sizing: content-box;
  padding-top: 40px;
  margin-bottom: 16px;
  width: 52px;
  height: 27px;
  margin: 0 auto;
  overflow: hidden;
  color: #0f1730;
  font-size: 24px;
  margin-bottom: 9px;
}
.pool-box {
  margin: 0 auto;
  width: 690px;
  height: 506px;
  border-radius: 20px;



}

.pool-box1 {
  width: 100%;
  height: 216px;
  background: url(../../assets/img/bg_pool.png) no-repeat;
  background-size: cover;
}
.pool-box1 p:nth-child(1) {
  box-sizing: content-box;
  padding-top: 40px;
  margin-left: 32px;
  font-size: 20px;
  font-family: ArialMT;
  color: #eeeef0;
  line-height: 23px;
}
.pool-box1 p:nth-child(2) {
  margin-top: 12px;
  width: 660px;
  margin-left: 32px;
  font-size: 18px;
  font-family: ArialMT;
  color: #eeeef0;
  line-height: 21px;
}
.pool-box1 p:nth-child(3) {
  margin-top: 24px;
  font-size: 18px;
  margin-left: 32px;
  font-family: ArialMT;
  color: #e5ebf2;
  line-height: 21px;
  text-decoration: underline;
}
.title {
  height: 71px;
  line-height: 71px;
  border-bottom: 1px solid #e5ebf2;
  padding: 0 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .content_text {
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #0f1730;
    margin-left: 12px;
  }
  img {
    vertical-align: middle;
    cursor: pointer;
  }
  .lt_icon {
    margin-right: 12px;
  }
  .rg_icon {
    img {
      width: 32px;
      height: 32px;
    }
  }
}

.box_sizes {
  background: #f4f5fa;
  border-radius: 16px;
  // padding: 29px 0;
  font-family: ArialMT;

}
.v_alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 480px;
  height: 438px;
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  .alert_type {
    .success {
      margin-top: 97px;
    }
    .failure {
      margin-top: 60px;
    }
  }
  .alert_size {
    font-size: 18px;
    font-family: ArialMT;
    color: #e5ebf2;
    margin-top: 7px;
    text-align: center;
  }
  .alert_btn {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ff5d37;
    margin: 0 auto;
    font-size: 20px;
    font-family: ArialMT;
    color: #ff5d37;
    background: none;
  }
  .failure_size{
    font-size: 14px;
    font-family: ArialMT;
    color: #878B97;
    margin-top: 24px;
    margin-bottom: 8px;
  }
}
</style>