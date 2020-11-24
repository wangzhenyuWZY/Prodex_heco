<template>
  <div class="container glbale_pd">
    <div class="stake">
      <div class="content_top" v-if="login">
        <div class="connected clearfix">
          <div class="text_one fl_lt">Earn FARM with FoxDex</div>
             <div class="fl_rg conted_btn">
            <el-button class="from_botton"> <img class="whe_img"
                   src="@/assets/img/icon_my_wallet.svg"
                   alt=""> Connect to a wallet</el-button>
          </div>
          <div class="fl_rg text_two">You haven't connected a wallet.</div>
        </div>
        <div class="ect_title">
          Stake your LP tokens for rewards
        </div>
      </div>
      <ul class="stake_list" v-if="list.length>0">
        <li v-for="(idx,index) in list"
            :key='index'>
          <div class="stake_top">
            <span class="lt_icon ">
              <img src="@/assets/img/btc.svg"
                   alt="" />
              <img src="@/assets/img/btc.svg"
                   alt="" />
            </span>
            <span class="content_zise">
              Uni ETH-USDT
            </span>
          </div>
          <div class="stake_addres">
            <div> <span class="lt_addres">Deposit:</span> <span class="rg_addres">fUNISWAP_LP</span></div>
            <div class="mrg"> <span class="lt_addres">Earn:</span> <span class="rg_addres">name2</span></div>
          </div>
          <div class="stake_btn" @click="showModels(index)">12.04%APY</div>
          <div class="stake_apy clearfix">
            <!-- <div class="apy_lt"> <span class="apy_size">APY:</span> <span class="apy_number">322.16%</span> </div>
               <div class="apy_rg"> <span class="apy_size">APR:</span> <span class="apy_number">146.03%</span>  </div> -->
            <div class="prizes">18,000 USD in prizes</div>
          </div>
        </li>
      </ul>
    </div>
    <add  
      v-show="showModel"
      :farmtoal = total
     />
  </div>
</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
import add from './Selected'
export default {
  data () {
    return {
      MasterChefContract: null,
      poolLength: 0,
      poolIndex:0,
      login:false,
      showModel:false,
      total:{
        farmTotal:0,
        shareToal:0,
        uniswaplp:0,
        maxamount:0
        

      },
      list: [
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        }
      ],
      poolList: [

      ]
    }
  },
  components: {
    add
  },
  created () {
    this.init()
  },
  methods: {
    init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
          that.grtMasterChef()
         that.getWtrx();

      })
    },
    async grtMasterChef () {//连接MasterChef合约需要对应的合约base58信息
      this.MasterChefContract = await window.tronWeb.contract().at(ipConfig.MasterChef);
      console.log(this.MasterChefContract)
      if (this.MasterChefContract) {
        this.getMasterChefContract();
      }
    },
    async showModels (index) {
      this.poolIndex = index;
    //  await this.pendingToken();
    //  await this.tokenPerBlock();
      this.showModel = true;

      // this.tokenPerBlock();
    },
    async getMasterChefContract () {//1.获取PoolInfo[] 返回列表一个数组，数组里的信息包括：lptoken的地址
      let that = this
      try {
        let leng = await that.MasterChefContract.poolLength().call();  // 返回从1开始;
        this.poolLength = await this.toDecimal(leng); // 16进制转10进制
        console.log(this.poolLength)
        for (let index = 0; index < this.poolLength; index++) {
              let res=  await that.MasterChefContract["poolInfo"](index).call();
                 this.poolList.push(res);
        }
        // let res1 = await that.MasterChefContract["deposit"]('TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x').call();
        // console.log(res1);
        // that.stakepoolinfo = window.tronWeb.fromSun(res)
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async pendingToken () {  // 计算用户收益有多少   PoolInfo[]数组的序号, 用户地址
      // let data = [
      //     this.poolIndex,
       
      // ]
      let penaccount = await this.MasterChefContract.pendingToken(this.poolIndex, 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x').call(); 
      let pre =  await this.toDecimal(penaccount);
      // this.deposit()
      // this.withdraw();
      
      console.log(pre);

    },
    async deposit () { // 质押  
        // （1）PoolInfo[]数组的序号
        // （2）质押的数量,为0的时候只领取奖励，不进行质押
        let num = await this.MasterChefContract.deposit(0,0).send();
        if (num) {
            console.log(num);
        }
    },
    async withdraw () { // 提现
    //  （1）PoolInfo[]数组的序号
    // （2）提现的数量
     let data = {"_pid":0,"_amount":0};
            let num = await this.MasterChefContract.withdraw(0,0).send();
            if (num) {
              console.log(num);
            }
    },
     async getWtrx(){//获取
      var that = this;
        window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58).then(function (account) {
          console.log(account);
           that.total.maxamount  = window.tronWeb.fromSun(account.balance);
        })
      // let that = this;
      // console.log(this.MasterChefContract)
      //   try {
      //       let res = await that.MasterChefContract.balanceOf(window.tronWeb.defaultAddress.base58).call();
      //       console.log(res);
      //       // that.wtrxBalance = window.tronWeb.fromSun(res)
      //   } catch (error) {
      //       console.log(error);
      //   }
    },
    async tokenPerBlock () { // 转换 数值 
         this.total.farmTotal = await this.toDecimal(this.poolList[this.poolIndex].perBlockToken._hex);   // 总数
        this.total.shareToal = await this.toDecimal(this.poolList[this.poolIndex].accFoxPerShare._hex);  //抵押数量
    },
    async toDecimal (n) { // 16进制转10进制
        try {
              let num =await  window.tronWeb.toDecimal(n);
              return num;
        } catch (error) {
            console.log(error);
             return 0;
        }
         
    }  
    
  }
  // 1. 初始化tronweb
  // 2. 链接对应的合约地址

  // 2. deposit用来质押，需要传入的参数
  // （1）PoolInfo[]数组的序号
  // （2）质押的数量,为0的时候只领取奖励，不进行质押

  // 3. withdraw用来提现，需要传入的参数
  // （1）PoolInfo[]数组的序号
  // （2）提现的数量

  // 4. pendingToken 计算用户的收益有多少
  // （1）PoolInfo[]数组的序号
  // （2）用户的地址
  // 收益率  总数/余额/ 价格
  //  0:"lpToken: TNFjWx7h4X9LqGcfJumnTsKDdzN1ePvQ5C"   UNISWAP_LP
  //  1:"allocPoint: 1"    占比
  //  2:"lastRewardBlock: 9,925,699" 
  //  3:"accFoxPerShare: 0"    抵押数量
  //  4:"perBlockToken: 1,950,000,000,000,000,000"    资金池总数
}
</script>

<style lang="scss" scoped>
.glbale_pd{
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
    font-family: Arial-BoldMT, Arial;
    text-align: center;
    margin-top: 32px;
  }
  .text_one {
    font-size: 24px;
    font-family: Arial-BoldMT, Arial;
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
    font-family: Arial-BoldMT, Arial;
    float: right;
  }
  .prizes {
    text-align: center;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #0f1730;
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 2fr));
      gap: 32px;
  // display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  li {
    width: 320px;
    background: #ffffff;
    border-radius: 16px;
    padding: 37px 32px;
    .content_zise {
      font-size: 20px;
      font-family: Arial-BoldMT, Arial;
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
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
      }
    }
    .stake_btn {
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