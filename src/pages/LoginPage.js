import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { storeToken, verifyStoredToken } = useContext(AuthContext);
  const [failure, setFailure] = useState(false);

  function loginUser(data) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
      .then((response) => {
        storeToken(response.data.authToken);
        verifyStoredToken();
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error on Login: ", error.response.data);
        setFailure({
          hasOccured: true,
          message: error.response.data.errorMessage,
        });
      });
  }

  return (
    <div className="bg-forest vh-100">
      <NavBar />
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="res-width-container-sm bg-neutral-grey p-5 m-4 rounded shadow">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit(loginUser)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="me@example.com"
                className={errors.email ? "invalid" : ""}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                })}
              />
              {
                  errors.email && 
                    <p className="text-danger font-s mt-1">
                        Please provide a valid Email.
                    </p>
              }
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                className={errors.password ? "invalid" : ""}
                {...register("password", {
                  required: {
                      value: true,
                      message: "Password must be provided"
                  },
                  pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                      message: "At least 6 characters including a number, lower and uppercase letter"
                  },
                })}
              />
              {
                  errors.password && 
                    <p className="text-danger font-s mt-1">
                        { errors.password.message }
                    </p>
              }
            </Form.Group>
            <Button
              variant="custom"
              className="w-100 bg-secondary-cstm text-primary-cstm"
              type="submit"
            >
              {" "}
              Login{" "}
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account yet? Signup{" "}
            <Link className="text-secondary-cstm" to="/signup">
              here
            </Link>
          </p>
          {failure.hasOccured && (
            <Alert
              variant="danger"
              className="d-flex justify-content-center text-danger"
            >
              {failure.message || "Something went wrong. Please try again."}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
