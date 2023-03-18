import { useLocalStorage } from "@/stores/local_storage";
import type { Plugin } from "vue";

const Emotion: Plugin = {
  async install() {
    const stickerGroup = await useLocalStorage().get("sticker-group", () =>
      zApi.get(ZApiUrl.sticker_groups, {})
    );
    const stickerMap: Map<string, ZSticker> = new Map();
    for (let s of stickerGroup.data)
      if (s.type === "emoji") {
        const sticker = await useLocalStorage().get(`sticker-${s.id}`, () =>
          zApi.get(ZApiUrl.sticker, { id: s.id })
        );
        sticker.data.stickers.forEach((v) =>
          v.placeholder ? stickerMap.set(v.placeholder, v) : 0
        );
      }

    const res = await fetch(
        "https://unpkg.zhimg.com/@cfe/emoticon@1.2.4/lib/emoticon.js"
      ),
      js = await res.text();
    new Function(js)();

    if ("zh_emoticon" in window)
      (window.zh_emoticon as any).forEach((a: any) => {
        a["stickers"].forEach((s: ZSticker) => {
          if (s.placeholder && !stickerMap.has(s.placeholder))
            stickerMap.set(s.placeholder, s);
        });
      });

    localStorage.setItem("emotions", JSON.stringify([...stickerMap.entries()]));
  },
};

export { Emotion };
