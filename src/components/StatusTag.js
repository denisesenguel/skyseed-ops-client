import React from 'react';
import Button from 'react-bootstrap/Button';
import { stateColorMapping } from '../config/dataConfigs';

export default function StatusTag(props) {

    const { status, className, clickHandler }  = props;
    
    return(
        <div>
            <Button 
                onClick={ clickHandler }
                size="sm" 
                variant="custom" 
                className={ `bg-${stateColorMapping[status]} text-white rounded-pill ${className}` }>
                { status }
            </Button> 
        </div>
    )
}
