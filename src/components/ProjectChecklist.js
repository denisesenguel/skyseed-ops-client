import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ProjectChecklist(props) {
  const { editedProject, editMode, updateEditedProject } = props;
  const { register } = useForm({
    defaultValues: editedProject
  })

  return (
    <div className="m-4 font-m">
      <Form>
        <Form.Check
          type="checkbox"
          label="Seeds ordered"
          className="my-2"
          disabled={
            !editMode ||
            editedProject.seedMixture.every((item) => item.available === true)
          }
          {...register("seedsOrdered")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) }
        />
        <Form.Check
          type="checkbox"
          label="Date fixed"
          disabled={true}
          checked={!editedProject.sowingDate ? false : true}
          className="my-2"
        />
        <Form.Check
          type="checkbox"
          label="Area specified and confirmed"
          className="my-2"
          disabled={!editMode}
          {...register("areaConfirmed")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) }
        />
        <Form.Check
          type="checkbox"
          label="Flight permit requested"
          className="my-2"
          disabled={!editMode}
          {...register("permitRequested")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) }
        />
        <Form.Check
          type="checkbox"
          label="Flight permit granted"
          className="my-2"
          disabled={!editMode}
          {...register("permitGranted")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) } 
        />
      </Form>
    </div>
  );
}
