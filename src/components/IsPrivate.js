import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function IsPrivate( {children} ) {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext);
    console.log("logged in: ", isLoggedIn);
    console.log("as user:", user)

    if (isLoading) return <p>Loading ...</p>;
 
    // this shouldn't make a difference?
    // if (!isLoggedIn) {
    //     // If the user is logged in, navigate to home page     
    //     return <Navigate to="/login" />;
    // } else {
    //     // If the user is not logged in, allow to see the page 
    //     return children;
    // }

    return(
        <>
            { isLoading && <p>Loading</p> }
            { isLoggedIn ? children : <Navigate to="/login"/> }
        </>
    )
}

