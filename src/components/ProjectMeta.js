import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

export const ProjectMeta = ({ meta, weblink }) => {
  // console.log(meta)
  let metaData = Object.keys(meta).map(key => [
    String(key).split("_").join(" "),
    meta[key],
  ])
  // console.log(metaData)

  return (
    <Wrapper className="meta-info mb-0 sm:mb-4 ">
      {metaData.map(
        (item, key) =>
          item[1] && (
            <div key={key}>
              <h5>{item[0]}</h5>
              <p>{item[1]}</p>
            </div>
          )
      )}
      <p className={weblink.length === 0 ? "hidden" : "btn-container"}>
        {weblink.length > 0 &&
          weblink.map((link, key) => {
            return (
              <Link
                key={key}
                to={link.url}
                className="btn-solid py-2 px-4 mr-4 border rounded inline-block"
              >
                {link.label}
              </Link>
            )
          })}
      </p>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  h5 {
    color: var(--clr-grey-3);
  }
`
ProjectMeta.propTypes = {
  meta: PropTypes.shape({
    ISBN: PropTypes.string,
    city: PropTypes.string,
    commissioner: PropTypes.string,
    format: PropTypes.string,
    info: PropTypes.string,
    medium: PropTypes.string,
    technical_details: PropTypes.string,
    year: PropTypes.string.isRequired,
  }),
  weblink: PropTypes.arrayOf(
    PropTypes.shape({
      button: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
}

ProjectMeta.defaultProps = {
  meta: {
    ISBN: null,
    city: ``,
    commissioner: ``,
    format: ``,
    info: ``,
    medium: ``,
    technical_details: ``,
    year: ``,
  },
  weblink: [
    {
      button: true,
      label: ``,
      url: ``,
    },
  ],
}
