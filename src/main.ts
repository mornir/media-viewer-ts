import { registerSW } from "virtual:pwa-register"
registerSW()

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

const objectUrls = [] as string[]

function generateLightGalleryItems(files: Array<File>) {
  return files
    .map((file) => {
      if (file.type.split("/")[0] === "image") {
        const objectUrl = URL.createObjectURL(file)
        objectUrls.push(objectUrl)
        return {
          src: objectUrl,
        }
      }

      if (file.type.split("/")[0] === "video") {
        const objectUrl = URL.createObjectURL(file)
        objectUrls.push(objectUrl)
        return {
          video: {
            source: [{ src: objectUrl, type: file.type }],
            attributes: {
              preload: false,
              controls: false,
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

galleryElement.addEventListener("lgAfterSlide", (slide) => {
  // Free up memory
  // @ts-ignore
  URL.revokeObjectURL(objectUrls[slide.detail.index])
})

galleryElement.addEventListener("lgAfterClose", (event) => {
  objectUrls.length = 0
  objectUrls.forEach((url) => URL.revokeObjectURL(url))

  // Force change input change event
  // @ts-ignore
  loadImagesInput.value = ""

  // @ts-ignore
  event.detail.instance.destroy()
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
