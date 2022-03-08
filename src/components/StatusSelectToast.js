import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { enumArrays } from '../config/dataConfigs';
import StatusTag from './StatusTag';

export default function StatusSelectToast(props) {
    
    const { showSelectStatus, toggleSelectStatus, editStatus, project } = props;
    return(
        <div>
            <ToastContainer position="top-center" className="mt-5 p-3">
                <Toast onClose={ toggleSelectStatus } show={ showSelectStatus }  bg="neutral-grey">
                    <Toast.Header className="d-flex justify-content-between text-secondary-cstm bg-neutral-grey">
                      <h6>Change status</h6>
                    </Toast.Header>
                    <Toast.Body>
                      <div className="d-flex justify-content-center">
                        {
                          enumArrays.status.map((type, index) => (
                            <StatusTag 
                              key={ index } 
                              clickHandler={ () => editStatus(project._id, type) } 
                              status={ type } 
                              className="mx-2"/>
                          ))
                        }
                      </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
