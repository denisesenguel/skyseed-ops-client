import React from 'react'
import { Alert } from 'react-bootstrap';

export default function ErrorPage(props) {

    const { status, message } = props;
    return (
        <div className="p-5 bg-dead-forest vh-100 d-flex flex-column justify-content-start align-items-center">
            <Alert variant="custom" className="mt-5 res-width-container text-center text-danger border-danger">
                <Alert.Heading> 
                    {
                        (status && message) ? 
                            [status, message].join(" - ")  :
                            "Ooops - an error occured!"
                    } 
                </Alert.Heading>
            </Alert>
        </div>
    )
}