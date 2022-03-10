import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';

export default function SuccessToast(props) {

    const { showSuccess, message, toggleShowSuccess } = props;

    return (
        <div>
            <ToastContainer className="below-header-right">
            <Toast 
                onClose={ toggleShowSuccess } 
                show={ showSuccess } 
                autohide delay={ 2500 }
                className="bg-success-cstm opacity-50 py-3"
            >
                <Toast.Body className="text-center text-neutral-grey">{ message }</Toast.Body>
            </Toast>
            </ToastContainer>
        </div>
    )
}
