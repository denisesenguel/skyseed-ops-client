import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Nav, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import ProjectSummary from "../components/ProjectSummary";
import ProjectSowingDetails from "../components/ProjectSowingDetails";
import ProjectChecklist from "../components/ProjectChecklist";
import ButtonMailTo from "../components/ButtonMailTo";
import StatusTag from "../components/StatusTag";
import SuccessToast from "../components/SuccessToast";
import useShowSuccess from "../hooks/useShowSuccess";
import IsRestricted from "../components/IsRestricted";
import DeleteModal from "../components/DeleteModal";

export default function ProjectDetailsPage({ fetchProjects }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, toggleShowSuccess} = useShowSuccess();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("summary");

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

  useEffect(() => {
    setEditedProject(project);
  }, [project]);

  function deleteProject() {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShowDeleteModal(false);
        fetchProjects();
        navigate("/home/projects/my-projects?deleted=true");
      })
      .catch((error) => console.log("Error deleting project: ", error));
  }

  const toggleEditMode = () => setEditMode((previous) => !previous);

  function updateEditedProject(key, value) {
    const newEdit = { ...editedProject };
    newEdit[key] = value;
    setEditedProject(newEdit);
  }

  function editProject() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
        editedProject,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        // api returns unpopulated fields for managers and customer
        const { managers, customer, ...rest } = response.data;
        setProject((previous) => {
          return {
            ...rest,
            managers: previous.managers,
            customer: previous.customer,
          };
        });
        fetchProjects();
        toggleEditMode();
        toggleShowSuccess();
      })
      .catch((error) =>
        console.log("Error updating project: ", error.response)
      );
  }

  function discardChanges() {
    setEditedProject(project);
    toggleEditMode();
  }

  return (
    <>
      <div className="res-width-container fix-content-height-below-header p-5 d-flex flex-column justify-content-between">
        {isLoading ? (
          <Spinner animation="border" variant="secondary-cstm" />
        ) : (
          <>
            <div>
              <h4>
                {project.title} - {project.season} {project.year}
              </h4>

              <div className="d-flex my-2">
                <p className="my-auto">{project.location}</p>

                <StatusTag
                  status={project.status}
                  editMode={editMode}
                  editedProject={editedProject}
                  updateEditedProject={updateEditedProject}
                />
              </div>

              <p>
                Customer:{" "}
                <ButtonMailTo
                  label={[
                    project.customer?.firstName,
                    project.customer?.lastName,
                  ].join(" ")}
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
                <ProjectSummary
                  project={project}
                  editMode={editMode}
                  editedProject={editedProject}
                  updateEditedProject={updateEditedProject}
                />
              )}
              {selectedTab === "details" && (
                <ProjectSowingDetails 
                  project={project}
                  editMode={editMode}
                  editedProject={editedProject}
                  updateEditedProject={updateEditedProject}
                />
              )}
              {selectedTab === "checklist" && (
                <ProjectChecklist 
                  project={project} 
                  editMode={editMode} 
                />
              )}
            </div>

            <div className="d-flex justify-content-end">
              <IsRestricted project={project}>
                {!editMode ? (
                  <Button
                    onClick={toggleEditMode}
                    variant="custom"
                    className="border-secondary-cstm text-secondary-cstm mx-2"
                  >
                    Edit Details
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={discardChanges}
                      variant="custom"
                      className="border-secondary-cstm text-secondary-cstm"
                    >
                      Discard Changes
                    </Button>
                    <Button
                      onClick={ editProject }
                      variant="custom"
                      className="border-secondary-cstm text-secondary-cstm mx-2"
                    >
                      Save Changes
                    </Button>
                  </>
                )}
                <Button
                  onClick={ () => setShowDeleteModal(true) }
                  variant="custom"
                  className="border-danger text-danger fix-at-bottom-right"
                >
                  Delete this project
                </Button>
              </IsRestricted>
            </div>
          </>
        )}
      </div>

      <DeleteModal
        show={ showDeleteModal }
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={ deleteProject }
      />

      <SuccessToast
        showSuccess={showSuccess}
        toggleShowSuccess={toggleShowSuccess}
        message={"Project successfully updated"}
      />
    </>
  );
}
