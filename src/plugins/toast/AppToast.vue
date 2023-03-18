<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        class="toast"
        v-for="[k, t] in toasts"
        :style="t.style?.toast"
        :key="k"
      >
        <p class="message" :style="t.style?.message">{{ t.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ toasts: Map<string, ToastInfo> }>();
</script>

<style lang="scss" scoped>
.toast-container {
  left: 0;
  right: 0;
  bottom: 10px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-height: 100%;
  pointer-events: none;
  width: 100%;

  > .toast {
    max-width: 90%;
    width: fit-content;
    box-sizing: border-box;
    border-radius: 50px;
    box-shadow: 0px 0px 5px black;
    background-color: white;
    padding: 5px 15px;
    margin: 10px auto;

    > p {
      max-width: 100%;
      margin: 5px auto;
      width: fit-content;
      overflow-wrap: break-word;
    }

    &.toast-move,
    &.toast-enter-active,
    &.toast-leave-active {
      transition: all 0.5s ease;
    }

    &.toast-enter-from,
    &.toast-leave-to {
      opacity: 0;
      translate: 50px;
    }

    &.toast-leave-active {
      position: absolute;
    }
  }
}
</style>
