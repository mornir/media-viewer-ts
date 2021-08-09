import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import manifest from "./manifest"
export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      manifest,
    }),
  ],
})
