import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const data = localStorage.getItem('auth');
        return data ? JSON.parse(data) : { user: null, token: "" };
    });
    //default axios
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {

        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hooks
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
