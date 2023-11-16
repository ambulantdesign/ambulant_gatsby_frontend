import * as React from "react"
import { useRef, useEffect } from "react"
import { graphql, withPrefix } from "gatsby"
import styled from "styled-components"

import * as styles from "../assets/css/index.module.css"
import Layout from "../components/Layout"
import Loading from "../components/ui/Loading"
import Seo from "../components/Seo"
import ArchiveProject from "../components/ArchiveProject"
import ContentHeader from "../components/ContentHeader"

var _ = require("lodash")

const ArchivePage = ({ data }) => {
  const loaderRef = useRef()
  const gridRef = useRef()
  const {
    allStrapiArchiveItem: { nodes: projects },
  } = data

  useEffect(() => {
    loaderRef.current.style.display = "none"
    gridRef.current.style.opacity = "100"

    //   let tmpProjects = _.sampleSize(
    //     projects,
    //     parseInt(process.env.GATSBY_POSTS_FIRST_PAGE)
    //   )

    //   tmpProjects = _.orderBy(
    //     tmpProjects,
    //     ["productionDate", "slug"],
    //     ["desc", "asc"]
    //   )
    //   setRandomProjects(tmpProjects)
  }, [data])

  return (
    <>
      <Layout id="home">
        <Wrapper className={styles.portfolio} id="main">
          <Loading
            elemId="spinner"
            wrapperClasses="loading-spinner"
            refHandle={loaderRef}
          />

          <div
            className={styles.archiveContent}
            id="portfolio-grid"
            style={{}}
            ref={gridRef}
          >
            <ContentHeader title={`Archive`} />
            {projects &&
              projects.map(project => (
                <div
                  className={`${styles.work} gridItem pr-4`}
                  key={project.id}
                  id={`gridItem-${project.id}`}
                >
                  <ArchiveProject
                    // id={id}
                    // title={title}
                    // description={description}
                    // medium={medium}
                    // city={city}
                    // yearStart={yearStart}
                    // yearEnd={yearEnd}
                    // gallery={Gallery}
                    key={project.id}
                    {...project}
                  />
                </div>
              ))}
          </div>
        </Wrapper>
      </Layout>
    </>
  )
}

const Wrapper = styled.main`
  .grid#content footer {
    grid-column: span 12;
  }
  #content p {
    margin-bottom: 1em;
  }
  .grid > .col-6 {
    grid-column: span 6;
  }
  .grid h5 {
    color: var(--clr-grey-3);
  }
  .grid footer h5 {
    font-weight: bold;
    color: var(--clr-text);
    margin-bottom: 1em;
  }
  @media screen and (max-width: 600px) {
    .grid > .col-6 {
      grid-column: span 12;
    }
  }
`

export const query = graphql`
  {
    allStrapiArchiveItem(
      sort: { fields: [yearStart, slug], order: [DESC, ASC] }
    ) {
      nodes {
        id: strapi_id
        title
        medium
        city
        yearStart
        yearEnd
        description {
          data {
            description
          }
        }
        Gallery {
          id: strapi_id
          caption
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                height: 290
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
export const Head = ({ location }) => {
  return (
    <>
      <Seo
        title="Archive"
        // description={excerpt}
        // image={card_image}
        // lang="de"
        pathname={location.pathname}
      />
    </>
  )
}
export default ArchivePage