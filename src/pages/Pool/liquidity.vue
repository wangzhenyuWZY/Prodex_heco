<template>
  <div class="pool-box">
    <div class="pool_bg clearfix">

      <div class="pool-box1">
        <p>Liquidity provider rewards</p>
        <p>Liquidity providers earn a 0.3% fee on all trades proportional to their share of
          the pool. Fees are added to the pool, accrue in real time and can be claimed
          withdrawing your liquidity.</p>
        <p>Read more about providing liquidity</p>
      </div>
      <div class="pool-btn clearfix">
        <p class=""></p>
      </div>
      <div class="pool-box2">
        <div class="pool-butt">
          <samp class="pool-p">Your liquidity</samp>
          <div class="pool-butt1">
            <router-link to="/pool/pairs">
              <el-button class="from_botton red_button bottun_hei">Create a pair</el-button>
            </router-link>  
          </div>
          <div class="pool-butt2 ">
            <router-link to="/pool/connectpool">
              <el-button class="from_botton bottun_hei">Add Liquidity</el-button>
            </router-link>
          </div>
        </div>
        <div class="pool_boxbg" v-show="false">
          <samp class="pool-p1">Connect to a wallet to view your liquidity.</samp>
          <samp class="pool-p2"> Don't see a pool you joined?<samp class="pool-p3"> Import it.</samp></samp>
        </div>
        <div class="fees" v-show="true" >
          <div class="fees_account">Acoout analytics and accrued fees <img  src="@/assets/img/icon_jump_green.png"
                 alt=""></div>
          <div class="cyrny_bg">
            <div class="fees_curny clearfix" @click="show=!show">
              <div class="curny_lt fl_lt">
                <span class="lt_img">
                  <img src="@/assets/img/btc.svg"
                       alt="">
                  <img src="@/assets/img/btc.svg"
                       alt="">
                </span>
                <span class="curny_size">
                  ETH/USDT
                </span>
              </div>
              <div class="cyrny_rg fl_rg">
                <span>Manage</span>
                <img src="@/assets/img/icon_down.png"
                      :class="show?'actvimg':'liveimg'"
                     alt="">
              </div>
            </div>
  
            <div class="box_sizes" :class="show?'transition':'hide_box'" >
              <div class="provider ">
                <div class="fees_share">
                  <div class="received">
                    <div class="lt ">
                      <span>Your tatal pool token:</span>
                    </div>
                    <span class="rg">4.9345465</span>
                  </div>
                  <div class="received mrgtop16">
                    <div class="lt">
                      <img src="@/assets/img/btc.svg"
                           alt="">
                      <span>Pooled ETH:</span>
                    </div>
                    <span class="rg">4.9345465</span>
                  </div>
                  <div class="received mrgtop16">
                    <div class="lt">
                       <img class="lt_icon"
                           src="@/assets/img/btc.svg"
                           alt="">
                      <span>Pooled USDT:</span>
                    </div>
                    <span class="rg">4.9345465</span>
                  </div>
                  <div class="received mrgtop16">
                    <div class="lt">
                      <span>Your pool share:</span>
                    </div>
                    <span class="rg">0.000040532%</span>
                  </div>
                  <div class="accrued">
                    View accrued fees and analycis
                    <img class="acrued_img"  src="@/assets/img/icon_jump_green.png" alt="">
                  </div>
                  <div class="accrued_btn clearfix">
                        
                    <div class=" btn_lt fl_lt"> 
                      <el-button class="from_botton">Add</el-button>
                    </div>
                    <div class=" btn_lt fl_rg">  
                      <el-button class="from_botton">Remove</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
          </div>
            <div class="pool_it">
              <samp class="pool-p2"> Don't see a pool you joined?<samp class="pool-p3"> Import it.</samp></samp>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
 data() {
   return {
     show: false
   }
 },
}
</script>

<style lang="scss" scoped>
.bottun_hei {
  height: 48px;
}
.fees {
  color: #0f1730;
  font-size: 18px;
  padding: 0 32px;
  .fees_account {
    height: 56px;
    line-height: 56px;
    border-radius: 16px;
    padding-left: 24px;
    margin-top: 32px;
    margin-bottom: 32px;
    border: 1px solid #0f1730;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      top: 12px;
      right: 24px;
    }
  }
  .cyrny_bg {
    background: #f4f5fa;
    border-radius: 0 0 16px 16px;
  }
  .fees_curny {
    background: url(../../assets/img/binp.png) no-repeat;
    background-size: cover;
    height: 72px;
    line-height: 72px;
    font-size: 20px;
    font-family: Roboto-Regular, Roboto;
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
  .fees_share{
    padding: 0 24px;
    padding-top: 16px;
    padding-bottom: 32px;
    .rg{
      font-weight: bold;
    }
  }
  .accrued{
    margin-top: 24px;
    text-align: center;
      .acrued_img{
        width: 24px;
        height: 24px;
      }
     
  }
  .accrued_btn{
    margin-top: 27px;
     .btn_lt{
        width: 270px;
      }
  }
  .hide_box{
  height: 0;
   overflow: hidden;
  transition:height .3s;
  }
  .actvimg{
    transform: rotate(180deg);
      transition:transform .3s;
  }
  .transition{
   height: 315px;
    transition: height 0.3s ;
  }
  .liveimg{
     transform: rotate(0deg);
      transition:transform .3s;
  }
  .pool_it{
    padding: 16px 0 32px 24px;

  }
}

</style>