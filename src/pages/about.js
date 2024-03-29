import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/Layout"
import ContentHeader from "../components/ContentHeader"
import Seo from "../components/Seo"
import RichTextContent from "../components/RichTextContent"
import StreamingVideo from "../components/StreamingVideo"

const AboutPage = ({ data }) => {
  const {
    title,
    content: {
      data: { content },
    },
    MarginalColumn,
  } = data.page

  return (
    <Layout id="about">
      <Wrapper className="portfolio" id="main">
        <ContentHeader title={title} subtitle={""} />
        {/* <section className="container mb-8 heroContainer" id="hero">
          full-width placeholder
        </section> */}
        <section className="grid gap-x-0 sm:gap-10 container " id="content">
          <div className="col-1">
            <RichTextContent content={content} />
          </div>
          <div className="col-2">
            {MarginalColumn.map((item, index) => {
              switch (item.__typename) {
                case "STRAPI__COMPONENT_LAYOUT_RICH_TEXT":
                  const {
                    marginalTxt: {
                      data: { marginalTxt },
                    },
                  } = item
                  return <RichTextContent content={marginalTxt} key={index} />
                case "STRAPI__COMPONENT_MEDIA_SINGLE_IMAGE":
                  const {
                    id,
                    image: { caption = null, localFile = null },
                  } = item

                  return (
                    <GatsbyImage
                      key={id}
                      image={getImage(localFile)}
                      alt={caption}
                      className="mb-4"
                    />
                  )
                case "STRAPI__COMPONENT_MEDIA_STREAMING_VIDEO":
                  return <StreamingVideo video={item} key={index} />
                default:
                  return <></>
              }
            })}
          </div>
          <footer className="my-10"></footer>
        </section>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.main`
  .grid > .col-1 {
    grid-column: span 8;
  }
  .grid > .col-2 {
    grid-column: span 4;
  }
  .grid#content footer {
    grid-column: span 12;
  }
  @media screen and (max-width: 640px) {
    .grid > .col-1,
    .grid > .col-2 {
      grid-column: span 12;
      padding-bottom: var(--space-4);
    }
  }
`

export const data = graphql`
  fragment streamingVideoCont on STRAPI__COMPONENT_MEDIA_STREAMING_VIDEO {
    id
    streamingPlatform
    url
    urlParams
    videoId
    controls
    loop
    related
    autoplay
    videoCaption
    show_fullscreen
    consent_message {
      data {
        consent_message
      }
    }
  }

  fragment richTextCont on STRAPI__COMPONENT_LAYOUT_RICH_TEXT {
    id
    marginalTxt {
      data {
        marginalTxt
      }
    }
  }
  fragment singleImageCont on STRAPI__COMPONENT_MEDIA_SINGLE_IMAGE {
    id
    image {
      localFile {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      caption
    }
  }
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
  {
    page: strapiAbout {
      id
      title
      content {
        data {
          content
        }
      }
      seo {
        ...seoFields
      }
      MarginalColumn {
        __typename
        ...richTextCont
        ...streamingVideoCont
        ...singleImageCont
      }
    }
  }
`

AboutPage.defaultProps = {}

AboutPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.shape({
        data: PropTypes.shape({
          content: PropTypes.string,
        }),
      }),
      MarginalColumn: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
}

export const Head = ({ location, data }) => {
  const { page } = data
  return (
    <Seo
      title={page?.seo?.seo_title || `About`}
      description={page?.seo?.seo_description || null}
      image={page?.seo?.seo_image || null}
      /**** lang="de" !!! bitte checken *****/
      pathname={location.pathname}
    />
  )
}

export default AboutPage
