import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import ProjectSummary from '../components/ProjectSummary';
import ButtonMailTo from '../components/ButtonMailTo';
import StatusTag from '../components/StatusTag';
import ProjectChecklist from '../components/ProjectChecklist';

export default function ProjectDetailsPage() {

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [selectedTab, setSelectedTab] = useState("summary");
  const [editMode, setEditMode] = useState(false);

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

  function deleteProject(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then(() => {
        navigate("/home/projects?deleted=true");
      })
      .catch((error) => console.log("Error deleting project: ", error))
  }

  function editProject(id, newProject) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${id}`, newProject)
      .then((updatedProject) => {
        setProject(updatedProject)
      })
      .catch((error) => console.log("Error updating project: ", error));
  }

  const toggleEditMode = () => setEditMode((previous) => !previous);

  return (
    <div className="m-5 w-100">
        <h4>{ project.title } - { project.season } { project.year }</h4>
        <div className="d-flex">
          <p className="my-auto">{ project.location}</p>
          <StatusTag className="mx-3" status={ project.status } />
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center">
        <Link 
          className="text-decoration-none text-primary-cstm" 
          to={ `/home/customers/${project.customer?._id}` }>
          <h6>Client: { [project.customer?.firstName, project.customer?.lastName].join(" ") }</h6>
        </Link>
        <Button size="sm" variant="custom" className="bg-secondary-cstm">
          <ButtonMailTo label="Email Client" mailto={ `mailto:${project.customer?.email}` }/>
        </Button>
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

        { selectedTab === 'summary' && <ProjectSummary project={ project } editMode={ editMode } onEdit={ editProject }/> }
        { selectedTab === 'details' && <div> Will be populated when model gets extended </div> }
        { selectedTab === 'checklist' && <ProjectChecklist project={ project } editMode={ editMode } onEdit={ editProject }/> }

        <div className="d-flex justify-content-end">
          <Button onClick={ toggleEditMode } variant="custom" className="bg-secondary-cstm mx-2" >
            { editMode ? "Save Changes" : "Edit Details" }
          </Button>
          <Button onClick={ () => deleteProject(project._id) } variant="custom" className="bg-error-cstm text-neutral-grey">Delete this project</Button>
        </div>

    </div>
  )
}
