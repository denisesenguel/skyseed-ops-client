import React from 'react';
import NavBar from '../components/NavBar';
import Alert from 'react-bootstrap/Alert';

export default function EmailSentPage() {
  return (
    <div>
        <NavBar />
        <div className="bg-forest vh-100 p-5 d-flex flex-column justify-content-center align-items-center">
            <Alert variant="custom" className="res-width-container text-center bg-neutral-grey text-primary-cstm">
                <Alert.Heading>
                    Confirmation Link sent!
                </Alert.Heading>
                Please go to your emails. It might take a couple of minutes until it is in your Inbox.
                <br/>
                You might also want to check your Spam Folder.
            </Alert>
        </div>
    </div>
  )
}
