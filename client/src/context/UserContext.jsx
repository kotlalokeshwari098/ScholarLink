import { createContext, useState } from "react";

export const UserDataContext=createContext()

export const UserContextProvider=({children})=>{
    const [user, setUser] = useState({
      email: "",
      fullname: {
        firstname: "",
        lastname: "",
      },
    });


    return <UserDataContext.Provider value={{user,setUser}}>
        {children}
    </UserDataContext.Provider>
}