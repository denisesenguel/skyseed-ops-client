import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { enumArrays } from "../config/dataConfigs";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

export default function ProjectCreatePage(props) {
  
  const { fetchProjects } = props;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "managers",
  });
  const watchManagers = watch("managers");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchManagers[index],
    };
  });

  const [allUsers, setAllUsers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  const [failure, setFailure] = useState({ hasOccured: false });
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  // initialize controlledFields array by appending once on render
  useEffect(() => append(""), [append]);

  // get list of all users and customers for form select fields
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAllUsers(response.data))
      .then(() => {
        return axios.get(`${process.env.REACT_APP_API_URL}/customers`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
      })
      .then((response) => {
        setIsLoading(false);
        setAllCustomers(response.data);
      })
      .catch((error) =>
        console.log("Error getting users and customers from API: ", error)
      );
  }, [storedToken]);

  function createProject(data) {
    // remove empty strings from data
    for (const key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects`,
        { ...data, owner: user._id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        fetchProjects();
        navigate(`/home/projects/${response.data._id}?created=true`);
      })
      .catch((error) => {
        console.log("Error creating project: ", error);
        setFailure({
          hasOccured: true,
          message: error.response.data.message,
        });
      });
  }

  return (
    <div className="p-5 res-width-container">
      <h1 className="mb-5">Neues Projekt</h1>
      {isLoading ? (
        <Spinner animation="border" variant="secondary-cstm" />
      ) : (
        <>
          <Form onSubmit={handleSubmit(createProject)}>
            <Form.Group>
              <Form.Label>Titel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Forst XYZ"
                className={errors.title ? "invalid" : ""}
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-danger font-s mt-1 mb-0">Required Field</p>
              )}
            </Form.Group>

            <div className="d-flex mt-2">
              <Form.Group>
                <Form.Label>Ort</Form.Label>
                <Form.Control
                  className={errors.location ? "invalid" : ""}
                  {...register("location", { required: true })}
                />
                {errors.location && (
                  <p className="text-danger font-s mt-1 mb-0">Required Field</p>
                )}
              </Form.Group>
              <Form.Group className="mx-2">
                <Form.Label>Saison</Form.Label>
                <Form.Select
                  className={errors.season ? "invalid" : ""}
                  {...register("season", { required: true })}
                >
                  <option></option>
                  {enumArrays.season.map((season, index) => (
                    <option key={index} value={season}>
                      {season}
                    </option>
                  ))}
                </Form.Select>
                {errors.season && (
                  <p className="text-danger font-s mt-1 mb-0">Required Field</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Jahr</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.year ? "invalid" : ""}
                  {...register("year", {
                    required: {
                      value: true,
                      message: "Required Field"
                    },
                    min: {
                      value: 2018,
                      message: "Provide valid year (after 2018)"
                    },
                    max: {
                      value: 2100,
                      message: "Provide valid year (after 2018)"
                    }
                  })}
                />
                {errors.year && (
                  <p className="text-danger font-s mt-1 mb-0">{ errors.year.message }</p>
                )}
              </Form.Group>
            </div>

            <Form.Group className="mt-2">
              <Form.Label>Kurzbeschreibung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Give a short description"
                {...register("description")}
              />
            </Form.Group>

            <div className="d-flex mt-2">
              <Form.Group>
                <Form.Label>Größe (in Hektar)</Form.Label>
                <Form.Control
                  type="number"
                  step={0.1}
                  placeholder="5.6"
                  {...register("sizeInHa")}
                />
              </Form.Group>
              <Form.Group className="mx-2">
                <Form.Label> Status </Form.Label>
                <Form.Select {...register("status")}>
                  <option> </option>
                  {enumArrays.status.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Group className="mt-2">
              <Form.Label> Kunde </Form.Label>
              <Form.Select
                className={errors.customer ? "invalid" : ""}
                {...register("customer", { required: true })}
              >
                <option> </option>
                {allCustomers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {`${customer.firstName} ${customer.lastName} (${customer.email})`}
                  </option>
                ))}
              </Form.Select>
              {errors.customer && (
                <p className="text-danger font-s mt-1">Required Field</p>
              )}
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label> Projektmanager </Form.Label>
              {controlledFields.map((field, index) => (
                <>
                  <Form.Select
                    key={field.id}
                    className={errors.managers && errors.managers[index] ? "my-1 invalid" : "my-1"}
                    {...register(`managers.${index}`, {required: true})}
                  >
                    <option></option>
                    {allUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {`${user.firstName} (${user.email})`}
                      </option>
                    ))}
                  </Form.Select>
                  { errors.managers && (
                      errors.managers[index] && <p className="text-danger font-s mt-1"> { index === 0 ? "Must select at least one" : "Remove empty fields if unused" } </p>
                  )}
                </>
              ))}
            </Form.Group>
            <div className="mt-2">
              <Button
                onClick={() => append()}
                variant="custom"
                size="sm"
                className="border-secondary-cstm text-secondary-cstm"
              >
                Mehr
              </Button>
              <Button
                onClick={() =>
                  controlledFields.length > 1
                    ? remove(controlledFields.length - 1)
                    : null
                }
                variant="custom"
                size="sm mx-2"
                className="border-secondary-cstm text-secondary-cstm"
              >
                Entfernen
              </Button>
            </div>

            <Button
              className="bg-secondary-cstm text-primary-cstm mt-4"
              variant="custom"
              type="submit"
            >
              Hinzufügen
            </Button>
          </Form>
          {failure.hasOccured && (
            <Alert
              variant="danger"
              className="d-flex justify-content-center text-danger mt-4"
            >
              { "Failed: " + failure.message || "Something went wrong. Please try again."}
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
