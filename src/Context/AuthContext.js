import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { AiOutlineLoading3Quarters} from 'react-icons/ai'
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <div className="w-screen h-screen flex justify-center items-center">
             <AiOutlineLoading3Quarters className=" animate-spin text-6xl " />
        </div>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};