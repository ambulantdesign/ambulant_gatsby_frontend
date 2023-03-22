/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

require("./src/assets/css/global.css")

// exports.shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition,
// }) => {
//   const currentPosition = getSavedScrollPosition(location)
//   const queriedPosition = getSavedScrollPosition({
//     pathname: `/artists/marisca-voskamp`,
//   })

//   console.log("currentPosition result:", currentPosition)
//   console.log("queriedPosition result:", queriedPosition)

//   //window.scrollTo(...(queriedPosition || [0, 0]))

//   return false
// }
export const onClientEntry = () => {
  window.onload = () => {
    /* do stuff */
  }
}
