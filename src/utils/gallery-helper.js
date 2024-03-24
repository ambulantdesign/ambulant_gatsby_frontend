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

export const artGalleryListOrder = (
  projects,
  institutions,
  sortOrder = "end"
) => {
  let newProjectsList = []

  // const allInstitutions = galleries.nodes
  const galleryWorks = projects.filter(project => project.institution !== null)
  const restWorks = projects.filter(project => project.institution === null)

  let sortedInstitutions = []

  // seperate institutions within 'galleryWorks'
  institutions.map(institution => {
    const worksFromSingleGallery = galleryWorks.filter(
      work => work.institution.sortName === institution.sortName
    )
    sortedInstitutions.push(...worksFromSingleGallery)
  })

  // apply new sort oder to projects array or do not change order at all
  if (sortOrder === "begin") {
    newProjectsList = [...sortedInstitutions, ...restWorks]
  } else if (sortOrder === "end") {
    newProjectsList = [...restWorks, ...sortedInstitutions]
  } else {
    newProjectsList = projects
  }

  return newProjectsList
}
