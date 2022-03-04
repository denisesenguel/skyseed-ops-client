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
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            axios.get(
                `${process.env.REACT_APP_API_URL}/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` }}
            )
            .then((response) => {
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(response.data);
            })
            .catch((error) => {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
            })
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
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
    useEffect(() => verifyStoredToken(), []);

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
