import * as React from "react"
import { useRef, useEffect } from "react"
import { graphql, withPrefix } from "gatsby"

import Layout from "../components/Layout"
import Loading from "../components/ui/Loading"
import Seo from "../components/Seo"
import GridProject from "../components/GridProject"
import { randomGalleryItem } from "../utils/gallery-helper"

import * as styles from "../assets/css/index.module.css"

var _ = require("lodash")

const IndexPage = ({ data }) => {
  const [randomProjects, setRandomProjects] = React.useState([])
  const loaderRef = useRef()
  const gridRef = useRef()
  const {
    allStrapiWork: { nodes: projects },
  } = data

  useEffect(() => {
    loaderRef.current.style.display = "none"
    gridRef.current.style.opacity = "100"

    let homeProjects = _.sampleSize(
      projects,
      parseInt(process.env.GATSBY_POSTS_FIRST_PAGE)
    )

    homeProjects = _.orderBy(
      homeProjects,
      ["productionDate", "slug"],
      ["desc", "asc"]
    )

    setRandomProjects(homeProjects)
  }, [data])

  return (
    <>
      <Layout id="home">
        <main className={styles.portfolio} id="main">
          <Loading
            elemId="spinner"
            wrapperClasses="loading-spinner"
            refHandle={loaderRef}
          />

          <div
            className={styles.portfolioGrid}
            id="portfolio-grid"
            style={{}}
            ref={gridRef}
          >
            {randomProjects &&
              randomProjects.map(project => {
                const { id, title, slug, artist, Gallery } = project

                return (
                  <div
                    className={`${styles.work} gridItem pr-4`}
                    key={id}
                    id={`gridItem-${id}`}
                  >
                    <GridProject
                      id={id}
                      title={title}
                      slug={slug}
                      artist={artist}
                      gallery={Gallery}
                    />
                  </div>
                )
              })}
          </div>
        </main>
      </Layout>
    </>
  )
}

export const query = graphql`
  {
    allStrapiWork(sort: { order: DESC, fields: [productionDate, slug] }) {
      nodes {
        id: strapi_id
        title
        slug
        productionDate
        keywords {
          name
        }
        artist {
          fullname
        }
        meta {
          medium
          info
          ISBN
          city
          commissioner
          format
          publisher
          technical_details
          year
          id: strapi_id
        }
        Gallery {
          id: strapi_id
          caption
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                height: 300
              )
            }
          }
        }
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ location, data }) => {
  const [seoImg, setSeoImg] = React.useState(null)
  const { nodes: projects } = data.allStrapiWork

  useEffect(() => {
    if (projects && projects.length > 0) {
      const { Gallery } = projects[Math.floor(Math.random() * projects.length)]
      setSeoImg(randomGalleryItem(Gallery))
    }
  }, [data])

  return (
    <>
      <script src={withPrefix("/js/autoGrid.js")} type="text/javascript" />
      <Seo
        title="Home"
        // description={excerpt}
        image={seoImg}
        pathname={location.pathname}
      />
    </>
  )
}
export default IndexPage
