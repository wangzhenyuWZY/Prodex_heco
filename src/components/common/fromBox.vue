<template>
  <div >
   1232132
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'first',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      test: '0.0',
      test1: '0.1',
      labelPosition: 'top',
      options: [
        {
          value: 'Chengdu',
          label: '成都'
        },
        {
          value: 'Shenzhen',
          label: '深圳'
        },
        {
          value: 'Guangzhou',
          label: '广州'
        },
        {
          value: 'Dalian',
          label: '大连'
        }
      ],
      value7: ''
    }
  },

  watch: {
    test(old) {
      console.log(old)
    },
    test1(old) {
      console.log(old)
    }
  },
  methods: {
    handleClick() {

    },
    ddd() {
      console.log('1231')
    }
  }
}
</script>

<style lang="scss" scoped>
.from_data {
  .from_lable {
    font-size: 20px;
    font-family: roboto;
    font-weight: 400;
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

      font-family: roboto-mediumitalic;
      font-weight: 400;
      color: #b7bfc8;
      // margin-left: 8px;
      // margin-right: 6px;
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
.margintop {
  width: 320px;
  margin: 0 auto;
  margin-top: 86px;
}
.title {
  height: 71px;
  line-height: 71px;
  border-bottom: 1px solid #0f1522;
  padding: 0 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  img {
    vertical-align: middle;
  }
  .lt_icon {
    margin-right: 12px;
  }
  .rg_icon {
    img {
      width: 32px;
      height: 32px;
    }
  }
}
.content_text {
  font-size: 20px;
  font-family: roboto-mediumitalic;
  font-weight: normal;
  color: #eeeef0;
}
.box_size {
  background: #0f1522;
  border-radius: 16px;
  padding: 32px 0;
  font-family: roboto-mediumitalic;
  color: #e5ebf2;
  p {
    text-align: center;
    background: #0f1522;
    border-radius: 16px;
    padding: 32px 0;
  }
  p:nth-child(1) {
    font-size: 20px;
    margin-bottom: 16px;
  }
  p:nth-child(2) {
    margin-bottom: 1px;
  }
}
</style>
