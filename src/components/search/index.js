import React, { useState } from "react"
import { Link } from "gatsby"

import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from "react-instantsearch-dom"

export default function CustomSearch() {
  const HitCount = connectStateResults(({ searchResults }) => {
    const hitCount = searchResults && searchResults.nbHits

    return hitCount > 0 ? (
      <div className="hit-count">
        {hitCount} result{hitCount !== 1 ? `s` : ``}
      </div>
    ) : null
  })

  const PageHit = ({ hit }) => {
    const { path, title, content, keywords, meta } = hit

    let metaArray = []
    const [metaInfo, setMetaInfo] = useState(null || meta)
    const [keywordList, setKeywordList] = useState([] || keywords)

    if (metaInfo) {
      metaArray = Object.entries(meta)
    }

    return (
      <Link to={path}>
        <article>
          <h2>{title}</h2>
          {/* <p>{content}...</p> */}
          {keywordList && (
            <ul className="keywords">
              {keywordList.map(keyword => (
                <li>{keyword.name}</li>
              ))}
            </ul>
          )}
          {metaArray && (
            <ul className="meta">
              {metaArray.forEach(([key, value]) => {
                return (
                  <li>
                    {key}: {value}
                  </li>
                )
              })}
            </ul>
          )}
        </article>
      </Link>
    )
  }

  const HitsInIndex = ({ index }) => (
    <Index indexName={index.name}>
      <HitCount />
      <Hits className="Hits" hitComponent={PageHit} />
    </Index>
  )

  const SearchResult = ({ indices, className }) => (
    <div className={className}>
      {indices.map(index => (
        <HitsInIndex index={index} key={index.name} />
      ))}
    </div>
  )

  return (
    <>
      <HitCount />
      <hr />
      <Hits hitComponent={PageHit} />
    </>
  )
}
