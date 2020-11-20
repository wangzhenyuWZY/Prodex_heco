<template>
<div class="pool"> 
    <div class="pool-top"><h1>Pool</h1></div>
    <div class="pool-box">
        <div class="pool-box1">
            <p>Liquidity provider rewards</p>
            <p>Liquidity providers earn a 0.3% fee on all trades proportional to their share of 
               <br>
               pool. Fees are added to the pool, accrue in real time and can be claimed 
               <br>
               withdrawing your liquidity.</p>
            <p>Read more about providing liquidity</p>
        </div>
        <div class="pool-box2">
          <samp class="pool-p">Your liquidity</samp>
          <div class="pool-butt">
          <div class="pool-butt1">
          <vbutton text='Add Liquidity' height='48' ></vbutton>
          </div>
          <div class="pool-butt2">
          <vbutton text='Add Liquidity' height='48' ></vbutton>
           <h1 ref='demo' @click="fn" class="demo">2222</h1>
          </div>
          </div>
          <samp class="pool-p1">Connect to a wallet to view your liquidity.</samp>
          <samp class="pool-p2"> Don't see a pool you joined?<samp class="pool-p3"> Import it.</samp></samp>
        </div>
    </div>
    
</div>

</template>

<script>
import ipConfig from '../../config/ipconfig.bak'
import vbutton from '../../components/common/button'
export default {
  data(){
    return{
      test:'12',
      ppd:{
        a:1,
        b:2,
        c:3
      }
    }
  },
  components:{
    vbutton,
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
      if(this.BFactoryContract){
        this.createBPool()
      }
    },
    async createBPool(){//newBPool
      let that = this
        try {
            let res = await that.BFactoryContract["newBPool"]().send();
            if(res){
              console.log(res)
            }
        } catch (error) {
            console.log(error);
        }
    },
  }

}
</script>

<style lang="scss" scoped>
.demo{
--demostyle:red;
color: var(--demostyle);;
}

.pool{
  height: 1008px;
  background: #0F1522;
  /* position: relative; */
}

.pool-box2{
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 30px;
 
.pool-p{
  width: 127px;
  height: 22px;
  font-size: 20px;
  font-family: Arial-BoldMT, Arial;
  font-weight: normal;
  color: #E5EBF2;
  line-height: 23px;
}
.pool-p1{
  width: 360px;
  height: 20px;
  font-size: 18px;
  font-family: ArialMT;
  color: #A6AEB7;
  line-height: 21px;
  margin-top: 24px;
}
.pool-p2{
  width: 380px;
  height: 20px;
  font-size: 18px;
  font-family: ArialMT;
  color: #A6AEB7;
  line-height: 21px;
  margin-top: 20px;

  .pool-p3{
    width: 76px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    color: #FF5D37;
    line-height: 21px;
  
 }
}

.pool-butt{
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

.pool-top{
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
.pool-box{
   
  margin: 0 auto;
  width: 720px;
  height: 506px;
  background: #171F30;
  border-radius: 20px;    
}
.pool-box1{
  width: 723px;
  height: 233px;
  background: #0D1429;
  opacity: 0.8203;
}
.pool-box1 p:nth-child(1){ 
    box-sizing: content-box;
    padding-top: 55px; 
    margin-left: 34px;
    font-size: 20px;
    font-family: ArialMT;
    color: #EEEEF0;
    line-height: 23px;
}
.pool-box1 p:nth-child(2){
    margin-top: 12px;
    margin-left: 34px;
    font-size: 18px;
    font-family: ArialMT;
    color: #EEEEF0;
    line-height: 21px;
}
.pool-box1 p:nth-child(3){
    margin-top: 24px;  
    font-size: 18px;
    margin-left: 34px;
    font-family: ArialMT;
    color: #878B97;
    line-height: 21px;
}

</style>