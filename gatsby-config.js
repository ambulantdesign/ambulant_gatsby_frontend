/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// Initialize dotenv
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const queries = require("./src/utils/algolia")

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: `work`,
      queryParams: {
        populate: {
          meta: "*",
          artist: "*",
          keywords: "*",
          Gallery: { populate: "*" },
          Weblink: "*",
          Videos: {
            populate: "*",
          },
          streamingVideo: "*",
          seo: { populate: "*" },
        },
      },
    },
    {
      singularName: `archive-item`,
      queryParams: {
        populate: {
          artist: "*",
          Gallery: { populate: "*" },
          sliderImgTxt: { populate: "*" },
        },
      },
    },
    `keyword`,
    `artist`,
  ],
  singleTypes: [
    {
      singularName: `about`,
      queryParams: {
        populate: {
          MarginalColumn: { populate: "*" },
          streamingVideo: { populate: "*" },
          marginalTxt: { populate: "*" },
          seo: { populate: "*" },
        },
      },
    },
    {
      singularName: `contact`,
      queryParams: {
        populate: {
          MarginalColumn: { populate: "*" },
          streamingVideo: { populate: "*" },
          marginalTxt: { populate: "*" },
          seo: { populate: "*" },
        },
      },
    },
    {
      singularName: `imprint`,
      queryParams: {
        populate: {
          seo: { populate: "*" },
        },
      },
    },
    {
      singularName: `archive`,
      queryParams: {
        populate: {
          seo: { populate: "*" },
        },
      },
    },
  ],
  queryLimit: 5000,
}

module.exports = {
  // site config
  siteMetadata: {
    title: `ambulant design`,
    studioName: `studio ambulant design`,
    city: `Amsterdam`,
    description: `One-woman-studio for visual communication and editorial design based in Amsterdam, The Netherlands | Book | Catalog | Museum | Gallery | Artists | Publisher | Visual Identity | CI`,
    archiveDescription: `Emblematic works from the early years (1985 – 2005) of studio ambulant design – Gabriele Franziska Götz | Book | Catalog | Museum | Gallery | Artists | Publisher | Visual Identity | CI`,
    author: `Gabriele Franziska Götz`,
    authorShort: `Gabriele Götz`,
    jobDesc: `graphic designer`,
    siteUrl: `${process.env.GATSBY_SITE_URL}`,
    phone: `+31206890280`,
    email: `info@ambulantdesign.nl`,
    seo: {
      google: `FiqFQFGBeFJGzpoQ4QmIC3eQPp2BfNxwKisK57StmpM`,
      bing: `767B33DB3497D2F5C7FAD3E74DC065CF`,
    },
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-web-font-loader`,
    //   options: {
    //     google: {
    //       families: [`Karla:300,400,700`],
    //     },
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
              sandbox: "allow-same-origin allow-scripts allow-presentation", // Optional: iframe sandbox options - Default: undefined
            },
          },
          `gatsby-remark-responsive-iframe`, //Optional: Must be loaded after gatsby-remark-embed-video
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia"),
        chunkSize: 10000, // default: 1000,
        enablePartialUpdates: true,
        skipIndexing: process.env.BRANCH !== "main", // skip indexing except the main branch
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-leaflet`,
  ],
}
