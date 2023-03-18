<template>
  <button
    class="material-button"
    @pointerdown="pointerDown"
    @pointerout="pointerOut"
    ref="button"
  >
    <TransitionGroup name="ripple" @after-enter="afterEnter">
      <div
        v-for="[id, ripple] in ripples"
        :key="id"
        :data-id="id"
        class="ripples"
        :style="{
          top: `${ripple.y}px`,
          left: `${ripple.x}px`,
          width: `${ripple.size}px`,
        }"
      ></div>
    </TransitionGroup>

    <slot></slot>
  </button>
</template>

<script lang="ts">
import random from "@/lib/random";
import { defineComponent } from "vue";

interface RippleInfo {
  x: number;
  y: number;
  size: number;
  ended?: boolean;
}

// 距离的平方
const ds = (x1: number, y1: number, x2: number, y2: number) =>
  Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);

export default defineComponent({
  data() {
    return {
      ripples: new Map<string, RippleInfo>(),
      holding: false,
    };
  },
  methods: {
    newID() {
      let id = "";
      do id = random.str();
      while (this.ripples.has(id));
      return id;
    },
    tryDelete() {
      if (!this.holding)
        this.ripples.forEach((v, k, m) => (v.ended ? m.delete(k) : 0));
    },
    pointerDown(payload: PointerEvent) {
      this.holding = true;
      const rect = (
        this.$refs["button"] as HTMLButtonElement
      ).getBoundingClientRect();
      this.ripples.set(this.newID(), {
        x: payload.clientX - rect.left,
        y: payload.clientY - rect.top,
        size: Math.sqrt(
          ds(
            payload.clientX,
            payload.clientY,
            payload.clientX < (rect.left + rect.right) / 2
              ? rect.right
              : rect.left,
            payload.clientY < (rect.top + rect.bottom) / 2
              ? rect.bottom
              : rect.top
          )
        ),
      });
    },
    pointerOut() {
      this.holding = false;
      this.tryDelete();
    },
    afterEnter(el: Element) {
      const id = el.getAttribute("data-id") ?? "";
      if (this.ripples.has(id)) this.ripples.get(id)!.ended = true;
      this.tryDelete();
    },
  },
});
</script>

<style lang="scss" scoped>
.material-button {
  border: none;
  overflow: hidden;
  position: relative;
  background-color: transparent;
  z-index: 0;

  > .ripples {
    z-index: -1;
    aspect-ratio: 1;
    position: absolute;
    border-radius: 100%;
    pointer-events: none;
    translate: -50% -50%;
    transform-origin: center;
    background-color: lightgray;

    &.ripple-enter-from {
      scale: 0;
      opacity: 1;
    }

    &.ripple-enter-active,
    &.ripple-leave-active {
      transition: all 0.35s ease-out;
    }

    &,
    &.ripple-enter-to,
    &.ripple-leave-from {
      scale: 2;
      opacity: 0.5;
    }

    &.ripple-leave-to {
      opacity: 0;
    }
  }
}
</style>
