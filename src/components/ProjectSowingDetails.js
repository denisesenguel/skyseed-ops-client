import React from 'react';
import Creatable from 'react-select/creatable';
import { Form, FormGroup } from 'react-bootstrap';
import UserCard from './UserCard';

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
                <FormGroup className="w-75 ml-2">
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
                {
                    project.seedMixture?.map(item => (
                        <>
                            <Form.Control
                                type="text"
                                placeholder="Seed Type, e.g. Birch Tree"
                            >    
                            </Form.Control>
                            <Form.Control
                                type="number"
                            >
                            </Form.Control>
                            <Form.Check>
                                Seeds available
                            </Form.Check>
                        </>
                    ))
                }
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
        </Form>
        <div className="mt-4">
            <h6>Pilots</h6>
            {
                project.pilots?.map(pilot => <UserCard user={pilot}/>)
            }
        </div>
    </div>
  )
}
