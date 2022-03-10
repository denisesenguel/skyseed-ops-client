import React from 'react';
import { Form, FormGroup, FormLabel } from 'react-bootstrap';

export default function ProjectSowingDetails(props) {
    
    const { project, editMode } = props;
  return (
    <div className="mt-3">
        <Form>
            <div className="d-flex">
                <FormGroup className="w-25">
                    <Form.Label>
                        Exact Date
                    </Form.Label>
                    <Form.Control
                    type="date"
                    >
                    </Form.Control>
                </FormGroup>
                <FormGroup className="w-75">
                    <Form.Label>
                        Area Type
                    </Form.Label>
                    <Form.Select>
                        <option>"something"</option>
                    </Form.Select>
                </FormGroup>
            </div>
            <FormGroup>
                <Form.Label>
                    Seed Mixture
                </Form.Label>
                <Form.Control>

                </Form.Control>
            </FormGroup>
            <FormGroup className="w-25">
                <Form.Label>
                    Sowing Density
                </Form.Label>
                <Form.Control
                    disabled={ !editMode }
                    type="number"
                >
                </Form.Control>
            </FormGroup>
            <FormGroup>
                <Form.Label>
                    Pilots
                </Form.Label>
                <Form.Control>

                </Form.Control>
            </FormGroup>
        </Form>
    </div>
  )
}
