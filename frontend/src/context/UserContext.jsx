import { createContext } from "react";
import useAuth from "../hooks/useAuth";


const Context = createContext()

function UserProvider ({ children }) {  
  const { register, auth } = useAuth()

  return (
    <Context.Provider value={{register, auth}}>
      {children}
    </Context.Provider>
  )  
}


export { Context, UserProvider }