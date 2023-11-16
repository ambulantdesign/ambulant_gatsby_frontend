import * as React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import RichTextContent from "./RichTextContent"
import ArchiveSlider from "./ArchiveSlider"
import { ProjectMeta } from "./ProjectMeta"

const ArchiveProject = ({
  title,
  description: {
    data: { description = null },
  },
  medium = null,
  city = null,
  yearStart,
  yearEnd = null,
  Gallery = null,
}) => {
  const regex =
    /<([^>\s]+)[^>]*>(?:\s*(?:<br(?:\s*\/){0,1}>|&nbsp;|&thinsp;|&ensp;|&emsp;|&#8201;|&#8194;|&#8195;)\s*)*<\/\1>/gm
  let meta = {
    medium: medium,
    city: city,
    year: yearEnd ? `${yearStart}–${yearEnd}` : yearStart,
  }
  let desc = description.trim()
  desc = desc.replace(regex, desc)
  desc = desc.length > 10 ? desc : null
  console.log(`${title} // ${desc}`)

  return (
    <Wrapper className="gridItem-content mb-12">
      <h4 className="pr-4 text-xl mb-6">{title}</h4>
      <section className="grid gap-10 container" id="content">
        {Gallery && (
          <div className="col-6">
            <ArchiveSlider gallery={Gallery}></ArchiveSlider>
          </div>
        )}
        <div className="col-6">
          <ProjectMeta meta={meta} weblink={[]} />
        </div>

        {desc && (
          <div className="col-10">
            <h5>design notes</h5>
            <RichTextContent content={desc} extraClass="description" />
          </div>
        )}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h5 {
    color: var(--clr-grey-3);
  }
  a {
    display: inline-block;
  }
  .grid > .col-10 {
    grid-column: span 10;
  }
  @media screen and (max-width: 600px) {
    .grid {
      gap: 0;
    }
    .grid > .col-10 {
      grid-column: span 12;
    }
  }
`

export default ArchiveProject
