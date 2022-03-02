import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function LoginPage() {
    return (
        <div>
            <NavBar />
            <h1>Login</h1>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="me@example.com"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder=""/>
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
            <p>Don't have an account yet? Signup <Link to="/signup">here</Link> </p>
        </div>
    )
}
