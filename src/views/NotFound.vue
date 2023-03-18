<template>
  <div class="not-found">
    <p class="message">页面还在建设中...</p>
    <p class="path">
      <a :href="`https://www.zhihu.com/${path}`">{{ path }}</a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute(),
  path = route.path;
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .path {
    user-select: all;
  }
}
</style>
