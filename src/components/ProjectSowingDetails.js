import React from "react";
import CreatableSelect from "react-select/creatable";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import UserCard from "./UserCard";
import { enumArrays } from "../config/dataConfigs";
import { AddMoreButton, RemoveButton } from "./Buttons";
import moment from "moment";
import { useForm, useFieldArray } from "react-hook-form";

export default function ProjectSowingDetails(props) {
  const { editedProject, editMode, updateEditedProject } = props;
  const { register, control, watch } = useForm({
    // TBD: transform date. Try this:
    // Object.assign(editedProject,{sowingDate: moment(editedProject.sowingDate).format("yyyy-MM-DD")})
    defaultValues: editedProject,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "seedMixture",
  });
  const watchFields = watch("seedMixture");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFields[index],
    };
  });

  return (
    <div className="mt-3">
      <Form>
        <FormGroup className="w-50">
          <Form.Label>Exact Date</Form.Label>
          <Form.Control
            type="date"
            disabled={!editMode}
            className="bg-white"
            placeholder="Pick a date"
            {...register("sowingDate")}
            onChange={(e) => updateEditedProject(e.target.name, e.target.value)}
          ></Form.Control>
        </FormGroup>
        <div className="d-flex mt-2">
          <FormGroup className="w-25">
            <Form.Label>% Sowing Density</Form.Label>
            <Form.Control
              className="bg-white"
              disabled={!editMode}
              type="number"
              {...register("sowingDensity")}
              onChange={(e) =>
                updateEditedProject(e.target.name, e.target.value)
              }
            ></Form.Control>
          </FormGroup>
          <FormGroup className="w-75 ml-2">
            <Form.Label>Area Type</Form.Label>
            <CreatableSelect
              options={enumArrays.areaType.map((item) => {
                return { value: item, label: item };
              })}
              isMulti
              {...register("areaType")}
              onChange={(e) =>
                updateEditedProject(
                  "areaType",
                  e.map((selected) => selected.value)
                )
              }
            />
          </FormGroup>
        </div>
        <div className="mt-3">
          <h6>Seed Mixture</h6>
          <Row className="border-bottom">
            <Col xs={4}>
              <Form.Label>Seed Type</Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Label>% of Total</Form.Label>
            </Col>
            <Col xs={2} className="d-flex justify-content-center">
              <Form.Label>Available?</Form.Label>
            </Col>
          </Row>
          {!editedProject.seedMixture ||
          editedProject.seedMixture?.length === 0 ? (
            editMode ? (
              <AddMoreButton />
            ) : (
              !editMode && <p className="mb-0 mt-2">Noting specified yet</p>
            )
          ) : (
            controlledFields.map((field, index) => (
              <Row className="mt-2" key={field.id}>
                <Col xs={4}>
                  <Form.Control
                    className="bg-white"
                    disabled={!editMode}
                    type="text"
                    placeholder="Birch Tree"
                    {...register(`seedMixture.${index}.seedType`)}
                    onChange={(e) => {
                      const { percentage, available } = controlledFields[index];
                      updateEditedProject("seedMixture", {
                        seedType: e.target.value,
                        percentage,
                        available,
                      });
                    }}
                  />
                </Col>
                <Col xs={3}>
                  <Form.Control
                    className="bg-white"
                    disabled={!editMode}
                    type="number"
                    {...register(`seedMixture.${index}.percentage`)}
                    onChange={(e) => {
                      const { seedType, available } = controlledFields[index];
                      updateEditedProject("seedMixture", {
                        seedType,
                        percentage: e.target.value,
                        available,
                      });
                    }}
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center font-m"
                >
                  <Form.Check
                    disabled={!editMode}
                    {...register(`seedMixture.${index}.available`)}
                    onChange={(e) => {
                      const { seedType, percentage } = controlledFields[index];
                      updateEditedProject("seedMixture", {
                        seedType,
                        percentage,
                        available: e.target.checked,
                      });
                    }}
                  />
                </Col>
              </Row>
            ))
          )}
          {
            // If edit mode on show Add more Button below
            editMode && (
              <div className="d-flex">
                <AddMoreButton
                  onClick={() =>
                    append({
                      seedType: "",
                      percentage: 0,
                      available: false,
                    })
                  }
                />
                {
                    controlledFields.length > 1 &&
                    <RemoveButton
                    onClick={() =>remove(controlledFields.length - 1)}
                    />
                }
              </div>
            )
          }
        </div>
      </Form>
      <div className="mt-4">
        <h6>Pilots</h6>
        {editedProject.pilots?.length > 0 ? (
          editedProject.pilots?.map((pilot) => <UserCard user={pilot} />)
        ) : (
          <p>None assigned yet</p>
        )}
      </div>
    </div>
  );
}
