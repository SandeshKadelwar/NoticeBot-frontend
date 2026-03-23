import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // ✅ AUTO LOGIN FIX
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setUser({}); // user is logged in
        } else {
            setUser(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const getData = () => useContext(UserContext)