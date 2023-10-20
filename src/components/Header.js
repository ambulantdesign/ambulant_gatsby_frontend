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
              <svg
                className="circle"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 339.41 323.27"
                width="28"
                height="28"
              >
                <path
                  d="m18.38,23.24c-2.52,1.86-3.57,2.71-5.83,5.37-6.3,7.38-4.29,23.17-7.19,33.86-3.07,14.22-4.06,27.95-4.44,42.52-3.17,21.27,2.22,43.21,10.45,62.94,2.04,4.77,5.48,9.25,5.24,14.94-1.32,21.43,11.35,39.97,20.6,58.31,2.98,5.73,6.94,11.1,7.98,17.69,5.17,19.08,26.1,28.61,43.18,34.9,31.18,8.08,59.21,27.42,91.86,29,36.81,3.86,68.39-15.19,101.93-25.3,41.46-11.64,48.27-41.78,57.23-78.43-.49-14.02-1.95-28.04-3.06-42.06-1.16-7.73-3.77-15.17-3.48-23.2,2.5-29.84-8.97-57.73-17.8-85.62C287.58,9.5,223.2-1.65,164.46.18c-49.06,1.99-100.17.11-145.32,22.58"
                  fill="#ce1b1c"
                  stroke-width="0"
                />
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
  .logo > h1 a:hover svg > path {
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
