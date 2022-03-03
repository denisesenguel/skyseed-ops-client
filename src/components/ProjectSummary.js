import React from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import userImg from '../images/domi_small.png';
import ButtonMailTo from './ButtonMailTo';

export default function ProjectSummary(props) {
    
    const { project } = props;
    
    return (
        <div className="mt-3">
            <Form>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        readOnly={ true }
                        className="bg-white"
                        as="textarea" rows={3} placeholder="Give a short description"
                        value={ project.description } 
                    />
                </Form.Group>
                <Form.Group controlId="sizeInHa">
                    <Form.Label>Size (in ha)</Form.Label>
                    <Form.Control 
                        readOnly={ true }
                        type="number" 
                        className="bg-white"
                        value={ project.sizeInHa } 
                    />
                </Form.Group>
                <h6 className="text-secondary-cstm my-3">More Infos following later...</h6>
            </Form>
            <h6>Project Managers</h6>
            <Container fluid>
                <Row>
                {
                    (!project || !project?.managers || project?.managers?.length === 0) ?
                        <p> None assigned yet.</p> :
                        project.managers.map((user) => (
                            <Col xs={2} className="mx-0 px-0 text-primary-cstm d-flex align-items-center" key={ user._id }>
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

            <div className="d-flex justify-content-end">
                {/* <Button variant="custom" className="bg-secondary-cstm mx-2" >Edit Details</Button> */}
                <Button variant="custom" className="bg-error-cstm text-neutral-grey">Delete this project</Button>
            </div>
        </div>

    )
}
