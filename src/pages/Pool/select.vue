<template>
<div class="input_select">
  <div class="from_lable" :style="{visibility: lable?'inherit':'hidden'}">Balance:{{lable}}</div>
 <div class="input_content" @click="showModel" >
          <div class="from_select">
            <span class="from_icon" v-if="showSelect"></span>
            <span class="from_size" :class="showSelect ? '' : 'show_size'">{{showSelect?text:'Optional pass'}}</span>
            <img src="@/assets/img/icon_down.svg" alt="" />
          </div>
          <ul class="select_model" :class="className" @click="addClass">
            <li @click="selectClick(1)">
              <img src="@/assets/img/icon_down.svg" alt="" /> <span>深圳</span>
            </li>
            <li @click="selectClick(2)">
              <img src="@/assets/img/icon_down.svg" alt="" /> <span>深圳</span>
            </li>
            <li @click="selectClick(3)">
              <img src="@/assets/img/icon_down.svg" alt="" /> <span>深圳</span>
            </li>
          </ul>
        </div>
        </div>
</template>

<script>
  export default {
     props: {
    lable: {
      type: [String,Number],
      default: "0",
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
  .input_content {
      display: flex;
      align-items: center;
      justify-items: center;
      min-width: 100%;
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
      color: #0F1730;
      // margin-left: 8px;
      // margin-right: 6px;
    }
    .show_size {
      font-family: roboto-mediumitalic;
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
  .from_lable{
    font-size: 20px;
    font-weight: normal;
    color: #0F1730;
    margin-bottom: 12px;
    padding-left: 16px;
  }
</style>