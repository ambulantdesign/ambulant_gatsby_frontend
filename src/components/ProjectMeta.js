import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export const ProjectMeta = ({ meta, weblink }) => {
  let metaData = Object.keys(meta).map(key => [
    String(key).split("_").join(" "),
    meta[key],
  ])

  return (
    <Wrapper className="meta-info mb-12">
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
