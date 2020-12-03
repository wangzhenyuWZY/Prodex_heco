<template>
  <div class="container createpair">
    <container top="40">
      <div class="title"
           slot="title">
        <div class="lt_box">
          <router-link to="/pool">
            <span class="icon_box">
              <i class="el-icon-back back_icon"></i>
            </span>
          </router-link>
          <span class="content_text">Create a pair</span>
        </div>
        <div class="rg_box">
          <el-tooltip class="item" 
                  effect="dark" 
                  content="Right Center 提示文字" 
                  placement="left">
                  <img src="@/assets/img/icon_instructions.svg" alt="">
                </el-tooltip>
        </div>
      </div>
      <div slot="body">
        <div class="box_sizes pari__mag">
          <div class="provider ">
            <div class="">
              <div class=" pair_ved">
                <p class="pair_title">You are the first liquidity provider.</p>
                <p class="pair_size pair_mag">The ratio of tokens you add will set the price of this pool.</p>
                <p>Once you are happy with the rate click supply to review.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="setInput  clearfix">
          <div class="ctx_1    fl_lt">
            <frominput lable="Input"
                        showmax
                       v-model="firstTokenNum"></frominput>
          </div>
          <div class="ctx_2   fl_lt">
            <frominput lable="weight"
                       placeholder="1-50"
                       v-model="firstTokenWeight"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect :balance="token1.balance"
                       @click="showSelect(0)"
                       :imgUrl="token1.img"
                       :showSelect="JSON.stringify(token1)!='{}'"
                       :text="token1.name" />
          </div>
        </div>

        <div class="from_contentIcon">
          <i class="el-icon-plus tran_icon"></i>
        </div>
        <div class="setInput  clearfix">
          <div class="ctx_1    fl_lt">
            <frominput lable="Input"

                       v-model="secondTokenNum"
                       showmax
                       
                       ></frominput>
          </div>
          <div class="ctx_2   fl_lt">
            <frominput lable="weight"
                       placeholder="1-50"
                       v-model="secondTokenWeight"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect @click="showSelect(1)"
                       :balance="token2.balance"
                       :imgUrl="token2.img"
                       :showSelect="JSON.stringify(token2)!='{}'"
                       :text="token2.name" />
          </div>
        </div>
        <div class="Price_text"
             v-show="login">
          <span>Price: </span>
          <span>0.0020495 </span>
          <span> ETH </span>
          <span> per </span>
          <span> DAI </span>
          <img src="@/assets/img/icon_slect.png"
               alt="">
        </div>
        <div class="whe clearfix">

          <span class="pair_mandate"
                v-show="false">
            <el-button class="from_botton pair_mandate  pair_mandate_btb"> Mandate</el-button>
          </span>
          <el-button class="from_botton pair_mandate pair_swap "
                     :loading="btnLoading1"
                     :disabled="disabled1"
                     @click="handel"> Swap</el-button>
        </div>
        <div class="setInput pair_input clearfix">
         
         <span class="ctw"> <div class="ctx_1 fl_lt ">
            <frominput 
            lable="Sponsors"
            placeholder="Please Enter" 
            v-model="sponsors">
            </frominput>
          </div></span>

          <div class="ctx_2 fl_lt ">
            <frominput 
            lable="FoxDex"
            placeholder="Please Enter" 
            v-model="foxDex">
            </frominput>
          </div>
          <div class="ctx_3 fl_lt ">
            <frominput 
            lable="LP"
            placeholder="Please Enter" 
            v-model="lp">
            </frominput>
          </div>
        </div>
      </div>
      <div slot="footer"
           v-show="login"
           class="position">
        <div class="box_sizes connect_boxs">
          <div class="provider c_receove_Share ">
            <div class="">
              <div class="received">
                <div class="lt">
                  <span>Minimum received <img src="@/assets/img/icon_instructions.svg"
                         alt=""></span>
                </div>
                <span class="rgs">441.4 aDAI</span>
              </div>
              <div class="received setmage">
                <div class="lt">
                  <span>Price Impacte <img src="@/assets/img/icon_instructions.svg"
                         alt=""></span>
                </div>
                <span class="rec_red">5.30%</span>
              </div>
              <div class="received">
                <div class="lt">
                  <span>Liquidity Provider Fee <img src="@/assets/img/icon_instructions.svg"
                         alt=""></span>
                </div>
                <span class="">0.003 ETH</span>
              </div>
              <div class="fees_account">View pair analytics <img src="@/assets/img/icon_jump_green.png"
                     alt=""></div>
            </div>
          </div>
        </div>
      </div>
    </container>
    <selctoken :showAlert='isSelect'
               :item='item'
               @closeAlert="isSelect=false"
               @change="changeCoin" />
    <valert :isShow="showAlert1"
            :url="typeUrl"
            @close='showAlert1=false' />

  </div>
</template>

<script>
const Decimal = require('decimal.js');
import { container, frominput, setselect } from '../../components/index'
import selctoken from './selctToken';
import ipConfig from '../../config/ipconfig.bak'
import { approved, decimals, getConfirmedTransaction } from '../../utils/tronwebFn'
import valert from './valret';
export default {
  data () {
    return {
      token1: {},
      token2: {},
      isSelect: false,
      item: 1,
      login: false,
      firstTokenNum: '',
      firstTokenWeight: '',
      secondTokenNum: '',
      secondTokenWeight: '',
      sponsors: 0,
      foxDex: 0,
      lp: 0,
      BFactoryContract: null,
      firstCoinContract: null,
      bPoolContract: null,
      token1IsBind: false,
      token2IsBind: false,
      showAlert1: false,
      typeUrl: '',
      btnLoading1: false,
      disabled1: false

    }
  },
  components: {
    container,
    frominput,
    setselect,
    selctoken,
    valert
  },
  created () {
    this.init()
  },
  methods: {
    handel () {
      // this.login = !this.login
      if (!this.firstTokenNum || this.firstTokenNum == 0 || this.firstTokenNum == '' || !this.secondTokenNum || this.secondTokenNum == 0 || this.secondTokenNum == '') {
        this.$message({
          message: '请输入添加数量',
          type: 'error'
        });
        return
      } else if (!this.firstTokenWeight || this.firstTokenWeight == 0 || this.firstTokenWeight == '' || !this.secondTokenWeight || this.secondTokenWeight == 0 || this.secondTokenWeight == '') {
        this.$message({
          message: '请输入权重',
          type: 'error'
        });
        return
      } else if ((this.firstTokenWeight + this.secondTokenWeight) > 50) {
        this.$message({
          message: '权重相加不能大于50',
          type: 'error'
        });
        return
      }
      this.createBPool()
    },
    init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.getBFactoryContract()
        that.getSwapFeeForDex()
        // that.checkBind(that.bPoolContract)
        // that.unBindCoin();
      })
    },
    async getBFactoryContract () {//链接BFactory合约
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory);
    },
    async getSwapFeeForDex () {
      var functionSelector = 'swapFeeForDex()';
      var parameter = []
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(ipConfig.FactoryManager, functionSelector, {}, parameter);
      this.foxDex = parseInt(transaction.constant_result[0], 16)
    },
    loading1 (n) {
      if (n) {
        this.disabled1 = true;
        this.btnLoading1 = true;
      } else {
        this.disabled1 = false;
        this.btnLoading1 = false;
      }
    },
    async createBPool () {//newBPool
      let that = this;
      this.loading1(1);
      this.showAlert1 = true;
      this.typeUrl = window.tronWeb.defaultAddress.base58;
      this.$message({
        message: '成功，请等待区块确认',
        type: 'error'
      });
      try {
        if (this.BFactoryContract) {
          let res = await that.BFactoryContract["newBPool"]().send({
            feeLimit: 1000000000,
            callValue: 0,
            tokenId: 0,
            shouldPollResponse: true
          })
          if (res) {
            that.bPoolContract = res
            that.setSwapLpFee()
            that.setSponsors()
            approved(that.token1.address, that.bPoolContract).then(() => {
              approved(that.token2.address, that.bPoolContract).then(() => {
                let number = window.tronWeb.toBigNumber(that.firstTokenNum * Math.pow(10, that.token1.decimals)).toString(10)
                let weight = window.tronWeb.toBigNumber(that.firstTokenWeight * Math.pow(10, 18)).toString(10)
                that.bindCoin(that.token1.address, number, weight, 'token1IsBind')
                let number2 = window.tronWeb.toBigNumber(that.secondTokenNum * Math.pow(10, that.token2.decimals)).toString(10)
                let weight2 = window.tronWeb.toBigNumber(that.secondTokenWeight * Math.pow(10, 18)).toString(10)
                that.bindCoin(that.token2.address, number2, weight2, 'token2IsBind')
                that.loading1();
              })
            })

          }
        }
      }
      catch (error) {
        that.loading1();
          this.$message({
        message: '系统错误',
        type: 'error'
      });
        console.log(error);
      }
    },
    async setSwapLpFee () {//设置LP
      if (this.lp == 0) {
        return
      }
      var functionSelector = 'setSwapLpFee(uint256)';
      var parameter = [{ type: 'uint256', value: this.lp * Math.pow(10, 18) }]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.bPoolContract, functionSelector, { shouldPollResponse: true }, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
          alert('success');
        });
      })
    },
    async setSponsors () {//设置sponsors
      if (this.sponsors == 0) {
        return
      }
      var functionSelector = 'setSwapBuilderFee(uint256)';
      var parameter = [{ type: 'uint256', value: this.sponsors * Math.pow(10, 18) }]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.bPoolContract, functionSelector, { shouldPollResponse: true }, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
          alert('success');
        });
      })
    },
    async finalize (address) {
      let that = this
      var functionSelector = 'finalize()';
      var parameter = []
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(address, functionSelector, { shouldPollResponse: true }, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
          alert('success');
        });
      })
    },
    async bindCoin (address, balance, weight, name) {//绑定币种
      let that = this
      var functionSelector = 'bind(address,uint256,uint256)';
      var parameter = [
        { type: 'address', value: address },
        { type: 'uint256', value: balance },
        { type: 'uint256', value: weight },
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.bPoolContract, functionSelector, { shouldPollResponse: true }, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      let signedTransaction = await window.tronWeb.trx.sign(transaction.transaction)
      let res = await window.tronWeb.trx.sendRawTransaction(signedTransaction)
      if (res) {
        getConfirmedTransaction(res.txid).then((result) => {
          if (name == 'token1IsBind')
            that.token1IsBind = true
          if (name == 'token2IsBind')
            that.token2IsBind = true
          if (that.token1IsBind && that.token2IsBind) {
            that.finalize(that.bPoolContract)
          }
        })
      }
      // window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
      //     window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
      //         alert('success');
      //     });
      // }) 
    },
    async unBindCoin () {//解除绑定
      let that = this
      var functionSelector = 'unbind(address)';
      var parameter = [
        { type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C' }
      ]
      let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract('TR51WC82auiTArBttVTUCDgYSJ9bw7363t', functionSelector, {}, parameter);
      if (!transaction.result || !transaction.result.result)
        return console.error('Unknown error: ' + transaction, null, 2);
      window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
          alert('success');
        });
      })
    },
    async checkBind () {//检查是否绑定
      var functionSelector = 'isBound(address)';
      var parameter = [{ type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C' }]
      let transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TR51WC82auiTArBttVTUCDgYSJ9bw7363t', functionSelector, {}, parameter);
      console.log(window.tronWeb.toDecimal(transaction.constant_result[0]))
    },
    changeCoin (token) {
      let that = this
      this.isSelect = false
      decimals(token.address).then((res) => {
        token.decimals = res
        token.item == 0 ? this.token1 = token : this.token2 = token
        that.getBalance(token)
      })
      if (this.token1.address && this.token2.address) {
        // this.getSpotPrice(this.token1.address,this.token2.address)
      }
    },
    async getBalance (token) {//获取余额
      let that = this
      let tokenContract = await window.tronWeb.contract().at(token.address)
      let tokenBalance = await tokenContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
      if (tokenBalance) {
        let balance = parseFloat(tokenBalance, 16) / Math.pow(10, token.decimals)
        token.item == 0 ? that.token1.balance = balance : that.token2.balance = balance
      }
    },
    // async getSpotPrice(){
    //   await 
    // },
    showSelect (index) {
      this.isSelect = true
      this.item = index
    }
  },
}
</script>

<style  scoped>

</style>
<style lang="scss" scoped>

.from_lable{
  // width: 200px;
  // padding-left: -16px;
}
.title {
  // height: 72px;
}
.createpair {
  padding-top: 120px;

  .whe {
    margin-top: 16px;
    display: flex;
  }
  .whe_img {
    vertical-align: sub;
  }

  .ctx_1 {
    width: 160px;
    display: inline-block;
  }
  .ctx_2 {
    width: 96px;
    display: inline-block;

    margin: 0 12px;
  }
  .ctx_3 {
    width: 160px;
    display: inline-block;
   
    margin: 0;
  }
  .selct_3 {
    margin-left: 23px;
    width: 190px;
  }
  .pari__mag {
    margin-bottom: 32px;
  }
  .pair_ved {
    text-align: center;
    padding: 24px 0;
    p {
      font-size: 16px;
      color: #878b97;
    }
    .pair_title {
      font-size: 20px;
      font-weight: bold;
      color: #0f1730;
    }
    .pair_mag {
      margin-top: 12px;
      margin-bottom: 4px;
    }
  }
  .pair_mandate {
    display: inline-block;
    width: 48%;
  }
  .from_contentIcon {
    height: 36px;
    font-size: 32px;
    font-family: roboto-mediumitalic;
    color: #0f1730;
    text-align: center;
  }
  // .add_marg{
  //   margin-left: 40px;
  //   margin-right: 29px;
  // }
  .box_top {
    padding-left: 16px;
    padding-right: 27px;
    margin-bottom: 12px;
    span {
      font-size: 20px;
    }
    span:nth-child(1) {
      float: left;
      color: #0f1730;
    }
    span:nth-child(2) {
      float: right;
      color: #05c98e;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .ctx_pair {
    width: 397px;
  }
  .box_slider {
    display: flex;
    .between {
      font-size: 56px;
      font-weight: normal;
      color: #05c98e;
      width: 144px;
    }
    .demonstration {
      flex: 1;
      padding-top: 10px;
    }
  }
  .pair_input {
    margin-top: 40px;
    padding-bottom: 48px;
   
  }
  .lt_box {
    //width: 440px;
    //height: 72px;
    // background: #000;
    .back_icon {
      color: #070a0e;
      width: 40px;
      height: 40px;
      text-align: center;
      // line-height: 40px;
      border-radius: 50%;
      background: #f4f6fc;
      cursor: pointer;
    }
  }
  .margintop {
    width: 320px;
    margin: 0 auto;
    img {
      vertical-align: sub;
      margin-right: 4px;
    }
  }
  .rece_content {
    padding: 0 24px;
  }
  .ive_top {
    margin-top: 24px;
  }
  .received {
    display: flex;
    justify-content: space-between;
    color: #0f1730;

    span {
      display: inline-block;
      // font-size: 20px;
    }
    img {
      width: 24px;
      height: 24px;
      vertical-align: sub;
      margin-right: 8px;
    }

    .setColr {
      color: #05c98e;
    }
  }
  .setSlider {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    li {
      width: 112px;
      line-height: 48px;
      border-radius: 24px;
      font-weight: normal;
      color: #ffffff;
      font-size: 20px;
      background: #0f1730;
      text-align: center;
      cursor: pointer;
    }
  }
  .add_marg {
    padding: 50px 38px 32px 39px;
  }
  .from_contentIcon {
    margin: 16px 0;
    .tran_icon {
      transform: rotate(-90deg);
      color: #0f1730;
      font-size: 32px;
      font-weight: bold;
    }
  }
  .Receive {
    padding: 24px 32px;
  }
  .weth {
    width: 200px;
    margin: 0 auto;
    margin-top: 16px;
    .weth_btn {
      background: none;
      border-radius: 28px;
      border: 1px solid#05C98E;
      font-size: 20px;
      color: #05c98e;
      padding: 0;
      width: 200px;
      height: 32px;
    }
  }
  .mount_title {
    font-size: 20px;
    font-weight: normal;
    color: #0f1730;
    padding-left: 32px;
    margin-top: 32px;
  }
  .box_Price {
    margin-top: 12px;
    span {
      font-size: 18px;
    }
  }
  .Approve_btn {
    padding: 48px 0;
    .Approve1 {
      width: 293px;
      height: 56px;
      border-radius: 25px;
      color: #878b97;
      font-size: 20px;
      border: none;
      background: #f4f5fa;
    }
    .Approve2 {
      float: right;
    }
  }
  .demonstration {
    .el-slider__button {
      border: none;
      width: 32px;
      height: 32px;
      position: relative;
    }
    .el-slider__button::before {
      content: "";
      background: #05c98e;
      width: 20px;
      height: 20px;
      line-height: 32px;
      display: inline-block;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .el-slider__bar {
      background: #0f1730;
    }
    .el-slider__runway {
      background: #0f1730;
    }
    .from_contentIcon {
      margin: 16px 0;
      .tran_icon {
        transform: rotate(-90deg);
        color: #0f1730;
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
  .Price_text {
    font-size: 20px;
    color: #0f1730;
    margin-top: 49px;
    margin-bottom: 17px;
    text-align: center;
    > img {
      vertical-align: sub;
      margin-left: 4px;
    }
  }
  .connectbox {
    padding: 0 24px 24px 24px;
    margin-top: 24px;
    .box_title {
      line-height: 50px;
      border-bottom: 1px solid #e5ebf2;
      font-size: 20px;
      color: #0f1730;
    }
  }
  .pre_list {
    margin-top: 12px;
    li {
      width: 33.3%;
      float: left;
      text-align: center;
      font-size: 18px;
      color: #0f1730;
      p:nth-child(1) {
        line-height: 25px;
        height: 25px;
      }
      p:nth-child(2) {
        color: #878b97;
        margin-top: 8px;
      }
    }
  }
  .connect_boxs {
    background: #f4f5fa;
    border-radius: 0 0 20px 20px;
    position: absolute;
    bottom: -275px;
    left: 0;
    width: 690px;
    z-index: 0;
    border-radius: 16px;
  }

  .metitle {
    height: 72px;
    line-height: 72px;
    border-bottom: 1px solid #e5ebf2;
    font-weight: normal;
    color: #0f1730;
    font-size: 20px;
  }
  .connect_currency {
    display: flex;
    justify-content: flex-start;
  }
  .c_receove_Share {
    padding: 24px 40px;
    padding-top: 40px;
  }
  .currencyprices {
    width: 190px;
    text-align: right;
  }
  .whe {
  }
  .setmage {
    margin: 20px 0;
  }
  .fees_account {
    height: 56px;
    line-height: 56px;
    border-radius: 16px;
    padding-left: 24px;
    margin-top: 25px;
    margin-bottom: 32px;
    border: 1px solid #0f1730;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      top: 12px;
      right: 24px;
    }
  }
  .rec_red {
    color: #05c98e;
  }
  .outlogin {
    margin-top: 48px;
  }
}
@media screen and (max-width: 750px) {
  .createpair {
    margin-top: 0;
    .from_botton {
      margin-top: 0;
    }
    .title {
      height: 1.6rem;
      line-height: 1.6rem;
    }
    .tran_icon {
      font-size: 0.37rem !important;
    }
    .ctx_1 {
      width: 40%;
    }
    .whe {
      display: flex;
      margin-top: 17px;
    }
    .pair_input {
      padding-bottom: 20px;
    }
    .ctx_2 {
      width: 22%;
      margin: 0 8px;
    }
    .ctx_3 {
      width: 33%;
    }
    .pair_mandate {
      width: 70%;
    }
    .pair_mandate_btb {
      width: 90%;
    }
    .pair_mandate {
      height: 1rem;
    }
    .Price_text {
      font-size: 0.4rem;
      margin-top: 20px;
    }
    .pair_ved {
      .pair_title {
        font-size: 0.4rem;
      }
      p {
        font-size: 0.35rem;
      }
    }
  }
}
</style>