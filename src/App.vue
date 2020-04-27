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
// ::-webkit-scrollbar {
//   width: 0px;
//   height: 0px;
// }

// ::-webkit-scrollbar-thumb {
//   background: transparent;
//   border-radius: 5px;
// }

// ::-webkit-scrollbar-track {
//   background: transparent;
// }
</style>
