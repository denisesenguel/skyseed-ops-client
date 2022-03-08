import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // store token in local storage
    function storeToken(token) {
        localStorage.setItem('authToken', token);
    }

    // look for token in local storage and verify 
    function verifyStoredToken() {
        setIsLoading(true);
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            axios.get(
                `${process.env.REACT_APP_API_URL}/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` }}
            )
            .then((response) => {
                console.log("Token verified.")
                setIsLoggedIn(true);
                setUser(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("Token verification failed: ", error);
                setIsLoggedIn(false);
                setUser(null);
                setIsLoading(false);
            })
        } else {
            console.log("No stored token found.")
            setIsLoggedIn(false);
            setUser(null);
            setIsLoading(false);
        }
    }

    // remove token from local storage
    function removeToken() {
        localStorage.removeItem("authToken");
    }
    
    // on logout: remove token and update states
    function logOutUser() {
        removeToken();
        verifyStoredToken();
    
    }
    // authenticate user on initial app load
    useEffect(() => {
        verifyStoredToken()
        console.log("initial token verification done");
    }, []);
    
    return(
        <AuthContext.Provider value={ {
            isLoggedIn, 
            isLoading, 
            user, 
            storeToken,
            verifyStoredToken,
            removeToken,
            logOutUser
        } }>
            { props.children }
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
