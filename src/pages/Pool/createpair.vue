<template>
  <div class="createpair">
    <container top="40">
      <div
class="title"
           slot="title">
        <div class="lt_box">
          <router-link to="/pool">
            <span class="icon_box">
              <i class="el-icon-back back_icon"></i>
            </span>
          </router-link>
          <span class="content_text">{{$t('pool.cj1')}}</span>
        </div>
        <div class="rg_box">
                <el-tooltip placement="left"   effect="light">
                      <div
slot="content"
                           >
                        {{$t('pool.wyou1')}}<br>
                        {{$t('pool.wyou2')}} <br>
                         {{$t('pool.wyou3')}}<br>
                         {{$t('pool.wyou4')}} <br>
                          {{$t('pool.wyou5')}}
                      </div>
                      <img
src="@/assets/img/icon_instructions.svg"
                           alt="">
                    </el-tooltip>
        </div>
      </div>
      <div slot="body">
        <div class="box_sizes pari__mag">
          <div class="provider ">
            <div class="">
              <div class=" pair_ved">

                <p class="pair_size pair_mag "> {{$t('pool.yat')}} </p>
                <p>{{$t('pool.tro')}}</p>
                <p>{{$t('pool.tro1')}}</p>

                <p>{{$t('pool.tro2')}}</p>

              </div>
            </div>
          </div>
        </div>
        <div class="setInput  clearfix">
          <div class="ctx_1    fl_lt">
            <frominput
:lable= "$t('pool.Input')"
                        showmax
                        :balance="token1.balance"
                       v-model="firstTokenNum"></frominput>
          </div>
          <div class="ctx_2   fl_lt">
            <frominput
:lable= "$t('pool.Weight')"
                       placeholder="1-50"
                       v-model="firstTokenWeight"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect
:balance="token1.balance"
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
            <frominput
:lable= "$t('pool.Input')"

                       v-model="secondTokenNum"
                       showmax
                       :balance="token2.balance"
                       ></frominput>
          </div>
          <div class="ctx_2   fl_lt">
            <frominput
:lable= "$t('pool.Weight')"
                       placeholder="1-50"
                       v-model="secondTokenWeight"></frominput>
          </div>
          <div class="ctx_3 fl_lt">
            <setselect
@click="showSelect(1)"
                       :balance="token2.balance"
                       :imgUrl="token2.img"
                       :showSelect="JSON.stringify(token2)!='{}'"
                       :text="token2.name" />
          </div>
        </div>
        <div
class="Price_text"
             v-show="login">
          <span>Price: </span>
          <span>0.0020495 </span>
          <span> ETH </span>
          <span> {{$t('Exc.per')}}</span>
          <span> DAI </span>
          <img
src="@/assets/img/icon_slect.png"
               alt="">
        </div>
          <div class="setInput pair_input clearfix">

         <span class="ctw"> <div class="ctx_1 fl_lt ">
            <frominput
            :lable= "$t('Creatorfee')"
            placeholder="Please Enter"
            v-model="sponsors">
            </frominput>
          </div></span>

          <div class="ctx_2 fl_lt ">
            <frominput
            :lable="$t('FoxDex')"
            placeholder="Please Enter"
            v-model="foxDex"
            :disabled="true">
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
        <div class="whe clearfix">

          <span
class="pair_mandate"
                v-show="false">
            <el-button class="from_botton pair_mandate  pair_mandate_btb"> {{$t('Exc.Mandate')}} </el-button>
          </span>
          <el-button
class="from_botton pair_mandate pair_swap "
                     :loading="btnLoading1"
                     :disabled="disabled1"
                     @click="handel">{{$t('confirm')}}</el-button>
        </div>

      </div>
      <div
slot="footer"
           v-show="login"
           class="position">
        <div class="box_sizes connect_boxs">
          <div class="provider c_receove_Share ">
            <div class="">
              <div class="received">
                <div class="lt">
                  <span> {{$t('Exc.Mrd')}} <img
src="@/assets/img/icon_instructions.svg"
                         alt=""></span>
                </div>
                <span class="rgs">441.4 aDAI</span>
              </div>
              <div class="received setmage">
                <div class="lt">
                  <span>{{$t('Exc.Pre')}}<img
src="@/assets/img/icon_instructions.svg"
                         alt=""></span>
                </div>
                <span class="rec_red">5.30%</span>
              </div>
              <div class="received">
                <div class="lt">
                  <span>{{$t('Exc.Liyee')}}<img
src="@/assets/img/icon_instructions.svg"
                         alt=""></span>
                </div>
                <span class="">0.003 ETH</span>
              </div>
              <div class="fees_account">{{$t('Exc.Vpcs')}}<img
src="@/assets/img/icon_jump_green.png"
                     alt=""></div>
            </div>
          </div>
        </div>
      </div>
    </container>
    <selctoken
:showAlert='isSelect'
               :item='item'
               @closeAlert="isSelect=false"
               @change="changeCoin" />
    <valert
:isShow="showAlert1"
            :url="typeUrl"
            @close='showAlert1=false' />

  </div>
</template>

<script>
const Decimal = require('decimal.js')
import { container, frominput, setselect } from '../../components/index'
import selctoken from './selctToken'
import ipConfig from '../../config/ipconfig.bak'
import { approved, decimals, getConfirmedTransaction } from '../../utils/tronwebFn'
import valert from './valret'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      token1: {},
      token2: {},
      isSelect: false,
      item: 1,
      login: false,
      firstTokenNum: '',
      firstTokenWeight: '10',
      secondTokenNum: '',
      secondTokenWeight: '10',
      sponsors: 0.001,
      foxDex: 0,
      lp: 0.001,
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
  computed: {
    ...mapState(['tokenData'])
  },
  watch: {
    tokenData(list) {
      const that = this
      const tokenList = JSON.parse(JSON.stringify(list))
      if (tokenList && tokenList.length > 0) {
        const token = tokenList.filter((res) => {
          return res.name.toUpperCase() == 'USDT'
        })
        if (token && token.length > 0) {
          this.token1 = token[0]
          this.token1.item = 0
          this.$initTronWeb().then(function(tronWeb) {
            that.changeCoin(that.token1)
          })
        }
      }
    }

  },
  created() {
    const that = this
    const tokenList = JSON.parse(JSON.stringify(this.tokenData))
    if (tokenList && tokenList.length > 0) {
      const token = tokenList.filter((res) => {
        return res.name.toUpperCase() == 'USDT'
      })
      if (token && token.length > 0) {
        this.token1 = token[0]
        this.token1.item = 0
        this.$initTronWeb().then(function(tronWeb) {
          that.changeCoin(that.token1)
        })
      }
    }
    that.init()
  },
  methods: {
    handel() {
      // this.login = !this.login
      if (!this.firstTokenNum || this.firstTokenNum == 0 || this.firstTokenNum == '' || !this.secondTokenNum || this.secondTokenNum == 0 || this.secondTokenNum == '') {
        this.$message({
          message: this.$t('pewe'),
          type: 'error'
        })
        return
      } else if (!this.firstTokenWeight || this.firstTokenWeight == 0 || this.firstTokenWeight == '' || !this.secondTokenWeight || this.secondTokenWeight == 0 || this.secondTokenWeight == '') {
        this.$message({
          message: this.$t('pewe1'),
          type: 'error'
        })
        return
      } else if ((parseFloat(this.firstTokenWeight) + parseFloat(this.secondTokenWeight)) > 50) {
        this.$message({
          message: this.$t('pewe5'),
          type: 'error'
        })
        return
      }
      this.createBPool()
    },
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getBFactoryContract()
        that.getSwapFeeForDex()
        // that.checkBind(that.bPoolContract)
        // that.unBindCoin();
      })
    },
    async getBFactoryContract() { // 链接BFactory合约
      console.log('ipConfig.BFactory=====' + ipConfig.BFactory)
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory)
    },
    async getSwapFeeForDex() {
      console.log('ipConfig.BFactory=====' + ipConfig.BFactory)
      var functionSelector = 'swapFeeForDex()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(ipConfig.FactoryManager, functionSelector, {}, parameter)
      this.foxDex = parseInt(transaction.constant_result[0], 16) / Math.pow(10, 18)
    },
    loading1(n) {
      if (n) {
        this.disabled1 = true
        this.btnLoading1 = true
      } else {
        this.disabled1 = false
        this.btnLoading1 = false
      }
    },
    async createBPool() { // newBPool
      const that = this
      const pairName = this.token1.name + '/' + this.token2.name
      const pairName2 = this.token2.name + '/' + this.token1.name
      this.loading1(1)
      this.$message({
        message: this.$t('pewe6'),
        type: 'success'
      })
      try {
        if (this.BFactoryContract) {
          const res = await that.BFactoryContract['newBPool']().send({
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
                const number = window.tronWeb.toBigNumber(that.firstTokenNum * Math.pow(10, that.token1.decimals)).toString(10)
                const weight = window.tronWeb.toBigNumber(that.firstTokenWeight * Math.pow(10, 18)).toString(10)
                const number2 = window.tronWeb.toBigNumber(that.secondTokenNum * Math.pow(10, that.token2.decimals)).toString(10)
                const weight2 = window.tronWeb.toBigNumber(that.secondTokenWeight * Math.pow(10, 18)).toString(10)
                that.bindCoin(that.token1.address, number, weight, that.token2.address, number2, weight2)
              })
            })
          }
        }
      } catch (error) {
        that.loading1()
        this.$message({
          message: this.$t('pewe7'),
          type: 'error'
        })
        console.log(error)
      }
    },
    async setSwapLpFee() { // 设置LP
      const that = this
      if (this.lp == 0) {
        return
      }
      var functionSelector = 'setSwapLpFee(uint256)'
      var parameter = [{ type: 'uint256', value: this.lp * Math.pow(10, 18) }]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.bPoolContract, functionSelector, { shouldPollResponse: true }, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          // that.$message.success('success');
          that.showAlert1 = true
          that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + signedTransaction.txID
        })
      })
    },
    async setSponsors() { // 设置sponsors
      var that = this
      if (this.sponsors == 0) {
        return
      }
      var functionSelector = 'setSwapBuilderFee(uint256)'
      var parameter = [{ type: 'uint256', value: this.sponsors * Math.pow(10, 18) }]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(this.bPoolContract, functionSelector, { shouldPollResponse: true }, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          //  that.$message.success('success');
          that.showAlert1 = true
          that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + res.txID
        })
      })
    },
    async finalize(address) {
      const that = this
      var functionSelector = 'finalize()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(address, functionSelector, { shouldPollResponse: true }, parameter)
      if (!transaction.result || !transaction.result.result) {
        that.loading1(1)
        return console.error('Unknown error: ' + transaction, null, 2)
      }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.showAlert1 = true
          that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + res.txID
          that.loading1(0)
          that.$message.success(that.$t('pewe8'))
        })
      })
    },
    async bindCoin(token1Address, token1Balance, token1Weight, token2Address, token2Balance, token2Weight) { // 绑定币种
      const that = this
      var functionSelector = 'addToken(address,uint256,uint256,address,uint256,uint256)'
      var parameter = [
        { type: 'address', value: token1Address },
        { type: 'uint256', value: token1Balance },
        { type: 'uint256', value: token1Weight },
        { type: 'address', value: token2Address },
        { type: 'uint256', value: token2Balance },
        { type: 'uint256', value: token2Weight }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.bPoolContract, functionSelector, { shouldPollResponse: true }, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      const signedTransaction = await window.tronWeb.trx.sign(transaction.transaction)
      that.showAlert1 = true
      that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + signedTransaction.txID
      const res = await window.tronWeb.trx.sendRawTransaction(signedTransaction)

      if (res) {
        getConfirmedTransaction(res.txid).then((result) => {
          that.showAlert1 = true
          // that.typeUrl = 'https://shasta.tronscan.org/#/transaction/'+result.txID;
          that.loading1(0)
          that.$message.success(that.$t('pewe8'))
        })
      }
      // window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
      //     window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
      //         alert('success');
      //     });
      // })
    },
    async unBindCoin() { // 解除绑定
      const that = this
      var functionSelector = 'unbind(address)'
      var parameter = [
        { type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C' }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract('TR51WC82auiTArBttVTUCDgYSJ9bw7363t', functionSelector, {}, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.$message.success('success')
        })
      })
    },
    async checkBind() { // 检查是否绑定
      var functionSelector = 'isBound(address)'
      var parameter = [{ type: 'address', value: 'TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C' }]
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract('TR51WC82auiTArBttVTUCDgYSJ9bw7363t', functionSelector, {}, parameter)
      console.log(window.tronWeb.toDecimal(transaction.constant_result[0]))
    },
    changeCoin(token) {
      const that = this
      this.isSelect = false
      token.item == 0 ? this.token1 = token : this.token2 = token
      that.getBalance(token)
      if (this.token1.address && this.token2.address) {
        // this.getSpotPrice(this.token1.address,this.token2.address)
      }
    },
    async getBalance(token) { // 获取余额
      const that = this
      console.log('token.address=======' + token.address)
      console.log('window.tronWeb.defaultAddress.base58=======' + window.tronWeb.defaultAddress.base58)
      const tokenContract = await window.tronWeb.contract().at(token.address)
      const tokenBalance = await tokenContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
      if (tokenBalance) {
        const balance = parseFloat(tokenBalance, 16) / Math.pow(10, token.decimals)
        token.item == 0 ? that.token1.balance = balance : that.token2.balance = balance
      }
    },
    // async getSpotPrice(){
    //   await
    // },
    showSelect(index) {
      this.isSelect = true
      this.item = index
    }
  }
}
</script>
<style>
.tipstyle{
  width:200px;
}
</style>
<style lang="scss" scoped>
.el-tooltip__popper{
  width:100%;
}
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
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;

  }
  .whe_img {
    vertical-align: sub;
  }
  .ctx_1 {
    width: 180px;
    display: inline-block;

  }
  .ctx_2 {
    width: 76px;
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
    padding: 18px 0;
    p {
      height: 20px;
      font-size: 14px;
      color: #878b97;
    }
    .pair_title {
      font-size: 20px;
    }
    .pair_mag p{

    }
  }
  .pair_mandate {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
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
      color:  #FC6446;
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
      color:  #FC6446;
      width: 144px;
    }
    .demonstration {
      flex: 1;
      padding-top: 10px;
    }
  }
  .pair_input {

    margin-top: 30px;
    padding-bottom: 0px;

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
      line-height: 40px;
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
      color:  #FC6446;
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
      border: 1px solid#FC6446;
      font-size: 20px;
      color:  #FC6446;
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
      background: #FC6446;
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
    color:  #FC6446;
  }
  .outlogin {
    margin-top: 48px;
  }
}
@media screen and (max-width: 750px) {
  .createpair {
    padding-top: 0;
    .from_contentIcon{
      margin: 0;
    }
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
      margin-top: 15px;
      padding-bottom: 0px;
    }
    .ctx_2 {
      width: 22%;
      margin: 0 2.5%;
    }
    .ctx_3 {
      width: 33%;
    }
    .pair_mandate {
      // width: 70%;
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
        font-size: 0.35rem;
      }
      p {
        height: 0.7rem;
        font-size: 0.35rem;
      }
    }
  }
}
</style>
