import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

export default function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failure, setFailure] = useState({ hasOccured: false });

    const { storeToken, verifyStoredToken, isLoggedIn } = useContext(AuthContext);

    function loginUser(evnt) {
        evnt.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {email, password})
            .then((response) => {
                storeToken(response.data.authToken);
                verifyStoredToken();
                navigate("/home");
            })
            .catch((error) => {
                console.log('Error on Login: ', error);
                setFailure({
                    hasOccured:true,
                    message: error.response.data.message
                });
            })
    }

    return (
        <div className="bg-forest vh-100">
            <NavBar />
            <div className="fix-content-height d-flex justify-content-center align-items-center">
                <Container fluid="md" className="cstm-max-width bg-neutral-grey p-5 m-4 rounded shadow">
                    <h1>Login</h1>
                    <Form onSubmit={ loginUser }>
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
                            variant="custom" 
                            className="w-100 bg-secondary-cstm text-primary-cstm" 
                            type="submit"> Login </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Don't have an account yet? Signup <Link className="text-secondary-cstm" to="/signup">here</Link>
                    </p>
                    { failure.hasOccured && <h6 className="text-error-cstm text-center mt-4">{ failure.message }</h6> }
                </Container>
            </div>
        </div>
    )
}
