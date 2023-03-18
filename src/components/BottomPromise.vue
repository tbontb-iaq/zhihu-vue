<template>
  <div class="bottom-promise" ref="container">
    <PromiseComponent
      :make_promise="make_promise"
      :auto_make="false"
      @then="closeObs"
      ref="promise"
    >
      <template #default>
        <p class="bottom-info">到底了呢</p>
      </template>
      <template #fulfilled>
        <div class="fulfilled">
          <p>没有更多了</p>
        </div>
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import PromiseComponent from "./PromiseComponent.vue";
import { onMounted, ref } from "vue";

defineProps<{ make_promise: () => Promise<boolean> }>();

const container = ref<HTMLDivElement>(),
  promise = ref<InstanceType<typeof PromiseComponent>>(),
  observer = new IntersectionObserver(
    (a) => {
      // debugger;
      if (
        a[0].intersectionRatio &&
        container.value &&
        promise.value &&
        promise.value.status !== "pending"
      )
        promise.value.make();
    },
    { threshold: 1 }
  ),
  closeObs = (ended: boolean) => (ended ? observer.disconnect() : 0);

onMounted(() => {
  if (container.value) observer.observe(container.value);
});
</script>

<style lang="scss" scoped>
.bottom-promise {
  > .bottom-info {
    text-align: center;
  }
  > .fulfilled {
    > p {
      text-align: center;
    }
  }
  > :deep(.promise-pending) {
    min-height: 100px;
    margin: 20px auto;
  }
}
</style>
