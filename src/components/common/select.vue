<template>
<div class="input_select">
  <div class="from_lable" :style="{visibility: lable?'inherit':'hidden'}">Balance:{{balance}}</div>
  <div class="input_content" @click.stop="showModel" >
      <div class="from_select">
        <span class="from_icon" @click.stop="iconHlep" v-show="imgUrl!==null"> <img :src="imgUrl" alt=""> </span>
        <span class="from_size" :class="showSelect ? '' : 'show_size'">{{text?text:'Optional pass'}}</span>
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
import tokenData from '../../utils/token'
  export default {
    props: {
      lable: {
        type: [String,Number,Boolean],
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
        default: "",
      },
      imgUrl: {
        type: String,
        default: null,
      },
      item: {
        type: String,
        default: "",
      },
      balance: {
        type: Number,
        default: 0,
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
      tokenList: tokenData.tokenList,
      itemToken:{}
    };
  },
  created(){
    console.log('imgurl=====',this.imgUrl)
  },
  methods: {
    hadelClick(e) {
      this.$emit("input", e.target.value);
    },
    ddd() {
      alert(2222)
    },
    addClass() {
      this.className = "open";
    },
    iconHlep() {

    },
     selectClick(e) {
      e.item = this.item
      this.$emit('change',e)
      console.log(e.address);
    },
    showModel() {
      // this.isShow = !this.isShow;
      // this.className = this.className == "" ? "open" : "";
      this.$emit('click')
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
      height: 88px;
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
      .from_select {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding-right: 12px;
    text-align: right;
    .spimg{
      img{
        width: 40px;
        height: 40px;
      }
    }
    .from_size {
      font-size: 20px;
      font-family: ArialMT;
      color: #0F1730;
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
   
    border-radius: 50%;
    img{
        width: 40px;
    height: 40px;
    }
  }
  .from_lable{
    font-size: 20px;
    font-weight: normal;
    color: #0F1730;
    margin-bottom: 12px;
    padding-left: 16px;
  }
</style>