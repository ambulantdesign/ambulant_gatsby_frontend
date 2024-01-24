/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
const React = require("react")

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    [
      <link
        key="karla-300"
        rel="preload"
        href="/fonts/karla-v31-latin_latin-ext-300.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link
        key="karla-300-italic"
        rel="preload"
        href="/fonts/karla-v31-latin_latin-ext-300italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link
        key="karla-400"
        rel="preload"
        href="/fonts/karla-v31-latin_latin-ext-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link
        key="karla-400-italic"
        rel="preload"
        href="/fonts/karla-v31-latin_latin-ext-italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link
        key="karla-700"
        rel="preload"
        href="/fonts/karla-v31-latin_latin-ext-700.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link
        key="karla-700-italic"
        rel="preload"
        href="/fonts/karla-v31-latin_latin-ext-700italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <script
        key="ccm19"
        src="https://cloud.ccm19.de/app.js?apiKey=a8c422dae95cd45f96ece931114cc35d10381cff86fdfa2f&domain=65aeacd8e24abc31fb0d48b2&lang=en_US"
        type="text/javascript"
        referrerpolicy="origin"
      />,
    ],
  ])
}
