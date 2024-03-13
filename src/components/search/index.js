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

    return hitCount >= 0 ? (
      <div className="hit-count">
        {hitCount} result{hitCount !== 1 ? `s` : ``}
      </div>
    ) : null
  })

  const Results = connectStateResults(
    ({ searchState, searchResults, children }) =>
      searchResults && searchResults.nbHits !== 0 ? (
        children
      ) : (
        <>
          <div className="hit-count">0 results</div>
          <hr />
          <div className="ais-Hits">
            <p>😔 Sorry, nothing found for “{searchState.query}”.</p>
          </div>
        </>
      )
  )

  const PageHit = ({ hit }) => {
    const { path, title, artist } = hit

    return (
      <Link to={path}>
        <article>
          <h2>{title}</h2>
          {artist?.fullname && <h5 className="pr-4">{artist.fullname}</h5>}
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
    <Results>
      <HitCount />
      <hr />
      <Hits hitComponent={PageHit} />
    </Results>
  )
}
