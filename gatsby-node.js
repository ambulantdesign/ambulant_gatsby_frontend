const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions
  const resultWorks = await graphql(`
    query Projects {
      works: allStrapiWork {
        nodes {
          slug
        }
      }
    }
  `)
  const resultArtists = await graphql(`
    query Artitsts {
      artists: allStrapiArtist {
        nodes {
          slug
          fullname
        }
      }
    }
  `)
  const resultKeywords = await graphql(`
    query Keywords {
      keywords: allStrapiKeyword {
        nodes {
          slug
          name
        }
      }
    }
  `)

  resultWorks.data.works.nodes.forEach(work => {
    createPage({
      path: `/works/${work.slug}`,
      component: path.resolve(`src/templates/work-details.js`),
      context: {
        slug: work.slug,
      },
      defer: false, // defer page generation to the first user request? (DSG)
    })
  })
  resultArtists.data.artists.nodes.forEach(artist => {
    createPage({
      path: `/artists/${artist.slug}`,
      component: path.resolve(`src/templates/alm-list.js`),
      context: {
        slug: artist.slug,
        title: artist.fullname,
        contentType: "artists",
      },
      defer: false, // Defer page generation to the first user request? (DSG)
    })
  })
  resultKeywords.data.keywords.nodes.forEach(keyword => {
    createPage({
      path: `/keywords/${keyword.slug}`,
      component: path.resolve(`src/templates/alm-list.js`),
      context: {
        slug: keyword.slug,
        title: keyword.name,
        contentType: "keywords",
      },
      defer: false, // Defer page generation to the first user request? (DSG)
    })
  })
  createRedirect({
    fromPath: `/gabriele-goetz`,
    toPath: `/about`,
  })
  createRedirect({
    fromPath: `/tag/artist`,
    toPath: `/artists/holger-bunk`,
  })
  createRedirect({
    fromPath: `/tag/publisher`,
    toPath: `/`,
  })
  createRedirect({
    fromPath: `/tag/*`,
    toPath: `/keywords/*`,
  })
  createRedirect({
    fromPath: /^\/d{1,4}$/, // would match any username for the ID `12345`
    toPath: `/`,
    redirectInBrowser: true,
  })
}
