import * as React from "react"
import { useState, useRef } from "react"
import styled from "styled-components"
import useLocalStorageState from "use-local-storage-state"

import RichTextContent from "./RichTextContent"
import Video from "./Video"
import { useHasMounted } from "../hooks/useHasMounted"

const StreamingVideo = ({ video }) => {
  const inputRef = useRef()
  const {
    consent_message: {
      data: { consent_message },
    },
  } = video

  const cookieName = `accept${video.streamingPlatform}Cookies`

  const [streamingConsent, setStreamingConsent] = useState(false)
  const [acceptCookies, setAcceptCookies] = useLocalStorageState(cookieName, {
    ssr: true,
    defaultValue: false,
  })

  const handleSubmit = e => {
    e.preventDefault()
    setAcceptCookies(cookieName, streamingConsent)
  }

  const handleCheckboxChange = checkboxVal => {
    setStreamingConsent(checkboxVal)
  }

  return (
    <Wrapper id="videoContainer">
      {useHasMounted &&
        (!acceptCookies ? (
          <div className="yt-consent py-2 px-4 border-transparent rounded">
            <RichTextContent
              content={consent_message}
              extraClass="consent-message"
            />
            <form onSubmit={handleSubmit}>
              <label htmlFor="yt-consent" className="inline-flex items-top">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6"
                  name="yt-consent"
                  id="yt-consent"
                  ref={inputRef}
                  value={streamingConsent}
                  onChange={e => handleCheckboxChange(e.target.checked)}
                />
                <span className="ml-2">
                  Yes, I am fine with cookies from {video.streamingPlatform}.
                </span>
              </label>
              <button
                type="submit"
                disabled={!streamingConsent}
                className="submit text-center btn-solid py-2 px-4 mt-2 mb-4 border rounded block disabled:opacity-50"
              >
                {streamingConsent ? "Watch video now" : "Video blocked"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <h3>{video.videoCaption}</h3>
            <Video
              videoId={video.videoId}
              videoServerUrl={video.url}
              urlParams={video.urlParams !== null ? video.urlParams : ""}
              videoTitle={video.videoCaption}
            />
          </>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .yt-consent {
    background-color: var(--clr-sand);
  }
  .consent-message h4 {
    margin-bottom: var(--space-3);
  }
  .submit {
    &:disabled {
      box-shadow: none;
      &:hover,
      &:focus {
        cursor: not-allowed;
        background-color: var(--clr-grey-9);
        color: var(--clr-white);
        border: 1px solid transparent;
      }
    }
  }
`

export default StreamingVideo
