import React from "react";
import Form from "react-bootstrap/Form";
import UserCard from "./UserCard";

export default function ProjectSummary(props) {
  const { project, editMode, editedProject, updateEditedProject } = props;

  return (
    <div className="mt-3">
      <Form>
        <Form.Group controlId="description" className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            disabled={!editMode}
            className="bg-white"
            as="textarea"
            rows={3}
            onChange={(e) => updateEditedProject(e.target.id, e.target.value)}
            value={editedProject.description}
          />
        </Form.Group>
        <Form.Group controlId="sizeInHa" className="mt-2">
          <Form.Label>Size (in ha)</Form.Label>
          <Form.Control
            disabled={!editMode}
            type="number"
            step={0.1}
            className="bg-white"
            onChange={(e) => updateEditedProject(e.target.id, e.target.value)}
            value={editedProject.sizeInHa}
          />
        </Form.Group>
      </Form>
      <div className="w-100 mt-4">
        <h6>Project Managers</h6>
        <div className="w-50 mt-3">
          {!project || !project?.managers || project?.managers?.length === 0 ? (
            <p> None assigned yet.</p>
          ) : (
            project.managers.map((user) => <UserCard user={user} />)
          )}
        </div>
      </div>
    </div>
  );
}
