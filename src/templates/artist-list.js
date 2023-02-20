import * as React from "react"
import { graphql, withPrefix } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import ContentHeader from "../components/ContentHeader"
import GridProject from "../components/GridProject"
import NoResults from "../components/NoResults"
import * as styles from "../assets/css/index.module.css"

const ArtistList = ({ data, pageContext }) => {
  const {
    works: { nodes: projects },
  } = data
  return (
    <>
      <Layout>
        <main className={styles.portfolio} id="main">
          <ContentHeader title={pageContext.title} />
          {!(projects.length > 0) && <NoResults tagName={pageContext.title} />}
          <div className={styles.portfolioGrid} id="portfolio-grid">
            {projects.length > 0 &&
              projects.map(project => {
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
  query ListView($slug: String!) {
    works: allStrapiWork(filter: { artist: { slug: { eq: $slug } } }) {
      nodes {
        id
        title
        slug
        artist {
          fullname
        }
        meta {
          year
          id
        }
        Gallery {
          id
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

export const Head = ({ data, pageContext }) => {
  const seoTitle = `Artist: ${pageContext.title}`
  return (
    <>
      <script src={withPrefix("/js/autoGrid.js")} type="text/javascript" />
      <Seo
        title={seoTitle}
        // description={excerpt}
        // image={card_image}
        // lang="de"
        // pathname={props.location.pathname}
      />
    </>
  )
}

export default ArtistList
