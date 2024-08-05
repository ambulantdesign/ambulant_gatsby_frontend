/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"

function Seo({ description, image: og_thumbnail, title, pathname, children }) {
  const { site, twitterCardImg } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title: studioName
            description
            author
            authorShort
            siteUrl
            seo {
              google
              bing
            }
          }
        }
        twitterCardImg: file(name: { eq: "twitter-card_ambulant-design" }) {
          id
          childImageSharp {
            fixed(width: 480) {
              ...GatsbyImageSharpFixed
            }
            gatsbyImageData(
              placeholder: NONE
              layout: FULL_WIDTH
              formats: NO_CHANGE
            )
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = `${site.siteMetadata?.title} – ${site.siteMetadata?.authorShort}`

  let og_thumbnailW, og_thumbnailH
  let seoThumbnail =
    og_thumbnail && og_thumbnail.localFile
      ? `${process.env.GATSBY_SITE_URL}${getSrc(og_thumbnail.localFile)}`
      : null

  if (seoThumbnail === null) {
    seoThumbnail = `${process.env.GATSBY_SITE_URL}${getSrc(twitterCardImg)}`
    og_thumbnailW = "480"
    og_thumbnailH = "270"
  } else {
    og_thumbnailW =
      og_thumbnail?.localFile?.childImageSharp?.fixed?.width ||
      og_thumbnail?.localFile?.childImageSharp?.gatsbyImageData?.width
    og_thumbnailH =
      og_thumbnail?.localFile?.childImageSharp?.fixed?.height ||
      og_thumbnail?.localFile?.childImageSharp?.gatsbyImageData?.height
  }

  const canonical = pathname
    ? `${process.env.GATSBY_SITE_URL}${pathname}`
    : null

  return (
    <>
      <meta
        name="google-site-verification"
        content={site.siteMetadata?.seo?.google || ``}
      />
      <meta name="msvalidate.01" content={site.siteMetadata?.seo?.bing || ``} />
      <link rel="icon" href="/favicon.ico" sizes="any"></link>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      <link rel="manifest" href="/manifest.json"></link>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      ></link>
      <link rel="manifest" href="/site.webmanifest"></link>
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5"
      ></link>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={metaDescription} />
      <meta
        property="og:title"
        content={defaultTitle ? `${title} | ${defaultTitle}` : title}
      />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />

      {seoThumbnail ? (
        <>
          <meta property="og:image" content={seoThumbnail} />
          <meta property="og:image:width" content={og_thumbnailW} />
          <meta property="og:image:height" content={og_thumbnailH} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image:src" content={seoThumbnail} />
        </>
      ) : (
        <meta name="twitter:card" content="summary" />
      )}

      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:url" content={canonical} />
      <meta
        name="twitter:title"
        content={defaultTitle ? `${title} | ${defaultTitle}` : title}
      />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

Seo.defaultProps = {
  description: ``,
  title: ``,
  pathname: `/`,
  image: null,
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.shape({
    localFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.oneOfType([
          PropTypes.shape({}),
          PropTypes.arrayOf(PropTypes.shape({})),
        ]),
        gatsbyImageData: PropTypes.oneOfType([
          PropTypes.shape({}),
          PropTypes.arrayOf(PropTypes.shape({})),
        ]),
      }),
    }),
  }),
  children: PropTypes.node,
}

export default Seo
