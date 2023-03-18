import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./cert/tbontb.xyz.key",
      cert: "./cert/tbontb.xyz_bundle.crt",
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/icon-mask.png",
        "icons/icon-mono.svg",
        "fonts/*.woff2",
        "robots.txt",
      ],
      devOptions: { enabled: true },
      manifest: {
        id: "bismuth",
        name: "Bismuth",
        short_name: "Bismuth",
        description: "第三方移动端网页知乎",
        theme_color: "lightblue",
        background_color: "white",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/icon-mask.png",
            sizes: "200x200",
            type: "image/png",
          },
          {
            src: "/icons/icon-mono.svg",
            sizes: "200x200",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
