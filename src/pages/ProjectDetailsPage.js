import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Nav, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import ProjectSummary from "../components/ProjectSummary";
import ButtonMailTo from "../components/ButtonMailTo";
import StatusTag from "../components/StatusTag";
import ProjectChecklist from "../components/ProjectChecklist";
import SuccessToast from "../components/SuccessToast";
import useShowSuccess from "../hooks/useShowSuccess";
import StatusSelectToast from "../components/StatusSelectToast";
import IsRestricted from "../components/IsRestricted";

export default function ProjectDetailsPage({ fetchProjects }) {
  
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { showSuccess, toggleShowSuccess, successMessage, setSuccessMessage } = useShowSuccess();
  const [project, setProject] = useState({});
  const [selectedTab, setSelectedTab] = useState("summary");
  const [showSelectStatus, setShowSelectStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProject(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error getting project: ", error));
  }, [projectId, storedToken]);

  function deleteProject(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        fetchProjects();
        navigate("/home/projects?deleted=true");
      })
      .catch((error) => console.log("Error deleting project: ", error));
  }

  function editProject(id, newProject) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/projects/${id}`, newProject, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // api returns unpopulated fields for managers and customer
        const { managers, customer, ...rest } = response.data;
        setProject((previous) => {
          return {
            ...rest, 
            managers: previous.managers, 
            customer: previous.customer
          } 
        });
        fetchProjects();
        toggleShowSuccess();
        setSuccessMessage("Project successfully updated");
      })
      .catch((error) =>
        console.log("Error updating project: ", error.response)
      );
  }

  const toggleSelectStatus = () => setShowSelectStatus((previous) => !previous);

  function editStatus(id, newStatus) {
    editProject(id, { status: newStatus });
    toggleSelectStatus();
  }

  return (
    <div className="res-width-container fix-content-height-below-header p-5 position-relative">
      {isLoading ? (
        <Spinner animation="border" variant="secondary-cstm" />
      ) : (
        <>
          <h4>
            {project.title} - {project.season} {project.year}
          </h4>

          <div className="d-flex my-2">
            <p className="my-auto">{project.location}</p>
            {!project.status ? (
              <IsRestricted>  
                <Button
                  onClick={toggleSelectStatus}
                  variant="custom"
                  className="text-decoration-underline text-secondary-cstm"
                >
                  {" "}
                  Add Project Status{" "}
                </Button>
              </IsRestricted>
            ) : (
              <StatusTag
                clickHandler={toggleSelectStatus}
                className="mx-3"
                status={project.status}
              />
            )}
          </div>

          <p>
            Customer: {" "}
            <ButtonMailTo
              label={ [project.customer?.firstName, project.customer?.lastName].join(" ") }
              mailto={`mailto:${project.customer?.email}`}
              className="text-decoration-underline text-secondary-cstm"
            />
          </p>

          <Nav
            fill
            variant="tabs"
            className="mt-4"
            defaultActiveKey="summary"
            onSelect={(key) => setSelectedTab(key)}
          >
            <Nav.Item>
              <Nav.Link className="text-primary-cstm" eventKey="summary">
                Summary
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-primary-cstm" eventKey="details">
                Sowing Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-primary-cstm" eventKey="checklist">
                Checklist
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {selectedTab === "summary" && (
            <ProjectSummary project={project} onEdit={editProject} />
          )}
          {selectedTab === "details" && (
            <div> Will be populated when model gets extended </div>
          )}
          {selectedTab === "checklist" && (
            <ProjectChecklist project={project} onEdit={editProject} />
          )}

          <IsRestricted project={ project }>
            <Button
              onClick={() => deleteProject(project._id)}
              variant="custom"
              className="border-danger text-danger fix-at-bottom-right m-5"
            >
              Delete this project
            </Button>
          </IsRestricted>
        </>
      )}

      <IsRestricted project={ project }>
        <StatusSelectToast
          showSelectStatus={showSelectStatus}
          toggleSelectStatus={toggleSelectStatus}
          project={project}
          editStatus={editStatus}
        />
      </IsRestricted>

      <SuccessToast
        showSuccess={showSuccess}
        toggleShowSuccess={toggleShowSuccess}
        message={successMessage}
      />
    </div>
  );
}
