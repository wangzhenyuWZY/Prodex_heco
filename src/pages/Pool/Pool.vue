<template>
  <div class="container ppcode">
    <!-- <div class="globle_title">Pool</div> -->
      <!-- <addfrombox/> -->
      <!-- <connectbox/> -->
      <!-- <selctoken/> -->
      <!-- <AddLiquidity /> -->
      <!-- <recevive/> -->
        <!-- <willRecevive/> -->
              <!-- <liquidity/> -->
    <!-- <vAlret/> -->
      <router-view></router-view>
    <!-- <liquidity/> -->
    <!-- <Pool1/> -->
    <!-- <Pool2/> -->
    <!-- <createpair/> -->

  </div>

</template>

<script>

export default {
  data() {
    return {

    }
  },
  components: {
    // addfrombox,
    // connectbox,
    // selctoken
    // AddLiquidity,
    // recevive,
    //  willRecevive,
    // vAlret
  },

  created() {

  },
  methods: {

  }

}
</script>

<style lang="scss" >

.globle_title{
    // margin-top: 128px;
    height: 28px;
    font-size: 24px;
    font-family: roboto-mediumitalic, Roboto;
    font-weight: normal;
    color: #0F1730;
    line-height: 28px;

}
@import '@/styles/pool.scss';
@media screen and (max-width: 750px) {
  .pool-box{
    width: 100%;
    margin-top: 10px;
    .pool-box1 {
      // height: 190px;
      p:nth-child(1) {
        padding-top: 20px;
        font-size: 0.5rem;
      }
       p:nth-child(2) {
        font-size: 0.35rem;
      }
        p:nth-child(3) {
        font-size: 0.4rem;
        padding-bottom: 0.3rem;
      }

    }
    .pool-box2 {
        .pool-butt{
            .pool-p{
                font-size : 0.35rem;
                width: 170px;
            }
        }
    }
    .fees{
       .fees_account{
         font-size: 0.35rem;
       }
    }
    .bottun_hei{
      font-size: 0.35rem;
    }
    .bottun_hei1{
     font-size: 0.35rem;
    }
  }
  .ppcode{
    padding: 0 0.4rem ;

  }

}
</style>
