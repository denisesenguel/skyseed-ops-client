import React from "react";
import CreatableSelect from "react-select/creatable";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { enumArrays } from "../config/dataConfigs";
import { AddMoreButton, RemoveButton } from "./Buttons";
import moment from "moment";
import { useForm, useFieldArray } from "react-hook-form";
import EditableUserList from "./EditableUserList";

export default function ProjectSowingDetails(props) {
  const { editedProject, editMode, updateEditedProject } = props;
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: Object.assign(editedProject, {
      sowingDate: moment(editedProject.sowingDate).format("yyyy-MM-DD"),
    }),
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

  function updateSeedMixture(index, name, value) {
    const newArray = controlledFields.map((fieldObject, i) => {
      const { id, _id, ...rest } = fieldObject;
      if (i === index) rest[name] = value;
      return rest;
    });
    updateEditedProject("seedMixture", newArray);
  }

  console.log(controlledFields);

  return (
    <div className="mt-3">
      <Form>
        <FormGroup className="w-50">
          <Form.Label>Aussaat Termin</Form.Label>
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
            <Form.Label>Bestockungsdichte</Form.Label>
            <Form.Control
              className={errors.sowingDensity ? "bg-white invalid" : "bg-white"}
              disabled={!editMode}
              type="number"
              {...register("sowingDensity", {
                min: {
                  value: 0,
                  message: "Invalid value.",
                },
                max: {
                  value: 100,
                  message: "Invalid value.",
                },
              })}
              onChange={(e) =>
                updateEditedProject(e.target.name, e.target.value)
              }
            ></Form.Control>
            {errors?.sowingDensity && (
              <p className="text-danger font-s mt-1 mb-0">
                {errors.sowingDensity.message}
              </p>
            )}
          </FormGroup>
          <FormGroup className="w-75 ml-2">
            <Form.Label>Flächentyp</Form.Label>
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
          <h6>Saatgut Mix</h6>
          <Row className="border-bottom">
            <Col xs={4}>
              <Form.Label>Art</Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Label>% im Mix</Form.Label>
            </Col>
            <Col xs={2} className="d-flex justify-content-center">
              <Form.Label>Vorhanden?</Form.Label>
            </Col>
            <Col xs={2}></Col>
          </Row>
          {controlledFields.length === 0 ? (
            <p className="mb-0 mt-2 text-muted">Keine Angaben.</p>
          ) : (
            controlledFields.map((field, index) => (
              <>
                <Row className="mt-2" key={field.id}>
                  <Col xs={4}>
                    <Form.Control
                      className={
                        errors.seedMixture?.[index]?.seedType
                          ? "bg-white invalid"
                          : "bg-white"
                      }
                      disabled={!editMode}
                      type="text"
                      placeholder="Birch Tree"
                      {...register(`seedMixture.${index}.seedType`, {
                        required: true,
                      })}
                      onChange={(e) =>
                        updateSeedMixture(index, "seedType", e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      className={
                        errors.seedMixture?.[index]?.percentage
                          ? "bg-white invalid"
                          : "bg-white"
                      }
                      disabled={!editMode}
                      type="number"
                      {...register(`seedMixture.${index}.percentage`, {
                        required: true,
                        min: {
                          value: 0,
                          message: "Invalid Value.",
                        },
                        max: {
                          value: 100,
                          message: "Invalid Value.",
                        },
                      })}
                      onChange={(e) =>
                        updateSeedMixture(index, "percentage", e.target.value)
                      }
                    />
                    {errors.seedMixture?.[index]?.percentage?.message && (
                      <p className="text-danger font-s mt-1 mb-0">
                        {errors.seedMixture[index].percentage.message}
                      </p>
                    )}
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex align-items-center justify-content-center font-m"
                  >
                    <Form.Check
                      disabled={!editMode}
                      {...register(`seedMixture.${index}.available`, {
                        required: true,
                      })}
                      onChange={(e) =>
                        updateSeedMixture(index, "available", e.target.checked)
                      }
                    />
                  </Col>
                  <Col xs={2}>
                    {editMode && index > 0 && (
                      <RemoveButton onClick={() => remove(index)} />
                    )}
                  </Col>
                </Row>
                {errors.seedMixture?.[index] &&
                  Object.entries(errors.seedMixture[index]).length > 1 && (
                    <p className="text-danger mt-1 mb-0">
                      Please fill or remove all fields!
                    </p>
                  )}
              </>
            ))
          )}
          {
            // If edit mode on show Add more Button below
            editMode && (
              <AddMoreButton
                onClick={() =>
                  append({
                    seedType: "",
                    percentage: "",
                    available: false,
                  })
                }
              />
            )
          }
        </div>
      </Form>

      <EditableUserList
        title="Piloten"
        field="pilots"
        editMode={editMode}
        editedProject={editedProject}
        updateEditedProject={updateEditedProject}
      />
    </div>
  );
}
