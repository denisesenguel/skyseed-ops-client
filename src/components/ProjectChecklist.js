import React from 'react';
import { Form } from 'react-bootstrap';

export default function ProjectChecklist(props) {
    const { project } = props;
    // still missing styling (checkbox focus + click) and actual data
    return (
        <div>
            <Form>
                <Form.Check type="checkbox" label={ "something with " + project.title }/>
            </Form>
        </div>
    )
}
