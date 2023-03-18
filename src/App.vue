<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition ?? 'none'">
      <KeepAlive>
        <component :is="Component" :key="route.path"></component>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped></style>
