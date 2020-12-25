<template>
  <div class="chart">

    <div class="c-top">
      <samp class="cp">Liquidity: <samp class="cp1"> $2.92b<samp class="cp2">-15.84%</samp></samp></samp>
      <samp class="cp-img"><img src="../../assets/img/icon_y.png" alt=""></samp>
    </div>

      <div id="myChart" :style="{width: '960px', height: '300px'}"></div>
  </div>
</template>

<script>

export default {
  name: 'Hello',
  data() {
    return {
      msg: '1111111'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      const option = {

        xAxis: [
          { splitLine: {
            show: false

          },
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']

          }
        ],
        yAxis: [
          { splitLine: {

            show: false },
          position: 'right',
          type: 'value',
          splitArea: { show: true }
          },
          {
            type: 'value'
          }],
        series: [{
          data: [520, 932, 301, 434, 300, 412, 522, 333, 666, 771],
          type: 'line',
          areaStyle: {}

        }]
      }

      // 绘制图表
      myChart.setOption(option)
    }
  }
}

</script>

<style lang="scss" scoped>
.cp-img{
  float: right;
  margin-right: 24px;

}
.c-top{
  margin-top: 16px;
}
.cp{
  width: 72px;
  height: 20px;
  font-size: 18px;
  font-family: roboto-mediumitalic;
  color: #0F1730;
  line-height: 21px;
  margin: 0 32px;

  .cp1{
    width: 63px;
    height: 22px;
    font-size: 20px;
    font-family: roboto-mediumitalic;
    font-weight: normal;
    color: #0F1730;
    line-height: 23px;

    .cp2{
      width: 68px;
      height: 20px;
      font-size: 18px;
      font-family: roboto-mediumitalic;
      color: #F75C40;
      line-height: 21px;

    }
  }
}

</style>
