import * as React from "react"

import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

const RichTextContent = ({ content, extraClass = "" }) => {
  return (
    <div className={extraClass}>
      <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]} />
    </div>
  )
}

export default RichTextContent
