import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import Fuse from 'fuse.js';
import StatusTag from './StatusTag';
import SearchBar from './SearchBar';

export default function ProjectsList(props) {

  const [query, setQuery] = useState('');
  const { projects } = props;
  const fuse = new Fuse(projects, {
    keys: [
      "title",
      "season",
      "year",
      "location",
      "status"
    ],
    includeScore: true
  });

  const searchResults = fuse.search(query);
  const projectsToShow = (query === '') ? projects : searchResults.map(result => result.item);

  return (
    <div className="res-width-container-lg">
      
      <div className="mb-2 d-flex justify-content-end">
        <SearchBar query={ query } setQuery={ setQuery } width={50}/>
      </div>

      <ListGroup className="shadow">
        <ListGroup.Item className="text-secondary-cstm bg-neutral-grey rounded p-3 px-5">
          <Row>
            <Col xs={3} className="d-flex align-items-center"><h6 className="m-0">Titel</h6></Col>
            <Col xs={2} className="d-flex align-items-center"><h6 className="m-0">Zeitraum</h6></Col>
            <Col xs={3} className="d-flex align-items-center"><h6 className="m-0">Ort</h6></Col>
            <Col xs={2} className="d-flex align-items-center justify-content-center"><h6 className="m-0">Status</h6></Col>
            <Col xs={2} className="d-flex align-items-center"><h6 className="m-0">Update</h6></Col>
          </Row>
        </ListGroup.Item>
        {
          (projectsToShow.length > 0) &&
              projectsToShow.map((project) => (
                  <ListGroup.Item action key={ project._id } className="p-3 px-5">
                    <Link 
                      to={ `/home/projects/${project._id}` }
                      className="text-decoration-none active-green text-primary-cstm"
                    >
                      <Row>
                          <Col xs={3} className="d-flex align-items-center font-m"> { project.title } </Col>
                          <Col xs={2} className="d-flex align-items-center font-lato-light">{ [project.season, project.year].join(" ") } </Col>
                          <Col xs={3} className="d-flex align-items-center font-lato-light">{ project.location }</Col>
                          <Col xs={2} className="d-flex align-items-center justify-content-center font-lato-light"> 
                            { project.status ? <StatusTag status={ project.status }/> : "Unknown" }
                          </Col>
                          <Col xs={2} className="d-flex align-items-center font-lato-light font-s"> { moment(project.updatedAt).fromNow() }</Col>
                      </Row>
                    </Link>
                  </ListGroup.Item>

              ))
        }
      </ListGroup>

      { 
        (projectsToShow.length === 0) && 
          <div className="mx-0 my-4">
            No projects found. 
          </div> 
      }

      <Link to="/home/projects/create" className="text-decoration-none">
        <Button variant="custom" className="border-secondary-cstm text-secondary-cstm mt-4">
          { projects.length === 0 ? "Add one now" : "Add another" } 
        </Button>
      </Link>
    </div>
  )
}
