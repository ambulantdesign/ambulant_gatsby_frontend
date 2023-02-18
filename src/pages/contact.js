import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useHasMounted } from "../hooks/useHasMounted"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaPhoneAlt } from "react-icons/fa"

import Layout from "../components/Layout"
import ContentHeader from "../components/ContentHeader"
import Seo from "../components/Seo"
import RichTextContent from "../components/RichTextContent"
import StreamingVideo from "../components/StreamingVideo"
import ContactForm from "../components/ContactForm"
import ContactOptions from "../components/ContactOptions"

const ContactPage = ({ data }) => {
  const {
    title,
    content: {
      data: { content },
    },
    MarginalColumn,
  } = data.page

  return (
    <Layout id="contact">
      <Wrapper className="portfolio" id="main">
        <ContentHeader title={title} subtitle={""} />
        <section className="container mx-auto mb-8 heroContainer" id="map">
          {useHasMounted && (
            <MapContainer
              center={[52.36159, 4.858676]}
              zoom={16}
              style={{ height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[52.36159, 4.858676]}>
                <Popup minWidth="340">
                  <StaticImage
                    src="../assets/images/vis-card2.png"
                    alt="Gabriele Franziska Götz – Business Card ambulant design"
                  />
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </section>
        <section
          className="grid gap-x-0 sm:gap-10 container mx-auto"
          id="content"
        >
          <div className="col-1">
            <h3>Send a message</h3>
            <ContactForm />
            <RichTextContent content={content} />
          </div>
          <div className="col-2">
            <ContactOptions headline="Contact Gabriele via" extraClass="mb-8" />
            {MarginalColumn.map((item, index) => {
              switch (item.__typename) {
                case "STRAPI__COMPONENT_LAYOUT_RICH_TEXT":
                  const {
                    marginalTxt: {
                      data: { marginalTxt },
                    },
                  } = item
                  return (
                    <RichTextContent
                      content={marginalTxt}
                      extraClass="contact"
                      key={index}
                    />
                  )
                case "STRAPI__COMPONENT_MEDIA_STREAMING_VIDEO":
                  if (item.videoId) {
                    return <StreamingVideo video={item} key={index} />
                  } else {
                    return null
                  }
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
  @media screen and (max-width: 600px) {
    .grid > .col-1,
    .grid > .col-2 {
      grid-column: span 12;
      padding-bottom: var(--space-4);
    }
  }
`

export const data = graphql`
  fragment streamingVideoCont1 on STRAPI__COMPONENT_MEDIA_STREAMING_VIDEO {
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

  fragment richTextCont1 on STRAPI__COMPONENT_LAYOUT_RICH_TEXT {
    id
    marginalTxt {
      data {
        marginalTxt
      }
    }
  }
  {
    page: strapiContact {
      id
      title
      content {
        data {
          content
        }
      }
      MarginalColumn {
        __typename
        ...richTextCont1
        ...streamingVideoCont1
      }
    }
  }
`

ContactPage.defaultProps = {}

ContactPage.propTypes = {
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

export default ContactPage
