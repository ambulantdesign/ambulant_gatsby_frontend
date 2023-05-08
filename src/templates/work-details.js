import * as React from "react"
import { graphql } from "gatsby"
import { Link, Script, withPrefix } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../components/Layout"
import ContentHeader from "../components/ContentHeader"
import VideoEmbed from "../components/VideoEmbed"
import StreamingVideo from "../components/StreamingVideo"
import Seo from "../components/Seo"
import { ProjectMeta } from "../components/ProjectMeta"

// Core modules imports are same as usual
import { Navigation, Pagination, Lazy, Keyboard } from "swiper"
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/lazy"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/keyboard"
import RichTextContent from "../components/RichTextContent"

const WorkDetails = ({ data }) => {
  const {
    content: {
      data: { content },
    },
    artist,
    keywords,
    title,
    meta,
    weblink,
    gallery,
    videos,
    streamingVideo,
  } = data.work

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

  // Check if window is defined (so if in the browser or in node.js).
  var isBrowser = typeof window !== "undefined"

  const transitionStartHandler = () => {
    if (isBrowser) {
      const videos = document.querySelectorAll("video")
      Array.prototype.forEach.call(videos, function (video) {
        video.pause()
      })
    }
  }
  const transitionEndHandler = swiper => {
    if (isBrowser) {
      window.autoPlayVideo(swiper.activeIndex)
    }
  }

  return (
    <>
      <Layout>
        <Wrapper className="portfolio" id="main">
          <section className="hero mb-12" id="slider">
            {/* <!-- Swiper --> */}
            <Swiper
              modules={[Lazy, Navigation, Pagination, Keyboard]}
              spaceBetween={50}
              slidesPerView={1}
              lazy={true}
              navigation
              keyboard
              pagination={{ clickable: true }}
              onTransitionStart={() => transitionStartHandler()}
              onTransitionEnd={swiper => transitionEndHandler(swiper)}
            >
              {allGalleries.map((slide, index) => {
                const {
                  id,
                  caption = null,
                  localFile = null,
                  isSliderVideo = null,
                  sliderVideos = null,
                } = slide
                let media = null
                if (!isSliderVideo) {
                  media = getImage(localFile)
                } else {
                  media = sliderVideos
                }

                if (!isSliderVideo) {
                  return (
                    <SwiperSlide key={id} virtualIndex={index}>
                      <GatsbyImage
                        image={media}
                        alt={caption}
                        className="swiper-lazy mb-0"
                      />
                    </SwiperSlide>
                  )
                } else {
                  return (
                    <SwiperSlide key={id} virtualIndex={index}>
                      <VideoEmbed videos={media} />
                    </SwiperSlide>
                  )
                }
              })}
            </Swiper>
          </section>
          <ContentHeader title={title} subtitle={artist.fullname} />
          <section className="grid gap-x-0 sm:gap-10 container " id="content">
            <div className="col-6">
              <ProjectMeta meta={meta} weblink={weblink} />
              {streamingVideo && <StreamingVideo video={streamingVideo} />}
            </div>
            <div className="col-6">
              <RichTextContent content={content} extraClass="description" />
            </div>
            <footer className="my-10">
              <h5>related works</h5>
              <div className="btn-container">
                <Link
                  className="text-center bg-transparent py-2 px-4 mr-4 border rounded inline-block nav-btn"
                  to={`/artists/${artist.slug}`}
                >
                  <span className="">{artist.fullname}</span>
                </Link>
                {keywords.map(keyword => (
                  <Link
                    className="text-center bg-transparent py-2 px-4 mr-4 mb-4 border rounded inline-block nav-btn"
                    to={`/keywords/${keyword.slug}`}
                    key={keyword.id}
                  >
                    <span className="">{keyword.name}</span>
                  </Link>
                ))}
              </div>
            </footer>
          </section>
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
  @media screen and (max-width: 600px) {
    .grid > .col-6 {
      grid-column: span 12;
    }
  }
`
export const query = graphql`
  query WorkDetails($slug: String!) {
    work: strapiWork(slug: { eq: $slug }) {
      id: strapi_id
      slug
      title
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
      }
      weblink: Weblink {
        button
        url
        label
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
    }
  }
`

export const Head = ({ data }) => {
  const { title } = data.work
  return (
    <Seo
      title={title}
      // description={excerpt}
      // image={card_image}
      // lang="de"
      // pathname={props.location.pathname}
    />
  )
}

export default WorkDetails
