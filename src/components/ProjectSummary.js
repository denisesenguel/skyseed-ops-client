import React from 'react';
import { Form, Card } from 'react-bootstrap';
import userImg from '../images/forest_bg_website.jpg';
import ButtonMailTo from './ButtonMailTo';

export default function ProjectSummary(props) {
    
    const { project, editMode,  editedProject, updateEditedProject } = props;

    return (
        <div className="mt-3">
            <Form>
                <Form.Group controlId="description" className="mt-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        disabled={ !editMode }
                        className="bg-white"
                        as="textarea" rows={3}
                        onChange={ (e) => updateEditedProject(e.target.id, e.target.value) }
                        value={ editedProject.description } 
                    />
                </Form.Group>
                <Form.Group controlId="sizeInHa" className="mt-2">
                    <Form.Label>Size (in ha)</Form.Label>
                    <Form.Control 
                        disabled={ !editMode }
                        type="number" 
                        className="bg-white"
                        onChange={ (e) => updateEditedProject(e.target.id, e.target.value) } 
                        value={ editedProject.sizeInHa } 
                    />
                </Form.Group>
            </Form>
            <div className="w-100 mt-4">
                <h6 >Project Managers</h6>
                <div className="w-50 mt-3">
                    {
                        ( !project || !project?.managers || project?.managers?.length === 0 ) ?
                            <p> None assigned yet.</p> :
                            project.managers.map((user) => (
                                <Card key={ user._id } className="d-flex flex-row align-items-center my-1 shadow">
                                    <img 
                                        src={ userImg } 
                                        className="rounded-circle fix-img-height m-2" 
                                        alt={ user.firstName }
                                    />
                                    <div className="mx-2">
                                        <p className="mb-0">{ user.firstName }</p>
                                        <ButtonMailTo 
                                            label={ user.email } 
                                            mailto={ `mailto:${user.email}` }
                                            className="text-decoration-underline text-secondary-cstm"
                                        />
                                    </div>
                                </Card>
                            ))        
                    }
                </div>
            </div>
        </div>

    )
}
