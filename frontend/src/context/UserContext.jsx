import { createContext } from "react";
import useAuth from "../hooks/useAuth";


const Context = createContext()

function UserProvider ({ children }) {  
  const {auth, register, login, logout } = useAuth()

  return (
    <Context.Provider value={{auth, register, login, logout }}>
      {children}
    </Context.Provider>
  )  
}


export { Context, UserProvider }