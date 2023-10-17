import React, { createContext, useState, useContext } from "react"

const SearchContext = createContext()

const initialSearchState = {
  query: "",
  page: 1,
}

export const SearchProvider = ({ children }) => {
  const [searchObj, setSearchObj] = useState(initialSearchState)

  return (
    <SearchContext.Provider value={{ searchObj, setSearchObj }}>
      {children}
    </SearchContext.Provider>
  )
}

// make sure use (saves you from importing 'useContext' many times)
export const useGlobalContext = () => useContext(SearchContext)
