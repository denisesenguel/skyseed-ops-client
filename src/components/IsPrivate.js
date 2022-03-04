import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function IsPrivate( {children} ) {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext);
    console.log("logged in: ", isLoggedIn);
    console.log("as user:", user)
    return(
        <>
            { isLoading && <p>Loading</p> }
            { isLoggedIn ? children : <Navigate to="/login"/> }
        </>
    )
}

