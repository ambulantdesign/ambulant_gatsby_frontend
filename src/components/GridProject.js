import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

import { getRandomGalleryImage } from "../utils/gallery-helper"

const GridProject = ({ id, title, slug, artist, gallery, institution }) => {
  const randomImg = getRandomGalleryImage(gallery)

  // Check if window is defined (so if in the browser or in node.js).
  var isBrowser = typeof window !== "undefined"

  const gridItemHandler = item => {
    if (isBrowser) {
      window.resizeGridItem(document.getElementById(item))
    }
  }

  return (
    <Wrapper className="gridItem-content">
      <Link to={`/works/${slug}`}>
        <GatsbyImage
          image={randomImg}
          alt={title}
          className="mb-4"
          onLoad={() => gridItemHandler(`gridItem-${id}`)}
        />
        <h4 className="pr-4 text-xl">{title}</h4>
        {artist?.fullname && <h5 className="pr-4">{artist.fullname}</h5>}
        {institution && (
          <span
            className="institution"
            style={{ color: `${institution.colorCode}` }}
          >
            {institution.name}
          </span>
        )}
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.figure`
  a {
    display: inline-block;
  }
  a img {
    border-top: 3px solid transparent;
    background-color: transparent;
    transition: border-color 0.4s ease;
  }
  a:active img,
  a:hover img {
    border-color: var(--clr-links);
  }
  a.stoned {
    transition: background-color 0.4s ease;
  }
  a.stoned:hover {
    background-color: var(--clr-stone);
  }
  a img {
    max-height: 300px;
  }
  a .institution {
    display: inline-block;
    /* border-radius: 50%;
    width: 10px;
    height: 10px; */
  }
`

GridProject.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  artist: PropTypes.object,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      localFile: PropTypes.object.isRequired,
      id: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ),
}

GridProject.defaultProps = {
  id: ``,
  title: `de`,
  slug: ``,
  artist: {},
  gallery: [
    {
      localFile: {},
      id: "0",
      caption: ``,
    },
  ],
}
export default GridProject
