<template>
  <div class="me-page">
    <template v-if="logged"></template>
    <template v-else>
      <NotLogged />
    </template>
  </div>
</template>

<script lang="ts" setup>
import NotLogged from "@/components/NotLogged.vue";

const logged = zApi.logged;
</script>

<style lang="scss" scoped>
.me-page {
}
</style>
