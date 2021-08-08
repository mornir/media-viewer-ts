import dragDrop from "drag-drop"

import lightGallery from "lightgallery"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-fullscreen.css"
import "lightgallery/css/lg-video.css"

// Plugins
import FullScreen from "lightgallery/plugins/fullscreen"
import lgZoom from "lightgallery/plugins/zoom"
import Video from "lightgallery/plugins/video"

const loadImagesButton = document.getElementById("load-images-btn")!
const galleryElement = document.getElementById("gallery")!

function generateLightGalleryItems(files) {
  return files
    .map((file) => {
      // @ts-ignore
      if (file.type === "image/jpeg") {
        const objectUrl = URL.createObjectURL(file)

        return {
          src: objectUrl,
        }
      }

      // @ts-ignore
      if (file.type === "video/webm") {
        const objectUrl = URL.createObjectURL(file)
        return {
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
        }
      }
      return null
    })
    .filter(Boolean)
}

async function getFiles() {
  try {
    const dirHandle = await window.showDirectoryPicker()
    const files = []
    for await (const value of dirHandle.values()) {
      // @ts-ignore
      const file = await value.getFile()
      files.push(file)
    }
    return files
  } catch (error) {
    console.error(error)
    return []
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

loadImagesButton.addEventListener("click", async () => {
  const files = await getFiles()
  const galleryItems = generateLightGalleryItems(files)
  const gallery = createGallery(galleryItems)
  gallery.openGallery()
})

galleryElement.addEventListener("lgSlideItemLoad", (slide) => {
  // Free up memory
  // @ts-ignore
  URL.revokeObjectURL(slide.detail.index)
})

// @ts-ignore
dragDrop("#upload", (files) => {
  const galleryItems = generateLightGalleryItems(files)
  const gallery = createGallery(galleryItems)
  gallery.openGallery()
})
