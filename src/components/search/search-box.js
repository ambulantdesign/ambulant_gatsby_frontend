import qs from "qs"
import React, { useRef } from "react"
import { navigate } from "gatsby"
import { connectSearchBox } from "react-instantsearch-dom"
import useLocalStorageState from "use-local-storage-state"

const createURL = state => `?${qs.stringify(state)}`

const searchStateToUrl = (location, searchState) => {
  let fullPath
  location.pathname === "/search"
    ? (fullPath = `${location.pathname}${createURL(searchState)}`)
    : (fullPath = `/search${createURL(searchState)}`)
  return searchState ? `${fullPath}` : ""
}

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => {
    const [searchState, setSearchState] = useLocalStorageState("searchState", {
      ssr: true,
      defaultValue: {
        query: "",
        page: 1,
      },
    })
    const inputRef = useRef()

    const handleSumbit = e => {
      e.preventDefault()

      const updatedStateEntries = {
        query: currentRefinement,
        page: 1,
      }
      // navigate to search page with lastest search string (currentRefinement)
      navigate(searchStateToUrl("/search", updatedStateEntries), {
        replace: false,
      })
    }

    const handleChange = e => {
      const newSearchString = e.target.value
      refine(newSearchString)
    }

    React.useEffect(() => {
      // set latest search string as a value to search box
      if (searchState.query) {
        inputRef.current.value = searchState.query
      }
    }, [])

    return (
      <form className="search" onSubmit={handleSumbit}>
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
            className="py-2 text-sm text-gray-700 bg-gray-50 border-transparent rounded-md pl-10 focus:outline-none focus:bg-stone-100 focus:text-gray-900"
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
