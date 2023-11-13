import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Core modules imports are same as usual
import { Navigation, Pagination, Lazy, Keyboard, Virtual } from "swiper"
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/virtual"
import "swiper/css/lazy"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/keyboard"

const ArchiveSlider = ({ gallery }) => (
  <Wrapper className="archive mb-2 md:mb-4" id="slider">
    <Swiper
      modules={[Lazy, Navigation, Pagination, Keyboard, Virtual]}
      spaceBetween={24}
      slidesPerView={1}
      lazy={true}
      rewind={true}
      autoHeight
      virtual
      navigation
      keyboard
      pagination={{ clickable: true }}
    >
      {gallery.map((slide, index) => {
        console.log(slide)
        const { id, caption = null, localFile = null } = slide
        let media = getImage(localFile)

        return (
          <SwiperSlide key={id} virtualIndex={index}>
            <GatsbyImage
              image={media}
              alt={caption}
              className="swiper-lazy mb-0"
            />
            <div className="slide-captions">{caption}</div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  </Wrapper>
)

const Wrapper = styled.figure`
  .swiper {
    grid-column: 1 / span 12;
  }
  .swiper-slide {
    flex-direction: column;
    /* overflow-y: visible; */
    background-color: transparent;
  }
  .slide-captions {
    font-size: var(--font-sm);
    line-height: var(--line-height-dense);
    width: 100%;
    margin-top: 10px;
    text-align: left;
    height: 40px;
    overflow-y: hidden;
    background-color: transparent;
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    top: 72%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    transform: translateY(-20px);
  }
  @media screen and (max-width: 600px) {
    .swiper {
      grid-column: 1 / span 12 !important;
    }
  }
`

export default ArchiveSlider
