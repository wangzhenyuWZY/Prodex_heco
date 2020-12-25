<template>
  <div class="pool-box" :class="dark?'dark':''">
    <div class="pool_bg clearfix">
      <div class="pool-box1">
        <p>{{$t('pool.Lpr')}}</p>
        <p>
          {{$t('pool.Lpr2')}}
        </p>
        <p v-show="false"> {{$t('pool.Rmpl')}}</p>
      </div>
      <div class="pool-btn clearfix">
        <p class=""></p>
      </div>
      <div class="pool-box2">
        <div class="pool-butt">
          <samp class="pool-p">{{$t('pool.Yly')}}</samp>
          <div class="pool-butt1">
            <router-link to="/pool/pairs">
              <el-button class="from_botton red_button bottun_hei">{{$t('pool.cj1')}}</el-button>
            </router-link>
          </div>
          <div class="pool-butt2">
            <router-link to="/pool/connectpool">
              <el-button class="from_botton bottun_hei1">{{$t('pool.al')}}</el-button>
            </router-link>
          </div>
        </div>
        <div class="pool_boxbg" v-if="!connectFlag">
          <samp class="pool-p1">{{$t('pool.cta')}}</samp>
          <samp class="pool-p2">
            {{$t('pool.dts')}}<samp class="pool-p3">
              {{$t('pool.imp')}}</samp>
          </samp>
        </div>
        <div class="fees" v-if="connectFlag">
          <div class="fees_account" v-show="false">
            {{$t('pool.Adaf')}}
            <img src="@/assets/img/icon_jump_green.png" alt="" />
          </div>
          <div class="cyrny_bg" v-for="(item,index) in pairList" :key="index" v-show="parseFloat(item.myBalanceInPool)>0">
            <div class="fees_curny clearfix" @click="toggleDrop(item)">
              <div class="curny_lt fl_lt">
                <span class="lt_img">
                  <img :src="requierImg(item.pair,0)" alt="" />
                  <img :src="requierImg(item.pair,1)" alt="" />
                </span>
                <span class="curny_size"> {{item.pair }} </span>
              </div>
              <div class="cyrny_rg fl_rg">
                <span>Manage</span>
                <img src="@/assets/img/icon_down.png" :class="item.show ? 'actvimg' : 'liveimg'" alt="" />
              </div>
            </div>

            <div class="box_sizes" :class="item.show ? 'transition' : 'hide_box'">
              <div class="provider">
                <div class="fees_share">
                  <div class="received liqui">
                    <div class="lt">
                      <span> {{$t('pool.Ytpt')}} </span>
                    </div>
                    <span class="rg">{{item.myBalanceInPool}}</span>
                  </div>
                  <div class="received liqui  mrgtop16">
                    <div class="lt">
                      <img :src="requierImg(item.pair,0)" alt="" />
                      <span>{{$t('pool.Pooled')}} {{item.token1.name}}:</span>
                    </div>
                    <span class="rg">{{token1Balance.toFixed(6)}}</span>
                  </div>
                  <div class="received  liqui mrgtop16">
                    <div class="lt">
                      <img class="lt_icon" :src="requierImg(item.pair,1)" alt="" />
                      <span>{{$t('pool.Pooled')}} {{item.token2.name}}:</span>
                    </div>
                    <span class="rg">{{token2Balance.toFixed(6)}}</span>
                  </div>
                  <div class="received liqui mrgtop16">
                    <div class="lt">
                      <span> {{$t('pool.Yops')}}:</span>
                    </div>
                    <span class="rg">{{(share*100).toFixed(2)}}%</span>
                  </div>
                  <div class="accrued">
                    {{$t('pool.Vafas')}}
                    <img class="acrued_img" src="@/assets/img/icon_jump_green.png" alt="" />
                  </div>
                  <div class="accrued_btn clearfix">
                    <div class="btn_lt fl_lt">
                      <el-button class="from_botton" @click="toPool(item)">{{$t('pool.Add')}}</el-button>
                    </div>
                    <div class="btn_lt fl_rg">
                      <el-button class="from_botton" @click="toRemove(item)"> {{$t('pool.Remove')}} </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pool_it">
            <!-- <samp class="pool-p2">
              Don't see a pool you joined?
                 <router-link to="/pool/importpool"><samp class="pool-p3">
            Import it. </samp>
            </router-link> -->

            <!-- </samp
            > -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Decimal = require('decimal.js')
import { mapActions, mapState } from 'vuex'
import { TokenData, PairData } from '../../utils/index'
import { getBalanceInPool, getMyBalanceInPool, getLpBalanceInPool } from '../../utils/tronwebFn'
export default {
  data() {
    return {
      show: false,
      pairList: [],
      token1Balance: 0,
      token2Balance: 0,
      myBalanceInPool: 0,
      lpTotal: 0,
      share: 0,
      tokenList: []
    }
  },
  watch: {
    tokenData(list) {
      this.tokenList = JSON.parse(JSON.stringify(list))
    },
    pairData(list) {
      this.pairList = JSON.parse(JSON.stringify(list))
      if (this.pairList && this.pairList.length > 0) {
        this.init()
      }
    }
  },
  computed: {
    ...mapState(['connectFlag', 'walletAddres', 'tokenData', 'pairData', 'dark'])
  },
  created() {
    this.tokenList = JSON.parse(JSON.stringify(this.tokenData))
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
    if (this.pairList && this.pairList.length > 0) {
      this.init()
    }
  },
  mounted() {

  },
  methods: {
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getpairList()
      })
    },
    toPool(item) {
      this.$router.push({
        name: 'Connectbox',
        params: {
          pair: JSON.stringify(item)
        }
      })
    },
    toRemove(item) {
      item.token1.balanceInPool = this.token1Balance
      item.token2.balanceInPool = this.token2Balance
      sessionStorage.setItem('toRemove', JSON.stringify(item))
      this.$router.push({
        name: 'removeLiquidity',
        params: {
          pair: JSON.stringify(item)
        }
      })
    },
    getpairList() {
      const that = this
      this.pairList.forEach((item, index) => {
        item.show = false
        getMyBalanceInPool(item).then((res) => {
          item.myBalanceInPool = Decimal(res).div(Math.pow(10, 18)).toFixed(6).toString()
          that.$set(that.pairList, index, item)
        })
      })
    },
    toggleDrop(item) {
      const that = this
      that.pairList.forEach((ktem) => {
        if (ktem.pair !== item.pair) {
          ktem.show = false
        } else {
          ktem.show = !item.show
        }
      })

      if (item.show) {
        getLpBalanceInPool(item).then((res) => {
          that.lpTotal = Decimal(res).div(Math.pow(10, 18))
          if (that.lpTotal) {
            that.share = Decimal(item.myBalanceInPool).div(that.lpTotal)
            that.getBalance(item)
          }
        })
      }
    },
    getBalance(item) {
      const that = this
      getBalanceInPool(item, item.token1).then((res) => {
        that.token1Balance = Decimal(res).mul(that.share)
      })
      getBalanceInPool(item, item.token2).then((res) => {
        that.token2Balance = Decimal(res).mul(that.share)
      })
    },
    requierImg(name, number) {
      let str
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
    }
  }
}
</script>

<style lang="scss" scoped>
.bottun_hei {
  height: 40px;
  border: 1px solid #0f1730;
  color: #070a0e;
  // font-family: roboto-mediumitalic;
}
.bottun_hei1 {
  height: 40px;
  background: #070a0e;
}

.fees {
  color: #0f1730;
  font-size: 18px;
  padding: 0 20px;
  .fees_account {
    height: 56px;
    line-height: 56px;
    border-radius: 16px;
    padding-left: 24px;
    margin-top: 32px;
    margin-bottom: 24px;
    border: 1px solid #0f1730;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      top: 16px;
      right: 24px;
    }
  }
  .cyrny_bg {
    overflow: hidden;
    margin-bottom: 10px;
    background: #f4f5fa;
    border-radius: 0 0 16px 16px;
    margin-top: 15px;
  }
  .fees_curny {
    background: url(../../assets/img/binp.png) no-repeat;
    background-size: cover;
    height: 72px;
    line-height: 72px;
    font-size: 16px;
    font-family: roboto-mediumitalic;
    color: #eeeef0;
    padding: 0 24px;
    cursor: pointer;
    border-radius: 16px;
    .curny_lt {
      .lt_img {
        position: relative;

        img {
          width: 24px;
          height: 24px;
        }
        img:nth-child(2) {
          transform: translateX(-10px);
        }
      }
    }
    .curny_size {
      font-weight: bold;
    }
  }
  .fees_share {
    padding: 0 24px;
    padding-top: 16px;
    padding-bottom: 32px;
    overflow: hidden;
    .rg {
      font-weight: bold;
    }
  }
  .accrued {
    margin-top: 24px;
    text-align: center;
    font-size: 16px;
    .acrued_img {
      width: 24px;
      height: 24px;
    }
  }
  .accrued_btn {
    margin-top: 27px;
    .btn_lt {
      width: 190px;
      button {
        height: 48px;
      }
    }
  }
  .hide_box {
    height: 0;
    overflow: hidden;
    transition: height 0.3s;
  }
  .liqui {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
    }
    .lt {
      color: #878b97;
      img {
        width: 24px;
        margin-right: 4px;
      }
    }
  }
  .actvimg {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }
  .transition {
    height: 315px;
    transition: height 0.3s;
  }
  .liveimg {
    transform: rotate(0deg);
    transition: transform 0.3s;
  }
  .pool_it {
    padding: 16px 0 32px 0px;
  }
}
@media screen and (max-width: 750px) {
  .removeLq {
    margin-top: 0px;

    .pool-box {
      width: 100%;
      // padding: 0 0.4rem ;
    }
    .pool-box2 {
      min-block-size: inherit;
    }
    .pool-box1 {
      p:nth-child(2) {
        font-size: 0.4rem;
      }
    }
  }
  .fees .fees_share {
    padding: 0 12px;
    padding-top: 16px;
  }
  .fees .accrued_btn .btn_lt {
    width: 48%;
  }
}
.dark {
  .pool-box1 {
    background: url(../../assets/img/dark/bg_pool.png) no-repeat;
    background-size: 100% 100%;
  }
  .pool-box2 .pool-p2 .pool-p3 {
    color: #fa7447;
  }
  .fees .accrued_btn .btn_lt button {
    background: linear-gradient(122deg, #fa7447 0%, #fe4943 100%);
  }
}
</style>
