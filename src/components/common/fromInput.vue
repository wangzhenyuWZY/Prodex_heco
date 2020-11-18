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
        <div class="input_rg">
          <div class="from_select">
            <span class="from_icon" v-if="showSelect"></span>
            <span class="from_size" :class="showSelect ? '' : 'show_size'">{{
              text
            }}</span>
            <img src="@/assets/img/icon_down.svg" alt="" />
          </div>
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
  },
  methods: {
    hadelClick(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.from_data {
  .from_lable {
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #e5ebf2;
    margin-bottom: 16px;
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
      height: 96px;
      background: #0f1522;
      border-radius: 16px;
      cursor: pointer;
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
  height: 96px;
  width: 100%;
  background: #0f1522;
  border: none;
  border-radius: 16px;
  font-size: 48px;
  padding-left: 16px;
  font-family: PFDinTextCompPro-Regular, PFDinTextCompPro;
  font-weight: 400;
  color: #b7bfc8;
}

</style>