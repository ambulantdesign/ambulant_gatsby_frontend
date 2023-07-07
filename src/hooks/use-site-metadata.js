import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            author
            authorShort
            city
            phone
            email
          }
        }
      }
    `
  )
  return site.siteMetadata
}
