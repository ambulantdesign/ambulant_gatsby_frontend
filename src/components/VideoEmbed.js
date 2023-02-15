import * as React from "react"
import { useRef, useEffect } from "react"

const VideoEmbed = ({ videoObj }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current.play()
  }, [videoRef])

  return (
    <video className="video-js" preload="auto" muted={true} ref={videoRef}>
      <source src={videoObj.src} type={videoObj.mime}></source>
      {/* <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
			<source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source> */}
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a
          href="https://videojs.com/html5-video-support/"
          rel="noreferrer"
          target="_blank"
        >
          supports HTML5 video
        </a>
      </p>
    </video>
  )
}
export default VideoEmbed
