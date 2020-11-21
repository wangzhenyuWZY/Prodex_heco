<template>
  <div class="token">
      <!-- <samp>{{}}</samp> -->
  </div>
</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
export default {
    data(){
        return{
            PoolInfo:0,           
        }
    },
created(){

},
methods:{
    init(){//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58).then(function (account) {
          that.trxBalance = window.tronWeb.fromSun(account.balance)
        });
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
            let res = await that.stakeContract["balanceOf"](window.tronWeb.defaultAddress.base58).call();
            that.PoolInfo = window.tronWeb.fromSun(res)
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

<style>

</style>