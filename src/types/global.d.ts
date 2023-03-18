import { ZApi } from "@/lib/api";
import { ToastManager } from "@/plugins/toast";

declare global {
  var zApi: ZApi;
  var ZApiUrl: typeof import("@/lib/api_url").ZApiUrl;

  // @types/mathjax 是 v2 的
  var MathJax: any;
}

declare module "vue" {
  interface ComponentCustomProperties {
    $toast: ToastManager;
  }
}
