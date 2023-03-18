<template>
  <div class="login-view">
    <div class="login-form">
      <p>使用 cookie 登录</p>
      <input class="input" type="text" v-model="z_c0" />
      <MaterialButton class="button" @pointerup="login"> 登录 </MaterialButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MaterialButton from "@/components/MaterialButton.vue";
import { ref } from "vue";
import Cookie from "js-cookie";
import { useRouter } from "vue-router";
import { useToast } from "@/plugins/toast";
import { changeLoginState } from "@/plugins/zapi";

let toastID = "";
const router = useRouter(),
  t = useToast(),
  z_c0 = ref(""),
  login = () => {
    if (z_c0.value.length && !toastID.length) {
      Cookie.set("z_c0", z_c0.value, { expires: 30 * 6, secure: true });

      const tmp = t.load(() => zApi.get(ZApiUrl.me, {}), {
        pending: { message: "登录中", duration: Infinity },
        settled: (me) => ({ message: `欢迎你，${me.name}` }),
        rejected: (err) => ({ message: `登录失败：${err}` }),
      });

      toastID = tmp.id;

      tmp.promise.then(() => {
        changeLoginState(true);
        router.replace("/");
        setTimeout(() => {
          router.go(0);
        }, 10);
      });
    } else {
      t.add({ message: "cookie 不能为空" });
    }
  };
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  > .login-form {
    border: 1px solid;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > .input {
      padding: 10px;
      margin: 0px;
      outline: none;
      transition: all 0.1s ease-out;
      border: 1px solid black;
      &:focus-visible {
        padding: 7px;
        margin: 3px;
      }
    }

    > .button {
      margin: 10px;
      width: 50%;
      padding: 10px;
      background-color: lightblue;
    }
  }
}
</style>
