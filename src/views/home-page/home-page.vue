<template>
  <div class="home-page wrapper-main">
    <echart :echartData="barGraph" :guid="barGraphId"/>
    <echart :echartData="lineChart" :guid="lineChartId"/>
  </div>
</template>

<script>
import Echart from '@/components/echart.vue'
import {barGraph, lineChart} from './data'
import {getGuid} from '@/utils/'

export default {
  name: 'home-page',
  components: {
    Echart
  },
  data() {
    return {
      barGraph,
      lineChart,
      barGraphId: getGuid(),
      lineChartId: getGuid()
    }
  }
}
</script>