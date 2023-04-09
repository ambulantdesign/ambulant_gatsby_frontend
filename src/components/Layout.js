/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import qs from "qs"
import * as React from "react"
import { useRef, useMemo } from "react"
import { useLocation } from "@reach/router"
import { Script, withPrefix, navigate } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import useLocalStorageState from "use-local-storage-state"
import PropTypes from "prop-types"
import styled from "styled-components"

import { useSiteMetadata } from "../hooks/use-site-metadata"
import Header from "./Header"
import MainNav from "./MainNav"
import "../assets/css/layout.css"

const initialState = {
  keywordNav: false,
  artistNav: false,
  offCanvas: false,
}
const DEBOUNCE_TIME = 400

/************** */
const initialSearchState = {
  query: "",
  page: 1,
}

const createURL = state => `?${qs.stringify(state)}`

const searchStateToUrl = (location, searchState) => {
  let fullPath
  location.pathname === "/search"
    ? (fullPath = `${location.pathname}${createURL(searchState)}`)
    : (fullPath = `/search${createURL(searchState)}`)
  return searchState ? `${fullPath}` : ""
}

/************** */

const Layout = ({ id = "", children }) => {
  const { title, author, city } = useSiteMetadata()
  const [searchState, setSearchState] = useLocalStorageState("searchState", {
    ssr: true,
    defaultValue: initialSearchState,
  })
  const [sideNav, setSideNav] = useLocalStorageState("sideNav", {
    ssr: true,
    defaultValue: initialState,
  })
  const location = useLocation()

  // Connect and authenticate with your Algolia app
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  const debouncedSetStateRef = useRef(null)

  function onSearchStateChange(updatedSearchState) {
    // Aufruf: Search box 'onchange' (after debounce time)
    clearTimeout(debouncedSetStateRef.current)
    debouncedSetStateRef.current = setTimeout(() => {
      console.log("onSearchStateChange > debounced")
      // console.log(searchState)
      // console.log(updatedSearchState)
      setSearchState({ ...updatedSearchState })

      // **** update URL params > aber nur auf '/search' page!!!!
      if (location.pathname === "/search") {
        // console.log("update again??????????")
        navigate(searchStateToUrl("/search", { ...updatedSearchState }), {
          replace: true,
        })
      }
    }, DEBOUNCE_TIME)
  }

  const showMetaNavLinks = navName => {
    setSideNav({
      ...sideNav,
      keywordNav: false,
      artistNav: false,
      [navName]: !sideNav[navName],
    })
  }
  const openMobileNav = () => {
    setSideNav({ ...sideNav, offCanvas: true })
  }
  const closeMobileNav = () => {
    setSideNav({ ...sideNav, offCanvas: false })
  }

  return (
    <>
      <Wrapper className="site-container" id={id}>
        <InstantSearch
          searchClient={searchClient}
          indexName={`dev_ambulant-portfolio`}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
          searchState={searchState}
        >
          <Header
            siteTitle={title || `ambulant design`}
            author={author || `Gabriele Franziska Götz`}
            city={city || `Amsterdam`}
            openMobileNav={openMobileNav}
          />
          {children}
          <MainNav
            sideNav={sideNav}
            toggleNav={showMetaNavLinks}
            closeMobileNav={closeMobileNav}
          />
        </InstantSearch>
      </Wrapper>

      <Script src={withPrefix("/js/functions.js")} type="text/javascript" />
      <Script
        src="https://unpkg.com/external-svg-loader@latest/svg-loader.min.js"
        type="text/javascript"
        async
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
}

const Wrapper = styled.div`
  .menu-icon {
    display: none;
  }
  .menu-icon a svg {
    transition: all 0.4s ease;
  }
  .menu-icon a:hover svg,
  .menu-icon a:focus svg {
    fill: var(--clr-grey-3);
    color: var(--clr-grey-3);
  }
  @media screen and (max-width: 900px) {
    .menu-icon {
      display: block;
    }
    main {
      margin-right: 0;
      width: 100%;
    }

    .slide-out {
      -webkit-transform: translate3d(var(--nav-lg-width), 0, 0);
      -moz-transform: translate3d(var(--nav-lg-width), 0, 0);
      -ms-transform: translate3d(var(--nav-lg-width), 0, 0);
      -o-transform: translate3d(var(--nav-lg-width), 0, 0);
      transform: translate3d(var(--nav-lg-width), 0, 0);
    }
    .slide-in {
      -webkit-transform: translate3d(-var(--nav-lg-width), 0, 0);
      -moz-transform: translate3d(-var(--nav-lg-width), 0, 0);
      -ms-transform: translate3d(-var(--nav-lg-width), 0, 0);
      -o-transform: translate3d(-var(--nav-lg-width), 0, 0);
      transform: translate3d(-var(--nav-lg-width), 0, 0);
    }
  }
  @media screen and (max-width: 600px) {
    .grid > .col-6 {
      grid-column: span 12;
    }
  }
`

export default Layout
