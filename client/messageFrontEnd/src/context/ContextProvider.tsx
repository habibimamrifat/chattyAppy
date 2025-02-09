import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext(null as unknown | null)

export const ContextProvider = ({children}:{children: ReactNode})=>{
    const [user,setUser]= useState()
    const contextValues = {user,setUser}
    return(
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    )
}