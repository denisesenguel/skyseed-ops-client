import React from 'react';
import { Form } from 'react-bootstrap';

export default function ProjectChecklist(props) {
    const { editedProject, editMode, updateEditedProject } = props;

    return (
        <div className="m-4 font-m">
            <Form>
                <Form.Check 
                    type="checkbox" 
                    label="Seeds ordered" 
                    className="my-2"
                    disabled={editedProject.seedMixture.every( item => item.available === true )}
                />
                <Form.Check type="checkbox" label="Date fixed" disabled={true} checked={ !editedProject.sowingDate ? false : true } className="my-2"/>
                <Form.Check type="checkbox" label="Area specified and confirmed" className="my-2" onChange={(e) => console.log(e) }/>
                <Form.Check type="checkbox" label="Flight permit requested" className="my-2"/>
                <Form.Check type="checkbox" label="Flight permit granted" className="my-2"/>
            </Form>
        </div>
    )
}
