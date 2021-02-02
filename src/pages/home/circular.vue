<template>
  <div class="processCircle">
    <div class="grayCircle center">
      <p>{{ percent }}%</p>
    </div>
    <section class="half left">
      <div class="blueCircle"></div>
    </section>
    <section class="half right">
      <div class="blueCircle"></div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'ProcessCircle',
  data() {
    return {
      percent: 1,
      timeLimit: 5000
    }
  },
  created() {
    // let gap = this.timeLimit / 100
    // const clock = setInterval(() => {
    //   if (this.percent < 100) {
    //     const res = Math.floor(this.percent + 4)
    //     this.percent = res >= 99 ? 99 : res
    //     if (this.percent > 40) {
    //       gap = 0.5
    //     }
    //   } else {
    //     clearInterval(clock)
    //   }
    // }, 100)
  }
}
</script>
<style lang="scss">
.processCircle {
  $maxl: 110px;
  position: relative;
  width: $maxl;
  height: $maxl;
  display: flex;
  align-items: flex-end;
  .half {
    width: 51%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    p {
      text-align: center;
      margin: auto;
      color: #384369;
      font-size: 18px;
      font-family: fzlt_bold;
    }
  }
  @mixin circle($w) {
    width: $w;
    height: $w;
    $wh: $w / 2;
    border-radius: $wh;
  }
  .grayCircle {
    @include circle(106px);
    border: 0;
    border: 6px solid #f4f4f4;
  }
  .blueCircle {
    // border-image: linear-gradient(to right, #90b2ff, #6d91ff) 1 10;
    @include circle($maxl);
    border: 10px solid transparent;
  }
  .left {
    left: 0;
    .blueCircle {
      border-top: 10px solid #6d91ff;
      border-left: 10px solid #6d91ff;
      transform: rotate(135deg);
      animation: load_left 2s ease-in;
      animation-fill-mode: forwards;
    }
  }
  .right {
    right: 0;
    .blueCircle {
      transform: rotate(135deg);
      position: relative;
      left: -$maxl / 2;
      animation: load_right 3s ease-in;
      animation-fill-mode: forwards;
    }
  }

  @-webkit-keyframes load_left {
    0% {
      border-top: 10px solid #6d91ff;
      border-left: 10px solid #6d91ff;
      transform: rotate(150deg);
    }
    50% {
      border-top: 10px solid #6d91ff;
      border-left: 10px solid #6d91ff;
      transform: rotate(315deg);
    }
    100% {
      border-top: 10px solid #6d91ff;
      border-left: 10px solid #6d91ff;
      transform: rotate(315deg);
    }
  }
  @-webkit-keyframes load_right {
    0% {
      transform: rotate(135deg);
    }
    50% {
      border-bottom: 10px solid #90b2ff;
      border-right: 10px solid #90b2ff;
      transform: rotate(135deg);
    }
    100% {
      border-bottom: 10px solid #6d91ff;
      border-right: 10px solid #6d91ff;
      transform: rotate(312deg);
    }
  }
  .success {
    width: 90px;
    height: 90px;
    position: relative;
    margin: 0 auto;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
