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
                autohide delay={ 2000 }
                className="bg-success-cstm"
            >
                <Toast.Body className="text-center text-neutral-grey">{ message }</Toast.Body>
            </Toast>
            </ToastContainer>
        </div>
    )
}
