import * as React from "react"
import { Watch } from "react-loader-spinner"

export default function Loading({ elemId, wrapperClasses }) {
  return (
    <div id={elemId} className={wrapperClasses}>
      <Watch
        height="100"
        width="100"
        color="#dbe0ea"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  )
}
