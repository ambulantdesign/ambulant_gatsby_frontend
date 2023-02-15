import React from "react"
import styled from "styled-components"

const Video = ({
  videoId = "",
  videoServerUrl,
  videoTitle = "",
  urlParams = "",
  ...props
}) => (
  <Wrapper className="embedVideo-container">
    <iframe
      className="video"
      src={`${videoServerUrl}${videoId}${urlParams}`}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </Wrapper>
)

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;

  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

export default Video
