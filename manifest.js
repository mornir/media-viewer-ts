export default {
  name: "Media Viewer",
  icons: [
    {
      src: "/favicon.svg",
      purpose: "any maskable",
      type: "image/svg+xml",
      sizes: "any",
    },
    {
      src: "/maskable_icon_x192.png",
      type: "image/png",
      sizes: "192x192",
      purpose: "any maskable",
    },
    {
      src: "/maskable_icon_x512.png",
      type: "image/png",
      sizes: "512x512",
      purpose: "any maskable",
    },
  ],
  start_url: "/?source=pwa",
  background_color: "#374151",
  display: "standalone",
  scope: "/",
  theme_color: "#374151",
  description: "Easily view gallery of images and videos",
}
