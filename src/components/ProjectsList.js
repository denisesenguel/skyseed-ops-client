import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

export default function ProjectsList() {

  const colorMapping = {
    planned: "warning-cstm",
    ongoing: "info-cstm",
    finished: "success-cstm"
  }

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("Could not get projects from DB: ", error));
  }, []);

  return (
    <div className="w-100">
      <Container className="w-100">
        <Row className="text-white bg-primary-cstm rounded p-3">
          <Col xs={3}>Title</Col>
          <Col xs={2}>When?</Col>
          <Col xs={3}>Where?</Col>
          <Col xs={2}>status</Col>
          <Col xs={2}>Last Update</Col>
        </Row>
        {
          (projects.length === 0) ?
            <p>No projects found.</p> :
            <ListGroup>
            {
              projects?.map((project) => (
                <ListGroup.Item action 
                  key={ project._id }
                  href={`/home/projects/${project._id}`} 
                  className="text-primary-cstm shadow rounded p-4 my-2 active-green hover-beige">
                  <Row>
                    <Col xs={3}>{ project.title }</Col>
                    <Col xs={2}>{ [project.season, project.year].join(" ") } </Col>
                    <Col xs={3}>{ project.location }</Col>
                    <Col xs={2}> 
                      <Button 
                        size="sm" 
                        variant="primary-cstm" 
                        className={ `bg-${colorMapping[project.status]} text-white rounded-pill` }>
                        { project.status }
                      </Button> 
                    </Col>
                    <Col xs={2}>{ moment(project.updatedAt).fromNow() }</Col>
                  </Row>
                </ListGroup.Item>
              ))
            }
            </ListGroup>
        }
      </Container>
    </div>
  )
}
