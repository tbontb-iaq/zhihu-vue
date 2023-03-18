<template>
  <div class="not-logged">
    <p>还没有登录哦</p>
    <RouterLink to="/login" custom v-slot="{ navigate }">
      <MaterialButton class="login-button" @pointerup="navigate">
        去登录
      </MaterialButton>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import MaterialButton from "./MaterialButton.vue";
</script>

<style lang="scss" scoped>
.not-logged {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .login-button {
    display: block;
    padding: 10px;
    background-color: lightblue;
  }
}
</style>
