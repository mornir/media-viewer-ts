import lightGallery from "lightgallery"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-fullscreen.css"
import "lightgallery/css/lg-video.css"
// Plugins
import FullScreen from "lightgallery/plugins/fullscreen"
import lgZoom from "lightgallery/plugins/zoom"
import Video from "lightgallery/plugins/video"

const loadImagesButton = document.querySelector("#load-images")!
const galleryElement = document.getElementById("gallery")!

galleryElement.addEventListener("lgSlideItemLoad", (slide) => {
  // Free up memory
  // @ts-ignore
  URL.revokeObjectURL(slide.detail.index)
})

async function openGallery() {
  try {
    const dirHandle = await window.showDirectoryPicker()

    const images = []

    for await (const value of dirHandle.values()) {
      // @ts-ignore
      const file = await value.getFile()

      console.log(file)

      // @ts-ignore
      if (file.type === "image/jpeg") {
        const objectUrl = URL.createObjectURL(file)
        images.push({ src: objectUrl })
      }

      // @ts-ignore
      if (file.type === "video/webm") {
        const objectUrl = URL.createObjectURL(file)
        images.push({
          video: {
            source: [{ src: objectUrl, type: "video/webm" }],
            attributes: {
              preload: false,
              controls: true,
              playsinline: true,
              muted: true,
              autoplay: true,
              loop: true,
            },
          },
        })
      }
    }

    const gallery = createGallery(images)

    gallery.openGallery()
  } catch (error) {
    console.error(error)
  }
}

// @ts-ignore
function createGallery(media) {
  return lightGallery(galleryElement, {
    dynamic: true,
    plugins: [lgZoom, FullScreen, Video],
    closeOnTap: false,
    counter: false,
    download: false,
    mousewheel: true,
    loop: false,
    hideControlOnEnd: true,

    dynamicEl: media,
  })
}

loadImagesButton.addEventListener("click", openGallery)
