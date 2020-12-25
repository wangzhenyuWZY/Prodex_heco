<template>
  <div class="container glbale_pd">
    <div class="stake" v-show="!showModel">
      <div class="content_top" v-if="login">
        <div class="connected clearfix">
          <div class="text_one fl_lt">Earn FARM with FoxDex</div>
          <div class="fl_rg conted_btn">
            <el-button class="from_botton">
              <img class="whe_img" src="@/assets/img/icon_my_wallet.svg" alt="" />
              {{ $t("nav.CWet") }}
            </el-button>
          </div>
          <div class="fl_rg text_two">You haven't connected a wallet.</div>
        </div>
        <div class="ect_title">Stake your LP tokens for rewards</div>
      </div>
      <ul class="stake_list">
        <li v-for="(idx, index) in farmList" :key="index" v-show="idx.show">
          <div class="stake_top">
            <span class="lt_icon">
              <img :src="requierImg(idx.pair, 1)" alt="" />
              <img :src="requierImg(idx.pair, 0)" alt="" />
            </span>
            <span class="content_zise">
              {{ idx.pair }}
            </span>
          </div>
          <div class="stake_addres">
            <div>
              <span class="lt_addres">{{ $t("Stake.Deposit") }}:</span>
              <span class="rg_addres">{{ idx.pair }}</span>
            </div>
            <div class="mrg">
              <span class="lt_addres">{{ $t("Stake.Earn") }}:</span>
              <span class="rg_addres">ABELO</span>
            </div>
          </div>
          <div class="stake_btn" @click="showModels(idx)">
            {{ idx.APY }}%APY
          </div>
          <div class="stake_apy clearfix">
            <!-- <div class="apy_lt"> <span class="apy_size">APY:</span> <span class="apy_number">322.16%</span> </div>
               <div class="apy_rg"> <span class="apy_size">APR:</span> <span class="apy_number">146.03%</span>  </div> -->
            <div class="prizes">
              <!-- 18,000 USD in prizes -->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <selected v-if="showModel" :farmtoal="total" @Approve="Approve" @amount="clickAmount" @back="initColse" @stake="stake" />
  </div>
</template>

<script>
const Decimal = require('decimal.js')
import ipConfig from '../../config/ipconfig.bak'
import {
  getMyBalanceInPool,
  getLpBalanceInPool,
  bPoolAllowance,
  getConfirmedTransaction
} from '../../utils/tronwebFn'
import selected from './Selected'
// import tokenData from '../../utils/token';
import { mapState } from 'vuex'
import { api } from '../../api/api'
import BigNumber from 'bignumber.js'
export default {
  data() {
    return {
      MasterChefContract: null,
      getContract: null,
      poolLength: 0,
      poolIndex: 0,
      login: false,
      showModel: false,
      farmList: [],
      item: {},
      apyList: [],
      total: {
        farmTotal: 0, // 总数
        shareToal: 0, // 抵押数量
        uniswaplp: 0, // 计算用户收益
        balanceOf: 0, // 钱包余额
        decimals: 0, // 精度 查询减 发送合约加
        btnFlag1: false,
        btnFlag2: false,
        btnFlag3: false,
        item: {},
        token1: '',
        token2: '',
        showAlert1: false,
        defaultAddress: '',
        APY: '--'
      },
      stakeList: []
    }
  },
  watch: {
    pairData(list) {
      this.farmList = JSON.parse(JSON.stringify(list))
    }
  },
  components: {
    selected
  },
  computed: {
    ...mapState(['pairData'])
  },
  created() {
    this.farmList = JSON.parse(JSON.stringify(this.pairData))
    this.init()
  },
  methods: {
    initColse() {
      this.showModel = false
      this.total = {
        farmTotal: 0, // 总数
        shareToal: 0, // 抵押数量
        uniswaplp: 0, // 计算用户收益
        balanceOf: 0, // 钱包余额
        decimals: 0, // 精度 查询减 发送合约加
        btnFlag1: false,
        btnFlag2: false,
        btnFlag3: false,
        showAlert1: false,
        defaultAddress: '',
        APY: '--'
      }
    },
    async init() {
      // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.grtMasterChef()
      })
    },
    requierImg(name, number) {
      let str
      // debugger
      if (name) {
        try {
          if (number != undefined) {
            str = name.split('/')
            return require('@/assets/img/currency/' + str[number] + '.png')
          }
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      } else {
        return require('@/assets/img/currency/avitve.png')
      }
    },
    Approve(x) {
      //  提现 x = 0 ;领取奖励
      this.withdraw()
      // if (x === 0) { // 领取奖励
      //     this.total.btnFlag2 = true;
      // } else {
      //     this.total.btnFlag3 = true;

      // }
      // try {
      //   let res = await this.getContract["allowance"](window.tronWeb.defaultAddress.base58, this.poolList[this.poolIndex].lpToken).call(); //查询授权
      //   if (res) {
      //     let approveBalance = parseInt(res._hex, 16)
      //     if (approveBalance == 0) {
      //       await approved(this.poolList[this.poolIndex].lpToken, ipConfig.MasterChef); // 授权
      //       if (x == 0) {
      //         this.withdraw(0)
      //       } else {
      //         this.withdraw()
      //       }
      //     } else {
      //       if (x == 0) {
      //         this.withdraw(0)
      //       } else {
      //         this.withdraw()
      //       }
      //     }
      //   } else {
      //   }
      // } catch (error) {
      //   if (x === 0) { // 领取奖励
      //     this.total.btnFlag2 = false;
      //   } else {
      //     this.total.btnFlag3 = false;
      //   }
      //   console.log(error)
      // }
    },
    async clickAmount() {
      // 领取奖励
      this.withdraw(0)
      // this.Approve(0);
    },
    async devFundDivRate() { },
    async stake(item, n) {
      // 抵押
      const that = this
      this.total.btnFlag1 = true
      bPoolAllowance(item.address, ipConfig.MasterChef).then((res) => {
        const isApproved = parseInt(res.constant_result[0], 16)
        if (isApproved == 0) {
          that.doApproved(item, n)
        } else {
          that.deposit(item, n)
        }
      })
    },
    async doApproved(item, n) {
      const that = this
      var functionSelector = 'approve(address,uint256)'
      var parameter = [
        { type: 'address', value: ipConfig.MasterChef },
        { type: 'uint256', value: '1000000000000000000000000000000' }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(
        item.address,
        functionSelector,
        { shouldPollResponse: true },
        parameter
      )
      if (!transaction.result || !transaction.result.result) {
        return console.error('Unknown error: ' + transaction, null, 2)
      }
      window.tronWeb.trx
        .sign(transaction.transaction)
        .then(function(signedTransaction) {
          window.tronWeb.trx
            .sendRawTransaction(signedTransaction)
            .then(function(res) {
              getConfirmedTransaction(res.txid).then(() => {
                that.total.defaultAddress =
                  'https://shasta.tronscan.org/#/transaction/' + res.txid
                that.deposit(item, n)
                that.total.btnFlag1 = false
              })
            })
        })
    },
    async grtMasterChef() {
      // 连接MasterChef合约需要对应的合约base58信息
      console.log('ipConfig.MasterChef=========' + ipConfig.MasterChef)
      this.MasterChefContract = await window.tronWeb
        .contract()
        .at(ipConfig.MasterChef)
      if (this.MasterChefContract) {
        await this.getLpComputeApy()
        await this.getMasterChefContract()
      }
    },
    getContracts(item) {
      // 查询对应合约余额
      const that = this
      getMyBalanceInPool(item).then((res) => {
        that.total.balanceOf = Decimal(res)
          .div(Math.pow(10, 18))
          .toFixed(6)
          .toString()
        that.total.decimals = 18
      })
    },
    async showModels(item) {
      // 弹框
      this.showModel = true
      this.total.item = item
      this.total.token1 = item.token1.name
      this.total.token2 = item.token2.name
      this.total.APY = item.APY
      try {
        await this.getContracts(item)
        await this.tokenPerBlock(item)
      } catch (error) {
        console.log(error)
      }

      const userInfo = await this.MasterChefContract.userInfo(
        item.index,
        window.tronWeb.defaultAddress.base58
      ).call() // 返回抵押多少
      const res = await this.toDecimal(userInfo.amount._hex)
      await this.pendingTokens(item.index)
      this.total.shareToal = res / Math.pow(10, this.total.decimals)

      console.log(res)
    },
    async updata(item) {
      // 提现 抵押 更新 余额  抵押数
      await this.getContracts(item)
      // try {
      //   let balanceOf = await this.getContract.balanceOf(window.tronWeb.defaultAddress.base58).call(); // 查询钱包余额余额
      //   let res = await this.toDecimal(balanceOf._hex);
      //   // this.total.balanceOf =res
      //   console.log('updata==balanceOf', res)
      //   this.total.balanceOf = res / Math.pow(10, this.total.decimals);
      //   let userInfo = await this.MasterChefContract.userInfo(this.poolIndex, window.tronWeb.defaultAddress.base58).call(); // 返回抵押多少
      //   await this.pendingTokens();
      //   this.total.shareToal = await this.toDecimal(userInfo.amount._hex);
      //   console.log( this.total.shareToal)
      //   this.total.shareToal = this.total.shareToal / Math.pow(10, this.total.decimals);
      //   console.log('updata==userInfo', userInfo)

      // } catch (error) {
      //   console.log(error);
      // }
    },
    async getMasterChefContract() {
      // 1.获取PoolInfo[] 返回列表一个数组，数组里的信息包括：lptoken的地址
      const that = this
      try {
        const leng = await that.MasterChefContract.poolLength().call() // 返回从1开始;
        this.poolLength = await this.toDecimal(leng) // 16进制转10进制
        const lotokenArr = []
        console.log('poolLength=======' + this.poolLength)
        for (let index = 0; index < this.poolLength; index++) {
          const res = await that.MasterChefContract['poolInfo'](index).call()
          const lpToken = window.tronWeb.address.fromHex(res.lpToken)
          const allocPoint = res.allocPoint
          lotokenArr.push({
            lpToken: lpToken,
            allocPoint: allocPoint
          })
          if (index == this.poolLength - 1) {
            this.getStakeList(lotokenArr)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    getStakeList(lotokenArr) {
      this.farmList.forEach((item, idex) => {
        lotokenArr.forEach((ktem, kdex) => {
          if (
            item.address == ktem.lpToken &&
            parseInt(ktem.allocPoint, 16) !== 0
          ) {
            item.index = kdex
            item.show = true
            item.allocPoint = ktem.allocPoint
          }
        })
        this.$set(this.farmList, idex, item)
      })
    },
    async pendingTokens(index) {
      // 计算用户收益有多少   PoolInfo[]数组的序号, 用户地址
      const penaccount = await this.MasterChefContract.pendingToken(
        index,
        window.tronWeb.defaultAddress.base58
      ).call()
      // let pre = await this.toDecimal(penaccount);
      console.log('pendingTokens', penaccount)
      console.log('penaccount._hex', penaccount._hex)
      this.total.uniswaplp = (
        parseInt(penaccount._hex, 16) / Math.pow(10, 18)
      ).toFixed(6)
    },
    async deposit(item, n) {
      // 质押
      // （1）PoolInfo[]数组的序号
      // （2）质押的数量,为0的时候只领取奖励，不进行质押
      const data = {
        // 使用send来执行non-pure或modify智能合约方法，这些方法确实修改了区块链，消耗资源（bandwidth 和 energy）并且还广播到网络。
        // feeLimit:100000000,  //调用合约方法消耗最大数量的SUN。上限是 1000 TRX。(1TRX = 1,000,000SUN)
        // callValue:window.tronWeb.toSun(that.trxNum), // 本次调用往合约转账的SUN。
        shouldPollResponse: true // 如果设置为 TRUE，则会等到在 Solidity 节点上确认事务之后再返回结果。
        // tokenId:0,  // 本次调用往合约中转账TRC10的tokenId。如果没有，不需要设置
        // tokenValue:0 // 本次调用往合约中转账TRC10的数量，如果不设置tokenId，这项不设置。
      }
      this.total.defaultAddress =
        'https://shasta.tronscan.org/#/address/' +
        window.tronWeb.defaultAddress.base58
      this.total.showAlert1 = true
      let num
      n = new BigNumber(n)
      n = n.times(Math.pow(10, this.total.decimals))
      n = n.toFixed()
      try {
        num = await this.MasterChefContract['deposit'](item.index, n).send(
          data
        )
        console.log(num)
        window.location.reload()
      } catch (error) {
        console.log(error)
        this.total.btnFlag1 = false
      }
      this.updata(item)
      this.total.btnFlag1 = false
    },
    withdraw(x) {
      // 提现   //  （1）PoolInfo[]数组的序号  // （2）提现的数量
      if (x === 0) {
        // 领取奖励
        this.total.btnFlag2 = true
      } else {
        this.total.btnFlag3 = true
      }
      this.total.defaultAddress =
        'https://shasta.tronscan.org/#/address/' +
        window.tronWeb.defaultAddress.base58
      this.total.showAlert1 = true
      const that = this
      let arr = new BigNumber(this.total.shareToal)
      arr = arr.times(Math.pow(10, this.total.decimals))
      this.MasterChefContract.withdraw(
        that.total.item.index,
        x == 0 ? 0 : arr.toFixed()
      )
        .send({
          shouldPollResponse: true
        })
        .then((res) => {
          if (res) {
            window.location.reload()
            this.updata(that.total.item)
            console.log(res)
          }
          if (x === 0) {
            that.total.btnFlag2 = false
          } else {
            that.total.btnFlag3 = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    tokenPerBlock(item) {
      // 转换 数值
      const that = this
      getLpBalanceInPool(item).then((res) => {
        // 获取lptoken总量
        that.total.farmTotal = Decimal(res).div(Math.pow(10, 18))
      })
    },
    async toDecimal(n) {
      // 16进制转10进制
      try {
        const num = await window.tronWeb.toDecimal(n)
        return num
      } catch (error) {
        console.log(error)
        return 0
      }
    },
    async getLpComputeApy() {
      try {
        const res = await api.getLpComputeApy()
        if (res.data.code == 0) {
          this.apyList = res.data.data
          if (this.showModels) {
            console.log(this.total)
            this.farmList.forEach((item, index) => {
              const APY = this.getEcthapy(item.pair)
              item.APY = APY * 100
              item.APY = isNaN(item.APY) ? 0 : item.APY.toFixed(2)
              this.$set(this.farmList, index, item)
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    getEctlist() {
      const arr = this.farmList
      arr.forEach((idx) => {
        idx.pay = this.getEcthapy(idx.pair)
      })
      this.farmList = arr
    },
    getEcthapy(name) {
      if (this.apyList.length == 0) return '--'
      const a = this.apyList.filter((idx) => {
        return idx.full_name.toUpperCase() == name.toUpperCase()
      })
      if (a.length == 0) return '--'
      return a[0].pair_current_apy
    }
  }
  // 1. 初始化tronweb
  // 2. 链接对应的合约地址
  // / 4 授权 才能  抵押或者 提现
  // 2. deposit用来质押，需要传入的参数
  // （1）PoolInfo[]数组的序号
  // （2）质押的数量,为0的时候只领取奖励，不进行质押

  // 3. withdraw用来提现，需要传入的参数
  // （1）PoolInfo[]数组的序号
  // （2）提现的数量

  // 4. pendingToken 计算用户的收益有多少
  // （1）PoolInfo[]数组的序号 池子一天的收益* 价格* / 质押数量* 质押币种价格 ==  1天;  apy  *  365;
  // （2）用户的地址
  // 收益率  总数/余额/ 价格

  //  0:"lpToken: TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C"   UNISWAP_LP
  //  1:"allocPoint: 1"    占比
  //  2:"lastRewardBlock: 9,925,699"
  //  3:"accFoxPerShare: 0"    抵押数量
  //  4:"perBlockToken: 1,950,000,000,000,000,000"    资金池总数 块奖励数
}
</script>

<style lang="scss" scoped>
.glbale_pd {
  padding-bottom: 220px;
}
.stake {
  max-width: 1024px;
  margin: 0 auto;
  color: #0f1730;
  padding-bottom: 70px;
  .content_top {
    margin-top: 20px;
  }
  .whe_img {
    vertical-align: bottom;
  }
  .conted_btn {
    width: 320px;
  }
  .ect_title {
    font-size: 20px;
    font-family: roboto-mediumitalic;
    text-align: center;
    margin-top: 32px;
  }
  .text_one {
    font-size: 24px;
    font-family: roboto-mediumitalic;
    line-height: 56px;
  }
  .text_two {
    font-size: 18px;
    color: #878b97;
    line-height: 56px;
    margin-right: 16px;
  }
}
.stake_apy {
  font-size: 18px;
  margin-top: 16px;
  min-height: 25px;

  .apy_size {
    color: #878b97;
    float: left;
  }
  .apy_number {
    color: #0f1730;
    font-family: roboto-mediumitalic;
    float: right;
  }
  .prizes {
    text-align: center;
    font-family: roboto-mediumitalic;
    font-weight: normal;
    color: #0f1730;
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 2fr));
  grid-template-columns: 320px 320px 320px;
  grid-template-rows: 320px 320px 320px;
  grid-template-rows: 3;
  gap: 32px;
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  padding-top: 120px;
  li {
    width: 320px;
    height: 320px;
    background: #ffffff;
    border-radius: 16px;
    padding: 37px 32px;

    .content_zise {
      font-size: 20px;
      font-family: roboto-mediumitalic;
      font-weight: normal;
      vertical-align: middle;
    }
    .lt_icon {
      margin-right: 4px;
      position: relative;
      overflow: hidden;
      min-width: 70px;
      display: inline-block;
      height: 32px;
      vertical-align: middle;
      img {
        vertical-align: middle;
        width: 32px;
        height: 32px;
      }
      img:nth-child(1) {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 0;
      }
      img:nth-child(2) {
        position: absolute;
        right: 16px;
        top: 0;
        z-index: 1;
      }
    }
    .stake_addres {
      margin-top: 40px;
      margin-bottom: 40px;
      padding-left: 27px;
      > span {
        display: inline-block;
      }
      .mrg {
        margin-top: 18px;
      }

      .lt_addres {
        font-size: 20px;
        color: #878b97;
        text-align: right;
        display: inline-block;
        width: 74px;
      }
      .rg_addres {
        font-size: 18px;
        font-family: roboto-mediumitalic;
        font-weight: normal;
        color: #0f1730;
        line-height: 21px;
      }
    }
    .stake_btn {
      height: 48px;
      line-height: 48px;
      border-radius: 32px;
      border: 1px solid#FC6446;
      text-align: center;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: normal;
      color: #fc6446;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 750px) {
  .glbale_pd {
    padding: 0 0.5rem;
    padding-bottom: 74px;
  }
  .stake {
    ul {
      margin-top: 0;
      padding-top: 0;
      grid-template-columns: repeat(auto-fit, minmax(8.26rem, 2fr));
      li {
        display: block;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 0.4rem;
        .stake_addres {
          // margin: 0.4rem 0;
          padding-left: 0;
          .mrg {
            text-align: center;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 450px) {
  ul {
    li {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
