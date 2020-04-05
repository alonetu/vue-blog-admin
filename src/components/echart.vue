<template>
  <div :id="id" :style="{'width':'100%','height':'200px'}"></div>
</template>

<script>
import Guid from "@/utils/guid";
import echarts from "echarts";

export default {
  data() {
    return {
      id: "",
      echarts: null
    };
  },
  props: ["echartData", "guid"],
  created: function() {
    this.id = Guid.methods.getGuid();
  },
  mounted: function() {
    this.echarts = echarts.init(document.getElementById(this.id + ""));
    this.initEchart();
  },
  methods: {
    initEchart: function() {
      if (!this.echartData) {
        return;
      }
      let option = {
        title: this.echartData.title,
        xAxis: this.echartData.xAxis,
        tooltip: this.echartData.tooltip,
        legend: this.echartData.legend,
        grid: this.echartData.grid,
        yAxis: this.echartData.yAxis,
        series: this.echartData.series,
        animationEasing: "elasticOut"
      };
      this.echarts.setOption(option);
      this.echarts.off('click');
      this.echarts.on("click", params => {
        this.$emit("curNodeClick", params);
      });
      window.addEventListener("resize", () => {
        this.echarts.resize();
      });
    }
  },
  watch: {
    guid: function() {
      this.initEchart();
    },
    echartData: {
      handler: function() {
        this.initEchart();
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
