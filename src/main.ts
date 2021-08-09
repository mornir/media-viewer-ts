// @ts-ignore
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

const loadImagesInput = document.getElementById("load-images-input")!
const galleryElement = document.getElementById("gallery")!

function generateLightGalleryItems(files: Array<File>) {
  return files
    .map((file) => {
      if (file.type === "image/jpeg") {
        const objectUrl = URL.createObjectURL(file)

        return {
          src: objectUrl,
        }
      }

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

galleryElement.addEventListener("lgSlideItemLoad", (slide) => {
  // Free up memory
  // @ts-ignore
  URL.revokeObjectURL(slide.detail.index)
})

dragDrop("#upload", (files: Array<File>) => {
  const galleryItems = generateLightGalleryItems(files)
  const gallery = createGallery(galleryItems)
  gallery.openGallery()
})

loadImagesInput.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement
  const files = target.files as FileList
  const galleryItems = generateLightGalleryItems(Array.from(files))
  const gallery = createGallery(galleryItems)
  gallery.openGallery()
})

// Example usage of showDirectoryPicker
/* 
const loadImagesButton = document.getElementById("load-images-btn")!

loadImagesButton.addEventListener("click", async () => {
  const files = await getFiles()
  const galleryItems = generateLightGalleryItems(files)
  const gallery = createGallery(galleryItems)
  gallery.openGallery()
})


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
} */
