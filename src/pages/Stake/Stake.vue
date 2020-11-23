<template>
  <div class="container">
    <div class="stake">
      <ul class="stake_list">
        <li v-for="(idx,index) in list"
            :key='idx.name+index'>
          <div class="stake_top">
            <span class="lt_icon">
              <img class="lt_icon"
                   src="@/assets/img/icon_down.svg"
                   alt="" />
              <img class="lt_icon"
                   src="@/assets/img/icon_down.svg"
                   alt="" />
            </span>
            <span class="content_zise">
              Uni ETH-USDT
            </span>
          </div>
          <div class="stake_addres">
            <div> <span class="lt_addres">Deposit:</span> <span class="rg_addres">{{idx.name}}</span></div>
            <div class="mrg"> <span class="lt_addres">Earn:</span> <span class="rg_addres">{{idx.name2}}</span></div>
          </div>
          <div class="stake_btn">{{idx.account}}%APY</div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
export default {
  data () {
    return {
      stakepoolinfo:'0',
      list: [
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        },


      ]
    }
  },
created() {
  this.init()
},
methods:{
    init(){//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        // window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58).then(function (account) {
        //   that.trxBalance = window.tronWeb.fromSun(account.balance)
        // });
        that.grtMasterChef()
      })
    },
    
    async grtMasterChef(){//连接MasterChef
      this.stakeContract = await window.tronWeb.contract().at(ipConfig.MasterChef);
      if(this.stakeContract){
        this.getstake()
      }
    },
    async getstake(){//1.获取PoolInfo[] 返回一个数组，数组里的信息包括：lptoken的地址
       let that = this
       try {
            let res = await that.stakeContract["poolInfo"](window.tronWeb.defaultAddress.base58).call();
            that.stakepoolinfo = window.tronWeb.fromSun(res)
        } catch (error) {
            console.log(error);
        }

    },

}
// 2. deposit用来质押，需要传入的参数
// （1）PoolInfo[]数组的序号
// （2）质押的数量,为0的时候只领取奖励，不进行质押

// 3. withdraw用来提现，需要传入的参数
// （1）PoolInfo[]数组的序号
// （2）提现的数量

// 4. pendingToken 计算用户的收益有多少
// （1）PoolInfo[]数组的序号
// （2）用户的地址

// (5).计算APY
}
</script>

<style lang="scss" scoped>
.stake {
  max-width: 1024px;
  margin: 0 auto;
}

ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  li {
    width: 320px;
    box-sizing: border-box;
    background: #171f30;
    border-radius: 4px;
    padding: 37px 42px;
    margin-bottom: 32px;
    .content_zise {
      font-size: 20px;
      font-family: Arial-BoldMT, Arial;
      font-weight: normal;
      color: #eeeef0;
      vertical-align: middle;
    }
    .lt_icon {
      > img {
        vertical-align: middle;
      }
    }
    .stake_addres {
      margin-top: 40px;
      margin-bottom: 40px;
      > span {
        display: inline-block;
      }
      .mrg {
        margin-top: 18px;
      }

      .lt_addres {
        font-size: 20px;
        font-family: ArialMT;
        color: #878b97;
        text-align: right;
        display: inline-block;
        width: 74px;
      }
      .rg_addres {
        font-size: 18px;
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
        color: #eeeef0;
      }
    }
    .stake_btn {
      width: 200px;
      height: 48px;
      line-height: 48px;
      border-radius: 32px;
      border: 1px solid #ff5d37;
      text-align: center;
      font-size: 18px;
      font-family: Arial-BoldMT, Arial;
      font-weight: normal;
      color: #ff5d37;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>