<template>
  <div class="comment-card">
    <img :src="comment_data.author.avatar_url" alt="avatar" class="avatar" />
    <div class="content-data">
      <div class="name">
        <span>{{ comment_data.author.name }}</span>
        <span class="tag" v-for="i of comment_data.author_tag">
          {{ i.text }}
        </span>
        <template v-if="comment_data.reply_to_author">
          <span class="material-symbols-outlined">arrow_right</span>
          <span>{{ comment_data.reply_to_author.name }}</span>
        </template>
      </div>
      <div class="content" v-html="comment_data.content" ref="content"></div>
      <div class="info">
        <TimeInfo :created_time="comment_data.created_time" />
        <span
          v-for="(tag, i) in comment_data.comment_tag"
          :key="i"
          :style="{ color: tag.color }"
        >
          {{ tag.text }}
        </span>
      </div>
      <template v-if="!no_child && comment_data.child_comments">
        <CommentCard
          class="child-comment"
          v-for="(c, i) in comment_data.child_comments"
          :key="i"
          :comment_data="c"
        />
        <RouterLink
          :to="`/comment/${comment_data.id}/child_comment`"
          v-if="other_comment_count > 3"
          class="more"
        >
          <span> 查看全部 {{ comment_data.child_comment_count }} 条回复 </span>
          <span class="material-symbols-outlined">navigate_next</span>
        </RouterLink>
        <PromiseComponent
          v-else-if="other_comment_count"
          :auto_make="false"
          :make_promise="get_child_comment"
        >
          <template #default="{ start }">
            <p class="more" @pointerup="start">
              <span> 展开其它 {{ other_comment_count }} 条回复 </span>
              <span class="material-symbols-outlined">expand_more</span>
            </p>
          </template>
          <template #fulfilled><div></div></template>
        </PromiseComponent>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PromiseComponent from "@/components/PromiseComponent.vue";
import TimeInfo from "@/components/TimeInfo.vue";
import { onMounted, onUpdated, ref } from "vue";

const props = withDefaults(
    defineProps<{
      preview?: boolean;
      no_child?: boolean;
      comment_data: ZCommentData;
    }>(),
    {
      no_child: false,
      preview: false,
    }
  ),
  other_comment_count =
    props.comment_data.child_comment_count -
    (props.comment_data.child_comments?.length ?? 0),
  get_child_comment = () =>
    zApi
      .get(ZApiUrl.child_comment, {
        id: props.comment_data.id,
      })
      .then((zc) => (props.comment_data.child_comments = zc.data)),
  content = ref<HTMLDivElement>();

const update = async () => {
  const placeholderRegex = /\[.*?\]/g;
  if (
    content.value &&
    content.value.textContent?.search(placeholderRegex) !== -1
  ) {
    const stickerMap = new Map<string, ZSticker>(
      JSON.parse(localStorage.getItem("emotions") ?? "[]")
    );
    const treeWalker = document.createTreeWalker(
      content.value,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) =>
          node.textContent?.search(placeholderRegex) !== -1
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT,
      }
    );
    for (let n: Node | null; (n = treeWalker.nextNode()); ) {
      if (n.textContent) {
        const span = document.createElement("span");
        span.innerHTML = n.textContent.replaceAll(
          placeholderRegex,
          (placeholder) => {
            if (stickerMap.has(placeholder)) {
              const img = document.createElement("img"),
                sticker = stickerMap.get(placeholder)!;
              img.src = sticker.dynamic_image_url ?? sticker.static_image_url;
              img.alt = `[${sticker.title}]`;
              img.classList.add("emoji");
              return img.outerHTML;
            } else return placeholder;
          }
        );
        n.parentNode?.replaceChild(span, n);
      }
    }
  }

  if (!props.preview && content.value) {
    Array.from(content.value.getElementsByTagName("a")).forEach((a) => {
      try {
        const url = new URL(a.href);
        if (url.pathname.match(/\.(jpeg|jpg|gif|png)$/)) {
          const img = document.createElement("img");
          img.src = a.href;
          a.replaceWith(img);
        }
      } catch {}
    });
  }
};

onMounted(update);
onUpdated(update);
</script>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  > .avatar {
    border-radius: 5px;
    height: 35px;
    aspect-ratio: 1;
  }
  > .content-data {
    min-width: 0px;
    word-break: break-all;
    margin-left: 10px;
    > .name {
      font-weight: bold;
      > .tag {
        margin-left: 2px;
        vertical-align: middle;
        border: 1px #d3d3d3 solid;
        color: #999999;
        font-size: 0.7em;
        border-radius: 2px;
      }
      > .material-symbols-outlined {
        vertical-align: middle;
      }
    }

    > .content {
      margin: 5px 0px;
    }

    > .info {
      font-size: 12px;
      > span {
        margin-right: 5px;
      }
    }

    > .child-comment {
      margin-top: 10px;
    }

    > .more {
      display: block;
      -webkit-tap-highlight-color: transparent;
      background-color: #f3f3f3;
      margin: 10px 0px;
      padding: 2px 10px;
      border-radius: 50px;
      width: fit-content;
      text-decoration: none;
      color: black;
      > span {
        vertical-align: middle;
      }
    }

    > :deep(.promise-pending) {
      height: 30px;
      margin: 10px auto;
    }
  }
}
</style>

<style lang="scss">
.comment-card > .content-data > .content {
  user-select: text;
  p {
    &:first-child {
      margin-top: 0px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
  }
  img {
    max-width: 70%;
  }
  img.emoji {
    width: 1.2em;
    vertical-align: middle;
    aspect-ratio: 1;
  }
}
</style>
