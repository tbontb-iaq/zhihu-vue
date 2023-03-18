<template>
  <span class="time-info">
    <template v-for="(t, i) in times" :key="i">
      <span v-if="t" @pointerup="t.show_exact.value = true">
        <template v-if="t.show_exact.value">{{ t.exact }}</template>
        <template v-else>{{ t.tip + t.approximate }}</template>
      </span>
    </template>
  </span>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{ created_time: number; updated_time?: number }>(),
  str_map = new Map([
    [60 * 60 * 24 * 365, "年"],
    [60 * 60 * 24 * 30, "个月"],
    [60 * 60 * 24, "天"],
    [60 * 60, "小时"],
    [60, "分钟"],
    [1, "秒"],
  ]),
  times = [
    getTime(props.created_time, "创建于 "),
    props.updated_time && props.created_time !== props.updated_time
      ? getTime(props.updated_time, "更新于 ")
      : undefined,
  ];

function getTime(time: number, tip: string) {
  let exact = new Date(time * 1000),
    t = (new Date().getTime() - exact.getTime()) / 1000,
    approximate;
  for (let [k, v] of str_map) {
    const n = Math.floor(t / k);
    if (n) {
      approximate = `${n} ${v}前`;
      break;
    }
  }
  const result = {
    show_exact: ref(false),
    exact: exact.toLocaleString(),
    approximate,
    tip,
  };
  watch(result.show_exact, (newV, oldV) => {
    if (oldV === false)
      setTimeout(() => (result.show_exact.value = false), 3000);
  });
  return result;
}
</script>

<style lang="scss" scoped>
.time-info {
  > span {
    margin-right: 5px;
  }
}
</style>
