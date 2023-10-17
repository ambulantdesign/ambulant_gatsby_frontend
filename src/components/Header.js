import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import CustomSearchBox from "../components/search/search-box"
import styled from "styled-components"

const Header = props => {
  const { siteTitle, author, city, openMobileNav } = props
  return (
    <Wrapper className="grid h-24">
      <div className="logo">
        <h1>
          <span className="ambulant">
            <Link to="/">
              <svg height="28" width="28" className="circle">
                <circle cx="14" cy="14" r="14" fill="#f67c6d" />
              </svg>
            </Link>
            <Link to="/">{siteTitle}</Link>
          </span>
          <span className="authorName">
            <Link to="/about">{author}</Link>
            <span>
              {` `} — studio {siteTitle} {city}
            </span>
          </span>
        </h1>
      </div>
      <div className="form-field">
        <CustomSearchBox focusBgCol="bg-stone-100" />
      </div>
      <div className="menu-icon">
        {/* <!-- Please refer: https://github.com/shubhamjain/svg-loader --> */}
        <button type="button" onClick={openMobileNav}>
          <svg
            data-src="https://s2.svgbox.net/hero-solid.svg?ic=menu"
            width="32"
            height="32"
            fill="#F67C5F"
          ></svg>
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  padding: var(--space-20);
  margin-right: var(--nav-lg-width);
  align-items: center;
  .logo {
    grid-column: span 9;
  }
  .logo,
  .logo > h1,
  .logo > h1 span.ambulant {
    display: flex;
    flex-direction: row;
    align-items: center;
    row-gap: 0;
  }
  .logo > h1 span.ambulant {
    column-gap: 10px;
    margin-bottom: 0;
  }
  .logo > h1 {
    margin: 0;
    color: var(--clr-grey-3);
    font-weight: 400;
    font-size: 1.75rem;
    letter-spacing: -0.025em;
  }
  .logo > h1 a {
    color: var(--clr-links);
    font-weight: 700;
    white-space: nowrap;
    /* margin-right: var(--space-10); */
  }
  .logo > h1 a:hover {
    color: var(--clr-grey-4);
  }
  .logo > h1 a:hover svg > circle {
    fill: var(--clr-grey-4);
    background-color: var(--clr-grey-4);
    transition: all 0.4s ease;
  }
  .logo > h1 span.authorName {
    margin-left: var(--space-20);
  }
  .logo > h1 span.authorName a {
    color: var(--clr-grey-2);
    font-weight: 400;
    letter-spacing: 0;
  }
  .logo > h1 span.authorName a:hover {
    color: var(--clr-grey-4);
  }
  .logo > h1 span.authorName span {
    display: none;
  }
  .form-field {
    grid-column: span 3;
    justify-content: right;
  }
  .form-field .search,
  .search input {
    width: 100%;
  }
  .menu-icon {
    display: none;
  }
  .menu-icon a svg {
    transition: all 0.4s ease;
  }
  .menu-icon button:hover svg,
  .menu-icon button:focus svg {
    fill: var(--clr-grey-3);
    color: var(--clr-grey-3);
  }
  @media screen and (max-width: 1200px) {
    align-items: flex-start;
    .logo {
      grid-column: span 8;
    }
    .logo > h1 {
      flex-direction: column;
      align-items: flex-start;
    }
    .logo > h1 span.ambulant {
      column-gap: 10px;
    }
    .logo > h1 span.authorName {
      /* display: none; */
      font-size: 1.7rem;
      margin-left: 38px;
      padding-top: 0.125rem;
    }
    .form-field {
      grid-column: span 4;
    }
  }
  @media screen and (max-width: 900px) {
    margin-right: 0;
    .logo {
      grid-column: span 7;
    }
    .form-field {
      grid-column: span 4;
    }
    .menu-icon {
      grid-column: span 1;
    }
    .menu-icon {
      display: block;
    }
  }
  @media screen and (max-width: 600px) {
    gap: var(--space-10);
    .logo {
      grid-column: span 11;
      background-color: transparent;
    }
    .form-field {
      grid-column: span 0;
      display: none;
    }
    .menu-icon {
      background-color: transparent;
      justify-self: right;
      grid-column: span 1;
    }
  }
`

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  city: PropTypes.string,
  openMobileNav: PropTypes.func.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
  author: ``,
  city: `Amsterdam`,
  openMobileNav: () => {},
}

export default Header
