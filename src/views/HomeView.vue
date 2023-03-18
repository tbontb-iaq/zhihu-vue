<template>
  <div class="home-view">
    <KeepAlive>
      <component
        :is="pages[index].component"
        :key="pages[index].name"
        class="page"
        ref="page"
      ></component>
    </KeepAlive>
    <nav class="bottom">
      <MaterialButton
        v-for="(page, i) in pages"
        :key="page.name"
        @click="changeIndex(i)"
        class="button"
      >
        <span
          class="material-symbols-outlined"
          :class="{ active: i === index }"
        >
          {{ page.icon }}
        </span>
        <span class="name">{{ page.name }}</span>
      </MaterialButton>
    </nav>
  </div>
</template>

<script lang="ts">
import MaterialButton from "@/components/MaterialButton.vue";
import { defineComponent, markRaw } from "vue";
import FollowPage from "./pages/FollowPage.vue";
import HotPage from "./pages/HotPage.vue";
import IndexPage from "./pages/IndexPage.vue";
import MePage from "./pages/MePage.vue";

export default defineComponent({
  data() {
    return {
      pages: [
        { name: "首页", icon: "home", component: markRaw(IndexPage) },
        {
          name: "热榜",
          icon: "local_fire_department",
          component: markRaw(HotPage),
        },
        { name: "关注", icon: "person_add", component: markRaw(FollowPage) },
        { name: "我的", icon: "account_circle", component: markRaw(MePage) },
      ],
      index: 0,
    };
  },
  methods: {
    changeIndex(index: number) {
      if (index === this.index && "bottomClick" in (this.$refs as any)["page"])
        (this.$refs as any)["page"]["bottomClick"]();
      this.index = index;
    },
  },
  components: { MaterialButton },
});
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  > .page {
    min-height: 0px;
    flex: 1;
  }
  > .bottom {
    display: flex;
    justify-content: space-around;
    position: relative;
    box-shadow: 0px 0px 10px black;
    overflow: hidden;
    > .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border-radius: 100%;
      overflow: visible;
      justify-content: center;
      > :deep(.ripples) {
        transition-duration: 0.2s;
      }
      > .material-symbols-outlined {
        transition: all 0.2s ease-in-out;
        font-variation-settings: "FILL" 0;
        &.active {
          font-variation-settings: "FILL" 1;
        }
      }
      > .name {
        font-size: 10px;
      }
    }
  }
}
</style>
