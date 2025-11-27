import { createContext, useState } from "react"

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    return(
        <div>AuthContext</div>
    )
}