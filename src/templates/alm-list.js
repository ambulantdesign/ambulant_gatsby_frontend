import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { graphql, withPrefix } from "gatsby"
import styled from "styled-components"
import { FaParagraph } from "react-icons/fa"

import Layout from "../components/Layout"
import Loading from "../components/ui/Loading"
import Seo from "../components/Seo"
import ContentHeader from "../components/ContentHeader"
import GridProject from "../components/GridProject"
import NoResults from "../components/NoResults"
import * as styles from "../assets/css/index.module.css"

const AlmListPage = ({ data, pageContext }) => {
  const { title, contentType } = pageContext
  const [sliceLength, setSliceLength] = useState(
    parseInt(process.env.REACT_APP_GATSBY_POSTS_FIRST_PAGE)
  )
  let projects

  if (contentType === "artists") {
    projects = data.artists.nodes
  }
  if (contentType === "keywords") {
    projects = data.keywords.nodes
  }

  const loaderRef = useRef()
  const gridRef = useRef()

  console.log(projects, projects.length)

  const noresults = projects.length <= 0

  // CSS class for fade-in animation of last added item
  const [fadeIn, setFadeIn] = useState("")

  // State for the list
  const [list, setList] = useState([])

  // current length of list
  const [oldItems, setOldItems] = useState(list.length)

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(projects.length > sliceLength)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    setSliceLength(parseInt(process.env.REACT_APP_GATSBY_POSTS_ON_ALM))
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < projects.length
      const nextResults = isMore
        ? projects.slice(currentLength, currentLength + sliceLength)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
      setOldItems(list.length)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  // Check if there is more
  useEffect(() => {
    const isMore = list.length < projects.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  // Check if element added to current list
  useEffect(() => {
    if (!oldItems) return
    let timeout = setTimeout(() => setFadeIn("fade"), 500)
    return () => {
      clearTimeout(timeout)
      setFadeIn("")
    }
  }, [oldItems]) //eslint-disable-line

  useEffect(() => {
    loaderRef.current.style.display = "none"
    gridRef.current.style.opacity = "100"
  }, [data])

  useEffect(() => {
    setList([...projects.slice(0, sliceLength)])
  }, [])

  console.log(list, list.length)

  return (
    <>
      <Layout>
        <Wrapper className={styles.portfolio} id="main">
          <ContentHeader title={title} />
          {noresults && <NoResults tagName={title} />}
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
            {projects.length > 0 &&
              list.map((project, index) => {
                const { id, title, slug, artist, Gallery } = project
                const isNew = index >= oldItems && index < projects.length
                // const extraClass = isNew ? fadeIn : `old`
                const extraClass = isNew ? `new ${fadeIn}` : `old`

                return (
                  <div
                    className={`${styles.work} ${extraClass} gridItem pr-4`}
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
            <div className="btn-container">
              {hasMore ? (
                <button
                  type="button"
                  className="w-full btn-solid py-2 px-8 mr-4 border rounded inline-block"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              ) : (
                <div className="big">
                  <FaParagraph />
                </div>
              )}
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  )
}

const Wrapper = styled.main`
  .big {
    font-size: 1.875em;
    color: var(--clr-grey-3);
  }
  .btn-container {
    grid-column: 1 / -1;
    text-align: center;
    margin: 0 auto;
  }
  .gridItem.new {
    opacity: 0;
  }
  .gridItem.fade {
    animation-duration: 0.7s;
    animation-name: fadeIn;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      visibility: hidden;
    }

    to {
      opacity: 1;
    }
  }
`

export const query = graphql`
  query ListView($slug: String!) {
    keywords: allStrapiWork(
      filter: { keywords: { elemMatch: { slug: { eq: $slug } } } }
      sort: { order: DESC, fields: productionDate }
    ) {
      nodes {
        id
        title
        slug
        productionDate
        artist {
          fullname
        }
        keywords {
          name
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
    artists: allStrapiWork(
      filter: { artist: { slug: { eq: $slug } } }
      sort: { order: [DESC, ASC], fields: [productionDate, slug] }
    ) {
      nodes {
        id
        title
        slug
        productionDate
        artist {
          fullname
        }
        keywords {
          name
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
  const { title, contentType } = pageContext
  let seoTitle

  if (contentType === "artists") {
    seoTitle = `Artist: ${title}`
  }
  if (contentType === "keywords") {
    seoTitle = `Keyword: ${title}`
  }

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

export default AlmListPage
