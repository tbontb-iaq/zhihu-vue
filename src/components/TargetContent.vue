<template>
  <div class="target-content" ref="content" v-html="html"></div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";
import highlight from "highlight.js";

const props = defineProps<{ html: string }>(),
  html = ref(""),
  content = ref<HTMLDivElement>(),
  a = <T>(iterable?: Iterable<T> | ArrayLike<T>) => Array.from(iterable ?? []);

const TexSpanClass = "tex-span";

onBeforeMount(() => {
  const body = new DOMParser().parseFromString(props.html, "text/html").body;
  a(body.getElementsByTagName("img")).forEach((img) => {
    if (img.src.startsWith("https://www.zhihu.com/equation?tex=")) {
      const span = document.createElement("span");
      span.textContent = img.alt;
      span.classList.add(TexSpanClass);
      img.replaceWith(span);
    }
  });
  html.value = body.innerHTML;
});

onMounted(() => {
  a(content.value?.getElementsByTagName("figure")).forEach((f) => {
    a(f.getElementsByTagName("img")).forEach((img) => {
      if (img.src.startsWith("data:")) img.remove();
    });
    const domParser = new DOMParser();
    a(f.getElementsByTagName("noscript")).forEach((noscript) => {
      f.append(
        ...a(
          domParser.parseFromString(noscript.textContent ?? "", "text/html")
            .body.children
        )
      );
      noscript.remove();
    });
  });

  a(content.value?.getElementsByTagName("a")).forEach((a) => {
    try {
      const url = new URL(a.href);
      if (url.hostname === "link.zhihu.com")
        a.href = url.searchParams.get("target") ?? a.href;
    } catch {}
  });

  a(content.value?.querySelectorAll("pre > code")).forEach((el) => {
    const ra = el.className.match(/language-(\S+)/),
      span = document.createElement("span");
    span.innerText = ra ? ra[1] : "unknown";
    span.classList.add("language-name");
    el.parentElement?.insertBefore(span, el);

    highlight.highlightElement(el as HTMLElement);
  });

  a(content.value?.querySelectorAll(`span.${TexSpanClass}`)).forEach((span) => {
    // https://mathjax.github.io/MathJax-demos-web/input-tex2svg.html.html
    MathJax.texReset();

    const options = MathJax.getMetricsFor(span);
    options.display = false;

    MathJax.tex2svgPromise(span.textContent, options).then((node: Node) => {
      span.replaceWith(node);
      MathJax.startup.document.clear();
      MathJax.startup.document.updateDocument();
    });
  });
});
</script>

<style lang="scss">
.target-content {
  user-select: text;
  font-size: 16px;
  line-height: 1.5em;
  word-break: break-all;
  overflow-wrap: break-word;

  :is(&, figure) > img {
    max-width: 100%;
    display: block;
    margin: auto;
  }

  > div.highlight {
    width: 100%;
    overflow: scroll;
    > pre {
      position: relative;
      > span.language-name {
        position: absolute;
        right: 0;
        color: gray;
      }

      > code {
        background-color: #e3e3e3;
      }
    }
  }

  > p {
    > code {
      background-color: #e3e3e3;
      padding: 0px 5px;
      border-radius: 5px;
    }
  }

  > figure {
    margin: 0px;
  }

  > blockquote {
    margin: 10px 10px 10px 0px;
    border-left: 5px lightgray solid;
    background-color: #f3f3f3;
    padding: 10px;
  }

  > ol {
    padding-left: 2em;
    > li::marker {
      font-size: 1.2em;
    }
  }

  > hr {
    height: 1px;
    border: none;
    background-color: lightgray;
  }

  > p > mjx-container > svg {
    max-width: 100%;
  }
}
</style>
