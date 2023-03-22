import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const GridProject = ({ id, title, slug, artist, gallery }) => {
  const index = Math.floor(Math.random() * gallery.length)
  const randomImg = getImage(gallery[index].localFile)

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
        <h5 className="pr-4">{artist.fullname}</h5>
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
`
export default GridProject
