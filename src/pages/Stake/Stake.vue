<template>
  <div class="container glbale_pd">
    <div class="stake"
         v-show="!showModel">
      <div class="content_top"
           v-if="login">
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
      <ul class="stake_list">
        <li v-for="(idx,index) in farmList"
            :key='index'>
          <div class="stake_top">
            <span class="lt_icon ">
              <img src="@/assets/img/btc.svg"
                   alt="" />
              <img src="@/assets/img/btc.svg"
                   alt="" />
            </span>
            <span class="content_zise">
              {{idx.name}}
            </span>
          </div>
          <div class="stake_addres">
            <div> <span class="lt_addres">Deposit:</span> <span class="rg_addres">{{idx.name}}</span></div>
            <div class="mrg"> <span class="lt_addres">Earn:</span> <span class="rg_addres">FARM</span></div>
          </div>
          <div class="stake_btn"
               @click="showModels(index)">12.04%APY</div>
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
    <selected v-show="showModel"
              :farmtoal="total"
              @Approve="Approve"
              @amount="clickAmount"
              @back="initColse"
              @stake="stake" />
  </div>
</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
import { approved } from '../../utils/tronwebFn'
import selected from './Selected'
import farmList from './farmList';
export default {
  data () {
    return {
      MasterChefContract: null,
      getContract: null,
      poolLength: 0,
      poolIndex: 0,
      login: false,
      showModel: false,
      farmList: farmList,
      total: {
        farmTotal: 0, // 总数
        shareToal: 0, // 抵押数量
        uniswaplp: 0, // 计算用户收益
        balanceOf: 0, // 钱包余额
        decimals: 0, // 精度 查询减 发送合约加
        btnFlag1: false,
        btnFlag2: false,
        btnFlag3: false

      },
      list: [
        {
          name: 'fUNISWAP_LP',
          name2: 'FARM',
          account: '12.04%'
        }
      ],
      poolList: farmList
    }
  },
  components: {
    selected
  },
  created () {
    this.init();
    let arry = localStorage.getItem('farmList');
    if (arry) {
      this.poolList = JSON.parse(arry);
    }
  },
  methods: {
    initColse () {

    },
    async init () {//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.grtMasterChef()
      })
    },
    async Approve (x) { //  提现 x = 0 ;领取奖励
      if (x === 0) { // 领取奖励
          this.total.btnFlag2 = true;
      } else {
          this.total.btnFlag3 = true;

      }
      try {
        let res = await this.getContract["allowance"](window.tronWeb.defaultAddress.base58, this.poolList[this.poolIndex].lpToken).call(); //查询授权
        if (res) {
          let approveBalance = parseInt(res._hex, 16)
          console.log('approveBalance====', approveBalance)
          if (approveBalance == 0) {
            await approved(this.poolList[this.poolIndex].lpToken, ipConfig.MasterChef); // 授权
            if (x == 0) {
              t
              this.withdraw(0)

            } else {

              this.withdraw()

            }
          } else {
            if (x == 0) {
              this.withdraw(0)

            } else {
              this.withdraw()

            }
          }
        } else {
        }
      } catch (error) {
        if (x === 0) { // 领取奖励
          this.total.btnFlag2 = false;
        } else {
          this.total.btnFlag3 = false;
        }
        console.log(error)
      }
    },
    async clickAmount () { // 领取奖励
      this.Approve(0);
    },
    async devFundDivRate () {

    },
    async stake (n) { // 抵押
      this.total.btnFlag1 = true;
      try {
        let res = await this.getContract["allowance"](window.tronWeb.defaultAddress.base58, this.poolList[this.poolIndex].lpToken).call(); //查询授权
        if (res) {
          let approveBalance = parseInt(res._hex, 16)
          console.log(approveBalance);

          if (approveBalance == 0) {
            console.log(this.poolList[this.poolIndex].lpToken)
            await approved(this.poolList[this.poolIndex].lpToken, ipConfig.MasterChef); // 授权
            this.deposit(n);
          } else {
            this.deposit(n);
          }
        } else {
        }
      } catch (error) {
        console.log(error)
        this.total.btnFlag1 = false;
      }

    },
    async grtMasterChef () {//连接MasterChef合约需要对应的合约base58信息
      this.MasterChefContract = await window.tronWeb.contract().at(ipConfig.MasterChef);
      console.log(this.MasterChefContract)
      if (this.MasterChefContract) {
        await this.getMasterChefContract();
      }
    },
    async getContracts (n) { // 查询对应合约余额
      try {
        this.getContract = await window.tronWeb.contract().at(n);
        let balanceOf = await this.getContract.balanceOf(window.tronWeb.defaultAddress.base58).call(); // 查询钱包余额余额
        console.log(balanceOf);
        this.total.decimals = await this.getContract.decimals().call(); // 精度
        let res = await this.toDecimal(balanceOf._hex);
        console.log(res);
        this.total.balanceOf = res == 0 ? 0 : res / Math.pow(10, this.total.decimals);
        // this.total.balanceOf = res 
      } catch (error) {
        console.log('getContracts==', error)
      }
    },
    async showModels (index) { // 弹框
      this.poolIndex = index;
      this.showModel = true;
      await this.getContracts(this.poolList[this.poolIndex].lpToken);
      await this.tokenPerBlock();
      let userInfo = await this.MasterChefContract.userInfo(this.poolIndex, window.tronWeb.defaultAddress.base58).call(); // 返回抵押多少
      let res = await this.toDecimal(userInfo.amount._hex);
      this.total.shareToal = res / Math.pow(10, this.total.decimals);
      await this.pendingTokens();
      console.log(res);
    },
    async updata () { // 提现 抵押 更新 余额  抵押数
      try {
        let balanceOf = await this.getContract.balanceOf(window.tronWeb.defaultAddress.base58).call(); // 查询钱包余额余额
        let res = await this.toDecimal(balanceOf._hex);
        // this.total.balanceOf =res
        console.log('updata==balanceOf', res)
        this.total.balanceOf = res / Math.pow(10, this.total.decimals);
        let userInfo = await this.MasterChefContract.userInfo(this.poolIndex, window.tronWeb.defaultAddress.base58).call(); // 返回抵押多少
        await this.pendingTokens();
        this.total.shareToal = await this.toDecimal(userInfo.amount._hex);
        console.log( this.total.shareToal)
        this.total.shareToal = this.total.shareToal / Math.pow(10, this.total.decimals);
        console.log('updata==userInfo', userInfo)


      } catch (error) {
        console.log(error);
      }
    },
    async getMasterChefContract () {//1.获取PoolInfo[] 返回列表一个数组，数组里的信息包括：lptoken的地址
      let that = this
      try {
        let leng = await that.MasterChefContract.poolLength().call();  // 返回从1开始;
        this.poolLength = await this.toDecimal(leng); // 16进制转10进制
        console.log(this.poolLength);
        let arry = [];
        for (let index = 0; index < this.poolLength; index++) {
          let res = await that.MasterChefContract["poolInfo"](index).call();
          // let res1 = await window.tronWeb.contract().at(res.lpToken);
          //  let res2 = await res1.name().call();
          //  let res3 =  await that.MasterChefContract.devFundDivRate().call(); // 利率
          //  let res4 = await this.toDecimal(res3);
          //  let res5 = await  that.MasterChefContract.goverFundDivRate().call();  // 利率
          //  let res6 = await this.toDecimal(res5);
          //  res.name = res2;
          // console.log('利率======',res4)
          // console.log('利率======',res6)
          //  console.log(res1)
          arry.push(res);
        }
        //  localStorage.setItem('farmList',JSON.stringify(arry));
        // this.poolList = arry;

      } catch (error) {
        console.log(error);
      }
    },

    async pendingTokens () {  // 计算用户收益有多少   PoolInfo[]数组的序号, 用户地址
      let penaccount = await this.MasterChefContract.pendingToken(this.poolIndex, window.tronWeb.defaultAddress.base58).call();
      let pre = await this.toDecimal(penaccount);
      console.log('pendingTokens', penaccount);
      this.total.uniswaplp = pre;
    },
    async deposit (n) { // 质押  
      // （1）PoolInfo[]数组的序号
      // （2）质押的数量,为0的时候只领取奖励，不进行质押
      let data = {  // 使用send来执行non-pure或modify智能合约方法，这些方法确实修改了区块链，消耗资源（bandwidth 和 energy）并且还广播到网络。
        // feeLimit:100000000,  //调用合约方法消耗最大数量的SUN。上限是 1000 TRX。(1TRX = 1,000,000SUN)
        // callValue:window.tronWeb.toSun(that.trxNum), // 本次调用往合约转账的SUN。
        shouldPollResponse: true, // 如果设置为 TRUE，则会等到在 Solidity 节点上确认事务之后再返回结果。
        // tokenId:0,  // 本次调用往合约中转账TRC10的tokenId。如果没有，不需要设置
        // tokenValue:0 // 本次调用往合约中转账TRC10的数量，如果不设置tokenId，这项不设置。
      };
       let num ;
      n = n * Math.pow(10, this.total.decimals);
      n = n+'';
      try {
       num = await this.MasterChefContract['deposit'](this.poolIndex, n).send(data);
      } catch (error) {
        console.log(error);
         this.total.btnFlag1 = false;
      }
      if (num) {
        this.updata();
        console.log(num);
      }
      this.total.btnFlag1 = false;
    },
    async withdraw (x) { // 提现   //  （1）PoolInfo[]数组的序号  // （2）提现的数量
      let arr = this.total.shareToal * Math.pow(10, this.total.decimals); 
      let n =  arr || 0;
      let num ;
        n = n -1;
        if (x===0) n = 0;
        n= n+'';
        console.log('withdraw====',n)
        debugger;
        try {
           num = await this.MasterChefContract.withdraw(this.poolIndex, n).send({
              shouldPollResponse: true
            });
        } catch (error) {
          this.$message.error('系统错误')
            console.log(error);
            if (x === 0) {
              this.total.btnFlag2 = false;
            } else {
              this.total.btnFlag3 = false;
            }
        }
  
      if (num) {
        this.updata();
        console.log(num);
      }
      if (x === 0) {
        this.total.btnFlag2 = false;
      } else {
        this.total.btnFlag3 = false;
      }
    },
    async tokenPerBlock () { // 转换 数值 
      this.total.farmTotal = await this.toDecimal(this.poolList[this.poolIndex].perBlockToken._hex);   // 总数
      // this.total.shareToal = await this.toDecimal(this.poolList[this.poolIndex].accFoxPerShare._hex);  //抵押数量
    },
    async toDecimal (n) { // 16进制转10进制
      try {
        let num = await window.tronWeb.toDecimal(n);
        return num;
      } catch (error) {
        console.log(error);
        return 0;
      }

    }

  }
  // 1. 初始化tronweb
  // 2. 链接对应的合约地址
  /// 4 授权 才能  抵押或者 提现
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
  // grid-template-columns: repeat(auto-fit, minmax(320px, 2fr));
  grid-template-columns: 320px 320px 320px;
  grid-template-rows: 320px 320px 320px;
  // grid-template-rows:3;
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
      }
    }
    .stake_btn {
      height: 48px;
      line-height: 48px;
      border-radius: 32px;
      border: 1px solid #ff5d37;
      text-align: center;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      font-weight: normal;
      color: #ff5d37;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>