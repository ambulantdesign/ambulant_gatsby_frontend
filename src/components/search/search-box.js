import React, { useRef } from "react"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"
import { connectSearchBox } from "react-instantsearch-dom"
// import useLocalStorageState from "use-local-storage-state"
// import { useGlobalContext } from "../../context/AppContext"

export default connectSearchBox(
  ({
    refine,
    currentRefinement,
    className,
    onFocus,
    focusBgCol,
    offCanvas,
    closeMobileNav,
  }) => {
    // const { appState, updateState } = useGlobalContext()
    // const [searchState, setSearchState] = useLocalStorageState("searchState", {
    //   ssr: true,
    //   defaultValue: {
    //     query: "",
    //     page: 1,
    //   },
    // })
    const inputRef = useRef()
    const location = useLocation()

    const handleSumbit = e => {
      e.preventDefault()

      const updatedStateEntries = {
        query: currentRefinement,
        page: 1,
      }

      if (location.pathname !== "/search") {
        navigate("/search", { replace: false, state: updatedStateEntries })
      }
      if (offCanvas) {
        closeMobileNav()
      }
    }

    const handleChange = e => {
      const newSearchString = e.target.value
      refine(newSearchString)
    }

    return (
      <form className="search" onSubmit={handleSumbit}>
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
              aria-label="submit"
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
            className={`py-2 text-sm text-gray-700 bg-gray-50 border-transparent rounded-md pl-10 focus:outline-none focus:${focusBgCol} focus:text-gray-900`}
            type="text"
            placeholder="Search …"
            aria-label="Search …"
            onChange={handleChange}
            // value={currentRefinement}
            // value={searchState.query}
            onFocus={onFocus}
            ref={inputRef}
          />
        </div>
      </form>
    )
  }
)
