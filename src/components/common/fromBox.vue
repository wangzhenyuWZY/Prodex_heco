<template>
  <container>
    <vfromInput lable="From" select v-model="test" text="ETH" />
    <div class="from_contentIcon">箭头</div>
    <vfromInput lable="To" v-model="test1" select :text="'ETHCS'"  :showSelect='false'/>
    <div class="margintop">
      <v-button text='Connect to a wallet' height='50' @click="ddd"/>
    </div>
    
  </container>
</template>

<script>
import vButton from "./button";
import vfromInput from "./fromInput";
import container from "./container";
export default {
  data() {
    return {
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      test: "0.0",
      test1: "0.1",
      labelPosition: "top",
    };
  },
  components: {
    vButton,
    vfromInput,
    container,
  },
  watch: {
    test(old) {
      console.log(old);
    },
    test1(old) {
      console.log(old);
    },
  },
  methods: {
    ddd() {
      console.log('1231')
    }
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
  }
  .from_icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4d4dde;
  }
}
.from_contentIcon {
  margin-top: 37px;
  margin-bottom: 35px;
  text-align: center;
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
.margintop{
  width: 320px;
  margin: 0 auto;
  margin-top: 86px;

}
</style>