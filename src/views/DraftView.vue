<template>
  <div class="draft-view">
    <p v-for="(_, i) in a">{{ i }}</p>
  </div>
</template>

<script lang="ts" setup>
const a = new Array<string>(100);
</script>

<style lang="scss" scoped>
.draft-view {
  display: flex;
  overflow: scroll;
  align-items: center;
  flex-direction: column;
  // justify-content: center;
}
</style>
