import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

export default function SignupPage() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failure, setFailure] = useState({hasOccured: false});

    function createUser(evnt) {
        evnt.preventDefault();
        const newUser = {firstName, email, password};
        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, newUser)
            .then(() => {
                // show success message on new page
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
            <div className="fix-content-height d-flex justify-content-center align-items-center">
                <Container fluid="md" className="cstm-max-width bg-neutral-grey p-5 m-4 rounded shadow">
                    <h1>Signup</h1>
                    <Form onSubmit={ createUser }>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={ firstName }
                                onChange={ (e) => setFirstName(e.target.value) }    
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="me@example.com"
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder=""
                                value={ password }
                                onChange={ (e) => setPassword(e.target.value) }
                            />
                        </Form.Group>
                        <Button 
                            type="submit"
                            variant="custom" 
                            className="w-100 bg-secondary-cstm text-primary-cstm">Create Account
                        </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Already have an account? Login <Link className="text-secondary-cstm" to="/login">here</Link> </p>

                    { failure.hasOccured && <h6 className="text-error-cstm text-center mt-4">{ failure.message }</h6> }
                 </Container>
            </div>
            <h1>Signup</h1>
        </div>
    )
}
