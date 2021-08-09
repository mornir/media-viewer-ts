import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import manifest from "./manifest"
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest,
    }),
  ],
})
