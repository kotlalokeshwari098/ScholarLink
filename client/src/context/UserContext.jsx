import { createContext, useState } from "react";

const UserDataContext=createContext()

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState('')


    return <UserDataContext.Provider value={{user,setUser}}>
        {children}
    </UserDataContext.Provider>
}