<template>
<div class="input_select">
  <div class="from_lable" :style="{visibility: lable?'inherit':'hidden'}"> <span class="pads"> {{$t('Exc.Balance')}}: <span class="balance_size">{{balance}}</span></span>  </div>
  <div class="input_content" @click.stop="showModel" >
      <div class="from_select">
        <span class="from_icon" @click.stop="iconHlep" v-show="imgUrl!==null"> <img :src="requierImg()" alt=""> </span>
        <span class="from_size" :class="showSelect ? '' : 'show_size'">{{text?text:$t('Exc.ops')}}</span>
        <img src="@/assets/img/icon_down.svg" alt="" />
      </div>
      <!-- <ul class="select_model" :class="className" @click="addClass">
        <li v-for="(item,index) in tokenList" :key="index" @click="selectClick(item)">
          <img src="@/assets/img/icon_down.svg" alt="" /> <span>{{item.name}}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lable: {
      type: [String, Number, Boolean],
      default: '0'
    },
    value: {
      default: '0.0'
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: null
    },
    item: {
      type: String,
      default: ''
    },
    balance: {
      type: [Number, String],
      default: 0
    },
    hideSlect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      className: '',
      tokenList: [],
      itemToken: {}
    }
  },
  watch: {
    text: {
      handler(newName, oldName) {
        console.log('obj.a changed')
      },
      deep: true
    }
  },
  created() {
    console.log('imgurl=====', this.imgUrl)
  },
  methods: {
    requierImg() {
      if (this.text) {
        try {
          return require('@/assets/img/currency/' + this.text + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      }
    },
    hadelClick(e) {
      this.$emit('input', e.target.value)
    },
    ddd() {
      alert(2222)
    },
    addClass() {
      this.className = 'open'
    },
    iconHlep() {

    },
    selectClick(e) {
      e.item = this.item
      this.$emit('change', e)
      console.log(e.address)
    },
    showModel() {
      // this.isShow = !this.isShow;
      // this.className = this.className == "" ? "open" : "";
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.input_select{
  position: relative;
}
  .input_content {
      display: flex;
      align-items: center;
      justify-items: center;
      min-width: 100%;
      height: 72px;
      background: #F4F5FA;
      border-radius: 16px;
      cursor: pointer;
      position: relative;
      .select_model {
        position: absolute;
        left: 0;
        top: 102px;
        width: 201px;
        background: #1c2538;
        border-radius: 20px;
        z-index: 6;
        overflow: hidden;
        box-sizing: border-box;
        max-height: 0;
        transition: max-height 0.1s ease-out;
        > li {
          height: 32px;
          line-height: 32px;
          font-family: roboto-mediumitalic;
          color: #e5ebf2;
          span {
            display: inline-block;
            vertical-align: top;
          }
        }
      }

      .open {
        max-height: 100%;
        transition: max-height 0.1s ease-in;
        transform-origin: 50% 0;

      }
    }
      .from_select {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding-right: 8px;
    text-align: right;
    .spimg{
      img{
        width: 40px;
        height: 40px;
      }
    }
    .from_size {
      font-size: 18px;
      font-family: roboto-mediumitalic;
      color: #0F1730;
      // margin-left: 8px;
      // margin-right: 6px;
    }
    .show_size {
      font-family: roboto;
      color: #FC6446;
    }
  }
  .from_icon {
    display: inline-block;

    border-radius: 50%;
    img{
        width: 32px;
        height: 32px;
        margin-right: 8px;
    }
  }
  .from_lable{
    font-size: 16px;
    height: 16px;
    font-family: roboto;
    font-weight: 400;
    color: #878B97;
    margin-bottom: 12px;
    padding-left: 16px;
    position: relative;
        text-align: right;
        min-width: 300px;
    transform: translateX(-50%);
    overflow: hidden;
    .balance_size{

        color: #0F1730;

        // position: absolute;
    }
    .pads{
      width: 100%;
        // position: absolute;
        top: 0;
        left: 0;
    }
  }
  @media screen and (max-width:750px) {
    .input_content{
      height: 1.4rem;
    }
    .from_select .from_size{
      font-size: 0.3rem;
    }
    .from_lable{
      margin-bottom: 0.2rem;
      padding-left: 0.2rem;
     position: relative;
     min-width: 100%;
        transform: translateX(0);
        overflow:inherit;
      right: 0;
      top: 0;
      .pads{
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        right: 0;
        min-width: 7.2rem;
        left: 0;
        transform: translateX(-4.6rem);
      }

    }
     .from_select{
      padding-right: 0.1rem;
      img{
        width: 0.5rem;
        height: auto;
      }

    }
}
</style>
