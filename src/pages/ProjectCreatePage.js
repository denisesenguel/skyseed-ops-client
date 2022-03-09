import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { enumArrays } from "../config/dataConfigs";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

export default function ProjectCreatePage() {
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
  useEffect(() => append(""), []);

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
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects`,
        { ...data, owner: user._id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/home/projects/${response.data._id}?created=true`);
      })
      .catch((error) => {
        console.log("Error creating project: ", error);
        setFailure({
          hasOccured: true,
          message: error.response.data.error.message,
        });
      });
  }

  console.log( "manager erros:", errors.managers)

  return (
    <div className="p-5 res-width-container">
      <h1 className="mb-5">Add Project</h1>
      {isLoading ? (
        <Spinner animation="border" variant="secondary-cstm" />
      ) : (
        <>
          <Form onSubmit={handleSubmit(createProject)}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
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
                <Form.Label>Location</Form.Label>
                <Form.Control
                  className={errors.location ? "invalid" : ""}
                  {...register("location", { required: true })}
                />
                {errors.location && (
                  <p className="text-danger font-s mt-1 mb-0">Required Field</p>
                )}
              </Form.Group>
              <Form.Group className="mx-2">
                <Form.Label>Season</Form.Label>
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
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.year ? "invalid" : ""}
                  // TODO add min/max validation
                  {...register("year", { required: true })}
                />
                {errors.year && (
                  <p className="text-danger font-s mt-1 mb-0">Required Field</p>
                )}
              </Form.Group>
            </div>

            <Form.Group className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Give a short description"
                {...register("description")}
              />
            </Form.Group>

            <div className="d-flex mt-2">
              <Form.Group>
                <Form.Label>Size (in ha)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="5.6"
                  {...register("sizeInHa")}
                />
              </Form.Group>
              <Form.Group className="mx-2">
                <Form.Label> Project Status </Form.Label>
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
              <Form.Label> Customer </Form.Label>
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
              <Form.Label> Select at least one Project Manager </Form.Label>
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
                Add More
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
                Remove
              </Button>
            </div>

            <Button
              className="bg-secondary-cstm text-primary-cstm mt-4"
              variant="custom"
              type="submit"
            >
              Add Project
            </Button>
          </Form>
          {failure.hasOccured && (
            <Alert
              variant="danger"
              className="d-flex justify-content-center text-danger mt-4"
            >
              {failure.message || "Something went wrong. Please try again."}
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
