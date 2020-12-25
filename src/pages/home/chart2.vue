<template>
  <div class="chart2">

      <div class="c-top">
      <samp class="cp">Volume(24hr):<samp class="cp1">$403,739,802<samp class="cp2">+85.84%</samp></samp></samp>
      <samp class="cp-img">
        <samp class="cp-d">
           D
        </samp>
        <samp class="cp-w">
          W
        </samp>

        <img src="../../assets/img/icon_y.png" alt=""></samp>
    </div>
      <div id="yChart" :style="{width: '960px', height: '300px'}"></div>
  </div>
</template>

<script>

export default {
  name: 'Hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('yChart'))
      const option = {
        // backgroundColor:"pink",
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: [
          {
            position: 'right',
            type: 'value',
            splitArea: { show: true }
          },
          {
            type: 'value'
          }
        ],
        series: [
          {
            data: [500, 232, 901, 934, 290, 1330, 920],
            type: 'line'
          }]
      }

      // 绘制图表
      myChart.setOption(option)
    }
  }
}

</script>

<style lang="scss" scoped>

.cp-d{
  width: 24px;
  height: 24px;
  background: #F4F5FA;
  border-radius: 2px;
  font-size: 18px;
  font-family: Roboto-Medium, Roboto;
  font-weight: normal;
  color: #19212E;
  line-height: 21px;
  margin-right: 5px;
}
.cp-w{
  width: 24px;
  height: 24px;
  background: #F4F5FA;
  border-radius: 2px;

  font-size: 16px;
  font-family: Roboto-Medium, Roboto;
  font-weight: normal;
  color: #19212E;
  line-height: 18px;
  margin-right: 40px;

}
.cp-img{
  float: right;
  margin-right: 24px;
}
.c-top{
  margin-top: 16px;
}
.cp{
    width: 114px;
    height: 20px;
    font-size: 18px;
    font-family: roboto-mediumitalic;
    color: #0F1730;
    line-height: 21px;
    margin-left: 32px;
  .cp1{
    width: 123px;
    height: 22px;
    font-size: 20px;
    font-family: roboto-mediumitalic;
    font-weight: normal;
    color: #0F1730;
    line-height: 23px;
    .cp2{
        width: 72px;
        height: 20px;
        font-size: 18px;
        font-family: roboto-mediumitalic;
        color: #00CA8C;
        line-height: 21px;
    }
  }
}

</style>
