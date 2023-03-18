<template>
  <div class="pin-view">
    <PromiseComponent :make_promise="get_pin">
      <template #fulfilled="{ value }: { value: ZPin }">
        <AuthorCard class="author" :author="value.author" />
        <div class="image">
          <img
            v-for="(img, i) of value.content.filter((v) => v.type === 'image')"
            :key="i"
            :src="(img as ZPinImageContent).url"
            alt="image"
          />
        </div>
        <div class="content">
          <TargetContent
            v-for="(c, i) of value.content.filter((v) => v.type === 'text')"
            :key="i"
            :html="(c as ZPinTextContent).content"
          />
        </div>
        <router-view />
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import { RouterView, useRoute, useRouter } from "vue-router";
import PromiseComponent from "@/components/PromiseComponent.vue";
import AuthorCard from "@/components/AuthorCard.vue";
import TargetContent from "@/components/TargetContent.vue";
const route = useRoute(),
  router = useRouter(),
  id = route.params["id"] as string,
  get_pin = () => zApi.get(ZApiUrl.pin, { id });

router.replace(`/pin/${id}/root_comment`);
</script>

<style lang="scss" scoped>
.pin-view {
  box-sizing: border-box;

  > * {
    margin: auto 10px;
  }
  > .author {
    margin: 10px;
  }
  > .image {
    display: flex;
    flex-wrap: wrap;
    row-gap: 2px;
    justify-content: space-between;
    align-items: stretch;
    > img {
      width: 33%;
    }
  }

  > :deep(.comment-view) {
    margin: auto;
  }
}
</style>
