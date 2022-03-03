import React from 'react';

export default function DropDown(props) {
    const { optionsArray, fieldName, label, formInputs, onChange, isMultiple } = props;
    return (
        <div className="form-group">
            <label className="mb-2" htmlFor={ fieldName }>{ label }</label>
            <select multiple={ !isMultiple ? false : true} className="form-control" id={ fieldName } value={ formInputs[fieldName] } onChange={ onChange }>
                <option></option>
                { optionsArray.map((option, index) => <option key={ index }>{ option }</option>) }
            </select> 
        </div>
    )
}
