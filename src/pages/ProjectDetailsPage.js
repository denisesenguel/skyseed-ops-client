import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Nav, Button, ToastContainer, Toast } from 'react-bootstrap';
import axios from 'axios';
import ProjectSummary from '../components/ProjectSummary';
import ButtonMailTo from '../components/ButtonMailTo';
import StatusTag from '../components/StatusTag';
import ProjectChecklist from '../components/ProjectChecklist';
import { enumArrays } from '../config/dataConfigs';

export default function ProjectDetailsPage() {

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [selectedTab, setSelectedTab] = useState("summary");
  const [showSelectStatus, setShowSelectStatus] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setProject(response.data)
      }
      )
      .catch((error) => console.log("Error getting project: ", error))
  }, [projectId, storedToken])

  function deleteProject(id) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/projects/${id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        navigate("/home/projects?deleted=true");
      })
      .catch((error) => console.log("Error deleting project: ", error))
  }

  function editProject(id, newProject) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/projects/${id}`, 
        newProject,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setProject(response.data)
        console.log("success!", response.data)
      })
      .catch((error) => console.log("Error updating project: ", error));
  }

  const toggleSelectStatus = () => setShowSelectStatus((previous) => !previous); 

  function editStatus(id, newStatus) {
    editProject(id, {status: newStatus});
    toggleSelectStatus();
  }

  return (
    <div className="res-width-container p-5">
        <h4>{ project.title } - { project.season } { project.year }</h4>
        <div className="d-flex">
          <p className="my-auto">{ project.location}</p>
          <StatusTag clickHandler={ toggleSelectStatus } className="mx-3" status={ project.status } />
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

        { selectedTab === 'summary' && <ProjectSummary project={ project } onEdit={ editProject }/> }
        { selectedTab === 'details' && <div> Will be populated when model gets extended </div> }
        { selectedTab === 'checklist' && <ProjectChecklist project={ project } onEdit={ editProject }/> }

        <div className="d-flex justify-content-end">
          <Button onClick={ () => deleteProject(project._id) } variant="custom" className="bg-error-cstm text-neutral-grey">Delete this project</Button>
        </div>

          <div>
              <ToastContainer position="top-center" className="mt-5 p-3">
                  <Toast onClose={ toggleSelectStatus } show={ showSelectStatus }  bg="neutral-grey">
                      <Toast.Header className="d-flex justify-content-between text-secondary-cstm bg-neutral-grey">
                        <h6>Change status</h6>
                      </Toast.Header>
                      <Toast.Body>
                        <div className="d-flex justify-content-center">
                          {
                            enumArrays.status.map((type) => <StatusTag clickHandler={ () => editStatus(project._id, type) } status={ type } className="mx-2"/>)
                          }
                        </div>
                      </Toast.Body>
                  </Toast>
              </ToastContainer>
          </div>

    </div>
  )
}
