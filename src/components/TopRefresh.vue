<template>
  <div
    class="top-refresh"
    ref="refresh"
    :class="{ ease: height === 0 }"
    :style="{ minHeight: `${height}px`, height: `${height}px` }"
  >
    <PromiseComponent
      :make_promise="make_promise"
      :auto_make="false"
      ref="promise"
      @then="then"
    >
      <template #default>
        <p v-if="height < HEIGHT">继续下拉刷新</p>
        <p v-else>松手刷新</p>
      </template>
      <template #fulfilled>
        <p>刷新完成</p>
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import PromiseComponent from "./PromiseComponent.vue";

defineProps<{ make_promise: (...args: any) => Promise<unknown> }>();
const refresh = ref<HTMLDivElement>(),
  promise = ref<InstanceType<typeof PromiseComponent>>(),
  height = ref(0);

let originY = 0;
const HEIGHT = 90,
  then = () => {
    setTimeout(() => {
      height.value = 0;
      promise.value?.clear();
    }, 2000);
  },
  touchMoveL = (ev: TouchEvent) => {
    height.value = Math.min(ev.targetTouches[0].screenY - originY, HEIGHT * 2);
  };

onMounted(() => {
  const container = refresh.value?.parentElement;
  if (container) {
    container.addEventListener("touchstart", (ev) => {
      if (container.scrollTop === 0) {
        originY = ev.targetTouches[0].screenY;
        container.addEventListener("touchmove", touchMoveL, {
          passive: true,
        });
        container.addEventListener(
          "touchend",
          () => {
            container.removeEventListener("touchmove", touchMoveL);
            if (height.value > HEIGHT) promise.value?.make();
            else height.value = 0;
          },
          { once: true }
        );
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.top-refresh {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  background-color: #f3f3f3;
  &.ease {
    transition: all 0.3s ease-out;
  }
}
</style>
