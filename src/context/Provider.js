import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [wallet, setWallet] = useState([])
  const [reload, setReload] = useState([])

    return (
        <AppContext.Provider value={{user, setUser, wallet, setWallet, reload, setReload}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider