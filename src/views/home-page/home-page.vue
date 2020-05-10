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
import {mapGetters} from 'vuex'

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
    ...mapGetters(["collapse"])
  },
  watch: {
    collapse() {
      setTimeout(() => {
        this.$refs.chartBar.resizeEchart();
        this.$refs.chartLine.resizeEchart();
      }, 200);
    }
  }
}
</script>

<style lang="scss">
.home-page {
  overflow-x: hidden;
}
</style>