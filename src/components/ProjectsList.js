import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import StatusTag from './StatusTag';

export default function ProjectsList(props) {

  const { projects } = props;

  return (
    <div>
      <Container className="w-100 m-5">
      <h1 className="mb-5">All Projects</h1>
          <Row className="text-neutral-grey bg-primary-cstm rounded p-3">
            <Col xs={3}>Title</Col>
            <Col xs={2}>When?</Col>
            <Col xs={3}>Where?</Col>
            <Col xs={2}>status</Col>
            <Col xs={2}>Last Update</Col>
          </Row>
        {
          (projects.length === 0) ?
            <p>No projects found.</p> :
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
