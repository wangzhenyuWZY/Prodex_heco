<template>
  <container top="32">
    <!-- top="0" -->
    <div class="title"
         slot="title">
      <div class="lt_box">
        <span class="icon_box">
          <i class="el-icon-back back_icon"></i>
        </span>

        <span class="content_text">Add Liquidity</span>
      </div>
      <div class="rg_box">
        <img src="@/assets/img/icon_instructions.svg"
             alt="" />
      </div>
    </div>
    <div slot="body">
      <!-- 滑块部分开始 -->
      <div class="box_top clearfix"><span>Acoout</span><span>Detailed</span></div>
      <div class="box_sizes ">
        <div class="provider add_marg">
          <div class="box_slider">
            <div class="between">{{value4}}%</div>
            <div class="demonstration">
              <el-slider :show-tooltip="false"
                         v-model="value4"
                         ></el-slider>
            </div>
          </div>
          <ul class="setSlider">
            <li>25%</li>
            <li>50%</li>
            <li>75%</li>
            <li>MAX</li>
          </ul>
        </div>
      </div>
      <!-- 滑块结束 -->
      <!-- 箭头 -->
      <div class="from_contentIcon">
        <i class="el-icon-back tran_icon"></i>
      </div>
      <!-- end -->
      <!-- <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="From"
                     v-model="value1"></frominput>
        </div>
        <div class="ctx_2 fl_lt">
          <frominput lable="From"
                     v-model="value2"> </frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect text="深圳" />
        </div>
      </div> -->

      <!-- <div class="from_contentIcon">+</div> -->
      <!-- <div class="setInput clearfix">
        <div class="ctx_1 fl_lt">
          <frominput lable="From"
                     v-model="value3"></frominput>
        </div>
        <div class="ctx_2 fl_lt">
          <frominput lable="From"
                     v-model="value4"> </frominput>
        </div>
        <div class="ctx_3 fl_lt">
          <setselect text="深圳" />
        </div>
      </div> -->
      <!-- 提交按钮 -->
      <!-- <div class="margintop">
        <v-button height="50"
                  @click="showAlert = true">
          <img src="@/assets/img/icon_my_wallet.svg"
               alt="">
          <span>Connect to a wallet</span>
        </v-button>
      </div> -->
        <div class="box_sizes">
          <div class="provider Receive">
            <div class="">
              <div class="received">
                <div class="lt">
                  <img class="lt_icon"
                      src="@/assets/img/icon_wen.svg"
                      alt="">
                  <span>ETH</span>
                </div>
                <div class="rg"> --</div>
              </div>
              <div class="received ive_top">
                <div class="lt">
                  <img src="@/assets/img/icon_wen.svg"
                      alt="">
                  <span>USDT</span>
                </div>
                <div class="rg">--</div>
              </div>
            </div>
            <div class="weth">
              <el-button class="weth_btn">Receive WETH</el-button>
            </div>
          </div>
        </div>
        <div class="mount_title">
          Price
        </div>
        <div class="box_sizes box_Price">
          <div class="provider Receive">
            <div class="">
              <div class="received ">
                <div class="lt">
                  <span>1ETH=499.165 USDT</span>
                </div>
                <div class="rg">1USDT=0.02034564 ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Approve_btn clearfix">
              <el-button class="Approve1" >Approve</el-button>
              <el-button class="Approve1 Approve2" >Enter an amount</el-button>
        </div>
    </div>
  </container>
</template>

<script>
import { container ,frominput,setselect} from '../../components/index'

export default {
  data () {
    return {
      test1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: 0,

    }
  },
  components: {
    // vButton: vbutton,
    container,
    // frominput,
    // vfromInput: fromInput,
    // setselect

  }
}
</script>

<style lang="scss"  >
.ctx_1 {
  width: 397px;
  display: inline-block;
}
.ctx_2 {
  width: 138px;
  display: inline-block;
  margin: 0 16px;
}
.ctx_3 {
  width: 190px;
  display: inline-block;
  margin-left: 12px;
}
.from_contentIcon {
  height: 36px;
  font-size: 32px;
  font-family: ArialMT;
color: #0F1730;
  text-align: center;
}
// .add_marg{
//   margin-left: 40px;
//   margin-right: 29px;
// }
.box_top {
  padding-left: 16px;
  padding-right: 27px;
  margin-bottom: 12px;
  span {
    font-size: 20px;
  }
  span:nth-child(1) {
    float: left;
    color: #0f1730;
  }
  span:nth-child(2) {
    float: right;
    color: #ff5d37;
    text-decoration: underline;
    cursor: pointer;
  }
}
.box_slider {
  display: flex;
  .between {
    font-size: 56px;
    font-weight: normal;
    color: #ff5d37;
    width: 144px;
  }
  .demonstration {
    flex: 1;
    padding-top: 10px;
  }
}
.lt_box {
  .back_icon {
    color: #fff;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: linear-gradient(136deg, #fdab2b 0%, #df0019 100%);
    cursor: pointer;
  }
}
.margintop {
  width: 320px;
  margin: 0 auto;
  img {
    vertical-align: sub;
    margin-right: 4px;
  }
}
.rece_content {
  padding: 0 24px;
}
.ive_top {
  margin-top: 24px;
}
.received {
  display: flex;
  justify-content: space-between;
  color: #0f1730;

  span {
    display: inline-block;
    font-size: 20px;
  }
  img {
    width: 24px;
    height: 24px;
    vertical-align: sub;
    margin-right: 8px;
  }
  .rg {
  }
  .setColr {
    color: #ff5d37;
  }
}
.setSlider {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  li {
    width: 112px;
    line-height: 48px;
    border-radius: 24px;
    font-weight: normal;
    color: #ffffff;
    font-size: 20px;
    background: #0f1730;
    text-align: center;
    cursor: pointer;
  }
}
.add_marg {
  padding: 50px 38px 32px 39px;
}
.from_contentIcon {
  margin: 24px 0;
  .tran_icon {
    transform: rotate(-90deg);
    color: #0f1730;
    font-size: 32px;
    font-weight: bold;
  }
}
.Receive {
  padding: 24px 32px;
}
.weth {
  width: 200px;
  margin: 0 auto;
  margin-top: 16px;
  .weth_btn {
    background: none;
    border-radius: 28px;
    border: 1px solid #ff5d37;
    font-size: 20px;
    color: #fe613c;
    padding: 0;
    width: 200px;
    height: 32px;
  }
}
.mount_title {
  font-size: 20px;
  font-weight: normal;
  color: #0f1730;
  padding-left: 32px;
  margin-top: 32px;
}
.box_Price {
  margin-top: 12px;
  span {
    font-size: 18px;
  }
}
.Approve_btn{
  padding: 48px 0;
  .Approve1{
      width: 293px;
      height: 56px;
      border-radius: 25px;
      color: #878B97;
      font-size: 20px;
      border: none;
    background: #F4F5FA;
  }
    .Approve2{
      float: right;
    }

}
.demonstration {
  .el-slider__button {
    border: none;
    width: 32px;
    height: 32px;
    position: relative;
  }
  .el-slider__button::before {
    content: "";
    background: #ff5d37;
    width: 20px;
    height: 20px;
    line-height: 32px;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .el-slider__bar {
    background: #0f1730;
  }
  .el-slider__runway {
    background: #0f1730;
  }
}
</style>