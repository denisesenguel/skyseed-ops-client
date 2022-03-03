import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import ProjectSummary from '../components/ProjectSummary';

export default function ProjectDetailsPage() {

  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [selectedTab, setSelectedTab] = useState("summary");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
      .then((response) => {
        console.log("server response: ", response.data)
        setProject(response.data)
      }
      )
      .catch((error) => console.log("Error getting project: ", error))
  }, [])


  return (
    <div className="m-5 w-100">
        <h4>{ project.title } - { project.season } { project.year }</h4>
        <p>{ project.location }</p>
        <div className="w-100 d-flex justify-content-between align-items-center">
        <Link 
          className="text-decoration-none text-primary-cstm" 
          to={ `/home/customers/${project.customer?._id}` }>
          <h6>Client: { [project.customer?.firstName, project.customer?.lastName].join(" ") }</h6>
        </Link>
        <Button size="sm" variant="custom" className="bg-secondary-cstm">Email Client</Button>
        </div>

        <Nav 
          fill variant="tabs" 
          className="mt-4"
          defaultActiveKey="summary" 
          onSelect={ (key) => setSelectedTab(key) }>
          <Nav.Item>
            <Nav.Link className="text-primary-cstm" eventKey="summary">Summary</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-primary-cstm" eventKey="details">Sowing Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-primary-cstm" eventKey="checklist">
              Checklist
            </Nav.Link>
          </Nav.Item>
        </Nav>

        { selectedTab === 'summary' && <ProjectSummary project={ project }/> }
        { selectedTab === 'details' && <div> Render Sowing details here </div> }
        { selectedTab === 'checklist' && <div> Render summary here </div> }

    </div>
  )
}
