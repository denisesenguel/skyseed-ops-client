import React from 'react';
import Button from 'react-bootstrap/Button';

export default function StatusTag(props) {

    const { status, className, clickHandler }  = props;
    const colorMapping = {
        planned: "warning-cstm",
        ongoing: "info-cstm",
        finished: "success-cstm"
    }
    return(
        <div>
            <Button 
                onClick={ clickHandler }
                size="sm" 
                variant="custom" 
                className={ `bg-${colorMapping[status]} text-white rounded-pill ${className}` }>
                { status }
            </Button> 
        </div>
    )
}
