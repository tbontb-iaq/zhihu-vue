import { ZApi } from "@/lib/api";
import type { Plugin } from "vue";
import { ZApiUrl } from "@/lib/api_url";

const LOGGED = "logged";

const ZApiP: Plugin = {
  install() {
    globalThis.zApi = new ZApi(1);
    globalThis.ZApiUrl = ZApiUrl;

    const logged = localStorage.getItem(LOGGED) === "true";
    if (logged) {
      zApi
        .get(ZApiUrl.me, {})
        .then(() => (zApi.logged = true))
        .catch((e) => {
          console.error(`登录失败：${e}`);
          localStorage.setItem(LOGGED, "false");
        });
    }
  },
};

const changeLoginState = (logged: boolean) => {
  zApi.logged = logged;
  localStorage.setItem(LOGGED, `${logged}`);
};

export { ZApiP, changeLoginState };
