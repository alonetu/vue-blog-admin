<template>
  <div :id="id" :style="{'width':width,'height':height}"></div>
</template>

<script>
import {getGuid} from "@/utils/";
import echarts from "echarts";

export default {
  name: 'echart',
  props: {
    echartData: {
      type: Object,
      default: () => {}
    },
    guid: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      style: String,
      default: '400px'
    }
  },
  created() {
    this.id = getGuid();
  },
  mounted() {
    this.echarts = echarts.init(document.getElementById(this.id + ""));
    this.initEchart();
  },
  data() {
    return {
      id: "",
      echarts: null
    };
  },
  watch: {
    guid() {
      this.echarts && this.echarts.resize();
    },
    echartData: {
      handler() {
        this.initEchart();
      },
      deep: true
    }
  },
  methods: {
    initEchart() {
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
    },
    resizeEchart() {
      this.echarts && this.echarts.resize();
    }
  }
}
</script>