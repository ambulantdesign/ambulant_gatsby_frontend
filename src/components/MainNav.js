import * as React from "react"
import { useEffect, useCallback, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import useLocalStorageState from "use-local-storage-state"

const query = graphql`
  query {
    allStrapiArtist(sort: { fields: lastname, order: ASC }) {
      nodes {
        id
        lastname
        fullname
        slug
      }
    }
    allStrapiKeyword(sort: { order: ASC, fields: name }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`

const initialState = {
  keywordNav: false,
  artistNav: false,
  offCanvas: false,
}

const MainNav = ({ sideNav, toggleNav, closeMobileNav }) => {
  const [scrollY, setScrollY] = useLocalStorageState("navScrollY", {
    ssr: true,
    defaultValue: 0,
  })
  const scrollDiv = useRef(null)
  const data = useStaticQuery(query)

  const {
    allStrapiArtist: { nodes: allArtists },
    allStrapiKeyword: { nodes: allKeywords },
  } = data

  const { keywordNav, artistNav, offCanvas } = sideNav

  const handleOnScroll = useCallback(
    e => {
      setScrollY(e.target.scrollTop)
    },
    [setScrollY]
  )

  useEffect(() => {
    const div = scrollDiv.current
    // subscribe event
    div.addEventListener("scroll", handleOnScroll)
    return () => {
      // unsubscribe event
      div.removeEventListener("scroll", handleOnScroll)
    }
  }, [scrollDiv, handleOnScroll])

  useEffect(() => {
    // console.log("set scrollTop to " + scrollY)
    scrollDiv.current.scrollTop = scrollY
  }, [scrollY])

  return (
    <>
      {/* Assign CSS classes 'slide-out' oder 'slide-in' depepending on value of 'offCanvas' state variable > Maybe everything inside the 'Layout' component (higher level)  */}
      <Wrapper
        className={`bg-stone-100 h-screen gfgSideNav ${
          offCanvas ? "slide-in" : "slide-out"
        }`}
        id="gfgSideNav"
        ref={scrollDiv}
      >
        <div className="menu-icon">
          {/* <!-- Please refer: https://github.com/shubhamjain/svg-loader --> */}
          <button type="button" onClick={closeMobileNav}>
            <svg
              data-src="https://s2.svgbox.net/hero-outline.svg?ic=x"
              width="48"
              height="48"
              color="#F67C5F"
            ></svg>
          </button>
        </div>
        <nav className="w-full px-5">
          <form className="search">
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-sm text-gray-700 bg-gray-50 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search …"
                autoComplete="off"
              />
            </div>
          </form>
          <ul className="list-none taxonomy-nav">
            <li>
              <button
                className={`w-full block text-center bg-transparent mt-5 py-2 px-4 border rounded nav-btn nav-item ${
                  keywordNav ? "show-nav" : ""
                }`}
                type="button"
                onClick={() => toggleNav("keywordNav")}
              >
                <span className="uppercase text-xl">Keywords</span>
              </button>
              <ul className="list-none keywords">
                {allKeywords.map(keyword => {
                  const { id, name, slug } = keyword
                  return (
                    <li key={id}>
                      <Link
                        className="bg-transparent py-4"
                        to={`/keywords/${slug}`}
                        activeClassName="active"
                      >
                        {name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            <li>
              <button
                className={`w-full block text-center bg-transparent mt-5 py-2 px-4 border rounded nav-btn nav-item ${
                  artistNav ? "show-nav" : ""
                }`}
                type="button"
                onClick={() => toggleNav("artistNav")}
              >
                <span className="uppercase text-xl">Artists</span>
              </button>
              <ul className="list-none artists">
                {allArtists.map(artist => {
                  const { id, fullname, slug } = artist
                  return (
                    <li key={id}>
                      <Link
                        className="bg-transparent py-4"
                        to={`/artists/${slug}`}
                        activeClassName="active"
                      >
                        {fullname}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
          <ul className="list-none page-nav py-5">
            <li>
              <Link
                className="bg-transparent py-4"
                to="/about"
                activeClassName="active"
              >
                <span className="text-xl">About</span>
              </Link>
            </li>
            <li>
              <Link
                className="bg-transparent py-4"
                to="/contact"
                activeClassName="active"
              >
                <span className="text-xl">Contact</span>
              </Link>
            </li>
            <li>
              <Link
                className="bg-transparent py-4"
                to="/privacy"
                activeClassName="active"
              >
                <span className="text-xl">Privacy</span>
              </Link>
            </li>
          </ul>
        </nav>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  /* position: absolute; */
  width: var(--nav-lg-width);
  top: 0;
  right: 0;
  /* height: 100%; */
  overflow-y: auto;
  transition-duration: 0.44s;
  transition-property: transform;
  -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

  nav {
    margin-top: var(--space-5);
  }
  nav .search {
    display: none;
  }
  nav > ul {
    margin-left: 0;
  }
  nav .taxonomy-nav ul {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s ease-in-out;
  }
  nav .taxonomy-nav ul li {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }
  nav .taxonomy-nav .nav-btn.show-nav + ul {
    max-height: 100%;
    transition: max-height 0.5s ease-in-out;
  }
  nav .taxonomy-nav .nav-btn.show-nav + ul li {
    opacity: 100%;
  }
  nav .taxonomy-nav li > a.nav-btn.show-nav {
    color: var(--clr-links);
    border-color: var(--clr-links);
  }
  @media screen and (max-width: 900px) {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 0; 
    top: 0;
    right: 0;
    z-index: 99;
    transition: width 0.5s ease-in-out; */

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    -webkit-backface-visibility: hidden;
    width: var(--nav-lg-width);
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);

    .menu-icon {
      align-self: end;
    }
    nav .search {
      display: none;
      padding-bottom: var(--space-4);
    }
  }
  @media screen and (max-width: 600px) {
    aside nav .search {
      display: block;
      padding-bottom: var(--space-4);
    }
  }
`

export default MainNav
