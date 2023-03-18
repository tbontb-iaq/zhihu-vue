<template>
  <div class="child-comment">
    <p class="title">全部回复</p>
    <PromiseComponent
      :make_promise="get_child_comment"
      @then="(v) => (child_comment = v)"
    >
      <template #fulfilled="{ value }: { value: ZChildComment }">
        <CommentCard :comment_data="value.root" no_child />

        <p>回复 {{ value.data.length }}</p>
        <CommentCard v-for="(d, i) in value.data" :key="i" :comment_data="d" />
        <BottomPromise :make_promise="more_child_comment" />
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import PromiseComponent from "@/components/PromiseComponent.vue";
import CommentCard from "@/components/CommentCard.vue";
import BottomPromise from "@/components/BottomPromise.vue";

const route = useRoute(),
  id = route.params["id"] as string,
  child_comment = undefined as undefined | ZChildComment,
  get_child_comment = () => zApi.get(ZApiUrl.child_comment, { id }),
  more_child_comment = async () => {
    if (child_comment && !child_comment.paging.is_end) {
      const more_c: ZChildComment = await zApi.url_get(
        child_comment.paging.next
      );
      child_comment.data.push(...more_c.data);
      child_comment.paging = more_c.paging;
      return false;
    } else return true;
  };
</script>

<style lang="scss" scoped>
.child-comment {
  overflow: scroll;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  > .title {
    font-weight: bold;
  }
}
</style>
