<template>
  <el-dialog title="" :visible.sync="showAlert" :width="mobile?'480px':' 90%'" custom-class="dialog_recevive" :before-close="handleClosea">
    <span slot="title" class="select_size">
      <span> {{$t('ywr')}} </span>
    </span>
    <div class="box_sizes">
      <div class="provider receive__Pool receove_Share">
        <div class="received ">
          <span class="rg ftblod">{{token1Num}}</span>
          <div class="lt ">
            <img :src="requierImg(token1.name,0)" alt="" />
            <span>{{token1.name}}</span>
          </div>

        </div>
        <div class="add">+</div>
        <div class="received ">
          <span class="rg ftblod">{{token2Num}}</span>
          <div class="lt ">
            <img :src="requierImg(token2.name,0)" alt="" />
            <span>{{token2.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="receive__size">{{$t('oiei')}}</div>
    <div class="box_sizes">
      <div class="provider receove_Share ">
        <div class="">
          <div class="received mrge32" v-show="false">
            <div class="lt ">
              <img class="lt_icon" src="@/assets/img/btc.svg" alt="">
              <span>ETH/USDT Burned</span>
            </div>
            <span class="rg ftblod">0.000000233456</span>
          </div>
          <div class="received mobiles mrge12">
            <div class="lt">
              <span class="ftblod">{{$t('Exc.Price')}}</span>
            </div>
            <span class="ftblod">1{{token1.name}}={{justPrice.toFixed(6)}} {{token2.name}}</span>
          </div>
          <div class="conversion ftblod">1{{token2.name}}={{reversePrice.toFixed(6)}} {{token1.name}}</div>

        </div>
      </div>
    </div>
    <el-button class="from_botton recevive_btn" @click="clickFn  ">{{$t('confirm')}}</el-button>
  </el-dialog>
</template>

<script>
import { IsPc } from '../../utils/index'
export default {
  props: {
    showAlert: {
      type: Boolean,
      default: false
    },
    token1Num: {
      type: [String, Number],
      default: '0'
    },
    token2Num: {
      type: [String, Number],
      default: '0'
    },
    t1Per: {
      type: [String, Number],
      default: '0'
    },
    t2Per: {
      type: [String, Number],
      default: '0'
    },
    token1: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clickFn: {
      type: Function
    },
    token2: {
      type: Object,
      default: () => {
        return {}
      }
    },
    reciveLptoken: {
      type: [String, Number, Object],
      default: '0'
    },
    justPrice: {
      type: [String, Number],
      default: '0'
    },
    reversePrice: {
      type: [String, Number],
      default: '0'
    }
  },
  data() {
    return {
      mobile: IsPc()
    }
  },
  components: {
    // vButton: vbutton,
    // frominput,
    // vfromInput: fromInput,
    // setselect

  },
  methods: {
    requierImg(name, number) {
      let str
      // debugger
      if (name) {
        try {
          if (number != undefined) {
            str = name.split('/')
            return require('@/assets/img/currency/' + str[number] + '.png')
          }
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      } else {
        return require('@/assets/img/currency/avitve.png')
      }
    },
    handleClosea() {
      this.$emit('close')
    }
  }
}
</script>

<style  scoped>
>>> .dialog_recevive {
  border-radius: 20px;
}
>>> .dialog_recevive .el-icon-close {
  font-size: 28px;
  color: #0f1730;
}
>>> .dialog_recevive .el-icon-close:hover {
  color: #0f1730;
}
>>> .el-dialog__body {
  padding: 0 32px;
  padding-bottom: 48px;
}
>>> .el-dialog__header {
  padding: 28px 32px 0px;
}
>>> .el-dialog__headerbtn {
  top: 24px;
  right: 34px;
}
.title__num {
  font-size: 40px;
  font-weight: normal;
  color: #fc6446;
  margin-bottom: 8px;
}
.receive__Pool {
  margin-top: 24px;
  font-size: 18px;
  color: #0f1730;
  text-align: center;
  padding: 16px 0;
}
.receive__size {
  margin-top: 16px;
  font-size: 16px;
  color: #878b97;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5ebf2;
}
.received span {
  font-size: 18px;
}
.received .rg {
  padding-top: 5px;
}
.conversion {
  color: #0f1730;

  font-size: 18px;
  text-align: right;
}
.receove_Share {
  padding: 24px;
}

.recevive_btn {
  margin-top: 48px;
}
.add {
  text-align: left;
  font-size: 24px;
  color: #878b97;
  margin: 10px 0;
}
@media screen and (max-width: 750px) {
  .receove_Share {
    padding: 18px;
  }
  .conversion {
    font-size: 0.37rem;
  }
  .mobiles span {
    font-size: 0.37rem;
  }
}
</style>
