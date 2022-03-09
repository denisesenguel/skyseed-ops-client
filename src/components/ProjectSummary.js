import React, { useEffect, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import userImg from '../images/forest_bg_website.jpg';
import ButtonMailTo from './ButtonMailTo';

export default function ProjectSummary(props) {
    
    const { project, editMode, editProject, submitEdit, discardEdit, setDiscardEdit, toggleEditMode } = props;
    const [description, setDescription] = useState(project.description);
    const [sizeInHa, setSizeInHa] = useState(project.sizeInHa);

    useEffect(() => {
        setDescription(project.description);
        setSizeInHa(project.sizeInHa);
    }, [project]);

    useEffect(() => {
        if (submitEdit) {
            editProject(project._id, {sizeInHa, description});
        }
    }, [submitEdit]);

    useEffect(() => {
        if (discardEdit) {
            setDescription(project.description);
            setSizeInHa(project.sizeInHa);
            toggleEditMode();
            setDiscardEdit(false);
        }
    }, [discardEdit]);

    return (
        <div className="mt-3">
            <Form>
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
