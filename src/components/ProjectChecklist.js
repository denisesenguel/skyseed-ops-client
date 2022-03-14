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
          label="Saatgut bestellt"
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
          label="Aussaat Termin festgelegt"
          disabled={true}
          checked={!editedProject.sowingDate ? false : true}
          className="my-2"
        />
        <Form.Check
          type="checkbox"
          label="Fläche bestätigt"
          className="my-2"
          disabled={!editMode}
          {...register("areaConfirmed")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) }
        />
        <Form.Check
          type="checkbox"
          label="Flugantrag gestellt"
          className="my-2"
          disabled={!editMode}
          {...register("permitRequested")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) }
        />
        <Form.Check
          type="checkbox"
          label="Flugantrag genehmigt"
          className="my-2"
          disabled={!editMode}
          {...register("permitGranted")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) } 
        />
        <Form.Check
          type="checkbox"
          label="Personal und Reise gebucht"
          className="my-2"
          disabled={!editMode}
          {...register("travelBooked")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) } 
        />
        <Form.Check
          type="checkbox"
          label="Vertragliches geklärt"
          className="my-2"
          disabled={!editMode}
          {...register("contractClarified")}
          onChange={ (e) => updateEditedProject(e.target.name, e.target.checked) } 
        />
      </Form>
    </div>
  );
}
