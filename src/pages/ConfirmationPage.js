import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ErrorPage from './ErrorPage';

export default function ConfirmationPage() {

    const { userId } = useParams();
    const [confirming, setConfirming] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/confirm/${userId}`)
            .then(() => {
                setConfirming(false);
            })
            .catch((error) => {
                console.log("Error confirming email: ", error);
                setConfirming(false);
                setFailed(true);
            })
    }, [userId]);


    return(
        <div>
            {failed
                ? <ErrorPage message="Could not Confirm Email. Please try again" />
                : <>
                    <NavBar />
                    {confirming
                        ? <Spinner animation="border" variant="secondary-cstm"/>
                        : <Navigate to="/login?confirmed=true" />
                    }
                </>
            }
        </div>
    )
}
