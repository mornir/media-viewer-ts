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
  URL.revokeObjectURL(slide.detail.index)
})

async function openGallery() {
  try {
    const dirHandle = await window.showDirectoryPicker()

    const images = []

    for await (const value of dirHandle.values()) {
      const file = await value.getFile()

      console.log(file)

      if (file.type === "image/jpeg") {
        const objectUrl = URL.createObjectURL(file)
        images.push({ src: objectUrl })
      }

      if (file.type === "video/webm") {
        const objectUrl = URL.createObjectURL(file)
        images.push({
          video: {
            source: [{ src: objectUrl, type: "video/webm" }],
            attributes: { preload: false, controls: true },
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

function createGallery(media) {
  return lightGallery(galleryElement, {
    dynamic: true,
    plugins: [lgZoom, FullScreen, Video],
    closeOnTap: false,
    autoplayVideoOnSlide: true,
    counter: false,
    download: false,
    mousewheel: true,
    loop: false,
    hideControlOnEnd: true,

    dynamicEl: media,
  })
}

loadImagesButton.addEventListener("click", openGallery)
