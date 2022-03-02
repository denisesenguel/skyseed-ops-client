import React from 'react'
import { Alert } from 'react-bootstrap';

export default function ErrorPage(props) {

    const { status, message } = props;
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Alert variant="danger" className="w-50 text-center">
                <Alert.Heading> { status } Error!</Alert.Heading>
                <p>{ message }</p>
            </Alert>
        </div>
    )
}