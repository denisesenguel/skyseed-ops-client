import React from "react";
import { Form } from "react-bootstrap";
import EditableUserList from "./EditableUserList";
import { useForm } from "react-hook-form";

export default function ProjectSummary(props) {
  const { editMode, editedProject, updateEditedProject } = props;
  const { register } = useForm({
    defaultValues: editedProject,
  });

  return (
    <div className="mt-3">
      <Form>
        <Form.Group className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            disabled={!editMode}
            className="bg-white"
            as="textarea"
            rows={3}
            {...register("description")}
            onChange={(e) => updateEditedProject(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="sizeInHa" className="mt-2">
          <Form.Label>Size (in ha)</Form.Label>
          <Form.Control
            disabled={!editMode}
            type="number"
            step={0.1}
            className="bg-white"
            {...register("sizeInHa")}
            onChange={(e) => updateEditedProject(e.target.name, e.target.value)}
          />
        </Form.Group>
      </Form>

      <EditableUserList
        title="Project Managers"
        field="managers"
        editMode={editMode}
        editedProject={editedProject}
        updateEditedProject={updateEditedProject}
      />
    </div>
  );
}
