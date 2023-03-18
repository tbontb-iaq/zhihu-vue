<template>
  <div class="comment-view" ref="container">
    <p class="title">全部评论</p>
    <PromiseComponent :make_promise="get_comment">
      <template #fulfilled="{ value }: { value: ZRootComment }">
        <div class="header" v-pinned>
          <span>评论 {{ value.counts.total_counts }}</span>
          <div class="sort">
            <span class="active">默认</span>
            <span>最新</span>
          </div>
        </div>
        <CommentCard
          class="comment"
          v-for="(d, i) in value.data"
          :key="i"
          :comment_data="d"
        />
        <BottomPromise :make_promise="more_comment" />
      </template>
    </PromiseComponent>
  </div>
</template>

<script lang="ts" setup>
import PromiseComponent from "@/components/PromiseComponent.vue";
import CommentCard from "@/components/CommentCard.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useScroller } from "@/stores/scroller";
import BottomPromise from "@/components/BottomPromise.vue";

const route = useRoute(),
  type = route.params["type"] as ZTarget["type"],
  id = route.params["id"] as string;

const container = ref<HTMLDivElement>();

const comment = undefined as undefined | ZRootComment;

const get_comment = () => zApi.get(ZApiUrl.root_comment, { id, type }),
  more_comment = async () => {
    if (comment && !comment.paging.is_end) {
      const more_c: ZRootComment = await zApi.url_get(comment.paging.next);
      comment.data.push(...more_c.data);
      comment.paging = more_c.paging;
      return false;
    } else return true;
  };

onMounted(() => {
  useScroller(container.value);
});
</script>

<style lang="scss" scoped>
.comment-view {
  > .title {
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin: 10px 0px 0px 0px;
  }

  > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-weight: bold;
    background-color: white;
    top: -1px;
    position: sticky;
    transition: all 0.2s ease-out;
    &.pinned {
      box-shadow: 0px 10px 10px -10px black;
    }
    > .sort {
      background-color: #eeeeee;
      border-radius: 20px;
      padding: 7px 2px;
      font-size: 12px;
      > span {
        border-radius: 20px;
        padding: 5px 7px;
        &.active {
          background-color: white;
        }
      }
    }
  }

  > .comment {
    margin: auto 10px;
  }
}
</style>
