import { useContext, useState, useEffect, use } from "react";
import { createContext } from "react";
import axios from 'axios'
// import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [token, setToken] = useState(Cookies.get("token") || "");
    // const [admin, setAdmin] = useState(Cookies.get("admin") === "true");
    // const authToken = `Bearer ${token}`
    // const isLoggedIn = !!token

    const Signup_URL = "http://localhost:4000/api"

    // const logoutUser = () => {
    //     setToken("")
    //     setAdmin("")
    //     Cookies.remove("token");
    //     Cookies.remove("admin");
    // }

    // useEffect(() => {
    //     if (token) {
    //         Cookies.set("token", token, { path: "/" });
    //         Cookies.set("admin", admin, { path: "/" });
    //     } else {
    //         Cookies.remove("token");
    //         Cookies.remove("admin");
    //     }
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("admin");
    // }, [token, admin]);



    return (
        <AuthContext.Provider value={{ Signup_URL }}>
            {children}
        </AuthContext.Provider>
    );

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}