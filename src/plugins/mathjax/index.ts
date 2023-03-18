import type { Plugin } from "vue";

const MathJax: Plugin = {
  install() {
    (window as any).MathJax = {
      tex: {
        inlineMath: [["\\(", "\\)"]],
      },
      svg: {
        fontCache: "global",
      },
    };
    const script = document.createElement("script");
    script.src = "/src/assets/mathjax/tex-svg-full.js";
    script.async = true;
    document.head.append(script);
  },
};

export { MathJax };
