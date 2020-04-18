/**
 * 柱状图数据
 */
export const barGraph = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  legend: {
    data: ['warning', 'restore'],
    bottom: 4
  },
  grid: {
    left: '0%',
    right: '4%',
    top: '6%',
    bottom: '14%',
    width: '100%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['24:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00']
  }],
  yAxis: [{
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',  // 网格线设置虚线 dashed , 实线 solid
        color: '#A0A4AA'
      }
    },
  }],
  series: [{
      name: 'warning',
      type: 'bar',
      stack: 'data',
      data: [120, 132, 102, 134, 90, 230, 210, 110, 120, 140, 220, 220],
      itemStyle: {
        color: '#61a0a8'
      },
      barWidth: 20
    },
    {
      name: 'restore',
      type: 'bar',
      stack: 'data',
      data: [220, 182, 191, 234, 290, 330, 310, 120, 330, 230, 210, 110],
      itemStyle: {
        color: '#91c7ae'
      },
      barWidth: 20
    }
  ]
}

/**
 * 折线图数据
 */
export const lineChart = {
  tooltip: {
    trigger: 'axis',
    backgroundColor:'rgba(255,255,255,0.8)',
    color:'black',
    textStyle:{
      color:'black'
    }
  },
  grid: {
    left: '0%',
    right: '4%',
    top: '6%',
    bottom: '14%',
    width: '100%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    axisLine: {
      lineStyle: {
        color: '#606266'
      },
      interval: 0,
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',  // 网格线设置虚线 dashed , 实线 solid
        color: '#A0A4AA'
      }
    },
    axisTick: {
      show: false
    }
  },
  series: [{
    data: [500, 2800, 1000, 1500, 3900, 2150, 2520, 2650, 4000, 1800, 1390],
    type: 'line',
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#2FCD8E' // 0% 处的颜色
        }, {
            offset: 1, color: '#fff' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      }
    },
    symbol:'circle',//拐点样式 实心
    itemStyle: {
      normal: {
        color: "#2FCD8E", //折线点的颜色
        lineStyle: {
          color: "#2FCD8E", //折线的颜色
          type:'solid'
        }
      }
    }
  }]
}