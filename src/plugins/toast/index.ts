import { type Plugin, getCurrentInstance, createVNode, render, ref } from "vue";
import AppToast from "./AppToast.vue";
import random from "@/lib/random";

type _ToastInfo = ToastInfo & Partial<{ timeout: number }>;
type ToastOpt<T> = {
  pending: ToastInfo | (() => ToastInfo);
  settled: ToastInfo | ((value: T) => ToastInfo);
  rejected: ToastInfo | ((err: any) => ToastInfo);
};

const defaultOpt: ToastOpt<any> = {
  pending: { message: "加载中", duration: Infinity },
  settled: (v) => ({ message: `${v}` }),
  rejected: (err) => ({ message: `${err}` }),
};

const get_toast = <T>(t: ToastOpt<T>[keyof ToastOpt<T>], v: any) =>
  typeof t === "function" ? t(v) : t;

class ToastManager {
  constructor(private toasts: Map<string, _ToastInfo>) {}

  private get newId() {
    let id;
    do id = random.str();
    while (this.toasts.has(id));
    return id;
  }

  get(id: string): ToastInfo | undefined {
    return this.toasts.get(id);
  }

  add(info: ToastInfo) {
    const id = this.newId;
    this.toasts.set(id, info);
    if (info.duration !== Infinity)
      (info as _ToastInfo).timeout = setTimeout(
        () => this.remove(id),
        info.duration ?? 2000
      );
    return id;
  }

  remove(id: string) {
    clearTimeout(this.toasts.get(id)?.timeout);
    this.toasts.delete(id);
  }

  load<T>(promise: () => Promise<T>, opt?: Partial<ToastOpt<T>>) {
    if (!opt) opt = defaultOpt;
    for (let k in defaultOpt)
      if (!(k in opt)) (opt as any)[k] = (defaultOpt as any)[k];

    const id = this.add(get_toast(opt.pending!, undefined)),
      p = promise();

    p.then((v) => this.add(get_toast(opt?.settled!, v)))
      .catch((err) => this.add(get_toast(opt?.rejected!, err)))
      .finally(() => this.remove(id));

    return { promise: p, id };
  }
}

const Toast: Plugin = {
  install(app) {
    const toastMap = ref(new Map<string, ToastInfo>());
    app.config.globalProperties.$toast = new ToastManager(toastMap.value);

    const toastNode = createVNode(AppToast, { toasts: toastMap.value }),
      div = document.createElement("div");
    div.id = "app-toast";
    document.body.append(div);
    render(toastNode, div);
  },
};

const useToast = () =>
  getCurrentInstance()!.appContext.config.globalProperties.$toast;

export { ToastManager, Toast, useToast };
