import { onActivated, ref } from "vue";

// 改成 Vue 指令
// 需要 Vue 指令支持 activated 钩子

export function useScroller(el?: HTMLElement) {
  if (el) {
    const scrollTop = ref(0);

    el.onscroll = () => {
      scrollTop.value = el.scrollTop;
    };
    onActivated(() => {
      el.scrollTo({ top: scrollTop.value });
    });
  }
}
