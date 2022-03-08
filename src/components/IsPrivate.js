import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function IsPrivate( {children} ) {
    
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) return (
        <div className="vh-100 vw-100 bg-neutral-grey d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="secondary-cstm" size="lg"/>
        </div>
    );
 
    if (!isLoggedIn) {
        // If the user is logged in, navigate to home page     
        return <Navigate to="/login" />;
    } else {
        // If the user is not logged in, allow to see the page 
        return children;
    }
}

