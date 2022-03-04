import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import userImg from '../images/domi_small.png';
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
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        readOnly={ editMode ? false : true }
                        className="bg-white"
                        as="textarea" rows={3}
                        onChange={ (e) => setDescription(e.target.value) }
                        value={ description } 
                    />
                </Form.Group>
                <Form.Group controlId="sizeInHa">
                    <Form.Label>Size (in ha)</Form.Label>
                    <Form.Control 
                        readOnly={ editMode ? false : true }
                        type="number" 
                        className="bg-white"
                        onChange={ (e) => setSizeInHa(e.target.value) } 
                        value={ sizeInHa } 
                    />
                </Form.Group>
                <h6 className="text-secondary-cstm my-3">More Infos following later...</h6>
                <div className="d-flex justify-content-end">
                    <Button onClick={ toggleEditMode } 
                        type={ !editMode ? "submit" : "button"} 
                        variant="custom" 
                        className="bg-secondary-cstm mx-2" >
                        { editMode ? "Save Changes" : "Edit Details" }
                    </Button>
                </div>
            </Form>
            <h6>Project Managers</h6>
            <Container fluid>
                <Row>
                {
                    (!project || !project?.managers || project?.managers?.length === 0) ?
                        <p> None assigned yet.</p> :
                        project.managers.map((user) => (
                            <Col key={user._id} xs={2} className="mx-0 px-0 text-primary-cstm d-flex align-items-center">
                                <Card>
                                    <Card.Img variant="top" src={ userImg }></Card.Img>
                                    <h6 className="text-center">Denise</h6>
                                    <Button size="sm" variant="custom" className="bg-secondary-cstm">
                                    <ButtonMailTo label="Send Email" mailto={ `mailto:${user.email}` }/>
                                    </Button>
                                </Card>
                            </Col>
                        ))
                                
                }
                </Row>
            </Container>

        </div>

    )
}
