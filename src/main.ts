import lightGallery from "lightgallery"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-fullscreen.css"
// Plugins
import FullScreen from "lightgallery/plugins/fullscreen"
import lgZoom from "lightgallery/plugins/zoom"

const loadImagesButton = document.querySelector("#load-images")!
const galleryElement = document.getElementById("gallery")!

/* function openGallery() {
  
}
 */
function openGallery() {
  const gallery = lightGallery(galleryElement, {
    dynamic: true,
    plugins: [lgZoom, FullScreen],
    closeOnTap: false,
    speed: 500,
    counter: false,
    download: false,
    mousewheel: true,
    loop: false,
    hideControlOnEnd: true,
    dynamicEl: [
      // @ts-ignore
      {
        src: "https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80",
      },
      // @ts-ignore
      {
        src: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      },
    ],
  })
  gallery.openGallery()
}

loadImagesButton.addEventListener("click", openGallery)
