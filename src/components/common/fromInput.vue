<template>
 <div class="from_data">
    <div class="fromInput">
      <div class="from_lable" v-show="lable">{{ lable }}</div>
      <div class="from_input">
        <div class="input_lt">
          <input
            class="globle_input"
            :class="className"
            :placeholder="placeholder"
            @keyup="hadelClick"
            :value="value"
            :disabled ="disabled"
            ref="input"
            @mousewheel.prevent
            onKeypress="return (/[\d,.]/.test(String.fromCharCode(event.keyCode)))"
            :maxlength="maxlength"
          />
          <div class="input_max" v-if="showmax" @click="setValue">MAX</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lable: {
      type: [String, Number],
      default: 0
    },
    value: {
      default: '0.0'
    },
    placeholder: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    showSelect: {
      type: Boolean,
      default: true
    },
    hadelClicks: {
      default: null
    },
    text: {
      type: String,
      default: ' '
    },
    hideSlect: {
      type: Boolean,
      default: false
    },
    showmax: {
      type: Boolean,
      default: false
    },
    balance: {
      default: '0'
    }
  },
  data() {
    return {
      isShow: false,
      className: ''
    }
  },
  methods: {
    hadelClick(e) {
      let value = e.target.value + ''
      if (value.indexOf('.') != -1) {
        const str = value.split('.')
        if (str[1].length > 8) {
          value = str[0] + '.' + str[1].slice(0, 8)
          this.$refs.input.value = value
        }
      }
      this.$emit('input', Number(value))
      if (this.hadelClicks) {
        this.$emit('hadelClick', Number(value))
      }
    },
    setValue() {
      this.$emit('input', this.balance)
    },
    addClass() {
      this.className = 'open'
    },
    selectClick(e) {
      console.log(e)
    },
    showModel() {
      this.isShow = !this.isShow
      this.className = this.className == '' ? 'open' : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.from_data {
  .from_lable {
    font-size: 16px;
    font-family: roboto;
    font-weight: 400;
    color: #878B97;
    margin-bottom: 12px;
    padding-left: 16px;
  }
  .from_input {

    .input_lt {
      position: relative;
         display: flex;
         justify-items: center;
         align-items: center;
         background: #F4F5FA;
             border-radius: 16px;
      .input_max{
        width: 56px;
        height: 28px;
        margin-right: 16px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
          background: #ffffff;
        border-radius: 18px;
        font-size: 14px;
        color: #fc6446;
      }
    }
    .input_rg {
      display: flex;
      align-items: center;
      justify-items: center;
      margin-left: 20px;
      width: 201px;
      height: 80px;
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
  }
  .from_select {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding-right: 8px;
    text-align: right;
    .from_size {
      font-size: 20px;
      font-family: roboto-mediumitalic;
      color: #b7bfc8;
      // margin-left: 8px;
      // margin-right: 6px;
    }
    .show_size {
      font-family: roboto-mediumitalic;
      color: #FC6446;
    }
  }
  .from_icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4d4dde;
  }
}
.globle_input {
  box-sizing: border-box;
  outline: none;
  height: 72px;
background: #F6F7FB;
  width: 100%;
  border: none;
  border-radius: 16px;
  font-size: 20px;
  padding-left: 16px;
  font-weight: 500;
  color: #070A0E;
  flex: 1;
}
.globle_input::placeholder{

color: #A6AEB7;
font-size: 18px;
}

@keyframes slide-down {
  0% {
    transform: scale(1, 0);
  }
  25% {
    transform: scale(1, 1.2);
  }
  50% {
    transform: scale(1, 0.85);
  }
  75% {
    transform: scale(1, 1.05);
  }
  100% {
    transform: scale(1, 1);
  }
}
@media screen and (max-width:750px) {
    .globle_input{
      height: 1.4rem;
       padding-left: 0.2rem;
      font-size: 0.55rem;
    }
    .globle_input::placeholder{
      font-size: 0.5rem;
    }
    .from_data .from_input .input_lt .input_max{
       width: 1.2rem;
       height: 0.58rem;
       line-height: 0.58rem;
       font-size: 0.3rem;
       margin-right: 0.2rem;
    }
     .from_data .from_lable{
      margin-bottom: 0.2rem;
      padding-left: 0.2rem;
    }
    .from_lable{
      font-size: 14px;
    }

}
</style>
