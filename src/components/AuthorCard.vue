<template>
  <div class="author-card">
    <img :src="author.avatar_url" alt="avatar" />
    <div class="info">
      <span class="name">{{ author.name }}</span>
      <span class="headline" v-if="author.headline.length">
        {{ author.headline }}
      </span>
    </div>
    <MaterialButton class="follow-button">
      <span class="material-symbols-outlined">add</span>
      <span>关注</span>
    </MaterialButton>
  </div>
</template>

<script lang="ts" setup>
import MaterialButton from "./MaterialButton.vue";

defineProps<{ author: ZAuthor }>();
</script>

<style lang="scss" scoped>
.author-card {
  display: flex;
  align-items: center;
  > img {
    border-radius: 10px;
    width: 50px;
    aspect-ratio: 1;
  }
  > .info {
    flex: 1;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    align-self: stretch;
    justify-content: space-evenly;
    > .name {
      font-weight: bold;
    }
    > .headline {
      font-size: 0.8em;
      color: gray;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > .follow-button {
    border: 1px solid;
    white-space: nowrap;
    > span {
      vertical-align: middle;
    }
  }
}
</style>
