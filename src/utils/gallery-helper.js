import { getImage, getSrc } from "gatsby-plugin-image"

export const getRandomGalleryImage = gallery => {
  const index = Math.floor(Math.random() * gallery.length)
  const randomImg = getImage(gallery[index].localFile)
  return randomImg
}

export const getRandomGalleryImageSrc = gallery => {
  const index = Math.floor(Math.random() * gallery.length)
  const randomImg = getSrc(gallery[index].localFile)
  return randomImg
}

export const randomGalleryItem = gallery => {
  const index = Math.floor(Math.random() * gallery.length)
  const randomImg = gallery[index]
  return randomImg
}
