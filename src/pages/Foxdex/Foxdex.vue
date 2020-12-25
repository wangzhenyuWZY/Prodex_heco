<template>
  <div class="foxdex">
    <div class="fbox">
      <div class="fbox1">
        <div class="title ">
          {{$t('dex1')}}
        </div>
        <div class="left1">
          <div class="leff">

            <div class="le-box">
              <div class="le1">
                <span>{{$t('dex2')}}</span>
                <span>{{fromTotal.lpTotal}}</span>
              </div>
              <div class="le1">
                <span>{{$t('dex3')}}</span>
                <span>{{fromTotal.beenLocked}}</span>
              </div>
              <div class="le1">
                <span>{{$t('dex4')}}</span>
                <span>{{fromTotal.unlocked}}</span>
              </div>
              <div class="le_but">
                <el-button class="from_botton item_button" :loading="disabled1" :disabled="disabled3" @click="clickFactory"> {{$t('dex9')}}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fbox1">
        <div class="title ">
          {{$t('dex5')}}
        </div>
        <div class="left1">
          <div class="leff">
            <div class="le-box">
              <div class="le1">
                <span>{{$t('dex6')}}</span>
                <span>{{fromTotal.lpTotal1}}</span>
              </div>
              <div class="le1">
                <span>{{$t('dex7')}}</span>
                <span>{{fromTotal.unlocked1}}</span>
              </div>
              <div class="le_but">
                <el-button class="from_botton item_button" :loading="disabled2" :disabled="disabled4" @click="addReward">{{$t('dex8')}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fox_box">

      <div class="fox_box1">

        <div class="fox_p">
          <p class="fox_p1">{{$t('fox.fb1')}}</p>
          <div class="foxp">
            <p class="fox_p2">{{$t('fox.fb2')}}</p>
          </div>
        </div>
        <div class="fox_p">
          <p class="fox_p1">{{$t('fox.fc1')}}</p>
          <div class="foxp">
            <p class="fox_p2">{{$t('fox.fc2')}}
              <br> {{$t('fox.fc3')}}
              <br> {{$t('fox.fd1')}}
              <br> {{$t('fox.fd2')}}
              <br> {{$t('fox.fd3')}}
            </p>
          </div>
        </div>
        <div class="fox_p">
          <p class="fox_p1">{{$t('fox.fdd')}}</p>
          <div class="foxp">
            <p class="fox_p2">
              {{$t('fox.fd4')}}
              <br> {{$t('fox.fd5')}}
              <br> {{$t('fox.fd6')}}
            </p>
          </div>
        </div>
        <div class="fox_p">
          <p class="fox_p1">{{$t('fox.fe1')}}</p>
          <div class="foxp">
            <p class="fox_p2">{{$t('fox.fe2')}} </p>
          </div>
        </div>
        <div class="fox_p">
          <p class="fox_p1">{{$t('fox.fe3')}}</p>
          <div class="foxp">
            <p class="fox_p2">{{$t('fox.fe4')}}</p>
          </div>
        </div>
        <div class="fox_p">
          <p class="fox_p1">{{$t('fox.ff1')}}</p>
          <div class="foxp">
            <p class="fox_p2">{{$t('fox.ff2')}}
              <br> {{$t('fox.ff3')}}
              <br> {{$t('fox.ff4')}}
            </p>
          </div>
        </div>
        <div class="fox_box2">
          <ul class="foxul">
            <!-- <li @click="open1 "> <img src="../../assets/img/foxdex/icon_脸书.svg" alt=""> </li> -->
            <li @click="open2 "> <img src="../../assets/img/foxdex/icon_推特.svg" alt=""> </li>
            <li @click="open3"> <img src="../../assets/img/foxdex/icon_telegram.svg" alt=""> </li>
            <li @click="open4 "> <img src="../../assets/img/foxdex/icon_discord.svg" alt=""> </li>
            <li @click="open5 "> <img src="../../assets/img/foxdex/icon_medium.svg" alt=""> </li>
            <!-- <li @click="open6"> <img src="../../assets/img/foxdex/icon_reddit.svg" alt=""> </li> -->
          </ul>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
const Decimal = require('decimal.js')
import { getConfirmedTransaction } from '../../utils/tronwebFn'
import { mapState } from 'vuex'
export default {

  data() {
    return {
      inputdisabled1: true,
      inputdisabled2: true,
      trxBalance: 0,
      wtrxBalance: 0,
      rewardToken: 0,
      factory: 0,
      disabled2: false,
      fromTotal: {
        lpTotal: 0,
        lpTotal1: 0,
        beenLocked: 0,
        unlocked: 0,
        unlocked1: 0,
        decimals: 0,
        totalpy: 31000000
      },
      fromTotal1: {

      },
      disabled1: false,
      disabled3: true,
      disabled4: true

    }
  },
  created() {
    this.$initTronWeb().then((tronWeb) => {
      this.init()
    })
  },
  computed: {
    ...mapState(['connectFlag', 'pairData'])
  },
  watch: {
    pairData() {
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.add()
      })
    }
  },
  methods: {

    async init() {
      try {
        this.rewardToken = await window.tronWeb.contract().at(ipConfig.RewardToken)
        this.factory = await window.tronWeb.contract().at(ipConfig.FactoryManager)
        await this.getDecimals()
        await this.getTotalSupply()
        await this.getBalanceOf()
        this.disabled3 = false
        this.disabled4 = false
      } catch (error) {
        console.log(error)
      }
    },
    async getDecimals() {
      const data = await this.rewardToken.decimals().call()
      this.fromTotal.decimals = data
    },
    async getTotalSupply() {
      const data = await this.rewardToken.totalSupply().call()
      console.log('getTotalSupply====>' + data)
      const arr1 = Decimal(parseInt(data._hex ? data._hex : data.constant_result[0], 16)).div(Math.pow(10, this.fromTotal.decimals))
      this.fromTotal.lpTotal = arr1
      this.fromTotal.beenLocked = new Decimal(this.fromTotal.totalpy).sub(new Decimal(this.fromTotal.lpTotal))
      console.log(new Decimal(this.fromTotal.totalpy).sub(new Decimal(this.fromTotal.lpTotal)))
      console.log(this.fromTotal.beenLocked)
    },
    async getBalanceOf() {
      const data = await this.rewardToken.balanceOf(ipConfig.FactoryManager).call()
      console.log('getBalanceOf====>' + parseInt(data._hex ? data._hex : data.constant_result[0], 16) + this.fromTotal.decimals)
      const arr1 = Decimal(parseInt(data._hex ? data._hex : data.constant_result[0], 16)).div(Math.pow(10, this.fromTotal.decimals))
      this.fromTotal.unlocked = this.fromTotal.lpTotal - arr1
    },
    async clickFactory() {
      this.disabled1 = true
      var functionSelector = 'burnToken()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(ipConfig.FactoryManager, functionSelector, {}, parameter)
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          getConfirmedTransaction(res.txid).then((result) => {
            window.location.reload()
          })
        }).catch(err => {
          console.log(err)
          this.disabled1 = false
        })
      })
    },
    async addReward() {
      this.disabled2 = true
      this.factory.addRewardPoolLiquidity().send({ shouldPollResponse: true }).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.disabled2 = false
      })
    },
    async add() {
      let data = null
      this.pairData.forEach(item => {
        if (item.pair.toLocaleUpperCase() == 'WTRX/USDT') {
          data = item
        }
      })
      if (data) {
        console.log('gettoken')
        this.getFactory(data.address).then(res => {
          console.log('addLP====>' + Decimal(res).div(Math.pow(10, 18)))

          this.lpTotal1 = Decimal(res).div(Math.pow(10, 18))
        })
        this.getFactory(data.token2.address).then(arrs => {
          console.log('addLP2====>' + Decimal(arrs).div(Math.pow(10, 18)))
          this.unlocked1 = Decimal(arrs).div(Math.pow(10, 18))
        })
      }
    },
    setRewardPool() {
      this.disabled2 = true
      this.factory.addRewardPoolLiquidity().send({ shouldPollResponse: true }).then(res => {
        console.log('setRewardPool===>' + res)
        window.location.reload()
        this.disabled2 = false
      })
    },
    getFactory(address) {
      return new Promise(function(resolve, reject) {
        var functionSelector = 'balanceOf(address)'
        var parameter = [
          { type: 'address', value: ipConfig.FactoryManager }
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(address, functionSelector, {}, parameter).then((transaction) => {
          const myBalanceInPool = parseInt(transaction.constant_result[0], 16)
          resolve(myBalanceInPool)
        })
      })
    },
    // open1(){
    //    window.open('https://twitter.com/AbeloFinance')
    // },
    open2() {
      window.open('https://twitter.com/AbeloFinance')
    },
    open3() {
      window.open('https://t.me/AbeloFinance')
    },
    open4() {
      window.open('https://discord.gg/tSD6cjXJqw')
    },
    open5() {
      window.open('https://medium.com/@AbeloFinance')
    }
    // open6(){
    //    window.open('https://twitter.com/AbeloFinance')
    // },

  }

}
</script>

<style lang="scss" scoped>
@function rem($size, $miall: 75) {
  @return $size/ $miall + rem;
}
@function rem1($size, $miall: 75) {
  @return $size + px;
}
.foxdex {
  width: 720px;
  margin: 0 auto;
  padding-top: 120px;
  height: 100%;
  padding-bottom: 100px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .fbox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .fbox1 {
      width: 345px;
      background: #fff;
      border-radius: 20px;
      .title {
        text-align: center;
        padding-top: 18px;
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        border: none;
      }
      .left1 {
        background: #ffffff;
        border-radius: 15px;
        .leff {
          padding: 0px 15px;
          padding-bottom: 20px;

          .le-box {
            background: #f9faff;
            border-radius: 10px;
            box-sizing: border-box;

            .le1 {
              margin: 0 15px;
              display: flex;
              justify-content: space-between;
              padding-top: 20px;
              font-size: 17px;
              font-family: Roboto-Medium, Roboto;
              font-weight: 400;
              color: #878b97;
              line-height: 25px;
            }
            .le11 {
              padding: 30px 0;
            }
            .inputs {
              padding: 30px 0;

              margin: 0 15px;

              align-items: center;
              display: flex;
              .add_input {
                height: rem1(63);
                border-radius: 10px;
                flex: 1;
                width: 80%;
                background: none;
                font-size: rem1(18);
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #0f0d14;
                background: #ffffff;
              }
            }
            .le_but {
              margin-top: 20px;
              padding-bottom: 25px;
              padding-left: 15px;
              padding-right: 15px;
              .from_botton {
                font-size: 18px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #fc6446;
                background: #ffffff;
                border-radius: 15px;
                border: 1px solid #fc6446;
              }
            }
          }
          .le-box2 {
            padding-top: 25px;
            .lbx {
              margin-left: 18px;
            }
            .linput {
              padding-top: 10px;
              .inputs {
                height: rem1(61);
                background: #f9faff;
                border-radius: 10px;
                align-items: center;
                display: flex;

                .add_input {
                  flex: 1;
                  width: 80%;
                  background: none;
                  font-size: rem1(17);
                  font-family: Roboto-Medium, Roboto;
                  font-weight: 400;
                  color: #878b97;
                  padding-left: 15px;
                }
              }
            }
          }
        }
      }
    }
  }

  .fox_box {
    border-radius: 20px;
    background-color: #fff;
    height: auto;
    .fox_box1 {
      padding: 40px 0;
      margin: 0 24px;
      .fox_p {
        margin-bottom: 32px;
        .fox_p1 {
          margin-left: 16px;
          font-size: 20px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #0f1730;
          margin-bottom: 12px;
          line-height: 21px;
        }
        .foxp {
          background: #f6f7fb;
          border-radius: 12px;
          .fox_p2 {
            padding: 16px 16px;
            font-size: 17px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #5d606a;
            line-height: 22px;
          }
        }
      }
    }
    .fox_box2 {
      margin: 0 88px;
      .foxul {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .foxdex {
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
    .fbox {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }

    .fox_box {
      border-radius: rem(38);
      background-color: #fff;
      height: auto;
      .fox_box1 {
        padding: rem(45) 0;
        margin: 0 rem(38);
        .fox_p {
          margin-bottom: 32px;
          .fox_p1 {
            margin-left: 16px;
            font-size: rem(34);
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #0f1730;
            margin-bottom: 12px;
            line-height: 21px;
          }
          .foxp {
            background: #f6f7fb;
            border-radius: 12px;
            .fox_p2 {
              padding: 16px 16px;
              font-size: rem(30);
              font-family: Roboto-Regular, Roboto;
              font-weight: 400;
              color: #5d606a;
              line-height: 22px;
            }
          }
        }
      }
      .fox_box2 {
        margin: 0 rem(40);
        .foxul {
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
