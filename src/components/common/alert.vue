<template>
<transition name="el-alert-fade">
  <div class="v_alert">
    <div class="alert_type">
      <img class="success"
           :src="types[type]"
           alt="">
    </div>
    <div class="alert_size">Connect successfully</div>
    <div class="alert_button">
      <p>Please try again</p>
      <button class="alert_btn">Retry</button>
    </div>
  </div>
  </transition>
</template>

<script>
import success from '@/assets/img/icon_successfully.svg';
import err from '@/assets/img/icon_faile.svg';
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    },
    value: {
      type: String,
      default: 'Connect successfully'
    }
  },
  data () {
    return {
      types: {
        success,
        err
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.v_alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 280px;
  height: 280px;
  background: rgba(147, 154, 169, 0.27); // 0.27
  border-radius: 19px;
  text-align: center;
  .alert_type {
    .success {
      margin-top: 97px;
    }
  }
  .alert_size {
    font-size: 18px;
    font-family: ArialMT;
    color: #e5ebf2;
    margin-top: 7px;
    text-align: center;
  }
  .alert_btn {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ff5d37;
    margin: 0 auto;
    font-size: 20px;
    font-family: ArialMT;
    color: #ff5d37;
    background: none;
  }
}
</style>