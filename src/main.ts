import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

import { Toast } from "./plugins/toast";
import { ZApiP } from "./plugins/zapi";
import { Pinned } from "./directives/pinned";
import { MathJax } from "./plugins/mathjax";
import { Emotion } from "./plugins/emotion";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Toast);
app.use(ZApiP);
app.use(MathJax);
app.use(Emotion);

app.directive("pinned", Pinned);

app.mount("#app");
