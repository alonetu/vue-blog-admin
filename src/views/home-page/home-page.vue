<template>
  <div class="home-page wrapper-main">
    <echart :echartData="barGraph"/>
    <echart :echartData="lineChart"/>
  </div>
</template>

<script>
import Echart from '@/components/echart.vue'
import {barGraph, lineChart} from './data'

export default {
  name: 'home-page',
  components: {
    Echart
  },
  data() {
    return {
      barGraph,
      lineChart
    }
  }
}
</script>