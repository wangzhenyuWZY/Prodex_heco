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
          <div class="pool-inp">
            <vfromInput   v-model="test" text="wwwwwwww" hideSlect />
          </div>
          <div class="pool-butt">
          <vbutton text='Add Liquidity' height='48' ></vbutton>
           <h1 ref='demo' @click="fn" class="demo">2222</h1>
          </div>
        </div>
    </div>
    
</div>

</template>

<script>
import vfromInput from '../../components/common/fromInput'
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
    vfromInput,
  },
  methods: {
     fn () {
        this.$refs.demo.style.setProperty('--demostyle','white');
     }
  },

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
.pool-butt {
  width: 200px;

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