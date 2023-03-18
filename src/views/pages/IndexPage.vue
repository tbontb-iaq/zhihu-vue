<template>
  <div class="index-page" ref="index">
    <PromiseComponent :make_promise="get_feed" @then="then" ref="promise">
      <template
        #fulfilled="{
          value,
          retry,
        }: {
          value: ZFeed,
          retry: (retry?: boolean) => Promise<unknown>,
        }"
      >
        <TopRefresh :make_promise="() => retry(true)" />
        <template v-for="(data, i) in value.data" :key="i">
          <TargetCard
            class="target"
            v-if="data.type === 'feed'"
            :target="data.target"
          />
        </template>
        <BottomPromise :make_promise="more_feed" />
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import PromiseComponent from "@/components/PromiseComponent.vue";
import { useScroller } from "@/stores/scroller";
import { onMounted, ref, watch } from "vue";
import TargetCard from "@/components/TargetCard.vue";
import { useLocalStorage } from "@/stores/local_storage";
import BottomPromise from "@/components/BottomPromise.vue";
import TopRefresh from "@/components/TopRefresh.vue";

const FEED = "feed",
  index = ref<HTMLDivElement>(),
  feed = ref<ZFeed>(),
  promise = ref<InstanceType<typeof PromiseComponent>>(),
  get_feed = (retry = false) =>
    useLocalStorage().get(
      FEED,
      () =>
        zApi.logged
          ? zApi.get(ZApiUrl.recommend, {})
          : zApi.get(ZApiUrl.explore, {}),
      { retry }
    ),
  more_feed = async () => {
    if (feed.value && feed.value.paging && !feed.value.paging.is_end) {
      const more_f: ZFeed = await zApi.url_get(feed.value.paging.next);
      feed.value.data.push(...more_f.data);
      feed.value.paging = more_f.paging;
      return false;
    } else return true;
  };

const then = (v: any) => {
  feed.value = v;
};

onMounted(() => useScroller(index.value));

watch(
  feed,
  () => {
    localStorage.setItem(FEED, JSON.stringify(feed.value));
    console.log("feed stored");
  },
  { deep: true }
);

defineExpose({
  bottomClick() {
    if (index.value) {
      if (index.value.scrollTop !== 0) {
        index.value.scrollTo({ top: 0, behavior: "smooth" });
      } else promise.value?.retry(true);
    }
  },
});
</script>

<style lang="scss" scoped>
.index-page {
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
  overflow: scroll;
  overflow: overlay;
  > :deep(.target) {
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
  }

  > .retry-button {
    background-color: #f3f3f3;
    padding: 10px;
    width: 80%;
    margin: calc(5vh - 10px) auto 5vh;
    display: block;
    border: 1px black solid;
  }
}
</style>
