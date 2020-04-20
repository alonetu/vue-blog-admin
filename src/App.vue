<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    /**
     * 浏览器unload事件，当刷新浏览器时调用
     */
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state));
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB',
'MicrosoftYaHei','微软雅黑',Arial,sans-serif;
}
</style>
