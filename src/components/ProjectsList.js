import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import StatusTag from './StatusTag';

export default function ProjectsList() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("Could not get projects from DB: ", error));
  }, []);

  return (
    <div>
      <Container className="w-100 m-5">
      <h1 className="mb-5">All Projects</h1>
      <ListGroup>
        <ListGroup.Item className="text-white bg-primary-cstm rounded p-3">
          <Row>
            <Col xs={3}>Title</Col>
            <Col xs={2}>When?</Col>
            <Col xs={3}>Where?</Col>
            <Col xs={2}>status</Col>
            <Col xs={2}>Last Update</Col>
          </Row>
        </ListGroup.Item>
        {
          (projects.length === 0) ?
            <p>No projects found.</p> :
              projects.map((project) => (
                <ListGroup.Item action 
                  key={ project._id }
                  href={`/home/projects/${project._id}`} 
                  className="active-green text-primary-cstm shadow rounded p-4 my-2">
                  <Row>
                    <Col xs={3}>{ project.title }</Col>
                    <Col xs={2}>{ [project.season, project.year].join(" ") } </Col>
                    <Col xs={3}>{ project.location }</Col>
                    <Col xs={2}> 
                    <StatusTag status={ project.status }/>
                    </Col>
                    <Col xs={2}>{ moment(project.updatedAt).fromNow() }</Col>
                  </Row>
                </ListGroup.Item>
              ))
        }
      </ListGroup>
      </Container>
    </div>
  )
}
