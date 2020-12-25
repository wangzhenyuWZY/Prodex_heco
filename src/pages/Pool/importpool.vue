<template>
  <div class="import1">
      <div class="imp-top">
          <div
class="title"
           slot="title">
        <div class="lt_box">
         <router-link  to="/pool">
          <span class="icon_box">
          <i class="el-icon-back back_icon"></i>
        </span>
        </router-link>
          <span class="content_text">Import Pool</span>
        </div>
        <div class="rg_box">
          <el-tooltip
class="item"
                  effect="dark"
                  content="Right Center 提示文字"
                  placement="left">
                  <img src="@/assets/img/icon_instructions.svg" alt="">
                </el-tooltip>
        </div>
      </div>

      </div>
      <div class="but1">
          <setselect
          lable="false"

          />

      </div>
        <div class="from_contentIcon">
          <i class="el-icon-plus tran_icon"></i>
        </div>
       <div class="but2">
            <span class="but1-left">{{eth}}</span><span  class="butt1-right">
               <img src="../../assets/img/icon_down.png" alt=""></span>

      </div>
       <div class="but3">
           <span class="but3p">{{Connect}}</span>

      </div>
  </div>
</template>

<script>
import { setselect } from '../../components/index'
export default {
  data() {
    return {
      gradeArr: [
        { id: 1, label: '1' },
        { id: 2, label: '2' },
        { id: 3, label: '3' },
        { id: 4, label: '4' },
        { id: 5, label: '5' }
      ],
      Connect: 'Select to a wallet to find pools',
      eth: 'ETH'
    }
  },
  components: {
    setselect
  }
}
</script>

<style lang="scss" scoped>
.butt1-right{
    float: right;
    margin-top: 20px;
    margin-right: 8px;
    img{
        width: 24px;
        height: 24px;
    }
}
.but1-left{
    float: left;
    margin-top: 22px;
    margin-left: 56px;
    height: 21px;
    font-size: 18px;
    font-family: roboto;
    font-weight: 400;
    color: #0F1730;
    line-height: 21px;
}
.import1{
    margin: 0 auto;
    width: 480px;
    height: 523px;
    background: #FFFFFF;
    border-radius: 20px;
   margin-top: 120px;
}
.imp-top{
    height: 72px;
}
.but1{
    width: 440px;
    height: 64px;
    margin-top: 43px;
    margin-left: 20px;
    background: #F6F7FB;
    border-radius: 16px;
}
.but2{
    width: 440px;
    height: 64px;
    // margin-top: 43px;
    margin-left: 20px;
    background: #F6F7FB;
    border-radius: 16px;
}
.but3{
    width: 440px;
    height: 147px;
    margin-top: 16px;
    margin-left: 20px;
    border-radius: 16px;
    border: 1px solid #E5EBF2;
}
.from_contentIcon{
    margin-top: 10px;
    margin-bottom: 10px;
}
.but3p{
    font-size: 16px;
    font-family: roboto;
    color: #878B97;
    height: 19px;
    // text-align: center;
    line-height: 137px;
    margin-left: 115px;
}

</style>
