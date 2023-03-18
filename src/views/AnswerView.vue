<template>
  <div class="answer-view" ref="container">
    <div class="app-bar">
      <MaterialButton class="button" @pointerup="() => $router.back()">
        <span class="material-symbols-outlined">arrow_back</span>
      </MaterialButton>
      <MaterialButton class="button">
        <span class="material-symbols-outlined">menu</span>
      </MaterialButton>
    </div>

    <div class="answer">
      <PromiseComponent :make_promise="get_answer">
        <template #fulfilled="{ value }: { value: ZAnswer }">
          <div class="question">
            <p class="title">{{ value.question.title }}</p>
            <span class="count">
              {{ value.question.answer_count }} 回答 ·
              {{ value.question.follower_count }} 关注 ·
              {{ value.question.comment_count }} 评论
            </span>
          </div>

          <div class="divider"></div>

          <AuthorCard :author="value.author" />

          <div class="info">
            <TimeInfo
              :created_time="value.created_time"
              :updated_time="value.updated_time"
            />
            <PromiseComponent
              v-if="value.author.id !== '0'"
              :make_promise="() => get_people(value)"
            >
              <template #fulfilled="{ value }: { value: ZAuthor }">
                <span>{{ value.ip_info }}</span>
              </template>
            </PromiseComponent>
          </div>

          <TargetContent class="content" :html="value.content" />

          <div class="bottom" v-pinned>
            <div class="vote">
              <MaterialButton class="vote-up button">
                <span class="material-symbols-outlined">thumb_up</span>
                <span> {{ value.voteup_count }} </span>
              </MaterialButton>
              <MaterialButton class="vote-down button">
                <span class="material-symbols-outlined">thumb_down</span>
              </MaterialButton>
            </div>

            <RouterLink
              custom
              v-slot="{ navigate }"
              :to="`/answer/${id}/root_comment`"
            >
              <MaterialButton @pointerup="navigate" class="button">
                <span class="material-symbols-outlined">comment</span>
                <span>{{ value.comment_count }}</span>
              </MaterialButton>
            </RouterLink>
          </div>
          <PromiseComponent :make_promise="get_comment">
            <template #fulfilled="c: { value: ZRootComment }">
              <div class="comment">
                <CommentCard
                  v-for="(d, i) in c.value.data"
                  :key="i"
                  :comment_data="d"
                  :preview="true"
                  no_child
                />
              </div>
              <RouterLink class="more" :to="`/answer/${id}/root_comment`">
                查看全部 {{ value.comment_count }} 条评论
              </RouterLink>
            </template>
          </PromiseComponent>
        </template>
      </PromiseComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MaterialButton from "@/components/MaterialButton.vue";
import PromiseComponent from "@/components/PromiseComponent.vue";
import { useScroller } from "@/stores/scroller";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CommentCard from "@/components/CommentCard.vue";
import TargetContent from "@/components/TargetContent.vue";
import TimeInfo from "@/components/TimeInfo.vue";
import AuthorCard from "@/components/AuthorCard.vue";
const route = useRoute(),
  id = route.params["id"] as string;

const get_answer = () =>
    zApi.get(
      ZApiUrl.answer,
      { id },
      {
        include: [
          "content",
          "voteup_count",
          "comment_count",
          "question.answer_count",
          "comment_count",
          "follower_count",
        ],
      }
    ),
  get_people = (answer: ZAnswer) =>
    zApi.get(ZApiUrl.people, { id: answer.author.id }),
  get_comment = () =>
    zApi.get(ZApiUrl.root_comment, { id, type: "answer" }, { limit: 2 }),
  container = ref<HTMLDivElement>();

onMounted(() => {
  useScroller(container.value);
});
</script>

<style lang="scss" scoped>
.answer-view {
  overflow: scroll;
  overflow: overlay;
  display: flex;
  flex-direction: column;

  > .app-bar {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 0px 10px;
    > .button {
      padding: 0px;
      > span {
        font-size: 30px;
      }
    }
  }

  > .answer {
    flex: 1;
    display: flex;
    flex-direction: column;
    > * {
      margin: auto 12px;
    }

    > .question {
      > .title {
        margin: 10px 0px;
        font-weight: bold;
        font-size: 20px;
      }
      > .count {
        color: gray;
        font-size: 14px;
      }
    }

    > .divider {
      margin: 10px 0px;
      height: 1px;
      background-color: black;
    }

    > .info {
      font-size: 14px;
      color: gray;
      margin-top: 10px;
      > :deep(.promise-pending) {
        display: inline-block;
        vertical-align: middle;
      }
    }

    > .content {
      flex: 1;
    }

    > .bottom {
      margin: 0px;
      margin-bottom: 10px;
      padding: 10px;
      bottom: -1px;
      position: sticky;
      background-color: white;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid;
      transition: all 0.2s ease-out;
      &.pinned {
        box-shadow: 0px -10px 10px -10px black;
      }
      > .vote {
        border-radius: 20px;
        border: 1px solid black;
        overflow: hidden;
        > .button {
          padding: 0px;
          > span {
            margin: 8px;
            vertical-align: middle;
          }
        }
      }
      > .button {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    > .more {
      text-align: center;
      text-decoration: none;
      margin: 20px;
      -webkit-tap-highlight-color: transparent;
      color: black;
    }
  }
}
</style>
