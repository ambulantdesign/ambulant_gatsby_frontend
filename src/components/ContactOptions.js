import * as React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"

import { useSiteMetadata } from "../hooks/use-site-metadata"

const ContactOptions = ({ headline, extraClass }) => {
  const { title, phone, email } = useSiteMetadata()
  return (
    <Wrapper className={`contact-options ${extraClass}`}>
      <div className="btn-container">
        <h4 className="mb-4">{headline}</h4>
        <p>
          <a
            className="w-full text-center bg-transparent py-2 px-4 mr-4 border rounded inline-block nav-btn"
            title={`Call ${title}`}
            href={`tel:${phone}`}
            aria-label={`Call ${title}`}
          >
            <span className="flex items-center justify-center">
              <FaPhoneAlt />
              <span className="pl-4">Phone Call</span>
            </span>
          </a>
        </p>
        <p>
          <a
            className="w-full text-center bg-transparent py-2 px-4 mr-4 border rounded inline-block nav-btn"
            title={`Send mail to ${title}`}
            href={`mailto:${email}`}
            aria-label={`Send mail to ${title}`}
          >
            <span className="flex items-center justify-center">
              <FaEnvelope />
              <span className="pl-4">E-Mail</span>
            </span>
          </a>
        </p>
      </div>
    </Wrapper>
  )
}

export const Wrapper = styled.section`
  .nav-btn span {
    white-space: nowrap;
  }
`

ContactOptions.propTypes = {
  headline: PropTypes.string,
  extraClass: PropTypes.string,
}

ContactOptions.defaultProps = {
  headline: `Get in touch`,
  extraClass: ``,
}

export default ContactOptions
