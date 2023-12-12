import qs from "qs"

export const defaultAppState = {
  query: "",
  page: 1,
}

export const createURL = state => `?${qs.stringify(state)}`

export const searchStateToUrl = searchState =>
  searchState ? `/search${createURL(searchState)}` : ""

export const urlToSearchState = location => qs.parse(location.search.slice(1))
