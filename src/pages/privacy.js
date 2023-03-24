import * as React from "react"
import { graphql, Script, withPrefix } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import ContentHeader from "../components/ContentHeader"
import Seo from "../components/Seo"
import RichTextContent from "../components/RichTextContent"
import CookieSwitch from "../components/CookieSwitch"

const PrivacyPage = ({ data }) => {
  const {
    title,
    content: {
      data: { content },
    },
  } = data.page

  const { allProviders } = data.allStreamingVideo
  const providers = []

  const uniques = [...new Set(allProviders.map(obj => obj.streamingPlatform))]

  uniques.map(platform => {
    return providers.push({
      platform: platform,
      cookieName: `accept${platform}Cookies`,
    })
  })

  return (
    <>
      <Layout id="privacy">
        <Wrapper className="portfolio" id="main">
          <ContentHeader title={title} subtitle={""} />
          <section className="container mb-8 heroContainer" id="map">
            full-width placeholder
          </section>
          <section className="grid gap-x-0 sm:gap-10 container " id="content">
            <div className="col-1">
              <RichTextContent content={content} />
            </div>
            <div className="col-2">
              <div className="yt-consent py-2 px-4 border-transparent rounded">
                <h4 className="mb-4">Cookie consent for video streams</h4>
                <p>
                  Change your browser settings to permit or refuse the use of
                  cookies by the following video streaming platforms used on
                  this website:
                </p>
                {providers.map((provider, index) => (
                  <CookieSwitch key={index} provider={provider} />
                ))}
              </div>
              <RichTextContent content={`<p></p>`} />
            </div>
            <footer className="my-10"></footer>
          </section>
        </Wrapper>
      </Layout>
      <Script src={withPrefix("/js/flowbite.min.js")} type="text/javascript" />
    </>
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
  .yt-consent {
    background-color: var(--clr-sand);
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
  {
    page: strapiImprint {
      id
      title
      content {
        data {
          content
        }
      }
    }
    allStreamingVideo: allStrapiComponentMediaStreamingVideo {
      allProviders: nodes {
        id: strapi_id
        streamingPlatform
      }
    }
  }
`
export const Head = () => <Seo title="Privacy & Disclaimer" />

export default PrivacyPage
