import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import StatusTag from './StatusTag';

export default function ProjectsList(props) {

  const { projects } = props;

  return (
    <div className="res-width-container-lg">
      <ListGroup className="shadow">
        <ListGroup.Item className="text-secondary-cstm bg-neutral-grey rounded p-3 shadow">
          <Row>
            <Col xs={3} className="d-flex align-items-center"><h6 className="m-0">Title</h6></Col>
            <Col xs={2} className="d-flex align-items-center"><h6 className="m-0">Time</h6></Col>
            <Col xs={3} className="d-flex align-items-center"><h6 className="m-0">Location</h6></Col>
            <Col xs={2} className="d-flex align-items-center justify-content-center"><h6 className="m-0">Status</h6></Col>
            <Col xs={2} className="d-flex align-items-center"><h6 className="m-0">Updated</h6></Col>
          </Row>
        </ListGroup.Item>
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
                  <ListGroup.Item action key={ project._id } className="p-3">
                    <Link 
                      to={ `/home/projects/${project._id}` }
                      className="text-decoration-none active-green text-primary-cstm"
                    >
                      <Row>
                          <Col xs={3} className="d-flex align-items-center"> { project.title } </Col>
                          <Col xs={2} className="d-flex align-items-center font-lato-light">{ [project.season, project.year].join(" ") } </Col>
                          <Col xs={3} className="d-flex align-items-center font-lato-light">{ project.location }</Col>
                          <Col xs={2} className="d-flex align-items-center justify-content-center font-lato-light"> 
                            { project.status ? <StatusTag status={ project.status }/> : "Unknown" }
                          </Col>
                          <Col xs={2} className="d-flex align-items-center font-lato-light"> { moment(project.updatedAt).fromNow() }</Col>
                      </Row>
                    </Link>
                  </ListGroup.Item>

              ))
        }
      </ListGroup>
    </div>
  )
}
