<template>
 <div class="from_data">
    <div class="fromInput">
      <div class="from_lable">{{ lable }}</div>
      <div class="from_input">
        <div class="input_lt">
          <input
            class="globle_input"
            type="text"
            @keyup="hadelClick"
            :value="value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: {
    lable: {
      type: String,
      default: "",
    },
    value: {
      default: "0.0",
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: " ",
    },
    hideSlect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
      className: "",
    };
  },
  methods: {
    hadelClick(e) {
      this.$emit("input", e.target.value);
    },
    addClass() {
      this.className = "open";
    },
    selectClick(e) {
      console.log(e);
    },
    showModel() {
      this.isShow = !this.isShow;
      this.className = this.className == "" ? "open" : "";
    },
  },
  }
</script>
<style lang="scss" scoped>
.from_data {
  .from_lable {
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #e5ebf2;
    margin-bottom: 12px;
    padding-left: 16px;
  }
  .from_input {
    display: flex;

    .input_lt {
      flex: 1;
    }
    .input_rg {
      display: flex;
      align-items: center;
      justify-items: center;
      margin-left: 20px;
      width: 201px;
      height: 88px;
      background: #0f1522;
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
          font-family: ArialMT;
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
    padding-right: 18px;
    text-align: right;
    .from_size {
      font-size: 20px;
      font-family: ArialMT;
      color: #b7bfc8;
      margin-left: 8px;
      margin-right: 6px;
    }
    .show_size {
      font-family: ArialMT;
      color: #ed4d21;
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
  height: 88px;
  width: 100%;
  background: #0f1522;
  border: none;
  border-radius: 16px;
  font-size: 40px;
  padding-left: 16px;
  font-family: PFDinTextCompPro-Regular, PFDinTextCompPro;
  font-weight: 400;
  color: #b7bfc8;
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
</style>