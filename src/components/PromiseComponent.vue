<template>
  <slot v-if="status === 'init'" :start="make"></slot>

  <slot v-else-if="status === 'pending'" name="pending">
    <div class="promise-pending"></div>
  </slot>

  <slot
    v-else-if="status === 'settled' && error"
    name="rejected"
    :error="error"
    :retry="retry"
  >
    <div class="promise-rejected">
      <p>好像出了点问题</p>
      <details>
        <summary>
          {{
            error?.message ??
            error?.msg ??
            error?.json?.error?.message ??
            "未知的错误"
          }}
        </summary>
        {{ error }}
      </details>
      <MaterialButton class="retry-button" @pointerup="retry">
        重试
      </MaterialButton>
    </div>
  </slot>

  <slot v-else name="fulfilled" :value="value" :retry="retry">
    <p>{{ value }}</p>
  </slot>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import MaterialButton from "./MaterialButton.vue";

type PromiseStatus = "init" | "pending" | "settled";

// 避免 any
// 需要 Vue 支持泛型 props

export default defineComponent({
  props: {
    make_promise: {
      type: Function as PropType<(...args: any) => Promise<unknown>>,
      required: true,
    },
    auto_make: { type: Boolean, default: true },
  },
  emits: ["then", "catch", "finally", "updated"],
  data() {
    return {
      value: undefined as any,
      error: undefined as any,
      status: "init" as PromiseStatus,
    };
  },
  methods: {
    clear() {
      this.value = undefined;
      this.error = undefined;
      this.status = "init";
    },
    retry(...args: any) {
      this.clear();
      return this.make(...args);
    },
    make(...args: any) {
      this.status = "pending";
      return this.make_promise(...args)
        .then((v) => {
          this.value = v;
          this.$emit("then", v);
        })
        .catch((e) => {
          this.error = e;
          this.$emit("catch", e);
        })
        .finally(() => {
          this.status = "settled";
          this.$emit("finally");
        });
    },
  },
  updated() {
    this.$emit("updated");
  },
  watch: {
    make_promise() {
      if (this.auto_make) this.make();
    },
  },
  created() {
    if (this.auto_make) this.make();
  },
  components: { MaterialButton },
});
</script>

<script setup></script>

<style lang="scss" scoped>
.promise-pending {
  width: 100%;
  height: 100%;
  max-width: 100px;
  margin: auto;
  background-image: url("@/assets/circular-progress.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.promise-rejected {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: scroll;
  box-sizing: border-box;
  > details {
    background-color: lightgray;
    padding: 10px;
    > summary {
      list-style: none;
      transition: margin 0.1s ease-out;
      vertical-align: bottom;
      &::before {
        font-family: "Material Symbols Sharp";
        content: "arrow_forward_ios";
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
        transition: rotate 0.1s ease-out;
      }
    }
    &[open] > summary {
      margin-bottom: 10px;
      &::before {
        rotate: 90deg;
      }
    }
  }
  > .retry-button {
    width: 90%;
    margin: 10px auto;
    display: block;
    padding: 10px;
    border: 1px black solid;
  }
}
</style>
