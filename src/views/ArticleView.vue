<template>
  <div class="article-view">
    <PromiseComponent :make_promise="get_article">
      <template #fulfilled="{ value }: { value: ZArticle }">
        <p>{{ value.title }}</p>

        <TargetContent :html="value.content" />
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import TargetContent from "@/components/TargetContent.vue";
import PromiseComponent from "@/components/PromiseComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute(),
  id = route.params["id"] as string;

const get_article = () =>
  zApi.get(ZApiUrl.article, { id }, { include: ["content"] });
</script>

<style lang="scss" scoped>
.article-view {
	overflow: scroll;
}
</style>
