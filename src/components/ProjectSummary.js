import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import userImg from '../images/forest_bg_website.jpg';
import ButtonMailTo from './ButtonMailTo';

export default function ProjectSummary(props) {
    
    const { project, onEdit } = props;
    const [description, setDescription] = useState(project.description);
    const [sizeInHa, setSizeInHa] = useState(project.sizeInHa);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setDescription(project.description);
        setSizeInHa(project.sizeInHa);
    }, [project])

    function handleSubmit(evnt) {
        evnt.preventDefault();
        onEdit(project._id, {sizeInHa, description});
    }

    const toggleEditMode = () => setEditMode((previous) => !previous);

    return (
        <div className="mt-3">
            <Form onSubmit={ handleSubmit }>
                <Form.Group controlId="description" className="mt-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        readOnly={ editMode ? false : true }
                        className="bg-white"
                        as="textarea" rows={3}
                        onChange={ (e) => setDescription(e.target.value) }
                        value={ description } 
                    />
                </Form.Group>
                <Form.Group controlId="sizeInHa" className="mt-2">
                    <Form.Label>Size (in ha)</Form.Label>
                    <Form.Control 
                        readOnly={ editMode ? false : true }
                        type="number" 
                        className="bg-white"
                        onChange={ (e) => setSizeInHa(e.target.value) } 
                        value={ sizeInHa } 
                    />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button 
                        onClick={ toggleEditMode } 
                        type={ !editMode ? "submit" : "button"} 
                        variant="custom" 
                        className="border-secondary-cstm text-secondary-cstm my-4" >
                        { editMode ? "Save Changes" : "Edit Details" }
                    </Button>
                </div>
            </Form>
            <h6>Project Managers</h6>
            <div className="w-50">
                {
                    ( !project || !project?.managers || project?.managers?.length === 0 ) ?
                        <p> None assigned yet.</p> :
                        project.managers.map((user) => (
                            <Card key={ user._id } className="d-flex flex-row align-items-center my-1">
                                <img 
                                    src={ userImg } 
                                    className="rounded-circle fix-img-height m-2" 
                                    alt={ user.firstName }
                                />
                                <div className="mx-2">
                                    <h6 className="mb-0">{ user.firstName }</h6>
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

    )
}
