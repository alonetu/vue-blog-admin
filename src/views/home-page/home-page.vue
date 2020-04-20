<template>
  <div class="home-page wrapper-main">
    <echart ref="chartBar" :echartData="barGraph" :guid="barGraphId"/>
    <echart ref="chartLine" :echartData="lineChart" :guid="lineChartId"/>
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
  },
  computed: {
    collapse() {
      return this.$store.state.collapse;
    }
  },
  watch: {
    collapse() {
      this.$refs.chartBar.initEchart();
      this.$refs.chartLine.initEchart();
    }
  }
}
</script>