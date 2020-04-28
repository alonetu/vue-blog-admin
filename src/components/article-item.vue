<template>
  <div class="article-list">
    <slot name="article-name"></slot>
    <slot name="article-intro"></slot>
    <el-divider></el-divider>
    <slot name="article-author"></slot>
    <slot name="article-update-time"></slot>
    <slot name="article-btn-first"></slot>
    <slot name="article-btn-second"></slot>
    <slot name="article-btn-thirdly"></slot>
  </div>
</template>

<style lang="scss">
.article-list {
  height: 120px;
  width: calc(100% - 36px);
  position: relative;
  border: 2px solid #9fbaa8;
  padding: 16px 16px 8px 16px;
  border-radius: 4px;
}
</style>
