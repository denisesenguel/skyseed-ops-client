import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import StatusTag from './StatusTag';

export default function ProjectsList(props) {

  const { projects } = props;

  return (
    <div className="res-width-container-lg">
      <Container fluid className="w-100">
        <Row className="text-neutral-grey bg-primary-cstm rounded p-3">
          <Col xs={3}>Title</Col>
          <Col xs={2}>When?</Col>
          <Col xs={2}>Where?</Col>
          <Col xs={3}>status</Col>
          <Col xs={2}>Last Update</Col>
        </Row>
        {
          (projects.length === 0) ?
            <div className="mx-0">
              <p className="my-4">No projects found.</p> 
              <Button variant="custom" className="bg-secondary-cstm"> 
                <Link to="/home/projects/create" className="text-decoration-none text-primary-cstm">
                  Add one now
                </Link> 
              </Button> 
            </div> :
              projects.map((project) => (

                  <Link 
                    to={ `/home/projects/${project._id}` }
                    className="text-decoration-none active-green text-primary-cstm"
                    key={ project._id }
                  >
                    <Row className="shadow rounded p-4 my-2">
                        <Col xs={3}>{ project.title }</Col>
                        <Col xs={2}>{ [project.season, project.year].join(" ") } </Col>
                        <Col xs={3}>{ project.location }</Col>
                        <Col xs={2}> 
                        <StatusTag status={ project.status }/>
                        </Col>
                        <Col xs={2}>{ moment(project.updatedAt).fromNow() }</Col>
                    </Row>
                  </Link>

              ))
        }
      </Container>
    </div>
  )
}
