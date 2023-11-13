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
  let meta = {
    medium: medium,
    city: city,
    year: yearEnd ? `${yearStart}–${yearEnd}` : yearStart,
  }
  return (
    <Wrapper className="gridItem-content mb-12">
      <h4 className="pr-4 text-xl mb-6">{title}</h4>
      <section className="grid gap-10 container" id="content">
        {Gallery && (
          <div className="col-6">
            <ArchiveSlider
              gallery={Gallery}
              description={description}
            ></ArchiveSlider>
          </div>
        )}
        <div className="col-6">
          <ProjectMeta meta={meta} weblink={[]} />
        </div>

        {description && (
          <div className="col-10">
            <h5>design notes</h5>
            <RichTextContent content={description} extraClass="description" />
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
