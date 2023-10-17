/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from "react"
import { SearchProvider } from "./src/context/SearchContext"
require("./src/assets/css/global.css")

// import React from "react"
// import { BrowserRouter as Router } from "react-router-dom"

// export const wrapRootElement = ({ element }) => {
//   return <Router>{element}</Router>
// }

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

// export const onClientEntry = () => {
//   window.onload = () => {
//     // do stuff
//   }
// }
export const wrapRootElement = ({ element }) => (
  <SearchProvider>{element}</SearchProvider>
)
