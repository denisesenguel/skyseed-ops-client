import React, { useContext } from "react";
import ProjectsList from "../components/ProjectsList";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../context/AuthContext";
import useShowSuccess from "../hooks/useShowSuccess";
import SuccessToast from "../components/SuccessToast";

export default function AllProjectsPage(props) {
  const { projects, isLoading } = props;
  const { user } = useContext(AuthContext);
  const { showSuccess, toggleShowSuccess } = useShowSuccess();

  function getMyProjects(userId, projects) {
    if (projects.length > 0) {
      return projects.filter((project) => {
        const isOwner = project.owner === userId;
        const isManager = project.managers.some(
          (manager) => manager._id === userId
        );
        return isOwner || isManager;
      });
    } else {
      return [];
    }
  }

  return (
    <div className="p-5">
      <h1 className="mb-5">My Projects</h1>
      {isLoading ? (
        <Spinner animation="border" variant="secondary-cstm" />
      ) : (
        <ProjectsList projects={getMyProjects(user._id, projects)} />
      )}
      <SuccessToast
        showSuccess={showSuccess}
        toggleShowSuccess={toggleShowSuccess}
        message={"Project successfully deleted"}
      />
    </div>
  );
}
