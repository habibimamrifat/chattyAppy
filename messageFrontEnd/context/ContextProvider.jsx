import React, { createContext } from 'react'

const AppContextProvider = createContext(null)

const ContextProvider = ({children}) => {

  return (
    <AppContextProvider.Provider value={null}>
      {children}
    </AppContextProvider.Provider>
  )
}

export default ContextProvider
