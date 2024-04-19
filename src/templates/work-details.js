import * as React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Script, withPrefix } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import WorkContentNormal from "../components/WorkContentNormal"
import WorkContentArchive from "../components/WorkContentArchive"

const WorkDetails = ({ data }) => {
  let allRelatedWorks = null
  const { id, gallery, smallSlider, videos, institution } = data.work
  const allGalleryWorks = data.allWorksForGallery.nodes

  if (institution) {
    allRelatedWorks = allGalleryWorks.filter(
      item =>
        item.institution !== null &&
        item.institution.name === institution.name &&
        id !== item.id
    )
  }

  let allGalleries = []
  let sliderVideos = []
  let extraVideos = []

  if (videos.length > 0) {
    videos.map(video =>
      video.addToSlider
        ? sliderVideos.push(video.file)
        : extraVideos.push(video.file)
    )
  }
  if (sliderVideos.length > 0) {
    const allSliderVideos = {
      id: sliderVideos[0].id,
      isSliderVideo: true,
      sliderVideos,
    }
    allGalleries = [allSliderVideos, ...gallery]
  } else {
    allGalleries = gallery
  }

  return (
    <>
      <Layout>
        <Wrapper className="portfolio" id="main">
          {smallSlider ? (
            <WorkContentArchive
              data={data}
              gallery={allGalleries}
              related={allRelatedWorks}
            />
          ) : (
            <WorkContentNormal
              data={data}
              gallery={allGalleries}
              related={allRelatedWorks}
            />
          )}
          {/* <!-- big Swiper (seperate component) --> */}
        </Wrapper>
      </Layout>
      <Script src={withPrefix("/js/swiper-custom.js")} type="text/javascript" />
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
  @media screen and (max-width: 640px) {
    .grid > .col-6 {
      grid-column: span 12;
    }
  }
`
export const query = graphql`
  fragment seoFields on STRAPI__COMPONENT_SEO_SEO_BASIC_FIELDS {
    seo_title
    seo_description
    seo_image {
      localFile {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
          gatsbyImageData(
            placeholder: NONE
            layout: FULL_WIDTH
            formats: NO_CHANGE
          )
        }
      }
    }
  }
  query WorkDetails($slug: String!, $gallery: STRAPI_GALLERYFilterInput) {
    work: strapiWork(slug: { eq: $slug }) {
      id: strapi_id
      slug
      title
      smallSlider
      content {
        data {
          content
        }
      }
      artist {
        fullname
        slug
      }
      keywords {
        id
        name
        slug
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
        yearEnd
      }
      weblink: Weblink {
        button
        url
        label
      }
      institution: gallery {
        id
        name
        colorCode
      }
      gallery: Gallery {
        id
        caption
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      videos: Videos {
        file {
          id
          caption
          mime
          localFile {
            url
          }
        }
        addToSlider
      }
      streamingVideo {
        streamingPlatform
        url
        videoId
        urlParams
        videoCaption
        autoplay
        controls
        loop
        related
        show_fullscreen
        consent_message {
          data {
            consent_message
          }
        }
      }
      seo {
        ...seoFields
      }
    }
    allWorksForGallery: allStrapiWork(
      sort: {
        order: [ASC, DESC, ASC]
        fields: [gallery___sortName, productionDate, slug]
      }
      filter: { gallery: $gallery }
    ) {
      nodes {
        id: strapi_id
        title
        slug
        productionDate
        institution: gallery {
          id
          name
          sortName
        }
        Gallery {
          id
          localFile {
            childImageSharp {
              gatsbyImageData(
                formats: WEBP
                layout: CONSTRAINED
                placeholder: BLURRED
                height: 100
              )
            }
          }
        }
      }
    }
  }
`

export const Head = ({ location, data }) => {
  const { title, artist, seo } = data.work

  let fullTitle

  artist?.fullname
    ? (fullTitle = `${artist.fullname}: ${title} `)
    : (fullTitle = title)

  return (
    <Seo
      title={fullTitle}
      description={seo?.seo_description}
      image={seo?.seo_image}
      pathname={location.pathname}
    />
  )
}

WorkContentArchive.defaultProps = {
  data: {
    work: {
      gallery: [],
      smallSlider: false,
      videos: [],
    },
  },
}

WorkContentArchive.propTypes = {
  data: PropTypes.shape({
    work: PropTypes.shape({
      gallery: PropTypes.arrayOf(
        PropTypes.shape({
          caption: PropTypes.string,
          id: PropTypes.string.isRequired,
          localFile: PropTypes.object.isRequired,
        })
      ),
      smallSlider: PropTypes.bool,
      videos: PropTypes.arrayOf(
        PropTypes.shape({
          addToSlide: PropTypes.bool,
          file: PropTypes.object,
        })
      ),
    }),
  }),
}

export default WorkDetails
