import * as React from "react"

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      if (value) {
        console.log(`>>> ${keyName} <<<`, value)
        window.localStorage.removeItem(keyName)
        return defaultValue
      } else {
        console.log(`+++ ${keyName} +++`, value)
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = newValue => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {}
    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
