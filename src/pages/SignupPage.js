import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

export default function SignupPage() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [failure, setFailure] = useState({ hasOccured: false });

    const { storeToken, verifyStoredToken } = useContext(AuthContext);

    function createUser(data) {
        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data)
            .then((response) => {
                storeToken(response.data.authToken);
                verifyStoredToken();
                // TODO show success message on new page
                navigate("/home?userCreated=true");
            })
            .catch((error) => {
                setFailure({
                    hasOccured: true,
                    message: error.response.data.message
                })    
            })
    }

    return (
        <div className="bg-forest vh-100">
            <NavBar />
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="res-width-container-sm cstm-max-width bg-neutral-grey p-5 m-4 rounded shadow">
                    <h1>Signup</h1>
                    <Form onSubmit={ handleSubmit(createUser) }>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control 
                                type="text"
                                className={errors.firstName ? "invalid" : ""}
                                {...register("firstName", { required: true })}   
                            />
                            {
                                errors.firstName && 
                                <p className="text-danger font-s mt-1">Required</p>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
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
                        <Form.Group className="mb-3" controlId="password">
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
                            type="submit"
                            variant="custom" 
                            className="w-100 bg-secondary-cstm text-primary-cstm">Create Account
                        </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Already have an account? Login <Link className="text-secondary-cstm" to="/login">here</Link> </p>

                        {
                            failure.hasOccured && 
                                <Alert
                                variant="danger"
                                className="d-flex justify-content-center text-danger"
                                >
                                {failure.message || "Something went wrong. Please try again."}
                                </Alert>
                        }
                 </div>
            </div>
        </div>
    )
}
