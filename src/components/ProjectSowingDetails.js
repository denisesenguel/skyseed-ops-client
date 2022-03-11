import React from "react";
import CreatableSelect from "react-select/creatable";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import UserCard from "./UserCard";
import { enumArrays } from "../config/dataConfigs";
import AddMoreButton from "./AddMoreButton";
import moment from "moment";

export default function ProjectSowingDetails(props) {
  const { editedProject, editMode } = props;
  return (
    <div className="mt-3">
      <Form>
        <FormGroup className="w-50">
          <Form.Label>Exact Date</Form.Label>
          <Form.Control
            type="date"
            disabled={!editMode}
            className="bg-white"
            value={
              editedProject.sowingDate
                ? moment(editedProject.sowingDate).format("yyyy-MM-DD")
                : undefined
            }
            placeholder="Pick a date"
          ></Form.Control>
        </FormGroup>
        <div className="d-flex mt-2">
          <FormGroup className="w-25">
            <Form.Label>% Sowing Density</Form.Label>
            <Form.Control
              className="bg-white"
              disabled={!editMode}
              type="number"
            ></Form.Control>
          </FormGroup>
          <FormGroup className="w-75 ml-2">
            <Form.Label>Area Type</Form.Label>
            <CreatableSelect
              options={enumArrays.areaType.map((item) => {
                return { value: item, label: item };
              })}
              isMulti
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
            <Col xs={3}></Col>
          </Row>
          {!editedProject.seedMixture ||
          editedProject.seedMixture?.length === 0 ? (
            editMode ? (
              <AddMoreButton />
            ) : (
              !editMode && <p className="mb-0 mt-2">Noting specified yet</p>
            )
          ) : (
            editedProject.seedMixture?.map((item, index) => (
              <Row className="mt-2">
                <Col xs={4}>
                  <Form.Control
                    className="bg-white"
                    disabled={!editMode}
                    type="text"
                    placeholder="Birch Tree"
                    value={item.seedType}
                  />
                </Col>
                <Col xs={3}>
                  <Form.Control
                    className="bg-white"
                    disabled={!editMode}
                    type="number"
                    value={item.percentage}
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center font-m"
                >
                  <Form.Check disabled={!editMode} value={item.available} />
                </Col>
                <Col
                  xs={3}
                  className="d-flex align-items-center text-primary-cstm"
                >
                  {
                    // If edit mode on show Add more Button on last row
                    editMode &&
                      index === editedProject.seedMixture.length - 1 && (
                        <AddMoreButton />
                      )
                  }
                </Col>
              </Row>
            ))
          )}
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
