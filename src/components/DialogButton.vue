<template>
  <div class="dialog-button">
    <MaterialButton @pointerup="showDialog" class="button">
      <slot></slot>
    </MaterialButton>

    <dialog ref="dialog" class="dialog">
      <slot name="dialog" :close="closeDialog"></slot>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MaterialButton from "./MaterialButton.vue";

const props = withDefaults(defineProps<{ modal: boolean }>(), { modal: true }),
  dialog = ref<HTMLDialogElement>();

const popstateListener = () => (props.modal ? showDialog() : closeDialog()),
  pointerupListener = (ev: PointerEvent) => {
    if (dialog.value && dialog.value.open) {
      const rect = dialog.value.getBoundingClientRect();
      if (
        ev.clientX < rect.left ||
        ev.clientX > rect.right ||
        ev.clientY < rect.top ||
        ev.clientY > rect.bottom
      )
        closeDialog();
    }
  };

function showDialog() {
  if (dialog.value && !dialog.value.open) {
    if (props.modal) dialog.value.showModal();
    else {
      dialog.value.show();
      setTimeout(() => addEventListener("pointerup", pointerupListener), 10);
    }
    if (
      !(
        history.state &&
        typeof history.state === "object" &&
        "DIALOG_STATE" in history.state
      )
    )
      history.pushState({ DIALOG_STATE: "", ...history.state }, "dialog");
    addEventListener("popstate", popstateListener, { once: true });
  }
}

function closeDialog() {
  dialog.value?.classList.add("close");
  dialog.value?.addEventListener(
    "animationend",
    () => {
      dialog.value?.classList.remove("close");
      dialog.value?.close();
    },
    {
      once: true,
    }
  );
  removeEventListener("popstate", popstateListener);
  removeEventListener("pointerup", pointerupListener);
}
</script>

<style lang="scss" scoped>
.dialog-button {
  > .button {
    width: 100%;
    height: 100%;
  }

  > .dialog {
    top: 0;
    bottom: 0;
    position: fixed;

    &[open] {
      animation: show 0.5s ease normal;
      max-height: 100%;
      max-width: 60vh;
      overflow: scroll;
      @keyframes show {
        from {
          translate: 0 50%;
          opacity: 0.5;
        }
        to {
          opacity: 1;
          translate: 0;
        }
      }

      &.close {
        animation: close 0.5s ease normal;
        @keyframes close {
          from {
            opacity: 1;
            translate: 0;
          }
          to {
            opacity: 0;
            translate: 0 -50%;
          }
        }
      }
    }

    &::backdrop {
      background-color: #0000001a;
    }
  }
}
</style>
