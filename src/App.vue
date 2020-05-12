<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB',
'MicrosoftYaHei','微软雅黑',Arial,sans-serif;
}

/** 隐藏滚动条 */
::-webkit-scrollbar {
  width: 4px;
  // height: 0px;
}

/** 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #888888;
  border-radius: 10px;
  margin-left: 8px;
}

/** 滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
