import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const data = localStorage.getItem('auth');
        return data ? JSON.parse(data) : { user: null, token: "" };
    });

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
