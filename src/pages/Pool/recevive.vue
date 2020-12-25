<template>
  <el-dialog
title=""
:visible.sync="showAlert"
:width="mobile?'480px':'90%'"
:close-on-click-modal="false"
custom-class="dialog_recevive"
             :before-close="handleClosea">
    <span slot="title" class="select_size">
      <span>{{$t('ywr')}}</span>

    </span>

    <div class="box_sizes">
      <div class="provider receive__Pool">
        <div class="title__num">{{popsData.reciveLptoken}}</div>
        <div class="">{{popsData.token1.name}}{{popsData.token2.name}}{{$t('pt')}}</div>
      </div>
    </div>
    <div class="receive__size">{{$t('oiei')}}</div>

    <div class="box_sizes">
      <div class="provider receove_Share ">
        <div class="">
          <div class="received mrge12">
            <div class="lt ltimg">
              <img :src="requierImg(popsData.token1.name,0)" alt="" />
              <span>{{popsData.token1.name}} {{$t('pool.Deoosited')}}</span>
            </div>
            <div class="rg"><span class="">{{popsData.token1Num}}</span></div>
          </div>
          <div class="received mrge24" v-show="popsData.token2Num>0">
            <div class="lt ltimg">
              <img :src="requierImg(popsData.token2.name,0)" alt="" />
              <span>{{popsData.token2.name}} {{$t('pool.Deoosited')}}</span>
            </div>
            <div class="rg"><span class="">{{popsData.token2Num}}</span></div>
          </div>
          <div class="received mrge12">
            <div class="lt">
              <span>Rates</span>
            </div>
            <div class="rg"><span class="">1{{popsData.token1.name}}={{popsData.t1Per.toFixed(6)}} {{popsData.token2.name}}</span></div>

          </div>
          <div class="conversion mrge24">1{{popsData.token2.name}}={{popsData.t2Per.toFixed(6)}} {{popsData.token1.name}}</div>
          <div class="received">
            <div class="lt">
              <span>{{$t('sopl')}}</span>
            </div>
            <div class="rg"><span class="">{{popsData.share}}%</span></div>

          </div>
        </div>
      </div>
    </div>
    <el-button class="from_botton recevive_btn" @click="clickHadel">{{$t('confirm')}} {{$t('Supply')}}</el-button>

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
    popsData: {
      type: Object,
      default: () => {
        return {
          token1: {},
          token2: {}
        }
      }
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
    },
    clickHadel() {
      this.$emit('change')
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
img {
  width: 30px;
  height: 30px;
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
.received {
  display: flex;
  justify-content: space-between;
}
.received span {
  font-size: 16px;
}
.received .rg {
  padding-top: 5px;
  float: right;
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
@media screen and (max-width: 750px) {
  .received span {
    font-size: 0.35rem;
  }
  .conversion {
    font-size: 0.35rem;
  }
}
</style>
