<template>
  <div class="pool">
    <div class="pool-top">
      <h1 @click="createBPool">Pool</h1>
    </div>
   
    <AddLiquidity/>
    <!-- 弹框 -->
    <transition name="el-alert-fade" >
        <div class="v_alert" v-show="showAlert">
          <div class="alert_type">
            <img class="success"
            :class="types1 == 'failure'?'failure':''"
                 :src="types2[types1]"
                 alt="">
          </div>
          <div class="alert_size">Connect successfully</div>
          <div class="alert_button" v-show="types1 == 'failure'">
            <p class="failure_size">Please try again</p>
            <button class="alert_btn">Retry</button>
          </div>
        </div>
      </transition>

  </div>

</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
// import vbutton from '../../components/common/button'
// import { vbutton, container, fromInput } from '../../components/index'
import success from '@/assets/img/icon_successfully.svg';
import err from '@/assets/img/icon_faile.svg';
import failure from '@/assets/img/icon_faile.svg';
import AddLiquidity from './AddLiquidity'
export default {
  data () {
    return {
      test: '12',
      ppd: {
        a: 1,
        b: 2,
        c: 3
      },
      types1:'failure',
      test1:'0',
      showAlert:false,
      types2: {
        success,
        err,
        failure,
      }
    }
  },
  components:{
    // vbutton,
    AddLiquidity
  },
  created() {
    this.init()
  },
  methods: {
    init(){//初始化tronweb
      let that = this
      this.$initTronWeb().then(function (tronWeb) {
        that.getBFactoryContract()
      })
    },
    async getBFactoryContract(){//链接BFactory合约
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory);
    },
    async createBPool(){//newBPool
      let that = this
        try {
          if(this.BFactoryContract){
            let res = await that.BFactoryContract["newBPool"]().send();
            if(res){
              that.getBPoolContract()
            }
          }
        } catch (error) {
            console.log(error);
        }
    },
    async getBPoolContract(bPollContract){//链接BPool合约
      this.BPoolContract = await window.tronWeb.contract().at(bPollContract);
      if(this.BPoolContract){
        this.bindCoin()
      }
    },
    async bindCoin(){//bind
      let that = this
        try {
            let res = await that.BPoolContract["newBPool"]().send();
            if(res){
              that.getBFactoryContract()
            }
        } catch (error) {
            console.log(error);
        }
    },
  }

}
</script>

<style lang="scss" >
.demo {
  --demostyle: red;
  color: var(--demostyle);
}

.pool {
  height: 1008px;
  background: #0f1522;
  /* position: relative; */
}

.pool-box2 {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 30px;

  .pool-p {
    width: 127px;
    height: 22px;
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #e5ebf2;
    line-height: 23px;
  }
  .pool-p1 {
    width: 360px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    color: #a6aeb7;
    line-height: 21px;
    margin-top: 24px;
  }
  .pool-p2 {
    width: 380px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    color: #a6aeb7;
    line-height: 21px;
    margin-top: 20px;

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
    width: 400px;
    display: flex;
    justify-items: center;
    margin-top: 24px;
    .pool-butt1 {
      width: 200px;
    }
    .pool-butt2 {
      width: 200px;
    }
  }
}

.pool-top {
  box-sizing: content-box;
  padding-top: 132px;
  width: 52px;
  height: 27px;
  margin: 0 auto;
  overflow: hidden;
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 9px;
}
.pool-box {
  margin: 0 auto;
  width: 720px;
  height: 506px;
  background: #171f30;
  border-radius: 20px;
}
.pool-box1 {
  width: 723px;
  height: 233px;
  background: #0d1429;
  opacity: 0.8203;
}
.pool-box1 p:nth-child(1) {
  box-sizing: content-box;
  padding-top: 55px;
  margin-left: 34px;
  font-size: 20px;
  font-family: ArialMT;
  color: #eeeef0;
  line-height: 23px;
}
.pool-box1 p:nth-child(2) {
  margin-top: 12px;
  margin-left: 34px;
  font-size: 18px;
  font-family: ArialMT;
  color: #eeeef0;
  line-height: 21px;
}
.pool-box1 p:nth-child(3) {
  margin-top: 24px;
  font-size: 18px;
  margin-left: 34px;
  font-family: ArialMT;
  color: #878b97;
  line-height: 21px;
}
.title {
  height: 71px;
  line-height: 71px;
  border-bottom: 1px solid #0f1522;
  padding: 0 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .content_text {
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #eeeef0;
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
  background: #0f1522;
  border-radius: 16px;
  padding: 29px 0;
  font-family: ArialMT;
  color: #e5ebf2;
  p {
    text-align: center;
    background: #0f1522;
    border-radius: 16px;
  }
  p:nth-child(1) {
    font-size: 20px;
    margin-bottom: 16px;
  }
  p:nth-child(2) {
    margin-bottom: 8px;
  }
}
.v_alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 280px;
  height: 280px;
  background: rgba(147, 154, 169, 0.27); // 0.27
  border-radius: 19px;
  text-align: center;
  .alert_type {
    .success {
      margin-top: 97px;
    }
    .failure{
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