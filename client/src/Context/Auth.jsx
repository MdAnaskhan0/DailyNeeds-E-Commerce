import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { json } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const data = localStorage.getItem('auth');
        return data ? JSON.parse(data) : { user: null, token: "" };
    });

    //default axios
    axios.defaults.headers.common['Authorization'] = auth?.token
    


    useEffect(() => {
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            });
        }   
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hooks
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
