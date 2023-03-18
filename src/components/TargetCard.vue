<template>
  <RouterLink custom v-slot="{ navigate }" :to="`/${target.type}/${target.id}`">
    <MaterialButton v-bind="$attrs" class="target-card" @pointerup="navigate">
      <p class="title">
        {{ target.type === "answer" ? target.question.title : target.title }}
      </p>

      <div class="author">
        <img :src="target.author.avatar_url" alt="avatar" />
        <span class="name">{{ target.author.name }}</span>
        <span class="headline">{{ target.author.headline }}</span>
      </div>

      <div class="excerpt">
        <p>{{ target.excerpt }}</p>
        <img
          v-if="target.thumbnail && !target.thumbnails"
          :src="target.thumbnail"
          alt="thumbnail"
        />
      </div>

      <div class="thumbnails" v-if="target.thumbnails">
        <img
          v-for="(t, i) in target.thumbnails.slice(0, 3)"
          :key="i"
          :src="t"
          alt="thumbnail"
        />
      </div>

      <div class="count">
        <span class="material-symbols-outlined">thumb_up</span>
        <span>{{ target.voteup_count }}</span>
        <span class="material-symbols-outlined">comment</span>
        <span>{{ target.comment_count }}</span>
      </div>
    </MaterialButton>
  </RouterLink>
</template>

<script lang="ts" setup>
import MaterialButton from "@/components/MaterialButton.vue";

defineProps<{ target: ZAnswer | ZArticle }>();
</script>

<style lang="scss" scoped>
.target-card {
  width: 100%;
  text-align: start;

  -webkit-tap-highlight-color: transparent;
  color: black;

  p {
    margin: 5px 0px;
  }

  img {
    pointer-events: none;
    max-height: 200px;
    object-fit: cover;
  }
  > .title {
    margin-top: 0px;
    font-weight: bold;
    font-size: 16px;
  }

  > .author {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    > img {
      width: 25px;
      aspect-ratio: 1;
    }

    > span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-left: 5px;
      color: gray;

      &.headline {
        flex: 1;
        color: lightgray;
      }
    }
  }

  > .excerpt {
    display: flex;
    > p {
      flex: 1;
      font-size: 14px;
    }
    > img {
      width: 30%;
      margin-left: 10px;
      align-self: center;
    }
  }

  > .thumbnails {
    display: flex;
    > img {
      flex: 1;
      min-width: 0px;
      margin: 10px 2px;
    }
  }

  > .count {
    display: flex;
    align-items: center;

    color: gray;

    > span:not(:first-child) {
      margin-left: 5px;
    }
  }

  > :deep(.ripples) {
    &.ripple-enter-active {
      transition-duration: 0.3s;
    }
  }
}
</style>
