<template>
  <div class="chart2">
      <div class="c-top"> 
      <samp class="cp">Volume(24hr):<samp class="cp1">$403,739,802<samp class="cp2">+85.84%</samp></samp></samp>
    </div>
      <div id="yChart" :style="{width: '960px', height: '300px'}"></div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('yChart'));
        let option = {
            // backgroundColor:"pink",
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: [
                {
                    position:'right',
                    
                    type : 'value',
                    splitArea : {show : true}
                },
                {
                type: 'value'
                  },],
            series: [{
                data: [500, 232, 901, 934, 290, 1330, 920],
                type: 'line'
            }]
};

        // 绘制图表
        myChart.setOption(option);
    }
  }
}

</script>

<style lang="scss" scoped>
.c-top{
  margin-top: 16px;
}
.cp{
    width: 114px;
    height: 20px;
    font-size: 18px;
    font-family: ArialMT;
    color: #0F1730;
    line-height: 21px;
    margin-left: 32px;
  .cp1{
    width: 123px;
    height: 22px;
    font-size: 20px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #0F1730;
    line-height: 23px;
    .cp2{
        width: 72px;
        height: 20px;
        font-size: 18px;
        font-family: ArialMT;
        color: #00CA8C;
        line-height: 21px;
    }
  }
}


</style>